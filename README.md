# WDMembershipApp

WDMembershipApp은 React Native와 Expo를 사용하여 개발된 멤버십 관리 애플리케이션입니다.

## 📋 요구사항

### 필수 소프트웨어

#### 1. Node.js

- **버전**: 18.0.0 이상 (Node.js 19+ 권장)
- **설치**: [Node.js 공식 웹사이트](https://nodejs.org/)에서 다운로드
- **확인**: `node --version`

#### 2. npm 또는 yarn

- **npm**: Node.js와 함께 자동 설치
- **yarn**: `npm install -g yarn`으로 설치
- **확인**: `npm --version` 또는 `yarn --version`

#### 3. Expo CLI

```bash
npm install -g @expo/cli
```

#### 4. iOS 개발 (macOS만 해당)

- **Xcode**: App Store에서 다운로드 (최신 버전 권장)
- **iOS Simulator**: Xcode와 함께 설치
- **CocoaPods**: `sudo gem install cocoapods`

#### 5. Android 개발

- **Android Studio**: [Android Developer](https://developer.android.com/studio)에서 다운로드
- **Android SDK**: Android Studio와 함께 설치
- **Android Emulator**: Android Studio에서 설정

## 🚀 설치 및 실행

### 1. 프로젝트 설정

```bash
# 프로젝트 폴더로 이동
cd WDMembershipApp

# 의존성 설치 (중요: legacy-peer-deps 플래그 사용)
npm install --legacy-peer-deps
```

> **⚠️ 중요**: `--legacy-peer-deps` 플래그는 lottie-react-native와 @lottiefiles/dotlottie-react 간의 버전 충돌을 해결하기 위해 **반드시** 필요합니다.

### 2. iOS 의존성 설치 (macOS만 해당)

```bash
cd ios
pod install
cd ..
```

### 3. 앱 실행

#### 방법 1: Expo 개발 서버 시작

```bash
# Expo 개발 서버 시작
npx expo start
# 또는
npm start
```

#### 방법 2: 플랫폼별 직접 실행

```bash
# iOS 시뮬레이터에서 실행
npm run ios
# 또는
npx expo run:ios

# Android 에뮬레이터에서 실행
npm run android
# 또는
npx expo run:android

# 웹 브라우저에서 실행
npm run web
# 또는
npx expo start --web
```

### 4. 개발 도구

#### Expo 개발자 도구

- Expo 개발 서버 시작 후 브라우저에서 자동으로 열림
- QR 코드 스캔으로 실제 기기에서 테스트 가능
- 실시간 리로드 및 디버깅 지원

#### Metro 번들러 캐시 클리어

```bash
# 캐시 문제 발생 시
npx expo start --clear
```

#### Watchman 경고 해결

```bash
# Watchman 재설정 (macOS)
watchman watch-del '/path/to/WDMembershipApp' ; watchman watch-project '/path/to/WDMembershipApp'
```

## 📱 앱 정보

- **앱 이름**: WDMembershipApp
- **Bundle ID**: com.agnes7.WDMembershipApp
- **버전**: 1.0.0
- **플랫폼**: iOS, Android, Web

## 🛠 기술 스택

- **React Native**: 0.79.5
- **Expo**: ~53.0.20
- **React**: 19.0.0
- **TypeScript**: ~5.8.3
- **React Navigation**: ^7.1.17
- **Lottie**: 7.2.2
- **React Native Toast Message**: ^2.3.3
- **React Native Modal**: ^14.0.0-rc.1

## 📁 프로젝트 구조

```
WDMembershipApp/
├── src/
│   ├── components/          # 공통 컴포넌트
│   │   ├── CommonLayout.tsx
│   │   ├── CommonText.tsx
│   │   ├── AuthCommon.tsx
│   │   ├── FaceIdModal.tsx
│   │   └── SideMenu.tsx
│   ├── screens/            # 화면 컴포넌트
│   │   ├── LoginScreen.tsx
│   │   ├── SignUpScreen.tsx
│   │   ├── MainScreen.tsx
│   │   ├── PaymentScreen.tsx
│   │   └── ...
│   ├── context/           # Context API
│   │   └── ToastContext.tsx
│   └── assets/            # 이미지, 폰트 등
├── types/                 # TypeScript 타입 정의
├── navigation/            # 네비게이션 설정
├── styles/               # 글로벌 스타일
├── utils/                # 유틸리티 함수
├── App.tsx               # 메인 앱 컴포넌트
├── package.json          # 의존성 및 스크립트
└── app.json             # Expo 설정
```

## 🔧 주요 기능

### 인증 시스템

- 로그인/회원가입
- 생체 인증 (Face ID/Touch ID)
- PIN 코드 등록
- 비밀번호 재설정

### 멤버십 관리

- 멤버십 정보 조회
- 멤버십 카드 관리
- 멤버십 혜택 안내

### 예약 시스템

- 서비스 예약
- 예약 관리
- 결제 처리

### 설정

- 앱 설정
- 버전 업데이트
- 개인정보 처리방침

## 🐛 문제 해결

### 일반적인 문제들

#### 1. 의존성 설치 실패

```bash
# node_modules 삭제 후 재설치
rm -rf node_modules
npm install --legacy-peer-deps
```

#### 2. Metro 번들러 오류

```bash
# 캐시 클리어
npx expo start --clear
```

#### 3. iOS 빌드 오류

```bash
cd ios
pod deintegrate
pod install
cd ..
```

#### 4. Android 빌드 오류

```bash
# Android Studio에서 Clean Project 실행
# 또는
cd android
./gradlew clean
cd ..
```

#### 5. Watchman 경고

```bash
# Watchman 재설정
watchman watch-del '/path/to/WDMembershipApp' ; watchman watch-project '/path/to/WDMembershipApp'
```

#### 6. Expo CLI 버전 문제

```bash
# 레거시 Expo CLI 제거
npm uninstall -g expo-cli

# 새로운 Expo CLI 설치
npm install -g @expo/cli
```

### Node.js 버전 문제

- Node.js 18+ 사용 권장
- nvm을 사용하여 버전 관리 권장

### 실행 명령어 확인

```bash
# 사용 가능한 스크립트 확인
npm run

# package.json의 scripts 섹션 확인
cat package.json | grep -A 10 '"scripts"'
```

## 📝 개발 가이드

### 코드 스타일

- TypeScript 사용
- 함수형 컴포넌트 사용
- Hooks 기반 상태 관리

### 폰트 사용

- NanumSquareNeo 폰트 패밀리
- NanumMyeongjo 폰트
- CommonText 컴포넌트 사용

### 상태 관리

- React Context API 사용
- Toast 메시지 시스템
- 로컬 상태는 useState 사용

## 🚀 배포

### Expo EAS Build (권장)

```bash
# EAS CLI 설치
npm install -g @expo/eas-cli

# 로그인
eas login

# 빌드 설정
eas build:configure

# iOS 빌드
eas build --platform ios

# Android 빌드
eas build --platform android
```

### 수동 빌드

```bash
# iOS
npx expo run:ios --configuration Release

# Android
npx expo run:android --variant release
```

## 📞 지원

문제가 발생하거나 질문이 있으시면:

1. 이슈 트래커에 등록
2. 개발팀에 문의

## 📄 라이선스

이 프로젝트는 비공개 프로젝트입니다.
