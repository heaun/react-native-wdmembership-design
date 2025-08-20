import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { CommonLayout } from "../components/CommonLayout";
import { LabelText, ButtonText, SmallText, BodyText } from "../components/CommonText";

interface PersonSelectionScreenProps {
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
  selectedTime: string;
  onBackPress?: () => void;
  onPersonSelect?: (personCount: number) => void;
  currentTab?: string;
  onTabPress?: (tabName: string) => void;
  onSideMenuItemPress?: (itemId: string) => void;
}

export const PersonSelectionScreen: React.FC<PersonSelectionScreenProps> = ({
  service,
  selectedLocation,
  selectedDate,
  selectedTime,
  onBackPress,
  onPersonSelect,
  currentTab,
  onTabPress,
  onSideMenuItemPress
}) => {
  const [selectedPersonCount, setSelectedPersonCount] = useState<number>(1);

  const handleDecrease = () => {
    if (selectedPersonCount > 1) {
      setSelectedPersonCount(selectedPersonCount - 1);
    }
  };

  const handleIncrease = () => {
    if (selectedPersonCount < 10) {
      setSelectedPersonCount(selectedPersonCount + 1);
    }
  };

  const handleConfirmPress = () => {
    onPersonSelect?.(selectedPersonCount);
  };

  return (
    <CommonLayout
      title="인원 선택"
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
        <LabelText style={styles.title}>방문하실 인원을 선택해주세요</LabelText>

        <View style={styles.counterContainer}>
          <TouchableOpacity
            style={[styles.counterButton, selectedPersonCount <= 1 && styles.disabledButton]}
            onPress={handleDecrease}
            disabled={selectedPersonCount <= 1}
          >
            <LabelText style={[styles.counterButtonText, selectedPersonCount <= 1 && styles.disabledButtonText]}>-</LabelText>
          </TouchableOpacity>

          <View style={styles.numberContainer}>
            <LabelText style={styles.numberText}>{selectedPersonCount}</LabelText>
          </View>

          <TouchableOpacity
            style={[styles.counterButton, selectedPersonCount >= 10 && styles.disabledButton]}
            onPress={handleIncrease}
            disabled={selectedPersonCount >= 10}
          >
            <LabelText style={[styles.counterButtonText, selectedPersonCount >= 10 && styles.disabledButtonText]}>+</LabelText>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmPress}>
            <LabelText style={styles.confirmButtonText}>인원 선택</LabelText>
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
    marginBottom: 40,
    letterSpacing: -0.8
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
    gap: 50
  },
  counterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#EFF1F3",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center"
  },
  counterButtonText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2B2B2B"
  },
  disabledButtonText: {
    color: "#CDCFD0"
  },
  numberContainer: {
    minWidth: 60,
    alignItems: "center"
  },
  numberText: {
    fontSize: 30,
    fontWeight: "900",
    color: "#2B2B2B"
  },
  personContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    gap: 20
  },
  personOption: {
    alignItems: "center",
    marginBottom: 20,
    width: "30%"
  },
  selectedPersonOption: {
    // 선택된 옵션 스타일
  },
  personCircle: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: "#EFF1F3",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginBottom: 10
  },
  selectedPersonCircle: {
    borderColor: "#B48327",
    backgroundColor: "#B48327"
  },
  personIconContainer: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center"
  },
  personIconText: {
    fontSize: 16
  },
  selectedPersonIconText: {
    color: "#FFFFFF"
  },
  personText: {
    fontSize: 30,
    fontWeight: "900",
    color: "#2B2B2B"
  },
  selectedPersonText: {
    color: "#B48327"
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EFF1F3",
    marginTop: "auto"
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
