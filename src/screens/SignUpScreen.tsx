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
    showTermsModal: boolean;
    selectedTermsId: string | null;
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
    showCarrierModal: false,
    showTermsModal: false,
    selectedTermsId: null
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
본 약관은 WD 멤버십(이하 "회사")이 제공하는 서비스의 이용과 관련하여 회사와 회원과의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.

제2조 (정의)
1. "서비스"라 함은 회사가 제공하는 모든 서비스를 의미합니다.
2. "회원"이라 함은 회사의 서비스에 접속하여 본 약관에 따라 회사와 이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 고객을 말합니다.

제3조 (약관의 효력 및 변경)
1. 본 약관은 서비스를 이용하고자 하는 모든 회원에 대하여 그 효력을 발생합니다.
2. 회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을 변경할 수 있습니다.
3. 약관이 변경되는 경우, 회사는 변경사항을 시행일자 7일 전부터 공지사항을 통해 공지합니다.

제4조 (서비스의 제공)
1. 회사는 회원에게 아래와 같은 서비스를 제공합니다.
   - 멤버십 포인트 적립 및 사용
   - 특별 혜택 및 할인
   - 이벤트 참여 기회
   - 고객 지원 서비스

2. 서비스의 구체적인 내용은 회사의 정책에 따라 변경될 수 있습니다.

제5조 (회원의 의무)
1. 회원은 다음 행위를 하여서는 안 됩니다.
   - 서비스 이용 중 타인의 정보를 무단으로 수집, 저장, 공개하는 행위
   - 서비스를 통해 얻은 정보를 회사의 사전 승낙 없이 복제, 유통하는 행위
   - 회사의 서비스를 이용하여 얻은 정보를 회원의 개인적인 이용 외에 복사, 가공, 번역, 2차적 저작 등을 통하여 복제, 분배, 전시, 전송하는 행위
   - 기타 불법적이거나 회사에서 정한 규정을 위반하는 행위

2. 회원은 관계법령 및 이 약관의 규정, 이용안내 및 서비스상에 공지한 주의사항, 회사가 통지하는 사항 등을 준수하여야 합니다.

제6조 (회사의 의무)
1. 회사는 관련법령과 이 약관이 금지하거나 공서양속에 반하는 행위를 하지 않으며 이 약관이 정하는 바에 따라 지속적이고, 안정적으로 서비스를 제공하기 위하여 노력합니다.
2. 회사는 회원이 안전하게 인터넷 서비스를 이용할 수 있도록 회원의 개인정보(신용정보 포함) 보호를 위한 보안 시스템을 구축합니다.
3. 회사는 서비스 이용과 관련하여 회원으로부터 제기된 의견이나 불만이 정당하다고 객관적으로 인정될 경우에는 적절한 절차를 거쳐 즉시 처리하여야 합니다.

제7조 (서비스의 중단)
1. 회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.
2. 제1항에 의한 서비스 중단의 경우에는 회사는 제8조에 정한 방법으로 회원에게 통지합니다.

제8조 (회원에 대한 통지)
1. 회사가 회원에 대한 통지를 하는 경우, 회원이 회사와 미리 약정하여 지정한 전자우편 주소로 할 수 있습니다.
2. 회사는 불특정다수 회원에 대한 통지의 경우 1주일이상 회사 게시판에 게시함으로써 개별 통지에 갈음할 수 있습니다.

제9조 (회사의 면책)
1. 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.
2. 회사는 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.
3. 회사는 회원이 서비스를 이용하여 기대하는 수익을 상실한 것에 대하여 책임을 지지 않으며, 그 밖의 서비스를 통하여 얻은 자료로 인한 손해에 관하여 책임을 지지 않습니다.

제10조 (분쟁해결)
1. 회사는 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 피해보상처리기구를 설치·운영합니다.
2. 회사와 이용자 간에 발생한 전자상거래 분쟁에 관하여는 소비자분쟁조정위원회의 조정에 따를 수 있습니다.

제11조 (재판권 및 준거법)
1. 회사와 이용자 간에 발생한 분쟁에 관하여는 대한민국 법을 적용합니다.
2. 회사와 이용자 간에 제기된 소송에는 대한민국의 법원을 관할법원으로 합니다.`
        };
      case "privacy":
        return {
          title: "개인정보 수집 및 이용 동의",
          content: `개인정보 수집 및 이용 동의

