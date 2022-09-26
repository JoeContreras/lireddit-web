import React from "react";
import { Form, Formik } from "formik";
import InputField from "../../../components/InputField";
import Layout from "../../../components/Layout";
import { Box, Button, Flex } from "@chakra-ui/react";
// import { useRouter } from "next/router";
import {
  useSinglePostQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";
import { useGetIntId } from "../../../utils/useGetIntId";
import { useRouter } from "next/router";
import { withApollo } from "../../../utils/withApollo";

const EditPost = () => {
  const router = useRouter();
  const intId = useGetIntId();
  const { data, error, loading } = useSinglePostQuery({
    skip: intId === -1,
    variables: {
      postId: intId,
    },
  });

  const [updatePost] = useUpdatePostMutation();

  if (loading) {
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
          const { errors } = await updatePost({
            variables: { updatePostId: intId, ...values },
          });
          if (!errors) {
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

export default withApollo({ ssr: false })(EditPost);
