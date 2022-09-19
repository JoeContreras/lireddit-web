import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { useRouter } from "next/router";

interface NavbarProps {}

const Navbar = ({}: NavbarProps) => {
  const router = useRouter();
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
      <Flex align="center">
        <NextLink href="/create-post" passHref>
          <Button as={Link} mr={4} colorScheme="teal">
            create post
          </Button>
        </NextLink>
        <Box mr={2}>{data.me.username}</Box>
        <Button
          color="gray.700"
          variant="link"
          isLoading={logoutFetching}
          onClick={async () => {
            await logout({});
            router.reload();
          }}
        >
          logout
        </Button>
      </Flex>
    );
  }
  return (
    <Flex bg="tan" p={4} zIndex={1} position="sticky" top={0}>
      <Flex flex={1} m="auto" align="center" maxW={800}>
        <NextLink href="/" passHref>
          <Link>
            <Heading>Lireddit</Heading>
          </Link>
        </NextLink>
        <Box ml="auto">{body}</Box>
      </Flex>
    </Flex>
  );
};

export default Navbar;
