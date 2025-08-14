import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
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
    title: "멤버쉽 회원\n가입을 축하합니다!",
    subtitle: "회원님만을 위한 특별한 서비스와 혜택이\n지금부터 시작됩니다.",
    primaryButton: "로그인 하기",
    secondaryButton: null
  },
  unapproved: {
    title: "멤버쉽\n회원승인중입니다.",
    subtitle: "회원님의 멤버십 가입 신청이\n승인대기중입니다.\n현재 승인 절차가 진행 중이며,\n곧 결과를 안내드리겠습니다.",
    primaryButton: "맴버쉽 승인 문의하기",
    secondaryButton: "멤버쉽 혜택 둘러보기"
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
    // 멤버십 승인 문의 페이지로 이동
    console.log("멤버십 승인 문의 페이지로 이동");
    onSuccess?.({ action: "navigateToInquiry" });
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
        {/* 배경 그라데이션 */}

        <Image source={require("../assets/signup/bg_membership.png")} style={styles.resultBackgroundImage} />

        {/* 멤버십 로고 */}
        <View style={styles.membershipLogoSection}>
          <View style={styles.membershipLogo}>
            <Image source={require("../assets/signup/logo_membership.png")} style={styles.membershipLogoImage} />
            <Text style={styles.membershipLogoText}>MEMBERSHIP</Text>
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
      return [
        {
          text: currentMessage.primaryButton,
          onPress: handleLoginPress
        }
      ];
    } else {
      return [
        {
          text: currentMessage.secondaryButton || "",
          onPress: handleMembershipBenefitsPress
        },
        {
          text: currentMessage.primaryButton,
          onPress: handleMembershipInquiryPress
        }
      ];
    }
  };

  return (
    // <CommonLayout
    //   title="회원가입 완료"
    //   showBackButton={false}
    //   showTabBar={false}
    //   showTopIcons={false}
    //   onBackPress={onBackPress}
    //   onMenuPress={() => {}}
    //   onCouponPress={() => {}}
    //   onNotificationPress={() => {}}
    //   buttons={getButtons()}
    //   isWideLayout={true}
    // >
    //   <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
    //     {renderResultContent()}
    //   </ScrollView>
    // </CommonLayout>

    <View style={styles.resultContainer}>
      <Image source={require("../assets/signup/bg_membership.png")} style={styles.resultBackgroundImage} />
      <View style={styles.scrollView}>{renderResultContent()}</View>
      {/* 버튼들 */}
      <View style={styles.resultButtonSection}>
        {data.approveStatus ? (
          // 승인된 경우 - 로그인 버튼만
          <TouchableOpacity style={styles.resultButton} onPress={handleLoginPress}>
            <Text style={styles.resultButtonText}>{currentMessage.primaryButton}</Text>
          </TouchableOpacity>
        ) : (
          // 미승인된 경우 - 두 개의 버튼
          <>
            <TouchableOpacity style={styles.resultButtonSecondary} onPress={handleMembershipBenefitsPress}>
              <Text style={styles.resultButtonTextSecondary}>{currentMessage.secondaryButton}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.resultButton} onPress={handleMembershipInquiryPress}>
              <Text style={styles.resultButtonText}>{currentMessage.primaryButton}</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1
  },
  resultContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    minHeight: 812
  },
  resultBackgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%"
  },
  membershipLogoSection: {
    alignItems: "center",
    marginTop: 145,
    marginBottom: 20
  },
  membershipLogo: {
    width: 98.27,
    height: 34.47,
    justifyContent: "center",
    alignItems: "center"
  },
  membershipLogoImage: {
    width: 98.27,
    height: 34.47
  },
  membershipLogoText: {
    fontSize: 20,
    fontWeight: "400",
    color: "#FFFFFF",
    lineHeight: 26,
    letterSpacing: 0.6
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
  },
  resultButtonSection: {
    position: "absolute",
    bottom: 70,
    left: 24,
    right: 24,
    gap: 12
  },
  resultButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 48,
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  resultButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2B2B2B",
    lineHeight: 18,
    letterSpacing: -0.64
  },
  resultButtonSecondary: {
    backgroundColor: "#B48327",
    borderRadius: 48,
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  resultButtonTextSecondary: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    lineHeight: 18,
    letterSpacing: -0.64
  }
});
