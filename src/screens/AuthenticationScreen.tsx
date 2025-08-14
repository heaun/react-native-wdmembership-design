import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { CommonLayout } from "../components/CommonLayout";
import { Ionicons } from "@expo/vector-icons";
import { authCommonStyles, Timer, useAuthTimer, EmailInput, AuthResultStep } from "../components/AuthCommon";

interface AuthenticationProps {
  onBackPress?: () => void;
  onSuccess?: (result: any) => void;
  mode: "findId" | "resetPassword" | "login" | "register";
  params?: {
    id?: string;
    password?: string;
    etc?: any;
  };
}

interface AuthenticationData {
  step: "input" | "verification" | "result" | "emailInput" | "link";
  form: {
    name: string;
    phoneNumber: string;
    verificationCode: string;
    email: string;
    id: string;
    password: string;
  };
  status: {
    isCodeSent: boolean;
    isVerificationSent: boolean;
    isVerificationCompleted: boolean;
    timeRemaining: number;
    isTimerActive: boolean;
  };
  result: {
    foundUserId: string;
    registrationDate: string;
  };
}

const initialData: AuthenticationData = {
  step: "input",
  form: {
    name: "",
    phoneNumber: "",
    verificationCode: "",
    email: "",
    id: "",
    password: ""
  },
  status: {
    isCodeSent: false,
    isVerificationSent: false,
    isVerificationCompleted: false,
    timeRemaining: 180,
    isTimerActive: false
  },
  result: {
    foundUserId: "",
    registrationDate: "2026.04.28 가입"
  }
};

const message = {
  findId: {
    menuTitle: "아이디 찾기",
    headerTitle: "가입하신 아이디를 찾기위해",
    buttonText: "아이디 찾기",
    resultTitle: "아이디 찾기가\n완료되었습니다",
    resultSubtitle: "회원님의 아이디(이메일)은 아래와 같습니다."
  },
  resetPassword: {
    menuTitle: "비밀번호 재설정",
    headerTitle: "비밀번호 재설정을 위해",
    buttonText: "다음",
    resultTitle: "비밀번호 재설정이\n완료되었습니다",
    resultSubtitle: "비밀번호 변경이 완료되었습니다.\n새로운 비밀번호로 로그인해주세요."
  },
  login: {
    menuTitle: "로그인",
    headerTitle: "로그인",
    buttonText: "로그인"
  },
  register: {
    menuTitle: "회원가입",
    headerTitle: "회원가입",
    buttonText: "가입하기"
  }
};

// 공통 컴포넌트들
interface PhoneInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSendCode: () => void;
  disabled: boolean;
  isVerificationSent: boolean;
}

interface VerificationInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onVerify: () => void;
  isVerificationCompleted: boolean;
}

