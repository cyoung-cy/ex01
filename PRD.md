# 제품 요구사항 정의서 (PRD: Product Requirements Document)

## 1. 프로젝트 개요
* **프로젝트명**: 간단한 웹 게시판 (Simple Bulletin Board)
* **목적**: React Vite 기반의 프론트엔드와 AWS EC2 상의 MySQL 데이터베이스를 연동하여 기본적인 CRUD(생성, 조회, 수정, 삭제) 기능이 구현된 게시판 개발
* **아키텍처**:
  * **Frontend**: React (Vite 환경)
  * **Backend 연동**: `.env` 파일의 환경변수를 활용하여 `axios.create()`로 구성한 Axios 인스턴스를 이용한 REST API 통신 (요청/응답 포맷: `application/json`)
  * **Database**: MySQL (AWS EC2 환경에 호스팅)

## 2. 데이터 구조 (Schema)
* **테이블명**: `boards` (가칭)
* **필드 구성**:
  * `id` (글번호): INT, PRIMARY KEY, AUTO_INCREMENT
  * `title` (제목): VARCHAR(255), NOT NULL
  * `content` (내용): TEXT, NOT NULL
  * `author` (작성자): VARCHAR(100), NOT NULL
  * `created_at` (작성일): DATETIME, DEFAULT CURRENT_TIMESTAMP

## 3. 핵심 기능 요구사항 (CRUD)
1. **전체 검색 (List - Read All)**
   * 게시글 전체 목록을 조회하여 화면에 리스트/테이블 형태로 출력합니다.
   * 표시 항목: 글번호(`id`), 제목(`title`), 작성자(`author`), 작성일(`created_at`).
   * 각 게시글의 제목을 클릭 시 상세(글번호 검색) 페이지로 이동해야 합니다.

2. **글번호 검색 (Detail - Read One)**
   * 특정 글번호(`id`)에 해당하는 게시글의 상세 정보(제목, 내용, 작성자, 작성일)를 조회하여 화면에 출력합니다.
   * 수정 페이지 이동, 삭제, 목록 페이지 이동 버튼을 제공해야 합니다.

3. **등록 (Create)**
   * 새로운 게시글을 작성하는 폼을 제공합니다 (제목, 내용, 작성자 입력 란 필요).
   * 제출(Submit) 시 `POST` 메서드를 통해 JSON 형식으로 데이터를 전송하고 완료 시 목록으로 돌아갑니다.

4. **수정 (Update)**
   * 기존 게시글의 제목과 내용을 수정할 수 있는 폼을 제공합니다.
   * 제출 시 `PUT` 또는 `PATCH` 메서드를 통해 JSON 형식으로 데이터를 갱신합니다.

5. **삭제 (Delete)**
   * 상세 페이지 등에서 특정 게시글을 삭제할 수 있습니다.
   * 삭제 진행 전 사용자에게 브라우저의 `confirm` 창이나 모달을 통해 확인을 받아야 합니다.
   * 삭제 완료 후 전체 목록 페이지로 리다이렉트합니다.

## 4. 비기능적 요구사항 (UI/UX 및 성능)
* **UI 디자인**: 깔끔하고 직관적인 모던 웹 디자인 적용 (사용자가 지정한 CSS 또는 UI 프레임워크 활용).
* **상태 처리**: API 통신 중에는 로딩 스피너 혹은 메시지를 표시하고, 통신 에러 발생 시 사용자에게 적절한 피드백(Alert 등)을 주어야 합니다.
* **라우팅**: SPA(Single Page Application)로서 부드러운 페이지 전환(React Router 등)이 제공되어야 합니다.
