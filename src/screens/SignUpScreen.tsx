import React, { useState, useMemo, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Image } from "react-native";
import { CommonLayout } from "../components/CommonLayout";
import { LabelText, ButtonText, SmallText } from "../components/CommonText";
import { Ionicons } from "@expo/vector-icons";
import {
  useAuthTimer,
  AuthResultStep,
  Timer,
  PhoneInput,
  VerificationInput,
  usePhoneAutoSend,
  usePhoneVerificationStep,
  PasswordInput,
  PasswordValidation
} from "../components/AuthCommon";
import { PasswordInputMode } from "../components/AuthCommon";
import { MembershipResult } from "../../types/membership";
import { globalStyles } from "../../styles/globalStyles";

interface SignUpScreenProps {
  onBackPress?: () => void;
  onRegisterSuccess?: (result?: any) => void;
}

enum AuthInfoStep {
  verificationType = 0,
  nameAndResidentNumber = 1,
  phoneVerification = 2, // 휴대폰 인증 단계 추가
  verificationComplete = 3,
  uwerAgreement = 4,
  userAccountInput = 5,
  passwordInput = 6
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
    showTermsModal: boolean;
    selectedTermsId: string | null;
    showResidentNumberInput: boolean;
    showCarrierInput: boolean;
    isExistingUser: boolean;
  };
}

interface TermsItem {
  id: string;
  title: string;
  isRequired: boolean;
  isAgreed: boolean;
  hasDetail: boolean;
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
    showCarrierModal: false,
    showTermsModal: false,
    selectedTermsId: null,
    showResidentNumberInput: false,
    showCarrierInput: false,
    isExistingUser: false
  }
};

