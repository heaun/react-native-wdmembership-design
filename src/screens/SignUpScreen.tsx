import React, { useState, useMemo } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Image } from "react-native";
import { CommonLayout } from "../components/CommonLayout";
import { Ionicons } from "@expo/vector-icons";
import { authCommonStyles, Timer, useAuthTimer, AuthResultStep } from "../components/AuthCommon";

interface SignUpScreenProps {
  onBackPress?: () => void;
  onRegisterSuccess?: (result?: any) => void;
}

enum AuthInfoStep {
  verificationType = 0,
  nameInput = 1,
  residentNumber = 2,
  carrierSelection = 3,
  phoneNumber = 4,
  phoneVerification = 5,
  verificationComplete = 6,
  uwerAgreement = 7,
  userAccountInput = 8,
  passwordInput = 9
}

interface SignUpData {
  step: AuthInfoStep;
  form: {
    verificationType: "domestic" | "foreign" | null;
    name: string;
    residentNumber: string;
    carrier: string;
    phoneNumber: string;
    verificationCode: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  status: {
    isCodeSent: boolean;
    isVerificationSent: boolean;
    isVerificationCompleted: boolean;
    showPassword: boolean;
    showConfirmPassword: boolean;
    isNameValid: boolean;
    isResidentNumberValid: boolean;
    isCarrierSelected: boolean;
    isPhoneNumberValid: boolean;
    isTosAgreed: boolean;
    isPrivacyAgreed: boolean;
    isMarketingAgreed: boolean;
    isAgeAgreed: boolean;
    isPointsAgreed: boolean;
    isEmailValid: boolean;
    isPasswordValid: boolean;
    isPasswordMatch: boolean;
    showCarrierModal: boolean;
  };
}

interface TermsItem {
  id: string;
  title: string;
  isRequired: boolean;
  isAgreed: boolean;
  hasDetail: boolean;
}

interface MembershipResult {
  approveStatus: boolean;
}

const initialData: SignUpData = {
  step: AuthInfoStep.verificationType,
  form: {
    verificationType: null,
    name: "",
    residentNumber: "",
    carrier: "",
    phoneNumber: "",
    verificationCode: "",
    email: "",
    password: "",
    confirmPassword: ""
  },
  status: {
    isCodeSent: false,
    isVerificationSent: false,
    isVerificationCompleted: false,
    showPassword: false,
    showConfirmPassword: false,
    isNameValid: false,
    isResidentNumberValid: false,
    isCarrierSelected: false,
    isPhoneNumberValid: false,
    isTosAgreed: false,
    isPrivacyAgreed: false,
    isMarketingAgreed: false,
    isAgeAgreed: false,
    isPointsAgreed: false,
    isEmailValid: false,
    isPasswordValid: false,
    isPasswordMatch: false,
    showCarrierModal: false
  }
};

export const SignUpScreen: React.FC<SignUpScreenProps> = ({ onBackPress, onRegisterSuccess }) => {
  const [data, setData] = useState<SignUpData>(initialData);
  const { timeRemaining, isTimerActive, startTimer, stopTimer } = useAuthTimer(180);
  const membershipResult: MembershipResult = {
    approveStatus: true
  };
  // 약관 목록 정의
  const termsList: TermsItem[] = useMemo(
    () => [
      {
        id: "service",
        title: "[필수] 서비스 이용약관 동의",
        isRequired: true,
        isAgreed: data.status.isTosAgreed,
        hasDetail: true
      },
      {
        id: "privacy",
        title: "[필수] 개인정보 수집 및 이용 동의",
        isRequired: true,
        isAgreed: data.status.isPrivacyAgreed,
        hasDetail: true
      },
      {
        id: "points",
        title: "[필수] WD 멤버스 포인트 이용약관",
        isRequired: true,
        isAgreed: data.status.isPointsAgreed,
        hasDetail: true
      },
      {
        id: "marketing",
        title: "[선택] 마케팅 수신 동의",
        isRequired: false,
        isAgreed: data.status.isMarketingAgreed,
        hasDetail: false
      },
      {
        id: "age",
        title: "[필수] 만 19세 이상입니다.",
        isRequired: true,
        isAgreed: data.status.isAgeAgreed,
        hasDetail: false
      }
    ],
    [data.status.isTosAgreed, data.status.isPrivacyAgreed, data.status.isPointsAgreed, data.status.isMarketingAgreed, data.status.isAgeAgreed]
  );

  // 전체 동의 상태 계산
  const isAllAgreed = termsList.every((term) => term.isAgreed);

  // 필수 약관 동의 상태 계산
  const isRequiredAgreed = termsList.filter((term) => term.isRequired).every((term) => term.isAgreed);

  const updateForm = (updates: Partial<SignUpData["form"]>) => {
    setData((prev) => ({
      ...prev,
      form: { ...prev.form, ...updates }
    }));
  };

  const updateStatus = (updates: Partial<SignUpData["status"]>) => {
    setData((prev) => ({
      ...prev,
      status: { ...prev.status, ...updates }
    }));
  };

  const handleVerificationTypeSelect = (type: "domestic" | "foreign") => {
    updateForm({ verificationType: type });
  };

  const handleStartVerification = () => {
    if (data.form.verificationType) {
      setData((prev) => ({ ...prev, step: AuthInfoStep.nameInput }));
    }
  };

  const handleVerificationComplete = () => {
    setData((prev) => ({ ...prev, step: AuthInfoStep.nameInput }));
  };

  const handleNameInputComplete = () => {
    if (data.form.name.trim().length >= 2) {
      setData((prev) => ({ ...prev, step: AuthInfoStep.residentNumber }));
    }
  };

  const handleResidentNumberComplete = () => {
    if (data.form.residentNumber.length === 14) {
      // ######-#######
      setData((prev) => ({ ...prev, step: AuthInfoStep.carrierSelection }));
    }
  };

  const handleCarrierSelectionComplete = () => {
    if (data.form.carrier) {
      setData((prev) => ({ ...prev, step: AuthInfoStep.phoneNumber }));
    }
  };

  const handlePhoneNumberComplete = () => {
    if (data.status.isVerificationCompleted) {
      // 실제로는 API 호출로 기존 회원인지 확인
      const isExistingUser = false; // 임시로 신규회원으로 설정
      if (isExistingUser) {
        setData((prev) => ({ ...prev, step: AuthInfoStep.verificationComplete }));
      } else {
        setData((prev) => ({ ...prev, step: AuthInfoStep.verificationComplete }));
      }
    }
  };

  const handleVerificationCompleteConfirm = () => {
    setData((prev) => ({ ...prev, step: AuthInfoStep.uwerAgreement }));
  };

  const handleUserAgreementComplete = () => {
    setData((prev) => ({ ...prev, step: AuthInfoStep.userAccountInput }));
  };

  const handleUserAccountInputComplete = () => {
    setData((prev) => ({ ...prev, step: AuthInfoStep.passwordInput }));
  };

  const handlePasswordInputComplete = () => {
    // MembershipResultScreen으로 이동
    const result = {
      action: "navigateToMembershipResult",
      approveStatus: membershipResult.approveStatus
    };
    onRegisterSuccess?.(result);
  };

  const handleGoToLogin = () => {
    // 로그인 페이지로 이동
    console.log("로그인 페이지로 이동");
  };

  // 약관 동의 관련 핸들러
  const handleAllTermsAgree = () => {
    const newAgreedState = !isAllAgreed;
    updateStatus({
      isTosAgreed: newAgreedState,
      isPrivacyAgreed: newAgreedState,
      isPointsAgreed: newAgreedState,
      isMarketingAgreed: newAgreedState,
      isAgeAgreed: newAgreedState
    });
  };

  const handleTermsAgree = (termsId: string) => {
    switch (termsId) {
      case "service":
        updateStatus({ isTosAgreed: !data.status.isTosAgreed });
        break;
      case "privacy":
        updateStatus({ isPrivacyAgreed: !data.status.isPrivacyAgreed });
        break;
      case "points":
        updateStatus({ isPointsAgreed: !data.status.isPointsAgreed });
        break;
      case "marketing":
        updateStatus({ isMarketingAgreed: !data.status.isMarketingAgreed });
        break;
      case "age":
        updateStatus({ isAgeAgreed: !data.status.isAgeAgreed });
        break;
    }
  };

  const handleTermsDetail = (termsId: string) => {
    // 약관 상세 보기 모달 또는 페이지로 이동
    console.log(`약관 상세 보기: ${termsId}`);
  };

  // 비밀번호 유효성 검사 함수
  const validatePassword = (password: string) => {
    const hasLength = password.length >= 8 && password.length <= 20;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      isValid: hasLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar,
      hasLength,
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      hasSpecialChar
    };
  };