export const AuthenticationScreen: React.FC<AuthenticationProps> = ({ onBackPress, onSuccess, mode = "findId", params = {} }) => {
  const [data, setData] = useState<AuthenticationData>(() => ({
    ...initialData,
    form: {
      ...initialData.form,
      id: params?.id || "",
      password: params?.password || ""
    }
  }));

  const PhoneInput = useCallback<React.FC<PhoneInputProps>>(
    ({ value, onChangeText, onSendCode, disabled, isVerificationSent }) => (
      <View style={authCommonStyles.inputContainer}>
        <Text style={authCommonStyles.inputLabel}>휴대전화 번호</Text>
        <View style={authCommonStyles.phoneInputContainer}>
          <TextInput
            key="phone-input"
            style={authCommonStyles.phoneInput}
            placeholder="(-)제외하고 숫자만 입력"
            placeholderTextColor="#B1B8C0"
            value={value}
            onChangeText={onChangeText}
            keyboardType="phone-pad"
            blurOnSubmit={false}
            autoCorrect={false}
            autoCapitalize="none"
            showSoftInputOnFocus={false}
          />
          <TouchableOpacity
            style={[authCommonStyles.verifyButton, (!value || isVerificationSent) && authCommonStyles.verifyButtonDisabled]}
            onPress={onSendCode}
            disabled={!value || isVerificationSent}
          >
            <Text style={authCommonStyles.verifyButtonText}>인증번호 받기</Text>
          </TouchableOpacity>
        </View>
        <View style={authCommonStyles.inputBorder} />
        {isVerificationSent && <Text style={authCommonStyles.statusMessage}>인증번호가 발송되었습니다.</Text>}
      </View>
    ),
    []
  );

  const VerificationInput = useCallback<React.FC<VerificationInputProps>>(
    ({ value, onChangeText, onVerify, isVerificationCompleted }) => (
      <View style={authCommonStyles.inputContainer}>
        <Text style={authCommonStyles.inputLabel}>인증번호</Text>
        <View style={authCommonStyles.verificationInputContainer}>
          <TextInput
            key="verification-input"
            style={authCommonStyles.verificationInput}
            placeholder="인증번호 입력"
            placeholderTextColor="#B1B8C0"
            value={value}
            onChangeText={onChangeText}
            keyboardType="number-pad"
            maxLength={6}
            blurOnSubmit={false}
            autoCorrect={false}
            autoCapitalize="none"
            showSoftInputOnFocus={false}
          />
          <TouchableOpacity
            style={[authCommonStyles.verifyButton, (!value || isVerificationCompleted) && authCommonStyles.verifyButtonDisabled]}
            onPress={onVerify}
            disabled={!value || isVerificationCompleted}
          >
            <Text style={authCommonStyles.verifyButtonText}>인증확인</Text>
          </TouchableOpacity>
        </View>
        <View style={authCommonStyles.inputBorder} />
        {isVerificationCompleted && <Text style={authCommonStyles.statusMessage}>휴대폰 번호 인증이 완료되었습니다.</Text>}
      </View>
    ),
    []
  );

  const { timeRemaining, isTimerActive, startTimer, stopTimer } = useAuthTimer(180);

  const updateData = (updates: Partial<AuthenticationData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const updateForm = (updates: Partial<AuthenticationData["form"]>) => {
    setData((prev) => ({
      ...prev,
      form: { ...prev.form, ...updates }
    }));
  };

  const updateStatus = (updates: Partial<AuthenticationData["status"]>) => {
    setData((prev) => ({
      ...prev,
      status: { ...prev.status, ...updates }
    }));
  };

  const updateResult = (updates: Partial<AuthenticationData["result"]>) => {
    setData((prev) => ({
      ...prev,
      result: { ...prev.result, ...updates }
    }));
  };

  const handleSendVerificationCode = () => {
    if (data.form.phoneNumber) {
      updateStatus({
        isCodeSent: true,
        isVerificationSent: true
      });
      startTimer();
      // 실제로는 API 호출로 인증번호 전송
      console.log("인증번호 전송:", { phoneNumber: data.form.phoneNumber });
    }
  };

  const handleVerifyCode = () => {
    if (data.form.verificationCode) {
      // 실제로는 API 호출로 인증번호 확인
      console.log("인증번호 확인:", data.form.verificationCode);
      updateStatus({
        isVerificationCompleted: true
      });
      stopTimer();
    }
  };

  const handleAuthentication = () => {
    if (mode === "findId") {
      handleFindId();
    } else if (mode === "resetPassword") {
      handleResetPassword();
    }
  };

  const handleFindId = () => {
    updateResult({
      foundUserId: "abcd****@email.com", // 실제로는 API에서 받아온 아이디
      registrationDate: "2026.04.28 가입"
    });
    updateData({ step: "result" });
  };

  const handleResetPassword = () => {
    // ResetPasswordScreen으로 이동하기 위해 onSuccess 콜백 호출
    const result = {
      mode: "resetPassword",
      form: data.form,
      action: "navigateToResetPassword",
      foundUserId: data.form.id, // 입력한 이메일 값을 foundUserId로 전달
      ...params.etc
    };
    onSuccess?.(result);
  };

  const handleSuccess = () => {
    const result = {
      mode,
      userId: data.result.foundUserId,
      form: data.form,
      ...params.etc
    };
    onSuccess?.(result);
  };

  const handleEmailInput = () => {
    updateData({ step: "emailInput" });
  };

  const handleSendEmailLink = () => {
    if (data.form.email) {
      console.log("이메일 링크 전송:", { email: data.form.email });
      updateData({ step: "link" });
    }
  };

  const handleBackToInput = () => {
    updateData({ step: "input" });
  };

  const getTitle = () => {
    switch (mode) {
      case "findId":
        return "아이디 찾기";
      case "resetPassword":
        return "비밀번호 재설정";
      case "login":
        return "로그인";
      case "register":
        return "회원가입";
      default:
        return "인증";
    }
  };

  const getStepTitle = () => {
    switch (data.step) {
      case "input":
        return getTitle();
      case "verification":
        return "인증번호 확인";
      case "emailInput":
        return "이메일 주소 입력";
      case "link":
        return "링크 전송 완료";
      case "result":
        return mode === "findId" ? "아이디 찾기" : "완료";
      default:
        return getTitle();
    }
  };

  // AuthHeader 컴포넌트를 내부에 정의
  const AuthHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle = "가입하신 휴대폰 번호를 입력해주세요." }) => (
    <View style={authCommonStyles.headerSection}>
      <Text style={authCommonStyles.title}>{title}</Text>
      <Text style={authCommonStyles.title}>휴대폰 인증을 해주세요</Text>
      {subtitle && <Text style={authCommonStyles.subtitle}>{subtitle}</Text>}
    </View>
  );

  const renderInputStep = () => (
    <View style={[authCommonStyles.container, { paddingBottom: 120 }]}>
      <AuthHeader title={message?.[mode]?.headerTitle} />

      <View style={authCommonStyles.inputSection}>
        <PhoneInput
          value={data.form.phoneNumber}
          onChangeText={(text) => updateForm({ phoneNumber: text })}
          onSendCode={handleSendVerificationCode}
          disabled={!data.form.phoneNumber}
          isVerificationSent={data.status.isVerificationSent}
        />

        <VerificationInput
          value={data.form.verificationCode}
          onChangeText={(text) => updateForm({ verificationCode: text })}
          onVerify={handleVerifyCode}
          isVerificationCompleted={data.status.isVerificationCompleted}
        />

        <Timer timeRemaining={timeRemaining} isTimerActive={isTimerActive} />

        {mode === "resetPassword" && (
          <View style={authCommonStyles.inputContainer}>
            <Text style={authCommonStyles.inputLabel}>아이디(이메일)</Text>
            <TextInput
              style={authCommonStyles.input}
              placeholder="가입하신 아이디(이메일)를 입력해주세요."
              placeholderTextColor="#B1B8C0"
              value={data.form.id}
              onChangeText={(text) => updateForm({ id: text })}
              autoCapitalize="none"
              autoCorrect={false}
              showSoftInputOnFocus={false}
            />
            <View style={authCommonStyles.inputBorder} />
          </View>
        )}
      </View>
    </View>
  );

  const renderVerificationStep = () => (
    <View style={authCommonStyles.container}>
      <AuthHeader title="인증번호 확인" />

      <View style={authCommonStyles.inputSection}>
        <VerificationInput
          value={data.form.verificationCode}
          onChangeText={(text) => updateForm({ verificationCode: text })}
          onVerify={handleVerifyCode}
          isVerificationCompleted={data.status.isVerificationCompleted}
        />
      </View>

      <TouchableOpacity style={authCommonStyles.resendButton} onPress={handleSendVerificationCode}>
        <Text style={authCommonStyles.resendButtonText}>인증번호 재전송</Text>
      </TouchableOpacity>
    </View>
  );

  const renderResultStep = () => (
    <AuthResultStep
      mode={mode}
      userId={data.result.foundUserId}
      registrationDate={data.result.registrationDate}
      message={{
        title: message?.[mode]?.resultTitle
      }}
      primaryButton={{
        text: "로그인 하러가기",
        onPress: handleSuccess
      }}
      secondaryButton={{
        text: "비밀번호 재설정하기",
        onPress: () => {
          // 찾은 아이디 정보와 함께 비밀번호 재설정 화면으로 이동
          const result = {
            mode: "resetPassword",
            form: {
              ...data.form,
              id: data.result.foundUserId // 찾은 아이디를 form.id에 설정
            },
            action: "navigateToResetPassword",
            foundUserId: data.result.foundUserId
          };
          onSuccess?.(result);
        }
      }}
      onBackPress={onBackPress}
    />
  );
  const renderEmailInputStep = () => (
    <View style={[authCommonStyles.container, { paddingBottom: 120 }]}>
      <AuthHeader title="이메일 주소 입력" subtitle="가입하신 이메일 주소를\n입력해주세요." />

      <View style={authCommonStyles.inputSection}>
        <EmailInput value={data.form.email} onChangeText={(text) => updateForm({ email: text })} />
      </View>
    </View>
  );

  const renderLinkStep = () => (
    <View style={[styles.container, { paddingBottom: 120 }]}>
      <View style={styles.headerSection}>
        <Text style={styles.title}>링크 전송 완료</Text>
        <Text style={styles.subtitle}>아이디 찾기 링크가{"\n"}이메일로 전송되었습니다.</Text>
      </View>

      <View style={styles.linkInfoSection}>
        <View style={styles.linkInfoCard}>
          <View style={styles.linkIconContainer}>
            <Ionicons name="mail-outline" size={32} color="#B48327" />
          </View>
          <Text style={styles.linkInfoTitle}>이메일을 확인해주세요</Text>
          <Text style={styles.linkInfoSubtitle}>
            입력하신 이메일 주소로{"\n"}
            아이디 찾기 링크가 전송되었습니다.
          </Text>
        </View>
      </View>
    </View>
  );

  // 버튼 설정을 동적으로 생성하는 함수
  const getButtons = () => {
    switch (data.step) {
      case "input":
        if (mode === "findId") {
          return [
            {
              text: "이메일로 찾기",
              onPress: handleEmailInput
            },
            {
              text: message?.[mode]?.buttonText || "확인",
              onPress: handleAuthentication,
              disabled: !data.status.isVerificationSent || !data.status.isVerificationCompleted
            }
          ];
        } else {
          return [
            {
              text: message?.[mode]?.buttonText || "확인",
              onPress: handleAuthentication,
              disabled:
                mode === "resetPassword"
                  ? !data.status.isVerificationSent || !data.status.isVerificationCompleted || !data.form.id
                  : !data.status.isVerificationSent || !data.status.isVerificationCompleted
            }
          ];
        }
      case "emailInput":
        return [
          {
            text: "뒤로가기",
            onPress: handleBackToInput
          },
          {
            text: "링크 전송하기",
            onPress: handleSendEmailLink,
            disabled: !data.form.email
          }
        ];
      case "link":
        return [
          {
            text: "다시 입력하기",
            onPress: () => updateData({ step: "input" })
          },
          {
            text: "로그인으로 돌아가기",
            onPress: handleSuccess
          }
        ];
      case "result":
        const buttons = [];

        if (mode === "findId") {
          buttons.push({
            text: "비밀번호 재설정하기",
            onPress: () => {
              // 찾은 아이디 정보와 함께 비밀번호 재설정 화면으로 이동
              const result = {
                mode: "resetPassword",
                form: {
                  ...data.form,
                  id: data.result.foundUserId // 찾은 아이디를 form.id에 설정
                },
                action: "navigateToResetPassword",
                foundUserId: data.result.foundUserId
              };
              onSuccess?.(result);
            }
          });
        }

        buttons.push({
          text: "로그인 하러가기",
          onPress: handleSuccess
        });

        return buttons;
      default:
        return [];
    }
  };

  return (
    <CommonLayout
      title={getStepTitle()}
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
        {data.step === "input" && renderInputStep()}
        {data.step === "verification" && renderVerificationStep()}
        {data.step === "emailInput" && renderEmailInputStep()}
        {data.step === "link" && renderLinkStep()}
        {data.step === "result" && renderResultStep()}
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
    alignItems: "center"
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
  sendCodeButton: {
    backgroundColor: "#B48327",
    borderRadius: 24,
    paddingHorizontal: 32,
    paddingVertical: 16,
    minWidth: 105
  },
  sendCodeButtonDisabled: {
    backgroundColor: "#B1B8C0"
  },
  sendCodeButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center"
  },
  verificationInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  verificationInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "400",
    color: "#2B2B2B",
    paddingVertical: 12
  },
  verifyButton: {
    backgroundColor: "#B48327",
    borderRadius: 24,
    paddingHorizontal: 32,
    paddingVertical: 16,
    minWidth: 105
  },
  verifyButtonDisabled: {
    backgroundColor: "#B1B8C0"
  },
  verifyButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center"
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
    alignItems: "center"
  },
  buttonDisabled: {
    backgroundColor: "#D6DADF"
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF"
  },
  resendButton: {
    alignItems: "center"
  },
  resendButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#505866"
  },
  resultSection: {
    alignItems: "flex-start",
    marginBottom: 40
  },
  successIcon: {
    marginBottom: 20
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2B2B2B",
    marginBottom: 8
  },
  resultSubtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#505866",
    marginBottom: 30
  },
  userIdContainer: {
    backgroundColor: "#EFF1F3",
    borderRadius: 5,
    padding: 20,
    width: "100%",
    borderWidth: 1,
    borderColor: "#D6DADF"
  },
  userIdRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  userIdLabel: {
    fontSize: 14,
    fontWeight: "400",
    color: "#505866",
    marginBottom: 8
  },
  userId: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2B2B2B"
  },
  userIdDate: {
    fontSize: 14,
    fontWeight: "400",
    color: "#505866"
  },
  resetPasswordButton: {
    borderColor: "#505866"
  },
  loginButton: {
    backgroundColor: "#2B2B2B"
  },
  buttonSection: {
    marginTop: 40,
    gap: 12,
    paddingBottom: 20
  },
  statusMessage: {
    fontSize: 12,
    fontWeight: "400",
    color: "#B48327",
    marginTop: 8,
    textAlign: "left"
  },
  secondaryButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D6DADF"
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#505866"
  },
  emailButton: {
    marginTop: 12
  },
  backButton: {
    marginTop: 12
  },
  linkInfoSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20
  },
  linkInfoCard: {
    backgroundColor: "#F8F9FA",
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    width: "100%"
  },
  linkIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FFF3E0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24
  },
  linkInfoTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2B2B2B",
    marginBottom: 12,
    textAlign: "center"
  },
  linkInfoSubtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#505866",
    textAlign: "center",
    lineHeight: 24
  },
  linkActionsSection: {
    gap: 12,
    paddingBottom: 20
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    paddingHorizontal: 24
  },
  timerLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#505866",
    marginRight: 10
  },
  timerText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2B2B2B"
  },
  timerWarning: {
    color: "#FF3A4A"
  }
});
