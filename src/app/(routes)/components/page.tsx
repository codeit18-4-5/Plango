"use client";
import { Container } from "@/components/layout";
import { Button, Checkbox, Floating, Input } from "@/components/ui";
import ScrollTopButton from "@/components/ui/button/scroll-top-button";
import Form from "@/components/ui/form/form";
import { signUpSchema, type SignUpSchema } from "@/constants/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

function CheckboxControllerDemo() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="space-y-6">
      <section>
        <h3 className="mb-2 text-base">Controlled</h3>
        <Checkbox checked={checked} onChange={setChecked} label={checked ? "완료됨" : "작업하기"} />

        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => setChecked(prev => !prev)}
            className="rounded border border-gray-600 px-3 py-1 text-sm"
          >
            Toggle
          </button>
          <button
            type="button"
            onClick={() => setChecked(true)}
            className="rounded border border-gray-600 px-3 py-1 text-sm"
          >
            Done
          </button>
          <button
            type="button"
            onClick={() => setChecked(false)}
            className="rounded border border-gray-600 px-3 py-1 text-sm"
          >
            Undo
          </button>
        </div>
        <Checkbox checked readOnly label="읽기 전용" />
      </section>
    </div>
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
      <Input id="email" errorMsg={errors.userEmail?.message}>
        <Input.Label label="이메일" />
        <Input.Field type="email" {...register("userEmail")} />
        <Input.Error />
      </Input>
      <Input id="password" errorMsg={errors?.password?.message}>
        <Input.Label label="비밀번호" />
        <Input.Password {...register("password")} />
        <Input.Error />
      </Input>
      <Input id="passwordConfirm" errorMsg={errors?.passwordConfirm?.message}>
        <Input.Label label="비밀번호 확인" />
        <Input.Password {...register("passwordConfirm")} />
        <Input.Error />
      </Input>
    </>
  );
}

export default function Components() {
  const handleSubmit = (data: object) => {
    console.log(data);
  };

  return (
    <Container>
      <Form<SignUpSchema>
        onSubmit={handleSubmit}
        resolver={zodResolver(signUpSchema)}
        mode="onBlur"
      >
        <SignUpFormFields />
        <Button type="submit">회원가입 하기</Button>
      </Form>
      <CheckboxControllerDemo />
      <div className="h-[1000px] border border-pink-600">ScrollTopButton test box</div>
      <Floating>
        <ScrollTopButton></ScrollTopButton>
      </Floating>
    </Container>
  );
}
