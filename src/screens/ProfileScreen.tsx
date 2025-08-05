import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "../components/Card";
import { MembershipBadge } from "../components/MembershipBadge";
import { CommonLayout } from "../components/CommonLayout";
import { colors } from "../../utils/colors";
import { User } from "../../types";

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

const menuItems = [
  {
    id: "1",
    title: "개인정보 수정",
    icon: "person",
    color: colors.primary
  },
  {
    id: "2",
    title: "결제 수단 관리",
    icon: "card",
    color: colors.secondary
  },
  {
    id: "3",
    title: "알림 설정",
    icon: "notifications",
    color: colors.warning
  },
  {
    id: "4",
    title: "보안 설정",
    icon: "shield-checkmark",
    color: colors.error
  },
  {
    id: "5",
    title: "고객센터",
    icon: "headset",
    color: colors.info
  },
  {
    id: "6",
    title: "이용약관",
    icon: "document-text",
    color: colors.textSecondary
  },
  {
    id: "7",
    title: "개인정보처리방침",
    icon: "lock-closed",
    color: colors.textSecondary
  },
  {
    id: "8",
    title: "로그아웃",
    icon: "log-out",
    color: colors.error
  }
];

interface ProfileScreenProps {
  currentTab?: string;
  onTabPress?: (tabName: string) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ currentTab, onTabPress }) => {
  return (
    <CommonLayout
      title="마이서비스"
      showBackButton={false}
      onMenuPress={() => console.log("메뉴 버튼 클릭")}
      onCouponPress={() => console.log("쿠폰 버튼 클릭")}
      onNotificationPress={() => console.log("알림 버튼 클릭")}
      currentTab={currentTab}
      onTabPress={onTabPress}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <Card style={styles.profileCard} variant="elevated">
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Ionicons name="person-circle" size={80} color={colors.primary} />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{mockUser.name}</Text>
              <Text style={styles.profileEmail}>{mockUser.email}</Text>
              <MembershipBadge level={mockUser.membershipLevel} size="medium" />
            </View>
          </View>
          <View style={styles.profileStats}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{mockUser.points.toLocaleString()}</Text>
              <Text style={styles.statLabel}>포인트</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>2023.01.15</Text>
              <Text style={styles.statLabel}>가입일</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>Gold</Text>
              <Text style={styles.statLabel}>등급</Text>
            </View>
          </View>
        </Card>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem}>
              <View style={[styles.menuIcon, { backgroundColor: item.color + "20" }]}>
                <Ionicons name={item.icon as any} size={20} color={item.color} />
              </View>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>앱 버전 1.0.0</Text>
          <Text style={styles.appCopyright}>© 2024 WD Membership. All rights reserved.</Text>
        </View>
      </ScrollView>
    </CommonLayout>
  );
};

const styles = StyleSheet.create({
  profileCard: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 24
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },
  avatarContainer: {
    marginRight: 16
  },
  profileInfo: {
    flex: 1
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginBottom: 4
  },
  profileEmail: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 8
  },
  profileStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: 16
  },
  stat: {
    alignItems: "center",
    flex: 1
  },
  statValue: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 4
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.borderLight
  },
  menuSection: {
    backgroundColor: colors.background,
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 24
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16
  },
  menuTitle: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: "500"
  },
  appInfo: {
    alignItems: "center",
    paddingBottom: 20
  },
  appVersion: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4
  },
  appCopyright: {
    fontSize: 12,
    color: colors.textTertiary
  }
});
