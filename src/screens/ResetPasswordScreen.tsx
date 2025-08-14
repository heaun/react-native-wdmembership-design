import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { CommonLayout } from "../components/CommonLayout";
import { Ionicons } from "@expo/vector-icons";
import { AuthResultStep } from "../components/AuthCommon";

interface ResetPasswordScreenProps {
  onBackPress?: () => void;
  onResetPasswordSuccess?: () => void;
  foundUserId?: string;
}

interface ResetPasswordData {
  step: "input" | "result";
  form: {
    newPassword: string;
    confirmPassword: string;
    id: string;
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
    confirmPassword: "",
    id: ""
  },
  status: {
    showPassword: false,
    showConfirmPassword: false
  }
};

export const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({ onBackPress, onResetPasswordSuccess, foundUserId = "" }) => {
  const [data, setData] = useState<ResetPasswordData>(() => ({
    ...initialData,
    form: {
      ...initialData.form,
      id: foundUserId // 찾은 아이디를 초기값으로 설정
    }
  }));

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
    <AuthResultStep
      mode="resetPassword"
      primaryButton={{
        text: "로그인 하러가기",
        onPress: handleSuccess
      }}
    />
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
                <Text style={styles.inputLabel}>아이디(이메일)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="가입하신 아이디(이메일)를 입력해주세요."
                  placeholderTextColor="#B1B8C0"
                  value={data.form.id}
                  onChangeText={(text) => updateForm({ id: text })}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!foundUserId} // 찾은 아이디가 있으면 편집 불가
                />
                <View style={styles.inputBorder} />
              </View>

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
                        name={data.form.newPassword.length >= 8 && data.form.newPassword.length <= 20 ? "checkmark" : "ellipse-outline"}
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
                            ? "checkmark"
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
                    <Ionicons name={data.status.showConfirmPassword ? "eye-off" : "eye"} size={24} color="#505866" />
                  </TouchableOpacity>
                </View>
                <View style={styles.inputBorder} />

                <View style={styles.validationSection}>
                  <View style={styles.validationItem}>
                    <View style={styles.validationIcon}>
                      <Ionicons
                        name={
                          data.form.newPassword && data.form.confirmPassword && data.form.newPassword === data.form.confirmPassword
                            ? "checkmark"
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
                  (!data.form.id || !data.form.newPassword || !data.form.confirmPassword || data.form.newPassword !== data.form.confirmPassword) &&
                    styles.buttonDisabled
                ]}
                onPress={handleResetPassword}
                disabled={
                  !data.form.id || !data.form.newPassword || !data.form.confirmPassword || data.form.newPassword !== data.form.confirmPassword
                }
              >
                <Text
                  style={[
                    styles.primaryButtonText,
                    (!data.form.id || !data.form.newPassword || !data.form.confirmPassword || data.form.newPassword !== data.form.confirmPassword) &&
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
    marginBottom: 20
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
    paddingVertical: 10,
    flexDirection: "row",
    gap: 10
  },
  validationItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12
  },
  validationIcon: {
    marginRight: 3
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
  }
});
