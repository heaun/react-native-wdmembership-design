import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, Image } from "react-native";
import { CommonLayout } from "../components/CommonLayout";

const { width: screenWidth } = Dimensions.get("window");

interface ScheduleScreenProps {
  onBackPress?: () => void;
  onHomePress?: () => void;
  onReservationDetailPress?: (reservationData: any) => void;
  currentTab?: string;
  onTabPress?: (tabName: string) => void;
  onSideMenuItemPress?: (itemId: string) => void;
  newReservation?: {
    service: any;
    location: any;
    date: string;
    time: string;
    personCount: number;
  };
}

export const ScheduleScreen: React.FC<ScheduleScreenProps> = ({
  onBackPress,
  onHomePress,
  onReservationDetailPress,
  currentTab,
  onTabPress,
  onSideMenuItemPress,
  newReservation
}) => {
  const [activeTab, setActiveTab] = useState<"calendar" | "reservation">("calendar");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // 현재 월을 문자열로 표시
  const currentMonth = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`;

  // 새로운 예약이 있으면 예약 관리 탭으로 이동
  useEffect(() => {
    if (newReservation) {
      setActiveTab("reservation");
    }
  }, [newReservation]);

  const baseReservations = [
    {
      id: "1",
      title: "마인드 앤 바디 포 어덜트",
      instructor: "최다니엘 강사",
      date: "2025-08-31",
      time: "오후 02:30 ~03:30",
      location: "서초 메디웰하우스 1층 마인드앤바디 201",
      status: "confirmed",
      image: require("../assets/main/reservation-1.png"),
      description: "호흡의 리듬을 따라 자연스럽게 자세를 교정하고 바른 신체 연결동작을 통해 체형교정및 심신안정을 찾도록 도움을 드립니다.",
      cancellationPolicy: "예약변경은 클래스 시작 4시간 전까지 가능합니다.\n클래스 시작 2시간 전까지 예약취소 가능합니다.",
      additionalInfo: "예약된 회원분만 참여 가능하며, 양도나 대리 수업참관을 지양합니다."
    },
    {
      id: "2",
      title: "웰리스컴 Wellness Come",
      instructor: "김영희 강사",
      date: "2025-08-28",
      time: "오전 11:00 ~12:00",
      location: "서초 메디웰하우스 2층 웰니스존",
      status: "confirmed",
      image: require("../assets/main/reservation-1.png"),
      description: "전문적인 운동 프로그램을 통해 체력 향상과 건강한 라이프스타일을 만들어갑니다.",
      cancellationPolicy: "예약변경은 클래스 시작 4시간 전까지 가능합니다.\n클래스 시작 2시간 전까지 예약취소 가능합니다.",
      additionalInfo: "예약된 회원분만 참여 가능하며, 양도나 대리 수업참관을 지양합니다."
    },
    {
      id: "3",
      title: "GCC 스크린 골프",
      instructor: "박지훈 프로",
      date: "2025-08-26",
      time: "오후 07:00 ~08:00",
      location: "서초 골프연습장 3층",
      status: "pending",
      image: require("../assets/main/reservation-1.png"),
      description: "스크린 골프를 통해 실전과 유사한 환경에서 골프 실력을 향상시킵니다.",
      cancellationPolicy: "예약변경은 클래스 시작 4시간 전까지 가능합니다.\n클래스 시작 2시간 전까지 예약취소 가능합니다.",
      additionalInfo: "예약된 회원분만 참여 가능하며, 양도나 대리 수업참관을 지양합니다."
    },
    {
      id: "4",
      title: "Healthy Meal Plan",
      instructor: "이미영 영양사",
      date: "2025-08-22",
      time: "오전 09:00 ~10:00",
      location: "서초 메디웰하우스 1층 영양상담실",
      status: "completed",
      image: require("../assets/main/reservation-1.png"),
      description: "개인 맞춤형 영양 상담을 통해 건강한 식습관을 형성합니다.",
      cancellationPolicy: "예약변경은 클래스 시작 4시간 전까지 가능합니다.\n클래스 시작 2시간 전까지 예약취소 가능합니다.",
      additionalInfo: "예약된 회원분만 참여 가능하며, 양도나 대리 수업참관을 지양합니다."
    }
  ];

  // 새로운 예약이 있으면 목록 맨 위에 추가
  const allReservations = React.useMemo(() => {
    if (newReservation) {
      const newReservationItem = {
        id: Date.now(), // 고유 ID 생성
        date: newReservation.date, // 이미 YYYY-MM-DD 형식
        title: newReservation.service.title,
        location: newReservation.location.address,
        time: newReservation.time,
        status: "예약확정"
      };
      return [newReservationItem, ...baseReservations];
    }
    return baseReservations;
  }, [newReservation]);

  const handleTabPress = (tab: "calendar" | "reservation") => {
    setActiveTab(tab);
  };

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const handleTodayPress = () => {
    const today = new Date();
    setSelectedDate(today);
    setCurrentDate(today);
  };

  const handleDateSelect = (day: number) => {
    const newSelectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newSelectedDate);
  };

  // 예약 상태에 따른 배지 스타일 반환
  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "confirmed":
        return styles.statusConfirmed;
      case "pending":
        return styles.statusPending;
      case "completed":
        return styles.statusCompleted;
      default:
        return styles.statusConfirmed;
    }
  };

  // 예약 상태 텍스트 변환
  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "예약확정";
      case "pending":
        return "예약대기";
      case "completed":
        return "이용완료";
      default:
        return "예약확정";
    }
  };

  // 선택된 날짜의 예약 목록 가져오기
  const getReservationsForSelectedDate = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    const day = selectedDate.getDate();
    const selectedDateString = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    return allReservations.filter((reservation: any) => {
      return reservation.date === selectedDateString;
    });
  };

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

    // 예약이 있는 날짜들 확인
    const hasReservation = (day: number) => {
      const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      return allReservations.some((reservation: any) => reservation.date === dateString);
    };

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

    for (let day = 1; day <= lastDay.getDate(); day++) {
      const hasReservationOnDay = hasReservation(day);

      if (isSelected(day)) {
        days.push(
          <View key={`current-${day}`} style={styles.selectedDateContainer}>
            <Text style={[styles.dateText, styles.selectedDate]}>{day}</Text>
            <View style={hasReservationOnDay ? styles.dot : styles.dotInactive} />
          </View>
        );
      } else if (isToday(day)) {
        days.push(
          <TouchableOpacity key={`current-${day}`} style={styles.todayDateContainer} onPress={() => handleDateSelect(day)}>
            <Text style={[styles.dateText, styles.todayDate]}>{day}</Text>
            <View style={hasReservationOnDay ? styles.dot : styles.dotInactive} />
          </TouchableOpacity>
        );
      } else {
        days.push(
          <TouchableOpacity key={`current-${day}`} style={styles.dateContainer} onPress={() => handleDateSelect(day)}>
            <Text style={styles.dateText}>{day}</Text>
            <View style={hasReservationOnDay ? styles.dot : styles.dotInactive} />
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

  const renderCalendarView = () => (
    <ScrollView style={styles.calendarContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
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

        {/* 캘린더 그리드 */}
        <View style={styles.calendarGrid}>{generateCalendarDays()}</View>
      </View>

      {/* 선택된 날짜의 예약 섹션 */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>오늘 예약</Text>
        </View>

        {getReservationsForSelectedDate().length > 0 ? (
          getReservationsForSelectedDate().map((reservation: any, index: number) => {
            // ReservationDetailScreen에서 사용할 수 있는 형식으로 변환

            return (
              <TouchableOpacity key={index} style={styles.reservationCard} onPress={() => onReservationDetailPress?.(reservation)}>
                <Image source={require("../assets/main/reservation-1.png")} style={styles.reservationImage} resizeMode="cover" />
                <View style={styles.reservationInfo}>
                  <Text style={styles.reservationLocation}>{reservation.location}</Text>
                  <Text style={styles.reservationTitle}>{reservation.title}</Text>
                  <Text style={styles.reservationTime}>{reservation.time}</Text>
                </View>
                <View style={[styles.reservationStatus, getStatusBadgeStyle(reservation.status)]}>
                  <Text style={styles.statusText}>{getStatusText(reservation.status)}</Text>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <View style={styles.noReservationCard}>
            <Text style={styles.noReservationText}>예약된 일정이 없습니다.</Text>
          </View>
        )}

        {/* 추천 서비스 섹션 */}

        <View style={[styles.sectionHeader, { marginTop: 20 }]}>
          <Text style={styles.sectionTitle}>추천 서비스</Text>
        </View>

        <View style={styles.reservationCard}>
          <Image source={require("../assets/services/service-image-1.png")} style={styles.reservationImage} resizeMode="cover" />
          <View style={styles.reservationInfo}>
            <Text style={styles.reservationLocation}>건강 프로그램</Text>
            <Text style={styles.reservationTitle}>웰리스컴 Wellness Come</Text>
            <Text style={styles.reservationTime}>#회복운동 #기초체력강화</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  const renderReservationView = () => {
    // 날짜별로 예약을 그룹화
    const groupedReservations = allReservations.reduce((groups: any, reservation: any) => {
      const date = reservation.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(reservation);
      return groups;
    }, {});

    return (
      <ScrollView style={styles.reservationContainer} showsVerticalScrollIndicator={false}>
        {Object.entries(groupedReservations).map(([date, dateReservations]: [string, any]) => (
          <View key={date} style={styles.dateSection}>
            <Text style={styles.dateTitle}>{new Date(date).getDate()}일</Text>
            {dateReservations.map((reservation: any) => {
              // ReservationDetailScreen에서 사용할 수 있는 형식으로 변환
              return (
                <TouchableOpacity key={reservation.id} style={styles.reservationItem} onPress={() => onReservationDetailPress?.(reservation)}>
                  <View style={styles.reservationContent}>
                    <Text style={styles.reservationTitle}>{reservation.title}</Text>
                    <Text style={styles.reservationLocation}>
                      {reservation.location} <Text style={styles.reservationTime}> | {reservation.time}</Text>
                    </Text>
                  </View>
                  <View style={[styles.reservationStatus, getStatusBadgeStyle(reservation.status)]}>
                    <Text style={styles.statusText}>{getStatusText(reservation.status)}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </ScrollView>
    );
  };

  return (
    <CommonLayout
      title="나의 일정"
      showBackButton={false}
      onMenuPress={() => console.log("메뉴 버튼 클릭")}
      onCouponPress={() => console.log("쿠폰 버튼 클릭")}
      onNotificationPress={() => console.log("알림 버튼 클릭")}
      currentTab={currentTab}
      onTabPress={onTabPress}
      onSideMenuItemPress={onSideMenuItemPress}
      isWideLayout={true}
    >
      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tabButton, activeTab === "calendar" && styles.activeTabButton]} onPress={() => handleTabPress("calendar")}>
          <Text style={[styles.tabText, activeTab === "calendar" && styles.activeTabText]}>캘린더</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "reservation" && styles.activeTabButton]}
          onPress={() => handleTabPress("reservation")}
        >
          <Text style={[styles.tabText, activeTab === "reservation" && styles.activeTabText]}>예약 관리</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.monthHeaderContainer}>
        {/* 월 헤더 */}
        <View style={styles.monthHeader}>
          <TouchableOpacity style={styles.arrowButton} onPress={handlePrevMonth}>
            <Text style={styles.arrowIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.monthText}>{currentMonth}</Text>
          <TouchableOpacity style={styles.arrowButton} onPress={handleNextMonth}>
            <Text style={styles.arrowIcon}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.todayContainer} onPress={handleTodayPress}>
            <Text style={styles.todayText}>오늘</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Content */}
      {activeTab === "calendar" ? renderCalendarView() : renderReservationView()}
    </CommonLayout>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#EFF1F3",
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF"
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 15
  },
  activeTabButton: {
    borderBottomWidth: 4,
    borderBottomColor: "#B48327"
  },
  tabText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#B1B8C0"
  },
  activeTabText: {
    color: "#2B2B2B"
  },
  calendarContainer: {
    flex: 1
  },
  monthHeaderContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF"
  },
  monthHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#FFFFFF"
  },
  arrowButton: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center"
  },
  arrowIcon: {
    fontSize: 20,
    color: "#505866"
  },
  monthText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#2B2B2B"
  },
  todayContainer: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D6DADF",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 3
  },
  todayText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2B2B2B"
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
    minWidth: 40
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    position: "relative",
    marginBottom: 10,
    backgroundColor: "#FFFFFF"
  },
  dateText: {
    width: "14.28%",
    height: 48,
    textAlign: "center",
    lineHeight: 48,
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
  selectedDate: {
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
  todayDateContainer: {
    width: "14.28%",
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 40,
    position: "relative"
  },
  todayDate: {
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
  dateContainer: {
    width: "14.28%",
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 40
  },
  reservationDots: {
    position: "absolute",
    top: 120,
    left: 20,
    right: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    pointerEvents: "none"
  },

  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#B48327",
    position: "absolute",
    bottom: 0,
    marginBottom: -5,
    alignSelf: "center"
  },
  dotInactive: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 0,
    alignSelf: "center"
  },

  reservationContainer: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20
  },
  dateSection: {
    marginBottom: 20
  },
  dateTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2B2B2B",
    marginBottom: 10
  },
  reservationItem: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#EFF1F3",
    marginBottom: 3
  },
  reservationContent: {
    flex: 1,
    justifyContent: "center"
  },
  reservationTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2B2B2B",
    marginBottom: 5
  },
  reservationLocation: {
    fontSize: 12,
    fontWeight: "700",
    color: "#505866",
    marginBottom: 5
  },
  reservationTime: {
    fontSize: 12,
    fontWeight: "700",
    color: "#505866"
  },
  reservationStatus: {
    backgroundColor: "#B48327",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    height: 23,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10
  },
  statusText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#FFFFFF"
  },
  statusConfirmed: {
    backgroundColor: "#B48327"
  },
  statusPending: {
    backgroundColor: "#CAB8A2"
  },
  statusCompleted: {
    backgroundColor: "#B1B8C0"
  },
  bottomTabBar: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EFF1F3",
    paddingBottom: 20
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 4
  },

  divider: {
    height: 1,
    backgroundColor: "#EFF1F3",
    marginBottom: 20
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: "#FFFFFF"
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EFF1F3"
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#2B2B2B"
  },

  reservationCard: {
    flexDirection: "row",
    borderRadius: 6,
    alignItems: "center",
    paddingVertical: 10,
    justifyContent: "space-between"
  },
  reservationImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E0E0E0",
    marginRight: 15
  },
  reservationInfo: {
    flex: 1,
    marginRight: 10
  },
  noReservationCard: {
    backgroundColor: "#F8F9FA",
    borderRadius: 6,
    padding: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  noReservationText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#79818B",
    textAlign: "center"
  }
});
