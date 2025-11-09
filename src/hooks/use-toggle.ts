import { useState } from "react";

type UseToggle = {
  isOpen: boolean;
  toggle: () => void;
  setOpen: () => void;
  setClose: () => void;
};

const useToggle = (init = false): UseToggle => {
  const [isOpen, setIsOpen] = useState(init);
  const toggle = () => setIsOpen(prev => !prev);
  const setOpen = () => setIsOpen(true);
  const setClose = () => setIsOpen(false);
  return { isOpen, toggle, setOpen, setClose };
};
export default useToggle;
