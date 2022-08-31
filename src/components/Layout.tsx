import React from "react";
import Wrapper, { WrapperVariant } from "./Wrapper";
import Navbar from "./Navbar";

interface LayoutProps {
  variant?: WrapperVariant;
  children: React.ReactNode;
}

const Layout = ({ variant, children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};

export default Layout;
