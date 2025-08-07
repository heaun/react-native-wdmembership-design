import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
import { CommonLayout } from "../components/CommonLayout";

interface PaymentScreenProps {
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
  onPaymentConfirm?: () => void;
  currentTab?: string;
  onTabPress?: (tabName: string) => void;
  onSideMenuItemPress?: (itemId: string) => void;
}

export const PaymentScreen: React.FC<PaymentScreenProps> = ({
  service,
  selectedLocation,
  selectedDate,
  selectedProduct,
  selectedOptions,
  onBackPress,
  onPaymentConfirm,
  currentTab,
  onTabPress,
  onSideMenuItemPress
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"card" | "transfer">("card");
  const [selectedInstallment, setSelectedInstallment] = useState<"lump" | "installment">("lump");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handlePaymentMethodSelect = (method: "card" | "transfer") => {
    setSelectedPaymentMethod(method);
  };

  const handleInstallmentSelect = (type: "lump" | "installment") => {
    setSelectedInstallment(type);
  };

  const handleAgreementToggle = () => {
    setAgreedToTerms(!agreedToTerms);
  };

  const handleConfirmPress = () => {
    if (agreedToTerms) {
      onPaymentConfirm?.();
    }
  };

  return (
    <CommonLayout
      title="주문결제"
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
        {/* 결제 금액 */}
        <View style={styles.paymentSection}>
          <Text style={styles.sectionLabel}>결제금액</Text>
          <Text style={styles.paymentAmount}>{selectedOptions.totalPrice.toLocaleString()}원</Text>
        </View>

        <View style={styles.divider} />

        {/* 내 결제수단 */}
        <View style={styles.paymentMethodSection}>
          <Text style={styles.sectionTitle}>내 결제수단</Text>
          
          {/* 카드 정보 */}
          <View style={styles.cardInfo}>
            <Image source={require("../assets/payment/card-image.png")} style={styles.cardImage} resizeMode="cover" />
            <Text style={styles.cardName}>
              JADE CLESSIC{'\n'}하나카드
            </Text>
          </View>

          <View style={styles.divider} />

          {/* 결제 방법 선택 */}
          <View style={styles.paymentOptions}>
            <TouchableOpacity
              style={[styles.paymentOption, selectedPaymentMethod === "card" && styles.selectedPaymentOption]}
              onPress={() => handlePaymentMethodSelect("card")}
            >
              <View style={[styles.radioButton, selectedPaymentMethod === "card" && styles.selectedRadioButton]}>
                {selectedPaymentMethod === "card" && <View style={styles.radioButtonInner} />}
              </View>
              <Text style={styles.paymentOptionText}>카드결제</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.paymentOption, selectedPaymentMethod === "transfer" && styles.selectedPaymentOption]}
              onPress={() => handlePaymentMethodSelect("transfer")}
            >
              <View style={[styles.radioButton, selectedPaymentMethod === "transfer" && styles.selectedRadioButton]}>
                {selectedPaymentMethod === "transfer" && <View style={styles.radioButtonInner} />}
              </View>
              <Text style={styles.paymentOptionText}>계좌이체</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {/* 할부 선택 */}
          <View style={styles.installmentSection}>
            <Text style={styles.installmentLabel}>카드할부</Text>
            <View style={styles.installmentOptions}>
              <TouchableOpacity
                style={[styles.installmentOption, selectedInstallment === "lump" && styles.selectedInstallmentOption]}
                onPress={() => handleInstallmentSelect("lump")}
              >
                <Text style={[styles.installmentText, selectedInstallment === "lump" && styles.selectedInstallmentText]}>일시불</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.installmentOption, selectedInstallment === "installment" && styles.selectedInstallmentOption]}
                onPress={() => handleInstallmentSelect("installment")}
              >
                <Text style={[styles.installmentText, selectedInstallment === "installment" && styles.selectedInstallmentText]}>할부</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* 동의 체크박스 */}
        <View style={styles.agreementSection}>
          <TouchableOpacity style={styles.agreementCheckbox} onPress={handleAgreementToggle}>
            <View style={[styles.checkbox, agreedToTerms && styles.checkedCheckbox]}>
              {agreedToTerms && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.agreementText}>
              결제내용 확인 및 개인정보 제공에 동의합니다. 상세보기
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.confirmButton, !agreedToTerms && styles.disabledButton]}
          onPress={handleConfirmPress}
          disabled={!agreedToTerms}
        >
          <Text style={styles.confirmButtonText}>동의하고 결제하기</Text>
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
  paymentSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#505866",
    letterSpacing: -0.56
  },
  paymentAmount: {
    fontSize: 20,
    fontWeight: "900",
    color: "#2B2B2B"
  },
  divider: {
    height: 1,
    backgroundColor: "#D6DADF",
    marginHorizontal: 20
  },
  paymentMethodSection: {
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2B2B2B",
    marginBottom: 20,
    letterSpacing: -0.64
  },
  cardInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },
  cardImage: {
    width: 114,
    height: 72,
    borderRadius: 6,
    marginRight: 20
  },
  cardName: {
    fontSize: 15,
    fontWeight: "800",
    color: "#79818B",
    lineHeight: 24,
    letterSpacing: -0.6
  },
  paymentOptions: {
    marginBottom: 20
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15
  },
  selectedPaymentOption: {
    // 선택된 옵션 스타일
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D6DADF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15
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
  paymentOptionText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#505866",
    letterSpacing: -0.56
  },
  installmentSection: {
    marginBottom: 20
  },
  installmentLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#505866",
    marginBottom: 10,
    letterSpacing: -0.56
  },
  installmentOptions: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  installmentOption: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10
  },
  selectedInstallmentOption: {
    // 선택된 할부 옵션 스타일
  },
  installmentText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2B2B2B",
    letterSpacing: -0.64
  },
  selectedInstallmentText: {
    color: "#B48327"
  },
  agreementSection: {
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  agreementCheckbox: {
    flexDirection: "row",
    alignItems: "center"
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D6DADF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15
  },
  checkedCheckbox: {
    borderColor: "#2B2B2B",
    backgroundColor: "#2B2B2B"
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold"
  },
  agreementText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "400",
    color: "#505866",
    lineHeight: 16,
    letterSpacing: -0.52
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
