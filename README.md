# 📚 LearnLoop

성인을 위한 자기계발 강의 탐색 및 학습 관리 플랫폼

강의 검색부터 학습 목표 관리까지 한 번에 제공하여 사용자가 꾸준한 학습 습관을 형성할 수 있도록 돕는 웹 서비스입니다.

---

## 🌐 배포

👉 **[[배포 URL 입력](https://learn-loop-sandy.vercel.app/)](https://learn-loop-sandy.vercel.app/)**

---

## 📌 프로젝트 소개

LearnLoop는 자기계발을 원하는 사용자가 다양한 온라인 강의를 탐색하고 학습 목표를 관리할 수 있는 플랫폼입니다.

YouTube API를 활용하여 강의를 검색하고, Firebase Authentication을 통해 로그인 기능을 구현하였습니다.

또한 TodoList, 북마크, 최근 본 강의 기능을 통해 개인 맞춤형 학습 환경을 제공합니다.

### 주요 기능

* 🔍 강의 검색
* 📺 YouTube API 기반 영상 탐색
* ⭐ 관심 강의 저장
* 👀 최근 본 강의 관리
* 📝 학습 목표(TodoList) 관리
* 📈 학습 진행률 확인
* 🔐 Firebase 로그인
* 👤 마이페이지 제공

---

## 🛠 기술 스택

### 💻 Frontend

| 사용기술            | 설명            |
| --------------- | ------------- |
| React           | 컴포넌트 기반 UI 개발 |
| React Router    | 페이지 라우팅       |
| JavaScript ES6+ | 기능 구현         |
| SCSS            | 스타일링          |

### 🔥 Backend / Service

| 사용기술                    | 설명               |
| ----------------------- | ---------------- |
| Firebase Authentication | 이메일 및 Google 로그인 |
| YouTube Data API v3     | 강의 검색 데이터 제공     |
| LocalStorage            | 학습 데이터 저장        |

### 🧰 개발 도구

| 사용기술         | 설명    |
| ------------ | ----- |
| VS Code      | 개발 환경 |
| Git / GitHub | 버전 관리 |
| Figma        | UI 설계 |

### 🚀 Deployment

| 사용기술   | 설명 |
| ------ | -- |
| Vercel | 배포 |

---

## 📆 개발 기간

* 2026.05 ~ 2026.06
* 개인 프로젝트

---

## 📂 프로젝트 구조

```bash
src
┣━━ components
┃   ┣━━ TodoCalendar.jsx
┃   ┣━━ TodoMemo.jsx
┃   ┗━━ TopButton.jsx
┃
┣━━ pages
┃   ┣━━ Home.jsx
┃   ┣━━ Explore.jsx
┃   ┣━━ Login.jsx
┃   ┣━━ Signup.jsx
┃   ┣━━ Mypage.jsx
┃   ┣━━ TodoList.jsx
┃   ┣━━ Savedvideo.jsx
┃   ┗━━ Recentvideo.jsx
┃
┣━━ styles
┃   ┣━━ App.scss
┃   ┣━━ Explore.scss
┃   ┣━━ Login.scss
┃   ┣━━ Mypage.scss
┃   ┣━━ Recentvideo.scss
┃   ┣━━ Savedvideo.scss
┃   ┣━━ TodoCalendar.scss
┃   ┣━━ TodoList.scss
┃   ┣━━ TodoMemo.scss
┃   ┗━━ reset.css
┃
┣━━ firebase.js
┣━━ App.js
┣━━ index.js
┗━━ index.css
```

---

## ✨ 주요 기능

### 🔍 강의 검색

* YouTube API 활용
* 검색어 기반 강의 탐색
* 카테고리별 빠른 검색
* 강의 더보기 기능

### ⭐ 저장한 강의

* 북마크 추가 및 삭제
* 사용자별 저장 데이터 관리

### 👀 최근 본 강의

* 시청한 강의 자동 저장
* 최근 학습 기록 확인

### 📝 TodoList

* 학습 목표 추가
* 학습 목표 수정
* 학습 목표 삭제
* 완료 체크 기능
* 진행률 계산
* 총 학습 시간 계산
* 연속 학습 일수 표시

### 👤 마이페이지

* 로그인 사용자 정보 확인
* 저장한 강의 조회
* 최근 본 강의 조회
* TodoList 관리

### 🔐 로그인

* Firebase Authentication 연동
* 이메일 로그인
* Google 로그인
* 로그아웃 기능

---

## 📈 학습 관리 기능

### 진행률 계산

```javascript
const progress =
  todos.length === 0
    ? 0
    : Math.round(
        (completedCount / todos.length) * 100
      );
```

### 총 학습 시간 계산

```javascript
const totalStudyTime = todos
  .filter(todo => todo.done)
  .reduce((acc, todo) => {
    return acc + getMinutes(todo.time);
  }, 0);
```

---

## 🔥 트러블 슈팅

### 1. Todo 삭제 후 새로고침 시 데이터 복구 문제

#### 문제

Todo를 삭제해도 새로고침 시 다시 나타나는 문제가 발생하였습니다.

#### 해결

todos 상태가 변경될 때마다 localStorage에 저장하도록 수정하였습니다.

```javascript
useEffect(() => {
  localStorage.setItem(
    'learnloopTodos',
    JSON.stringify(todos)
  );
}, [todos]);
```

---

### 2. 사용자별 북마크 데이터 분리

#### 문제

모든 사용자가 동일한 북마크 데이터를 공유하는 문제가 있었습니다.

#### 해결

Firebase 사용자 정보를 기반으로 사용자별 localStorage Key를 분리하여 저장하였습니다.

```javascript
const bookmarkKey =
  `savedVideos_${user.uid}`;
```

---

### 3. YouTube API 429 오류

#### 문제

검색 요청이 많아질 경우 API 호출 제한이 발생했습니다.

#### 해결

초기 추천 강의만 불러오고 검색 시에만 API를 호출하도록 개선하였습니다.

---

## 🚀 향후 개선 계획

* Firebase Firestore 연동
* 학습 통계 대시보드
* 학습 캘린더 고도화
* 카카오 로그인 지원
* 강의 추천 알고리즘 적용
* 다크 모드 지원

