import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { CommonLayout } from "../components/CommonLayout";
import { Ionicons } from "@expo/vector-icons";

interface FindIdScreenProps {
  onBackPress?: () => void;
  onFindIdSuccess?: (userId: string) => void;
}

interface FindIdData {
  step: "input" | "verification" | "result" | "emailInput" | "link";
  form: {
    name: string;
    phoneNumber: string;
    verificationCode: string;
    email: string;
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
  };
}

const initialData: FindIdData = {
  step: "input",
  form: {
    name: "",
    phoneNumber: "",
    verificationCode: "",
    email: ""
  },
  status: {
    isCodeSent: false,
    isVerificationSent: false,
    isVerificationCompleted: false,
    timeRemaining: 180,
    isTimerActive: false
  },
  result: {
    foundUserId: ""
  }
};

export const FindIdScreen: React.FC<FindIdScreenProps> = ({ onBackPress, onFindIdSuccess }) => {
  const [data, setData] = useState<FindIdData>(initialData);

  // 타이머 효과
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (data.status.isTimerActive && data.status.timeRemaining > 0) {
      interval = setInterval(() => {
        setData((prev) => ({
          ...prev,
          status: {
            ...prev.status,
            timeRemaining: prev.status.timeRemaining <= 1 ? 0 : prev.status.timeRemaining - 1,
            isTimerActive: prev.status.timeRemaining <= 1 ? false : prev.status.isTimerActive
          }
        }));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [data.status.isTimerActive, data.status.timeRemaining]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const updateData = (updates: Partial<FindIdData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const updateForm = (updates: Partial<FindIdData["form"]>) => {
    setData((prev) => ({
      ...prev,
      form: { ...prev.form, ...updates }
    }));
  };

  const updateStatus = (updates: Partial<FindIdData["status"]>) => {
    setData((prev) => ({
      ...prev,
      status: { ...prev.status, ...updates }
    }));
  };

  const updateResult = (updates: Partial<FindIdData["result"]>) => {
    setData((prev) => ({
      ...prev,
      result: { ...prev.result, ...updates }
    }));
  };

  const handleSendVerificationCode = () => {
    if (data.form.phoneNumber) {
      updateStatus({
        isCodeSent: true,
        isVerificationSent: true,
        isTimerActive: true,
        timeRemaining: 180
      });
      // 실제로는 API 호출로 인증번호 전송
      console.log("인증번호 전송:", { phoneNumber: data.form.phoneNumber });
    }
  };

  const handleVerifyCode = () => {
    if (data.form.verificationCode) {
      // 실제로는 API 호출로 인증번호 확인
      console.log("인증번호 확인:", data.form.verificationCode);
      updateStatus({
        isVerificationCompleted: true,
        isTimerActive: false
      });
    }
  };

  const handleFindId = () => {
    updateResult({ foundUserId: "abcd****@email.com" }); // 실제로는 API에서 받아온 아이디
    updateData({ step: "result" });
  };

  const handleLogin = () => {
    onFindIdSuccess?.(data.result.foundUserId);
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

  const renderInputStep = () => (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.title}>가입하신 아이디를 찾기위해{"\n"}휴대폰 인증을 해주세요</Text>
        <Text style={styles.subtitle}>가입하신 휴대폰 번호를 입력해주세요.</Text>
      </View>

      <View style={styles.inputSection}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>휴대전화 번호</Text>
          <View style={styles.phoneInputContainer}>
            <TextInput
              style={styles.phoneInput}
              placeholder="(-)제외하고 숫자만 입력"
              placeholderTextColor="#B1B8C0"
              value={data.form.phoneNumber}
              onChangeText={(text) => updateForm({ phoneNumber: text })}
              keyboardType="phone-pad"
            />
            <TouchableOpacity
              style={[styles.sendCodeButton, (!data.form.phoneNumber || data.status.isVerificationSent) && styles.sendCodeButtonDisabled]}
              onPress={handleSendVerificationCode}
              disabled={!data.form.phoneNumber || data.status.isVerificationSent}
            >
              <Text style={styles.sendCodeButtonText}>인증번호 받기</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputBorder} />
          {data.status.isVerificationSent && <Text style={styles.statusMessage}>인증번호가 발송되었습니다.</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>인증번호</Text>
          <View style={styles.verificationInputContainer}>
            <TextInput
              style={styles.verificationInput}
              placeholder="인증번호 입력"
              placeholderTextColor="#B1B8C0"
              value={data.form.verificationCode}
              onChangeText={(text) => updateForm({ verificationCode: text })}
              keyboardType="number-pad"
              maxLength={6}
            />
            <TouchableOpacity
              style={[styles.verifyButton, (!data.form.verificationCode || data.status.isVerificationCompleted) && styles.verifyButtonDisabled]}
              onPress={handleVerifyCode}
              disabled={!data.form.verificationCode || data.status.isVerificationCompleted}
            >
              <Text style={styles.verifyButtonText}>인증확인</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputBorder} />
          {data.status.isVerificationCompleted && <Text style={styles.statusMessage}>휴대폰 번호 인증이 완료되었습니다.</Text>}
        </View>

        {data.status.isTimerActive && data.status.timeRemaining > 0 && (
          <View style={styles.timerContainer}>
            <Text style={styles.timerLabel}>남은시간</Text>
            <Text style={[styles.timerText, data.status.timeRemaining <= 30 && styles.timerWarning]}>{formatTime(data.status.timeRemaining)}</Text>
          </View>
        )}
      </View>

      <View style={styles.buttonSection}>
        <TouchableOpacity
          style={[styles.primaryButton, !data.status.isVerificationCompleted && styles.buttonDisabled]}
          onPress={handleFindId}
          disabled={!data.status.isVerificationCompleted}
        >
          <Text style={styles.primaryButtonText}>아이디 찾기</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.secondaryButton, styles.emailButton]} onPress={handleEmailInput}>
          <Text style={styles.secondaryButtonText}>이메일로 찾기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderVerificationStep = () => (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.title}>인증번호 확인</Text>
        <Text style={styles.subtitle}>휴대폰으로 전송된 인증번호를 입력해주세요.</Text>
      </View>

      <View style={styles.inputSection}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>인증번호</Text>
          <View style={styles.verificationInputContainer}>
            <TextInput
              style={styles.verificationInput}
              placeholder="인증번호 6자리를 입력하세요"
              placeholderTextColor="#B1B8C0"
              value={data.form.verificationCode}
              onChangeText={(text) => updateForm({ verificationCode: text })}
              keyboardType="number-pad"
              maxLength={6}
            />
            <TouchableOpacity
              style={[styles.verifyButton, !data.form.verificationCode && styles.verifyButtonDisabled]}
              onPress={handleVerifyCode}
              disabled={!data.form.verificationCode}
            >
              <Text style={styles.verifyButtonText}>확인</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputBorder} />
          {data.status.isVerificationCompleted && <Text style={styles.statusMessage}>휴대폰 번호 인증이 완료되었습니다.</Text>}
        </View>
      </View>

      <TouchableOpacity style={styles.resendButton} onPress={handleSendVerificationCode}>
        <Text style={styles.resendButtonText}>인증번호 재전송</Text>
      </TouchableOpacity>
    </View>
  );

  const renderResultStep = () => (
    <View style={styles.container}>
      <View style={styles.resultSection}>
        <Text style={styles.resultTitle}>아이디 찾기가{"\n"}완료되었습니다</Text>
        <Text style={styles.resultSubtitle}>회원님의 아이디(이메일)은 아래와 같습니다.</Text>

        <View style={styles.userIdContainer}>
          <View style={styles.userIdRow}>
            <Text style={styles.userIdLabel}>가입일</Text>
            <Text style={styles.userIdDate}>2026.04.28 가입</Text>
          </View>
          <Text style={styles.userId}>{data.result.foundUserId}</Text>
        </View>
      </View>

      <View style={styles.buttonSection}>
        <TouchableOpacity style={[styles.secondaryButton, styles.resetPasswordButton]} onPress={() => {}}>
          <Text style={styles.secondaryButtonText}>비밀번호 재설정하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.primaryButton, styles.loginButton]} onPress={handleLogin}>
          <Text style={styles.primaryButtonText}>로그인 하러가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmailInputStep = () => (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.title}>이메일 주소 입력</Text>
        <Text style={styles.subtitle}>가입하신 이메일 주소를{"\n"}입력해주세요.</Text>
      </View>

      <View style={styles.inputSection}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>이메일 주소</Text>
          <TextInput
            style={styles.input}
            placeholder="이메일 주소를 입력하세요"
            placeholderTextColor="#B1B8C0"
            value={data.form.email}
            onChangeText={(text) => updateForm({ email: text })}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <View style={styles.inputBorder} />
        </View>
      </View>

      <View style={styles.buttonSection}>
        <TouchableOpacity
          style={[styles.primaryButton, !data.form.email && styles.buttonDisabled]}
          onPress={handleSendEmailLink}
          disabled={!data.form.email}
        >
          <Text style={styles.primaryButtonText}>링크 전송하기</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.secondaryButton, styles.backButton]} onPress={handleBackToInput}>
          <Text style={styles.secondaryButtonText}>뒤로가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderLinkStep = () => (
    <View style={styles.container}>
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

      <View style={styles.linkActionsSection}>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => updateData({ step: "input" })}>
          <Text style={styles.secondaryButtonText}>다시 입력하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
          <Text style={styles.primaryButtonText}>로그인으로 돌아가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <CommonLayout
      title={
        data.step === "input"
          ? "아이디 찾기"
          : data.step === "verification"
          ? "인증번호 확인"
          : data.step === "emailInput"
          ? "이메일 주소 입력"
          : data.step === "link"
          ? "링크 전송 완료"
          : "아이디 찾기 완료"
      }
      showBackButton={true}
      showTabBar={false}
      showTopIcons={false}
      onBackPress={onBackPress}
      onMenuPress={() => {}}
      onCouponPress={() => {}}
      onNotificationPress={() => {}}
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
    alignItems: "center",
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
