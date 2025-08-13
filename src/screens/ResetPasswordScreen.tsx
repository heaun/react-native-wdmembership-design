import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { CommonLayout } from "../components/CommonLayout";
import { Ionicons } from "@expo/vector-icons";

interface ResetPasswordScreenProps {
  onBackPress?: () => void;
  onResetPasswordSuccess?: () => void;
}

interface ResetPasswordData {
  step: "input" | "result";
  form: {
    newPassword: string;
    confirmPassword: string;
  };
  status: {
    showPassword: boolean;
    showConfirmPassword: boolean;
  };
}

const initialData: ResetPasswordData = {
  step: "input",
  form: {
    newPassword: "",
    confirmPassword: ""
  },
  status: {
    showPassword: false,
    showConfirmPassword: false
  }
};

export const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({ onBackPress, onResetPasswordSuccess }) => {
  const [data, setData] = useState<ResetPasswordData>(initialData);

  const updateForm = (updates: Partial<ResetPasswordData["form"]>) => {
    setData((prev) => ({
      ...prev,
      form: { ...prev.form, ...updates }
    }));
  };

  const updateStatus = (updates: Partial<ResetPasswordData["status"]>) => {
    setData((prev) => ({
      ...prev,
      status: { ...prev.status, ...updates }
    }));
  };

  const handleResetPassword = () => {
    if (data.form.newPassword && data.form.confirmPassword && data.form.newPassword === data.form.confirmPassword) {
      // 실제로는 API 호출로 비밀번호 재설정
      console.log("비밀번호 재설정:", { newPassword: data.form.newPassword });
      setData((prev) => ({ ...prev, step: "result" }));
    }
  };

  const handleSuccess = () => {
    onResetPasswordSuccess?.();
  };

  const renderResultStep = () => (
    <View style={styles.container}>
      <View style={styles.resultSection}>
        <Text style={styles.resultTitle}>비밀번호가{"\n"}재설정 되었습니다</Text>
        <Text style={styles.resultSubtitle}>비밀번호 변경이 완료되었습니다.{"\n"}새로운 비밀번호로 로그인해주세요.</Text>
      </View>

      <View style={styles.buttonSection}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleSuccess}>
          <Text style={styles.primaryButtonText}>로그인 하러가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <CommonLayout
      title="비밀번호 재설정"
      showBackButton={true}
      showTabBar={false}
      showTopIcons={false}
      onBackPress={onBackPress}
      onMenuPress={() => {}}
      onCouponPress={() => {}}
      onNotificationPress={() => {}}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {data.step === "input" ? (
          <View style={styles.container}>
            <View style={styles.headerSection}>
              <Text style={styles.title}>새로 사용하실{"\n"}비밀번호를 입력해 주세요</Text>
            </View>

            <View style={styles.inputSection}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>비밀번호</Text>
                <View style={styles.passwordInputContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="비밀번호 입력"
                    placeholderTextColor="#B1B8C0"
                    value={data.form.newPassword}
                    onChangeText={(text) => updateForm({ newPassword: text })}
                    secureTextEntry={!data.status.showPassword}
                  />
                  <TouchableOpacity style={styles.eyeButton} onPress={() => updateStatus({ showPassword: !data.status.showPassword })}>
                    <Ionicons name={data.status.showPassword ? "eye" : "eye-off"} size={24} color="#505866" />
                  </TouchableOpacity>
                </View>
                <View style={styles.inputBorder} />

                <View style={styles.validationSection}>
                  <View style={styles.validationItem}>
                    <View style={styles.validationIcon}>
                      <Ionicons
                        name={data.form.newPassword.length >= 8 && data.form.newPassword.length <= 20 ? "checkmark-circle" : "ellipse-outline"}
                        size={18}
                        color={data.form.newPassword.length >= 8 && data.form.newPassword.length <= 20 ? "#B48327" : "#B1B8C0"}
                      />
                    </View>
                    <Text
                      style={[
                        styles.validationText,
                        data.form.newPassword.length >= 8 && data.form.newPassword.length <= 20 && styles.validationTextActive
                      ]}
                    >
                      8-20자 이내
                    </Text>
                  </View>
                  <View style={styles.validationItem}>
                    <View style={styles.validationIcon}>
                      <Ionicons
                        name={
                          /[A-Z]/.test(data.form.newPassword) &&
                          /[a-z]/.test(data.form.newPassword) &&
                          /\d/.test(data.form.newPassword) &&
                          /[!@#$%^&*(),.?":{}|<>]/.test(data.form.newPassword)
                            ? "checkmark-circle"
                            : "ellipse-outline"
                        }
                        size={18}
                        color={
                          /[A-Z]/.test(data.form.newPassword) &&
                          /[a-z]/.test(data.form.newPassword) &&
                          /\d/.test(data.form.newPassword) &&
                          /[!@#$%^&*(),.?":{}|<>]/.test(data.form.newPassword)
                            ? "#B48327"
                            : "#B1B8C0"
                        }
                      />
                    </View>
                    <Text
                      style={[
                        styles.validationText,
                        /[A-Z]/.test(data.form.newPassword) &&
                          /[a-z]/.test(data.form.newPassword) &&
                          /\d/.test(data.form.newPassword) &&
                          /[!@#$%^&*(),.?":{}|<>]/.test(data.form.newPassword) &&
                          styles.validationTextActive
                      ]}
                    >
                      대소문자,숫자,특수문자 포함
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>비밀번호 확인</Text>
                <View style={styles.passwordInputContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="비밀번호 확인"
                    placeholderTextColor="#B1B8C0"
                    value={data.form.confirmPassword}
                    onChangeText={(text) => updateForm({ confirmPassword: text })}
                    secureTextEntry={!data.status.showConfirmPassword}
                  />
                  <TouchableOpacity style={styles.eyeButton} onPress={() => updateStatus({ showConfirmPassword: !data.status.showConfirmPassword })}>
                    <Ionicons name={data.status.showConfirmPassword ? "eye" : "eye-off"} size={24} color="#505866" />
                  </TouchableOpacity>
                </View>
                <View style={styles.inputBorder} />

                <View style={styles.validationSection}>
                  <View style={styles.validationItem}>
                    <View style={styles.validationIcon}>
                      <Ionicons
                        name={
                          data.form.newPassword && data.form.confirmPassword && data.form.newPassword === data.form.confirmPassword
                            ? "checkmark-circle"
                            : "ellipse-outline"
                        }
                        size={18}
                        color={
                          data.form.newPassword && data.form.confirmPassword && data.form.newPassword === data.form.confirmPassword
                            ? "#B48327"
                            : "#B1B8C0"
                        }
                      />
                    </View>
                    <Text
                      style={[
                        styles.validationText,
                        data.form.newPassword &&
                          data.form.confirmPassword &&
                          data.form.newPassword === data.form.confirmPassword &&
                          styles.validationTextActive
                      ]}
                    >
                      비밀번호 일치
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* <View style={styles.passwordStrengthSection}>
              <View style={styles.strengthDots}>
                {[1, 2, 3, 4, 5, 6].map((dot) => (
                  <View key={dot} style={styles.strengthDot} />
                ))}
              </View>
            </View> */}

            <View style={styles.buttonSection}>
              <TouchableOpacity
                style={[
                  styles.primaryButton,
                  (!data.form.newPassword || !data.form.confirmPassword || data.form.newPassword !== data.form.confirmPassword) &&
                    styles.buttonDisabled
                ]}
                onPress={handleResetPassword}
                disabled={!data.form.newPassword || !data.form.confirmPassword || data.form.newPassword !== data.form.confirmPassword}
              >
                <Text
                  style={[
                    styles.primaryButtonText,
                    (!data.form.newPassword || !data.form.confirmPassword || data.form.newPassword !== data.form.confirmPassword) &&
                      styles.buttonTextDisabled
                  ]}
                >
                  비밀번호 재설정
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          renderResultStep()
        )}
      </ScrollView>
    </CommonLayout>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF"
  },
  headerSection: {
    marginBottom: 40,
    paddingTop: 20,
    alignItems: "flex-start"
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2B2B2B",
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#505866",
    lineHeight: 24
  },
  inputSection: {
    marginBottom: 40
  },
  inputContainer: {
    marginBottom: 30
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2B2B2B",
    marginBottom: 8
  },
  input: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2B2B2B",
    paddingVertical: 12
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  passwordInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    color: "#2B2B2B",
    paddingVertical: 12
  },
  eyeButton: {
    padding: 8
  },
  inputBorder: {
    height: 1,
    backgroundColor: "#D6DADF",
    marginTop: 8
  },
  primaryButton: {
    backgroundColor: "#2B2B2B",
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  buttonDisabled: {
    backgroundColor: "#E5E5E5"
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF"
  },
  buttonTextDisabled: {
    color: "#B1B8C0"
  },
  buttonSection: {
    paddingBottom: 20
  },
  validationSection: {
    marginBottom: 30,
    paddingHorizontal: 20
  },
  validationItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12
  },
  validationIcon: {
    marginRight: 8
  },
  validationText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#B1B8C0",
    lineHeight: 18
  },
  validationTextActive: {
    color: "#B48327"
  },
  passwordStrengthSection: {
    marginBottom: 40,
    paddingHorizontal: 20
  },
  strengthDots: {
    flexDirection: "row",
    gap: 12
  },
  strengthDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#2B2B2B"
  },
  resultSection: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#2B2B2B",
    marginBottom: 10,
    textAlign: "left",
    lineHeight: 30
  },
  resultSubtitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#2B2B2B",
    textAlign: "left",
    lineHeight: 24
  }
});
