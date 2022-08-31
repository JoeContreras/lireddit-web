import React from "react";
import { Form, Formik } from "formik";
import InputField from "../components/InputField";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useCreatePostMutation } from "../generated/graphql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { useIsAuth } from "../utils/hooks/useIsAuth";

const CreatePost = () => {
  const [, createPost] = useCreatePostMutation();
  const router = useRouter();
  useIsAuth();
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values) => {
          const { error } = await createPost({ input: values });
          if (!error) {
            await router.push("/");
          }
        }}
      >
        {(props) => (
          <Form>
            <InputField label="Title" name="title" placeholder="title" />
            <Box mt={4}>
              <InputField
                textArea={true}
                label="Text"
                name="text"
                placeholder="text..."
              />
            </Box>
            <Flex mt={4}>
              <Button
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Create post
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
