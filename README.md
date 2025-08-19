# WDMembershipApp

WDMembershipApp은 React Native와 Expo를 사용하여 개발된 멤버십 관리 애플리케이션입니다.

## �� 요구사항

### 필수 소프트웨어

#### 1. Node.js

- **버전**: 18.0.0 이상
- **설치**: [Node.js 공식 웹사이트](https://nodejs.org/)에서 다운로드

#### 2. npm 또는 yarn

- **npm**: Node.js와 함께 자동 설치
- **yarn**: `npm install -g yarn`으로 설치

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

## �� 설치 및 실행

### 1. 프로젝트 클론

```bash
git clone <repository-url>
cd react-native-wdmembership-design
```

### 2. 의존성 설치

```bash
npm install --legacy-peer-deps
```

> **참고**: `--legacy-peer-deps` 플래그는 lottie-react-native와 @lottiefiles/dotlottie-react 간의 버전 충돌을 해결하기 위해 필요합니다.

### 3. iOS 의존성 설치 (macOS만 해당)

```bash
cd ios
pod install
cd ..
```

### 4. 앱 실행

#### Expo 개발 서버 시작

```bash
npm start
```

#### 플랫폼별 실행

```bash
# iOS 시뮬레이터에서 실행
npm run ios

# Android 에뮬레이터에서 실행
npm run android

# 웹 브라우저에서 실행
npm run web
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
- **Lottie**: ^7.4.0

## �� 프로젝트 구조
