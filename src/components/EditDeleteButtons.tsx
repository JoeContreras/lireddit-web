import React from "react";
import NextLink from "next/link";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, IconButton, Link } from "@chakra-ui/react";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface EditDeleteButtonsProps {
  id: number;
  creatorId: number;
}

const EditDeleteButtons = ({ id, creatorId }: EditDeleteButtonsProps) => {
  const [, deletePost] = useDeletePostMutation();
  const [{ data: meData }] = useMeQuery();

  if (meData?.me?.id !== creatorId) {
    return null;
  }

  return (
    <Box>
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`} passHref>
        <IconButton
          mr={4}
          aria-label="update post"
          as={Link}
          icon={<EditIcon h={5} w={5} />}
          color="teal.400"
        />
      </NextLink>
      <IconButton
        aria-label="delete post"
        icon={<DeleteIcon h={5} w={5} />}
        color="red.400"
        onClick={async () => {
          await deletePost({ id: id });
        }}
      />
    </Box>
  );
};

export default EditDeleteButtons;
