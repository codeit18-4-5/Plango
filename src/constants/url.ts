export const NO_AUTH_URLS = [
  "/public",
  "/user/send-reset-password-email",
  "/user/reset-password",
  "/oauthApps",
  "/auth/signUp",
  "/auth/signIn",
  "/auth/refresh-token",
  "/auth/signIn/KAKAO",
  "/team",
];
export const NO_AUTH_GET: (string | RegExp)[] = ["/articles", /^\/articles\/\d+\/comments$/];
