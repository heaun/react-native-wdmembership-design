import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Dimensions } from "react-native";
import { CommonLayout } from "../components/CommonLayout";

const { width: screenWidth } = Dimensions.get("window");

interface MembershipCardScreenProps {
  onBack?: () => void;
  onMenuPress?: () => void;
  onNotificationPress?: () => void;
  onCouponPress?: () => void;
  onMembershipBenefitsPress?: () => void;
  onMembershipCheckPress?: () => void;
  onAuthInfoPress?: () => void;
  onMembershipVerificationPress?: () => void;
  onMembershipGuidePress?: () => void;
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
  onMembershipGuidePress,
  currentTab,
  onTabPress,
  onSideMenuItemPress
}) => {
  return (
    <CommonLayout
      title="멤버쉽 카드"
      showBackButton={false}
      onMenuPress={() => console.log("메뉴 버튼 클릭")}
      onCouponPress={() => console.log("쿠폰 버튼 클릭")}
      onNotificationPress={() => console.log("알림 버튼 클릭")}
      currentTab={currentTab}
      onTabPress={onTabPress}
      onSideMenuItemPress={onSideMenuItemPress}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Membership Card */}

        <View style={styles.membershipCardContainer}>
          <View style={styles.membershipCard}>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>PH1603 레지던스 전용</Text>
              <Text style={styles.cardSubtitle}>PH1603 RESIDENCE</Text>
            </View>

            <View style={styles.cardContent}>
              {/* Left Side - Membership Card Image */}
              <View style={styles.cardImageContainer}>
                <Image source={require("../assets/membership-card-bg.png")} style={styles.cardImage} />
              </View>

              {/* Right Side - Membership Details */}
              <View style={styles.membershipDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>멤버쉽 번호</Text>
                  <Text style={styles.detailValue}>9869 4586 2335 3698</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>가입기간</Text>
                  <Text style={styles.detailValue}>2030년 10월 25일 까지</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Membership Verification Section */}
        <TouchableOpacity style={styles.verificationSection} onPress={onMembershipVerificationPress}>
          <View style={styles.verificationHeader}>
            <Text style={styles.verificationTitle}>멤버쉽 확인</Text>
            <View style={styles.qrCodeContainer}>
              <Image source={require("../assets/membership/qr-code.png")} style={styles.qrCode} />
            </View>
          </View>
        </TouchableOpacity>

        {/* Coupon Section */}
        <View style={styles.couponSection}>
          <View style={styles.divider} />
          <View style={styles.couponHeader}>
            <Text style={styles.couponTitle}>쿠폰</Text>
            <Text style={styles.couponCount}>13</Text>
          </View>
        </View>

        {/* Action Links */}
        <View style={styles.actionLinks}>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.actionLink} onPress={onMembershipGuidePress}>
            <Text style={styles.actionLinkText}>멤버쉽 혜택 보기</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.actionLink} onPress={onAuthInfoPress}>
            <Text style={styles.actionLinkText}>인증정보 등록 / 변경</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </CommonLayout>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1
  },
  membershipCardContainer: {
    marginBottom: 20
  },
  membershipCard: {
    padding: 20,

    width: "100%",
    height: 210,
    backgroundColor: "#4D4132",
    overflow: "hidden",
    position: "relative"
  },
  cardContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 24,
    gap: 30
  },
  cardInfo: {},
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
    color: "#FFFFFF"
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF"
  },
  verificationSection: {
    marginBottom: 20
  },
  verificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",

    alignItems: "center",
    height: 80
  },
  verificationTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2B2B2B"
  },
  qrCodeContainer: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center"
  },
  qrCode: {
    width: 60,
    height: 60,
    borderRadius: 8
  },
  couponSection: {
    marginBottom: 20
  },
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
  actionLinks: {
    marginBottom: 20
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
  }
});
