import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, StyleProp, TextStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// 공통 스타일
export const authCommonStyles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 5
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
    paddingVertical: 10
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
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  phoneInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    color: "#2B2B2B",
    paddingVertical: 12
  },

  verificationInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  verificationInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    color: "#2B2B2B",
    paddingVertical: 12
  },
  verifyButton: {
    backgroundColor: "#B48327",
    borderRadius: 24,
    height: 40,
    minWidth: 105,
    justifyContent: "center",
    alignItems: "center"
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
  buttonSection: {
    marginTop: 40,
    gap: 12,
    paddingBottom: 20
  },
  buttonSectionFixed: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    gap: 12,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#FFFFFF"
  },
  statusMessage: {
    fontSize: 12,
    fontWeight: "400",
    color: "#B48327",
    marginTop: 8,
    textAlign: "left"
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
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
    color: "#FF3A4A"
  },
  timerWarning: {
    color: "#FF3A4A"
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
  resultTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2B2B2B",
    marginBottom: 8
  },
  resultTitleContainer: {
    paddingVertical: 10,
    gap: 3
  },
  resultSubtitleContainer: {
    paddingVertical: 10,
    gap: 3
  },
  resultSubtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#505866"
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

  // 비밀번호 입력 관련 스타일

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
    padding: 4
  },
  // 유효성 검사 관련 스타일
  validationSection: {
    marginBottom: 20,
    flexDirection: "row",
    gap: 8
  },
  validationItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8
  },
  validationIcon: {
    width: 15,
    height: 15,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center"
  },
  validationText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#B1B8C0",
    lineHeight: 18,
    letterSpacing: -0.48
  },
  validationTextActive: {
    color: "#B48327"
  }
});

// 공통 인터페이스
export interface AuthFormData {
  phoneNumber: string;
  verificationCode: string;
  email?: string;
  userId?: string;
}

export interface PhoneInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSendCode: () => void;
  disabled: boolean;
  isVerificationSent: boolean;
}

export interface VerificationInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onVerify: () => void;
  isVerificationCompleted: boolean;
}

export interface AuthStatusData {
  isCodeSent: boolean;
  isVerificationSent: boolean;
  isVerificationCompleted: boolean;
  timeRemaining: number;
  isTimerActive: boolean;
}

interface TimerProps {
  timeRemaining: number;
  isTimerActive: boolean;
}

export const Timer: React.FC<TimerProps> = ({ timeRemaining, isTimerActive }) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  if (!isTimerActive || timeRemaining <= 0) return null;

  return (
    <View style={authCommonStyles.timerContainer}>
      <Text style={authCommonStyles.timerLabel}>남은시간</Text>
      <Text style={[authCommonStyles.timerText, timeRemaining <= 30 && authCommonStyles.timerWarning]}>{formatTime(timeRemaining)}</Text>
    </View>
  );
};

// 새로운 공통 컴포넌트들
interface EmailInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const EmailInput: React.FC<EmailInputProps> = ({ value, onChangeText, placeholder = "이메일 주소를 입력하세요" }) => (
  <View style={authCommonStyles.inputContainer}>
    <Text style={authCommonStyles.inputLabel}>이메일 주소</Text>
    <TextInput
      style={authCommonStyles.input}
      placeholder={placeholder}
      placeholderTextColor="#B1B8C0"
      value={value}
      onChangeText={onChangeText}
      keyboardType="email-address"
      autoCapitalize="none"
      autoCorrect={false}
      showSoftInputOnFocus={false}
    />
    <View style={authCommonStyles.inputBorder} />
  </View>
);

// 이메일 입력과 버튼이 함께 있는 컴포넌트
interface EmailInputWithButtonProps {
  value: string;
  onChangeText: (text: string) => void;
  onSendCode: () => void;
  disabled?: boolean;
  isVerificationSent?: boolean;
  buttonText?: string;
}

export const EmailInputWithButton: React.FC<EmailInputWithButtonProps> = ({
  value,
  onChangeText,
  onSendCode,
  disabled = false,
  isVerificationSent = false,
  buttonText = "인증번호 받기"
}) => (
  <View style={authCommonStyles.inputContainer}>
    <Text style={authCommonStyles.inputLabel}>이메일(아이디)</Text>
    <View style={authCommonStyles.phoneInputContainer}>
      <TextInput
        style={authCommonStyles.phoneInput}
        placeholder="abc@email.com"
        placeholderTextColor="#B1B8C0"
        value={value}
        onChangeText={onChangeText}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        showSoftInputOnFocus={false}
      />
      <TouchableOpacity
        style={[authCommonStyles.verifyButton, (!value || isVerificationSent) && authCommonStyles.verifyButtonDisabled]}
        onPress={onSendCode}
        disabled={!value || isVerificationSent}
      >
        <Text style={authCommonStyles.verifyButtonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
    <View style={authCommonStyles.inputBorder} />
    {isVerificationSent && <Text style={authCommonStyles.statusMessage}>인증번호가 발송되었습니다.</Text>}
  </View>
);

interface UserIdInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const UserIdInput: React.FC<UserIdInputProps> = ({ value, onChangeText, placeholder = "가입하신 아이디(이메일)를 입력해주세요." }) => (
  <View style={authCommonStyles.inputContainer}>
    <Text style={authCommonStyles.inputLabel}>아이디(이메일)</Text>
    <TextInput
      style={authCommonStyles.input}
      placeholder={placeholder}
      placeholderTextColor="#B1B8C0"
      value={value}
      onChangeText={onChangeText}
      autoCapitalize="none"
      autoCorrect={false}
      showSoftInputOnFocus={false}
    />
    <View style={authCommonStyles.inputBorder} />
  </View>
);

export const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChangeText, onSendCode, disabled, isVerificationSent }) => (
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
        maxLength={11}
        blurOnSubmit={false}
        autoCorrect={false}
        autoCapitalize="none"
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
);

