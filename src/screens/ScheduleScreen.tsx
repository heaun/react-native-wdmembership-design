import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, Image } from "react-native";
import { CommonLayout } from "../components/CommonLayout";
import { Calendar } from "../components/Calendar";
import { LabelText, ButtonText, SmallText } from "../components/CommonText";
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
      image: require("../../assets/main/reservation-1.png"),
      description: "호흡의 리듬을 따라 자연스럽게 자세를 교정하고 바른 신체 연결동작을 통해 체형교정및 심신안정을 찾도록 도움을 드립니다.",
      cancellationPolicy: "예약변경은 클래스 시작 4시간 전까지 가능합니다.\n클래스 시작 2시간 전까지 예약취소 가능합니다.",
      additionalInfo: "예약된 회원분만 참여 가능하며, 양도나 대리 수업참관을 지양합니다."
    },
    {
      id: "2",
      title: "웰리스컴 Wellness Come",
      instructor: "김영희 강사",
      date: "2025-08-31",
      time: "오전 11:00 ~12:00",
      location: "서초 메디웰하우스 2층 웰니스존",
      status: "confirmed",
      image: require("../../assets/main/reservation-1.png"),
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
      image: require("../../assets/main/reservation-1.png"),
      description: "스크린 골프를 통해 실전과 유사한 환경에서 골프 실력을 향상시킵니다.",
      cancellationPolicy: "예약변경은 클래스 시작 4시간 전까지 가능합니다.\n클래스 시작 2시간 전까지 예약취소 가능합니다.",
      additionalInfo: "예약된 회원분만 참여 가능하며, 양도나 대리 수업참관을 지양합니다."
    },
    {
      id: "4",
      title: "Healthy Meal Plan",
      instructor: "이미영 영양사",
      date: "2025-08-22",
      startTime: "09:00",
      time: "오전 09:00 ~10:00",
      location: "서초 메디웰하우스 1층 영양상담실",
      status: "confirmed",
      image: require("../../assets/main/reservation-1.png"),
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

  // 예약이 있는 날짜들 확인
  const hasReservation = (day: number) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return allReservations.some((reservation: any) => reservation.date === dateString);
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

  const renderCalendarView = () => (
    <ScrollView style={styles.calendarContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Calendar
          currentDate={currentDate}
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onTodayPress={handleTodayPress}
          showTodayButton={true}
          showDots={true}
          hasReservation={hasReservation}
          mode="schedule"
        />
      </View>

      {/* 선택된 날짜의 예약 섹션 */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <LabelText style={styles.sectionTitle}>오늘 예약</LabelText>
        </View>

        {getReservationsForSelectedDate().length > 0 ? (
          getReservationsForSelectedDate().map((reservation: any, index: number) => {
            // ReservationDetailScreen에서 사용할 수 있는 형식으로 변환

            return (
              <TouchableOpacity
                key={index}
                style={[styles.reservationCard, reservation.status === "completed" && { opacity: 0.6 }]}
                onPress={() => {
                  // 이용완료 상태가 아닌 경우에만 상세 페이지로 이동
                  if (reservation.status !== "completed") {
                    onReservationDetailPress?.(reservation);
                  }
                }}
                disabled={reservation.status === "completed"}
              >
                <Image source={require("../../assets/main/reservation-1.png")} style={styles.reservationImage} resizeMode="cover" />
                <View style={styles.reservationInfo}>
                  <LabelText style={styles.reservationLocation}>{reservation.location}</LabelText>
                  <LabelText style={styles.reservationTitle}>{reservation.title}</LabelText>
                  <LabelText style={styles.reservationTime}>{reservation.time}</LabelText>
                </View>
                <View style={[styles.reservationStatus, getStatusBadgeStyle(reservation.status)]}>
                  <LabelText style={styles.statusText}>{getStatusText(reservation.status)}</LabelText>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <View style={styles.noReservationCard}>
            <LabelText style={styles.noReservationText}>예약된 일정이 없습니다.</LabelText>
          </View>
        )}

        {/* 추천 서비스 섹션 */}

        <View style={[styles.sectionHeader, { marginTop: 20 }]}>
          <LabelText style={styles.sectionTitle}>추천 서비스</LabelText>
        </View>

        <View style={styles.reservationCard}>
          <Image source={require("../../assets/services/service-image-1.png")} style={styles.reservationImage} resizeMode="cover" />
          <View style={styles.reservationInfo}>
            <LabelText style={styles.reservationLocation}>건강 프로그램</LabelText>
            <LabelText style={styles.reservationTitle}>웰리스컴 Wellness Come</LabelText>
            <LabelText style={styles.reservationTime}>#회복운동 #기초체력강화</LabelText>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  const renderReservationView = () => {
    // 현재 월의 예약만 필터링
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const monthReservations = allReservations.filter((reservation: any) => {
      const reservationDate = new Date(reservation.date);
      return reservationDate.getFullYear() === currentYear && reservationDate.getMonth() + 1 === currentMonth;
    });

    // 날짜별로 예약을 그룹화하고 정렬
    const groupedReservations = monthReservations.reduce((groups: any, reservation: any) => {
      const date = reservation.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(reservation);
      return groups;
    }, {});

    // 각 날짜 그룹 내에서 시간 역순으로 정렬
    Object.keys(groupedReservations).forEach((date) => {
      groupedReservations[date].sort((a: any, b: any) => {
        // 시간을 비교하여 역순 정렬 (최신 시간이 위로)
        const timeA = a.time;
        const timeB = b.time;

        // 오후 > 오전 순서로 정렬
        if (timeA.includes("오후") && timeB.includes("오전")) return -1;
        if (timeA.includes("오전") && timeB.includes("오후")) return 1;

        // 같은 오전/오후 내에서는 시간 숫자로 비교
        const timeAStr = timeA.replace(/[^0-9]/g, "");
        const timeBStr = timeB.replace(/[^0-9]/g, "");

        return parseInt(timeBStr) - parseInt(timeAStr);
      });
    });

    // 날짜를 역순으로 정렬
    const sortedDates = Object.keys(groupedReservations).sort((a, b) => {
      return new Date(b).getTime() - new Date(a).getTime();
    });

    return (
      <ScrollView style={styles.reservationContainer} showsVerticalScrollIndicator={false}>
        {/* 캘린더 헤더만 */}
        <View style={styles.section}>
          <Calendar
            currentDate={currentDate}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            onTodayPress={handleTodayPress}
            showTodayButton={true}
            showDots={false}
            hasReservation={hasReservation}
            mode="schedule"
            headerOnly={true}
          />
        </View>

        {/* 예약 리스트 */}
        <View style={styles.reservationListContainer}>
          {sortedDates.length > 0 ? (
            sortedDates.map((date: string) => {
              const dateReservations = groupedReservations[date];
              return (
                <View key={date} style={styles.dateGroup}>
                  <LabelText style={styles.dateTitle}>{new Date(date).getDate()}일</LabelText>
                  <View style={styles.reservationsContainer}>
                    {dateReservations.map((reservation: any, index: number) => {
                      return (
                        <TouchableOpacity
                          key={reservation.id}
                          style={[styles.reservationItem, reservation.status === "completed" && { opacity: 0.6 }]}
                          onPress={() => {
                            // 이용완료 상태가 아닌 경우에만 상세 페이지로 이동
                            if (reservation.status !== "completed") {
                              onReservationDetailPress?.(reservation);
                            }
                          }}
                          disabled={reservation.status === "completed"}
                        >
                          <View style={styles.reservationContent}>
                            <LabelText style={styles.reservationTitle}>{reservation.title}</LabelText>
                            <LabelText style={styles.reservationLocation}>{reservation.location}</LabelText>
                            <LabelText style={styles.reservationTime}>{reservation.time}</LabelText>
                          </View>
                          <View style={[styles.reservationStatus, getStatusBadgeStyle(reservation.status)]}>
                            <LabelText style={styles.statusText}>{getStatusText(reservation.status)}</LabelText>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              );
            })
          ) : (
            <View style={styles.noReservationContainer}>
              <LabelText style={styles.noReservationText}>이번 달 예약이 없습니다.</LabelText>
            </View>
          )}
        </View>
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
          <LabelText style={[styles.tabText, activeTab === "calendar" && styles.activeTabText]}>캘린더</LabelText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "reservation" && styles.activeTabButton]}
          onPress={() => handleTabPress("reservation")}
        >
          <LabelText style={[styles.tabText, activeTab === "reservation" && styles.activeTabText]}>예약 관리</LabelText>
        </TouchableOpacity>
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

  reservationContainer: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  dateSection: {
    marginBottom: 10
  },
  dateGroup: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "flex-start"
  },
  dateTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2B2B2B",
    marginBottom: 10,
    width: 60,
    paddingVertical: 10
  },
  reservationsContainer: {
    flex: 1
  },
  reservationListContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20
  },
  reservationContent: {
    flex: 1,
    justifyContent: "center"
  },
  reservationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    gap: 20
  },
  reservationTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2B2B2B",
    flex: 1
  },
  reservationLocation: {
    fontSize: 12,
    color: "#505866",
    paddingTop: 10
  },
  reservationTime: {
    fontSize: 12,
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
    marginRight: 10
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
  reservationItem: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EFF1F3"
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
    marginRight: 10,
    gap: 5
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
  },
  noReservationContainer: {
    padding: 40,
    alignItems: "center",
    justifyContent: "center"
  }
});
