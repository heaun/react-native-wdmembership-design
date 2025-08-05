import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, StatusBar } from "react-native";

interface LoginScreenProps {
  onBackPress?: () => void;
  onLoginSuccess?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onBackPress, onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username && password) {
      onLoginSuccess?.();
    }
  };

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>로그인</Text>
        <View style={styles.placeholder} />
      </View>

      {/* 메인 콘텐츠 */}
      <View style={styles.content}>
        <Text style={styles.welcomeText}>반갑습니다.</Text>
        <Text style={styles.subtitleText}>가입하신 계정으로 로그인하세요.</Text>

        {/* 입력 필드 */}
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="아이디" placeholderTextColor="#B1B8C0" value={username} onChangeText={setUsername} />
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
        </View>

        {/* 로그인 상태 유지 */}
        <View style={styles.rememberContainer}>
          <TouchableOpacity style={styles.checkbox}>
            <View style={styles.checkboxInner} />
          </TouchableOpacity>
          <Text style={styles.rememberText}>로그인 상태 유지</Text>
        </View>

        {/* 로그인 버튼 */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>로그인 하기</Text>
        </TouchableOpacity>

        {/* 링크 */}
        <View style={styles.linksContainer}>
          <TouchableOpacity>
            <Text style={styles.linkText}>아이디 찾기</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity>
            <Text style={styles.linkText}>비밀번호 재설정</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5"
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  backButtonText: {
    fontSize: 24,
    color: "#2B2B2B"
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2B2B2B"
  },
  placeholder: {
    width: 40
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2B2B2B",
    marginBottom: 8
  },
  subtitleText: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 40
  },
  inputContainer: {
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#FFFFFF"
  },
  rememberContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 4,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: "#2B2B2B",
    borderRadius: 2
  },
  rememberText: {
    fontSize: 14,
    color: "#666666"
  },
  loginButton: {
    backgroundColor: "#2B2B2B",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 30
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold"
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  linkText: {
    fontSize: 14,
    color: "#2B2B2B",
    textDecorationLine: "underline"
  },
  divider: {
    width: 1,
    height: 12,
    backgroundColor: "#E5E5E5",
    marginHorizontal: 15
  }
});
