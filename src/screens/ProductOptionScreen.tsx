import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
import { CommonLayout } from "../components/CommonLayout";
import { LabelText, ButtonText, SmallText, BodyText } from "../components/CommonText";

interface ProductOptionScreenProps {
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
  onBackPress?: () => void;
  onOptionSelect?: (options: any) => void;
  currentTab?: string;
  onTabPress?: (tabName: string) => void;
  onSideMenuItemPress?: (itemId: string) => void;
}

interface DressingOption {
  id: string;
  name: string;
  price: number;
}

export const ProductOptionScreen: React.FC<ProductOptionScreenProps> = ({
  service,
  selectedLocation,
  selectedDate,
  selectedProduct,
  onBackPress,
  onOptionSelect,
  currentTab,
  onTabPress,
  onSideMenuItemPress
}) => {
  const [selectedDressing, setSelectedDressing] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const dressingOptions: DressingOption[] = [
    { id: "oriental", name: "오리엔탈 소스", price: 0 },
    { id: "balsamic", name: "발사믹 소스", price: 0 }
  ];

  const handleDressingSelect = (dressingId: string) => {
    setSelectedDressing(dressingId);
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleConfirmPress = () => {
    if (selectedDressing) {
      const options = {
        dressing: selectedDressing,
        quantity: quantity,
        totalPrice: selectedProduct.price * quantity
      };
      onOptionSelect?.(options);
    }
  };

  const selectedDressingOption = dressingOptions.find((d) => d.id === selectedDressing);

  return (
    <CommonLayout
      title="상품 옵션 선택"
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
        <LabelText style={styles.title}>상품의 옵션을 선택해주세요.</LabelText>

        <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
          {/* 상품 정보 */}
          <View style={styles.productInfoCard}>
            <Image source={selectedProduct.image} style={styles.productImage} resizeMode="cover" />
            <View style={styles.productDetails}>
              <LabelText style={styles.productName}>{selectedProduct.name}</LabelText>
              <LabelText style={styles.productDescription}>
                부드러운 에그와 고소한 바게트가 어우러진 샌드위치에 신선한 과일과 음료를 더한 든든한 도시락 세트입니다.
              </LabelText>
            </View>
          </View>

          {/* 가격 정보 */}
          <View style={styles.priceSection}>
            <LabelText style={styles.sectionLabel}>가격</LabelText>
            <LabelText style={styles.priceText}>{(selectedProduct.price * quantity).toLocaleString()} 원</LabelText>
          </View>

          <View style={styles.divider} />

          {/* 드레싱 선택 */}
          <View style={styles.dressingSection}>
            <LabelText style={styles.sectionLabel}>드레싱 선택</LabelText>
            {dressingOptions.map((dressing) => (
              <TouchableOpacity key={dressing.id} style={styles.dressingOption} onPress={() => handleDressingSelect(dressing.id)}>
                <View style={[styles.radioButton, selectedDressing === dressing.id && styles.selectedRadioButton]}>
                  {selectedDressing === dressing.id && <View style={styles.radioButtonInner} />}
                </View>
                <LabelText style={styles.dressingName}>{dressing.name}</LabelText>
                <LabelText style={styles.dressingPrice}>{dressing.price} 원</LabelText>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.divider} />

          {/* 수량 선택 */}
          <View style={styles.quantitySection}>
            <LabelText style={styles.sectionLabel}>수량</LabelText>
            <View style={styles.quantitySelector}>
              <TouchableOpacity style={styles.quantityButton} onPress={() => handleQuantityChange(-1)} disabled={quantity <= 1}>
                <LabelText style={[styles.quantityButtonText, quantity <= 1 && styles.disabledText]}>−</LabelText>
              </TouchableOpacity>
              <LabelText style={styles.quantityText}>{quantity}</LabelText>
              <TouchableOpacity style={styles.quantityButton} onPress={() => handleQuantityChange(1)} disabled={quantity >= 10}>
                <LabelText style={[styles.quantityButtonText, quantity >= 10 && styles.disabledText]}>+</LabelText>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.confirmButton, !selectedDressing && styles.disabledButton]}
            onPress={handleConfirmPress}
            disabled={!selectedDressing}
          >
            <LabelText style={styles.confirmButtonText}>옵션 선택 완료</LabelText>
          </TouchableOpacity>
        </View>
      </View>
    </CommonLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#2B2B2B",
    marginTop: 20,
    marginBottom: 20,
    letterSpacing: -0.8
  },
  contentContainer: {
    flex: 1
  },
  productInfoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#D6DADF"
  },
  productImage: {
    width: "100%",
    height: 140,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    marginBottom: 10
  },
  productDetails: {
    marginTop: 10
  },
  productName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2B2B2B",
    marginBottom: 8,
    letterSpacing: -0.64
  },
  productDescription: {
    fontSize: 12,
    fontWeight: "400",
    color: "#505866",
    lineHeight: 20,
    letterSpacing: -0.48
  },
  priceSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#505866",
    letterSpacing: -0.56,
    marginBottom: 10
  },
  priceText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#2B2B2B"
  },
  divider: {
    height: 1,
    backgroundColor: "#D6DADF",
    marginVertical: 20
  },
  dressingSection: {
    marginBottom: 20,
    gap: 10
  },
  dressingOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D6DADF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10
  },
  selectedRadioButton: {
    borderColor: "#2B2B2B",
    backgroundColor: "#2B2B2B"
  },
  radioButtonInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFFFFF"
  },
  dressingName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "800",
    color: "#2B2B2B",
    letterSpacing: -0.64
  },
  dressingPrice: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2B2B2B",
    letterSpacing: -0.64
  },
  quantitySection: {
    marginBottom: 20
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10
  },
  quantityButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#D6DADF",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#2B2B2B"
  },
  disabledText: {
    color: "#B1B8C0"
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2B2B2B",
    marginHorizontal: 30
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EFF1F3"
  },
  confirmButton: {
    backgroundColor: "#2B2B2B",
    borderRadius: 48,
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  disabledButton: {
    backgroundColor: "#E0E0E0"
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.64
  }
});
