import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { CommonLayout } from "../components/CommonLayout";
import { Ionicons } from "@expo/vector-icons";
import { AuthResultStep, PasswordInput, PasswordValidation } from "../components/AuthCommon";
import { PasswordInputMode } from "../components/AuthCommon";

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

  // 버튼 설정을 동적으로 생성하는 함수
  const getButtons = () => {
    if (data.step === "result") {
      return [
        {
          text: "로그인 하러가기",
          onPress: handleSuccess
        }
      ];
    }
    return [
      {
        text: "비밀번호 재설정",
        onPress: handleResetPassword,
        disabled: !data.form.id || !data.form.newPassword || !data.form.confirmPassword || data.form.newPassword !== data.form.confirmPassword
      }
    ];
  };

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
      buttons={getButtons()}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {data.step === "input" ? (
          <View style={[styles.container, { paddingBottom: 120 }]}>
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
                  showSoftInputOnFocus={false}
                />
                <View style={styles.inputBorder} />
              </View>

              <PasswordInput
                mode={PasswordInputMode.INPUT}
                value={data.form.newPassword}
                onChangeText={(text) => updateForm({ newPassword: text })}
                placeholder="비밀번호 입력"
                showPassword={data.status.showPassword}
                onTogglePassword={() => updateStatus({ showPassword: !data.status.showPassword })}
                returnKeyType="next"
              />
              <PasswordValidation mode={PasswordInputMode.INPUT} password={data.form.newPassword} />

              <PasswordInput
                mode={PasswordInputMode.CONFIRM}
                value={data.form.confirmPassword}
                onChangeText={(text) => updateForm({ confirmPassword: text })}
                placeholder="비밀번호 확인"
                showPassword={data.status.showConfirmPassword}
                onTogglePassword={() => updateStatus({ showConfirmPassword: !data.status.showConfirmPassword })}
                returnKeyType="done"
              />
              <PasswordValidation mode={PasswordInputMode.CONFIRM} password={data.form.newPassword} confirmPassword={data.form.confirmPassword} />
            </View>
          </View>
        ) : (
          <AuthResultStep
            mode="resetPassword"
            message={{
              title: "비밀번호가\n재설정 되었습니다",
              subtitle: "비밀번호 변경이 완료되었습니다.\n새로운 비밀번호로 로그인해주세요."
            }}
            primaryButton={{
              text: "로그인 하러가기",
              onPress: handleSuccess
            }}
            onBackPress={onBackPress}
          />
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

  inputBorder: {
    height: 1,
    backgroundColor: "#D6DADF",
    marginTop: 8
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
  buttonSectionFixed: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#FFFFFF"
  }
});
