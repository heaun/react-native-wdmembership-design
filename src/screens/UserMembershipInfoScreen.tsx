import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CommonLayout } from "../components/CommonLayout";

const { width: screenWidth } = Dimensions.get("window");

interface UserMembershipInfoScreenProps {
  onBackPress?: () => void;
  currentTab?: string;
  onTabPress?: (tabName: string) => void;
  onSideMenuItemPress?: (itemId: string) => void;
}

export const UserMembershipInfoScreen: React.FC<UserMembershipInfoScreenProps> = ({ onBackPress, currentTab, onTabPress, onSideMenuItemPress }) => {
  const [cardSlide, setCardSlide] = useState<number>(0);

  const handleMembershipBenefitsPress = () => {
    console.log("멤버십 혜택 안내");
  };

  const handleUsageHistoryPress = () => {
    console.log("사용 이력 보기");
  };

  const handlePaymentPress = () => {
    console.log("연회비 납부하기");
  };

  const handleMoreTicketsPress = () => {
    console.log("멤버십 이용권 더보기");
  };

  const handleMoreBenefitsPress = () => {
    console.log("혜택 더보기");
  };

  // 데이터 바인딩 객체
  const membershipData = {
    member: {
      name: "박기용",
      residence: "PH 1603 레지던스",
      statusText: "멤버십 회원입니다."
    },
    details: {
      memberNumber: "9869 4586 2335 3698",
      period: "2026.03.01 ~ 2030.02.29"
    },
    payment: {
      due: "2027.10.01 ~ 2027.10.31",
      phone: "070-457-8965"
    },
    tickets: [
      {
        id: "t1",
        icon: require("../assets/membership/healthy-meal-plan-icon.png"),
        title: "전 메뉴 30% 할인 이용권",
        provider: "Healthy Meal Plan",
        period: "2027.10.01 ~ 2027.10.31",
        region: "전국 멤버십 가맹점 모두"
      },
      {
        id: "t2",
        icon: require("../assets/membership/coffee-icon.png"),
        title: "무료 아이스 아메리카노 1잔 증정",
        provider: "The Coffee M&N",
        period: "2027.10.01 ~ 2027.10.31",
        region: "서초 / 신촌 /경기 성남 한정"
      },
      {
        id: "t3",
        icon: require("../assets/membership/mind-body-icon.png"),
        title: "체형/체력 성장 정밀 검사 이용권",
        provider: "마인드앤바디 포 차일드",
        period: "2027.10.01 ~ 2027.10.31",
        region: "전국 멤버십 가맹점 모두"
      },
      {
        id: "t4",
        icon: require("../assets/membership/gcc-golf-icon.png"),
        title: "골프 프로 무료 레슨 이용권",
        provider: "GCC 스크린골프 연습장",
        period: "2027.10.01 ~ 2027.10.31",
        region: "전국 멤버십 가맹점 모두"
      }
    ],
    benefits: [
      {
        id: "b1",
        icon: require("../assets/membership/spa-icon.png"),
        category: "스파/에스테틱",
        title: "메디컬 에스테틱 20%할인",
        provider: "에코스 스파"
      },
      {
        id: "b2",
        icon: require("../assets/membership/golf-icon.png"),
        category: "레저 스포츠",
        title: "골프용품 10%할인",
        provider: "GCC 스크린골프"
      },
      {
        id: "b3",
        icon: require("../assets/membership/medical-icon.png"),
        category: "의료",
        title: "성장주사 시술 20%할인",
        provider: "서울 정형외과"
      },
      {
        id: "b4",
        icon: require("../assets/membership/health-icon.png"),
        category: "건강",
        title: "요가/SNPE 용품 40%할인",
        provider: "마인드앰바디 포 어덜트"
      }
    ]
  } as const;

  const paymentDescription = `멤버십 서비스 연회비 납부 안내드립니다.\n납부금액 및 기타 문의사항은 ${membershipData.payment.phone} 로\n연락주시면 친철히 안내해 드리겠습니다.`;

  const slidesCount = 2; // 0: 요약, 1: 상세
  const goPrevSlide = () => setCardSlide((prev) => (prev - 1 + slidesCount) % slidesCount);
  const goNextSlide = () => setCardSlide((prev) => (prev + 1) % slidesCount);

  return (
    <CommonLayout
      title="멤버십 정보 조회"
      showBackButton={true}
      showTabBar={true}
      onBackPress={onBackPress}
      onMenuPress={() => console.log("메뉴 버튼 클릭")}
      onCouponPress={() => console.log("쿠폰 버튼 클릭")}
      onNotificationPress={() => console.log("알림 버튼 클릭")}
      currentTab={currentTab}
      onTabPress={onTabPress}
      onSideMenuItemPress={onSideMenuItemPress}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* 멤버십 정보 섹션 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>멤버십 정보</Text>
            <TouchableOpacity style={styles.moreButton} onPress={handleMembershipBenefitsPress}>
              <Text style={styles.moreButtonText}>멤버십 혜택 안내</Text>
              <Ionicons name="chevron-forward" size={24} color="#505866" />
            </TouchableOpacity>
          </View>

          <View style={styles.membershipCard}>
            {/* 카드 헤더: 좌우 이동 버튼 */}
            <View style={styles.cardHeader}>
              <TouchableOpacity onPress={goPrevSlide} style={styles.arrowButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <Ionicons name="chevron-back" size={22} color="#505866" />
              </TouchableOpacity>
              <View style={styles.cardHeaderSpacer} />
              <TouchableOpacity onPress={goNextSlide} style={styles.arrowButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <Ionicons name="chevron-forward" size={22} color="#505866" />
              </TouchableOpacity>
            </View>

            {/* 슬라이드 0: 요약 */}
            {cardSlide === 0 && (
              <>
                <Text style={styles.memberName}>{membershipData.member.name} 님은</Text>
                <Text style={styles.memberAddress}>{membershipData.member.residence}</Text>
                <Text style={styles.memberStatus}>{membershipData.member.statusText}</Text>
              </>
            )}

            {/* 슬라이드 1: 상세 */}
            {cardSlide === 1 && (
              <>
                <View style={styles.membershipDetails}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>멤버십 회원 번호</Text>
                    <Text style={styles.detailValue}>{membershipData.details.memberNumber}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>멤버십 기간</Text>
                    <Text style={styles.detailValue}>{membershipData.details.period}</Text>
                  </View>
                </View>
                <View style={styles.progressBar}>
                  {Array.from({ length: 79 }, (_, i) => (
                    <View key={i} style={styles.progressDot} />
                  ))}
                </View>
              </>
            )}
          </View>
        </View>

        {/* 연회비 납부 안내 */}
        <View style={styles.paymentNotice}>
          <Text style={styles.paymentTitle}>연회비 납부안내</Text>
          <View style={styles.paymentDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>납부 기한</Text>
              <Text style={styles.detailValue}>{membershipData.payment.due}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>문의전화</Text>
              <Text style={styles.detailValue}>{membershipData.payment.phone}</Text>
            </View>
          </View>
          <Text style={styles.paymentDescription}>{paymentDescription}</Text>
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
              사용가능 이용권 <Text style={styles.ticketCount}>{membershipData.tickets.length}</Text>
            </Text>

            {membershipData.tickets.map((t) => (
              <View key={t.id} style={styles.ticketCard}>
                <Image source={t.icon} style={styles.ticketIcon} resizeMode="cover" />
                <View style={styles.ticketInfo}>
                  <Text style={styles.ticketTitle}>{t.title}</Text>
                  <Text style={styles.ticketProvider}>{t.provider}</Text>
                  <View style={styles.ticketDetails}>
                    <Text style={styles.ticketDetailLabel}>유효기간</Text>
                    <Text style={styles.ticketDetailValue}>{t.period}</Text>
                  </View>
                  <View style={styles.ticketDetails}>
                    <Text style={styles.ticketDetailLabel}>사용가능지역</Text>
                    <Text style={styles.ticketDetailValue}>{t.region}</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#505866" />
              </View>
            ))}
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

          <Text style={styles.benefitsDescription}>멤버십 회원님들께만 드리는 특별한 할인 혜택을 누려보세요.</Text>

          {membershipData.benefits.map((b) => (
            <View key={b.id} style={styles.benefitCard}>
              <Image source={b.icon} style={styles.benefitIcon} resizeMode="cover" />
              <View style={styles.benefitInfo}>
                <Text style={styles.benefitCategory}>{b.category}</Text>
                <Text style={styles.benefitTitle}>{b.title}</Text>
                <Text style={styles.benefitProvider}>{b.provider}</Text>
              </View>
              <TouchableOpacity style={styles.downloadButton}>
                <Text style={styles.downloadText}>다운로드</Text>
              </TouchableOpacity>
            </View>
          ))}
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
    paddingVertical: 20
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 20
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
    marginHorizontal: 20,
    marginTop: 10
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10
  },
  arrowButton: {
    padding: 2
  },
  cardHeaderSpacer: {
    flex: 1
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
    marginTop: 10,
    paddingHorizontal: 20
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
    marginBottom: 20,
    paddingHorizontal: 20
  },
  benefitCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#D6DADF",
    marginHorizontal: 20
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
