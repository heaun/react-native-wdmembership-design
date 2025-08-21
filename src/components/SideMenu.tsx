import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, Modal, Switch, Animated, Image, SafeAreaView } from "react-native";
import { FaceIdModal } from "./FaceIdModal";
import { PasswordInputScreen } from "../screens/PasswordInputScreen";
import { LabelText, ButtonText, SmallText } from "../components/CommonText";
import { Ionicons } from "@expo/vector-icons";
import { PaymentAuthenticationMode, PaymentPasswordMode, PaymentSettings } from "../../types/payment";
import { useToast } from "../context/ToastContext";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

interface MenuItem {
  id: string;
  title: string;
  type: "header" | "item" | "toggle";
  hasChevron?: boolean;
  hasToggle?: boolean;
  toggleValue?: boolean;
  onPress?: () => void;
  onToggleChange?: (value: boolean) => void;
}

interface MenuSection {
  id: string;
  items: MenuItem[];
}

interface SideMenuProps {
  visible: boolean;
  onClose: () => void;
  onMenuItemPress?: (itemId: string) => void;
}

export const SideMenu: React.FC<SideMenuProps> = ({ visible, onClose, onMenuItemPress }) => {
  const slideAnim = React.useRef(new Animated.Value(-screenWidth)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const { showToast } = useToast();

  const [toggleStates, setToggleStates] = React.useState({
    biometricAuth: false,
    pinCode: true
  });

  const [showFaceIdModal, setShowFaceIdModal] = React.useState(false);
  const [showPasswordInputModal, setShowPasswordInputModal] = React.useState(false);

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -screenWidth,
          duration: 300,
          useNativeDriver: true
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true
        })
      ]).start();
    }
  }, [visible, slideAnim, fadeAnim]);

  const handleToggleChange = (key: string, value: boolean) => {
    setToggleStates((prev) => ({
      ...prev,
      [key]: value
    }));

    // 생체인증 토글이 활성화되면 Face ID 모달 표시
    if (key === "biometricAuth" && value) {
      setShowFaceIdModal(true);
    }

    // PIN 코드 토글이 off에서 on으로 변경되면 PasswordInputScreen 모달 표시
    if (key === "pinCode" && value && !toggleStates.pinCode) {
      setShowPasswordInputModal(true);
    }

    // PIN 코드 토글이 on에서 off로 변경되면 PIN 코드 정보 초기화
    if (key === "pinCode" && !value && toggleStates.pinCode) {
      const resetSettings: PaymentSettings = {
        authenticationMode: PaymentAuthenticationMode.BIOMETRIC,
        passwordMode: PaymentPasswordMode.PAYMENT,
        isPinCodeEnabled: false,
        isBiometricEnabled: false,
        pinCode: ""
      };
      handlePaymentSettingsUpdate(resetSettings);
      showToast("info", "PIN 코드 비활성화", "PIN 코드가 초기화되었습니다.");
    }
  };

  const handleMenuPress = (itemId: string) => {
    if (onMenuItemPress) {
      onMenuItemPress(itemId);
    }
    // 앱설정은 사이드메뉴를 닫지 않음
    if (itemId !== "app-settings") {
      onClose();
    }
  };

  const handleCloseFaceIdModal = () => {
    setShowFaceIdModal(false);
  };

  const handleClosePasswordInputModal = () => {
    setShowPasswordInputModal(false);
  };

  const handlePasswordConfirm = () => {
    console.log("PIN 코드 등록 완료");
    setShowPasswordInputModal(false);
  };

  const handlePaymentSettingsUpdate = (settings: PaymentSettings) => {
    console.log("결제 설정 업데이트:", settings);
    console.log("저장된 PIN 코드:", settings.pinCode);
    // 여기서 실제 결제 설정을 저장하거나 업데이트할 수 있습니다
    showToast("success", "PIN 코드 등록 완료", "PIN 코드가 등록되었습니다.");
  };

  const menuData: MenuSection[] = [
    {
      id: "membership",
      items: [
        {
          id: "membership-management",
          title: "멤버십 관리",
          type: "header",
          hasChevron: false
        },
        {
          id: "membership-info",
          title: "멤버십 정보 조회",
          type: "item",
          hasChevron: true
        },
        {
          id: "my-info",
          title: "내 정보 조회/변경 ",
          type: "item",
          hasChevron: true
        },
        {
          id: "vehicle-management",
          title: "차량 관리",
          type: "item",
          hasChevron: true
        },
        {
          id: "membership-benefits",
          title: "멤버십 상품별 혜택 소개",
          type: "item",
          hasChevron: true
        }
      ]
    },
    {
      id: "payment",
      items: [
        {
          id: "payment-management",
          title: "결제 관리",
          type: "header",
          hasChevron: false
        },
        {
          id: "payment-methods",
          title: "결제 수단 리스트 조회",
          type: "item",
          hasChevron: true
        },
        {
          id: "payment-history",
          title: "결제 이력 조회",
          type: "item",
          hasChevron: true
        },
        {
          id: "payment-register",
          title: "결제 수단 등록/삭제",
          type: "item",
          hasChevron: true
        },
        {
          id: "biometric-auth",
          title: "결제 생체 인증 사용",
          type: "toggle",
          toggleValue: toggleStates.biometricAuth,
          onToggleChange: (value) => handleToggleChange("biometricAuth", value)
        },
        {
          id: "pin-code",
          title: "결제 PIN 코드 사용",
          type: "toggle",
          hasChevron: true,
          toggleValue: toggleStates.pinCode,
          onToggleChange: (value) => handleToggleChange("pinCode", value)
        }
      ]
    },
    {
      id: "concierge",
      items: [
        {
          id: "concierge-connection",
          title: "컨시어지 연결",
          type: "header",
          hasChevron: false
        },
        {
          id: "faq",
          title: "FAQ",
          type: "item",
          hasChevron: true
        },
        {
          id: "chatbot",
          title: "챗봇 상담",
          type: "item",
          hasChevron: true
        },
        {
          id: "butler",
          title: "전담 버틀러 연결",
          type: "item",
          hasChevron: true
        },
        {
          id: "notice",
          title: "공지사항",
          type: "item",
          hasChevron: true
        }
      ]
    },
    {
      id: "settings",
      items: [
        {
          id: "app-settings",
          title: "앱 설정",
          type: "item",
          hasChevron: true
        },
        {
          id: "logout",
          title: "로그아웃",
          type: "item",
          hasChevron: false
        }
      ]
    }
  ];

  const renderMenuItem = (item: MenuItem, sectionId: string) => {
    const isHeader = item.type === "header";
    const isToggle = item.type === "toggle";
    const isSettingsSection = sectionId === "settings";

    return (
      <TouchableOpacity
        key={item.id}
        style={[styles.menuItem, isHeader ? styles.headerItem : styles.regularItem, isSettingsSection && styles.settingsSectionItem]}
        onPress={() => handleMenuPress(item.id)}
        disabled={isToggle}
      >
        <LabelText style={[styles.menuText, isHeader ? styles.headerText : styles.regularText]}>{item.title}</LabelText>

        {isToggle && (
          <Switch
            value={item.toggleValue || false}
            onValueChange={item.onToggleChange}
            trackColor={{ false: "#E0E0E0", true: "#2B2B2B" }}
            thumbColor="#FFFFFF"
            style={styles.toggle}
            ios_backgroundColor="#E0E0E0"
          />
        )}

        {item.hasChevron && !isToggle && (
          <View style={styles.chevronContainer}>
            <Image source={require("../../assets/icons/ic-chevron-right.png")} style={styles.chevron} />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderSection = (section: MenuSection) => (
    <View key={section.id} style={styles.section}>
      {section.items.map((item) => renderMenuItem(item, section.id))}
    </View>
  );

  return (
    <Modal visible={visible} transparent={true} onRequestClose={onClose}>
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <Animated.View style={[styles.menuContainer, { transform: [{ translateX: slideAnim }] }]}>
          <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <LabelText style={styles.closeIcon}>✕</LabelText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.settingsButton}>
                <Image source={require("../../assets/icons/ic-side-menu-setting.png")} style={styles.settingsIcon} />
              </TouchableOpacity>
            </View>

            {/* Menu Content */}
            <ScrollView style={styles.menuContent} showsVerticalScrollIndicator={false}>
              {menuData.map(renderSection)}
            </ScrollView>
          </SafeAreaView>
        </Animated.View>
      </Animated.View>

      {/* Face ID Modal */}
      <FaceIdModal isVisible={showFaceIdModal} onClose={handleCloseFaceIdModal} />

      {/* Password Input Modal */}
      <Modal visible={showPasswordInputModal} animationType="slide" presentationStyle="fullScreen" onRequestClose={handleClosePasswordInputModal}>
        <PasswordInputScreen
          onBackPress={handleClosePasswordInputModal}
          onPasswordConfirm={handlePasswordConfirm}
          paymentAuthenticationMode={PaymentAuthenticationMode.PINCODE}
          paymentPasswordMode={PaymentPasswordMode.REGISTER}
          onPaymentSettingsUpdate={handlePaymentSettingsUpdate}
        />
      </Modal>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start"
  },
  safeArea: {
    flex: 1
  },
  menuContainer: {
    height: "100%",
    maxHeight: "100%",
    paddingVertical: 15,
    backgroundColor: "#FFFFFF"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0"
  },
  closeButton: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center"
  },
  closeIcon: {
    fontSize: 16,
    color: "#131214"
  },
  settingsButton: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center"
  },
  settingsIcon: {
    width: 24,
    height: 24
  },

  menuContent: {
    flex: 1,
    paddingHorizontal: 20,
    maxHeight: "100%"
  },
  section: {
    marginVertical: 10
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 0
  },
  headerItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#505866"
  },
  regularItem: {
    height: 50
  },
  menuText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "800",
    color: "#2B2B2B",
    letterSpacing: -0.64
  },
  headerText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#2B2B2B",
    letterSpacing: -0.56
  },
  regularText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2B2B2B",
    letterSpacing: -0.64
  },
  toggle: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }]
  },
  chevronContainer: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center"
  },
  chevron: {
    width: 18,
    height: 18
  },

  settingsSectionItem: {
    borderTopWidth: 1,
    borderTopColor: "#505866"
  }
});
