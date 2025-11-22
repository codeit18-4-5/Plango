// 인증이 필요없는 api url
export const NO_AUTH_URLS = [
  "/public",
  "/user/send-reset-password-email",
  "/user/reset-password",
  "/oauthApps",
  "/auth/signUp",
  "/auth/signIn",
  "/auth/refresh-token",
  "/auth/signIn/KAKAO",
  "/groups",
  "/tasks",
];
// 인증이 필요없는 get url
export const NO_AUTH_GET: (string | RegExp)[] = ["/articles", /^\/articles\/\d+\/comments$/];

// 게스트만 접근 가능한 페이지
export const GUEST_ONLY = ["/login", "/signup"];

// 인증이 필요한 보호 라우트
export const PROTECTED_PATHS = ["/my"];
