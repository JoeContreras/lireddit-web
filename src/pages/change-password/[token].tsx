import React, { useState } from "react";
import { NextPage } from "next";
import { Form, Formik } from "formik";
import { toErrorMap } from "../../utils/toErrorMap";
import InputField from "../../components/InputField";
import { Alert, AlertIcon, Button, Link } from "@chakra-ui/react";
import Wrapper from "../../components/Wrapper";
import { useChangePasswordMutation } from "../../generated/graphql";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import NextLink from "next/link";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            token,
            newPassword: values.newPassword,
          });
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data?.changePassword.user) {
            await router.push("/");
          }
        }}
      >
        {(props) => (
          <Form>
            <InputField
              label="New Password"
              name="newPassword"
              placeholder="new password"
              type="password"
            />
            {tokenError ? (
              <>
                <Alert status="error" mt={4}>
                  <AlertIcon />
                  {tokenError}
                  <br />
                </Alert>
                <Alert status="info" mt={4}>
                  <AlertIcon />
                  <NextLink href="/forgot-password" passHref>
                    <Link>send recovery email again</Link>
                  </NextLink>
                </Alert>
              </>
            ) : null}
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
