import React, { InputHTMLAttributes } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useField } from "formik";

type InputFieldProps = InputHTMLAttributes<HTMLElement> & {
  //Make these attributes required
  name: string;
  label: string;
};

const InputField = ({ label, size: _, ...props }: InputFieldProps) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
      />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default InputField;