export const VerificationInput: React.FC<VerificationInputProps> = ({ value, onChangeText, onVerify, isVerificationCompleted }) => (
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
);

export enum PasswordInputMode {
  INPUT = "input",
  CONFIRM = "confirm"
}

// 비밀번호 입력 관련 인터페이스
export interface PasswordInputProps {
  mode: PasswordInputMode;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  showPassword: boolean;
  onTogglePassword: () => void;
  returnKeyType?: "next" | "done";
  onSubmitEditing?: () => void;
}

export interface PasswordValidationProps {
  mode: PasswordInputMode;
  password: string;
  confirmPassword?: string;
}

// 비밀번호 입력 컴포넌트
export const PasswordInput: React.FC<PasswordInputProps> = ({
  mode,
  value,
  onChangeText,
  placeholder = "비밀번호 입력",
  showPassword,
  onTogglePassword,
  returnKeyType = "next",
  onSubmitEditing
}) => (
  <View style={authCommonStyles.inputContainer}>
    <Text style={authCommonStyles.inputLabel}>{mode === PasswordInputMode.INPUT ? "비밀번호" : "비밀번호 확인"}</Text>
    <View style={authCommonStyles.passwordInputContainer}>
      <TextInput
        style={authCommonStyles.passwordInput}
        placeholder={placeholder}
        placeholderTextColor="#B1B8C0"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!showPassword}
        keyboardType="default"
        returnKeyType={returnKeyType}
        blurOnSubmit={false}
        autoCorrect={false}
        autoCapitalize="none"
        showSoftInputOnFocus={false}
        onSubmitEditing={onSubmitEditing}
      />
      <TouchableOpacity style={authCommonStyles.eyeButton} onPress={onTogglePassword}>
        <Ionicons name={showPassword ? "eye" : "eye-off"} size={24} color="#505866" />
      </TouchableOpacity>
    </View>
    <View style={authCommonStyles.inputBorder} />
  </View>
);

// 비밀번호 유효성 검사 컴포넌트
export const PasswordValidation: React.FC<PasswordValidationProps> = ({ mode, password, confirmPassword }) => {
  const hasLength = password.length >= 8 && password.length <= 20;
  const hasComplexity = /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isMatch = confirmPassword ? password === confirmPassword : false;

  // confirmPassword가 있으면 비밀번호 일치 검증만 표시
  if (mode === PasswordInputMode.CONFIRM) {
    return (
      <View style={authCommonStyles.validationSection}>
        <View style={authCommonStyles.validationItem}>
          <View style={authCommonStyles.validationIcon}>
            <Ionicons name={"checkmark"} size={18} color={isMatch ? "#B48327" : "#B1B8C0"} />
          </View>
          <Text style={[authCommonStyles.validationText, isMatch && authCommonStyles.validationTextActive]}>비밀번호 일치</Text>
        </View>
      </View>
    );
  }

  // confirmPassword가 없으면 비밀번호 복잡도 검증만 표시
  return (
    <View style={authCommonStyles.validationSection}>
      <View style={authCommonStyles.validationItem}>
        <View style={authCommonStyles.validationIcon}>
          <Ionicons name={"checkmark"} size={18} color={hasLength ? "#B48327" : "#B1B8C0"} />
        </View>
        <Text style={[authCommonStyles.validationText, hasLength && authCommonStyles.validationTextActive]}>8-20자 이내</Text>
      </View>
      <View style={authCommonStyles.validationItem}>
        <View style={authCommonStyles.validationIcon}>
          <Ionicons name={"checkmark"} size={18} color={hasComplexity ? "#B48327" : "#B1B8C0"} />
        </View>
        <Text style={[authCommonStyles.validationText, hasComplexity && authCommonStyles.validationTextActive]}>대소문자,숫자,특수문자 포함</Text>
      </View>
    </View>
  );
};

