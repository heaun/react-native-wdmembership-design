import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { CommonLayout } from "../components/CommonLayout";

interface PaymentCompleteScreenProps {
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
  onGoToMyService?: () => void;
  currentTab?: string;
  onTabPress?: (tabName: string) => void;
  onSideMenuItemPress?: (itemId: string) => void;
}

export const PaymentCompleteScreen: React.FC<PaymentCompleteScreenProps> = ({
  service,
  selectedLocation,
  selectedDate,
  selectedProduct,
  selectedOptions,
  onBackPress,
  onGoToMyService,
  currentTab,
  onTabPress,
  onSideMenuItemPress
}) => {
  const getDressingName = (dressing: string) => {
    switch (dressing) {
      case "oriental":
        return "오리엔탈 소스";
      case "balsamic":
        return "발사믹 소스";
      default:
        return dressing;
    }
  };

  return (
    <CommonLayout
      title=""
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
      <View style={styles.container}>
        <Text style={styles.title}>결제가 완료되었습니다</Text>
        
        <View style={styles.orderCard}>
          <Text style={styles.serviceTitle}>{service.title}</Text>
          
          <Text style={styles.locationText}>
            {selectedLocation.name}{'\n'}({selectedLocation.address})
          </Text>
          
          <View style={styles.divider} />
          
          <Text style={styles.orderDetails}>
            {selectedProduct.name}{'\n'}
            옵션선택 : {getDressingName(selectedOptions.dressing)} | 수량 {selectedOptions.quantity}{'\n'}
            결제금액 : {selectedOptions.totalPrice.toLocaleString()}원
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.confirmButton} onPress={onGoToMyService}>
          <Text style={styles.confirmButtonText}>마이 서비스 돌아가기</Text>
        </TouchableOpacity>
      </View>
    </CommonLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#2B2B2B",
    marginTop: 20,
    marginBottom: 30,
    letterSpacing: -0.8
  },
  orderCard: {
    backgroundColor: "#EFF1F3",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2B2B2B",
    textAlign: "center",
    marginBottom: 20,
    letterSpacing: -0.64
  },
  locationText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#2B2B2B",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 24,
    letterSpacing: -0.64
  },
  divider: {
    height: 1,
    backgroundColor: "#B1B8C0",
    marginVertical: 20,
    borderStyle: "dashed"
  },
  orderDetails: {
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
