import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "../components/Card";
import { MembershipBadge } from "../components/MembershipBadge";
import { CommonLayout } from "../components/CommonLayout";
import { colors, membershipLevels } from "../../utils/colors";
import { Benefit } from "../../types";

const mockBenefits: Benefit[] = [
  {
    id: "1",
    title: "15% 할인",
    description: "모든 상품에 15% 할인 적용",
    icon: "pricetag",
    isActive: true
  },
  {
    id: "2",
    title: "무료 배송",
    description: "모든 주문에 무료 배송",
    icon: "car",
    isActive: true
  },
  {
    id: "3",
    title: "우선 주문",
    description: "새로운 상품 우선 주문 가능",
    icon: "star",
    isActive: true
  },
  {
    id: "4",
    title: "전용 고객 서비스",
    description: "24시간 전용 고객 서비스 이용",
    icon: "headset",
    isActive: true
  },
  {
    id: "5",
    title: "생일 특별 혜택",
    description: "생일 월 20% 추가 할인",
    icon: "gift",
    isActive: true
  },
  {
    id: "6",
    title: "VIP 이벤트 초대",
    description: "전용 이벤트 및 행사 초대",
    icon: "calendar",
    isActive: false
  }
];

export const BenefitsScreen: React.FC = () => {
  return (
    <CommonLayout
      title="나의일정"
      showBackButton={false}
      onMenuPress={() => console.log("메뉴 버튼 클릭")}
      onCouponPress={() => console.log("쿠폰 버튼 클릭")}
      onNotificationPress={() => console.log("알림 버튼 클릭")}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>멤버십 혜택</Text>
          <Text style={styles.subtitle}>Gold 멤버십으로 받는 특별한 혜택들</Text>
        </View>

        {/* Current Level */}
        <Card style={styles.levelCard} variant="elevated">
          <View style={styles.levelHeader}>
            <MembershipBadge level={membershipLevels.gold} size="large" />
            <View style={styles.levelInfo}>
              <Text style={styles.levelTitle}>Gold 멤버십</Text>
              <Text style={styles.levelDescription}>5,000 포인트 이상 보유 시 자동 등급</Text>
            </View>
          </View>
          <View style={styles.levelStats}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>15%</Text>
              <Text style={styles.statLabel}>할인율</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>6개</Text>
              <Text style={styles.statLabel}>혜택</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>5개</Text>
              <Text style={styles.statLabel}>활성화</Text>
            </View>
          </View>
        </Card>

        {/* Benefits List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>현재 혜택</Text>
          {mockBenefits.map((benefit) => (
            <Card key={benefit.id} style={styles.benefitCard} variant="outlined">
              <View style={styles.benefitContent}>
                <View style={[styles.benefitIcon, { backgroundColor: benefit.isActive ? colors.primaryLight : colors.backgroundTertiary }]}>
                  <Ionicons name={benefit.icon as any} size={24} color={benefit.isActive ? colors.primary : colors.textTertiary} />
                </View>
                <View style={styles.benefitInfo}>
                  <Text style={styles.benefitTitle}>{benefit.title}</Text>
                  <Text style={styles.benefitDescription}>{benefit.description}</Text>
                </View>
                <View style={styles.benefitStatus}>
                  <Ionicons
                    name={benefit.isActive ? "checkmark-circle" : "time"}
                    size={24}
                    color={benefit.isActive ? colors.success : colors.warning}
                  />
                </View>
              </View>
            </Card>
          ))}
        </View>

        {/* Next Level Preview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>다음 등급 혜택</Text>
          <Card style={styles.nextLevelCard} variant="default">
            <View style={styles.nextLevelHeader}>
              <MembershipBadge level={membershipLevels.platinum} size="medium" showPoints={true} />
              <Text style={styles.nextLevelTitle}>Platinum 멤버십</Text>
            </View>
            <Text style={styles.nextLevelDescription}>10,000 포인트 달성 시 자동 등급 업</Text>
            <View style={styles.nextLevelBenefits}>
              <Text style={styles.nextLevelBenefit}>• 20% 할인율</Text>
              <Text style={styles.nextLevelBenefit}>• 무료 배송 + 빠른 배송</Text>
              <Text style={styles.nextLevelBenefit}>• 전용 고객 서비스</Text>
              <Text style={styles.nextLevelBenefit}>• VIP 이벤트 초대</Text>
              <Text style={styles.nextLevelBenefit}>• 생일 특별 혜택</Text>
            </View>
            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>현재 7,500 / 10,000 포인트</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: "75%" }]} />
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </CommonLayout>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary
  },
  levelCard: {
    marginHorizontal: 20,
    marginBottom: 24
  },
  levelHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },
  levelInfo: {
    marginLeft: 16,
    flex: 1
  },
  levelTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginBottom: 4
  },
  levelDescription: {
    fontSize: 14,
    color: colors.textSecondary
  },
  levelStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: 16
  },
  stat: {
    alignItems: "center"
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 4
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary
  },
  section: {
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginHorizontal: 20,
    marginBottom: 16
  },
  benefitCard: {
    marginHorizontal: 20,
    marginBottom: 12
  },
  benefitContent: {
    flexDirection: "row",
    alignItems: "center"
  },
  benefitIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16
  },
  benefitInfo: {
    flex: 1
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 4
  },
  benefitDescription: {
    fontSize: 14,
    color: colors.textSecondary
  },
  benefitStatus: {
    marginLeft: 12
  },
  nextLevelCard: {
    marginHorizontal: 20
  },
  nextLevelHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12
  },
  nextLevelTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginLeft: 12
  },
  nextLevelDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16
  },
  nextLevelBenefits: {
    marginBottom: 20
  },
  nextLevelBenefit: {
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 4
  },
  progressContainer: {
    marginTop: 16
  },
  progressText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.borderLight,
    borderRadius: 4,
    overflow: "hidden"
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 4
  }
});
