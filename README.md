# 🦩 Plango - 플랭고

<div align="center">
<a href="https://plango-liard.vercel.app/" target="_blank">
<img src="src/assets/landing/logo-flat.svg" width="150">
</a>
</div>

## 🗒️ 프로젝트 소개

> 팀 일정 관리·커뮤니케이션·자유게시판·개인 히스토리를 한 곳에서 관리하는 협업 플랫폼입니다.  
> 개인 투두리스트뿐만 아니라 팀 단위 일정·할 일 관리·일일 리포트까지 확인할 수 있는 서비스입니다.

## 🎯 프로젝트가 해결하려는 문제

> 개인 중심 투두리스트 앱의 한계  
> 여러 플랫폼을 오가며 관리해야 하는 팀 일정·업무·공유·게시물 관리의 비효율성  
> 팀 협업에서 발생하는 권한 관리, 접근 제어, 역할 기반 UI 차이 등 실무 요구사항

## ✅ 프로젝트 선정 이유

1. 관리자/팀원 권한 관리
   - 역할(Role)에 따라 접근 가능한 기능이 다른 구조
   - 관리자 리포트(진행도 원형 차트 UI)
   - 토큰 기반 팀원 초대
2. 인증/인가 구현 (OAuth + JWT 기반 인증)
   - 카카오 로그인(OAuth) 경험
   - Refresh Token + Access Token 구조의 실제 동작 설계
   - 쿠키 기반 인증 및 보안 처리
   - Middleware 기반 페이지 보호
3. 투두리스트에서 요구되는 복잡한 UI 및 비즈니스 로직
   - Intercepting Routes를 이용한 URL 기반 모달
   - 날짜 및 시간 선택과 반복옵션에 따른 로직 처리
   - 드래그 앤 드랍의 리스트 정렬 기능
4. 자유게시판을 통한 소셜 기능 경험
   - 댓글 CRUD, 좋아요(낙관적 업데이트)
   - 무한 스크롤, 검색, 정렬 기능
   - 이미지 업로드(드래그&드롭 + 파일 제한)

## 📆 프로젝트 기간

> 2025.11.06 ~ 2025.12.04 (4주)

1. 프로젝트 분석 및 리브랜딩 (3 WORKING DAYS)
2. 공통컴포넌트 구현 (6 WORKING DAYS)
3. 페이지 구현 (14 WORKING DAYS)
4. 기능개선 및 QA (4 WORKING DAYS)

## 👥 팀원 구성 및 역할

<table align="center" width="100%">
  <tr>
    <td align="center" valign="top" width="25%">
      <img width="150" height="150" alt="profile" src="https://github.com/user-attachments/assets/5823eb03-d6b1-4bc7-993b-35e3ca9f2b79" />
      <div style="padding-top:6px; padding-bottom:6px">
        <a href="https://github.com/sohyun0" target="_blank">
            <strong>위소현 / PL</strong>
        </a>
      </div>
      <ul align="left">
        <li>Button / Button Floating</li>
        <li>Input / Textarea / checkbox</li>
        <li>Toast / List</li>
        <li>Auth 설계</li>
        <li>로그인·회원가입</li>
        <li>카카오 로그인</li>
        <li>비밀번호 재설정</li>
        <li>계정설정</li>
        <li>마이 히스토리</li>
        <li>랜딩페이지</li>
        <li>리디자인</li>
        <li>README</li>
        <li>GitHub Wiki</li>
      </ul>
    </td>
    <td align="center" valign="top" width="25%">
      <img width="150" height="150" alt="profile" src="https://github.com/user-attachments/assets/45cb0632-f2a9-4188-8198-3cd07bafcff6" />
      <div style="padding-top:6px; padding-bottom:6px">
        <a href="https://github.com/sejin5" target="_blank">
            <strong>오세진 / FE</strong>
        </a>
      </div>
      <ul align="left">
        <li>Icon / Badge</li>
        <li>Dropdown</li>
        <li>Header / GNB</li>
        <li>Container</li>
        <li>팀 페이지</li>
        <li>팀 생성하기</li>
        <li>팀 참여하기</li>
        <li>팀 개별 페이지</li>
        <li>404 페이지</li>
        <li>Jira 셋팅</li>
        <li>발표</li>
      </ul>
    </td>
    <td align="center" valign="top" width="25%">
      <img width="150" height="150" alt="profile" src="https://github.com/user-attachments/assets/f8023f3a-6913-4cfe-a21a-73755b0ef021" />
      <div style="padding-top:6px; padding-bottom:6px">
        <a href="https://github.com/nidor022" target="_blank">
            <strong>이루리 / FE</strong>
        </a>
      </div>
      <ul align="left">
        <li>Alert</li>
        <li>Modal</li>
        <li>Datepicker</li>
        <li>Timepicker</li>
        <li>할일 리스트</li>
        <li>할일 상세</li>
        <li>할일 목록 등록</li>
        <li>할일 상세 등록</li>
        <li>시연영상 제작</li>
      </ul>
    </td>
    <td align="center" valign="top" width="25%">
    <img width="150" height="150" alt="profile" src="https://github.com/user-attachments/assets/f093f4a1-fe33-4a9b-83d8-6a626b2cd6a0" />
      <div style="padding-top:6px; padding-bottom:6px">
        <a href="https://github.com/suuuuya" target="_blank">
            <strong>이연수 / FE</strong>
        </a>
      </div>
      <ul align="left">
        <li>Font + Color + Shadow</li>
        <li>Skeleton UI</li>
        <li>Reply / Input Reply</li>
        <li>Image Upload</li>
        <li>Card</li>
        <li>Avatar</li>
        <li>랜딩 페이지</li>
        <li>자유게시판</li>
        <li>상세 페이지</li>
        <li>작성/수정 페이지</li>
        <li>랜딩페이지</li>
        <li>리디자인</li>
        <li>프로젝트 기초 세팅</li>
        <li>노션 문서화/정리 </li>
      </ul>
    </td>
  </tr>
