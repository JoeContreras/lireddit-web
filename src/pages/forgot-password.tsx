import React, { useState } from "react";
import { Form, Formik } from "formik";
import InputField from "../components/InputField";
import { Button, Flex, useToast } from "@chakra-ui/react";
import Wrapper from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

const ForgotPassword = () => {
  const toast = useToast();
  const [_complete, setComplete] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values) => {
          await forgotPassword({ variables: values });
          setComplete(true);
          toast({
            title: "Success",
            description: "We've sent an email to the address you provided.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              label="Email"
              name="email"
              placeholder="example@example.com"
            />

            <Flex mt={4}>
              <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
                Send Email
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(ForgotPassword);
