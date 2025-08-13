import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Toast, { BaseToast, ErrorToast, InfoToast } from "react-native-toast-message";
import { SplashScreen } from "./src/screens/SplashScreen";
import { IntroScreen } from "./src/screens/IntroScreen";
import { LoginScreen } from "./src/screens/LoginScreen";
import { FindIdScreen } from "./src/screens/FindIdScreen";
import { ResetPasswordScreen } from "./src/screens/ResetPasswordScreen";
import { AppNavigator } from "./navigation/AppNavigator";
import { ToastProvider, useToast } from "./src/context/ToastContext";

type ScreenType = "splash" | "intro" | "login" | "findId" | "resetPassword" | "signup" | "main";

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("splash");
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

  const handleFindIdPress = () => {
    console.log("아이디 찾기 화면으로 이동");
    setCurrentScreen("findId");
  };

  const handleFindIdSuccess = (userId: string) => {
    console.log("아이디 찾기 성공:", userId);
    showToast("success", "아이디 찾기 완료", `아이디: ${userId}`);
    setCurrentScreen("login");
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
            showToast("info", "멤버십 상품 소개", "멤버십 상품 소개 화면으로 이동합니다.");
          }}
          onFindIdPress={handleFindIdPress}
          onResetPasswordPress={handleResetPasswordPress}
        />
        <Toast config={toastConfig} />
      </>
    );
  }

  if (currentScreen === "findId") {
    console.log("FindIdScreen 렌더링");
    return (
      <>
        <FindIdScreen onBackPress={() => setCurrentScreen("login")} onFindIdSuccess={handleFindIdSuccess} />
        <Toast config={toastConfig} />
      </>
    );
  }

  if (currentScreen === "resetPassword") {
    console.log("ResetPasswordScreen 렌더링");
    return (
      <>
        <ResetPasswordScreen onBackPress={() => setCurrentScreen("login")} onResetPasswordSuccess={handleResetPasswordSuccess} />
        <Toast config={toastConfig} />
      </>
    );
  }

  if (currentScreen === "signup") {
    console.log("SignupScreen 렌더링");
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.title}>멤버십 가입 화면</Text>
          <TouchableOpacity style={styles.button} onPress={handleBackPress}>
            <Text style={styles.buttonText}>뒤로가기</Text>
          </TouchableOpacity>
        </View>
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