1. 개인정보의 수집 및 이용 목적
회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.

가. 회원가입 및 관리
회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 서비스 부정이용 방지, 만14세 미만 아동 개인정보 수집 시 법정 대리인 동의여부 확인, 각종 고지·통지, 고충처리 목적으로 개인정보를 처리합니다.

나. 재화 또는 서비스 제공
물품배송, 서비스 제공, 계약서·청구서 발송, 콘텐츠 제공, 맞춤서비스 제공, 본인인증, 연령인증, 요금결제·정산, 채권추심 목적으로 개인정보를 처리합니다.

다. 고충처리
민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락·통지, 처리결과 통보 목적으로 개인정보를 처리합니다.

2. 개인정보의 처리 및 보유기간
① 회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.

② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
1) 회원가입 및 관리 : 서비스 이용계약 또는 회원가입 해지시까지
2) 재화 또는 서비스 제공 : 재화·서비스 공급완료 및 요금결제·정산 완료시까지
3) 고충처리 : 민원처리 완료시까지

3. 개인정보의 제3자 제공
① 회사는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.

② 회사는 다음과 같은 경우에 개인정보를 제3자에게 제공할 수 있습니다.
- 정보주체로부터 별도의 동의를 받은 경우
- 법령에 근거하여 정부기관으로부터 요구받은 경우
- 범죄의 수사와 같이 법령에서 정해진 절차에 따라 수사기관의 요구가 있는 경우

4. 개인정보처리의 위탁
① 회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.
- 위탁받는 자 (수탁자) : 배송업체
- 위탁하는 업무의 내용 : 상품배송
- 위탁기간 : 배송완료시까지

② 회사는 위탁계약 체결시 개인정보보호법 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적·관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리·감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.

③ 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보 처리방침을 통하여 공개하겠습니다.

5. 정보주체의 권리·의무 및 그 행사방법
이용자는 개인정보주체로서 다음과 같은 권리를 행사할 수 있습니다.

① 정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.
1) 개인정보 열람요구
2) 오류 등이 있을 경우 정정 요구
3) 삭제요구
4) 처리정지 요구

② 제1항에 따른 권리 행사는 회사에 대해 서면, 전화, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 회사는 이에 대해 지체 없이 조치하겠습니다.

③ 정보주체가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한 경우에는 정정 또는 삭제를 완료할 때까지 당해 개인정보를 이용하거나 제공하지 않습니다.

④ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 "개인정보 처리 방법에 관한 고시(제2020-7호)" 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.

6. 개인정보의 파기
회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다. 파기절차 및 방법은 다음과 같습니다.

① 파기절차
불필요한 개인정보 및 개인정보파일은 개인정보보호책임자의 승인을 받아 파기

② 파기방법
전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제

7. 개인정보의 안전성 확보 조치
회사는 개인정보보호법 제29조에 따라 다음과 같은 안전성 확보 조치를 취하고 있습니다.

① 개인정보의 암호화
이용자의 개인정보는 비밀번호는 암호화 되어 저장 및 관리되고 있어, 본인만이 알 수 있으며 중요한 데이터는 파일 및 전송 데이터를 암호화 하거나 파일 잠금 기능을 사용하는 등의 별도 보안기능을 사용하고 있습니다.

② 해킹 등에 대비한 기술적 대책
회사는 해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안프로그램을 설치하고 주기적인 갱신·점검을 하며 외부로부터 접근이 통제된 구역에 시스템을 설치하고 기술적/물리적으로 감시 및 차단하고 있습니다.

③ 개인정보에 대한 접근 제한
개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여, 변경, 말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한 조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다.

8. 개인정보 보호책임자
① 회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.

▶ 개인정보 보호책임자
성명 : 홍길동
직책 : 개인정보보호책임자
연락처 : 02-1234-5678, privacy@wdmembership.com

② 정보주체께서는 회사의 서비스(또는 사업)을 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다. 회사는 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.

9. 개인정보 처리방침 변경
이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.`
        };
      case "points":
        return {
          title: "WD 멤버스 포인트 이용약관",
          content: `WD 멤버스 포인트 이용약관

제1조 (목적)
본 약관은 WD 멤버십(이하 "회사")이 제공하는 WD 멤버스 포인트 서비스(이하 "포인트 서비스")의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.

