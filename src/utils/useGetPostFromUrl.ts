import { useGetIntId } from "./useGetIntId";
import { useSinglePostQuery } from "../generated/graphql";

export const useGetPostFromUrl = () => {
  const intId = useGetIntId();
  return useSinglePostQuery({
    pause: intId === -1,
    variables: {
      postId: intId,
    },
  });
};
