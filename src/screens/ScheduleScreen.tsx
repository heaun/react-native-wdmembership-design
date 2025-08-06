import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { CommonLayout } from "../components/CommonLayout";

const { width: screenWidth } = Dimensions.get("window");

interface ScheduleScreenProps {
  onBackPress?: () => void;
  onHomePress?: () => void;
  onReservationDetailPress?: () => void;
  currentTab?: string;
  onTabPress?: (tabName: string) => void;
  onSideMenuItemPress?: (itemId: string) => void;
}

export const ScheduleScreen: React.FC<ScheduleScreenProps> = ({
  onBackPress,
  onHomePress,
  onReservationDetailPress,
  currentTab,
  onTabPress,
  onSideMenuItemPress
}) => {
  const [activeTab, setActiveTab] = useState<"calendar" | "reservation">("calendar");
  const [currentMonth, setCurrentMonth] = useState("2026년 10월");

  const reservations = [
    {
      id: 1,
      date: "31일",
      title: "마인드앤바디 포 어덜트",
      location: "서울 서초구",
      time: "오후 02:30",
      status: "예약확정"
    },
    {
      id: 2,
      date: "28일",
      title: "웰리스컴 Wellness Come",
      location: "서울 서초구",
      time: "오전11:00",
      status: "예약확정"
    },
    {
      id: 3,
      date: "26일",
      title: "웰리스컴 Wellness Come",
      location: "서울 서초구",
      time: "오후 02:30",
      status: "예약확정"
    },
    {
      id: 4,
      date: "22일",
      title: "웰리스컴 Wellness Come",
      location: "서울 서초구",
      time: "오전11:00",
      status: "예약확정"
    },
    {
      id: 5,
      date: "28일",
      title: "GCC 스크린 골프",
      location: "서울 서초구",
      time: "오후 07:00",
      status: "예약확정"
    },
    {
      id: 6,
      date: "26일",
      title: "마인드앤바디 포 어덜트",
      location: "서울 서초구",
      time: "오전 07:30",
      status: "예약확정"
    },
    {
      id: 7,
      date: "22일",
      title: "Healthy Meal Plan",
      location: "서울 서초구",
      time: "오전11:00",
      status: "예약확정"
    },
    {
      id: 8,
      date: "28일",
      title: "서울연세외과",
      location: "서울 서초구",
      time: "오후 02:30",
      status: "예약확정"
    },
    {
      id: 9,
      date: "26일",
      title: "웰리스컴 Wellness Come",
      location: "서울 서초구",
      time: "오후 02:30",
      status: "예약확정"
    },
    {
      id: 10,
      date: "22일",
      title: "Healthy Meal Plan",
      location: "서울 서초구",
      time: "오전 09:00",
      status: "예약확정"
    }
  ];

  const handleTabPress = (tab: "calendar" | "reservation") => {
    setActiveTab(tab);
  };

  const handlePrevMonth = () => {
    // 이전 달로 이동하는 로직
  };

  const handleNextMonth = () => {
    // 다음 달로 이동하는 로직
  };

  const renderCalendarView = () => (
    <ScrollView style={styles.calendarContainer} showsVerticalScrollIndicator={false}>
      {/* 월 헤더 */}
      <View style={styles.monthHeader}>
        <TouchableOpacity style={styles.arrowButton} onPress={handlePrevMonth}>
          <Text style={styles.arrowIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>{currentMonth}</Text>
        <View style={styles.todayContainer}>
          <Text style={styles.todayText}>오늘</Text>
        </View>
        <TouchableOpacity style={styles.arrowButton} onPress={handleNextMonth}>
          <Text style={styles.arrowIcon}>›</Text>
        </TouchableOpacity>
      </View>

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
      <View style={styles.calendarGrid}>
        {/* 이전 달 날짜들 */}
        <Text style={[styles.dateText, styles.otherMonthText]}>27</Text>
        <Text style={[styles.dateText, styles.otherMonthText]}>28</Text>
        <Text style={[styles.dateText, styles.otherMonthText]}>29</Text>
        <Text style={[styles.dateText, styles.otherMonthText]}>30</Text>

        {/* 현재 달 날짜들 */}
        <Text style={styles.dateText}>1</Text>
        <Text style={styles.dateText}>2</Text>
        <Text style={styles.dateText}>3</Text>
        <Text style={styles.dateText}>4</Text>
        <Text style={styles.dateText}>5</Text>
        <View style={styles.selectedDateContainer}>
          <Text style={[styles.dateText, styles.selectedDate]}>6</Text>
        </View>
        <Text style={styles.dateText}>7</Text>
        <Text style={styles.dateText}>8</Text>
        <Text style={styles.dateText}>9</Text>
        <Text style={styles.dateText}>10</Text>
        <Text style={styles.dateText}>11</Text>
        <Text style={styles.dateText}>12</Text>
        <Text style={styles.dateText}>13</Text>
        <Text style={styles.dateText}>14</Text>
        <Text style={styles.dateText}>15</Text>
        <Text style={styles.dateText}>16</Text>
        <Text style={styles.dateText}>17</Text>
        <Text style={styles.dateText}>18</Text>
        <Text style={styles.dateText}>19</Text>
        <Text style={styles.dateText}>20</Text>
        <Text style={styles.dateText}>21</Text>
        <Text style={styles.dateText}>22</Text>
        <Text style={styles.dateText}>23</Text>
        <Text style={styles.dateText}>24</Text>
        <Text style={styles.dateText}>25</Text>
        <Text style={styles.dateText}>26</Text>
        <Text style={styles.dateText}>27</Text>
        <Text style={styles.dateText}>28</Text>
        <Text style={styles.dateText}>29</Text>
        <Text style={styles.dateText}>30</Text>
        <Text style={styles.dateText}>31</Text>
      </View>

      {/* 예약 표시 점들 */}
      <View style={styles.reservationDots}>
        <View style={[styles.dot, styles.dot1]} />
        <View style={[styles.dot, styles.dot6]} />
        <View style={[styles.dot, styles.dot8]} />
        <View style={[styles.dot, styles.dot13]} />
        <View style={[styles.dot, styles.dot15]} />
        <View style={[styles.dot, styles.dot20]} />
        <View style={[styles.dot, styles.dot22]} />
        <View style={[styles.dot, styles.dot26]} />
        <View style={[styles.dot, styles.dot29]} />
      </View>

      {/* 구분선 */}
      <View style={styles.divider} />

      {/* 오늘 예약 섹션 */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>오늘 예약</Text>
          <View style={styles.sectionDot} />
        </View>
        <View style={styles.reservationCard}>
          <View style={styles.reservationImage} />
          <View style={styles.reservationInfo}>
            <Text style={styles.reservationLocation}>서울 서초구</Text>
            <Text style={styles.reservationTitle}>마인드앤바디 포 어덜트</Text>
            <Text style={styles.reservationTime}>오후 02:30</Text>
          </View>
        </View>
      </View>

      {/* 구분선 */}
      <View style={styles.divider} />

      {/* 추천 서비스 섹션 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>추천 서비스</Text>
        <View style={styles.reservationCard}>
          <View style={styles.reservationImage} />
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
    const groupedReservations = reservations.reduce((groups, reservation) => {
      const date = reservation.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(reservation);
      return groups;
    }, {} as Record<string, typeof reservations>);

    return (
      <ScrollView style={styles.reservationContainer} showsVerticalScrollIndicator={false}>
        {Object.entries(groupedReservations).map(([date, dateReservations]) => (
          <View key={date} style={styles.dateSection}>
            <Text style={styles.dateTitle}>{date}</Text>
            {dateReservations.map((reservation) => (
              <TouchableOpacity key={reservation.id} style={styles.reservationItem} onPress={onReservationDetailPress}>
                <View style={styles.reservationContent}>
                  <Text style={styles.reservationTitle}>{reservation.title}</Text>
                  <Text style={styles.reservationLocation}>{reservation.location}</Text>
                  <Text style={styles.reservationTime}>{reservation.time}</Text>
                </View>
                <View style={styles.reservationStatus}>
                  <Text style={styles.statusText}>{reservation.status}</Text>
                </View>
              </TouchableOpacity>
            ))}
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

      {/* Content */}
      {activeTab === "calendar" ? renderCalendarView() : renderReservationView()}
    </CommonLayout>
  );
};

const styles = StyleSheet.create({
  notificationIcon: {
    fontSize: 18,
    color: "#2B2B2B"
  },
  notificationBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 6,
    height: 6,
    backgroundColor: "#ECA31D",
    borderRadius: 3
  },
  couponButton: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center"
  },
  couponIcon: {
    fontSize: 18,
    color: "#2B2B2B"
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EFF1F3"
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
    flex: 1,
    paddingTop: 20
  },
  monthHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
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
    flex: 1,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "400",
    color: "#2B2B2B"
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
    position: "relative"
  },
  dateText: {
    width: "14.28%",
    height: 48,
    textAlign: "center",
    lineHeight: 48,
    fontSize: 16,
    fontWeight: "900",
    color: "#2B2B2B",
    position: "relative"
  },
  otherMonthText: {
    color: "#B1B8C0"
  },
  selectedDateContainer: {
    width: "14.28%",
    height: 48,
    justifyContent: "center",
    alignItems: "center"
  },
  selectedDate: {
    backgroundColor: "#2B2B2B",
    borderRadius: 24,
    color: "#FFFFFF",
    width: 48,
    height: 48,
    textAlign: "center",
    lineHeight: 48
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
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#B48327",
    position: "absolute"
  },
  dot1: { top: 70, left: 125 },
  dot6: { top: 166, left: 221 },
  dot8: { top: 214, left: 77 },
  dot13: { top: 262, left: 125 },
  dot15: { top: 310, left: 77 },
  dot20: { top: 406, left: 125 },
  dot22: { top: 454, left: 77 },
  dot26: { top: 550, left: 125 },
  dot29: { top: 550, left: 221 },
  reservationContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20
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
    borderWidth: 1,
    borderColor: "#D6DADF",
    borderRadius: 6,
    padding: 15,
    marginBottom: 10
  },
  reservationContent: {
    flex: 1
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
    alignItems: "center"
  },
  statusText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#FFFFFF"
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
    marginVertical: 20,
    marginHorizontal: 20
  },
  section: {
    marginBottom: 20
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#2B2B2B"
  },
  sectionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#B48327",
    marginLeft: 5
  },
  reservationCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D6DADF",
    borderRadius: 6,
    padding: 15,
    alignItems: "center"
  },
  reservationImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E0E0E0",
    marginRight: 15
  },
  reservationInfo: {
    flex: 1
  }
});
