import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions } from "react-native";
import { CommonLayout } from "../components/CommonLayout";
import { LabelText, ButtonText, SmallText, ExtraBoldText } from "../components/CommonText";
import { globalStyles } from "../../styles/globalStyles";

const { height: screenHeight } = Dimensions.get("window");
const isSmallScreen = screenHeight < 700; // iPhone SE 기준

interface LoginScreenProps {
  onBackPress?: () => void;
  onLoginSuccess?: () => void;
  onMembershipInfoPress?: () => void;
  onFindIdPress?: () => void;
  onResetPasswordPress?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onBackPress,
  onLoginSuccess,
  onMembershipInfoPress,
  onFindIdPress,
  onResetPasswordPress
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleLogin = () => {
    if (username && password) {
      onLoginSuccess?.();
    }
  };

  const handleKeepLoggedInToggle = () => {
    setKeepLoggedIn(!keepLoggedIn);
  };

  const buttons = [
    {
      text: "멤버십 상품 소개",
      onPress: () => onMembershipInfoPress?.(),
      style: "custom" as const,
      customStyle: {
        backgroundColor: "transparent",
        textColor: "#B48327"
      }
    }
  ];

  return (
    <CommonLayout
      title="로그인"
      showBackButton={false}
      showTabBar={false}
      showTopIcons={false}
      onBackPress={onBackPress}
      onMenuPress={() => {}}
      onCouponPress={() => {}}
      onNotificationPress={() => {}}
      buttons={buttons}
    >
      <View style={styles.container}>
        {/* Welcome Text */}
        <View style={styles.welcomeSection}>
          <ExtraBoldText style={styles.welcomeText}>반갑습니다.</ExtraBoldText>
          <LabelText style={styles.subtitleText}>가입하신 계정으로 로그인하세요.</LabelText>
        </View>

        {/* Input Fields */}
        <View style={styles.inputSection}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="아이디"
              placeholderTextColor="#B1B8C0"
              value={username}
              onChangeText={setUsername}
              showSoftInputOnFocus={false}
              onFocus={() => setUsernameFocused(true)}
              onBlur={() => setUsernameFocused(false)}
            />
            <View style={[styles.inputBorder, usernameFocused && styles.inputBorderFocused]} />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="비밀번호"
              placeholderTextColor="#B1B8C0"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              showSoftInputOnFocus={false}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
            />
            <View style={[styles.inputBorder, passwordFocused && styles.inputBorderFocused]} />
          </View>
          {/* Keep Logged In */}
          <View style={styles.keepLoggedInSection}>
            <TouchableOpacity style={[styles.checkbox, keepLoggedIn && styles.checkboxChecked]} onPress={handleKeepLoggedInToggle}>
              {keepLoggedIn && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
            <LabelText style={styles.keepLoggedInText}>로그인 상태 유지</LabelText>
          </View>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          style={[styles.loginButton, (!username || !password) && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={!username || !password}
        >
          <ButtonText style={styles.loginButtonText}>로그인 하기</ButtonText>
        </TouchableOpacity>

        {/* Links */}
        <View style={styles.linksSection}>
          <TouchableOpacity style={styles.linkButton} onPress={onFindIdPress}>
            <ButtonText style={styles.linkText}>아이디 찾기</ButtonText>
          </TouchableOpacity>
          <View style={styles.linkDivider} />
          <TouchableOpacity style={styles.linkButton} onPress={onResetPasswordPress}>
            <ButtonText style={styles.linkText}>비밀번호 재설정</ButtonText>
          </TouchableOpacity>
        </View>
      </View>
    </CommonLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",

    paddingHorizontal: 20,
    paddingVertical: isSmallScreen ? 20 : 40
  },
  welcomeSection: {
    marginBottom: isSmallScreen ? 40 : 60,
    alignItems: "flex-start"
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "800",
    color: "#2B2B2B",
    marginBottom: 10,
    letterSpacing: -1.2
  },
  subtitleText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#2B2B2B",
    letterSpacing: -0.64
  },
  inputSection: {
    width: "100%",
    marginBottom: isSmallScreen ? 30 : 40
  },
  inputContainer: {
    marginBottom: isSmallScreen ? 20 : 25
  },
  input: {
    fontSize: 16,
    color: "#2B2B2B",
    paddingVertical: 5,
    fontFamily: "NanumSquareNeo-cBd"
  },
  inputBorder: {
    height: 1,
    backgroundColor: "#D6DADF",
    marginTop: 8
  },
  inputBorderFocused: {
    backgroundColor: "#000000"
  },
  keepLoggedInSection: {
    flexDirection: "row",
    alignItems: "center"
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D6DADF",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10
  },
  checkboxChecked: {
    backgroundColor: "#2B2B2B",
    borderColor: "#2B2B2B"
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold"
  },
  keepLoggedInText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2B2B2B",
    letterSpacing: -0.56
  },
  loginButton: {
    backgroundColor: "#2B2B2B",
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: isSmallScreen ? 30 : 40,
    width: "100%"
  },
  loginButtonDisabled: {
    backgroundColor: "#E5E5E5"
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.64
  },
  linksSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: isSmallScreen ? 15 : 20
  },
  linkButton: {
    paddingHorizontal: 10
  },
  linkText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#505866",
    letterSpacing: -0.56
  },
  linkDivider: {
    width: 1,
    height: 10,
    backgroundColor: "#D6DADF",
    marginHorizontal: 20
  }
});
