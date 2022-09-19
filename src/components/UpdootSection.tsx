import React from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

const UpdootSection = ({ post }: UpdootSectionProps) => {
  const [loadingState, setLoadingState] = React.useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");
  const [, vote] = useVoteMutation();
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
      <IconButton
        aria-label="updoot post"
        icon={<ChevronUpIcon h={5} w={5} />}
        isLoading={loadingState === "updoot-loading"}
        colorScheme={post.voteStatus === 1 ? "teal" : undefined}
        onClick={async () => {
          if (post.voteStatus === 1) {
            return;
          }
          setLoadingState("updoot-loading");
          await vote({
            postId: post.id,
            value: 1,
          });
          setLoadingState("not-loading");
        }}
      />
      {post.points}
      <IconButton
        colorScheme={post.voteStatus === -1 ? "red" : undefined}
        aria-label="downdoot post"
        icon={<ChevronDownIcon h={5} w={5} />}
        isLoading={loadingState === "downdoot-loading"}
        onClick={async () => {
          if (post.voteStatus === -1) {
            return;
          }
          setLoadingState("downdoot-loading");
          await vote({
            postId: post.id,
            value: -1,
          });
          setLoadingState("not-loading");
        }}
      />
    </Flex>
  );
};

export default UpdootSection;
