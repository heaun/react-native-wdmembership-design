import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Linking, Alert } from "react-native";
import Toast, { BaseToast, ErrorToast, InfoToast } from "react-native-toast-message";
import * as Font from "expo-font";
import { SplashScreen } from "./src/screens/SplashScreen";
import { IntroScreen } from "./src/screens/IntroScreen";
import { LoginScreen } from "./src/screens/LoginScreen";
import { AuthenticationScreen } from "./src/screens/AuthenticationScreen";
import { ResetPasswordScreen } from "./src/screens/ResetPasswordScreen";
import { AppNavigator } from "./navigation/AppNavigator";
import { ToastProvider, useToast } from "./src/context/ToastContext";
import { SignUpScreen } from "./src/screens/SignUpScreen";
import { MembershipResultScreen } from "./src/screens/MembershipResultScreen";
import { MembershipGuideScreen } from "./src/screens/MembershipGuideScreen";
import { MembershipDetailScreen } from "./src/screens/MembershipDetailScreen";

type ScreenType =
  | "splash"
  | "intro"
  | "login"
  | "findId"
  | "resetPassword"
  | "resetPasswordScreen"
  | "signup"
  | "membershipResult"
  | "membershipGuide"
  | "membershipDetail"
  | "main";

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("splash");
  const [foundUserId, setFoundUserId] = useState<string>("");
  const [membershipResultData, setMembershipResultData] = useState<{ approveStatus: boolean }>({ approveStatus: true });
  const [selectedMembershipId, setSelectedMembershipId] = useState<string>("");
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { showToast } = useToast();

  // 폰트 로드
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "NanumSquareNeo-aLt": require("./assets/fonts/NanumSquareNeo-aLt.ttf"),
        "NanumSquareNeo-bRg": require("./assets/fonts/NanumSquareNeo-bRg.ttf"),
        "NanumSquareNeo-cBd": require("./assets/fonts/NanumSquareNeo-cBd.ttf"),
        "NanumSquareNeo-dEb": require("./assets/fonts/NanumSquareNeo-dEb.ttf"),
        "NanumSquareNeo-eHv": require("./assets/fonts/NanumSquareNeo-eHv.ttf"),
        NanumMyeongjo: require("./assets/fonts/NanumMyeongjo.ttf"),
        NanumMyeongjoExtraBold: require("./assets/fonts/NanumMyeongjoExtraBold.ttf")
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  // Toast 커스텀 설정
  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: "#B48327",
          backgroundColor: "#FFFFFF",
          borderRadius: 8,
          marginHorizontal: 20,
          marginBottom: 50,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3
        }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 16,
          fontWeight: "800",
          color: "#2B2B2B"
        }}
        text2Style={{
          fontSize: 14,
          fontWeight: "400",
          color: "#505866"
        }}
      />
    ),
    error: (props: any) => (
      <ErrorToast
        {...props}
        style={{
          borderLeftColor: "#FF3B30",
          backgroundColor: "#FFFFFF",
          borderRadius: 8,
          marginHorizontal: 20,
          marginBottom: 50,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3
        }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 16,
          fontWeight: "800",
          color: "#2B2B2B"
        }}
        text2Style={{
          fontSize: 14,
          fontWeight: "400",
          color: "#505866"
        }}
      />
    ),
    info: (props: any) => (
      <InfoToast
        {...props}
        style={{
          borderLeftColor: "#007AFF",
          backgroundColor: "#FFFFFF",
          borderRadius: 8,
          marginHorizontal: 20,
          marginBottom: 50,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3
        }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 16,
          fontWeight: "800",
          color: "#2B2B2B"
        }}
        text2Style={{
          fontSize: 14,
          fontWeight: "400",
          color: "#505866"
        }}
      />
    )
  };

  const printLog = (message: string, args: any = {}, isToast: boolean = false) => {
    console.log(message, args);
    if (isToast) {
      showToast("info", "", message);
    }
  };

  const handleSignupPress = () => {
    printLog("멤버십 가입 버튼 클릭");
    setCurrentScreen("signup");
  };

  const handleLoginPress = () => {
    printLog("로그인 버튼 클릭");
    setCurrentScreen("login");
  };

  const handleBackPress = () => {
    printLog("뒤로가기 버튼 클릭");
    setCurrentScreen("intro");
  };

  const handleLoginSuccess = () => {
    printLog("로그인 성공 - 메인 화면으로 이동");
    setCurrentScreen("main");
  };

  const handleRegisterSuccess = (result: any) => {
    printLog("회원가입 완료:", result);
    if (result?.action === "navigateToMembershipResult") {
      setCurrentScreen("membershipResult");
      setMembershipResultData({ approveStatus: result.approveStatus });
    } else if (result?.action === "navigateToLogin") {
      setCurrentScreen("login");
    } else {
      // 기본적으로 메인 화면으로 이동
      setCurrentScreen("main");
    }
  };

  const handleFindIdPress = () => {
    printLog("아이디 찾기 화면으로 이동");
    setCurrentScreen("findId");
  };

  const handleAuthentication = (mode: string, result: any) => {
    if (mode === "findId") {
      if (result.action === "navigateToResetPassword") {
        // 아이디 찾기 완료 후 비밀번호 재설정으로 이동
        printLog("아이디 찾기 완료 후 비밀번호 재설정으로 이동:", result);
        setCurrentScreen("resetPasswordScreen");
        // 아이디 정보를 전역 상태로 저장하거나 ResetPasswordScreen에 전달
        setFoundUserId(result.foundUserId);
      } else {
        printLog("아이디 찾기 성공:", result);
        setCurrentScreen("login");
      }
    } else if (mode === "resetPassword") {
      if (result.action === "navigateToResetPassword") {
        printLog("ResetPasswordScreen으로 이동");
        setCurrentScreen("resetPasswordScreen");
        // 입력한 이메일 값을 foundUserId로 설정
        setFoundUserId(result.foundUserId || "");
      } else {
        printLog("비밀번호 재설정 성공:", result);
        // showToast("success", "비밀번호 재설정 완료", "새로운 비밀번호로 재설정되었습니다.");
        setCurrentScreen("login");
      }
    }
  };

  const handleResetPasswordPress = () => {
    printLog("비밀번호 재설정 화면으로 이동");
    setCurrentScreen("resetPassword");
  };

  const handleResetPasswordSuccess = () => {
    printLog("비밀번호 재설정 성공", {}, true);
    // showToast("success", "비밀번호 재설정 완료", "새로운 비밀번호로 재설정되었습니다.");
    setCurrentScreen("login");
  };

  const handleLogout = () => {
    printLog("로그아웃 되었습니다", {}, true);
    // showToast("info", "로그아웃", "로그아웃되었습니다.");
    setCurrentScreen("login");
  };

  printLog("현재 화면:", { currentScreen });

  // 폰트가 로드되지 않았으면 스플래시 화면 표시
  if (!fontsLoaded) {
    return (
      <>
        <SplashScreen onFinish={() => {}} />
        <Toast config={toastConfig} />
      </>
    );
  }

  if (currentScreen === "splash") {
    printLog("SplashScreen 렌더링");
    return (
      <>
        <SplashScreen onFinish={() => setCurrentScreen("intro")} />
        <Toast config={toastConfig} />
      </>
    );
  }

  if (currentScreen === "login") {
    printLog("LoginScreen 렌더링");
    return (
      <>
        <LoginScreen
          onBackPress={handleBackPress}
          onLoginSuccess={handleLoginSuccess}
          onMembershipInfoPress={() => {
            printLog("멤버십 상품 소개 버튼 클릭");
            setCurrentScreen("membershipGuide");
          }}
          onFindIdPress={handleFindIdPress}
          onResetPasswordPress={handleResetPasswordPress}
        />
        <Toast config={toastConfig} />
      </>
    );
  }

  if (currentScreen === "findId" || currentScreen === "resetPassword") {
    printLog("Authentication 렌더링 - mode:", currentScreen);
    return (
      <>
        <AuthenticationScreen
          mode={currentScreen}
          onBackPress={() => setCurrentScreen("login")}
          onSuccess={(result) => handleAuthentication(currentScreen, result)}
        />
        <Toast config={toastConfig} />
      </>
    );
  }

  if (currentScreen === "resetPasswordScreen") {
    printLog("ResetPasswordScreen 렌더링");
    return (
      <>
        <ResetPasswordScreen
          onBackPress={() => setCurrentScreen("login")}
          onResetPasswordSuccess={handleResetPasswordSuccess}
          foundUserId={foundUserId}
        />
        <Toast config={toastConfig} />
      </>
    );
  }

  if (currentScreen === "signup") {
    printLog("SignupScreen 렌더링");
    return (
      <>
        <SignUpScreen onBackPress={() => setCurrentScreen("intro")} onRegisterSuccess={handleRegisterSuccess} />
        <Toast config={toastConfig} />
      </>
    );
  }

  if (currentScreen === "membershipResult") {
    printLog("MembershipResultScreen 렌더링");
    return (
      <>
        <MembershipResultScreen
          onBackPress={() => setCurrentScreen("intro")}
          onSuccess={(result) => {
            printLog("MembershipResultScreen 결과:", result);
            if (result?.action === "navigateToLogin") {
              setCurrentScreen("login");
            } else if (result?.action === "navigateToBenefits") {
              // 멤버십 혜택 둘러보기 페이지로 이동
              setCurrentScreen("membershipGuide");
            }
          }}
          approveStatus={membershipResultData.approveStatus}
        />
        <Toast config={toastConfig} />
      </>
    );
  }

  if (currentScreen === "membershipGuide") {
    printLog("MembershipGuideScreen 렌더링");
    return (
      <>
        <MembershipGuideScreen
          onBackPress={() => setCurrentScreen("login")}
          onMenuItemPress={(itemId) => {
            printLog("멤버십 아이템 선택:", itemId);
            setSelectedMembershipId(itemId);
            setCurrentScreen("membershipDetail");
          }}
        />
        <Toast config={toastConfig} />
      </>
    );
  }

  if (currentScreen === "membershipDetail") {
    printLog("MembershipDetailScreen 렌더링");
    return (
      <>
        <MembershipDetailScreen
          membershipId={selectedMembershipId}
          onBackPress={() => setCurrentScreen("membershipGuide")}
          onConsultationPress={async () => {
            // 상담 문의 처리
            printLog("멤버십 상담 문의");
            const phoneNumber = "1588-1234";
            try {
              const supported = await Linking.canOpenURL(`tel:${phoneNumber}`);
              if (supported) await Linking.openURL(`tel:${phoneNumber}`);
              else Alert.alert("전화 연결 실패", "전화 앱을 열 수 없습니다. 직접 전화를 걸어주세요.");
            } catch (error) {
              Alert.alert("오류 발생", "전화 연결 중 오류가 발생했습니다.");
            }
          }}
        />
        <Toast config={toastConfig} />
      </>
    );
  }

  if (currentScreen === "main") {
    printLog("AppNavigator 렌더링");
    return (
      <>
        <AppNavigator onLogout={handleLogout} />
        <Toast config={toastConfig} />
      </>
    );
  }

  printLog("IntroScreen 렌더링");
  return (
    <>
      <IntroScreen onSignupPress={handleSignupPress} onLoginPress={handleLoginPress} />
      <Toast config={toastConfig} />
    </>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2B2B2B"
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  }
});
