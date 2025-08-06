import React from "react";
import { StyleSheet, Text, View, ScrollView, Image, Dimensions } from "react-native";
import { CommonLayout } from "../components/CommonLayout";

const { width: screenWidth } = Dimensions.get("window");

interface MembershipVerificationScreenProps {
  onBackPress?: () => void;
  currentTab?: string;
  onTabPress?: (tabName: string) => void;
  onSideMenuItemPress?: (itemId: string) => void;
}

export const MembershipVerificationScreen: React.FC<MembershipVerificationScreenProps> = ({
  onBackPress,
  currentTab,
  onTabPress,
  onSideMenuItemPress
}) => {
  return (
    <CommonLayout
      title="멤버쉽 확인"
      showBackButton={true}
      showTabBar={false}
      onBackPress={onBackPress}
      onMenuPress={() => console.log("메뉴 버튼 클릭")}
      onCouponPress={() => console.log("쿠폰 버튼 클릭")}
      onNotificationPress={() => console.log("알림 버튼 클릭")}
      currentTab={currentTab}
      onTabPress={onTabPress}
      onSideMenuItemPress={onSideMenuItemPress}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* QR Code Section */}
        <View style={styles.qrCodeSection}>
          <View style={styles.qrCodeContainer}>
            <Image source={require("../assets/membership/qr-code.png")} style={styles.qrCode} resizeMode="cover" />
          </View>
        </View>

        {/* Membership Number Section */}
        <View style={styles.membershipNumberSection}>
          <Text style={styles.membershipNumber}>9869 4586 2335 3698</Text>
        </View>
      </ScrollView>
    </CommonLayout>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1
  },
  qrCodeSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 100
  },
  qrCodeContainer: {
    width: 248,
    height: 248,
    justifyContent: "center",
    alignItems: "center"
  },
  qrCode: {
    width: "100%",
    height: "100%",
    borderRadius: 8
  },
  membershipNumberSection: {
    alignItems: "center",
    paddingVertical: 40
  },
  membershipNumber: {
    fontSize: 16,
    fontWeight: "700",
    color: "#79818B",
    textAlign: "center"
  }
});