export const SignUpScreen: React.FC<SignUpScreenProps> = ({ onBackPress, onRegisterSuccess }) => {
  const [data, setData] = useState<SignUpData>(initialData);
  const { timeRemaining, isTimerActive, startTimer, stopTimer } = useAuthTimer(180);
  const membershipResult: MembershipResult = {
    approveStatus: true
  };

  // TextInput refs 추가
  const nameInputRef = useRef<TextInput>(null);
  const residentNumberInputRef = useRef<TextInput>(null);
  const residentNumberBackInputRef = useRef<TextInput>(null);
  const phoneNumberInputRef = useRef<TextInput>(null);
  const verificationInputRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  // 주민등록번호 유효성 검사 함수
  const validateResidentNumber = (residentNumber: string) => {
    const cleaned = residentNumber.replace(/[^0-9]/g, "");
    return cleaned.length >= 7;
  };

  // 동적 타이틀 및 서브타이틀 생성
  const getTitleAndSubtitle = () => {
    if (!data.status.showResidentNumberInput) {
      return {
        title: "이름을 입력해주세요",
        subtitle: "실명으로 입력해주세요."
      };
    } else if (!data.status.showCarrierInput) {
      return {
        title: "주민등록번호를 입력해주세요",
        subtitle: "본인인증을 위해 주민등록번호를 입력해주세요."
      };
    } else {
      return {
        title: "통신사를 선택해주세요",
        subtitle: "본인인증을 위해 통신사를 선택해주세요."
      };
    }
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
    // 직접 다음 단계로 이동
    setData((prev) => ({
      ...prev,
      form: { ...prev.form, verificationType: type },
      step: AuthInfoStep.nameAndResidentNumber
    }));
  };

  const handleNameInputComplete = () => {
    if (data.form.name.trim().length >= 2) {
      // 주민등록번호 입력 필드 표시 및 포커스
      updateStatus({ showResidentNumberInput: true });
      global.setTimeout(() => {
        residentNumberInputRef.current?.focus();
        // 스크롤을 주민등록번호 입력 필드로 이동
        scrollViewRef.current?.scrollTo({ y: 200, animated: true });
      }, 100);
    }
  };

  const handleResidentNumberComplete = (residentNumberValue?: string) => {
    const valueToCheck = residentNumberValue || data.form.residentNumber;
    const cleaned = valueToCheck.replace(/[^0-9]/g, "");
    if (cleaned.length >= 7) {
      // 앞자리 6자리 + 뒷자리 1자리 입력 완료
      // 통신사 입력 필드 표시 및 모달 자동 열기
      updateStatus({
        showCarrierInput: true,
        showCarrierModal: true
      });
    }
  };

  const handleCarrierSelection = (carrierName: string) => {
    updateForm({ carrier: carrierName });
    updateStatus({
      showCarrierModal: false,
      isCarrierSelected: true
    });
  };

  // 통신사 선택 후 휴대폰 인증 단계로 이동
  const handleMoveToPhoneVerification = () => {
    setData((prev) => ({ ...prev, step: AuthInfoStep.phoneVerification }));
  };

  const handleSendVerificationCode = () => {
    if (data.form.phoneNumber) {
      updateStatus({
        isCodeSent: true
      });
      startTimer();
      // 실제로는 API 호출로 인증번호 전송
    }
  };

  // 휴대폰 자동 발송 훅 사용
  const { handlePhoneNumberChange, isPhoneNumberValid, isButtonDisabled } = usePhoneAutoSend(
    data.form.phoneNumber,
    data.status.isCodeSent,
    handleSendVerificationCode
  );

  const handleVerifyCode = () => {
    if (data.form.verificationCode) {
      // 실제로는 API 호출로 인증번호 확인
      updateStatus({
        isVerificationCompleted: true
      });
      stopTimer();
    }
  };

  // isExistingUser 값을 변경하는 함수 (테스트용)
  const setExistingUser = (isExisting: boolean) => {
    updateStatus({
      isExistingUser: isExisting
    });
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

  const handlePhoneVerificationComplete = () => {
    setData((prev) => ({ ...prev, step: AuthInfoStep.verificationComplete }));
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
    onRegisterSuccess?.({ action: "navigateToLogin" });
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
    // 약관 상세 보기 모달 표시
    updateStatus({ showTermsModal: true, selectedTermsId: termsId });
  };

  const handleCloseTermsModal = () => {
    updateStatus({ showTermsModal: false, selectedTermsId: null });
  };

  // 약관 내용 정의
  const getTermsContent = (termsId: string) => {
    switch (termsId) {
      case "service":
        return {
          title: "서비스 이용약관",
          content: `제1조 (목적)
본 약관은 WD 멤버십(이하 "회사")이 제공하는 서비스의 이용과 관련하여 회사와 회원과의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.`
        };
      case "privacy":
        return {
          title: "개인정보 수집 및 이용 동의",
          content: `개인정보 수집 및 이용 동의

1. 개인정보의 수집 및 이용 목적
회사는 다음의 목적을 위하여 개인정보를 처리합니다.`
        };
      case "points":
        return {
          title: "WD 멤버스 포인트 이용약관",
          content: `WD 멤버스 포인트 이용약관

제1조 (목적)
본 약관은 WD 멤버십(이하 "회사")이 제공하는 WD 멤버스 포인트 서비스의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.`
        };
      default:
        return {
          title: "약관",
          content: "약관 내용이 없습니다."
        };
    }
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

  const carriers = [
    { id: "skt", name: "SKT" },
    { id: "kt", name: "KT" },
    { id: "lg", name: "LG U+" },
    { id: "sktmvno", name: "SKT 알뜰폰" },
    { id: "ktmvno", name: "KT 알뜰폰" },
    { id: "lgmvno", name: "LG U+ 알뜰폰" }
  ];

  const getButtons = () => {
    switch (data.step) {
      case AuthInfoStep.verificationType:
        return []; // 자동으로 진행되므로 버튼 불필요
      case AuthInfoStep.nameAndResidentNumber: {
        // 현재 단계에 따라 버튼 텍스트와 활성화 조건 결정
        const isNameValid = data.form.name.trim().length >= 2;
        const isResidentNumberValid = validateResidentNumber(data.form.residentNumber);
        const isCarrierSelected = data.form.carrier;

        // 통신사 선택까지만 표시된 경우 - 다음 버튼 (휴대폰 인증 단계로 이동)
        if (data.status.showCarrierInput && isCarrierSelected) {
          return [
            {
              text: "다음",
              onPress: handleMoveToPhoneVerification,
              disabled: !isNameValid || !isResidentNumberValid || !isCarrierSelected,
              style: "primary" as const
            }
          ];
        }

        // 기본적으로는 버튼 없음 (이름, 주민번호 입력 중)
        return [];
      }

      case AuthInfoStep.phoneVerification:
        return [
          {
            text: "다음",
            onPress: handlePhoneVerificationComplete,
            disabled: !data.status.isVerificationCompleted,
            style: "primary" as const
          }
        ];

      case AuthInfoStep.verificationComplete: {
        if (data.status.isExistingUser) {
          return [
            {
              text: "로그인하러 가기",
              onPress: handleGoToLogin,
              style: "primary" as const
            }
          ];
        } else {
          return [
            {
              text: "다음",
              onPress: handleVerificationCompleteConfirm,
              style: "primary" as const
            }
          ];
        }
      }
      case AuthInfoStep.uwerAgreement:
        return [
          {
            text: "동의하고 가입하기",
            onPress: handleUserAgreementComplete,
            disabled: !isRequiredAgreed,
            style: "primary" as const
          }
        ];
      case AuthInfoStep.userAccountInput:
        return [
          {
            text: "다음",
            onPress: handleUserAccountInputComplete,
            disabled: !data.status.isEmailValid,
            style: "primary" as const
          }
        ];
      case AuthInfoStep.passwordInput:
        return [
          {
            text: "가입하기",
            onPress: handlePasswordInputComplete,
            disabled: !data.status.isPasswordValid || !data.status.isPasswordMatch,
            style: "primary" as const
          }
        ];
      default:
        return [];
    }
  };

  const renderVerificationTypeStep = () => (
    <View style={[styles.container, { paddingBottom: 120 }]}>
      <View style={styles.headerSection}>
        <LabelText style={styles.title}>
          회원 가입을 위해{"\n"}
          본인인증을{"\n"}
          진행해 주세요.
        </LabelText>
      </View>

      <View style={styles.cardSection}>
        <TouchableOpacity
          style={[styles.verificationCard, data.form.verificationType === "domestic" && styles.verificationCardSelected]}
          onPress={() => handleVerificationTypeSelect("domestic")}
          activeOpacity={0.7}
        >
          <View style={styles.cardContent}>
            <View style={styles.cardTextSection}>
              <LabelText style={styles.cardTitle}>내국인</LabelText>
              <SmallText style={styles.cardSubtitle}>휴대폰 인증</SmallText>
            </View>
            <View style={styles.cardIconSection}>
              <Image source={require("../assets/icons/ic_local.png")} style={styles.ic_local} />
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.verificationCard, data.form.verificationType === "foreign" && styles.verificationCardSelected]}
          onPress={() => handleVerificationTypeSelect("foreign")}
          activeOpacity={0.7}
        >
          <View style={styles.cardContent}>
            <View style={styles.cardTextSection}>
              <LabelText style={styles.cardTitle}>외국인</LabelText>
              <SmallText style={styles.cardSubtitle}>이메일로 인증</SmallText>
            </View>
            <View style={styles.cardIconSection}>
              <Image source={require("../assets/icons/ic_foreigner.png")} style={styles.ic_foreign} />
            </View>
          </View>
        </TouchableOpacity>
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
              <TouchableOpacity key={carrier.id} style={styles.carrierItem} onPress={() => handleCarrierSelection(carrier.name)}>
                <Text style={styles.carrierItemText}>{carrier.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  };

  const renderTermsModal = () => {
    if (!data.status.showTermsModal || !data.status.selectedTermsId) return null;

    const termsContent = getTermsContent(data.status.selectedTermsId);

    return (
      <View style={styles.modalOverlay}>
        <TouchableOpacity style={styles.modalBackdrop} onPress={handleCloseTermsModal} />
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <LabelText style={styles.modalTitle}>{termsContent.title}</LabelText>
            <TouchableOpacity onPress={handleCloseTermsModal}>
              <Ionicons name="close" size={24} color="#2B2B2B" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalContent}>
            <LabelText style={styles.termsContentText}>{termsContent.content}</LabelText>
          </ScrollView>
        </View>
      </View>
    );
  };

  const renderVerificationCompleteStep = () => {
    return (
      <View style={[styles.container, { paddingBottom: 120 }]}>
        {/* 테스트용 버튼들 */}
        <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 20 }}>
          <TouchableOpacity style={[styles.testButton, data.status.isExistingUser && styles.testButtonActive]} onPress={() => setExistingUser(true)}>
            <Text style={styles.testButtonText}>기존 사용자</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.testButton, !data.status.isExistingUser && styles.testButtonActive]}
            onPress={() => setExistingUser(false)}
          >
            <Text style={styles.testButtonText}>신규 사용자</Text>
          </TouchableOpacity>
        </View>

        {data.status.isExistingUser ? (
          <AuthResultStep
            mode="register"
            message={{
              title: "이미 가입된 계정이 있어요",
              subtitle: "가입하신 정보의 계정을 찾았습니다.\n아래 계정으로 로그인 하세요."
            }}
            primaryButton={{
              text: "",
              onPress: () => {}
            }}
            userId="abcd1234@email.com"
            registrationDate="2026.04.28 가입"
          />
        ) : (
          <AuthResultStep
            mode="register"
            message={{
              title: "인증이 완료되었습니다.\n멤버십 회원 가입을\n계속 진행해 주세요",
              subtitle: ""
            }}
            primaryButton={{
              text: "다음",
              onPress: () => setData((prev) => ({ ...prev, step: AuthInfoStep.uwerAgreement }))
            }}
          />
        )}
      </View>
    );
  };

  // 휴대폰 인증 단계 렌더링
  const renderPhoneVerificationStep = () => (
    <View style={[styles.container, { paddingBottom: 120 }]}>
      <View style={styles.headerSection}>
        <Text style={styles.title}>{data.status.isCodeSent ? "인증번호를 입력해주세요" : "휴대폰 인증을 해주세요"}</Text>
        <Text style={styles.subtitle}>
          {data.status.isCodeSent ? "휴대폰으로 전송된 인증번호를 입력해주세요." : "가입하신 휴대폰 번호를 입력해주세요."}
        </Text>
      </View>

      <View style={styles.inputSection}>
        <PhoneInput
          value={data.form.phoneNumber}
          onChangeText={(text) => {
            const limitedText = handlePhoneNumberChange(text);
            updateForm({ phoneNumber: limitedText });
            updateStatus({ isPhoneNumberValid: isPhoneNumberValid });
          }}
          onSendCode={handleSendVerificationCode}
          disabled={isButtonDisabled}
          isVerificationSent={data.status.isCodeSent}
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
      </View>
    </View>
  );

  const renderUserAccountInputStep = () => (
    <View style={[styles.container, { paddingBottom: 120 }]}>
      <View style={styles.headerSection}>
        <Text style={styles.title}>로그인에 사용할{"\n"}아이디(이메일)를 입력해 주세요.</Text>
      </View>

      <View style={styles.inputSection}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>이메일(아이디)</Text>
          <TextInput
            style={globalStyles.input}
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
    return (
      <View style={[styles.container, { paddingBottom: 120 }]}>
        <View style={styles.headerSection}>
          <Text style={styles.title}>로그인에 사용할{"\n"}비밀번호를 입력해 주세요</Text>
        </View>

        <View style={styles.inputSection}>
          <PasswordInput
            mode={PasswordInputMode.INPUT}
            value={data.form.password}
            onChangeText={handlePasswordChange}
            placeholder="비밀번호 입력"
            showPassword={data.status.showPassword}
            onTogglePassword={() => updateStatus({ showPassword: !data.status.showPassword })}
            returnKeyType="next"
          />
          <PasswordValidation mode={PasswordInputMode.INPUT} password={data.form.password} />

          <PasswordInput
            mode={PasswordInputMode.CONFIRM}
            value={data.form.confirmPassword}
            onChangeText={handleConfirmPasswordChange}
            placeholder="비밀번호 확인"
            showPassword={data.status.showConfirmPassword}
            onTogglePassword={() => updateStatus({ showConfirmPassword: !data.status.showConfirmPassword })}
            returnKeyType="done"
          />
          <PasswordValidation mode={PasswordInputMode.CONFIRM} password={data.form.password} confirmPassword={data.form.confirmPassword} />
        </View>
      </View>
    );
  };

  const renderTosAgreementStep = () => (
    <View style={[styles.container, { paddingBottom: 120 }]}>
      <View style={styles.headerSection}>
        <Text style={styles.welcomeTitle}>환영합니다.</Text>
        <Text style={styles.welcomeSubtitle}>WD 멤버십 회원으로 초대합니다.</Text>
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

  const renderNameAndResidentNumberStep = () => {
    const { title, subtitle } = getTitleAndSubtitle();

    return (
      <View style={[styles.container, { paddingBottom: 120 }]}>
        <View style={styles.headerSection}>
          <LabelText style={styles.title}>{title}</LabelText>
          <SmallText style={styles.subtitle}>{subtitle}</SmallText>
        </View>

        <View style={styles.inputSection}>
          {/* 이름 입력 */}
          <View style={styles.inputContainer}>
            <LabelText style={styles.inputLabel}>이름</LabelText>
            <TextInput
              ref={nameInputRef}
              style={styles.input}
              placeholder="이름을 입력하세요"
              placeholderTextColor="#B1B8C0"
              value={data.form.name}
              onChangeText={(text) => {
                updateForm({ name: text });
                updateStatus({ isNameValid: text.trim().length >= 2 });
              }}
              onSubmitEditing={handleNameInputComplete}
              returnKeyType="next"
              autoCapitalize="none"
              autoCorrect={false}
              showSoftInputOnFocus={false}
            />
            <View style={styles.inputBorder} />
            {data.form.name && data.form.name.trim().length < 2 && <Text style={styles.errorMessage}>이름을 2자 이상 입력해주세요.</Text>}
          </View>

          {/* 주민등록번호 입력 - 조건부 렌더링 */}
          {data.status.showResidentNumberInput && (
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>주민등록번호</Text>
              <View style={styles.residentNumberContainer}>
                <TextInput
                  ref={residentNumberInputRef}
                  style={styles.residentNumberInput}
                  placeholder="000000"
                  placeholderTextColor="#B1B8C0"
                  value={data.form.residentNumber.includes("-") ? data.form.residentNumber.split("-")[0] : data.form.residentNumber.slice(0, 6)}
                  onChangeText={(text) => {
                    const cleaned = text.replace(/[^0-9]/g, "");
                    if (cleaned.length <= 6) {
                      const currentBackPart = data.form.residentNumber.includes("-") ? data.form.residentNumber.split("-")[1] || "" : "";

                      let newValue = cleaned;
                      if (currentBackPart || cleaned.length === 6) {
                        newValue = cleaned + "-" + currentBackPart;
                      }
                      updateForm({ residentNumber: newValue });

                      if (cleaned.length === 6) {
                        global.setTimeout(() => {
                          residentNumberBackInputRef.current?.focus();
                          scrollViewRef.current?.scrollTo({ y: 250, animated: true });
                        }, 50);
                      }
                    }
                  }}
                  keyboardType="number-pad"
                  maxLength={6}
                  autoCorrect={false}
                  autoCapitalize="none"
                  showSoftInputOnFocus={false}
                />
                <Text style={styles.hyphenText}>-</Text>
                <TextInput
                  ref={residentNumberBackInputRef}
                  style={styles.residentNumberBackInput}
                  placeholder="0"
                  placeholderTextColor="#B1B8C0"
                  value={
                    data.form.residentNumber.includes("-") && data.form.residentNumber.split("-")[1]
                      ? data.form.residentNumber.split("-")[1].slice(0, 1)
                      : ""
                  }
                  onChangeText={(text) => {
                    const cleaned = text.replace(/[^0-9]/g, "");
                    if (cleaned.length <= 1) {
                      const frontPart = data.form.residentNumber.includes("-")
                        ? data.form.residentNumber.split("-")[0]
                        : data.form.residentNumber.slice(0, 6);

                      const newValue = frontPart + "-" + cleaned + (cleaned.length === 1 ? "******" : "");
                      updateForm({ residentNumber: newValue });
                      updateStatus({
                        isResidentNumberValid: frontPart.length === 6 && cleaned.length === 1
                      });

                      if (cleaned.length === 1 && frontPart.length === 6) {
                        handleResidentNumberComplete(newValue);
                      }
                    }
                  }}
                  keyboardType="number-pad"
                  maxLength={1}
                  autoCorrect={false}
                  autoCapitalize="none"
                  showSoftInputOnFocus={false}
                />
                <Text style={styles.maskingText}>******</Text>
              </View>
              <View style={styles.inputBorder} />
              {data.form.residentNumber && !validateResidentNumber(data.form.residentNumber) && (
                <Text style={styles.errorMessage}>주민등록번호를 올바르게 입력해주세요.</Text>
              )}
            </View>
          )}

          {/* 통신사 선택 - 조건부 렌더링 */}
          {data.status.showCarrierInput && (
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>통신사</Text>
              <TouchableOpacity
                style={styles.carrierSelector}
                onPress={() => {
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
  };

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
      <ScrollView ref={scrollViewRef} style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {data.step === AuthInfoStep.verificationType && renderVerificationTypeStep()}
        {data.step === AuthInfoStep.nameAndResidentNumber && renderNameAndResidentNumberStep()}
        {data.step === AuthInfoStep.phoneVerification && renderPhoneVerificationStep()}
        {data.step === AuthInfoStep.verificationComplete && renderVerificationCompleteStep()}
        {data.step === AuthInfoStep.uwerAgreement && renderTosAgreementStep()}
        {data.step === AuthInfoStep.userAccountInput && renderUserAccountInputStep()}
        {data.step === AuthInfoStep.passwordInput && renderPasswordInputStep()}
      </ScrollView>
      {renderCarrierModal()}
      {renderTermsModal()}
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
    justifyContent: "flex-end",
    zIndex: 1000
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
    maxHeight: "100%"
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
  },
  termsContentText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#2B2B2B",
    lineHeight: 20,
    letterSpacing: -0.56,
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  // 주민등록번호 입력 관련 스타일
  residentNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12
  },
  residentNumberInput: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2B2B2B",
    textAlign: "left",
    minWidth: 100
  },
  hyphenText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2B2B2B",
    marginHorizontal: 8
  },
  residentNumberBackInput: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2B2B2B",
    textAlign: "center",
    width: 20
  },
  maskingText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#B1B8C0",
    marginLeft: 4
  },
  testButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D6DADF",
    backgroundColor: "#FFFFFF"
  },
  testButtonActive: {
    backgroundColor: "#B48327",
    borderColor: "#B48327"
  },
  testButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2B2B2B"
  }
});
