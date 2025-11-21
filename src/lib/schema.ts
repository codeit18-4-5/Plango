import { z } from "zod";

export const nicknameSchema = z
  .string()
  .min(1, { error: "닉네임은 필수 입력입니다." })
  .max(10, { error: "닉네임은 최대 10자까지 가능합니다." });

export const emailSchema = z
  .string()
  .min(1, { error: "이메일은 필수 입력입니다." })
  .pipe(z.email({ error: "이메일 형식으로 작성해 주세요." }));

export const passwordSchema = z
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
  );

export const passwordConfirmationSchema = z
  .string()
  .min(1, { error: "비밀번호 확인을 입력해주세요." });

// 회원가입
export const signUpSchema = z
  .object({
    nickname: nicknameSchema,
    email: emailSchema,
    password: passwordSchema,
    passwordConfirmation: passwordConfirmationSchema,
  })
  .refine(data => data.password === data.passwordConfirmation, {
    path: ["passwordConfirmation"],
    error: "비밀번호가 일치하지 않습니다.",
  });
export type SignUpSchema = z.infer<typeof signUpSchema>;

// 로그인
export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
export type SignInSchema = z.infer<typeof signInSchema>;

// 비밀번호 재설정 링크 메일
export const sendEmailSchema = z.object({
  sendEmail: emailSchema,
});
export type SendEmailSchema = z.infer<typeof sendEmailSchema>;

// 비밀번호 재설정
export const changePasswordSchema = z
  .object({
    password: passwordSchema,
    passwordConfirmation: passwordConfirmationSchema,
  })
  .refine(data => data.password === data.passwordConfirmation, {
    path: ["passwordConfirmation"],
    error: "비밀번호가 일치하지 않습니다.",
  });
export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;

// 프로필 변경
export const changeProfileSchema = z.object({
  nickname: nicknameSchema,
});
export type ChangeProfileSchema = z.infer<typeof changeProfileSchema>;

export const isInputEmpty = (value: string) => {
  return !value || (typeof value === "string" && value.trim().length === 0);
};
export const validateRequired = (value: string, label = "필수 항목") => {
  return isInputEmpty(value) ? `${label} 입력해주세요.` : true;
};
