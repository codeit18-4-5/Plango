"use client";

import { createContext } from "react";

export type InputContextProps = {
  id?: string;
  errorMsg?: string;
};

export const InputContext = createContext<InputContextProps | null>(null);
