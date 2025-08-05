import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { CommonLayout } from "../components/CommonLayout";
import { colors } from "../../utils/colors";
import { Reward } from "../../types";

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
  },
  {
    id: "3",
    title: "편의점 상품권",
    description: "CU 편의점 10,000원 상품권",
    points: 10000,
    image: "https://via.placeholder.com/80",
    isAvailable: true
  },
  {
    id: "4",
    title: "온라인 쇼핑몰 할인권",
    description: "쿠팡 15,000원 할인권",
    points: 15000,
    image: "https://via.placeholder.com/80",
    isAvailable: true
  },
  {
    id: "5",
    title: "고급 레스토랑 식사권",
    description: "프리미엄 레스토랑 50,000원 식사권",
    points: 50000,
    image: "https://via.placeholder.com/80",
    isAvailable: false
  },
  {
    id: "6",
    title: "호텔 숙박권",
    description: "5성급 호텔 1박 숙박권",
    points: 100000,
    image: "https://via.placeholder.com/80",
    isAvailable: false
  }
];

const categories = [
  { id: "all", name: "전체", icon: "grid" },
  { id: "food", name: "음식", icon: "restaurant" },
  { id: "entertainment", name: "엔터테인먼트", icon: "film" },
  { id: "shopping", name: "쇼핑", icon: "bag" },
  { id: "travel", name: "여행", icon: "airplane" }
];

export const RewardsScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [userPoints] = useState(7500);

  const filteredRewards = selectedCategory === "all" ? mockRewards : mockRewards.filter((reward) => reward.isAvailable);

  const renderReward = ({ item }: { item: Reward }) => (
    <Card style={styles.rewardCard} variant="default">
      <View style={styles.rewardImage}>
        <Ionicons name="gift" size={32} color={colors.primary} />
      </View>
      <View style={styles.rewardContent}>
        <Text style={styles.rewardTitle}>{item.title}</Text>
        <Text style={styles.rewardDescription}>{item.description}</Text>
        <View style={styles.rewardFooter}>
          <Text style={styles.rewardPoints}>{item.points.toLocaleString()} 포인트</Text>
          <Button
            title={item.isAvailable ? "교환하기" : "포인트 부족"}
            onPress={() => {}}
            size="small"
            disabled={!item.isAvailable || userPoints < item.points}
            style={styles.rewardButton}
          />
        </View>
      </View>
    </Card>
  );

  const renderCategory = ({ item }: { item: (typeof categories)[0] }) => (
    <TouchableOpacity
      style={[styles.categoryButton, selectedCategory === item.id && styles.categoryButtonActive]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Ionicons name={item.icon as any} size={20} color={selectedCategory === item.id ? colors.primary : colors.textSecondary} />
      <Text style={[styles.categoryText, selectedCategory === item.id && styles.categoryTextActive]}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <CommonLayout title="리워드" showBackButton={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>리워드</Text>
        <View style={styles.pointsContainer}>
          <Ionicons name="star" size={20} color={colors.primary} />
          <Text style={styles.pointsText}>{userPoints.toLocaleString()} 포인트</Text>
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Rewards List */}
      <FlatList
        data={filteredRewards}
        renderItem={renderReward}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.rewardsList}
        numColumns={2}
      />
    </CommonLayout>
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.textPrimary
  },
  pointsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  pointsText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
    marginLeft: 4
  },
  categoriesContainer: {
    marginBottom: 16
  },
  categoriesList: {
    paddingHorizontal: 20
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  categoryButtonActive: {
    backgroundColor: colors.primary
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textSecondary,
    marginLeft: 6
  },
  categoryTextActive: {
    color: colors.textInverse
  },
  rewardsList: {
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  rewardCard: {
    flex: 1,
    marginHorizontal: 4,
    marginBottom: 16,
    alignItems: "center",
    minHeight: 200
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
  rewardContent: {
    flex: 1,
    width: "100%",
    alignItems: "center"
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
    marginBottom: 12,
    flex: 1
  },
  rewardFooter: {
    width: "100%",
    alignItems: "center"
  },
  rewardPoints: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.primary,
    marginBottom: 8
  },
  rewardButton: {
    width: "100%"
  }
});
