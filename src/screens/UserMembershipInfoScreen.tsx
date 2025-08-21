import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Linking, Alert } from "react-native";
import { CommonLayout } from "../components/CommonLayout";
import { LabelText, ButtonText, SmallText, ExtraBoldText } from "../components/CommonText";
import { Ionicons } from "@expo/vector-icons";
import { MembershipDetail, MembershipType } from "../../types/membership";

interface UserMembershipInfoScreenProps {
  membershipId: string;
  membershipType: MembershipType;
  onBackPress?: () => void;
  onConsultationPress?: () => void;
}

export const UserMembershipInfoScreen: React.FC<UserMembershipInfoScreenProps> = ({
  membershipId,
  membershipType,
  onBackPress,
  onConsultationPress
}) => {
  // membershipId 매핑 (MembershipCardScreen에서 전달되는 ID를 UserMembershipInfoScreen의 키로 변환)
  const getMembershipKey = (id: string): string => {
    switch (id) {
      case "ph1603":
        return "ph-1603";
      case "with-doctors":
        return "with-doctors";
      case "saint-paul":
        return "saint-paul";
      default:
        return id;
    }
  };

  const mappedMembershipId = getMembershipKey(membershipId);

  // 멤버십 데이터 (순서 고정)
  const membershipDetails: { [key: string]: MembershipDetail } = {
    "with-doctors": {
      id: "with-doctors",
      title: "위드닥터스 맴버",
      subtitle: "With Drs. Member Only",
      membershipType: "VIP MEMBERSHIP",
      joinFee: "150,000,000 원",
      annualFee: "10,000,000 원",
      returnType: "10년 반환형",
      familyDiscount: "가족형(기명) : 1인 30% DC",
      cardImage: require("../../assets/membership/with-doctors-member.png"),
      backgroundColor: "#5C6969",
      benefits: [
        {
          title: "건강증진 프로그램",
          items: [
            "호텔형 피트니스 무료 이용",
            "사우나, 자쿠지 무료이용",
            "피트니스 PT 무료이용권 10회 제공",
            "탈모관리 및 해드 스파 30% 할인",
            "스톤케어 및 등관리 30% 할인",
            "골프연습타석, 스크린골프장 이용 20% 할인"
          ]
        },
        {
          title: "메디케어 프로그램",
          items: [
            "24시간 응급 내과 진료, 응급 이송 서비스 제공",
            "마인드앤바디 케어 프로그램 30% 할인",
            "국내 최고 4대 병원 최고급 건강검진 10% 할인",
            "제휴 피부과 시술 및 레이저 치료 10% 할인",
            "항노화, 호르몬 관리 프로그램 20% 할인",
            "원격의료 서비스 제공",
            "위드닥터스 팀닥터 다학제 의료 서비스 제공",
            "회원 본인 혹은 직계 가족 제한 VIP 수술 전 / 후 암케어 통원 서비스 (3개월) 혹은 프리미엄 성장케어 (3개월) 프로그램 특별 제공",
            "병원 예약 및 간호사와 함께 하는 고급 차량 의전 서비스 20% 할인"
          ]
        },
        {
          title: "케어 푸드 프로그램",
          items: ["카페 & 베이커리 20% 할인", "케어 푸드 식당 20% 할인"]
        },
        {
          title: "멤버십 혜택안내",
          items: [
            "멤버스 프리미엄 라운지 무료 이용 10회, 추가 이용시 50% 할인",
            "하이앤드 그룹 미팅룸 무료 이용 2회, 추가 이용시 30% 할인",
            "PGA, LPGA 선수와 함께하는 원포인트 레슨 이용권 7회 제공"
          ]
        }
      ]
    },
    "ph-1603": {
      id: "ph-1603",
      title: "PH1603 레지던스",
      subtitle: "For PH 1603 Residence",
      membershipType: "VIP MEMBERSHIP",
      joinFee: "별도 협의",
      annualFee: "별도 협의",
      returnType: "",
      familyDiscount: "",
      cardImage: require("../../assets/membership/ph-1603-residence.png"),
      backgroundColor: "#605B51",
      benefits: [
        {
          title: "레지던스 혜택",
          items: [
            "프라이빗 고급 주거 공간 무료 이용",
            "컨시어지 서비스 24시간 제공",
            "커뮤니티 시설 무료 이용",
            "고급 보안 시스템 제공",
            "전용 주차 공간 제공",
            "정원 및 휴식 공간 무료 이용"
          ]
        },
        {
          title: "라이프스타일 서비스",
          items: [
            "고급 클리닝 서비스 20% 할인",
            "전용 피트니스 센터 무료 이용",
            "스파 및 마사지 서비스 30% 할인",
            "고급 레스토랑 예약 서비스",
            "이벤트 공간 대여 50% 할인",
            "전용 수영장 무료 이용"
          ]
        }
      ],
      notes: ["회원님별 맞춤 혜택과 서비스 범위에 따라 \n가입비 및 연회비가 달라지므로 별도 협의가 필요합니다."]
    },
    "saint-paul": {
      id: "saint-paul",
      title: "세인트폴 스쿨",
      subtitle: "For Saint Paul",
      membershipType: "VIP MEMBERSHIP",
      joinFee: "80,000,000 원",
      annualFee: "7,000,000 원",
      returnType: "가족형 (2인 기준) : 150,000,000 원",
      familyDiscount: "가족형 (2인 기준) : 14,000,000 원",
      cardImage: require("../../assets/membership/saint-paul-school.png"),
      backgroundColor: "#505F65",
      benefits: [
        {
          title: "교육 프로그램",
          items: [
            "맞춤형 영어 교육 프로그램",
            "글로벌 인재 양성 프로그램",
            "자녀 성장 프로그램",
            "맞춤 컨설팅 제공",
            "해외 유학 상담 서비스",
            "언어 능력 평가 및 인증"
          ]
        },
        {
          title: "특별 혜택",
          items: [
            "해외 명문대 입학 상담",
            "국제 교류 프로그램 참여",
            "전문 강사 1:1 튜터링",
            "온라인 학습 플랫폼 무료 이용",
            "학부모 상담 서비스",
            "진로 상담 및 멘토링"
          ]
        }
      ]
    }
  };

  const membershipOrder = ["with-doctors", "ph-1603", "saint-paul"] as const;
  const initialIndex = Math.max(0, membershipOrder.indexOf(membershipId as any));
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);
  const membership = membershipDetails[mappedMembershipId];

  // 멤버십이 존재하지 않을 경우 에러 처리
  if (!membership) {
    return (
      <CommonLayout title="멤버십 안내" showBackButton={true} onBackPress={onBackPress} showTabBar={false} isWideLayout={true}>
        <View style={styles.errorContainer}>
          <LabelText style={styles.errorText}>멤버십 정보를 찾을 수 없습니다.</LabelText>
        </View>
      </CommonLayout>
    );
  }

  const slidesCount = membershipOrder.length;
  const goPrev = () => setCurrentIndex((i) => (i - 1 + slidesCount) % slidesCount);
  const goNext = () => setCurrentIndex((i) => (i + 1) % slidesCount);

  return (
    <CommonLayout title="멤버십 안내" showBackButton={true} onBackPress={onBackPress} showTabBar={false} isWideLayout={true}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={[styles.headerSection, { backgroundColor: membership.backgroundColor }]}>
          {/* 상단 전환 헤더 */}
          {/* <View style={styles.switchHeader}>
            <TouchableOpacity onPress={goPrev} style={styles.switchArrow}>
              <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={goNext} style={styles.switchArrow}>
              <Ionicons name="chevron-forward" size={22} color="#FFFFFF" />
            </TouchableOpacity>
          </View> */}
          <LabelText style={styles.switchTitle}>{membership.title}</LabelText>

          <View style={styles.membershipCard}>
            <Image source={membership.cardImage} style={styles.cardImage} resizeMode="cover" />
          </View>

          {/* Fee Information */}

          {membership.id === "ph-1603" ? (
            <View style={styles.feeSection_ph1603}>
              <SmallText style={styles.feeLabel_ph1603}>가입비 / 연회비</SmallText>
              <LabelText style={styles.feeBigValue_ph1603}>{membership.joinFee}</LabelText>
              <SmallText style={styles.feeSmallInfo_ph1603}>{membership.returnType}</SmallText>
            </View>
          ) : (
            <View style={styles.feeSection}>
              {/* 가입비 */}
              <View style={styles.feeRow}>
                <LabelText style={styles.feeLabel}>가입비</LabelText>
                <View style={styles.feeRight}>
                  <LabelText style={styles.feeBigValue}>{membership.joinFee}</LabelText>
                  {!!membership.returnType && <LabelText style={styles.feeSmallInfo}>{membership.returnType}</LabelText>}
                </View>
              </View>

              <View style={styles.divider} />

              {/* 연회비 */}
              <View style={styles.feeRow}>
                <LabelText style={styles.feeLabel}>연회비</LabelText>
                <View style={styles.feeRight}>
                  <LabelText style={styles.feeBigValue}>{membership.annualFee}</LabelText>
                  {!!membership.familyDiscount && <LabelText style={styles.feeSmallInfo}>{membership.familyDiscount}</LabelText>}
                </View>
              </View>
            </View>
          )}
          {/* 안내 문구 (선택) */}
          {membership.notes && (
            <View style={{ marginTop: 16 }}>
              {membership.notes.map((n, idx) => (
                <SmallText key={idx} style={styles.noteText}>
                  {n}
                </SmallText>
              ))}
            </View>
          )}
        </View>

        {/* Benefits Section */}
        <View style={styles.benefitsSection}>
          <ExtraBoldText style={styles.benefitTitle}>멤버십 혜택 안내</ExtraBoldText>
          <View style={styles.divider} />
          {membership.benefits.map((benefit, index) => (
            <View key={index} style={styles.benefitGroup}>
              <ExtraBoldText style={styles.benefitTitle}>{benefit.title}</ExtraBoldText>
              <View style={styles.benefitItems}>
                {benefit.items.map((item, itemIndex) => (
                  <View key={itemIndex} style={styles.bulletRow}>
                    <View style={styles.bulletDot} />
                    <SmallText style={styles.bulletText}>{item}</SmallText>
                  </View>
                ))}
              </View>
              {index < membership.benefits.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>
      </ScrollView>
    </CommonLayout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorText: { fontSize: 16, color: "#505866" },

  switchHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  switchArrow: { padding: 4 },
  switchTitle: { fontSize: 18, fontWeight: "800", color: "#FFFFFF", textAlign: "center" },

  headerSection: {
    backgroundColor: "#e40000",
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  membershipCard: {
    marginVertical: 40,
    alignItems: "center"
  },
  cardImage: { width: 280, height: 160, borderRadius: 12 },

  feeSection: {},
  feeSection_ph1603: { alignItems: "center" },
  feeLabel_ph1603: { fontSize: 16, fontWeight: "700", color: "#D6DADF" },
  feeBigValue_ph1603: { fontSize: 28, fontWeight: "900", color: "#FFFFFF", marginTop: 12 },
  feeSmallInfo_ph1603: { fontSize: 14, fontWeight: "400", color: "#D6DADF" },

  feeRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", paddingVertical: 12 },
  feeLabel: { fontSize: 16, fontWeight: "700", color: "#D6DADF" },
  feeRight: { alignItems: "flex-end" },
  feeBigValue: { fontSize: 28, fontWeight: "900", color: "#FFFFFF" },
  feeSmallInfo: { fontSize: 14, fontWeight: "400", color: "#D6DADF", marginTop: 4 },
  noteText: { fontSize: 14, color: "#FFFFFF", textAlign: "center", marginTop: 8 },

  benefitsSection: { paddingHorizontal: 20, paddingTop: 30 },
  benefitGroup: { marginVertical: 20 },
  benefitTitle: { fontSize: 16, fontWeight: "800", color: "#000000", marginBottom: 16, letterSpacing: -0.64 },
  benefitItems: {
    marginBottom: 20,
    marginTop: 10,
    paddingHorizontal: 15
  },
  bulletRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 8 },
  bulletDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#505866", marginTop: 9, marginRight: 10 },
  bulletText: { flex: 1, fontSize: 16, fontWeight: "400", color: "#505866", lineHeight: 24, letterSpacing: -0.64 },

  divider: { height: 1, backgroundColor: "#D6DADF", marginVertical: 12 },

  buttonSection: { paddingHorizontal: 24, paddingVertical: 10 },
  consultationButton: { backgroundColor: "#2B2B2B", borderRadius: 48, height: 50, justifyContent: "center", alignItems: "center" },
  consultationButtonText: { fontSize: 16, fontWeight: "700", color: "#FFFFFF", letterSpacing: -0.64 }
});
