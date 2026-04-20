# Claude Code Vibe Coding 지침서

이 문서는 AI 코딩 어시스턴트(Claude Code 등)가 React + MySQL 기반의 게시판 프로젝트를 구현할 때 사용하는 프롬프트 및 가이드 문서입니다. AI는 `PRD.md` 문서를 먼저 읽고 아래의 지침에 따라 코드를 작성해야 합니다.

## 1. 프로젝트 초기화 및 환경 설정
* **프론트엔드 셋업**: 현재 디렉토리에서 Vite를 사용하여 React 프로젝트를 구성하세요. (`npm create vite@latest . -- --template react-ts` 혹은 JS 템플릿 사용)
* **의존성 설치**: 
  * API 통신: `axios`
  * 라우팅: `react-router-dom`
  * 스타일링: `tailwindcss` (또는 CSS Modules 등 사용자 환경에 맞춤)
* **환경 변수**: `.env` 파일에 백엔드 REST API 기본 URL을 설정하세요.
  * 예: `VITE_API_URL=http://<EC2-IP>:<PORT>/api`

## 2. 코드 작성 원칙 (Vibe Coding 가이드)
1. **컴포넌트 분리**: 기능별로 재사용 가능한 단위로 컴포넌트를 분리하세요.
   * `BoardList` (전체 조회)
   * `BoardDetail` (상세 조회)
   * `BoardForm` (등록 및 수정)
2. **API 레이어 추상화 및 axios 인스턴스 생성**: 
   * `.env` 파일에 선언한 환경 변수를 활용하여 `axios.create()`로 기본 설정(Base URL 등)이 적용된 Axios 인스턴스를 생성하세요.
   * 컴포넌트 내부에 직접 Axios를 호출하지 말고, 이 인스턴스를 사용하여 `src/api/boardApi.js`(또는 `.ts`) 별도 파일에서 API 호출을 관리하세요.
   * 모든 요청과 응답 형식은 `application/json`이어야 합니다.
3. **상태 및 에러 핸들링**: 
   * 데이터를 불러오는 동안 로딩 상태(`isLoading`)를 표시하세요.
   * API 통신 중 발생하는 에러(`error`)는 `try-catch`로 잡아 사용자에게 알림(Alert 등)을 제공하세요.
4. **스타일링**: 직관적이고 모던한 UI를 구성하여, 사용자가 Vibe를 느낄 수 있는 세련된 게시판을 만드세요.

## 3. 단계별 프롬프트 (작업 지시 순서)

Claude Code에게 아래 순서대로 명령을 내려 개발을 진행하세요.

### Step 1: 뼈대 및 라우터 설정
> "현재 디렉토리에 Vite 기반의 React 프로젝트를 세팅하고, `react-router-dom`을 활용하여 `/`(목록), `/board/:id`(상세), `/write`(등록), `/edit/:id`(수정) 4개의 페이지 라우팅 뼈대를 만들어줘."

### Step 2: API 모듈 작성
> "`PRD.md`에 명시된 5가지 CRUD 기능(전체조회, 글번호조회, 등록, 수정, 삭제)을 수행하는 API 호출 함수들을 `src/api/boardApi.js` 파일에 작성해줘. 이때 `.env` 파일에 정의된 변수를 이용해 `axios.create()`로 Axios 인스턴스를 생성해서 활용해줘."

### Step 3: 리스트 및 상세 기능 구현 (Read)
> "먼저 `BoardList` 컴포넌트에서 전체 목록을 불러와서 테이블 형태로 렌더링하고, 제목을 누르면 `BoardDetail`로 이동하도록 구현해줘. 그 다음 `BoardDetail`에서 특정 글 번호의 데이터를 불러와서 보여주는 화면을 만들어줘."

### Step 4: 등록, 수정, 삭제 기능 구현 (Create, Update, Delete)
> "`BoardForm` 컴포넌트를 만들어서 글 등록 기능과 수정 기능을 하나로 처리할 수 있게 구현해줘. 그리고 `BoardDetail` 페이지에 삭제 버튼을 추가하고 누르면 confirm 알림을 띄운 뒤 삭제 API를 호출하도록 해줘."

### Step 5: 스타일링 및 디버깅
> "전체적으로 디자인이 투박하지 않도록 CSS(또는 Tailwind)를 사용해서 현대적이고 예쁜 UI로 다듬어줘. 또한 로딩 스피너와 에러 발생 시의 피드백 화면도 추가해줘."

---

**[사용자 참고사항]**
현재 EC2 백엔드 서버가 아직 동작하지 않는 상황이라면, 백엔드가 완성될 때까지 프론트엔드 작업이 막히지 않도록 다음과 같이 Claude에게 추가 요청을 할 수 있습니다.
> "현재 백엔드 서버가 없으니 `json-server`를 이용해서 프론트엔드 개발을 위한 모킹(Mocking) 환경을 먼저 구축해줘."
