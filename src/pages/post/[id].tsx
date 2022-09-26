import React from "react";
import Layout from "../../components/Layout";
import { Box, Heading } from "@chakra-ui/react";
import EditDeleteButtons from "../../components/EditDeleteButtons";
import { withApollo } from "../../utils/withApollo";
import { useGetIntId } from "../../utils/useGetIntId";
import { useSinglePostQuery } from "../../generated/graphql";

const Post = () => {
  const intId = useGetIntId();
  const { data, error, loading } = useSinglePostQuery({
    skip: intId === -1,
    variables: {
      postId: intId,
    },
  });

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
    <Layout>
      <Heading mb={4}>{data.post.title}</Heading>
      {data.post.text}
      <Box mt={4}>
        <EditDeleteButtons id={data.post.id} creatorId={data.post.creator.id} />
      </Box>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Post);
