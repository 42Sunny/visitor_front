# visitor_front

- 이노베이션 아카데미 방문자 출입 관리 시스템입니다.
  - https://visitor.dev.42seoul.io/
- 아래 설정을 완료하시면 해당 서비스를 사용하실 수 있습니다.

# 설정

1. 아래 명령어를 통해 자료 내려받기<br />
   `git clone https://github.com/idjaeha/visitor.git`<br /><br />
2. Node JS 설치, 버전은 `v14.17.3`를 권장합니다.<br />
   (https://nodejs.org/ko/)<br /><br />
3. yarn 또는 npm install을 통해 dependencies를 설치합니다.
4. .env.\*의 이름을 가진 변수 파일을 작성하여 1번 과정에서 받아진 자료와 같은 디렉토리에 저장합니다.<br />
   `.env.local` : 테스트를 위해 로컬 환경에서 실행시킬 때 필요한 변수를 저장함.<br />
   `.env.development` : 상용 서버로 배포하기 전, 개발 환경에서 실행시킬 때 필요한 변수를 저장함.<br />
   `.env.production` : 상용 환경에서 실행시킬 대 필요한 변수를 저장함.<br /><br />

   각 파일은 아래와 같은 정보를 저장함. <br />
   (파일을 작성할 때, // 을 포함한 주석 줄은 삭제해도 무방함.)

   ```
   // API 서버에 요청할 때, 필요한 auth key 값
   REACT_APP_AUTH_KEY=xxxxxxxxxxxxx

   // API 서버 URL
   REACT_APP_API_URL=https://xxx.xxx

   // 현재 환경에 대한 값 (local, develop, production 중 택 1)
   REACT_APP_ENVIRONMENT=production

   // sentry와 연결하기 위한 DSN 값
   REACT_APP_SENTRY_DSN=https://xxx.xxx
   ```

   <br />

5. 원하는 환경별로 실행 및 빌드를 합니다.

   - 로컬에서 실행할 때,
     - `yarn start` 명령어를 통해 리액트 앱을 실행하고, https://localhost:3000 로 접속합니다.
   - 개발 및 상용 환경 빌드할 때,
     - `yarn build_dev(npm start build_dev)` 혹은 `yarn build_prod(npm start build_prod)` 명령어를 통해 빌드합니다. <br/>
       각각 빌드된 파일들은 환경별로 각각 `./build` 경로에 다른 디렉토리로 생성됩니다.

6. 사용하는 환경에 맞게 5번 과정에서 빌드된 파일들을 올려 배포합니다.
   - 현재 visitor 서비스는 AWS s3, AWS cloudfront를 통해 배포합니다.
