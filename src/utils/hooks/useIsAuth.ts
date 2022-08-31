import { useMeQuery } from "../../generated/graphql";
import { useEffect } from "react";
import { useRouter } from "next/router";

export const useIsAuth = () => {
  const router = useRouter();
  const [{ fetching, data }] = useMeQuery();
  useEffect(() => {
    const notLoggedIn = async () => {
      if (!fetching! && !data?.me) {
        await router.replace("/login?next=" + router.pathname);
      }
    };
    notLoggedIn().catch((e) => console.log(e));
  }, [fetching, router, data]);
};