</table>

## 🛠️ 기술 스택

### Frontend

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-5E412F?style=for-the-badge&logo=react&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3068B7?style=for-the-badge&logo=zod&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

### UI & 스타일링

![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![CVA](https://img.shields.io/badge/CVA-000000?style=for-the-badge&logo=vercel&logoColor=white)
![React Skeleton](https://img.shields.io/badge/Skeleton_UI-9CA3AF?style=for-the-badge)
![Motion](https://img.shields.io/badge/Motion-000000?style=for-the-badge&logo=framer&logoColor=white)

### 테스트 & 품질 관리

![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white)
![Storybook](https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white)
![Husky](https://img.shields.io/badge/Husky-000000?style=for-the-badge&logo=husky&logoColor=white)
![Lint Staged](https://img.shields.io/badge/lint--staged-3DDC84?style=for-the-badge)

### 협업 & 배포

![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Jira](https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=jira&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-FF7262?style=for-the-badge&logo=figma&logoColor=white)
![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)

## 🚀 실행 방법

```bash
# 1. 저장소 클론
git clone https://github.com/codeit18-4-5/Plango.git

# 2. 폴더 이동
cd Plango

# 3. 의존성 설치
npm install

# 4. 개발 서버 실행
npm run dev
```

## 🔐 환경변수

```bash
NEXT_PUBLIC_APP_URL=프로젝트_URL
NEXT_PUBLIC_API_URL=API_BASE_URL
NEXT_PUBLIC_KAKAO_REST_API_KEY=카카오_REST_API_KEY
NEXT_PUBLIC_KAKAO_REDIRECT_URI=카카오_OAuth_리다이렉트_URI
NEXT_PUBLIC_PASSWORD_REDIRECT_URL=비밀번호재설정_리다이렉트_URL
```

## 📁 폴더 구조

```bash
src
├── api/                     # API 요청 함수 (Axios 기반)
├── app/                     # Next.js App Router 구조
│   ├── (auth)/              # 로그인·회원가입 등 인증 관련 페이지
│   ├── (routes)/            # 일반 서비스 페이지
│   ├── api/                 # Next.js API Route
│   └── layout.tsx           # 전체 레이아웃
│
├── assets/                  # 정적 리소스
│   ├── font/
│   ├── icons/
│   └── landing/
│
├── components/
│   ├── features/            # 기능 컴포넌트
│   ├── layout/              # 레이아웃 구성 요소
│   ├── skeleton-ui/         # 로딩 스켈레톤 UI
│   └── ui/                  # 공통 UI 컴포넌트
│
├── constants/               # 상수 및 공통 설정 값
├── context/                 # React Context 관리
├── hooks/                   # 커스텀 훅
├── lib/                     # 유틸리티, 헬퍼 함수, 로직 모듈
├── providers/               # 전역 Provider (QueryClient, Alert 등)
├── store/                   # Zustand 전역 상태
├── stories/                 # Storybook 파일
├── styles/                  # 전역 스타일, Tailwind 설정
└── types/                   # TypeScript 타입 정의
```

## ✨ 주요 기능

### 인증

- 이메일 회원가입 / 로그인
- Kakao OAuth 로그인
- 자동 로그인 유지 & 토큰 자동 갱신
- Middleware 기반 라우팅 보호
- JWT 기반 인증

### 상태 관리

- React Query로 서버 상태 캐싱, 에러/로딩 상태 관리, 낙관적 업데이트
- Zustand로 인증·전역 UI 상태 등 클라이언트 상태 관리
- Axios 인터셉터 기반 api 흐름 관리

### 인터렉션 & UI/UX

- Framer Motion으로 인터랙션 모션 컴포넌트 구현
- Skeleton UI로 초기 로딩 경험 개선
- Optimistic UI 적용으로 좋아요/댓글 반응 속도 향상

### 컴포넌트 문서화 & 개발 환경

- Storybook을 통한 디자인 시스템 기반 컴포넌트 문서화
- CVA, clsx, tailwind-merge 기반으로 일관된 UI 컴포넌트 구축
- 자체 디자인 토큰 시스템 적용

### Form Handling & Validation

- React Hook Form을 활용한 폼 상태 관리
- Zod 기반 스키마 유효성 검증으로 타입 안전성 강화
- 폼 UI와 검증 로직의 분리로 유지보수성 향상
- 서버 에러와 클라이언트 검증을 통합 처리하여 인증 폼 안정성 확보

### Compound Component Pattern

- 컴포넌트 내부에서 역할 단위로 구조를 나누고 조합 방식의 자유도를 높이는 패턴
- 컴포넌트 소비자가 필요한 구조만 선택해 조합할 수 있어 확장성·유연성·재사용성이 크게 향상됨
- 다양한 구성의 UI 및 요구사항 변경 에도 구조를 다시 만들지 않고 부분 단위로 커스터마이징 가능
- 컴파운드 패턴을 사용으로 인해 컴포넌트의 재사용성 증가 + UI 확장성 확보 + 유지보수성 강화
- Dropdown: TriggerIcon, TriggerSelect, Menu, Option
- Input: Label, Field, Error, Password, Search
- Card: Badge, Content, Info
- Modal: Header, Body, Footer

## ✨ 주요 페이지별 기능

### 팀 페이지
<img width="360" alt="img-2" src="https://github.com/user-attachments/assets/2d53fd85-0fc9-4680-80b6-fe08a4394d30" />

- 팀 생성 / 수정 / 삭제
- 팀원 초대 및 권한 관리 (권한별 UI 노출 분기 처리)
- 팀 대시보드 (할일 · 멤버 · 관리자 리포트)
- SSR로 기준 데이터를 먼저 불러와 빠른 초기 화면 제공
- Hydration 이후 클라이언트에서 권한 정보를 즉시 조회하도록 최적화
- 여러 항목의 업데이트가 발생하는 특성에 맞춰 React Query의 invalidate 전략을 활용하여 캐싱된
  데이터를 최신 상태로 자동 반영
- 페이지 전체를 새로고침하지 않고도 즉각적인 UI 업데이트 경험 제공

### 할 일 설정 및 리스트
<img height="400" alt="img-3" src="https://github.com/user-attachments/assets/4cfd27bd-76ff-4ca1-b643-70c0f62760b7" />

- 날짜 기반 리스트 노출 (캘린더)
- 라벨/반복 옵션
- 상세보기(모달 + Intercepting Route)
- 댓글 기능
- 할 일 상태 업데이트(완료/취소)
- SSR + CSR 하이브리드 렌더링을 적용해 초기 로딩 속도를 최적화
- Parallel / Intercepting Routes로 상세 페이지를 모달처럼 띄우며 독립 URL 구조를 가지며 기존 리스트
  상태를 유지함

### 자유게시판
<img height="400" alt="img-4" src="https://github.com/user-attachments/assets/69bd13c0-4722-441c-b851-ed90f9b2a3ca" />

- 검색(Search) 및 정렬(Order) 기능 debounce 적용으로 불필요한 서버 요청 방지 및 성능 최적화
- React Query 기반 검색 결과 캐싱 & 요청 최소화
- 무한 스크롤 기반 콘텐츠 로딩
- Optimistic Update를 적용하여 좋아요 및 댓글의 UI가 서버 응답을 기다리지 않고 즉시 업데이트되어
  사용자 피드백 강화

### 마이 히스토리
<img height="400" alt="img-1" src="https://github.com/user-attachments/assets/2ee463f5-feea-4195-bea3-f4c3ce3e4ff1" />

- SSR 초기 렌더링 + CSR 이후 데이터 갱신 구조를 적용하여 초기 진입 시 빠르고 안정적인 첫 화면 제공
- 데이터 패치 실패 시 사용자에게 ‘다시 불러오기’ 버튼 제공하여 에러 상황에서도 사용자 흐름이 끊기지
  않도록 복구 기능 지원
