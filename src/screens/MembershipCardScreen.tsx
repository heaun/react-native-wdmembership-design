import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, StatusBar, Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

interface MembershipCardScreenProps {
  onBack?: () => void;
  onMenuPress?: () => void;
  onNotificationPress?: () => void;
  onCouponPress?: () => void;
  onMembershipBenefitsPress?: () => void;
  onMembershipCheckPress?: () => void;
  onAuthInfoPress?: () => void;
}

export const MembershipCardScreen: React.FC<MembershipCardScreenProps> = ({
  onBack,
  onMenuPress,
  onNotificationPress,
  onCouponPress,
  onMembershipBenefitsPress,
  onMembershipCheckPress,
  onAuthInfoPress
}) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Status Bar */}
      <View style={styles.statusBar}>
        <Text style={styles.statusBarTime}>9:41</Text>
        <View style={styles.statusBarIcons}>
          <View style={styles.signalIcon} />
          <View style={styles.wifiIcon} />
          <View style={styles.batteryIcon} />
        </View>
      </View>

      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.menuButton} onPress={onMenuPress}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>멤버쉽 카드</Text>
        <View style={styles.topBarRight}>
          <TouchableOpacity style={styles.notificationButton} onPress={onNotificationPress}>
            <Text style={styles.notificationIcon}>🔔</Text>
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.couponButton} onPress={onCouponPress}>
            <Text style={styles.couponIcon}>🎫</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Membership Card */}
        <View style={styles.membershipCardContainer}>
          <View style={styles.membershipCard}>
            <Image source={require("../assets/membership-card-bg.png")} style={styles.cardBackground} resizeMode="cover" />

            {/* Card Content */}
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <View style={styles.cardLogo}>
                  <Image source={require("../assets/membership-card-image.png")} style={styles.logoImage} resizeMode="contain" />
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>PH1603 레지던스 전용</Text>
                  <Text style={styles.cardSubtitle}>PH1603 RESIDENCE</Text>
                </View>
              </View>

              <View style={styles.cardDetails}>
                <View style={styles.cardDetailRow}>
                  <Text style={styles.cardDetailLabel}>멤버쉽 번호</Text>
                  <Text style={styles.cardDetailValue}>9869 4586 2335 3698</Text>
                </View>
                <View style={styles.cardDetailRow}>
                  <Text style={styles.cardDetailLabel}>가입기간</Text>
                  <Text style={styles.cardDetailValue}>2030년 10월 25일 까지</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={onMembershipCheckPress}>
            <Text style={styles.actionButtonText}>멤버쉽 확인</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.actionButton} onPress={onMembershipBenefitsPress}>
            <Text style={styles.actionButtonText}>멤버쉽 혜택 보기</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.actionButton} onPress={onAuthInfoPress}>
            <Text style={styles.actionButtonText}>인증정보 등록 / 변경</Text>
          </TouchableOpacity>
        </View>

        {/* Coupon Section */}
        <View style={styles.couponSection}>
          <View style={styles.couponHeader}>
            <Text style={styles.couponTitle}>쿠폰</Text>
            <Text style={styles.couponCount}>13</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  statusBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 16,
    height: 44
  },
  statusBarTime: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2B2B2B"
  },
  statusBarIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5
  },
  signalIcon: {
    width: 18,
    height: 10,
    backgroundColor: "#2B2B2B"
  },
  wifiIcon: {
    width: 15,
    height: 11,
    backgroundColor: "#2B2B2B"
  },
  batteryIcon: {
    width: 27,
    height: 13,
    backgroundColor: "#2B2B2B",
    borderRadius: 2
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    height: 48
  },
  menuButton: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center"
  },
  menuIcon: {
    fontSize: 18,
    color: "#2B2B2B"
  },
  topBarTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2B2B2B"
  },
  topBarRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  notificationButton: {
    position: "relative",
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center"
  },
  notificationIcon: {
    fontSize: 18,
    color: "#2B2B2B"
  },
  notificationBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 6,
    height: 6,
    backgroundColor: "#ECA31D",
    borderRadius: 3
  },
  couponButton: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center"
  },
  couponIcon: {
    fontSize: 18,
    color: "#2B2B2B"
  },
  scrollView: {
    flex: 1
  },
  membershipCardContainer: {
    paddingHorizontal: 20,
    marginBottom: 20
  },
  membershipCard: {
    width: "100%",
    height: 210,
    backgroundColor: "#4D4132",
    borderRadius: 32,
    overflow: "hidden",
    position: "relative"
  },
  cardBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
  },
  cardContent: {
    flex: 1,
    padding: 24,
    justifyContent: "space-between"
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15
  },
  cardLogo: {
    width: 128,
    height: 75,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8
  },
  logoImage: {
    width: "100%",
    height: "100%"
  },
  cardInfo: {
    flex: 1
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: "400",
    color: "#FFFFFF",
    marginBottom: 5
  },
  cardSubtitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#FFFFFF"
  },
  cardDetails: {
    gap: 15
  },
  cardDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  cardDetailLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#B1B8C0"
  },
  cardDetailValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "right"
  },
  actionButtons: {
    paddingHorizontal: 20,
    marginBottom: 20
  },
  actionButton: {
    height: 50,
    justifyContent: "center",
    paddingHorizontal: 20
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2B2B2B"
  },
  divider: {
    height: 1,
    backgroundColor: "#D6DADF",
    marginVertical: 0
  },
  couponSection: {
    paddingHorizontal: 20,
    marginBottom: 20
  },
  couponHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    paddingHorizontal: 20
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
  }
});