  // 비밀번호 변경 핸들러
  const handlePasswordChange = (text: string) => {
    updateForm({ password: text });
    const validation = validatePassword(text);
    updateStatus({ isPasswordValid: validation.isValid });

    // 비밀번호 확인과 일치하는지 확인
    if (data.form.confirmPassword) {
      updateStatus({ isPasswordMatch: text === data.form.confirmPassword });
    }
  };

  // 비밀번호 확인 변경 핸들러
  const handleConfirmPasswordChange = (text: string) => {
    updateForm({ confirmPassword: text });
    updateStatus({ isPasswordMatch: text === data.form.password });
  };

  const handleSendVerificationCode = () => {
    if (data.form.phoneNumber) {
      updateStatus({
        isCodeSent: true,
        isVerificationSent: true
      });
      startTimer();
      console.log("인증번호 전송:", { phoneNumber: data.form.phoneNumber });
    }
  };

  const handleVerifyCode = () => {
    if (data.form.verificationCode) {
      console.log("인증번호 확인:", data.form.verificationCode);
      updateStatus({
        isVerificationCompleted: true
      });
      stopTimer();
    }
  };

  const formatResidentNumber = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, "");
    if (cleaned.length <= 6) {
      return cleaned;
    } else {
      return cleaned.slice(0, 6) + "-" + cleaned.slice(6, 13);
    }
  };

  const carriers = [
    { id: "skt", name: "SKT" },
    { id: "kt", name: "KT" },
    { id: "lg", name: "LG U+" },
    { id: "sktmvno", name: "SKT 알뜰폰" },
    { id: "ktmvno", name: "KT 알뜰폰" },
    { id: "lgmvno", name: "LG U+ 알뜰폰" }
  ];

  const getButtons = () => {
    console.log("data.step : ", data.step);
    switch (data.step) {
      case AuthInfoStep.verificationType:
        return [
          {
            text: "다음",
            onPress: handleStartVerification,
            disabled: !data.form.verificationType,
            style: data.form.verificationType ? styles.primaryButton : styles.primaryButtonDisabled
          }
        ];
      case AuthInfoStep.phoneVerification:
        return [
          {
            text: "인증 완료",
            onPress: handleVerificationComplete,
            disabled: !data.status.isVerificationCompleted,
            style: data.status.isVerificationCompleted ? styles.primaryButton : styles.primaryButtonDisabled
          }
        ];
      case AuthInfoStep.nameInput:
        return [
          {
            text: "다음",
            onPress: handleNameInputComplete,
            disabled: !data.form.name.trim() || data.form.name.trim().length < 2,
            style: data.form.name.trim() && data.form.name.trim().length >= 2 ? styles.primaryButton : styles.primaryButtonDisabled
          }
        ];
      case AuthInfoStep.residentNumber:
        return [
          {
            text: "다음",
            onPress: handleResidentNumberComplete,
            disabled: data.form.residentNumber.length !== 14,
            style: data.form.residentNumber.length === 14 ? styles.primaryButton : styles.primaryButtonDisabled
          }
        ];
      case AuthInfoStep.carrierSelection:
        return [
          {
            text: "다음",
            onPress: handleCarrierSelectionComplete,
            disabled: !data.form.carrier,
            style: data.form.carrier ? styles.primaryButton : styles.primaryButtonDisabled
          }
        ];
      case AuthInfoStep.phoneNumber:
        return [
          {
            text: "본인 인증하기",
            onPress: handlePhoneNumberComplete,
            disabled: !data.status.isVerificationCompleted,
            style: data.status.isVerificationCompleted ? styles.primaryButton : styles.primaryButtonDisabled
          }
        ];
      case AuthInfoStep.verificationComplete:
        return [
          {
            text: "다음",
            onPress: handleVerificationCompleteConfirm,
            style: styles.primaryButton
          }
        ];
      case AuthInfoStep.uwerAgreement:
        return [
          {
            text: "동의하고 가입하기",
            onPress: handleUserAgreementComplete,
            disabled: !isRequiredAgreed,
            style: isRequiredAgreed ? styles.primaryButton : styles.primaryButtonDisabled
          }
        ];
      case AuthInfoStep.userAccountInput:
        return [
          {
            text: "다음",
            onPress: handleUserAccountInputComplete,
            disabled: !data.status.isEmailValid,
            style: data.status.isEmailValid ? styles.primaryButton : styles.primaryButtonDisabled
          }
        ];
      case AuthInfoStep.passwordInput:
        return [
          {
            text: "가입하기",
            onPress: handlePasswordInputComplete,
            disabled: !data.status.isPasswordValid || !data.status.isPasswordMatch,
            style: data.status.isPasswordValid && data.status.isPasswordMatch ? styles.primaryButton : styles.primaryButtonDisabled
          }
        ];
      default:
        return [];
    }
  };

  const renderVerificationTypeStep = () => (
    <View style={[styles.container, { paddingBottom: 120 }]}>
      <View style={styles.headerSection}>
        <Text style={styles.title}>
          회원 가입을 위해{"\n"}
          본인인증을{"\n"}
          진행해 주세요.
        </Text>
      </View>

      <View style={styles.cardSection}>
        <TouchableOpacity
          style={[styles.verificationCard, data.form.verificationType === "domestic" && styles.verificationCardSelected]}
          onPress={() => handleVerificationTypeSelect("domestic")}
        >
          <View style={styles.cardContent}>
            <View style={styles.cardTextSection}>
              <Text style={styles.cardTitle}>내국인</Text>
              <Text style={styles.cardSubtitle}>휴대폰 인증</Text>
            </View>
            <View style={styles.cardIconSection}>
              <Image source={require("../assets/icons/ic_local.png")} style={styles.ic_local} />
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.verificationCard, data.form.verificationType === "foreign" && styles.verificationCardSelected]}
          onPress={() => handleVerificationTypeSelect("foreign")}
        >
          <View style={styles.cardContent}>
            <View style={styles.cardTextSection}>
              <Text style={styles.cardTitle}>외국인</Text>
              <Text style={styles.cardSubtitle}>이메일로 인증</Text>
            </View>
            <View style={styles.cardIconSection}>
              <Image source={require("../assets/icons/ic_foreigner.png")} style={styles.ic_foreign} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPhoneVerificationStep = () => (
    <View style={[styles.container, { paddingBottom: 120 }]}>
      <View style={styles.headerSection}>
        <Text style={styles.title}>{data.form.verificationType === "domestic" ? "휴대폰 인증" : "이메일 인증"}</Text>
        <Text style={styles.subtitle}>
          {data.form.verificationType === "domestic"
            ? "휴대폰 번호를 입력하고 인증번호를 받아주세요."
            : "이메일 주소를 입력하고 인증 링크를 받아주세요."}
        </Text>
      </View>

      <View style={styles.inputSection}>
        {data.form.verificationType === "domestic" ? (
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>휴대폰 번호</Text>
            <View style={styles.phoneInputContainer}>
              <TextInput
                style={styles.phoneInput}
                placeholder="(-)제외하고 숫자만 입력"
                placeholderTextColor="#B1B8C0"
                value={data.form.phoneNumber}
                onChangeText={(text) => updateForm({ phoneNumber: text })}
                keyboardType="phone-pad"
                blurOnSubmit={false}
                autoCorrect={false}
                autoCapitalize="none"
                showSoftInputOnFocus={false}
              />
              <TouchableOpacity
                style={[styles.verifyButton, (!data.form.phoneNumber || data.status.isCodeSent) && styles.verifyButtonDisabled]}
                onPress={() => updateStatus({ isCodeSent: true })}
                disabled={!data.form.phoneNumber || data.status.isCodeSent}
              >
                <Text style={styles.verifyButtonText}>인증번호 받기</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputBorder} />
            {data.status.isCodeSent && <Text style={styles.statusMessage}>인증번호가 발송되었습니다.</Text>}

            {data.status.isCodeSent && (
              <>
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
                    blurOnSubmit={false}
                    autoCorrect={false}
                    autoCapitalize="none"
                    showSoftInputOnFocus={false}
                  />
                  <TouchableOpacity
                    style={[styles.verifyButton, (!data.form.verificationCode || data.status.isVerificationCompleted) && styles.verifyButtonDisabled]}
                    onPress={() => updateStatus({ isVerificationCompleted: true })}
                    disabled={!data.form.verificationCode || data.status.isVerificationCompleted}
                  >
                    <Text style={styles.verifyButtonText}>인증확인</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.inputBorder} />
                {data.status.isVerificationCompleted && <Text style={styles.statusMessage}>휴대폰 번호 인증이 완료되었습니다.</Text>}
              </>
            )}
          </View>
        ) : (
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
              showSoftInputOnFocus={false}
            />
            <View style={styles.inputBorder} />
            <TouchableOpacity
              style={[styles.verifyButton, (!data.form.email || data.status.isCodeSent) && styles.verifyButtonDisabled]}
              onPress={() => updateStatus({ isCodeSent: true, isVerificationCompleted: true })}
              disabled={!data.form.email || data.status.isCodeSent}
            >
              <Text style={styles.verifyButtonText}>인증 링크 전송</Text>
            </TouchableOpacity>
            {data.status.isCodeSent && <Text style={styles.statusMessage}>인증 링크가 이메일로 전송되었습니다.</Text>}
          </View>
        )}
      </View>
    </View>
  );

  const stepMessage = {
    [AuthInfoStep.nameInput]: {
      title: "이름을 입력해주세요",
      subtitle: "실명으로 입력해주세요."
    },
    [AuthInfoStep.residentNumber]: {
      title: "주민등록번호를 입력해주세요",
      subtitle: "본인인증을 위해 주민등록번호를 입력해주세요."
    },
    [AuthInfoStep.carrierSelection]: {
      title: "통신사를 선택해주세요",
      subtitle: "본인인증을 위해 통신사를 선택해주세요."
    }
  };

  const renderUserAuthInfoStep = () => (
    <View style={[styles.container, { paddingBottom: 120 }]}>
      <View style={styles.headerSection}>
        <Text style={styles.title}>{stepMessage[data.step as keyof typeof stepMessage]?.title}</Text>
        <Text style={styles.subtitle}>{stepMessage[data.step as keyof typeof stepMessage]?.subtitle}</Text>
      </View>

      <View style={styles.inputSection}>
        {/* 이름 */}
        {data.step === AuthInfoStep.nameInput && (
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>이름</Text>
            <TextInput
              style={styles.input}
              placeholder="이름을 입력하세요"
              placeholderTextColor="#B1B8C0"
              value={data.form.name}
              onChangeText={(text) => {
                updateForm({ name: text });
                updateStatus({ isNameValid: text.trim().length >= 2 });
              }}
              autoCapitalize="none"
              autoCorrect={false}
              showSoftInputOnFocus={false}
            />
            <View style={styles.inputBorder} />
            {data.form.name && data.form.name.trim().length < 2 && <Text style={styles.errorMessage}>이름을 2자 이상 입력해주세요.</Text>}
          </View>
        )}

        {/* 주민등록번호 */}
        {data.step === AuthInfoStep.residentNumber && (
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>주민등록번호</Text>
            <TextInput
              style={styles.input}
              placeholder="000000-0000000"
              placeholderTextColor="#B1B8C0"
              value={data.form.residentNumber}
              onChangeText={(text) => {
                const formatted = formatResidentNumber(text);
                updateForm({ residentNumber: formatted });
                updateStatus({ isResidentNumberValid: formatted.length === 14 });
              }}
              keyboardType="number-pad"
              maxLength={14}
              autoCorrect={false}
              autoCapitalize="none"
              showSoftInputOnFocus={false}
            />
            <View style={styles.inputBorder} />
            {data.form.residentNumber && data.form.residentNumber.length !== 14 && (
              <Text style={styles.errorMessage}>주민등록번호를 올바르게 입력해주세요.</Text>
            )}
          </View>
        )}

        {/* 통신사 */}
        {data.step === AuthInfoStep.carrierSelection && (
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>통신사</Text>
            <TouchableOpacity
              style={styles.carrierSelector}
              onPress={() => {
                console.log("통신사 선택 버튼 클릭");
                updateStatus({ showCarrierModal: true });
              }}
            >
              <Text style={[styles.carrierText, !data.form.carrier && styles.carrierPlaceholder]}>
                {data.form.carrier || "통신사를 선택해주세요"}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#B1B8C0" />
            </TouchableOpacity>
            <View style={styles.inputBorder} />
          </View>
        )}
      </View>
    </View>
  );

  const renderCarrierModal = () => {
    if (!data.status.showCarrierModal) return null;

    return (
      <View style={styles.modalOverlay}>
        <TouchableOpacity style={styles.modalBackdrop} onPress={() => updateStatus({ showCarrierModal: false })} />
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>통신사 선택</Text>
            <TouchableOpacity onPress={() => updateStatus({ showCarrierModal: false })}>
              <Ionicons name="close" size={24} color="#2B2B2B" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalContent}>
            {carriers.map((carrier) => (
              <TouchableOpacity
                key={carrier.id}
                style={styles.carrierItem}
                onPress={() => {
                  updateForm({ carrier: carrier.name });
                  updateStatus({ showCarrierModal: false, isCarrierSelected: true });
                }}
              >
                <Text style={styles.carrierItemText}>{carrier.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  };

  const renderPhoneNumberStep = () => (
    <View style={[styles.container, { paddingBottom: 120 }]}>
      <View style={styles.headerSection}>
        <Text style={styles.title}>휴대폰 번호를 입력해주세요</Text>
        <Text style={styles.subtitle}>본인인증을 위해 휴대폰 번호를 입력해주세요.</Text>
      </View>

      <View style={styles.inputSection}>
        <View style={styles.inputContainer}>
          <Text style={authCommonStyles.inputLabel}>휴대폰 번호</Text>
          <View style={authCommonStyles.phoneInputContainer}>
            <TextInput
              style={authCommonStyles.phoneInput}
              placeholder="(-)제외하고 숫자만 입력"
              placeholderTextColor="#B1B8C0"
              value={data.form.phoneNumber}
              onChangeText={(text) => {
                const cleaned = text.replace(/[^0-9]/g, "");
                updateForm({ phoneNumber: cleaned });
                updateStatus({ isPhoneNumberValid: cleaned.length >= 10 });
              }}
              keyboardType="phone-pad"
              blurOnSubmit={false}
              autoCorrect={false}
              autoCapitalize="none"
              showSoftInputOnFocus={false}
            />
            <TouchableOpacity
              style={[authCommonStyles.verifyButton, (!data.form.phoneNumber || data.status.isCodeSent) && authCommonStyles.verifyButtonDisabled]}
              onPress={handleSendVerificationCode}
              disabled={!data.form.phoneNumber || data.status.isCodeSent}
            >
              <Text style={authCommonStyles.verifyButtonText}>인증번호 받기</Text>
            </TouchableOpacity>
          </View>
          <View style={authCommonStyles.inputBorder} />
          {data.status.isCodeSent && <Text style={authCommonStyles.statusMessage}>인증번호가 발송되었습니다.</Text>}

          {data.status.isCodeSent && (
            <>
              <Text style={authCommonStyles.inputLabel}>인증번호</Text>
              <View style={authCommonStyles.verificationInputContainer}>
                <TextInput
                  style={authCommonStyles.verificationInput}
                  placeholder="인증번호 입력"
                  placeholderTextColor="#B1B8C0"
                  value={data.form.verificationCode}
                  onChangeText={(text) => updateForm({ verificationCode: text })}
                  keyboardType="number-pad"
                  maxLength={6}
                  blurOnSubmit={false}
                  autoCorrect={false}
                  autoCapitalize="none"
                  showSoftInputOnFocus={false}
                />
                <TouchableOpacity
                  style={[
                    authCommonStyles.verifyButton,
                    (!data.form.verificationCode || data.status.isVerificationCompleted) && authCommonStyles.verifyButtonDisabled
                  ]}
                  onPress={handleVerifyCode}
                  disabled={!data.form.verificationCode || data.status.isVerificationCompleted}
                >
                  <Text style={authCommonStyles.verifyButtonText}>인증확인</Text>
                </TouchableOpacity>
              </View>
              <View style={authCommonStyles.inputBorder} />
              {data.status.isVerificationCompleted && <Text style={authCommonStyles.statusMessage}>휴대폰 번호 인증이 완료되었습니다.</Text>}
            </>
          )}

          <Timer timeRemaining={timeRemaining} isTimerActive={isTimerActive} />
        </View>
      </View>
    </View>
  );

  const renderVerificationCompleteStep = () => {
    // 실제로는 API 호출로 기존 회원인지 확인
    // const isExistingUser = true; // 기존회원 화면 테스트용
    const isExistingUser = false; // 신규회원 화면 테스트용

    if (isExistingUser) {
      // 기존 회원인 경우
      return (
        <AuthResultStep
          mode="register"
          message={{
            title: "이미 가입된 계정이 있어요",
            subtitle: "가입하신 정보의 계정을 찾았습니다.\n아래 계정으로 로그인 하세요."
          }}
          primaryButton={{
            text: "로그인하러 가기",
            onPress: handleGoToLogin
          }}
          userId="abcd1234@email.com"
          registrationDate="2026.04.28 가입"
        />
      );
    } else {
      // 신규 회원인 경우
      return (
        <AuthResultStep
          mode="register"
          message={{
            title: "인증이 완료되었습니다.\n맴버쉽 회원 가입을\n계속 진행해 주세요",
            subtitle: "10초 후 화면이 자동종료 됩니다."
          }}
          primaryButton={{
            text: "",
            onPress: handleVerificationCompleteConfirm
          }}
        />
      );
    }
  };

  const renderUserAccountInputStep = () => (
    <View style={[styles.container, { paddingBottom: 120 }]}>
      <View style={styles.headerSection}>
        <Text style={styles.title}>로그인에 사용할{"\n"}아이디(이메일)를 입력해 주세요.</Text>
      </View>

      <View style={styles.inputSection}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>이메일(아이디)</Text>
          <TextInput
            style={styles.input}
            placeholder="abc@email.com"
            placeholderTextColor="#B1B8C0"
            value={data.form.email}
            onChangeText={(text) => {
              updateForm({ email: text });
              // 간단한 이메일 유효성 검사
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              updateStatus({ isEmailValid: emailRegex.test(text) });
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            showSoftInputOnFocus={false}
          />
          <View style={styles.inputBorder} />
          {data.form.email && !data.status.isEmailValid && <Text style={styles.errorMessage}>이메일 형식이 올바르지 않습니다.</Text>}
        </View>
      </View>
    </View>
  );

  const renderPasswordInputStep = () => {
    const passwordValidation = validatePassword(data.form.password);

    return (
      <View style={[styles.container, { paddingBottom: 120 }]}>
        <View style={styles.headerSection}>
          <Text style={styles.title}>로그인에 사용할{"\n"}비밀번호를 입력해 주세요.</Text>
        </View>

        <View style={styles.inputSection}>
          {/* 비밀번호 입력 */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>비밀번호</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="비밀번호 입력"
                placeholderTextColor="#B1B8C0"
                value={data.form.password}
                onChangeText={handlePasswordChange}
                secureTextEntry={!data.status.showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                showSoftInputOnFocus={false}
              />
              <TouchableOpacity style={styles.eyeButton} onPress={() => updateStatus({ showPassword: !data.status.showPassword })}>
                <Ionicons name={data.status.showPassword ? "eye-off" : "eye"} size={20} color="#505866" />
              </TouchableOpacity>
            </View>
            <View style={styles.inputBorder} />
          </View>

          {/* 비밀번호 확인 입력 */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>비밀번호 확인</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="비밀번호 확인"
                placeholderTextColor="#B1B8C0"
                value={data.form.confirmPassword}
                onChangeText={handleConfirmPasswordChange}
                secureTextEntry={!data.status.showConfirmPassword}
                autoCapitalize="none"
                autoCorrect={false}
                showSoftInputOnFocus={false}
              />
              <TouchableOpacity style={styles.eyeButton} onPress={() => updateStatus({ showConfirmPassword: !data.status.showConfirmPassword })}>
                <Ionicons name={data.status.showConfirmPassword ? "eye-off" : "eye"} size={20} color="#505866" />
              </TouchableOpacity>
            </View>
            <View style={styles.inputBorder} />
          </View>

          {/* 비밀번호 유효성 검사 결과 */}
          <View style={styles.passwordValidationSection}>
            <View style={styles.validationItem}>
              <View style={[styles.validationIcon, passwordValidation.hasLength && styles.validationIconValid]}>
                {passwordValidation.hasLength && <Ionicons name="checkmark" size={12} color="#FFFFFF" />}
              </View>
              <Text style={[styles.validationText, passwordValidation.hasLength && styles.validationTextValid]}>8-20자 이내</Text>
            </View>
            <View style={styles.validationItem}>
              <View
                style={[
                  styles.validationIcon,
                  passwordValidation.hasUpperCase &&
                    passwordValidation.hasLowerCase &&
                    passwordValidation.hasNumber &&
                    passwordValidation.hasSpecialChar &&
                    styles.validationIconValid
                ]}
              >
                {passwordValidation.hasUpperCase &&
                  passwordValidation.hasLowerCase &&
                  passwordValidation.hasNumber &&
                  passwordValidation.hasSpecialChar && <Ionicons name="checkmark" size={12} color="#FFFFFF" />}
              </View>
              <Text
                style={[
                  styles.validationText,
                  passwordValidation.hasUpperCase &&
                    passwordValidation.hasLowerCase &&
                    passwordValidation.hasNumber &&
                    passwordValidation.hasSpecialChar &&
                    styles.validationTextValid
                ]}
              >
                대소문자,숫자,특수문자 포함
              </Text>
            </View>
            <View style={styles.validationItem}>
              <View style={[styles.validationIcon, data.status.isPasswordMatch && data.form.confirmPassword && styles.validationIconValid]}>
                {data.status.isPasswordMatch && data.form.confirmPassword && <Ionicons name="checkmark" size={12} color="#FFFFFF" />}
              </View>
              <Text style={[styles.validationText, data.status.isPasswordMatch && data.form.confirmPassword && styles.validationTextValid]}>
                비밀번호 일치
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderTosAgreementStep = () => (
    <View style={[styles.container, { paddingBottom: 120 }]}>
      <View style={styles.headerSection}>
        <Text style={styles.welcomeTitle}>환영합니다.</Text>
        <Text style={styles.welcomeSubtitle}>WD 멤버쉽 회원으로 초대합니다.</Text>
      </View>

      {/* 약관 전체 동의 */}
      <View style={styles.allTermsSection}>
        <TouchableOpacity style={styles.allTermsItem} onPress={handleAllTermsAgree}>
          <View style={[styles.checkbox, isAllAgreed && styles.checkboxChecked]}>
            {isAllAgreed && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
          </View>
          <Text style={styles.allTermsText}>약관 전체 동의</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
      </View>

      {/* 개별 약관 목록 */}
      <View style={styles.termsListSection}>
        {termsList.map((term) => (
          <View key={term.id} style={styles.termsItem}>
            <TouchableOpacity style={styles.termsCheckboxContainer} onPress={() => handleTermsAgree(term.id)}>
              <View style={[styles.checkbox, term.isAgreed && styles.checkboxChecked]}>
                {term.isAgreed && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
              </View>
              <Text style={styles.termsText}>{term.title}</Text>
            </TouchableOpacity>
            {term.hasDetail && (
              <TouchableOpacity style={styles.termsDetailButton} onPress={() => handleTermsDetail(term.id)}>
                <Ionicons name="chevron-forward" size={20} color="#2B2B2B" />
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>

      {/* 개인정보 보호 안내 */}
      <View style={styles.privacyNoticeSection}>
        <Text style={styles.privacyNoticeText}>
          정보주체의 개인정보 및 권리 보호를 위해 [개인정보 보호법] 및 관계 법령이 정한 바를 준수하여 안전하게 관리하고 있습니다. 자세한 사항은
          개인정보처리방침에서 확인할 수 있습니다.
        </Text>
      </View>
    </View>
  );

  return (
    <CommonLayout
      title="멤버십 가입"
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
        {data.step === AuthInfoStep.verificationType && renderVerificationTypeStep()}
        {data.step === AuthInfoStep.phoneVerification && renderPhoneVerificationStep()}
        {data.step === AuthInfoStep.nameInput && renderUserAuthInfoStep()}
        {data.step === AuthInfoStep.residentNumber && renderUserAuthInfoStep()}
        {data.step === AuthInfoStep.carrierSelection && renderUserAuthInfoStep()}
        {data.step === AuthInfoStep.phoneNumber && renderPhoneNumberStep()}
        {data.step === AuthInfoStep.verificationComplete && renderVerificationCompleteStep()}
        {data.step === AuthInfoStep.uwerAgreement && renderTosAgreementStep()}
        {data.step === AuthInfoStep.userAccountInput && renderUserAccountInputStep()}
        {data.step === AuthInfoStep.passwordInput && renderPasswordInputStep()}
      </ScrollView>
      {renderCarrierModal()}
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
    fontSize: 20,
    fontWeight: "800",
    color: "#2B2B2B",
    marginBottom: 8,
    lineHeight: 30,
    letterSpacing: -0.8
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#505866",
    lineHeight: 24
  },
  cardSection: {
    gap: 12
  },
  verificationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D6DADF",
    padding: 20,
    height: 100
  },
  verificationCardSelected: {
    borderColor: "#B48327",
    borderWidth: 2
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%"
  },
  cardTextSection: {
    flex: 1
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#2B2B2B",
    marginBottom: 4,
    letterSpacing: -0.8
  },
  cardSubtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#2B2B2B",
    letterSpacing: -0.64
  },
  cardIconSection: {
    justifyContent: "center",
    alignItems: "center"
  },
  ic_local: {
    width: 60,
    height: 60,
    resizeMode: "contain"
  },
  ic_foreign: {
    width: 60,
    height: 60,
    resizeMode: "contain"
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
  primaryButton: {
    backgroundColor: "#2B2B2B",
    borderRadius: 48,
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  primaryButtonDisabled: {
    backgroundColor: "#D6DADF"
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

  statusMessage: {
    fontSize: 12,
    fontWeight: "400",
    color: "#B48327",
    marginTop: 8,
    textAlign: "left"
  },
  errorMessage: {
    fontSize: 12,
    fontWeight: "400",
    color: "#FF3A4A",
    marginTop: 8,
    textAlign: "left"
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
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
  resultSection: {
    alignItems: "center",
    marginBottom: 40,
    paddingTop: 60
  },
  successIcon: {
    marginBottom: 20
  },
  resultTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: "#FFFFFF",
    lineHeight: 40,
    letterSpacing: -0.6,
    marginBottom: 20
  },
  resultSubtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#FFFFFF",
    lineHeight: 24,
    letterSpacing: -0.64
  },
  tosSection: {
    marginBottom: 40
  },
  tosItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
    paddingVertical: 8
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#D6DADF",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center"
  },
  checkboxChecked: {
    backgroundColor: "#B48327",
    borderColor: "#B48327"
  },
  tosTextContainer: {
    flex: 1
  },
  tosTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2B2B2B",
    marginBottom: 4
  },
  tosSubtitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#505866",
    lineHeight: 20
  },
  carrierSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12
  },
  carrierText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2B2B2B"
  },
  carrierPlaceholder: {
    color: "#B1B8C0",
    fontWeight: "400"
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end"
  },
  modalBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "70%"
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5"
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2B2B2B"
  },
  modalContent: {
    maxHeight: 400
  },
  carrierItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5"
  },
  carrierItemText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#2B2B2B"
  },
  welcomeTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: "#2B2B2B",
    lineHeight: 36,
    letterSpacing: -1.2,
    marginBottom: 10
  },
  welcomeSubtitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#2B2B2B",
    lineHeight: 18,
    letterSpacing: -0.56
  },
  allTermsSection: {
    marginBottom: 20
  },
  allTermsItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12
  },
  allTermsText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#2B2B2B",
    lineHeight: 18,
    letterSpacing: -0.56,
    marginLeft: 10
  },
  divider: {
    height: 1,
    backgroundColor: "#D6DADF",
    marginVertical: 10
  },
  termsListSection: {
    marginBottom: 20
  },
  termsItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12
  },
  termsCheckboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  termsText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#2B2B2B",
    lineHeight: 18,
    letterSpacing: -0.56,
    marginLeft: 10,
    flex: 1
  },
  termsDetailButton: {
    padding: 4
  },
  privacyNoticeSection: {
    marginTop: 20
  },
  privacyNoticeText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#2B2B2B",
    lineHeight: 18,
    letterSpacing: -0.48
  },
  passwordValidationSection: {
    marginTop: 20,
    gap: 8
  },
  validationItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  validationIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#D6DADF",
    justifyContent: "center",
    alignItems: "center"
  },
  validationIconValid: {
    backgroundColor: "#B48327"
  },
  validationText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#B1B8C0",
    lineHeight: 18,
    letterSpacing: -0.48
  },
  validationTextValid: {
    color: "#B48327"
  }
});
