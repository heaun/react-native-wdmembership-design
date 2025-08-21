import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import { CommonLayout } from "../components/CommonLayout";
import { FaceIdModal } from "../components/FaceIdModal";
import { LabelText } from "../components/CommonText";
import { PaymentAuthenticationMode, PaymentPasswordMode, PaymentSettings } from "../../types/payment";

interface PasswordInputScreenProps {
  onBackPress?: () => void;
  onPasswordConfirm?: () => void;
  currentTab?: string;
  onTabPress?: (tabName: string) => void;
  onSideMenuItemPress?: (itemId: string) => void;
  paymentAuthenticationMode?: PaymentAuthenticationMode;
  paymentPasswordMode?: PaymentPasswordMode;
  onPaymentSettingsUpdate?: (settings: PaymentSettings) => void;
}

export const PasswordInputScreen: React.FC<PasswordInputScreenProps> = ({
  onBackPress,
  onPasswordConfirm,
  currentTab,
  onTabPress,
  onSideMenuItemPress,
  paymentAuthenticationMode = PaymentAuthenticationMode.BIOMETRIC,
  paymentPasswordMode = PaymentPasswordMode.REGISTER,
  onPaymentSettingsUpdate
}) => {
  const [password, setPassword] = useState("");
  const [showFaceIdModal, setShowFaceIdModal] = useState(false);

  useEffect(() => {
    if (paymentAuthenticationMode === PaymentAuthenticationMode.BIOMETRIC) {
      // 1초 후 Face ID 모달 표시
      const showTimer = setTimeout(() => {
        setShowFaceIdModal(true);
      }, 1000);

      // 4초 후 Face ID 모달 숨김 (1초 + 3초)
      const hideTimer = setTimeout(() => {
        setShowFaceIdModal(false);
      }, 4000);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [paymentAuthenticationMode]);

  useEffect(() => {
    // 비밀번호가 6자리가 되면 자동으로 다음 화면으로 이동
    if (password.length === 6) {
      setTimeout(() => {
        // PIN 코드 등록 완료 시 결제 설정 업데이트
        if (paymentAuthenticationMode === PaymentAuthenticationMode.PINCODE && onPaymentSettingsUpdate) {
          const updatedSettings: PaymentSettings = {
            authenticationMode: PaymentAuthenticationMode.PINCODE,
            passwordMode: PaymentPasswordMode.REGISTER,
            isPinCodeEnabled: true,
            isBiometricEnabled: false,
            pinCode: password
          };
          onPaymentSettingsUpdate(updatedSettings);
        }
        onPasswordConfirm?.();
      }, 500);
    }
  }, [password, onPasswordConfirm, paymentAuthenticationMode, onPaymentSettingsUpdate]);

  const handleNumberPress = (number: string) => {
    if (password.length < 6) {
      setPassword(password + number);
    }
  };

  const handleDeletePress = () => {
    if (password.length > 0) {
      setPassword(password.slice(0, -1));
    }
  };

  const handleCloseFaceIdModal = () => {
    setShowFaceIdModal(false);
  };

  const handleBiometricAuth = () => {
    setShowFaceIdModal(true);
  };

  const renderPasswordDots = () => {
    const dots = [];
    for (let i = 0; i < 6; i++) {
      dots.push(<View key={i} style={[styles.passwordDot, i < password.length && styles.filledPasswordDot]} />);
    }
    return dots;
  };

  const renderNumberPad = () => {
    const numbers = [
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "9"],
      ["", "0", "delete"]
    ];

    return numbers.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.numberRow}>
        {row.map((number, colIndex) => (
          <TouchableOpacity
            key={colIndex}
            style={[styles.numberButton, number === "" && styles.emptyButton, number === "delete" && styles.deleteButton]}
            onPress={() => {
              if (number === "delete") {
                handleDeletePress();
              } else if (number !== "") {
                handleNumberPress(number);
              }
            }}
            disabled={number === ""}
          >
            {number === "delete" ? <Text style={styles.deleteButtonText}>⌫</Text> : <Text style={styles.numberButtonText}>{number}</Text>}
          </TouchableOpacity>
        ))}
      </View>
    ));
  };

  return (
    <>
      <CommonLayout
        title=""
        showBackButton={false}
        showTabBar={false}
        showTopIcons={false}
        onBackPress={onBackPress}
        onMenuPress={() => {}}
        onCouponPress={() => {}}
        onNotificationPress={() => {}}
        currentTab={currentTab}
        onTabPress={onTabPress}
        onSideMenuItemPress={onSideMenuItemPress}
      >
        <View style={styles.container}>
          <LabelText style={styles.title}>
            {paymentAuthenticationMode === PaymentAuthenticationMode.PINCODE
              ? "결제 시 사용하실 PIN 코드를 입력하세요."
              : "등록하신 비밀번호를 입력하세요."}
          </LabelText>
          <LabelText style={styles.subtitle}>
            {paymentAuthenticationMode === PaymentAuthenticationMode.PINCODE ? "PIN 코드 6자리를 입력해 주세요." : "비밀번호 6자리를 입력해 주세요."}
          </LabelText>

          <View style={styles.passwordDotsContainer}>{renderPasswordDots()}</View>

          <View style={styles.numberPadContainer}>{renderNumberPad()}</View>
          {/* 
          <TouchableOpacity style={styles.biometricButton} onPress={handleBiometricAuth}>
            <LabelText style={styles.biometricButtonText}>생체인식 인증하기</LabelText>
          </TouchableOpacity> */}
        </View>
      </CommonLayout>

      <FaceIdModal isVisible={showFaceIdModal} onClose={handleCloseFaceIdModal} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 100,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#2B2B2B",
    textAlign: "center",
    marginBottom: 16,
    letterSpacing: -0.8
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#2B2B2B",
    textAlign: "center",
    marginBottom: 40,
    letterSpacing: -0.64
  },
  passwordDotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 18,
    marginBottom: 60
  },
  passwordDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#B1B8C0"
  },
  filledPasswordDot: {
    backgroundColor: "#2B2B2B"
  },
  numberPadContainer: {
    width: "100%",
    maxWidth: 300
  },
  numberRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  },
  numberButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F8F9FA",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  emptyButton: {
    backgroundColor: "transparent",
    borderWidth: 0
  },
  deleteButton: {
    backgroundColor: "#F8F9FA"
  },
  numberButtonText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#2B2B2B"
  },
  deleteButtonText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2B2B2B"
  },
  biometricButton: {
    backgroundColor: "#2B2B2B",
    borderRadius: 48,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginHorizontal: 20
  },
  biometricButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.64
  }
});
