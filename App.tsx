import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Toast, { BaseToast, ErrorToast, InfoToast } from "react-native-toast-message";
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
  | "main";

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("splash");
  const [foundUserId, setFoundUserId] = useState<string>("");
  const [membershipResultData, setMembershipResultData] = useState<{ approveStatus: boolean }>({ approveStatus: true });
  const { showToast } = useToast();

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

  const handleSignupPress = () => {
    console.log("멤버십 가입 버튼 클릭");
    showToast("info", "멤버십 가입", "멤버십 가입 화면으로 이동합니다.");
    setCurrentScreen("signup");
  };

  const handleLoginPress = () => {
    console.log("로그인 버튼 클릭");
    showToast("info", "로그인", "로그인 화면으로 이동합니다.");
    setCurrentScreen("login");
  };

  const handleBackPress = () => {
    console.log("뒤로가기 버튼 클릭");
    setCurrentScreen("intro");
  };

  const handleLoginSuccess = () => {
    console.log("로그인 성공 - 메인 화면으로 이동");
    showToast("success", "성공", "로그인 성공! 🎉");
    setCurrentScreen("main");
  };

  const handleRegisterSuccess = (result: any) => {
    console.log("회원가입 완료:", result);
    if (result?.action === "navigateToMembershipResult") {
      setCurrentScreen("membershipResult");
      setMembershipResultData({ approveStatus: result.approveStatus });
    } else {
      // 기본적으로 메인 화면으로 이동
      setCurrentScreen("main");
    }
  };

  const handleFindIdPress = () => {
    console.log("아이디 찾기 화면으로 이동");
    setCurrentScreen("findId");
  };

  const handleAuthentication = (mode: string, result: any) => {
    if (mode === "findId") {
      if (result.action === "navigateToResetPassword") {
        // 아이디 찾기 완료 후 비밀번호 재설정으로 이동
        console.log("아이디 찾기 완료 후 비밀번호 재설정으로 이동:", result);
        setCurrentScreen("resetPasswordScreen");
        // 아이디 정보를 전역 상태로 저장하거나 ResetPasswordScreen에 전달
        setFoundUserId(result.foundUserId);
      } else {
        console.log("아이디 찾기 성공:", result);
        showToast("success", "아이디 찾기 완료", `아이디: ${result.userId}`);
        setCurrentScreen("login");
      }
    } else if (mode === "resetPassword") {
      if (result.action === "navigateToResetPassword") {
        console.log("ResetPasswordScreen으로 이동");
        setCurrentScreen("resetPasswordScreen");
        // 입력한 이메일 값을 foundUserId로 설정
        setFoundUserId(result.foundUserId || "");
      } else {
        console.log("비밀번호 재설정 성공:", result);
        showToast("success", "비밀번호 재설정 완료", "새로운 비밀번호로 재설정되었습니다.");
        setCurrentScreen("login");
      }
    }
  };

  const handleResetPasswordPress = () => {
    console.log("비밀번호 재설정 화면으로 이동");
    setCurrentScreen("resetPassword");
  };

  const handleResetPasswordSuccess = () => {
    console.log("비밀번호 재설정 성공");
    showToast("success", "비밀번호 재설정 완료", "새로운 비밀번호로 재설정되었습니다.");
    setCurrentScreen("login");
  };

  const handleLogout = () => {
    console.log("로그아웃 버튼 클릭");
    showToast("info", "로그아웃", "로그아웃되었습니다.");
    setCurrentScreen("login");
  };

  console.log("현재 화면:", currentScreen);

  if (currentScreen === "splash") {
    console.log("SplashScreen 렌더링");
    return (
      <>
        <SplashScreen onFinish={() => setCurrentScreen("intro")} />
        <Toast config={toastConfig} />
      </>
    );
  }

  if (currentScreen === "login") {
    console.log("LoginScreen 렌더링");
    return (
      <>
        <LoginScreen
          onBackPress={handleBackPress}
          onLoginSuccess={handleLoginSuccess}
          onMembershipInfoPress={() => {
            console.log("멤버십 상품 소개 버튼 클릭");
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
    console.log("Authentication 렌더링 - mode:", currentScreen);
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
    console.log("ResetPasswordScreen 렌더링");
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
    console.log("SignupScreen 렌더링");
    return (
      <>
        <SignUpScreen onBackPress={() => setCurrentScreen("intro")} onRegisterSuccess={handleRegisterSuccess} />
        <Toast config={toastConfig} />
      </>
    );
  }

  if (currentScreen === "membershipResult") {
    console.log("MembershipResultScreen 렌더링");
    return (
      <>
        <MembershipResultScreen
          onBackPress={() => setCurrentScreen("intro")}
          onSuccess={(result) => {
            console.log("MembershipResultScreen 결과:", result);
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
    console.log("MembershipGuideScreen 렌더링");
    return (
      <>
        <MembershipGuideScreen
          onBackPress={() => setCurrentScreen("login")}
          onMenuItemPress={(itemId) => {
            console.log("멤버십 아이템 선택:", itemId);
            // 여기서 선택된 멤버십에 대한 상세 페이지로 이동하거나 다른 동작 수행
          }}
        />
        <Toast config={toastConfig} />
      </>
    );
  }

  if (currentScreen === "main") {
    console.log("AppNavigator 렌더링");
    return (
      <>
        <AppNavigator onLogout={handleLogout} />
        <Toast config={toastConfig} />
      </>
    );
  }

  console.log("IntroScreen 렌더링");
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
