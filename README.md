<img width="280" height="68" alt="LOGO" src="https://github.com/user-attachments/assets/18d8dd77-197f-42e3-a1a2-190d8d82e5c4" />


# 🏎️ AfterLap

> 한국 F1 팬들을 위한 결과 기반 분석 & 정보 팬사이트

AfterLap은 Formula 1 시즌 데이터를 기반으로  
**드라이버 / 팀 / 시즌별 성적을 직관적으로 분석**할 수 있도록 만든  
한국어 중심 F1 결과 분석 팬사이트입니다.

단순 뉴스 전달이 아닌,  
**“레이스가 끝난 이후(After Lap)”의 데이터를 정리하고 해석하는 것**에 초점을 둡니다.

---

## 🔍 주요 기능

- 🧑‍✈️ **드라이버 페이지**
  - 시즌별 순위, 소속 팀
  - Wins / Podiums / Poles 자동 계산
  - 연도별 커리어 흐름 시각화

- 🏎️ **팀 페이지**
  - 시즌별 드라이버 구성
  - 팀 컬러 & 아이덴티티 기반 UI
  - 연도별 팀 성적 비교

- 📅 **시즌 데이터 구조화**
  - 시즌(year) 기준 데이터 분리
  - 2023 ~ 2026 시즌 대응
  - 시즌 추가 시 자동 확장 가능

- 🇰🇷 **한국 팬 최적화**
  - 드라이버 한글 이름
  - 한국어 팀명 / 설명
  - 모바일 우선 UI

---

## 🖼️ Preview
<img width="200" height="666" alt="전체 요약1" src="https://github.com/user-attachments/assets/ce395b4f-b31f-4d7a-825f-3e3b87941c21" />
<img width="200" height="666" alt="전체 요약2" src="https://github.com/user-attachments/assets/f374ca9b-8624-4a67-904a-b9568532da6b" />
<img width="200" height="666" alt="전체 요약3" src="https://github.com/user-attachments/assets/93a18f1b-f031-48e2-88c6-54cdd836c230" />
<img width="200" height="666" alt="전체 요약5" src="https://github.com/user-attachments/assets/7c99c8b9-9786-4dc5-8816-30d6bb54acce" />


> 모든 이미지는 비상업적 F1 팬 프로젝트 용도로 사용됩니다.

---

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Image**: next/image
- **State / Data**: Server Components + Derived Data
- **Deploy**: Vercel

---

## 🧠 데이터 설계 특징

- 시즌(`year`)을 기준으로 성적 데이터 분리
- wins / podiums / poles 등은  
  👉 **API 호출 시점에 동적으로 계산**
- 불필요한 컬럼은 View 레벨에서 제거
- UI는 DB 구조에 종속되지 않도록 설계

---

## 🚧 진행 상태

- [x] 드라이버 상세 페이지
- [x] 팀 목록 / 팀 페이지
- [x] 시즌별 데이터 구조
- [ ] 레이스 단위 결과 분석
- [ ] 포인트 변화 그래프
- [ ] 즐겨찾기 드라이버

---

## ⚠️ Disclaimer

This project is a **non-commercial fan-made website**.  
Formula 1, F1, and all related trademarks are the property of their respective owners.

---

## 🙌 Author

- **남윤서**
- Frontend / Full-stack Developer
- F1 Fan 🏁

---

## ⭐️ Feedback & Contribution

이 프로젝트는 개인 팬 프로젝트입니다.  
아이디어, 개선 제안, 이슈 등록 언제든 환영합니다!
