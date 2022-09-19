import React from "react";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { Form, Formik } from "formik";
import InputField from "../../../components/InputField";
import Layout from "../../../components/Layout";
import { Box, Button, Flex } from "@chakra-ui/react";
// import { useRouter } from "next/router";
import { useUpdatePostMutation } from "../../../generated/graphql";
import { useGetPostFromUrl } from "../../../utils/useGetPostFromUrl";
import { useGetIntId } from "../../../utils/useGetIntId";
import { useRouter } from "next/router";

const EditPost = () => {
  const router = useRouter();
  const [{ data, error, fetching }] = useGetPostFromUrl();
  const intId = useGetIntId();
  const [, updatePost] = useUpdatePostMutation();

  if (fetching) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  console.log(data, "data");
  if (!data?.post) {
    return (
      <Layout>
        <div>Could not find post</div>
      </Layout>
    );
  }

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: data.post.title, text: data.post.text }}
        onSubmit={async (values) => {
          const { error } = await updatePost({
            updatePostId: intId,
            ...values,
          });
          if (!error) {
            await router.back();
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField label="Title" name="title" placeholder="title" />
            <Box mt={4}>
              <InputField
                textArea={true}
                label="Body"
                name="text"
                placeholder="text..."
              />
            </Box>
            <Flex mt={4}>
              <Button colorScheme="teal" isLoading={isSubmitting} type="submit">
                Update post
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(EditPost);
