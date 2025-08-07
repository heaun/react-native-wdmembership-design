import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
import { CommonLayout } from "../components/CommonLayout";

interface OrderConfirmScreenProps {
  service: {
    id: number;
    title: string;
    category: string;
    tags: string;
    image: any;
  };
  selectedLocation: {
    id: number;
    name: string;
    address: string;
    image: any;
  };
  selectedDate: string;
  selectedProduct: {
    id: number;
    name: string;
    description: string;
    price: number;
    image: any;
  };
  selectedOptions: {
    dressing: string;
    quantity: number;
    totalPrice: number;
  };
  onBackPress?: () => void;
  onConfirmOrder?: () => void;
  onPaymentStart?: () => void;
  currentTab?: string;
  onTabPress?: (tabName: string) => void;
  onSideMenuItemPress?: (itemId: string) => void;
}

export const OrderConfirmScreen: React.FC<OrderConfirmScreenProps> = ({
  service,
  selectedLocation,
  selectedDate,
  selectedProduct,
  selectedOptions,
  onBackPress,
  onConfirmOrder,
  onPaymentStart,
  currentTab,
  onTabPress,
  onSideMenuItemPress
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  const getDressingName = (dressingId: string) => {
    switch (dressingId) {
      case "oriental":
        return "오리엔탈 소스";
      case "balsamic":
        return "발사믹 소스";
      default:
        return "";
    }
  };

  const handleConfirmPress = () => {
    onPaymentStart?.();
  };

  return (
    <CommonLayout
      title="상품 주문하기"
      showBackButton={true}
      showTabBar={false}
      onBackPress={onBackPress}
      onMenuPress={() => console.log("메뉴 버튼 클릭")}
      onCouponPress={() => console.log("쿠폰 버튼 클릭")}
      onNotificationPress={() => console.log("알림 버튼 클릭")}
      currentTab={currentTab}
      onTabPress={onTabPress}
      onSideMenuItemPress={onSideMenuItemPress}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* 장소 정보 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.iconContainer}>
              <Image source={selectedLocation.image} style={styles.locationIcon} resizeMode="cover" />
            </View>
            <View style={styles.sectionContent}>
              <Text style={styles.sectionTitle}>{selectedLocation.name}</Text>
              <Text style={styles.sectionSubtitle}>{selectedLocation.address}</Text>
            </View>
          </View>
        </View>

        {/* 날짜 정보 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.iconContainer}>
              <Text style={styles.calendarIcon}>📅</Text>
            </View>
            <View style={styles.sectionContent}>
              <Text style={styles.sectionTitle}>{formatDate(selectedDate)}</Text>
            </View>
          </View>
        </View>

        {/* 상품 정보 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.iconContainer}>
              <Text style={styles.productIcon}>🍽️</Text>
            </View>
            <View style={styles.sectionContent}>
              <Text style={styles.sectionTitle}>{selectedProduct.name}</Text>
            </View>
          </View>
        </View>

        {/* 안내 메시지 */}
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>
            선택하신 주문 내용입니다.{"\n"}
            결제 위해 다시 한 번 확인해주세요.{"\n"}각 항목마다 변경 및 수정이 가능하며,{"\n"}
            처음부터 다시 주문을 시작하실 수 있습니다.
          </Text>
        </View>

        {/* 주문 요약 카드 */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>{service.title}</Text>
          <Text style={styles.summaryLocation}>
            {selectedLocation.name}
            {"\n"}({selectedLocation.address})
          </Text>
          <View style={styles.summaryDivider} />
          <Text style={styles.summaryDetails}>
            {selectedProduct.name}
            {"\n"}
            옵션선택 : {getDressingName(selectedOptions.dressing)} | 수량 {selectedOptions.quantity}
            {"\n"}
            결제금액 : {selectedOptions.totalPrice.toLocaleString()}원
          </Text>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmPress}>
          <Text style={styles.confirmButtonText}>주문 결제</Text>
        </TouchableOpacity>
      </View>
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
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#D6DADF"
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center"
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 30
  },
  locationIcon: {
    width: 24,
    height: 24,
    borderRadius: 4
  },
  calendarIcon: {
    fontSize: 20
  },
  productIcon: {
    fontSize: 20
  },
  sectionContent: {
    flex: 1
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2B2B2B",
    letterSpacing: -0.64
  },
  sectionSubtitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#79818B",
    marginTop: 4,
    letterSpacing: -0.48
  },
  messageContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  messageText: {
    fontSize: 13,
    fontWeight: "400",
    color: "#2B2B2B",
    textAlign: "center",
    lineHeight: 19,
    letterSpacing: -0.52
  },
  summaryCard: {
    marginHorizontal: 20,
    marginBottom: 30,
    padding: 20,
    backgroundColor: "#EFF1F3",
    borderRadius: 6
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2B2B2B",
    textAlign: "center",
    marginBottom: 10,
    letterSpacing: -0.64
  },
  summaryLocation: {
    fontSize: 16,
    fontWeight: "400",
    color: "#2B2B2B",
    textAlign: "center",
    marginBottom: 10,
    lineHeight: 24,
    letterSpacing: -0.64
  },
  summaryDivider: {
    height: 1,
    backgroundColor: "#B1B8C0",
    marginVertical: 10,
    borderStyle: "dashed"
  },
  summaryDetails: {
    fontSize: 14,
    fontWeight: "800",
    color: "#2B2B2B",
    textAlign: "center",
    lineHeight: 24,
    letterSpacing: -0.56
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EFF1F3"
  },
  confirmButton: {
    backgroundColor: "#B48327",
    borderRadius: 48,
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.64
  }
});
