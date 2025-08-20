import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
import { CommonLayout } from "../components/CommonLayout";
import { LabelText, ButtonText, SmallText, BodyText } from "../components/CommonText";

interface ProductSelectionScreenProps {
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
  onBackPress?: () => void;
  onProductSelect?: (product: any) => void;
  currentTab?: string;
  onTabPress?: (tabName: string) => void;
  onSideMenuItemPress?: (itemId: string) => void;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: any;
}

export const ProductSelectionScreen: React.FC<ProductSelectionScreenProps> = ({
  service,
  selectedLocation,
  selectedDate,
  onBackPress,
  onProductSelect,
  currentTab,
  onTabPress,
  onSideMenuItemPress
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const products: Product[] = [
    {
      id: 1,
      name: "수비드 닭가슴살 셀러드 도시락",
      description: "닭가슴살을 수비드 방식으로 조리한 건강도시락",
      price: 13900,
      image: require("../assets/products/chicken-salad.png")
    },
    {
      id: 2,
      name: "모닝 샌드위치 셋트 메뉴",
      description: "저칼로리, 신선한 재료의 균형잡힌 아침식사",
      price: 12900,
      image: require("../assets/products/morning-sandwich.png")
    },
    {
      id: 3,
      name: "에그 바게트 샌드위치 도시락 셋트",
      description: "신선한 과일 셀러드와 에그샌드위치의 조합",
      price: 14900,
      image: require("../assets/products/egg-baguette-73893a.png")
    },
    {
      id: 4,
      name: "씨푸트 샌드위치 셀러드 셋트",
      description: "연어 샌드위치와 해산물 셀러드를 함께",
      price: 10000,
      image: require("../assets/products/seafood-salad.png")
    }
  ];

  const handleProductPress = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleConfirmPress = () => {
    if (selectedProduct) {
      onProductSelect?.(selectedProduct);
    }
  };

  return (
    <CommonLayout
      title="상품 선택"
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
        <LabelText style={styles.title}>원하시는 제품을 선택해주세요.</LabelText>

        <ScrollView style={styles.productContainer} showsVerticalScrollIndicator={false}>
          {products.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={[styles.productCard, selectedProduct?.id === product.id && styles.selectedProductCard]}
              onPress={() => handleProductPress(product)}
            >
              <View style={styles.productImageContainer}>
                <Image source={product.image} style={styles.productImage} resizeMode="cover" />
              </View>
              <View style={styles.productInfo}>
                <LabelText style={styles.productDescription}>{product.description}</LabelText>
                <LabelText style={styles.productName}>{product.name}</LabelText>
                <LabelText style={styles.productPrice}>{product.price.toLocaleString()}원</LabelText>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.confirmButton, !selectedProduct && styles.disabledButton]}
            onPress={handleConfirmPress}
            disabled={!selectedProduct}
          >
            <LabelText style={styles.confirmButtonText}>상품 선택</LabelText>
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
  productContainer: {
    flex: 1
  },
  productCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D6DADF",
    borderRadius: 6,
    padding: 20,
    marginBottom: 10,
    alignItems: "center"
  },
  selectedProductCard: {
    borderColor: "#B48327",
    borderWidth: 2
  },
  productImageContainer: {
    marginRight: 20
  },
  productImage: {
    width: 60,
    height: 60,
    backgroundColor: "#E0E0E0",
    borderRadius: 10
  },
  productInfo: {
    flex: 1
  },
  productDescription: {
    fontSize: 12,
    fontWeight: "400",
    color: "#79818B",
    marginBottom: 8,
    lineHeight: 20,
    letterSpacing: -0.48
  },
  productName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2B2B2B",
    marginBottom: 8,
    letterSpacing: -0.64
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "800",
    color: "#2B2B2B",
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
