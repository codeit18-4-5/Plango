import type { Meta, StoryObj } from "@storybook/nextjs";
import { useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, validateRequired, type SignUpSchema } from "@/constants/schema";
import Form from "./form";
import { Button, Input } from "@/components/ui";
interface Schema {
  name: string;
  email: string;
  team: string;
}

const handleSubmit = (data: object) => {
  console.log(data);
};

const isValidEmailFormat = (email: string) => {
  const reg = /^[0-9a-zA-Z]([\w.-]*[0-9a-zA-Z])?@[0-9a-zA-Z]([\w.-]*[0-9a-zA-Z])?\.[a-zA-Z]{2,}$/;
  return reg.test(email);
};

const validateEmail = (value: string) => {
  if (!value) return "이메일을 입력해주세요.";
  return isValidEmailFormat(value) ? true : "잘못된 이메일 형식입니다.";
};

function FormFields() {
  const { register, formState } = useFormContext<Schema>();
  const errors = formState.errors;
  return (
    <>
      <Input errorMsg={errors?.name?.message as string}>
        <Input.Label label="이름" />
        <Input.Field
          type="text"
          {...register("name", { validate: v => validateRequired(v, "이름") })}
        />
        <Input.Error />
      </Input>
      <Input errorMsg={errors?.email?.message as string}>
        <Input.Label label="이메일" />
        <Input.Field type="email" {...register("email", { validate: validateEmail })} />
        <Input.Error />
      </Input>
    </>
  );
}

function SignUpFormFields() {
  const { register, formState } = useFormContext<SignUpSchema>();
  const errors = formState.errors;
  return (
    <>
      <Input errorMsg={errors.userName?.message}>
        <Input.Label label="이름" />
        <Input.Field {...register("userName")} />
        <Input.Error />
      </Input>
      <Input errorMsg={errors.userEmail?.message}>
        <Input.Label label="이메일" />
        <Input.Field type="email" {...register("userEmail")} />
        <Input.Error />
      </Input>
      <Input errorMsg={errors?.password?.message}>
        <Input.Label label="비밀번호" />
        <Input.Password {...register("password")} />
        <Input.Error />
      </Input>
      <Input errorMsg={errors?.passwordConfirm?.message}>
        <Input.Label label="비밀번호 확인" />
        <Input.Password {...register("passwordConfirm")} />
        <Input.Error />
      </Input>
    </>
  );
}

const meta: Meta<typeof Form> = {
  title: "UI/Form",
  component: Form,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Form은 react-hook-form의 FormProvider를 활용한 컴포넌트 \n\n" +
          "- 컨텍스트 사용: 하위에서 useFormContext()로 register, errors 등을 가져와 입력 컴포넌트를 연결합니다.\n" +
          "- 검증 연결: zod를 사용한다면 zodResolver(schema)를 resolver prop으로 전달\n" +
          "   / 사용하지 않는다면 register의 validate로 전달\n" +
          "- 에러 표시: errors.field?.message만 문자열로 꺼내 Input.errorMsg에 전달\n" +
          "- 제출 핸들러: onSubmit은 handleSubmit을 통해 호출 (data, methods) 형태로 RHF 메서드에 접근가능\n" +
          "  - 스토리북의 제출 핸들러는 console.log 로 연결되어 확인 가능\n" +
          "- useForm: ...formOptions 으로 useForm 관련 접근 가능 \n",
      },
    },
  },
  argTypes: {
    onSubmit: {
      description: `(data, methods) => void 형태의 제출 핸들러 
    - methods.setError로 서버 에러를 필드에 매핑할 수 있습니다`,
    },
    className: { description: "폼 루트 요소에 적용할 클래스" },
    children: { description: "FormProvider 컨텍스트 내부에서 렌더될 폼 필드들" },
    resolver: {
      description: `검증용 resolver 함수
    - zod를 사용하면 zodResolver(schema)를 전달합니다`,
    },
    mode: {
      description: "검증 트리거 모드(onBlur, onChange 등)",
      control: "select",
      options: ["onBlur", "onChange", "onSubmit", "onTouched", "all"],
    },
    reValidateMode: {
      description: "전체 유효성은 검증 트리거 모드",
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

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Form<Schema> onSubmit={handleSubmit}>
      <FormFields />
      <Button type="submit">확인</Button>
    </Form>
  ),
};

export const WithZod: Story = {
  name: "onBlur mode + WithZod",
  render: () => (
    <Form<SignUpSchema>
      onSubmit={handleSubmit}
      resolver={zodResolver(signUpSchema)}
      mode="onBlur"
      reValidateMode="onChange"
    >
      <SignUpFormFields />
      <Button type="submit">회원가입 하기</Button>
    </Form>
  ),
};
export default meta;