interface AuthButtonSectionProps {
  primaryButton: {
    text: string;
    onPress: () => void;
    disabled?: boolean;
  };
  secondaryButton?: {
    text: string;
    onPress: () => void;
    disabled?: boolean;
  };
}

export const AuthButtonSection: React.FC<AuthButtonSectionProps> = ({ primaryButton, secondaryButton }) => (
  <View style={authCommonStyles.buttonSectionFixed}>
    <TouchableOpacity
      style={[authCommonStyles.primaryButton, primaryButton.disabled && authCommonStyles.buttonDisabled]}
      onPress={primaryButton.onPress}
      disabled={primaryButton.disabled}
    >
      <Text style={authCommonStyles.primaryButtonText}>{primaryButton.text}</Text>
    </TouchableOpacity>

    {secondaryButton && (
      <TouchableOpacity
        style={[authCommonStyles.secondaryButton, secondaryButton.disabled && authCommonStyles.buttonDisabled]}
        onPress={secondaryButton.onPress}
        disabled={secondaryButton.disabled}
      >
        <Text style={authCommonStyles.secondaryButtonText}>{secondaryButton.text}</Text>
      </TouchableOpacity>
    )}
  </View>
);

// 공통 결과 화면 컴포넌트
interface AuthResultStepProps {
  mode: "findId" | "resetPassword" | "login" | "register";
  userId?: string;
  registrationDate?: string;
  message: {
    title: string;
    subtitle?: string;
  };
  primaryButton?: {
    text: string;
    onPress: () => void;
  };
  secondaryButton?: {
    text: string;
    onPress: () => void;
  };
  onBackPress?: () => void;
}

export const AuthResultStep: React.FC<AuthResultStepProps> = ({
  mode,
  userId,
  registrationDate,
  message,
  primaryButton,
  secondaryButton,
  onBackPress
}) => {
  const { title, subtitle } = message;

  const renderTitle = (title: string, style?: StyleProp<TextStyle>) => {
    return title.split("\n").map((line: string, index: number) => (
      <Text key={index} style={style ? style : authCommonStyles.resultTitle}>
        {line}
      </Text>
    ));
  };
  return (
    <View style={[authCommonStyles.container, { paddingBottom: 120 }]}>
      <View style={authCommonStyles.resultSection}>
        <View style={authCommonStyles.resultTitleContainer}>{renderTitle(title)}</View>

        <View style={authCommonStyles.resultSubtitleContainer}>
          {subtitle && subtitle.split("\n").map((line: string, index: number) => renderTitle(line, authCommonStyles.resultSubtitle))}
        </View>

        {userId && (
          <View style={authCommonStyles.userIdContainer}>
            <View style={authCommonStyles.userIdRow}>
              <Text style={authCommonStyles.userIdLabel}>가입일</Text>
              <Text style={authCommonStyles.userIdDate}>{registrationDate}</Text>
            </View>
            <Text style={authCommonStyles.userId}>{userId}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

// 공통 유틸리티 함수들
export const useAuthTimer = (initialTime: number = 180) => {
  const [timeRemaining, setTimeRemaining] = React.useState(initialTime);
  const [isTimerActive, setIsTimerActive] = React.useState(false);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, timeRemaining]);

  const startTimer = () => {
    setTimeRemaining(initialTime);
    setIsTimerActive(true);
  };

  const stopTimer = () => {
    setIsTimerActive(false);
  };

  return {
    timeRemaining,
    isTimerActive,
    startTimer,
    stopTimer
  };
};

// 휴대폰 번호 자동 발송 훅
export const usePhoneAutoSend = (phoneNumber: string, isVerificationSent: boolean, onSendCode: () => void) => {
  const handlePhoneNumberChange = React.useCallback(
    (text: string) => {
      const cleaned = text.replace(/[^0-9]/g, "");
      // 11자리로 제한
      const limitedText = cleaned.slice(0, 11);

      // 11자리 입력 시 자동으로 인증번호 발송
      if (limitedText.length === 11 && !isVerificationSent) {
        setTimeout(() => {
          onSendCode();
        }, 100);
      }

      return limitedText;
    },
    [isVerificationSent, onSendCode]
  );

  return {
    handlePhoneNumberChange,
    isPhoneNumberValid: phoneNumber.length === 11,
    isButtonDisabled: !phoneNumber || phoneNumber.length !== 11
  };
};

// 휴대폰 인증 단계 관리 훅
export const usePhoneVerificationStep = (
  phoneNumber: string,
  verificationCode: string,
  isCodeSent: boolean,
  isVerificationCompleted: boolean,
  onSendCode: () => void,
  onVerifyCode: () => void
) => {
  const shouldShowVerificationInput = isCodeSent;
  const shouldShowTimer = isCodeSent && !isVerificationCompleted;

  return {
    shouldShowVerificationInput,
    shouldShowTimer,
    isPhoneInputComplete: phoneNumber.length === 11,
    isVerificationInputComplete: verificationCode.length === 6,
    isVerificationStepComplete: isVerificationCompleted
  };
};
