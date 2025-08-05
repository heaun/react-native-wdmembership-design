import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { MembershipBadge } from "../components/MembershipBadge";
import { colors } from "../../utils/colors";
import { User, Benefit, Reward } from "../../types";

// Mock data
const mockUser: User = {
  id: "1",
  name: "김철수",
  email: "kim@example.com",
  avatar: "https://via.placeholder.com/60",
  membershipLevel: {
    id: "gold",
    name: "Gold",
    color: colors.gold,
    benefits: ["15% 할인", "무료 배송", "우선 주문"],
    minPoints: 5000,
    discount: 15
  },
  points: 7500,
  joinDate: "2023-01-15"
};

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
  }
];

const mockRewards: Reward[] = [
  {
    id: "1",
    title: "스타벅스 기프티콘",
    description: "5,000원 상당의 스타벅스 기프티콘",
    points: 5000,
    image: "https://via.placeholder.com/80",
    isAvailable: true
  },
  {
    id: "2",
    title: "영화관 티켓",
    description: "CGV 영화관 티켓 1매",
    points: 8000,
    image: "https://via.placeholder.com/80",
    isAvailable: true
  }
];

export const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>안녕하세요, {mockUser.name}님!</Text>
            <Text style={styles.subtitle}>오늘도 멋진 하루 되세요</Text>
          </View>
          <TouchableOpacity style={styles.avatarContainer}>
            <Ionicons name="person-circle" size={40} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Membership Card */}
        <Card style={styles.membershipCard} variant="elevated">
          <View style={styles.membershipHeader}>
            <MembershipBadge level={mockUser.membershipLevel} size="large" />
            <Text style={styles.pointsText}>{mockUser.points.toLocaleString()} 포인트</Text>
          </View>
          <Text style={styles.membershipDescription}>
            {mockUser.membershipLevel.name} 멤버십으로 {mockUser.membershipLevel.discount}% 할인을 받고 있습니다
          </Text>
          <Button title="멤버십 혜택 보기" onPress={() => {}} variant="outline" size="small" style={styles.membershipButton} />
        </Card>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>빠른 메뉴</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction}>
              <View style={styles.quickActionIcon}>
                <Ionicons name="gift" size={24} color={colors.primary} />
              </View>
              <Text style={styles.quickActionText}>리워드</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <View style={styles.quickActionIcon}>
                <Ionicons name="card" size={24} color={colors.primary} />
              </View>
              <Text style={styles.quickActionText}>혜택</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <View style={styles.quickActionIcon}>
                <Ionicons name="receipt" size={24} color={colors.primary} />
              </View>
              <Text style={styles.quickActionText}>거래내역</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <View style={styles.quickActionIcon}>
                <Ionicons name="settings" size={24} color={colors.primary} />
              </View>
              <Text style={styles.quickActionText}>설정</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Benefits */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>현재 혜택</Text>
          {mockBenefits.map((benefit) => (
            <Card key={benefit.id} style={styles.benefitCard} variant="outlined">
              <View style={styles.benefitContent}>
                <View style={styles.benefitIcon}>
                  <Ionicons name={benefit.icon as any} size={20} color={colors.primary} />
                </View>
                <View style={styles.benefitInfo}>
                  <Text style={styles.benefitTitle}>{benefit.title}</Text>
                  <Text style={styles.benefitDescription}>{benefit.description}</Text>
                </View>
                <View style={styles.benefitStatus}>
                  <Ionicons name="checkmark-circle" size={20} color={benefit.isActive ? colors.success : colors.textTertiary} />
                </View>
              </View>
            </Card>
          ))}
        </View>

        {/* Rewards */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>인기 리워드</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {mockRewards.map((reward) => (
              <Card key={reward.id} style={styles.rewardCard} variant="default">
                <View style={styles.rewardImage}>
                  <Ionicons name="gift" size={32} color={colors.primary} />
                </View>
                <Text style={styles.rewardTitle}>{reward.title}</Text>
                <Text style={styles.rewardDescription}>{reward.description}</Text>
                <Text style={styles.rewardPoints}>{reward.points.toLocaleString()} 포인트</Text>
                <Button title="교환하기" onPress={() => {}} size="small" style={styles.rewardButton} />
              </Card>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.textPrimary
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 4
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  membershipCard: {
    marginHorizontal: 20,
    marginBottom: 24
  },
  membershipHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12
  },
  pointsText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.textPrimary
  },
  membershipDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16
  },
  membershipButton: {
    alignSelf: "flex-start"
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
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20
  },
  quickAction: {
    alignItems: "center"
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  quickActionText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: "500"
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12
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
  rewardCard: {
    width: 160,
    marginLeft: 20,
    marginRight: 8,
    alignItems: "center"
  },
  rewardImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.backgroundTertiary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12
  },
  rewardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
    textAlign: "center",
    marginBottom: 4
  },
  rewardDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: 8
  },
  rewardPoints: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.primary,
    marginBottom: 12
  },
  rewardButton: {
    width: "100%"
  }
});
