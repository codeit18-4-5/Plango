import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ComponentProps } from "react";
import Input from "../input";
import InputField from "../input-field";

type Args = ComponentProps<typeof InputField> & {
  id: string;
  errorMsg?: string;
  label?: string;
};

const meta: Meta<Args> = {
  title: "UI/Input",
  component: InputField,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Input 컴포넌트의 Field",
      },
    },
  },
  argTypes: {
    id: {
      description: `Input:
    - 연결할 input 및 label id`,
      control: "text",
    },
    errorMsg: {
      description: `Input: 
    - 에러 메시지(있으면 경고 스타일 적용)`,
      control: "text",
    },
    children: {
      description: `Input Provider의 하위요소
    - Input.Label
    - Input.Field
    - Input.Error
    - Input.Search
    - Input.Password`,
    },
    label: {
      description: `Input.Label
    - 라벨 텍스트`,
    },
    size: {
      description: `Input.Label
    - 라벨과 인풋 필드사이 간격
    - sm: 유저페이지, 팀페이지 
    - md: 리스트 페이지, 자유게시판
    - Default: sm`,
      control: "radio",
      options: ["sm", "md"],
    },
    hidden: {
      description: `Input.Label
    - 접근성을 고려하여 label을 생성 후 숨김처리 여부 
    - 예: 자유게시판 상단 검색바는 label이 없지만 접근성을 고려하여 label 생성 후 hidden
    - Default: false`,
      control: "boolean",
    },
    required: {
      description: `Input.Label
    - 필수 값일때 라벨 앞 * 표시
    - Default: false`,
      control: "boolean",
    },
    as: {
      description: `Input.Field
    - 태그 선택
    - Default: input`,
      control: "radio",
      options: ["input", "textarea"],
    },
    type: {
      description: `Input.Field 
    - input 태그 type (textarea일 때 무시)`,
    },
    inputSize: {
      description: `input 사이즈
    - sm: 기본 input
    - md: 자유게시판 글쓰기 내부 input
    - Default: sm
    `,
      options: ["sm", "md"],
    },
    disabled: {
      description: `비활성화
    - Default: false`,
    },
  },
  decorators: [
    Story => (
      <div style={{ padding: "3em", background: "#0f172a" }}>
        <Story />
      </div>
    ),
  ],
};

type Story = StoryObj<Args>;

export const Default: Story = {
  args: {
    id: "email",
    errorMsg: "",
    label: "이메일",
    size: "sm",
    hidden: false,
    required: false,

    as: "input",
    type: "email",
    inputSize: "sm",
    disabled: false,
    placeholder: "example@mail.com",
    className: "",
  },
  render: ({ id, errorMsg, label, hidden, size, required, ...fieldProps }) => (
    <Input id={id} errorMsg={errorMsg}>
      {label && <Input.Label label={label} size={size} required={required} hidden={hidden} />}
      <Input.Field {...fieldProps} />
      <Input.Error />
    </Input>
  ),
};
export const Textarea: Story = {
  args: {
    id: "bio",
    label: "소개",
    as: "textarea",
    placeholder: "자기소개를 작성해주세요.",
  },
  render: ({ id, errorMsg, label, hidden, size, required, ...fieldProps }) => (
    <Input id={id} errorMsg={errorMsg}>
      <Input.Label label={label} size={size} required={required} hidden={hidden} />
      <Input.Field {...fieldProps} />
    </Input>
  ),
};
export const Error: Story = {
  args: {
    id: "email",
    label: "이메일",
    errorMsg: "이메일을 입력해주세요",
    placeholder: "example@mail.com",
  },
  render: ({ id, errorMsg, label, hidden, size, required, ...fieldProps }) => (
    <Input id={id} errorMsg={errorMsg}>
      <Input.Label label={label} size={size} required={required} hidden={hidden} />
      <Input.Field {...fieldProps} />
      <Input.Error />
    </Input>
  ),
};
export const Required: Story = {
  args: {
    id: "email",
    label: "이메일",
    required: true,
    errorMsg: "",
    placeholder: "example@mail.com",
  },
  render: ({ id, errorMsg, label, hidden, size, required, ...fieldProps }) => (
    <Input id={id} errorMsg={errorMsg}>
      <Input.Label label={label} size={size} required={required} hidden={hidden} />
      <Input.Field required {...fieldProps} />
      <Input.Error />
    </Input>
  ),
};
export const Disabled: Story = {
  args: {
    id: "email",
    label: "이메일",
    errorMsg: "",
    placeholder: "example@mail.com",
  },
  render: ({ id, errorMsg, label, hidden, size, required, ...fieldProps }) => (
    <Input id={id} errorMsg={errorMsg}>
      <Input.Label label={label} size={size} required={required} hidden={hidden} />
      <Input.Field Disabled value="codeit@codeit.com" {...fieldProps} />
      <Input.Error />
    </Input>
  ),
};
export const NoLabel: Story = {
  args: {
    id: "search",
    label: "검색",
    hidden: true,
    placeholder: "검색어를 입력해주세요",
  },
  render: ({ id, label, hidden, size, required, ...fieldProps }) => (
    <Input id={id}>
      <Input.Label label={label} size={size} required={required} hidden={hidden} />
      <Input.Field {...fieldProps} />
    </Input>
  ),
};
export default meta;
