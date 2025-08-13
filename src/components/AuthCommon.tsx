import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// 공통 스타일
export const authCommonStyles = StyleSheet.create({
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
    fontSize: 18,
    fontWeight: "700",
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
  },
  resendButton: {
    alignItems: "center"
  },
  resendButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#505866"
  }
});

// 공통 인터페이스
export interface AuthFormData {
  phoneNumber: string;
  verificationCode: string;
  email?: string;
  userId?: string;
}

export interface AuthStatusData {
  isCodeSent: boolean;
  isVerificationSent: boolean;
  isVerificationCompleted: boolean;
  timeRemaining: number;
  isTimerActive: boolean;
}

// 공통 컴포넌트들
interface PhoneInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSendCode: () => void;
  disabled: boolean;
  isVerificationSent: boolean;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChangeText, onSendCode, disabled, isVerificationSent }) => (
  <View style={authCommonStyles.inputContainer}>
    <Text style={authCommonStyles.inputLabel}>휴대전화 번호</Text>
    <View style={authCommonStyles.phoneInputContainer}>
      <TextInput
        style={authCommonStyles.phoneInput}
        placeholder="(-)제외하고 숫자만 입력"
        placeholderTextColor="#B1B8C0"
        value={value}
        onChangeText={onChangeText}
        keyboardType="phone-pad"
      />
      <TouchableOpacity
        style={[authCommonStyles.sendCodeButton, (!value || isVerificationSent) && authCommonStyles.sendCodeButtonDisabled]}
        onPress={onSendCode}
        disabled={!value || isVerificationSent}
      >
        <Text style={authCommonStyles.sendCodeButtonText}>인증번호 받기</Text>
      </TouchableOpacity>
    </View>
    <View style={authCommonStyles.inputBorder} />
    {isVerificationSent && <Text style={authCommonStyles.statusMessage}>인증번호가 발송되었습니다.</Text>}
  </View>
);

interface VerificationInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onVerify: () => void;
  isVerificationCompleted: boolean;
}

export const VerificationInput: React.FC<VerificationInputProps> = ({ value, onChangeText, onVerify, isVerificationCompleted }) => (
  <View style={authCommonStyles.inputContainer}>
    <Text style={authCommonStyles.inputLabel}>인증번호</Text>
    <View style={authCommonStyles.verificationInputContainer}>
      <TextInput
        style={authCommonStyles.verificationInput}
        placeholder="인증번호 입력"
        placeholderTextColor="#B1B8C0"
        value={value}
        onChangeText={onChangeText}
        keyboardType="number-pad"
        maxLength={6}
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
    />
    <View style={authCommonStyles.inputBorder} />
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
    />
    <View style={authCommonStyles.inputBorder} />
  </View>
);

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
  <View style={authCommonStyles.buttonSection}>
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
