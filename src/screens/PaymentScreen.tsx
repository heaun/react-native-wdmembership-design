import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
import { CommonLayout } from "../components/CommonLayout";
import { LabelText, ButtonText, SmallText, BodyText } from "../components/CommonText";

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
  const [showInstallmentDropdown, setShowInstallmentDropdown] = useState(false);

  const handlePaymentMethodSelect = (method: "card" | "transfer") => {
    setSelectedPaymentMethod(method);
  };

  const handleInstallmentSelect = (type: "lump" | "installment") => {
    setSelectedInstallment(type);
    setShowInstallmentDropdown(false);
  };

  const handleInstallmentDropdownToggle = () => {
    setShowInstallmentDropdown(!showInstallmentDropdown);
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
        <LabelText style={styles.sectionTitle}>내 결제수단</LabelText>

        {/* 결제 금액 */}
        <View style={styles.paymentSection}>
          <LabelText style={styles.sectionLabel}>결제금액</LabelText>
          <LabelText style={styles.paymentAmount}>{selectedOptions.totalPrice.toLocaleString()}원</LabelText>
        </View>

        <View style={styles.divider} />

        {/* 내 결제수단 */}
        <View style={styles.paymentMethodSection}>
          {/* 결제 방법 선택 */}
          <View style={styles.paymentOptions}>
            <TouchableOpacity
              style={[styles.paymentOption, selectedPaymentMethod === "card" && styles.selectedPaymentOption]}
              onPress={() => handlePaymentMethodSelect("card")}
            >
              <View style={[styles.radioButton, selectedPaymentMethod === "card" && styles.selectedRadioButton]}>
                {selectedPaymentMethod === "card" && <View style={styles.radioButtonInner} />}
              </View>
              <LabelText style={styles.paymentOptionText}>카드결제</LabelText>
            </TouchableOpacity>

            {/* 카드결제 선택 시에만 할부 정보 표시 */}
            {selectedPaymentMethod === "card" && (
              <>
                {/* 카드 정보 */}
                <View style={styles.cardInfo}>
                  <Image source={require("@/assets/payment/card-image.png")} style={styles.cardImage} resizeMode="cover" />
                  <LabelText style={styles.cardName}>JADE CLESSIC{"\n"}하나카드</LabelText>
                </View>

                <View style={styles.installmentSection}>
                  <View style={styles.installmentRow}>
                    <LabelText style={styles.installmentLabel}>카드할부</LabelText>
                    <TouchableOpacity style={styles.selectBox} onPress={handleInstallmentDropdownToggle}>
                      <LabelText style={styles.selectBoxText}>{selectedInstallment === "lump" ? "일시불" : "할부"}</LabelText>
                      <LabelText style={styles.selectBoxArrow}>{showInstallmentDropdown ? "▲" : "▼"}</LabelText>
                    </TouchableOpacity>
                  </View>

                  {/* 드롭다운 옵션 */}
                  {showInstallmentDropdown && (
                    <View style={styles.dropdownContainer}>
                      <TouchableOpacity
                        style={[styles.dropdownOption, selectedInstallment === "lump" && styles.selectedDropdownOption]}
                        onPress={() => handleInstallmentSelect("lump")}
                      >
                        <LabelText style={[styles.dropdownOptionText, selectedInstallment === "lump" && styles.selectedDropdownOptionText]}>
                          일시불
                        </LabelText>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.dropdownOption, selectedInstallment === "installment" && styles.selectedDropdownOption]}
                        onPress={() => handleInstallmentSelect("installment")}
                      >
                        <LabelText style={[styles.dropdownOptionText, selectedInstallment === "installment" && styles.selectedDropdownOptionText]}>
                          할부
                        </LabelText>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </>
            )}

            <View style={styles.divider} />

            {/* 계좌이체 선택 */}
            <TouchableOpacity
              style={[styles.paymentOption, selectedPaymentMethod === "transfer" && styles.selectedPaymentOption]}
              onPress={() => handlePaymentMethodSelect("transfer")}
            >
              <View style={[styles.radioButton, selectedPaymentMethod === "transfer" && styles.selectedRadioButton]}>
                {selectedPaymentMethod === "transfer" && <View style={styles.radioButtonInner} />}
              </View>
              <LabelText style={styles.paymentOptionText}>계좌이체</LabelText>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />
        </View>

        {/* 동의 체크박스 */}
        <View style={styles.agreementSection}>
          <TouchableOpacity style={styles.agreementCheckbox} onPress={handleAgreementToggle}>
            <View style={[styles.checkbox, agreedToTerms && styles.checkedCheckbox]}>
              {agreedToTerms && <LabelText style={styles.checkmark}>✓</LabelText>}
            </View>
            <LabelText style={styles.agreementText}>결제내용 확인 및 개인정보 제공에 동의합니다. 상세보기</LabelText>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.confirmButton, !agreedToTerms && styles.disabledButton]}
          onPress={handleConfirmPress}
          disabled={!agreedToTerms}
        >
          <LabelText style={styles.confirmButtonText}>동의하고 결제하기</LabelText>
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
    backgroundColor: "#D6DADF"
  },
  paymentMethodSection: {},
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2B2B2B",
    marginVertical: 20,
    letterSpacing: -0.64
  },
  cardInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10
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
    marginVertical: 10,
    gap: 10
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5
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
    marginVertical: 10
  },
  installmentLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#505866",
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
  selectBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10
  },
  selectBoxText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2B2B2B",
    letterSpacing: -0.64
  },
  selectBoxArrow: {
    fontSize: 12,
    fontWeight: "700",
    color: "#505866"
  },
  installmentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  dropdownContainer: {
    marginTop: 10,
    zIndex: 1000,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    borderRadius: 6,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D6DADF"
  },
  dropdownOption: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EFF1F3"
  },
  selectedDropdownOption: {
    backgroundColor: "#F8F9FA"
  },
  dropdownOptionText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2B2B2B",
    letterSpacing: -0.64
  },
  selectedDropdownOptionText: {
    color: "#B48327"
  },
  agreementSection: {
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
