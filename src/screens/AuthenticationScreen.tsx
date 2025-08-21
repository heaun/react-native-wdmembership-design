import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { CommonLayout } from "../components/CommonLayout";
import { Ionicons } from "@expo/vector-icons";
import {
  authCommonStyles,
  Timer,
  useAuthTimer,
  EmailInput,
  EmailInputWithButton,
  AuthResultStep,
  PhoneInput,
  VerificationInput,
  usePhoneAutoSend,
  usePhoneVerificationStep
} from "../components/AuthCommon";
import { LabelText, ExtraBoldText, ButtonText } from "../components/CommonText";

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
    showEmailInput: boolean;
    isEmailCodeSent: boolean;
    isEmailVerificationCompleted: boolean;
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
    isTimerActive: false,
    showEmailInput: false,
    isEmailCodeSent: false,
    isEmailVerificationCompleted: false
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

export const AuthenticationScreen: React.FC<AuthenticationProps> = ({ onBackPress, onSuccess, mode = "findId", params = {} }) => {
  const [data, setData] = useState<AuthenticationData>(() => ({
    ...initialData,
    form: {
      ...initialData.form,
      id: params?.id || "",
      password: params?.password || ""
    }
  }));

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

  // 휴대폰 자동 발송 훅 사용
  const { handlePhoneNumberChange, isPhoneNumberValid, isButtonDisabled } = usePhoneAutoSend(
    data.form.phoneNumber,
    data.status.isVerificationSent,
    handleSendVerificationCode
  );

  const handleVerifyCode = () => {
    if (data.form.verificationCode) {
      // 실제로는 API 호출로 인증번호 확인
      console.log("인증번호 확인:", data.form.verificationCode);
      updateStatus({
        isVerificationCompleted: true,
        showEmailInput: true // 인증번호 확인 후 이메일 입력 필드 노출
      });
      stopTimer();
    }
  };

  // 휴대폰 인증 단계 관리 훅 사용
  const { shouldShowVerificationInput, shouldShowTimer } = usePhoneVerificationStep(
    data.form.phoneNumber,
    data.form.verificationCode,
    data.status.isCodeSent,
    data.status.isVerificationCompleted,
    handleSendVerificationCode,
    handleVerifyCode
  );

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
      console.log("이메일 인증번호 전송:", { email: data.form.email });
      updateStatus({
        isEmailCodeSent: true
      });
      startTimer();
    }
  };

  const handleVerifyEmailCode = () => {
    if (data.form.verificationCode) {
      console.log("이메일 인증번호 확인:", data.form.verificationCode);
      updateStatus({
        isEmailVerificationCompleted: true
      });
      stopTimer();
    }
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
      case "link":
        return "링크 전송 완료";
      case "result":
        return mode === "findId" ? "아이디 찾기" : "완료";
      default:
        return getTitle();
    }
  };

  // AuthHeader 컴포넌트를 내부에 정의
  const AuthHeader: React.FC<{ title: string; subtitle?: string; inputType?: "phone" | "email" }> = ({
    title,
    subtitle = "가입하신 휴대폰 번호를 입력해주세요.",
    inputType = "phone"
  }) => (
    <View style={authCommonStyles.headerSection}>
      <ExtraBoldText style={authCommonStyles.title}>{title}</ExtraBoldText>
      {inputType === "phone" && <ExtraBoldText style={authCommonStyles.title}>휴대폰 인증을 해주세요</ExtraBoldText>}
      {inputType === "email" && <ExtraBoldText style={authCommonStyles.title}>이메일 인증을 해주세요</ExtraBoldText>}
      {subtitle && <LabelText style={authCommonStyles.subtitle}>{subtitle}</LabelText>}
    </View>
  );

  const renderInputStep = () => (
    <View style={[authCommonStyles.container, { paddingBottom: 120 }]}>
      <AuthHeader title={message?.[mode]?.headerTitle} />

      <View style={authCommonStyles.inputSection}>
        <PhoneInput
          value={data.form.phoneNumber}
          onChangeText={(text) => {
            const limitedText = handlePhoneNumberChange(text);
            updateForm({ phoneNumber: limitedText });
          }}
          onSendCode={handleSendVerificationCode}
          disabled={isButtonDisabled}
          isVerificationSent={data.status.isVerificationSent}
        />

        {shouldShowVerificationInput && (
          <VerificationInput
            value={data.form.verificationCode}
            onChangeText={(text) => updateForm({ verificationCode: text })}
            onVerify={handleVerifyCode}
            isVerificationCompleted={data.status.isVerificationCompleted}
          />
        )}

        {shouldShowTimer && <Timer timeRemaining={timeRemaining} isTimerActive={isTimerActive} />}

        {mode === "resetPassword" && data.status.showEmailInput && (
          <View style={authCommonStyles.inputContainer}>
            <LabelText style={authCommonStyles.inputLabel}>아이디(이메일)</LabelText>
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
        <ButtonText style={authCommonStyles.resendButtonText}>인증번호 재전송</ButtonText>
      </TouchableOpacity>
    </View>
  );

  const renderResultStep = () => (
    <AuthResultStep
      mode={mode}
      userId={data.result.foundUserId}
      registrationDate={data.result.registrationDate}
      message={{
        title: message?.[mode]?.resultTitle,
        subtitle: message?.[mode]?.resultSubtitle
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
      <AuthHeader
        title={data.status.isEmailCodeSent ? "인증번호를 입력해주세요" : "가입하신 아이디를 찾기 위해"}
        subtitle={data.status.isEmailCodeSent ? "이메일로 전송된 인증번호를 입력해주세요." : "가입하신 이메일 주소를 입력해주세요."}
        inputType="email"
      />

      <View style={authCommonStyles.inputSection}>
        <EmailInputWithButton
          value={data.form.email}
          onChangeText={(text) => updateForm({ email: text })}
          onSendCode={handleSendEmailLink}
          isVerificationSent={data.status.isEmailCodeSent}
          buttonText={"인증번호 받기"}
        />

        {data.status.isEmailCodeSent && (
          <>
            <VerificationInput
              value={data.form.verificationCode}
              onChangeText={(text) => updateForm({ verificationCode: text })}
              onVerify={handleVerifyEmailCode}
              isVerificationCompleted={data.status.isEmailVerificationCompleted}
            />
            {!data.status.isEmailVerificationCompleted && <Timer timeRemaining={timeRemaining} isTimerActive={isTimerActive} />}
            {/* {renderEmailDescription()} */}
          </>
        )}
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
                  ? !data.status.isVerificationSent || !data.status.isVerificationCompleted || (data.status.showEmailInput && !data.form.id)
                  : !data.status.isVerificationSent || !data.status.isVerificationCompleted
            }
          ];
        }
      case "emailInput":
        if (data.status.isEmailVerificationCompleted) {
          return [
            {
              text: message?.[mode]?.buttonText || "확인",
              onPress: () => {
                // 비밀번호 재설정 화면으로 이동
                const result = {
                  mode: "resetPassword",
                  form: {
                    ...data.form,
                    id: data.form.email // 이메일을 아이디로 사용
                  },
                  action: "navigateToResetPassword",
                  foundUserId: data.form.email
                };
                onSuccess?.(result);
              },
              disabled: false
            }
          ];
        } else if (data.status.isEmailCodeSent) {
          return [
            {
              text: message?.[mode]?.buttonText || "확인",
              onPress: handleVerifyEmailCode,
              disabled: true
            }
          ];
        } else {
          return [
            {
              text: message?.[mode]?.buttonText || "확인",

              disabled: true
            }
          ];
        }

      case "link":
        return [
          {
            text: "아이디 찾기",
            onPress: () => {
              // 비밀번호 재설정 화면으로 이동
              const result = {
                mode: "resetPassword",
                form: {
                  ...data.form,
                  id: data.form.email // 이메일을 아이디로 사용
                },
                action: "navigateToResetPassword",
                foundUserId: data.form.email
              };
              onSuccess?.(result);
            }
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
  linkInfoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#E5E5E5"
  },
  linkIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFF3E0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12
  },
  linkInfoTextContainer: {
    flex: 1
  },
  linkInfoTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2B2B2B",
    marginBottom: 12,
    textAlign: "left"
  },
  linkInfoSubtitle: {
    fontWeight: "400",
    color: "#505866",
    textAlign: "left",
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
