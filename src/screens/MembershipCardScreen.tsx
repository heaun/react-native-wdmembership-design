import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Dimensions } from "react-native";
import { CommonLayout } from "../components/CommonLayout";
import { CommonModal } from "../components/CommonModal";
import { LabelText, ButtonText, SmallText, ExtraBoldText } from "../components/CommonText";
const { width: screenWidth } = Dimensions.get("window");
import { MembershipCard } from "../types/membership";

interface MembershipCardScreenProps {
  onBack?: () => void;
  onMenuPress?: () => void;
  onNotificationPress?: () => void;
  onCouponPress?: () => void;
  onMembershipBenefitsPress?: () => void;
  onMembershipCheckPress?: () => void;
  onAuthInfoPress?: () => void;
  onMembershipVerificationPress?: () => void;
  onUserMembershipInfoPress?: (membershipId: string) => void;
  onMembershipInfoPress?: () => void;
  currentTab?: string;
  onTabPress?: (tabName: string) => void;
  onSideMenuItemPress?: (itemId: string) => void;
}

export const MembershipCardScreen: React.FC<MembershipCardScreenProps> = ({
  onBack,
  onMenuPress,
  onNotificationPress,
  onCouponPress,
  onMembershipBenefitsPress,
  onMembershipCheckPress,
  onAuthInfoPress,
  onMembershipVerificationPress,
  onUserMembershipInfoPress,
  onMembershipInfoPress,
  currentTab,
  onTabPress,
  onSideMenuItemPress
}) => {
  const [showQrModal, setShowQrModal] = useState(false);

  const handleQrCodePress = () => {
    setShowQrModal(true);
  };

  const handleCloseQrModal = () => {
    setShowQrModal(false);
  };

  // 멤버십 카드 데이터
  const membershipCardData: MembershipCard = {
    id: "ph1603",
    title: "PH1603 RESIDENCE",
    subtitle: "PH1603 레지던스 전용",
    membershipNumber: "9869 4586 2335 3698",
    expiryDate: "2030년 10월 25일 까지",
    cardImage: require("@/assets/membership/card-bg.png"),
    backgroundColor: "#4D4132",
    qrCodeImage: require("@/assets/membership/qr-code.png"),
    couponCount: 13,
    infoSections: [
      {
        id: "verification",
        title: "멤버십 확인",
        type: "verification",
        image: require("@/assets/membership/qr-code.png"),
        onPress: handleQrCodePress
      },
      {
        id: "coupon",
        title: "쿠폰",
        type: "coupon",
        value: 13
      },
      {
        id: "benefits",
        title: "멤버십 혜택 보기",
        type: "action",
        onPress: () => onUserMembershipInfoPress?.(membershipCardData.id)
      },
      {
        id: "auth",
        title: "인증정보 등록 / 변경",
        type: "action",
        onPress: onAuthInfoPress
      }
    ]
  };

  return (
    <CommonLayout
      title="멤버십 카드"
      showBackButton={false}
      onMenuPress={() => console.log("메뉴 버튼 클릭")}
      onCouponPress={() => console.log("쿠폰 버튼 클릭")}
      onNotificationPress={() => console.log("알림 버튼 클릭")}
      currentTab={currentTab}
      onTabPress={onTabPress}
      onSideMenuItemPress={onSideMenuItemPress}
      isWideLayout={true}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Membership Card */}
        <View style={styles.membershipCardContainer}>
          <View style={[styles.membershipCard, { backgroundColor: membershipCardData.backgroundColor }]}>
            <View style={styles.cardInfo}>
              <ExtraBoldText style={styles.cardTitle}>{membershipCardData.title}</ExtraBoldText>
              <LabelText style={styles.cardSubtitle}>{membershipCardData.subtitle}</LabelText>
            </View>

            <View style={styles.cardContent}>
              {/* Left Side - Membership Card Image */}
              <View style={styles.cardImageContainer}>
                <Image source={membershipCardData.cardImage} style={styles.cardImage} />
              </View>

              {/* Right Side - Membership Details */}
              <View style={styles.membershipDetails}>
                <View style={styles.detailRow}>
                  <LabelText style={styles.detailLabel}>멤버십 번호</LabelText>
                  <LabelText style={styles.detailValue}>{membershipCardData.membershipNumber}</LabelText>
                </View>
                <View style={styles.detailRow}>
                  <LabelText style={styles.detailLabel}>가입기간</LabelText>
                  <LabelText style={styles.detailValue}>{membershipCardData.expiryDate}</LabelText>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.membershipInfoContainer}>
          {membershipCardData.infoSections.map((section, index) => (
            <React.Fragment key={section.id}>
              {section.type === "verification" && (
                <TouchableOpacity style={styles.listSection} onPress={section.onPress}>
                  <View style={styles.verificationHeader}>
                    <LabelText style={styles.verificationTitle}>{section.title}</LabelText>
                    <View style={styles.qrCodeContainer}>
                      <Image source={section.image} style={styles.qrCode} />
                    </View>
                  </View>
                </TouchableOpacity>
              )}

              {section.type === "coupon" && (
                <View style={styles.listSection}>
                  <View style={styles.divider} />
                  <View style={styles.couponHeader}>
                    <LabelText style={styles.couponTitle}>{section.title}</LabelText>
                    <LabelText style={styles.couponCount}>{section.value}</LabelText>
                  </View>
                </View>
              )}

              {section.type === "action" && (
                <View style={styles.listSection}>
                  <View style={styles.divider} />
                  <TouchableOpacity style={styles.actionLink} onPress={section.onPress}>
                    <LabelText style={styles.actionLinkText}>{section.title}</LabelText>
                  </TouchableOpacity>
                </View>
              )}
            </React.Fragment>
          ))}
        </View>
      </ScrollView>

      {/* QR Code Modal */}
      <CommonModal visible={showQrModal} title="멤버십 확인" onClose={handleCloseQrModal}>
        <View style={styles.qrModalContent}>
          <TouchableOpacity onPress={handleCloseQrModal}>
            <Image source={membershipCardData.qrCodeImage} style={styles.qrModalImage} />
          </TouchableOpacity>
          <LabelText style={styles.qrModalText}>{membershipCardData.membershipNumber}</LabelText>
        </View>
      </CommonModal>
    </CommonLayout>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  membershipCardContainer: {
    marginBottom: 20
  },
  membershipInfoContainer: {
    paddingHorizontal: 20
  },

  membershipCard: {
    padding: 20
  },
  cardContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    gap: 15
  },
  cardInfo: {
    gap: 10
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#FFFFFF"
  },
  cardSubtitle: {
    fontSize: 13,
    fontWeight: "400",
    color: "#FFFFFF"
  },
  cardImageContainer: {
    minWidth: 128,
    minHeight: 75,
    borderRadius: 10,
    overflow: "hidden"
  },
  cardImage: {
    width: 128,
    height: 75
  },
  membershipDetails: {
    flex: 1,
    gap: 20
  },
  detailRow: {
    gap: 8
  },
  detailLabel: {
    fontSize: 13,
    fontWeight: "400",
    color: "#B1B8C0"
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF"
  },
  listSection: {},
  verificationHeader: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  verificationTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2B2B2B"
  },
  qrCodeContainer: {
    alignItems: "flex-end"
  },
  qrCode: {
    width: 120,
    height: 120,
    borderRadius: 8
  },
  couponSection: {},
  couponHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50
  },
  couponTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2B2B2B"
  },
  couponCount: {
    fontSize: 14,
    fontWeight: "900",
    color: "#B48327"
  },

  actionLink: {
    height: 50,
    justifyContent: "center"
  },
  actionLinkText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2B2B2B"
  },
  divider: {
    height: 1,
    backgroundColor: "#D6DADF",
    marginVertical: 0
  },
  qrModalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 0
  },
  qrModalImage: {
    width: 248,
    height: 248,
    marginBottom: 90
  },
  qrModalText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#79818B",
    fontFamily: "NanumSquare Neo",
    letterSpacing: -0.64,
    textAlign: "center"
  }
});
