import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { CommonLayout } from "../components/CommonLayout";

interface MembershipItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: any;
  type: "with-doctors" | "ph-1603" | "saint-paul";
}

interface MembershipGuideScreenProps {
  onBackPress?: () => void;
  onMenuItemPress?: (itemId: string) => void;
}

export const MembershipGuideScreen: React.FC<MembershipGuideScreenProps> = ({ onBackPress, onMenuItemPress }) => {
  const membershipItems: MembershipItem[] = [
    {
      id: "with-doctors",
      title: "위드닥터스 멤버스 전용",
      subtitle: "With Drs. Member Only",
      description: "맞춤형 개인 건강 관리, 전문 의료 상담, 웰니스 프로그램 등 프리미엄 건강 케어 서비스를 제공합니다.",
      image: require("../assets/membership/with-doctors-member.png"),
      type: "with-doctors"
    },
    {
      id: "ph-1603",
      title: "PH 1603 레지던스 전용",
      subtitle: "For PH 1603 Residence",
      description: "프라이빗 고급 주거 공간과 컨시어지, 커뮤니티 시설 등 품격 있는 라이프 스타일을 만나보십시오.",
      image: require("../assets/membership/ph-1603-residence.png"),
      type: "ph-1603"
    },
    {
      id: "saint-paul",
      title: "세인트폴 잉글리쉬 스쿨 전용",
      subtitle: "For Saint Paul",
      description: "맞춤형 영어 교육, 글로벌 인재 양성 프로그램, 자녀 성장 프로그램을 통한 맞춤 컨설팅 제공합니다.",
      image: require("../assets/membership/saint-paul-school.png"),
      type: "saint-paul"
    }
  ];

  const handleItemPress = (item: MembershipItem) => {
    onMenuItemPress?.(item.id);
  };

  return (
    <CommonLayout title="멤버십 안내" showBackButton={true} onBackPress={onBackPress} showTabBar={false}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.vipTitle}>VIP MEMBERSHIP</Text>
          <Text style={styles.vipDescription}>최상위 멤버를 위한 프라이빗 레지던스 서비스로{"\n"}한 차원 높은 품격과 특별한 혜택을 경험하세요.</Text>
        </View>

        {/* Membership Items */}
        {membershipItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.membershipCard} onPress={() => handleItemPress(item)}>
            <View style={styles.cardContent}>
              <View style={styles.cardImageContainer}>
                <View style={styles.imageContainer}>
                  <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                </View>
              </View>

              <View style={styles.cardDescriptionContainer}>
                <Text style={styles.cardDescription}>{item.description}</Text>
                <Text style={styles.detailLink}>멤버십 혜택 상세보기</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </CommonLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  headerSection: {
    paddingTop: 20,
    paddingBottom: 30
  },
  vipTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#B48327",
    marginBottom: 16,
    letterSpacing: -0.8
  },
  vipDescription: {
    fontSize: 14,
    fontWeight: "400",
    color: "#2B2B2B",
    lineHeight: 22,
    letterSpacing: -0.56
  },
  membershipCard: {
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#D6DADF"
  },
  cardContent: {},
  imageContainer: {
    borderRadius: 8,
    marginRight: 16
  },
  cardImageContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  cardImage: {
    width: 90,
    height: 64,
    borderRadius: 8
  },
  textContainer: {
    flex: 1
  },
  cardDescriptionContainer: {
    flex: 1,
    paddingVertical: 16
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#2B2B2B",
    marginBottom: 4,
    letterSpacing: -0.72,
    fontFamily: "NanumSquare Neo"
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#505866",
    marginBottom: 8,
    letterSpacing: -0.56,
    fontFamily: "NanumSquare Neo"
  },
  cardDescription: {
    fontSize: 14,
    fontWeight: "400",
    color: "#505866",
    lineHeight: 20,
    marginBottom: 12,
    letterSpacing: -0.56,
    fontFamily: "NanumSquare Neo"
  },
  detailLink: {
    fontSize: 16,
    fontWeight: "700",
    color: "#505866",
    letterSpacing: -0.64,
    fontFamily: "NanumSquare Neo",
    textDecorationLine: "underline"
  }
});
