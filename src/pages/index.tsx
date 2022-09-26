import { usePostsQuery } from "../generated/graphql";
import Layout from "../components/Layout";
import NextLink from "next/link";
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import UpdootSection from "../components/UpdootSection";
import EditDeleteButtons from "../components/EditDeleteButtons";
import { withApollo } from "../utils/withApollo";

const Index = () => {
  const { data, error, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 15,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (!loading && !data) {
    return (
      <>
        <div>The query failed </div>
        <div>{error?.message}</div>
      </>
    );
  }

  return (
    <Layout>
      <Stack spacing={8}>
        {loading && !data ? (
          <div>loading...</div>
        ) : (
          data!.posts.posts.map((post, index) => (
            <Flex
              key={`${post.id}.${index}`}
              p={5}
              shadow="md"
              borderWidth="1px"
            >
              <UpdootSection post={post} />
              <Box flex={1}>
                <NextLink href="/post/[id]" as={`/post/${post.id}`} passHref>
                  <Link>
                    <Heading fontSize="xl">{post.title}</Heading>
                  </Link>
                </NextLink>
                <Text>posted by {post.creator.username}</Text>
                <Flex align="center">
                  <Text flex={1} mt={4}>
                    {post.textSnippet}
                  </Text>
                  {/*If the user is logged in and the post belongs to the user, show the edit and delete buttons*/}
                  <Box ml="auto">
                    <EditDeleteButtons
                      id={post.id}
                      creatorId={post.creator.id}
                    />
                  </Box>
                </Flex>
              </Box>
            </Flex>
          ))
        )}
      </Stack>
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            isLoading={loading}
            m="auto"
            my={8}
            onClick={async () => {
              await fetchMore({
                variables: {
                  limit: variables?.limit,
                  cursor:
                    data.posts.posts[data.posts.posts.length - 1].createdAt,
                },
              });
            }}
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withApollo({ ssr: true })(Index);
