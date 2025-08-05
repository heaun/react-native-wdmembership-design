import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import { SplashScreen } from "./src/screens/SplashScreen";
import { IntroScreen } from "./src/screens/IntroScreen";
import { LoginScreen } from "./src/screens/LoginScreen";
import { AppNavigator } from "./navigation/AppNavigator";

type ScreenType = "splash" | "intro" | "login" | "signup" | "main";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("splash");

  const showToast = (type: "success" | "error" | "info", title: string, message: string) => {
    Toast.show({
      type: type,
      text1: title,
      text2: message,
      position: "top",
      visibilityTime: 2000
    });
  };

  const handleSignupPress = () => {
    console.log("멤버쉽 가입 버튼 클릭");
    showToast("info", "멤버쉽 가입", "멤버쉽 가입 화면으로 이동합니다.");
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
    showToast("success", "성공", "로그인 성공! 메인 화면으로 이동합니다.");
    setCurrentScreen("main");
  };

  const handleLogout = () => {
    console.log("로그아웃 버튼 클릭");
    showToast("info", "로그아웃", "로그아웃되었습니다.");
    setCurrentScreen("intro");
  };

  console.log("현재 화면:", currentScreen);

  if (currentScreen === "splash") {
    console.log("SplashScreen 렌더링");
    return (
      <>
        <SplashScreen onFinish={() => setCurrentScreen("intro")} />
        <Toast />
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
            console.log("멤버쉽 상품 소개 버튼 클릭");
            showToast("info", "멤버쉽 상품 소개", "멤버쉽 상품 소개 화면으로 이동합니다.");
          }}
        />
        <Toast />
      </>
    );
  }

  if (currentScreen === "signup") {
    console.log("SignupScreen 렌더링");
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.title}>멤버쉽 가입 화면</Text>
          <TouchableOpacity style={styles.button} onPress={handleBackPress}>
            <Text style={styles.buttonText}>뒤로가기</Text>
          </TouchableOpacity>
        </View>
        <Toast />
      </>
    );
  }

  if (currentScreen === "main") {
    console.log("AppNavigator 렌더링");
    return (
      <>
        <AppNavigator />
        <Toast />
      </>
    );
  }

  console.log("IntroScreen 렌더링");
  return (
    <>
      <IntroScreen onSignupPress={handleSignupPress} onLoginPress={handleLoginPress} />
      <Toast />
    </>
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
