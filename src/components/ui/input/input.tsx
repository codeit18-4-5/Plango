"use client";
import { ReactNode, useMemo } from "react";
import InputLabel from "./input-label";
import InputField from "./input-field";
import InputError from "./input-error";
import InputPassword from "./input-password";
import InputSearch from "./input-search";
import { InputContext, type InputContextProps } from "./input.context";

type InputProps = {
  children: ReactNode;
} & InputContextProps;

const Input = ({ id, errorMsg, children }: InputProps) => {
  const value = useMemo(() => ({ id, errorMsg }), [id, errorMsg]);
  return (
    <InputContext.Provider value={value}>
      <div className="flex flex-col">{children}</div>
    </InputContext.Provider>
  );
};

Input.Label = InputLabel;
Input.Field = InputField;
Input.Error = InputError;
Input.Password = InputPassword;
Input.Search = InputSearch;

export default Input;
