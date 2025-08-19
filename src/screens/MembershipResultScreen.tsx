import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Linking, Alert } from "react-native";
import { CommonLayout } from "../components/CommonLayout";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface MembershipResultProps {
  onBackPress?: () => void;
  onSuccess?: (result: any) => void;
  approveStatus: boolean;
}

interface MembershipResultData {
  approveStatus: boolean;
}

const initialData: MembershipResultData = {
  approveStatus: true
};

const message = {
  approved: {
    title: "멤버십 회원\n가입을 축하합니다!",
    subtitle: "회원님만을 위한 특별한 서비스와 혜택이\n지금부터 시작됩니다.",
    primaryButton: "로그인 하기",
    secondaryButton: null
  },
  unapproved: {
    title: "멤버십\n회원승인중입니다.",
    subtitle: "회원님의 멤버십 가입 신청이\n승인대기중입니다.\n현재 승인 절차가 진행 중이며,\n곧 결과를 안내드리겠습니다.",
    primaryButton: "멤버십 승인 문의하기",
    secondaryButton: "멤버십 혜택 둘러보기"
  }
};

export const MembershipResultScreen: React.FC<MembershipResultProps> = ({ onBackPress, onSuccess, approveStatus = true }) => {
  const [data, setData] = useState<MembershipResultData>(() => ({
    ...initialData,
    approveStatus
  }));

  const handleLoginPress = () => {
    // 로그인 페이지로 이동
    console.log("로그인 페이지로 이동");
    onSuccess?.({ action: "navigateToLogin" });
  };

  const handleMembershipInquiryPress = () => {
    // 전화걸기 기능
    const phoneNumber = "1588-1234"; // 실제 문의 전화번호로 변경
    Alert.alert("멤버십 승인 문의", `${phoneNumber}로 전화를 걸까요?`, [
      {
        text: "취소",
        style: "cancel"
      },
      {
        text: "전화걸기",
        onPress: () => {
          Linking.openURL(`tel:${phoneNumber}`);
        }
      }
    ]);
  };

  const handleMembershipBenefitsPress = () => {
    // 멤버십 혜택 둘러보기 페이지로 이동
    console.log("멤버십 혜택 둘러보기 페이지로 이동");
    onSuccess?.({ action: "navigateToBenefits" });
  };

  const getCurrentMessage = () => {
    return data.approveStatus ? message.approved : message.unapproved;
  };
  const currentMessage = getCurrentMessage();

  const renderResultContent = () => {
    return (
      <View style={styles.resultContainer}>
        {/* 배경 */}
        <Image source={require("../assets/signup/bg_membership.png")} style={styles.resultBackgroundImage} />

        {/* 멤버십 로고 */}
        <View style={styles.membershipLogoSection}>
          <View style={styles.membershipLogo}>
            <Image source={require("../assets/signup/logo_membership.png")} style={styles.membershipLogoImage} />
          </View>
        </View>

        {/* 메인 콘텐츠 */}
        <View style={styles.resultContent}>
          <Text style={styles.resultTitle}>{currentMessage.title}</Text>
          <Text style={styles.resultSubtitle}>{currentMessage.subtitle}</Text>
        </View>
      </View>
    );
  };

  const getButtons = () => {
    const currentMessage = getCurrentMessage();

    if (data.approveStatus) {
      // 승인된 경우 - 로그인 버튼만 (흰색 배경, 검은색 텍스트)
      return [
        {
          text: currentMessage.primaryButton,
          onPress: handleLoginPress,
          style: "custom" as const,
          customStyle: {
            backgroundColor: "#FFFFFF",
            textColor: "#2B2B2B"
          }
        }
      ];
    } else {
      // 미승인된 경우 - 두 개의 버튼
      return [
        {
          text: currentMessage.secondaryButton || "",
          onPress: handleMembershipBenefitsPress,
          style: "custom" as const,
          customStyle: {
            backgroundColor: "#B48327",
            borderColor: "#B48327",
            textColor: "#FFFFFF"
          }
        },
        {
          text: currentMessage.primaryButton,
          onPress: handleMembershipInquiryPress,
          style: "custom" as const,
          customStyle: {
            backgroundColor: "#FFFFFF",
            textColor: "#2B2B2B"
          }
        }
      ];
    }
  };

  return (
    <CommonLayout
      title="회원가입 완료"
      showBackButton={false}
      showTabBar={false}
      showTopIcons={false}
      onBackPress={onBackPress}
      onMenuPress={() => {}}
      onCouponPress={() => {}}
      onNotificationPress={() => {}}
      buttons={getButtons()}
      isWideLayout={true}
      showTitle={false}
    >
      <View style={styles.resultContainer}>
        <View style={styles.scrollView}>{renderResultContent()}</View>
      </View>
    </CommonLayout>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1
  },
  resultContainer: {
    flex: 1
  },
  resultBackgroundImage: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  membershipLogoSection: {
    alignItems: "flex-start",
    marginTop: 145,
    marginBottom: 20,
    paddingHorizontal: 20
  },
  membershipLogo: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column"
  },
  membershipLogoImage: {
    width: 335,
    height: 64,
    resizeMode: "contain"
  },
  membershipLogoText: {
    fontSize: 20,
    fontWeight: "400",
    color: "#FFFFFF",
    lineHeight: 26,
    letterSpacing: 0.6,
    marginBottom: 4
  },
  resultContent: {
    paddingHorizontal: 20,
    alignItems: "flex-start"
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
  }
});
