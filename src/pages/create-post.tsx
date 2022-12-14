import React from "react";
import { Form, Formik } from "formik";
import InputField from "../components/InputField";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useCreatePostMutation } from "../generated/graphql";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { useIsAuth } from "../utils/hooks/useIsAuth";
import { withApollo } from "../utils/withApollo";

const CreatePost = () => {
  const [createPost] = useCreatePostMutation();
  const router = useRouter();
  useIsAuth();
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values) => {
          const response = await createPost({
            variables: { input: values },
            update: (cache) => {
              cache.evict({ fieldName: "posts:{}" });
            },
          });
          if (!response.errors) {
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

export default withApollo({ ssr: false })(CreatePost);
