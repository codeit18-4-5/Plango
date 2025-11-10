import { useState, useCallback } from "react";

type UseToggle = {
  isOpen: boolean;
  toggle: () => void;
  setOpen: () => void;
  setClose: () => void;
};

const useToggle = (init = false): UseToggle => {
  const [isOpen, setIsOpen] = useState(init);
  const toggle = useCallback(() => setIsOpen(prev => !prev), []);
  const setOpen = useCallback(() => setIsOpen(true), []);
  const setClose = useCallback(() => setIsOpen(false), []);
  return { isOpen, toggle, setOpen, setClose };
};
export default useToggle;
