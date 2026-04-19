// CSS 파일을 TypeScript에서 side-effect import 할 수 있도록 선언.
// (import './globals.css' 같은 구문의 TS2882 에러 방지)
declare module '*.css';
