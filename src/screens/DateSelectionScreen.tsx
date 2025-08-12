import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";
import { CommonLayout } from "../components/CommonLayout";

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

  // 달력 데이터 생성
  const generateCalendarDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);

      const isCurrentMonth = currentDate.getMonth() === month;
      const isToday = currentDate.getTime() === today.getTime();
      const isPast = currentDate < today;
      const isAvailable = !isPast && isCurrentMonth;

      days.push({
        date: currentDate,
        day: currentDate.getDate(),
        isCurrentMonth,
        isToday,
        isPast,
        isAvailable
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays(currentMonth);

  const handleDatePress = (day: any) => {
    if (day.isAvailable) {
      const dateString = `${day.date.getFullYear()}-${String(day.date.getMonth() + 1).padStart(2, "0")}-${String(day.date.getDate()).padStart(
        2,
        "0"
      )}`;
      setSelectedDate(dateString);
    }
  };

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

  const formatMonthYear = (date: Date) => {
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
  };

  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

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

        {/* 월 선택 헤더 */}
        <View style={styles.monthHeader}>
          <TouchableOpacity style={styles.monthButton} onPress={handlePrevMonth}>
            <Text style={styles.monthButtonText}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.monthText}>{formatMonthYear(currentMonth)}</Text>
          <TouchableOpacity style={styles.monthButton} onPress={handleNextMonth}>
            <Text style={styles.monthButtonText}>›</Text>
          </TouchableOpacity>
          <Text style={styles.todayText}>오늘</Text>
        </View>

        {/* 요일 헤더 */}
        <View style={styles.weekHeader}>
          {weekDays.map((day, index) => (
            <Text key={index} style={styles.weekDayText}>
              {day}
            </Text>
          ))}
        </View>

        {/* 달력 그리드 */}
        <View style={styles.calendarGrid}>
          {calendarDays.map((day, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.calendarDay,
                !day.isCurrentMonth && styles.otherMonthDay,
                day.isToday && styles.todayDay,
                selectedDate ===
                  `${day.date.getFullYear()}-${String(day.date.getMonth() + 1).padStart(2, "0")}-${String(day.date.getDate()).padStart(2, "0")}` &&
                  styles.selectedDay
              ]}
              onPress={() => handleDatePress(day)}
              disabled={!day.isAvailable}
            >
              <Text
                style={[
                  styles.dayText,
                  !day.isCurrentMonth && styles.otherMonthText,
                  !day.isAvailable && styles.unavailableText,
                  day.isToday && styles.todayText,
                  selectedDate ===
                    `${day.date.getFullYear()}-${String(day.date.getMonth() + 1).padStart(2, "0")}-${String(day.date.getDate()).padStart(2, "0")}` &&
                    styles.selectedDayText
                ]}
              >
                {day.day}
              </Text>
            </TouchableOpacity>
          ))}
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
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    letterSpacing: -0.8
  },
  monthHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingVertical: 15
  },
  monthButton: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center"
  },
  monthButtonText: {
    fontSize: 18,
    color: "#505866",
    fontWeight: "400"
  },
  monthText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#2B2B2B",
    letterSpacing: -0.8
  },
  todayText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2B2B2B",
    letterSpacing: -0.52
  },
  weekHeader: {
    flexDirection: "row",
    marginBottom: 10
  },
  weekDayText: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "400",
    color: "#2B2B2B",
    letterSpacing: -0.56
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  calendarDay: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    margin: 1
  },
  otherMonthDay: {
    // 다른 달의 날짜는 투명하게
  },
  todayDay: {
    backgroundColor: "#B48327",
    borderRadius: 24
  },
  selectedDay: {
    backgroundColor: "#B48327",
    borderRadius: 24
  },
  dayText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#2B2B2B",
    letterSpacing: -0.64
  },
  otherMonthText: {
    color: "#FFFFFF"
  },
  unavailableText: {
    color: "#B1B8C0"
  },
  selectedDayText: {
    color: "#FFFFFF"
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
