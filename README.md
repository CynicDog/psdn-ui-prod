# Pseudonymization in Production

#### Install Dependencies
```
psdn-ui-prod % npm install 
```

#### Start Locally

```bash
psdn-ui-prod % node ./src/data/mock-server/server.js
```

```bash
psdn-ui-prod % REACT_APP_AZURE_CLIENT_ID=28be6ea0-a7ff-4927-9e17-a46998b33c6b REACT_APP_CHANNEL_API_SERVER_URL=http://localhost:9090  npm run start
```

## Pseudonymizaition UI 앱 권한 처리를 위한 EntraID 앱 등록 (App Registration) 절차 및 내용 

### UI 앱 사용자 인증(Authentication) 프로세스 

1. 비로그인 사용자가 Front 앱에 최초 진입 시 Microsoft 로그인(아이디/비밀번호 && 2FA) 화면으로 디렉션. 
2. 로그인 성공 시 Front 앱으로 리디렉션. 리디렉션과 함께 브라우저는 사용자의 Entra 정보를 내려받음.
3. 로그인 사용자 Entra 정보를 바탕으로 Front 앱 화면이 렌더링됨.

### 앱 등록 시 등록 정보 
1. 앱이 배포된 테넌트 및 구독 정보.
2. 로그인 후 리디렉션 정보 (AKS에 배포된 Front 앱 URL). 
3. 앱이 사용하는 Graph API 사용 목록 (User.Read 등).
4. 앱 내 RBAC을 위한 역할 타입 (Owner, Utilizer, Verifier, Admin). 

### 인증 프로세스에서의 앱 등록의 역할 

1.  Entra ID 상 등록한 후 생성되는 앱의 아이디(Application ID)를 Front 앱 소스 코드 상 환경변수로 주입하여 Microsoft Authentication Library(이하 MSAL) 라이브러리의 클라이언트가 앱 내 생성됨.
2.  MSAL은 사용자가 Front 앱에 진입하였을 때 Microsoft 로그인 화면으로 디렉션을 수행함. Entra ID에 Front 앱에 대한 정보(앱이 배포된 테넌트, 구독 등)가 등록되었으므로. Microsoft 인증 플랫폼은 해당 디렉션을 수행한 Front 앱을 신뢰할 수 있음.
3.  로그인 리디렉션 정보 역시 Microsoft 인증 플랫폼은 알고 있으므로, 인증 플랫폼은 로그인 완료 후 Front 앱으로 리디렉션 수행. 

단, 최초 로그인 시에는 해당 앱의 Graph API 사용에 대한 관리자의 동의가 이루어져야 하며, 일반 사용자는 관리자 동의 전까지는 로그인 절차를 완료할 수 없음.  

   
