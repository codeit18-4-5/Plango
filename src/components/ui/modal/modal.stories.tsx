import type { Meta, StoryObj } from "@storybook/nextjs";
import { useRef, useState } from "react";
import Modal from "./modal";
import Button from "../button/button";

const meta: Meta<typeof Modal> = {
  title: "UI/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "모달 예시 (버튼을 누르면 모달창이 열립니다)",
      },
    },
  },
  argTypes: {
    children: {
      description: "모달 내용 (ReactNode)",
    },
  },
};

type Story = StoryObj<typeof meta>;

export const InteractiveModal: Story = {
  render: () => {
    const modalRef1 = useRef<HTMLDialogElement>(null);
    const modalRef2 = useRef<HTMLDialogElement>(null);
    const modalRef3 = useRef<HTMLDialogElement>(null);

    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);

    const handleOpen1 = () => setIsOpen(true);
    const handleOpen2 = () => setIsOpen2(true);
    const handleOpen3 = () => setIsOpen3(true);

    const handleClose = () => {
      setIsOpen(false);
      setIsOpen2(false);
      setIsOpen3(false);
    };

    return (
      <>
        <div className="flex gap-[16px]">
          <Button onClick={handleOpen1}>모달1 열기</Button>
          <Button onClick={handleOpen2}>모달2 열기</Button>
          <Button onClick={handleOpen3}>모달3 열기</Button>
        </div>

        <Modal isOpen={isOpen} onClose={handleClose} ref={modalRef1}>
          <Modal.HeaderWithClose title="모달 형태 1" />
          <Modal.Body>
            <p>모달에 들어갈 내용</p>
            <p>모달에 들어갈 내용</p>
            <p>모달에 들어갈 내용</p>
            <p>모달에 들어갈 내용</p>
            <p>모달에 들어갈 내용</p>
          </Modal.Body>
          <Modal.FooterWithOnlyConfirm
            confirmButtonTitle="만들기"
            onConfirm={() => {
              alert("확인");
              handleClose();
            }}
          />
        </Modal>

        <Modal isOpen={isOpen2} onClose={handleClose} ref={modalRef2}>
          <Modal.HeaderWithOnlyTitle title="모달 형태 2" />
          <Modal.Body>
            <p>모달에 들어갈 내용</p>
            <p>모달에 들어갈 내용</p>
            <p>모달에 들어갈 내용</p>
            <p>모달에 들어갈 내용</p>
            <p>모달에 들어갈 내용</p>
          </Modal.Body>
          <Modal.FooterWithButtons
            confirmButtonTitle="확인"
            onConfirm={() => {
              alert("확인");
              handleClose();
            }}
          />
        </Modal>

        <Modal isOpen={isOpen3} onClose={handleClose} ref={modalRef3}>
          <Modal.HeaderWithOnlyTitle title="모달 형태 3" />
          <div className="px-[50px]">
            <Modal.Body>
              <p>내부 padding 다른 형태</p>
            </Modal.Body>
            <Modal.FooterWithOnlyConfirm
              confirmButtonTitle="확인"
              onConfirm={() => {
                alert("확인");
                handleClose();
              }}
            />
          </div>
        </Modal>
      </>
    );
  },
};

export default meta;
