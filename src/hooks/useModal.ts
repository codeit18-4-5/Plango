import { useState } from "react";

interface ModalProps {
  isOpenModal: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useModal = (): ModalProps => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  return { isOpenModal, openModal, closeModal };
};
