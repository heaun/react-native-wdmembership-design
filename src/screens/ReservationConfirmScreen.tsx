import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
import { CommonLayout } from "../components/CommonLayout";
import { LabelText, ButtonText, SmallText } from "../components/CommonText";
import { globalStyles } from "../../styles/globalStyles";
import { ReservationMode, Reservation, ReservationType } from "../../types/reservation";

interface ReservationConfirmScreenProps {
  reservationData?: Reservation;
  onBackPress?: () => void;
  onConfirmReservation?: () => void;
  currentTab?: string;
  onTabPress?: (tabName: string) => void;
  onSideMenuItemPress?: (itemId: string) => void;
}

export const ReservationConfirmScreen: React.FC<ReservationConfirmScreenProps> = ({
  reservationData,
  onBackPress,
  onConfirmReservation,
  currentTab,
  onTabPress,
  onSideMenuItemPress
}) => {
  // 기본 데이터 (reservationData가 없을 때 사용)
  const defaultData: Reservation = {
    service: {
      id: 1,
      title: "마인드앤바디 포 어덜트",
      category: "건강 프로그램",
      tags: "자세교정, 심신안정",
      image: require("../../assets/services/service-image-1.png")
    },
    location: {
      id: 1,
      name: "서초 메디웰하우스",
      address: "서울 서초구 서초대로 396",
      image: require("../../assets/locations/mediwell-house.png")
    },
    date: "2026-10-31",
    time: "14:30",
    personCount: 1,
    type: ReservationType.SERVICE
  };

  const data = reservationData || defaultData;

  const formatDate = (dateString: string) => {
    if (!dateString) return "날짜 미정";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "날짜 미정";
      return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
    } catch (error) {
      return "날짜 미정";
    }
  };

  const formatTime = (time: string) => {
    if (!time) return "시간 미정";
    try {
      const hour = parseInt(time.split(":")[0]);
      const period = hour < 12 ? "오전" : "오후";
      const displayHour = hour <= 12 ? hour : hour - 12;
      return `${period} ${displayHour.toString().padStart(2, "0")}:${time.split(":")[1]}`;
    } catch (error) {
      return "시간 미정";
    }
  };

  const handleConfirmPress = () => {
    onConfirmReservation?.();
  };

  return (
    <CommonLayout
      title="서비스 예약하기"
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
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* 장소 정보 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.iconContainer}>
              <Image source={require("../../assets/icons/ic_location.png")} style={styles.iconStyle} />
            </View>
            <View style={styles.sectionContent}>
              <LabelText style={styles.sectionTitle}>{data.location?.name || "장소 미정"}</LabelText>
              <LabelText style={styles.sectionSubtitle}>{data.location?.address || "주소 미정"}</LabelText>
            </View>
            <Image source={require("../../assets/icons/ic-chevron-right.png")} style={globalStyles.chevron} />
          </View>
        </View>

        {/* 날짜 정보 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.iconContainer}>
              <Image source={require("../../assets/icons/ic_day.png")} style={styles.iconStyle} />
            </View>
            <View style={styles.sectionContent}>
              <LabelText style={styles.sectionTitle}>{formatDate(data.date)}</LabelText>
            </View>
            <Image source={require("../../assets/icons/ic-chevron-right.png")} style={globalStyles.chevron} />
          </View>
        </View>

        {/* 시간 정보 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.iconContainer}>
              <Image source={require("../../assets/icons/ic_time.png")} style={styles.iconStyle} />
            </View>
            <View style={styles.sectionContent}>
              <LabelText style={styles.sectionTitle}>{formatTime(data.time)}</LabelText>
            </View>
            <Image source={require("../../assets/icons/ic-chevron-right.png")} style={globalStyles.chevron} />
          </View>
        </View>

        {/* 인원 정보 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.iconContainer}>
              <Image source={require("../../assets/icons/ic_people.png")} style={styles.iconStyle} />
            </View>
            <View style={styles.sectionContent}>
              <LabelText style={styles.sectionTitle}>{data.personCount || 0}명</LabelText>
            </View>
            <Image source={require("../../assets/icons/ic-chevron-right.png")} style={globalStyles.chevron} />
          </View>
        </View>

        {/* 예약 요약 카드 */}
        <View style={[styles.summaryCard, data.type == ReservationType.PRODUCT && styles.summaryCardProduct]}>
          <LabelText style={styles.summaryTitle}>{data.service?.title || "서비스 미정"}</LabelText>
          <LabelText style={styles.summaryName}>{data.location?.name || "장소 미정"}</LabelText>
          <LabelText style={styles.summaryLocation}>({data.location?.address || "주소 미정"})</LabelText>
          <View style={styles.summaryDivider} />
          <LabelText style={styles.summaryDetails}>
            {formatDate(data.date)} {formatTime(data.time)}
          </LabelText>
          <LabelText style={styles.summaryDetails}>참여인원 : {data.personCount || 0}명</LabelText>
        </View>

        {/* 안내 메시지 */}
        <View style={styles.messageContainer}>
          <LabelText style={styles.messageText}>
            선택하신 예약 내용입니다.{"\n"}
            예약 확정을 위해 다시 한 번 확인해주세요.{"\n"}각 항목마다 변경 및 수정이 가능하며,{"\n"}
            처음부터 다시 예약을 시작하실 수 있습니다.
          </LabelText>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmPress}>
          <LabelText style={styles.confirmButtonText}> 예약 확정</LabelText>
        </TouchableOpacity>
      </View>
    </CommonLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  section: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#D6DADF"
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center"
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 30
  },
  iconStyle: {
    width: 24,
    height: 24,
    borderRadius: 4
  },

  sectionContent: {
    flex: 1
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2B2B2B",
    letterSpacing: -0.64
  },
  sectionSubtitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#79818B",
    marginTop: 4,
    letterSpacing: -0.48
  },
  messageContainer: {
    marginTop: 20
  },
  messageText: {
    fontSize: 13,
    fontWeight: "400",
    color: "#2B2B2B",
    textAlign: "center",
    lineHeight: 19,
    letterSpacing: -0.52
  },
  summaryCard: {
    marginTop: 20,
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: "#EFF1F3",
    borderRadius: 6
  },
  summaryCardProduct: {
    backgroundColor: "#FFF8C0"
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2B2B2B",
    textAlign: "center",
    marginBottom: 10,
    letterSpacing: -0.64
  },
  summaryName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2B2B2B",
    textAlign: "center",
    letterSpacing: -0.64
  },
  summaryLocation: {
    fontSize: 16,
    fontWeight: "400",
    color: "#2B2B2B",
    textAlign: "center",
    lineHeight: 24,
    letterSpacing: -0.64
  },
  summaryDivider: {
    height: 1,
    backgroundColor: "#B1B8C0",
    marginVertical: 5,
    borderStyle: "dashed"
  },
  summaryDetails: {
    fontSize: 14,
    fontWeight: "800",
    color: "#2B2B2B",
    textAlign: "center",
    lineHeight: 24,
    letterSpacing: -0.56
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EFF1F3"
  },
  confirmButton: {
    backgroundColor: "#B48327",
    borderRadius: 48,
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.64
  }
});