제2조 (정의)
1. "포인트"라 함은 회사가 회원에게 제공하는 포인트 서비스를 이용할 수 있는 권리를 말합니다.
2. "적립"이라 함은 회원이 포인트 서비스 이용을 통해 포인트를 획득하는 것을 말합니다.
3. "사용"이라 함은 회원이 보유한 포인트를 포인트 서비스 내에서 상품 구매, 서비스 이용 등에 사용하는 것을 말합니다.
4. "소멸"이라 함은 포인트의 유효기간이 만료되어 포인트가 자동으로 삭제되는 것을 말합니다.

제3조 (포인트 적립)
1. 회원은 포인트 서비스 이용을 통해 포인트를 적립할 수 있습니다.
2. 포인트 적립 방법은 다음과 같습니다.
   - 상품 구매 시 적립
   - 이벤트 참여 시 적립
   - 리뷰 작성 시 적립
   - 기타 회사가 정한 방법에 의한 적립

3. 포인트 적립률 및 적립 조건은 회사의 정책에 따라 변경될 수 있으며, 변경 시 사전 공지합니다.

제4조 (포인트 사용)
1. 회원은 보유한 포인트를 포인트 서비스 내에서 사용할 수 있습니다.
2. 포인트 사용 방법은 다음과 같습니다.
   - 상품 구매 시 할인
   - 서비스 이용 시 할인
   - 기타 회사가 정한 방법에 의한 사용

3. 포인트 사용 시 최소 사용 단위는 회사의 정책에 따라 정해집니다.

제5조 (포인트 유효기간)
1. 포인트는 적립일로부터 2년간 유효합니다.
2. 유효기간이 만료된 포인트는 자동으로 소멸됩니다.
3. 회원 탈퇴 시 미사용 포인트는 소멸됩니다.

제6조 (포인트 환불)
1. 포인트로 구매한 상품의 환불 시, 사용된 포인트는 환불되지 않습니다.
2. 단, 회사의 귀책사유로 인한 환불의 경우에는 사용된 포인트를 환불합니다.

제7조 (포인트 양도 및 상속)
1. 포인트는 회원 본인만 사용할 수 있으며, 타인에게 양도할 수 없습니다.
2. 회원 사망 시 포인트는 상속되지 않습니다.

제8조 (포인트 서비스 중단)
1. 회사는 다음의 경우 포인트 서비스를 중단할 수 있습니다.
   - 시스템 점검, 보수, 교체가 필요한 경우
   - 천재지변, 전쟁, 폭동, 테러, 해킹, 컴퓨터 바이러스, 기타 불가항력적 사유로 인한 경우
   - 기타 회사가 정한 사유가 있는 경우

2. 포인트 서비스 중단 시 회사는 사전에 공지하며, 긴급한 경우 사후 공지할 수 있습니다.

제9조 (약관 변경)
1. 회사는 필요한 경우 본 약관을 변경할 수 있습니다.
2. 약관 변경 시 회사는 변경사항을 시행일자 7일 전부터 공지합니다.
3. 회원이 변경된 약관에 동의하지 않는 경우, 포인트 서비스 이용을 중단할 수 있습니다.

제10조 (준거법 및 관할법원)
1. 본 약관은 대한민국 법률에 따라 해석됩니다.
2. 본 약관과 관련된 분쟁이 발생할 경우, 회사의 본사 소재지를 관할하는 법원을 관할법원으로 합니다.`
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

  const renderTermsModal = () => {
    if (!data.status.showTermsModal || !data.status.selectedTermsId) return null;

    const termsContent = getTermsContent(data.status.selectedTermsId);

    return (
      <View style={styles.modalOverlay}>
        <TouchableOpacity style={styles.modalBackdrop} onPress={handleCloseTermsModal} />
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{termsContent.title}</Text>
            <TouchableOpacity onPress={handleCloseTermsModal}>
              <Ionicons name="close" size={24} color="#2B2B2B" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalContent}>
            <Text style={styles.termsContentText}>{termsContent.content}</Text>
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
            title: "인증이 완료되었습니다.\n멤버십 회원 가입을\n계속 진행해 주세요",
            subtitle: "10초 후 화면이 자동종료 됩니다."
          }}
          primaryButton={{
            text: "",
            onPress: () => {}
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
  },
  termsContentText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#2B2B2B",
    lineHeight: 20,
    letterSpacing: -0.56,
    paddingHorizontal: 20,
    paddingBottom: 20
  }
});
