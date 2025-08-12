import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

interface CalendarProps {
  currentDate: Date;
  selectedDate: Date;
  onDateSelect: (day: number) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onTodayPress?: () => void;
  showTodayButton?: boolean;
  showDots?: boolean;
  hasReservation?: (day: number) => boolean;
  disabledDays?: (day: number) => boolean;
  mode?: "schedule" | "selection";
  headerOnly?: boolean;
}

export const Calendar: React.FC<CalendarProps> = ({
  currentDate,
  selectedDate,
  onDateSelect,
  onPrevMonth,
  onNextMonth,
  onTodayPress,
  showTodayButton = false,
  showDots = false,
  hasReservation,
  disabledDays,
  mode = "schedule",
  headerOnly = false
}) => {
  // 현재 월을 문자열로 표시
  const currentMonth = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`;

  // 캘린더 날짜 생성 함수
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // 해당 월의 첫 번째 날과 마지막 날
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // 첫 번째 날의 요일 (0: 일요일, 1: 월요일, ...)
    const firstDayOfWeek = firstDay.getDay();
    // 월요일을 0으로 변환 (0: 월요일, 1: 화요일, ..., 6: 일요일)
    const adjustedFirstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    const days = [];

    // 이전 달의 날짜들
    const prevMonthLastDay = new Date(year, month, 0);
    for (let i = adjustedFirstDayOfWeek - 1; i >= 0; i--) {
      const day = prevMonthLastDay.getDate() - i;
      days.push(
        <Text key={`prev-${day}`} style={[styles.dateText, styles.otherMonthText]}>
          {day}
        </Text>
      );
    }

    // 현재 달의 날짜들
    const today = new Date();
    const isToday = (day: number) => {
      return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
    };

    const isSelected = (day: number) => {
      return selectedDate.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;
    };

    const isDisabled = (day: number) => {
      if (!disabledDays) return false;
      return disabledDays(day);
    };

    const checkHasReservation = (day: number) => {
      if (!hasReservation) return false;
      return hasReservation(day);
    };

    for (let day = 1; day <= lastDay.getDate(); day++) {
      const hasReservationOnDay = checkHasReservation(day);
      const disabled = isDisabled(day);

      if (isSelected(day)) {
        days.push(
          <View key={`current-${day}`} style={styles.selectedDateContainer}>
            <Text style={[styles.dateText, styles.selectedDate]}>{day}</Text>
            {showDots && <View style={hasReservationOnDay ? styles.dot : styles.dotInactive} />}
          </View>
        );
      } else if (isToday(day)) {
        days.push(
          <TouchableOpacity
            key={`current-${day}`}
            style={styles.todayDateContainer}
            onPress={() => !disabled && onDateSelect(day)}
            disabled={disabled}
          >
            <Text style={[styles.dateText, styles.todayDate]}>{day}</Text>
            {showDots && <View style={hasReservationOnDay ? styles.dot : styles.dotInactive} />}
          </TouchableOpacity>
        );
      } else {
        days.push(
          <TouchableOpacity
            key={`current-${day}`}
            style={[styles.dateContainer, disabled && styles.disabledDateContainer]}
            onPress={() => !disabled && onDateSelect(day)}
            disabled={disabled}
          >
            <Text style={[styles.dateText, disabled && styles.disabledDateText]}>{day}</Text>
            {showDots && <View style={hasReservationOnDay ? styles.dot : styles.dotInactive} />}
          </TouchableOpacity>
        );
      }
    }

    // 다음 달의 날짜들 (캘린더를 42개 셀로 맞추기 위해)
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push(
        <Text key={`next-${day}`} style={[styles.dateText, styles.otherMonthText]}>
          {day}
        </Text>
      );
    }

    return days;
  };

  return (
    <View style={styles.calendarContainer}>
      {/* 월 헤더 */}
      <View style={[styles.monthHeader, headerOnly && styles.headerOnly]}>
        <TouchableOpacity style={styles.arrowButton} onPress={onPrevMonth}>
          <Text style={styles.arrowIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>{currentMonth}</Text>
        <TouchableOpacity style={styles.arrowButton} onPress={onNextMonth}>
          <Text style={styles.arrowIcon}>›</Text>
        </TouchableOpacity>
        {showTodayButton && (
          <TouchableOpacity style={styles.todayContainer} onPress={onTodayPress}>
            <Text style={styles.todayText}>오늘</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* 캘린더 그리드 */}
      {!headerOnly && (
        <>
          {/* 요일 헤더 */}
          <View style={styles.weekdayHeader}>
            <Text style={styles.weekdayText}>월</Text>
            <Text style={styles.weekdayText}>화</Text>
            <Text style={styles.weekdayText}>수</Text>
            <Text style={styles.weekdayText}>목</Text>
            <Text style={styles.weekdayText}>금</Text>
            <Text style={styles.weekdayText}>토</Text>
            <Text style={styles.weekdayText}>일</Text>
          </View>

          <View style={styles.calendarGrid}>{generateCalendarDays()}</View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: "#FFFFFF"
  },
  monthHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    backgroundColor: "#FFFFFF"
  },
  headerOnly: {
    marginBottom: 0
  },
  arrowButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  arrowIcon: {
    fontSize: 24,
    color: "#505866",
    fontWeight: "400"
  },
  monthText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#2B2B2B",
    letterSpacing: -0.8
  },
  todayContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#F5F5F5",
    borderRadius: 16
  },
  todayText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2B2B2B",
    letterSpacing: -0.52
  },
  weekdayHeader: {
    flexDirection: "row",
    marginBottom: 10
  },
  weekdayText: {
    width: "14.28%",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "400",
    color: "#2B2B2B",
    letterSpacing: -0.56,
    minWidth: 40
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    position: "relative",
    marginBottom: 10
  },

  dateText: {
    width: "14.28%",
    height: 48,
    textAlign: "center",
    lineHeight: 50,
    fontSize: 14,
    fontWeight: "900",
    color: "#2B2B2B",
    position: "relative",
    minWidth: 40
  },
  otherMonthText: {
    color: "#B1B8C0"
  },
  selectedDateContainer: {
    width: "14.28%",
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 40,
    position: "relative"
  },

  todayDateContainer: {
    width: "14.28%",
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 40,
    position: "relative"
  },

  dateContainer: {
    width: "14.28%",
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 40
  },
  disabledDateContainer: {
    opacity: 0.5
  },
  selectedDate: {
    backgroundColor: "#B48327",
    borderRadius: 20,
    color: "#FFFFFF",
    width: 40,
    height: 40,
    textAlign: "center",
    lineHeight: 40,
    fontSize: 14,
    fontWeight: "900"
  },
  todayDate: {
    backgroundColor: "#2B2B2B",
    borderRadius: 20,
    color: "#FFFFFF",
    width: 40,
    height: 40,
    textAlign: "center",
    lineHeight: 40,
    fontSize: 14,
    fontWeight: "900"
  },
  disabledDateText: {
    color: "#B1B8C0"
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#B48327",
    position: "absolute",
    bottom: -4,
    alignSelf: "center"
  },
  dotInactive: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "transparent",
    position: "absolute",
    bottom: -8,
    alignSelf: "center"
  }
});
