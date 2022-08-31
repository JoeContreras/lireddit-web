import React from "react";
import { Box } from "@chakra-ui/react";
export type WrapperVariant = "small" | "medium";
interface WrapperProps {
  children: React.ReactNode;
  variant?: WrapperVariant;
}

const Wrapper: React.FC<WrapperProps> = ({ variant, children }) => {
  return (
    <Box
      maxW={variant === "medium" ? "800px" : "400px"}
      mx="auto"
      mt={8}
      w="100%"
    >
      {children}
    </Box>
  );
};

export default Wrapper;
