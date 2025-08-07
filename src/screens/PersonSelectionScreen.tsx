import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { CommonLayout } from "../components/CommonLayout";

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
  const [selectedPersonCount, setSelectedPersonCount] = useState<number | null>(null);

  const personOptions = [1, 2, 3, 4, 5, 6, 7, 8];

  const handlePersonPress = (count: number) => {
    setSelectedPersonCount(count);
  };

  const handleConfirmPress = () => {
    if (selectedPersonCount !== null) {
      onPersonSelect?.(selectedPersonCount);
    }
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
        <Text style={styles.title}>방문하실 인원을 선택해주세요</Text>

        <View style={styles.personContainer}>
          {personOptions.map((count) => (
            <TouchableOpacity
              key={count}
              style={[styles.personOption, selectedPersonCount === count && styles.selectedPersonOption]}
              onPress={() => handlePersonPress(count)}
            >
              <View style={styles.personCircle}>
                <View style={styles.personIconContainer}>
                  <Text style={styles.personIconText}>{count === 1 ? "👤" : "👥"}</Text>
                </View>
              </View>
              <Text style={[styles.personText, selectedPersonCount === count && styles.selectedPersonText]}>{count}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.confirmButton, selectedPersonCount === null && styles.disabledButton]}
            onPress={handleConfirmPress}
            disabled={selectedPersonCount === null}
          >
            <Text style={styles.confirmButtonText}>인원 선택</Text>
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
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
    letterSpacing: -0.8
  },
  personContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: 20,
    gap: 20
  },
  personOption: {
    alignItems: "center",
    marginBottom: 20
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
  personIconContainer: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center"
  },
  personIconText: {
    fontSize: 16
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
