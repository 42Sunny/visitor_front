# Visitor_front

## 개요

- 해당 저장소는 (재)이노베이션 아카데미의 방문 예약을 신청하기 위한 [서비스](https://visitor.42seoul.io/)의 클라이언트 프로젝트입니다. 서버 프로젝트는 해당 [저장소](https://github.com/innovationacademy-kr/visitor-backend)로 이동해주세요.
- 시설 관리자를 위한 어드민 사이트의 프로젝트는 해당 저장소에서 확인하실 수 있습니다.

<br /><br />

## 프로젝트 구조

```
├── src
│    ├── @types
│    ├── assets
│    ├── components
│    ├── contexts
│    ├── hooks
│    ├── pages
│    └── tools
└──
```

- @types : 전역으로 사용되는 타입을 정의하기 위한 파일로 구성.
- assets : 이미지, 폰트, CSS와 같은 정적 파일들로 구성.
- components : 페이지를 구성하는 컴포넌트 파일들로 구성.
- contexts : 페이지에서 전역적으로 사용하는 변수를 저장하는 Context API로 구성.
- hooks : 각종 Custom Hooks들로 구성,
- pages : 라우트 경로별로 렌더링되는 page들로 구성.
- tools : 반복 사용되는 함수들로 구성.
  <br /><br />

## 설치 및 실행 방법

0. 해당 저장소를 클론해주세요.
1. 의존성 패키지들을 설치합니다.
   `npm install` or `yarn`
2. 환경 변수 파일을 구성합니다. (구성 내용은 아래 내용 확인)
3. 환경에 맞게 빌드 혹은 실행합니다.
   1. 실행할 경우 : .env.local 파일을 대상으로 환경 변수를 설정하며, `npm start` 혹은 `yarn start`로 실행할 수 있다.
   2. 빌드할 경우 : .env.prod 파일을 대상으로 환경 변수를 설정하며, `npm start build_prod` 혹은 `yarn build_prod`로 빌드 할 수 있다.
      <br /><br />

## 환경 변수 파일

```
REACT_APP_AUTH_KEY=${X-Custom-header에 들어갈 값}
REACT_APP_API_URL=${서버 API 주소}
REACT_APP_ENVIRONMENT=${빌드 환경 이름 (ex: local, production, ...)}
REACT_APP_SENTRY_DSN=https:${Sentry설정을 위한 DSN}
```

위의 내용과 같이 환경 변수 파일을 구성합니다.
<br /><br />

## 사용 스택

- React
- Typescript
