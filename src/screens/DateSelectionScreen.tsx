import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";
import { CommonLayout } from "../components/CommonLayout";
import { Calendar } from "../components/Calendar";

const { width: screenWidth } = Dimensions.get("window");

interface DateSelectionScreenProps {
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
  onBackPress?: () => void;
  onDateSelect?: (date: string) => void;
  currentTab?: string;
  onTabPress?: (tabName: string) => void;
  onSideMenuItemPress?: (itemId: string) => void;
}

export const DateSelectionScreen: React.FC<DateSelectionScreenProps> = ({
  service,
  selectedLocation,
  onBackPress,
  onDateSelect,
  currentTab,
  onTabPress,
  onSideMenuItemPress
}) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handlePrevMonth = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentMonth(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };

  const handleConfirmPress = () => {
    if (selectedDate) {
      onDateSelect?.(selectedDate);
    }
  };

  return (
    <CommonLayout
      title="장소 선택"
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
        <Text style={styles.title}>원하시는 날짜를 선택해주세요.</Text>

        <Calendar
          currentDate={currentMonth}
          selectedDate={selectedDate ? new Date(selectedDate) : new Date()}
          onDateSelect={(day) => {
            const dateString = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(
              2,
              "0"
            )}`;
            setSelectedDate(dateString);
          }}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onTodayPress={() => {
            const today = new Date();
            const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
            setSelectedDate(todayString);
            setCurrentMonth(today);
          }}
          showTodayButton={true}
          showDots={false}
          disabledDays={(day) => {
            const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return checkDate < today;
          }}
          mode="selection"
        />

        {/* 범례 */}
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={styles.legendBox} />
            <Text style={styles.legendText}>선택가능</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendBox, styles.unavailableLegendBox]} />
            <Text style={styles.legendText}>선택 불가</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.confirmButton, !selectedDate && styles.disabledButton]}
            onPress={handleConfirmPress}
            disabled={!selectedDate}
          >
            <Text style={styles.confirmButtonText}>날짜 선택</Text>
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

  legend: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    gap: 40
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  legendBox: {
    width: 20,
    height: 20,
    backgroundColor: "#2B2B2B",
    borderRadius: 2
  },
  unavailableLegendBox: {
    backgroundColor: "#B1B8C0"
  },
  legendText: {
    fontSize: 13,
    fontWeight: "400",
    color: "#505866",
    letterSpacing: -0.52
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
