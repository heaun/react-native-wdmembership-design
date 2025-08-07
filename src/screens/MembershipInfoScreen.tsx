import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CommonLayout } from "../components/CommonLayout";

interface MembershipInfoScreenProps {
  onBackPress?: () => void;
  onMenuPress?: () => void;
  onCouponPress?: () => void;
  onNotificationPress?: () => void;
}

export const MembershipInfoScreen: React.FC<MembershipInfoScreenProps> = ({ onBackPress, onMenuPress, onCouponPress, onNotificationPress }) => {
  const handleMembershipBenefitsPress = () => {
    // 멤버십 혜택 안내 화면으로 이동
    console.log("멤버십 혜택 안내");
  };

  const handleUsageHistoryPress = () => {
    // 사용 이력 보기 화면으로 이동
    console.log("사용 이력 보기");
  };

  const handlePaymentPress = () => {
    // 연회비 납부하기 화면으로 이동
    console.log("연회비 납부하기");
  };

  const handleMoreTicketsPress = () => {
    // 멤버십 이용권 더보기
    console.log("멤버십 이용권 더보기");
  };

  const handleMoreBenefitsPress = () => {
    // 혜택 더보기
    console.log("혜택 더보기");
  };

  return (
    <CommonLayout
      title="멤버십 정보 조회"
      showBackButton={true}
      showTabBar={true}
      onBackPress={onBackPress}
      onMenuPress={onMenuPress}
      onCouponPress={onCouponPress}
      onNotificationPress={onNotificationPress}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* 멤버십 정보 섹션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>멤버십 정보</Text>

          <View style={styles.membershipCard}>
            <Text style={styles.memberName}>박기용 님은</Text>
            <Text style={styles.memberAddress}>PH 1603 레지던스</Text>
            <Text style={styles.memberStatus}>멤버십 회원입니다.</Text>

            <View style={styles.membershipDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>멤버십 회원 번호</Text>
                <Text style={styles.detailValue}>9869 4586 2335 3698</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>멤버십 기간</Text>
                <Text style={styles.detailValue}>2026.03.01 ~ 2030.02.29</Text>
              </View>
            </View>

            <View style={styles.progressBar}>
              {Array.from({ length: 79 }, (_, i) => (
                <View key={i} style={styles.progressDot} />
              ))}
            </View>
          </View>
        </View>

        {/* 연회비 납부 안내 */}
        <View style={styles.paymentNotice}>
          <Text style={styles.paymentTitle}>연회비 납부안내</Text>
          <View style={styles.paymentDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>납부 기한</Text>
              <Text style={styles.detailValue}>2027.10.01 ~ 2027.10.31</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>문의전화</Text>
              <Text style={styles.detailValue}>070-457-8965</Text>
            </View>
          </View>
          <Text style={styles.paymentDescription}>
            멤버십 서비스 연회비 납부 안내드립니다.{"\n"}
            납부금액 및 기타 문의사항은 070-457-8965 로{"\n"}
            연락주시면 친철히 안내해 드리겠습니다.
          </Text>
          <TouchableOpacity style={styles.paymentButton} onPress={handlePaymentPress}>
            <Text style={styles.paymentButtonText}>연회비 납부하기</Text>
          </TouchableOpacity>
        </View>

        {/* 멤버십 이용권 섹션 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>멤버십 이용권</Text>
            <TouchableOpacity style={styles.moreButton} onPress={handleMoreTicketsPress}>
              <Text style={styles.moreButtonText}>멤버십 이용권 더보기</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.ticketContainer}>
            <Text style={styles.availableTickets}>
              사용가능 이용권 <Text style={styles.ticketCount}>4</Text>
            </Text>

            {/* 이용권 카드들 */}
            <View style={styles.ticketCard}>
              <Image source={require("../assets/membership/healthy-meal-plan-icon.png")} style={styles.ticketIcon} resizeMode="cover" />
              <View style={styles.ticketInfo}>
                <Text style={styles.ticketTitle}>전 메뉴 30% 할인 이용권</Text>
                <Text style={styles.ticketProvider}>Healthy Meal Plan</Text>
                <View style={styles.ticketDetails}>
                  <Text style={styles.ticketDetailLabel}>유효기간</Text>
                  <Text style={styles.ticketDetailValue}>2027.10.01 ~ 2027.10.31</Text>
                </View>
                <View style={styles.ticketDetails}>
                  <Text style={styles.ticketDetailLabel}>사용가능지역</Text>
                  <Text style={styles.ticketDetailValue}>전국 맵버쉽 가맹점 모두</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#505866" />
            </View>

            <View style={styles.ticketCard}>
              <Image source={require("../assets/membership/coffee-icon.png")} style={styles.ticketIcon} resizeMode="cover" />
              <View style={styles.ticketInfo}>
                <Text style={styles.ticketTitle}>무료 아이스 아메리카노 1잔 증정</Text>
                <Text style={styles.ticketProvider}>The Coffee M&N</Text>
                <View style={styles.ticketDetails}>
                  <Text style={styles.ticketDetailLabel}>유효기간</Text>
                  <Text style={styles.ticketDetailValue}>2027.10.01 ~ 2027.10.31</Text>
                </View>
                <View style={styles.ticketDetails}>
                  <Text style={styles.ticketDetailLabel}>사용가능지역</Text>
                  <Text style={styles.ticketDetailValue}>서초 / 신촌 /경기 성남 한정</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#505866" />
            </View>

            <View style={styles.ticketCard}>
              <Image source={require("../assets/membership/mind-body-icon.png")} style={styles.ticketIcon} resizeMode="cover" />
              <View style={styles.ticketInfo}>
                <Text style={styles.ticketTitle}>체형/체력 성장 정밀 검사 이용권</Text>
                <Text style={styles.ticketProvider}>마인드앤바디 포 차일드</Text>
                <View style={styles.ticketDetails}>
                  <Text style={styles.ticketDetailLabel}>유효기간</Text>
                  <Text style={styles.ticketDetailValue}>2027.10.01 ~ 2027.10.31</Text>
                </View>
                <View style={styles.ticketDetails}>
                  <Text style={styles.ticketDetailLabel}>사용가능지역</Text>
                  <Text style={styles.ticketDetailValue}>전국 멤버쉽 가맹점 모두</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#505866" />
            </View>

            <View style={styles.ticketCard}>
              <Image source={require("../assets/membership/gcc-golf-icon.png")} style={styles.ticketIcon} resizeMode="cover" />
              <View style={styles.ticketInfo}>
                <Text style={styles.ticketTitle}>골프 프로 무료 레슨 이용권</Text>
                <Text style={styles.ticketProvider}>GCC 스크린골프 연습장</Text>
                <View style={styles.ticketDetails}>
                  <Text style={styles.ticketDetailLabel}>유효기간</Text>
                  <Text style={styles.ticketDetailValue}>2027.10.01 ~ 2027.10.31</Text>
                </View>
                <View style={styles.ticketDetails}>
                  <Text style={styles.ticketDetailLabel}>사용가능지역</Text>
                  <Text style={styles.ticketDetailValue}>전국 멤버쉽 가맹점 모두</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#505866" />
            </View>
          </View>
        </View>

        {/* 멤버십 혜택 섹션 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>멤버십 혜택</Text>
            <TouchableOpacity style={styles.moreButton} onPress={handleMoreBenefitsPress}>
              <Text style={styles.moreButtonText}>혜택 더보기</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.benefitsDescription}>멤버쉽 회원님들께만 드리는 특별한 할인 혜택을 누려보세요.</Text>

          {/* 혜택 카드들 */}
          <View style={styles.benefitCard}>
            <Image source={require("../assets/membership/spa-icon.png")} style={styles.benefitIcon} resizeMode="cover" />
            <View style={styles.benefitInfo}>
              <Text style={styles.benefitCategory}>스파/에스테틱</Text>
              <Text style={styles.benefitTitle}>메디컬 에스테틱 20%할인</Text>
              <Text style={styles.benefitProvider}>에코스 스파</Text>
            </View>
            <TouchableOpacity style={styles.downloadButton}>
              <Text style={styles.downloadText}>다운로드</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.benefitCard}>
            <Image source={require("../assets/membership/golf-icon.png")} style={styles.benefitIcon} resizeMode="cover" />
            <View style={styles.benefitInfo}>
              <Text style={styles.benefitCategory}>레저 스포츠</Text>
              <Text style={styles.benefitTitle}>골프용품 10%할인</Text>
              <Text style={styles.benefitProvider}>GCC 스크린골프</Text>
            </View>
            <TouchableOpacity style={styles.downloadButton}>
              <Text style={styles.downloadText}>다운로드</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.benefitCard}>
            <Image source={require("../assets/membership/medical-icon.png")} style={styles.benefitIcon} resizeMode="cover" />
            <View style={styles.benefitInfo}>
              <Text style={styles.benefitCategory}>의료</Text>
              <Text style={styles.benefitTitle}>성장주사 시술 20%할인</Text>
              <Text style={styles.benefitProvider}>서울 정형외과</Text>
            </View>
            <TouchableOpacity style={styles.downloadButton}>
              <Text style={styles.downloadText}>다운로드</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.benefitCard}>
            <Image source={require("../assets/membership/health-icon.png")} style={styles.benefitIcon} resizeMode="cover" />
            <View style={styles.benefitInfo}>
              <Text style={styles.benefitCategory}>건강</Text>
              <Text style={styles.benefitTitle}>요가/SNPE 용품 40%할인</Text>
              <Text style={styles.benefitProvider}>마인드앰바디 포 어덜트</Text>
            </View>
            <TouchableOpacity style={styles.downloadButton}>
              <Text style={styles.downloadText}>다운로드</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 혜택 이용 상세 내역 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>혜택 이용 상세 내역</Text>
            <TouchableOpacity style={styles.moreButton} onPress={handleUsageHistoryPress}>
              <Text style={styles.moreButtonText}>사용 이력 보기</Text>
              <Ionicons name="chevron-forward" size={24} color="#505866" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </CommonLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2B2B2B",
    letterSpacing: -0.64
  },
  membershipCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: "#D6DADF",
    marginTop: 10
  },
  memberName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#2B2B2B",
    textAlign: "center",
    marginBottom: 5
  },
  memberAddress: {
    fontSize: 20,
    fontWeight: "900",
    color: "#B48327",
    textAlign: "center",
    marginBottom: 5
  },
  memberStatus: {
    fontSize: 20,
    fontWeight: "400",
    color: "#2B2B2B",
    textAlign: "center",
    marginBottom: 20
  },
  membershipDetails: {
    marginBottom: 20
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#79818B"
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2B2B2B",
    textAlign: "right"
  },
  progressBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10
  },
  progressDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#FFFFFF"
  },
  paymentNotice: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#D6DADF"
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2B2B2B",
    marginBottom: 20
  },
  paymentDetails: {
    marginBottom: 20
  },
  paymentDescription: {
    fontSize: 13,
    fontWeight: "400",
    color: "#2B2B2B",
    lineHeight: 20,
    marginBottom: 20
  },
  paymentButton: {
    backgroundColor: "#CAB8A2",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignSelf: "center"
  },
  paymentButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2B2B2B",
    textAlign: "center"
  },
  ticketContainer: {
    marginTop: 10
  },
  availableTickets: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2B2B2B",
    marginBottom: 15
  },
  ticketCount: {
    color: "#B48327"
  },
  ticketCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#D6DADF"
  },
  ticketIcon: {
    width: 50,
    height: 50,
    borderRadius: 6,
    marginRight: 15
  },
  ticketInfo: {
    flex: 1
  },
  ticketTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2B2B2B",
    marginBottom: 5
  },
  ticketProvider: {
    fontSize: 13,
    fontWeight: "700",
    color: "#79818B",
    marginBottom: 10
  },
  ticketDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5
  },
  ticketDetailLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#79818B"
  },
  ticketDetailValue: {
    fontSize: 13,
    fontWeight: "800",
    color: "#2B2B2B",
    textAlign: "right"
  },
  moreButton: {
    flexDirection: "row",
    alignItems: "center"
  },
  moreButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#505866",
    marginRight: 5
  },
  benefitsDescription: {
    fontSize: 13,
    fontWeight: "400",
    color: "#2B2B2B",
    lineHeight: 20,
    marginBottom: 20
  },
  benefitCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#D6DADF"
  },
  benefitIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15
  },
  benefitInfo: {
    flex: 1
  },
  benefitCategory: {
    fontSize: 12,
    fontWeight: "700",
    color: "#505866",
    marginBottom: 5
  },
  benefitTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#2B2B2B",
    marginBottom: 5
  },
  benefitProvider: {
    fontSize: 12,
    fontWeight: "700",
    color: "#505866"
  },
  downloadButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#D6DADF"
  },
  downloadText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#79818B",
    textAlign: "center"
  }
});
