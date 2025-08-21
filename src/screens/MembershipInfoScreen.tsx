import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CommonLayout } from "../components/CommonLayout";
import { LabelText, ButtonText, SmallText } from "../components/CommonText";
import { ChevronButton } from "../components/Button";

interface MembershipInfoScreenProps {
  onBackPress?: () => void;
  onMenuPress?: () => void;
  onCouponPress?: () => void;
  onNotificationPress?: () => void;
  currentTab?: string;
  onTabPress?: (tabName: string) => void;
  onSideMenuItemPress?: (itemId: string) => void;
}

export const MembershipInfoScreen: React.FC<MembershipInfoScreenProps> = ({
  onBackPress,
  onMenuPress,
  onCouponPress,
  onNotificationPress,
  currentTab,
  onTabPress,
  onSideMenuItemPress
}) => {
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
        icon: require("../../assets/membership/healthy-meal-plan-icon.png"),
        title: "전 메뉴 30% 할인 이용권",
        provider: "Healthy Meal Plan",
        period: "2027.10.01 ~ 2027.10.31",
        region: "전국 멤버십 가맹점 모두"
      },
      {
        id: "t2",
        icon: require("../../assets/membership/coffee-icon.png"),
        title: "무료 아이스 아메리카노 1잔 증정",
        provider: "The Coffee M&N",
        period: "2027.10.01 ~ 2027.10.31",
        region: "서초 / 신촌 /경기 성남 한정"
      },
      {
        id: "t3",
        icon: require("../../assets/membership/mind-body-icon.png"),
        title: "체형/체력 성장 정밀 검사 이용권",
        provider: "마인드앤바디 포 차일드",
        period: "2027.10.01 ~ 2027.10.31",
        region: "전국 멤버십 가맹점 모두"
      },
      {
        id: "t4",
        icon: require("../../assets/membership/gcc-golf-icon.png"),
        title: "골프 프로 무료 레슨 이용권",
        provider: "GCC 스크린골프 연습장",
        period: "2027.10.01 ~ 2027.10.31",
        region: "전국 멤버십 가맹점 모두"
      }
    ],
    benefits: [
      {
        id: "b1",
        icon: require("../../assets/membership/spa-icon.png"),
        category: "스파/에스테틱",
        title: "메디컬 에스테틱 20%할인",
        provider: "에코스 스파"
      },
      {
        id: "b2",
        icon: require("../../assets/membership/golf-icon.png"),
        category: "레저 스포츠",
        title: "골프용품 10%할인",
        provider: "GCC 스크린골프"
      },
      {
        id: "b3",
        icon: require("../../assets/membership/medical-icon.png"),
        category: "의료",
        title: "성장주사 시술 20%할인",
        provider: "서울 정형외과"
      },
      {
        id: "b4",
        icon: require("../../assets/membership/health-icon.png"),
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
      onMenuPress={onMenuPress}
      onCouponPress={onCouponPress}
      onNotificationPress={onNotificationPress}
      currentTab={currentTab}
      onTabPress={onTabPress}
      onSideMenuItemPress={onSideMenuItemPress}
      isWideLayout={true}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* 멤버십 정보 섹션 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <LabelText style={styles.sectionTitle}>멤버십 정보</LabelText>
            <ChevronButton title="멤버십 혜택 안내" onPress={handleMembershipBenefitsPress} />
          </View>
          <View style={styles.divider} />
          <View style={styles.membershipCard}>
            {/* 카드 헤더: 좌우 이동 버튼 */}

            <LabelText style={styles.memberName}>{membershipData.member.name} 님은</LabelText>
            <LabelText style={styles.memberAddress}>{membershipData.member.residence}</LabelText>
            <LabelText style={styles.memberStatus}>{membershipData.member.statusText}</LabelText>

            <View style={styles.divider} />
            <View style={styles.membershipDetails}>
              <View style={styles.detailRow}>
                <LabelText style={styles.detailLabel}>멤버십 회원 번호</LabelText>
                <LabelText style={styles.detailValue}>{membershipData.details.memberNumber}</LabelText>
              </View>
              <View style={styles.detailRow}>
                <LabelText style={styles.detailLabel}>멤버십 기간</LabelText>
                <LabelText style={styles.detailValue}>{membershipData.details.period}</LabelText>
              </View>
            </View>
          </View>

          {/* 연회비 납부 안내 */}
          <View style={styles.paymentNoticeContainer}>
            <View style={styles.paymentNotice}>
              <LabelText style={styles.paymentTitle}>연회비 납부안내</LabelText>
              <View style={styles.paymentDetails}>
                <View style={styles.detailRow}>
                  <LabelText style={styles.detailLabel}>납부 기한</LabelText>
                  <LabelText style={styles.detailValue}>{membershipData.payment.due}</LabelText>
                </View>
                <View style={styles.detailRow}>
                  <LabelText style={styles.detailLabel}>문의전화</LabelText>
                  <LabelText style={styles.detailValue}>{membershipData.payment.phone}</LabelText>
                </View>
              </View>
              <LabelText style={styles.paymentDescription}>{paymentDescription}</LabelText>
            </View>
            <View style={styles.paymentButton}>
              <TouchableOpacity onPress={handlePaymentPress}>
                <LabelText style={styles.paymentButtonText}>연회비 납부하기</LabelText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* 멤버십 이용권 섹션 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <LabelText style={styles.sectionTitle}>멤버십 이용권</LabelText>
            <ChevronButton title="사용 이력 보기" onPress={handleMoreTicketsPress} />
          </View>
          <View style={styles.divider} />

          <View style={styles.ticketContainer}>
            <LabelText style={styles.availableTickets}>
              사용가능 이용권 <LabelText style={styles.ticketCount}>{membershipData.tickets.length}</LabelText>
            </LabelText>

            {membershipData.tickets.map((t) => (
              <View key={t.id} style={styles.ticketCard}>
                {/* 상단 섹션 */}
                <View style={styles.ticketTopSection}>
                  <Image source={t.icon} style={styles.ticketIcon} resizeMode="cover" />
                  <View style={styles.ticketTextInfo}>
                    <LabelText style={styles.ticketTitle}>{t.title}</LabelText>
                    <LabelText style={styles.ticketProvider}>{t.provider}</LabelText>
                  </View>
                </View>

                {/* 점선 구분선 */}
                <View style={styles.dashedDivider}></View>

                {/* 하단 섹션 */}
                <View style={styles.ticketBottomSection}>
                  <View style={styles.ticketDetailRow}>
                    <LabelText style={styles.ticketDetailLabel}>유효기간</LabelText>
                    <LabelText style={styles.ticketDetailValue}>{t.period}</LabelText>
                  </View>
                  <View style={styles.ticketDetailRow}>
                    <LabelText style={styles.ticketDetailLabel}>사용가능지역</LabelText>
                    <LabelText style={styles.ticketDetailValue}>{t.region}</LabelText>
                  </View>
                </View>
              </View>
            ))}

            <View style={styles.moreSection}>
              <TouchableOpacity style={styles.moreButton} onPress={handleMoreTicketsPress}>
                <LabelText style={styles.moreTitle}>멤버십 이용권 더보기</LabelText>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* 멤버십 혜택 섹션 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <LabelText style={styles.sectionTitle}>멤버십 혜택</LabelText>
          </View>

          <LabelText style={styles.benefitsDescription}>멤버십 회원님들께만 드리는 특별한 할인 혜택을 누려보세요.</LabelText>

          {membershipData.benefits.map((b) => (
            <View key={b.id} style={styles.benefitCard}>
              <Image source={b.icon} style={styles.benefitIcon} resizeMode="cover" />
              <View style={styles.benefitInfo}>
                <LabelText style={styles.benefitCategory}>{b.category}</LabelText>
                <LabelText style={styles.benefitTitle}>{b.title}</LabelText>
                <LabelText style={styles.benefitProvider}>{b.provider}</LabelText>
              </View>
              <TouchableOpacity style={styles.downloadButton}>
                <Image source={require("../../assets/icons/ic_download.png")} style={styles.downloadIcon} />
                <LabelText style={styles.downloadText}>다운로드</LabelText>
              </TouchableOpacity>
            </View>
          ))}
          <View style={styles.moreSection}>
            <TouchableOpacity style={styles.moreButton} onPress={handleMoreTicketsPress}>
              <LabelText style={styles.moreTitle}>혜택 더보기</LabelText>
            </TouchableOpacity>
          </View>
        </View>

        {/* 혜택 이용 상세 내역 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <LabelText style={styles.sectionTitle}>혜택 이용 상세 내역</LabelText>
            <TouchableOpacity style={styles.moreButton} onPress={handleUsageHistoryPress}>
              <Image source={require("../../assets/icons/ic-chevron-right.png")} style={styles.chevron} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </CommonLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  section: {
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    paddingVertical: 20,
    marginBottom: 10
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2B2B2B",
    letterSpacing: -0.64
  },
  membershipCard: {
    paddingVertical: 20
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
    paddingVertical: 20
  },
  moreSection: {
    paddingVertical: 20,
    alignItems: "center"
  },
  moreTitle: {
    fontSize: 16,
    color: "#2B2B2B",
    textDecorationLine: "underline"
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
  paymentNoticeContainer: {
    marginBottom: 20,
    backgroundColor: "#EFF1F3",
    borderRadius: 10,
    overflow: "hidden",
    position: "relative"
  },
  paymentNotice: {
    backgroundColor: "#EFF1F3",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2B2B2B",
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#D6DADF"
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
    backgroundColor: "#2B2B2B",
    paddingVertical: 12,
    width: "100%",
    alignSelf: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  paymentButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#CAB8A2",
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
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#D6DADF"
  },
  ticketTopSection: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingBottom: 10
  },
  ticketIcon: {
    width: 50,
    height: 50,
    borderRadius: 6,
    marginRight: 15
  },
  ticketTextInfo: {
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
    color: "#79818B"
  },
  dashedDivider: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D6DADF",
    borderStyle: "dashed"
  },
  ticketBottomSection: {
    paddingTop: 10
  },
  ticketDetailRow: {
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
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    paddingVertical: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#D6DADF",
    position: "relative"
  },
  benefitIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    marginLeft: 15
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
    backgroundColor: "#F5F5F5",
    width: 70,
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    alignItems: "center",
    justifyContent: "center"
  },
  downloadIcon: {
    width: 16,
    height: 16,
    marginBottom: 4
  },
  downloadText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#79818B",
    textAlign: "center"
  },
  chevron: {
    width: 18,
    height: 18
  },
  divider: {
    height: 1,
    backgroundColor: "#D6DADF",
    marginVertical: 5
  },
  gearBorder: {
    height: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#EFF1F3"
  },
  gearTooth: {
    width: 2,
    height: 1,
    backgroundColor: "#D6DADF"
  }
});
