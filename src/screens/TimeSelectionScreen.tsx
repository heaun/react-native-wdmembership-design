import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { CommonLayout } from "../components/CommonLayout";

interface TimeSelectionScreenProps {
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
  onTimeSelect?: (time: string) => void;
  currentTab?: string;
  onTabPress?: (tabName: string) => void;
  onSideMenuItemPress?: (itemId: string) => void;
}

interface TimeSlot {
  id: string;
  time: string;
  period: "오전" | "오후";
  isAvailable: boolean;
}

export const TimeSelectionScreen: React.FC<TimeSelectionScreenProps> = ({
  service,
  selectedLocation,
  selectedDate,
  onBackPress,
  onTimeSelect,
  currentTab,
  onTabPress,
  onSideMenuItemPress
}) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // 시간대별 시간 슬롯 생성
  const generateTimeSlots = (): TimeSlot[] => {
    const morningSlots: TimeSlot[] = [
      { id: "9:00", time: "9:00", period: "오전", isAvailable: true },
      { id: "10:00", time: "10:00", period: "오전", isAvailable: true },
      { id: "11:00", time: "11:00", period: "오전", isAvailable: false },
      { id: "12:00", time: "12:00", period: "오전", isAvailable: true }
    ];

    const afternoonSlots: TimeSlot[] = [
      { id: "1:00", time: "1:00", period: "오후", isAvailable: true },
      { id: "2:00", time: "2:00", period: "오후", isAvailable: false },
      { id: "3:00", time: "3:00", period: "오후", isAvailable: true },
      { id: "4:00", time: "4:00", period: "오후", isAvailable: true },
      { id: "5:00", time: "5:00", period: "오후", isAvailable: true },
      { id: "6:00", time: "6:00", period: "오후", isAvailable: true }
    ];

    return [...morningSlots, ...afternoonSlots];
  };

  const timeSlots = generateTimeSlots();

  const handleTimePress = (timeSlot: TimeSlot) => {
    if (timeSlot.isAvailable) {
      setSelectedTime(timeSlot.id);
    }
  };

  const handleConfirmPress = () => {
    if (selectedTime) {
      onTimeSelect?.(selectedTime);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  const morningSlots = timeSlots.filter((slot) => slot.period === "오전");
  const afternoonSlots = timeSlots.filter((slot) => slot.period === "오후");

  return (
    <CommonLayout
      title="예약 시간 선택"
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
        <Text style={styles.title}>원하시는 시간을 선택해주세요.</Text>

        <ScrollView style={styles.timeContainer} showsVerticalScrollIndicator={false}>
          {/* 오전 시간대 */}
          <View style={styles.timeSection}>
            <Text style={styles.periodLabel}>오전</Text>
            <View style={styles.timeGrid}>
              {morningSlots.map((slot) => (
                <TouchableOpacity
                  key={slot.id}
                  style={[styles.timeSlot, !slot.isAvailable && styles.unavailableTimeSlot, selectedTime === slot.id && styles.selectedTimeSlot]}
                  onPress={() => handleTimePress(slot)}
                  disabled={!slot.isAvailable}
                >
                  <Text
                    style={[styles.timeText, !slot.isAvailable && styles.unavailableTimeText, selectedTime === slot.id && styles.selectedTimeText]}
                  >
                    {slot.time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* 오후 시간대 */}
          <View style={styles.timeSection}>
            <Text style={styles.periodLabel}>오후</Text>
            <View style={styles.timeGrid}>
              {afternoonSlots.map((slot) => (
                <TouchableOpacity
                  key={slot.id}
                  style={[styles.timeSlot, !slot.isAvailable && styles.unavailableTimeSlot, selectedTime === slot.id && styles.selectedTimeSlot]}
                  onPress={() => handleTimePress(slot)}
                  disabled={!slot.isAvailable}
                >
                  <Text
                    style={[styles.timeText, !slot.isAvailable && styles.unavailableTimeText, selectedTime === slot.id && styles.selectedTimeText]}
                  >
                    {slot.time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

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
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.confirmButton, !selectedTime && styles.disabledButton]}
            onPress={handleConfirmPress}
            disabled={!selectedTime}
          >
            <Text style={styles.confirmButtonText}>시간 선택</Text>
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
    marginBottom: 20,
    letterSpacing: -0.8
  },
  timeContainer: {
    flex: 1,
    paddingHorizontal: 20
  },
  timeSection: {
    marginBottom: 30
  },
  periodLabel: {
    fontSize: 14,
    fontWeight: "800",
    color: "#B1B8C0",
    marginBottom: 15,
    letterSpacing: -0.56
  },
  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  timeSlot: {
    width: 80,
    height: 40,
    backgroundColor: "#EFF1F3",
    borderWidth: 1,
    borderColor: "#B1B8C0",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center"
  },
  unavailableTimeSlot: {
    backgroundColor: "#FFFFFF",
    borderColor: "#2B2B2B"
  },
  selectedTimeSlot: {
    backgroundColor: "#B48327",
    borderColor: "#B48327"
  },
  timeText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#B1B8C0",
    letterSpacing: -0.52
  },
  unavailableTimeText: {
    color: "#2B2B2B"
  },
  selectedTimeText: {
    color: "#FFFFFF"
  },
  legend: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
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
    backgroundColor: "#EFF1F3",
    borderWidth: 1,
    borderColor: "#B1B8C0",
    borderRadius: 2
  },
  unavailableLegendBox: {
    backgroundColor: "#FFFFFF",
    borderColor: "#2B2B2B"
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
