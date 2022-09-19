import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
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
import { useState } from "react";
import UpdootSection from "../components/UpdootSection";
import EditDeleteButtons from "../components/EditDeleteButtons";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });
  const [{ data, error, fetching }] = usePostsQuery({
    variables: variables,
  });

  if (!fetching && !data) {
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
        {!fetching && data ? (
          data.posts.posts.map((post) => (
            <Flex key={post.id} p={5} shadow="md" borderWidth="1px">
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
        ) : (
          <div>loading...</div>
        )}
      </Stack>
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            isLoading={fetching}
            m="auto"
            my={8}
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
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

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
