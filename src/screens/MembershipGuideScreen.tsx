import React from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions } from "react-native";
import { CommonLayout } from "../components/CommonLayout";

const { width: screenWidth } = Dimensions.get("window");

interface MembershipGuideScreenProps {
  onBackPress?: () => void;
  currentTab?: string;
  onTabPress?: (tabName: string) => void;
  onSideMenuItemPress?: (itemId: string) => void;
}

export const MembershipGuideScreen: React.FC<MembershipGuideScreenProps> = ({ onBackPress, currentTab, onTabPress, onSideMenuItemPress }) => {
  return (
    <CommonLayout
      title="멤버쉽 안내"
      showBackButton={true}
      showTabBar={false}
      onBackPress={onBackPress}
      onMenuPress={() => console.log("메뉴 버튼 클릭")}
      onCouponPress={() => console.log("쿠폰 버튼 클릭")}
      onNotificationPress={() => console.log("알림 버튼 클릭")}
      currentTab={currentTab}
      onTabPress={onTabPress}
      isWideLayout={true}
      onSideMenuItemPress={onSideMenuItemPress}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.membershipTitle}>PH1603 레지던스</Text>

          {/* Membership Card */}
          <View style={styles.membershipCard}>
            <Image source={require("../assets/membership-card-bg.png")} style={styles.cardImage} />
          </View>

          {/* Fee Information */}
          <View style={styles.feeSection}>
            <Text style={styles.feeLabel}>가입비 / 연회비</Text>
            <Text style={styles.feeValue}>별도 협의</Text>
            <Text style={styles.feeDescription}>
              회원님별 맞춤 혜택과 서비스 범위에 따라{"\n"}
              가입비 및 연회비가 달라지므로 별도 협의가 필요합니다.
            </Text>
          </View>
        </View>

        {/* Benefits Section */}
        <View style={styles.benefitsSection}>
          <Text style={styles.sectionTitle}>멤버쉽 혜택안내</Text>
          <View style={styles.divider} />

          <Text style={styles.benefitText}>
            호텔형 피트니스 무료 이용{"\n"}
            사우나, 자쿠지 무료이용{"\n"}
            피트니스 PT 무료이용권 5회 제공{"\n"}
            탈모관리 및 해드 스파 20% 할인{"\n"}
            스톤케어 및 등관리 20% 할인{"\n"}
            골프연습타석, 스크린골프장 이용 20% 할인
          </Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>건강증진 프로그램</Text>

          <Text style={styles.benefitText}>
            24시간 응급 내과 진료, 응급 이송 서비스 제공{"\n"}
            마인드앤바디 케어 프로그램 15% 할인{"\n"}
            제휴 피부과 시술 및 레이저 치료 10% 할인{"\n"}
            항노화, 호르몬 관리 프로그램 10% 할인{"\n"}
            원격의료 서비스 제공{"\n"}
            병원 예약 및 간호사와 함께 하는{"\n"}
            고급 차량 의전 서비스 10% 할인
          </Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>메디케어 프로그램</Text>

          <Text style={styles.benefitText}>
            카페 & 베이커리 20% 할인{"\n"}
            케어 푸드 식당 20% 할인
          </Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>케어 푸드 프로그램</Text>

          <Text style={styles.benefitText}>
            멤버스 프리미엄 라운지 무료 이용 5회,{"\n"}
            추가 이용시 50% 할인{"\n"}
            하이앤드 그룹 미팅룸 무료 이용 2회,{"\n"}
            추가 이용시 30% 할인{"\n"}
            PGA, LPGA 선수와 함께하는 원포인트 레슨{"\n"}
            이용권 3회 제공
          </Text>
        </View>
      </ScrollView>
    </CommonLayout>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1
  },
  headerSection: {
    backgroundColor: "#605B51",
    paddingVertical: 40,
    alignItems: "center"
  },
  membershipTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#FFFFFF",
    marginBottom: 20
  },
  membershipCard: {
    width: 280,
    height: 160,
    backgroundColor: "#4D4132",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8
  },
  cardImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12
  },
  vipText: {
    position: "absolute",
    top: 22,
    fontSize: 14,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.5)",
    letterSpacing: 0.84
  },
  cardTitle: {
    position: "absolute",
    fontSize: 20,
    fontWeight: "900",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 30,
    letterSpacing: 2
  },
  feeSection: {
    alignItems: "center",
    paddingHorizontal: 20
  },
  feeLabel: {
    fontSize: 16,
    fontWeight: "350",
    color: "#FFFFFF",
    marginBottom: 10
  },
  feeValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 15,
    letterSpacing: 0.8
  },
  feeDescription: {
    fontSize: 14,
    fontWeight: "350",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 22
  },
  benefitsSection: {
    paddingVertical: 30,
    paddingHorizontal: 20
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#000000",
    marginBottom: 15,
    letterSpacing: -0.64
  },
  benefitText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#505866",
    lineHeight: 28,
    marginBottom: 20,
    letterSpacing: -0.64
  },
  divider: {
    height: 1,
    backgroundColor: "#D6DADF",
    marginVertical: 20
  },
  contactSection: {
    paddingHorizontal: 24,
    paddingVertical: 30
  },
  contactButton: {
    backgroundColor: "#2B2B2B",
    borderRadius: 48,
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.64
  }
});
