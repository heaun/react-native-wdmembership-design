import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { CommonLayout } from "../components/CommonLayout";

interface LoginScreenProps {
  onBackPress?: () => void;
  onLoginSuccess?: () => void;
  onMembershipInfoPress?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onBackPress, onLoginSuccess, onMembershipInfoPress }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  const handleLogin = () => {
    if (username && password) {
      onLoginSuccess?.();
    }
  };

  const handleKeepLoggedInToggle = () => {
    setKeepLoggedIn(!keepLoggedIn);
  };

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
    >
      {/* Welcome Text */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>반갑습니다.</Text>
        <Text style={styles.subtitleText}>가입하신 계정으로 로그인하세요.</Text>
      </View>

      {/* Input Fields */}
      <View style={styles.inputSection}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="아이디" placeholderTextColor="#B1B8C0" value={username} onChangeText={setUsername} />
          <View style={styles.inputBorder} />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="비밀번호"
            placeholderTextColor="#B1B8C0"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <View style={styles.inputBorder} />
        </View>
      </View>

      {/* Keep Logged In */}
      <View style={styles.keepLoggedInSection}>
        <TouchableOpacity style={[styles.checkbox, keepLoggedIn && styles.checkboxChecked]} onPress={handleKeepLoggedInToggle}>
          {keepLoggedIn && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>
        <Text style={styles.keepLoggedInText}>로그인 상태 유지</Text>
      </View>

      {/* Login Button */}
      <TouchableOpacity
        style={[styles.loginButton, (!username || !password) && styles.loginButtonDisabled]}
        onPress={handleLogin}
        disabled={!username || !password}
      >
        <Text style={styles.loginButtonText}>로그인 하기</Text>
      </TouchableOpacity>

      {/* Links */}
      <View style={styles.linksSection}>
        <TouchableOpacity style={styles.linkButton}>
          <Text style={styles.linkText}>아이디 찾기</Text>
        </TouchableOpacity>
        <View style={styles.linkDivider} />
        <TouchableOpacity style={styles.linkButton}>
          <Text style={styles.linkText}>비밀번호 재설정</Text>
        </TouchableOpacity>
      </View>

      {/* Membership Info Text */}
      <View style={styles.membershipInfoSection}>
        <TouchableOpacity onPress={onMembershipInfoPress}>
          <Text style={styles.membershipInfoText}>멤버쉽 상품 소개</Text>
        </TouchableOpacity>
      </View>
    </CommonLayout>
  );
};

const styles = StyleSheet.create({
  welcomeSection: {
    marginBottom: 40,
    marginTop: 60
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
    marginBottom: 30
  },
  inputContainer: {
    marginBottom: 30
  },
  input: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2B2B2B",
    paddingVertical: 12,
    letterSpacing: -0.64
  },
  inputBorder: {
    height: 1,
    backgroundColor: "#D6DADF",
    marginTop: 8
  },
  keepLoggedInSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40
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
    marginBottom: 40
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
    marginBottom: 40
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
  },
  membershipInfoSection: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30
  },
  membershipInfoText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#B48327",
    letterSpacing: -0.64
  }
});
