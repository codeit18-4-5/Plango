import { z } from "zod";

export const signUpSchema = z
  .object({
    userName: z
      .string()
      .min(1, { error: "이름은 필수 입력입니다." })
      .max(20, { error: "이름은 최대 20자까지 가능합니다." }),

    userEmail: z
      .string()
      .min(1, { error: "이메일은 필수 입력입니다." })
      .pipe(z.email({ error: "이메일 형식으로 작성해 주세요." })),

    password: z
      .string()
      .min(1, { error: "비밀번호는 필수 입력입니다." })
      .min(8, { error: "비밀번호는 최소 8자 이상입니다." })
      .regex(/^[A-Za-z0-9!@#$%^&*]+$/, {
        error: "비밀번호는 숫자, 영문, 특수문자로만 가능합니다.",
      }),

    passwordConfirm: z.string().min(1, { error: "비밀번호 확인을 입력해주세요." }),
  })
  .refine(data => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    error: "비밀번호가 일치하지 않습니다.",
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  userEmail: z
    .string()
    .min(1, { error: "이메일은 필수 입력입니다." })
    .pipe(z.email({ error: "이메일 형식으로 작성해 주세요." })),

  password: z.string().min(1, { error: "비밀번호는 필수 입력입니다." }),
});

export type SignInSchema = z.infer<typeof signInSchema>;

export const isInputEmpty = (value: string) => {
  return !value || (typeof value === "string" && value.trim().length === 0);
};
export const validateRequired = (value: string, label = "필수 항목") => {
  return isInputEmpty(value) ? `${label}을(를) 입력해주세요.` : true;
};
