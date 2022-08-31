import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import Layout from "../components/Layout";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";

const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <Layout>
      <NextLink href="create-post" passHref>
        <Link>create post</Link>
      </NextLink>
      <br />
      {!data
        ? null
        : data.posts.map((post) => (
            <div key={post.id}>
              <p>{post.title}</p>
            </div>
          ))}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
