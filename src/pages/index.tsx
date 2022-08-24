import Navbar from "../components/Navbar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";

const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <>
      <Navbar />
      <p>hello world</p>
      <br />
      {!data
        ? null
        : data.posts.map((post) => (
            <div key={post.id}>
              <p>{post.title}</p>
            </div>
          ))}
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
