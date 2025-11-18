import { z } from "zod";

export const signUpSchema = z
  .object({
    nickname: z
      .string()
      .min(1, { error: "닉네임은 필수 입력입니다." })
      .max(10, { error: "닉네임은 최대 10자까지 가능합니다." }),

    email: z
      .string()
      .min(1, { error: "이메일은 필수 입력입니다." })
      .pipe(z.email({ error: "이메일 형식으로 작성해 주세요." })),

    password: z
      .string()
      .min(1, { error: "비밀번호는 필수 입력입니다." })
      .pipe(
        z
          .string()
          .min(8, { error: "비밀번호는 최소 8자 이상입니다." })
          .max(30, { error: "비밀번호는 최대 30자까지 가능합니다." })
          .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]+$/, {
            error: "비밀번호는 영문, 숫자, 특수문자를 1자 이상 포함해야 합니다.",
          }),
      ),

    passwordConfirmation: z.string().min(1, { error: "비밀번호 확인을 입력해주세요." }),
  })
  .refine(data => data.password === data.passwordConfirmation, {
    path: ["passwordConfirmation"],
    error: "비밀번호가 일치하지 않습니다.",
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, { error: "이메일은 필수 입력입니다." })
    .pipe(z.email({ error: "이메일 형식으로 작성해 주세요." })),

  password: z.string().min(1, { error: "비밀번호는 필수 입력입니다." }),
});

export type SignInSchema = z.infer<typeof signInSchema>;

export const nicknameSchema = z.object({
  nickname: z
    .string()
    .min(1, { error: "닉네임은 필수 입력입니다." })
    .max(10, { error: "닉네임은 최대 10자까지 가능합니다." }),
});
export type NicknameSchema = z.infer<typeof nicknameSchema>;

export const isInputEmpty = (value: string) => {
  return !value || (typeof value === "string" && value.trim().length === 0);
};
export const validateRequired = (value: string, label = "필수 항목") => {
  return isInputEmpty(value) ? `${label} 입력해주세요.` : true;
};
