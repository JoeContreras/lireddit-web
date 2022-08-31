import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

interface NavbarProps {}

const Navbar = ({}: NavbarProps) => {
  const [isServer, setIsServer] = useState(true);
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer,
  });
  let body = null;

  //UseEffect Only runs in the browser,
  //So, don't run the query(pause:true) only when in ssr
  useEffect(() => setIsServer(false), []);

  //data is loading
  if (fetching) {
    //user not logged in
  } else if (!data?.me) {
    //    user is logged in
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>login</Link>
        </NextLink>
        <NextLink href="register">
          <Link>register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
        <Box mr={2}>{data.me.username}</Box>
        <Button
          variant="link"
          isLoading={logoutFetching}
          onClick={() => {
            logout({});
          }}
        >
          logout
        </Button>
      </Flex>
    );
  }
  return (
    <Flex bg="tan" p={4} zIndex={1} position="sticky" top={0}>
      <Box ml="auto">{body}</Box>
    </Flex>
  );
};

export default Navbar;
