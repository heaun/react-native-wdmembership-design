import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions } from "react-native";
import { CommonLayout } from "../components/CommonLayout";

// 서비스 이미지 import
import mindAndBodyImage from "../assets/services/mind-and-body.png";
import wellnessComeImage from "../assets/services/wellness-come.png";
import healthyMealPlan1Image from "../assets/services/healthy-meal-plan-1.png";
import medicalHospitalImage from "../assets/services/medical-hospital.png";
import gccScreenGolfImage from "../assets/services/gcc-screen-golf.png";
import ecosSpaImage from "../assets/services/ecos-spa.png";

const { width: screenWidth } = Dimensions.get("window");

interface MyServiceScreenProps {
  onBackPress?: () => void;
  currentTab?: string;
  onTabPress?: (tabName: string) => void;
  onServiceDetailPress?: (service: ServiceItem) => void;
  onSideMenuItemPress?: (itemId: string) => void;
}

interface ServiceItem {
  id: number;
  title: string;
  category: string;
  tags: string;
  image: any;
}

export const MyServiceScreen: React.FC<MyServiceScreenProps> = ({
  onBackPress,
  currentTab,
  onTabPress,
  onServiceDetailPress,
  onSideMenuItemPress
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("전체");

  const categories = ["전체", "의료", "건강 프로그램", "스파/에스테틱"];

  const services: ServiceItem[] = [
    {
      id: 1,
      title: "마인드앤바디 포 어덜트",
      category: "건강 프로그램",
      tags: "#자세고정 #심신안정 #체형 다이어트",
      image: mindAndBodyImage
    },
    {
      id: 2,
      title: "웰리스컴 Wellness Come",
      category: "건강 프로그램",
      tags: "#회복운동 #기초체력강화",
      image: wellnessComeImage
    },
    {
      id: 3,
      title: "Healthy Meal Plan",
      category: "레스토랑 / 카페",
      tags: "#균형식단 #비타민보충 #다이어트",
      image: healthyMealPlan1Image
    },
    {
      id: 4,
      title: "전문 내과병원",
      category: "의료",
      tags: "#내과치료 #의료서비스",
      image: medicalHospitalImage
    },
    {
      id: 5,
      title: "GCC 스크린 골프",
      category: "레저 스포츠",
      tags: "#자세교정 #코스공략",
      image: gccScreenGolfImage
    },
    {
      id: 6,
      title: "에코스 스파",
      category: "스파/에스테틱",
      tags: "#수술전운동 #코어운동",
      image: ecosSpaImage
    },
    {
      id: 7,
      title: "Healthy Meal Plan",
      category: "레스토랑 / 카페",
      tags: "#3대영양소섭취 #식단조절",
      image: healthyMealPlan1Image
    }
  ];

  const filteredServices = activeCategory === "전체" ? services : services.filter((service) => service.category === activeCategory);

  const handleCategoryPress = (category: string) => {
    setActiveCategory(category);
  };

  const handleServicePress = (service: ServiceItem) => {
    console.log(`${service.title} 클릭됨`);
    onServiceDetailPress?.(service);
  };

  const getServiceColor = (category: string): string => {
    switch (category) {
      case "건강 프로그램":
        return "#7B68EE";
      case "레스토랑 / 카페":
        return "#FF6B6B";
      case "의료":
        return "#4ECDC4";
      case "레저 스포츠":
        return "#45B7D1";
      case "스파/에스테틱":
        return "#FFA07A";
      default:
        return "#E0E0E0";
    }
  };

  return (
    <CommonLayout
      title="멤버십 서비스"
      showBackButton={false}
      onMenuPress={() => console.log("메뉴 버튼 클릭")}
      onCouponPress={() => console.log("쿠폰 버튼 클릭")}
      onNotificationPress={() => console.log("알림 버튼 클릭")}
      currentTab={currentTab}
      onTabPress={onTabPress}
      onSideMenuItemPress={onSideMenuItemPress}
    >
      {/* Category Tabs */}
      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScrollView}>
          {categories.map((category) => (
            <TouchableOpacity key={category} style={styles.categoryTab} onPress={() => handleCategoryPress(category)}>
              <Text style={[styles.categoryText, activeCategory === category && styles.activeCategoryText]}>{category}</Text>
              {activeCategory === category && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Services List */}
      <ScrollView style={styles.servicesContainer} showsVerticalScrollIndicator={false}>
        {filteredServices.map((service) => (
          <TouchableOpacity key={service.id} style={styles.serviceItem} onPress={() => handleServicePress(service)}>
            <View style={[styles.serviceImage, { backgroundColor: getServiceColor(service.category) }]}>
              {service.image && <Image source={service.image} style={styles.serviceImageContent} resizeMode="cover" />}
            </View>
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceCategory}>{service.category}</Text>
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.serviceTags}>{service.tags}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </CommonLayout>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    backgroundColor: "#FFFFFF",
    paddingBottom: 20
  },
  categoryScrollView: {},
  categoryTab: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: "center",
    position: "relative"
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#B1B8C0",
    letterSpacing: -0.64
  },
  activeCategoryText: {
    color: "#2B2B2B"
  },
  activeIndicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: "#008F8A",
    borderRadius: 2
  },
  servicesContainer: {
    flex: 1
  },
  serviceItem: {
    flexDirection: "row",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#D6DADF"
  },
  serviceImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 18,
    justifyContent: "center",
    alignItems: "center"
  },
  serviceImageContent: {
    width: "100%",
    height: "100%",
    borderRadius: 30
  },
  serviceInfo: {
    flex: 1,
    justifyContent: "center"
  },
  serviceCategory: {
    fontSize: 12,
    fontWeight: "700",
    color: "#505866",
    marginBottom: 6,
    letterSpacing: -0.48
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2B2B2B",
    marginBottom: 6,
    letterSpacing: -0.64
  },
  serviceTags: {
    fontSize: 12,
    fontWeight: "700",
    color: "#505866",
    letterSpacing: -0.48
  }
});
