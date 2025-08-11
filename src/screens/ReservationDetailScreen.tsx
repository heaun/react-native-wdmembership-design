import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image } from "react-native";
import { CommonModal } from "../components/CommonModal";
import { CommonLayout } from "../components/CommonLayout";
import Toast from "react-native-toast-message";

interface ReservationData {
  id: string;
  title: string;
  instructor: string;
  date: string;
  time: string;
  location: string;
  status: "confirmed" | "pending" | "cancelled";
  image: any;
  description: string;
  cancellationPolicy: string;
  additionalInfo: string;
}

interface ReservationDetailScreenProps {
  reservationData?: ReservationData;
  onBackPress?: () => void;
  onReservationStart?: () => void;
  currentTab?: string;
  onTabPress?: (tabName: string) => void;
  onSideMenuItemPress?: (itemId: string) => void;
}

const { width } = Dimensions.get("window");

export const ReservationDetailScreen: React.FC<ReservationDetailScreenProps> = ({
  reservationData,
  onBackPress,
  onReservationStart,
  currentTab,
  onTabPress,
  onSideMenuItemPress
}) => {
  const [isCancelModalVisible, setIsCancelModalVisible] = React.useState(false);

  // 기본 데이터 (reservationData가 없을 때 사용)
  const defaultData: ReservationData = {
    id: "1",
    title: "마인드 앤 바디 포 어덜트",
    instructor: "최다니엘 강사",
    date: "2026년 10월 31 (금)",
    time: "오후 02:30 ~03:30",
    location: "서초 메디웰하우스 1층 마인드앤바디 201",
    status: "confirmed",
    image: require("../assets/main/reservation-1.png"),
    description: "호흡의 리듬을 따라 자연스럽게 자세를 교정하고 바른 신체 연결동작을 통해 체형교정및 심신안정을 찾도록 도움을 드립니다.",
    cancellationPolicy: "예약변경은 클래스 시작 4시간 전까지 가능합니다.\n클래스 시작 2시간 전까지 예약취소 가능합니다.",
    additionalInfo: "예약된 회원분만 참여 가능하며, 양도나 대리 수업참관을 지양합니다."
  };

  const data = reservationData || defaultData;

  const handleReservationPress = () => {
    // 새로운 예약 시작
    onReservationStart?.();
  };

  const handleCancelPress = () => {
    setIsCancelModalVisible(true);
  };

  const handleConfirmCancel = () => {
    setIsCancelModalVisible(false);
    Toast.show({
      type: "success",
      text1: "예약 취소",
      text2: "예약이 성공적으로 취소되었습니다.",
      position: "top",
      visibilityTime: 2000
    });

    // 토스트가 끝나면 나의 예약 메인으로 이동
    onBackPress?.();
  };

  const handleCancelModalClose = () => {
    setIsCancelModalVisible(false);
  };

  return (
    <>
      <CommonLayout
        title={data.title}
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
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {/* 예약 이미지 */}
          <Image source={data.image} style={styles.reservationImage} resizeMode="cover" />

          {/* 예약 상태 배지 */}
          <View style={styles.statusContainer}>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{data.status === "confirmed" ? "예약확정" : data.status === "pending" ? "예약대기" : "예약취소"}</Text>
            </View>
          </View>

          {/* 클래스 제목 */}
          <Text style={styles.classTitle}>{data.title}</Text>

          {/* 예약 정보 */}
          <View style={styles.infoContainer}>
            {/* 강사 정보 */}
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>강사</Text>
              <Text style={styles.infoValue}>{data.instructor}</Text>
            </View>

            {/* 일정 정보 */}
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>일정</Text>
              <Text style={styles.infoValue}>
                {data.date} {data.time}
              </Text>
            </View>

            {/* 장소 정보 */}
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>장소</Text>
              <Text style={styles.infoValue}>{data.location}</Text>
            </View>

            {/* 구분선 */}
            <View style={styles.divider} />

            {/* 예약 변경/취소 안내 */}
            <Text style={styles.infoLabel}>예약 취소 및 변경</Text>
            <Text style={styles.infoDescription}>{data.cancellationPolicy}</Text>

            {/* 부가정보 */}
            <Text style={styles.infoLabel}>부가정보</Text>
            <Text style={styles.infoDescription}>
              {data.additionalInfo}
              {"\n"}
              {data.description}
            </Text>
          </View>
        </ScrollView>

        {/* 하단 버튼 */}
        <View style={styles.bottomButtonContainer}>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.changeButton}>
              <Text style={styles.changeButtonText}>예약변경</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancelPress}>
              <Text style={styles.cancelButtonText}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CommonLayout>

      {/* 예약 취소 팝오버 모달 - 전체 화면 오버레이 */}
      {isCancelModalVisible && (
        <View style={styles.popoverOverlay}>
          <View style={styles.popoverContainer}>
            <View style={styles.popoverContent}>
              <Text style={styles.popoverTitle}>예약취소</Text>
              <Text style={styles.popoverMessage}>예약을 취소하시겠습니까?</Text>
              <View style={styles.popoverButtonContainer}>
                <TouchableOpacity style={styles.popoverPrimaryButton} onPress={handleConfirmCancel}>
                  <Text style={styles.popoverPrimaryButtonText}>네, 취소하겠습니다.</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.popoverSecondaryButton} onPress={handleCancelModalClose}>
                  <Text style={styles.popoverSecondaryButtonText}>아니요</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  reservationImage: {
    width: width - 40,
    height: 160,
    borderRadius: 15,
    marginHorizontal: 20,
    marginTop: 20
  },
  statusContainer: {
    position: "absolute",
    top: 124,
    right: 35,
    zIndex: 1
  },
  statusBadge: {
    backgroundColor: "#B48327",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    minWidth: 60,
    alignItems: "center"
  },
  statusText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700"
  },
  classTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#2B2B2B",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20
  },
  infoContainer: {
    paddingHorizontal: 20
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "flex-start"
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#79818B",
    width: 60,
    marginRight: 20
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "800",
    color: "#2B2B2B",
    flex: 1,
    lineHeight: 20
  },
  divider: {
    height: 1,
    backgroundColor: "#B1B8C0",
    marginVertical: 20
  },
  infoDescription: {
    fontSize: 14,
    fontWeight: "800",
    color: "#2B2B2B",
    lineHeight: 24,
    marginBottom: 20
  },
  bottomButtonContainer: {
    paddingHorizontal: 24,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#EFF1F3"
  },
  bottomButton: {
    backgroundColor: "#B48327",
    borderRadius: 48,

    justifyContent: "center",
    alignItems: "center"
  },
  bottomButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700"
  },
  buttonRow: {
    flexDirection: "row",
    gap: 14
  },
  changeButton: {
    flex: 1,
    height: 50,
    backgroundColor: "#2B2B2B",
    borderRadius: 48,
    justifyContent: "center",
    alignItems: "center"
  },
  changeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700"
  },
  cancelButton: {
    width: 120,
    height: 50,
    backgroundColor: "#E68188",
    borderRadius: 48,
    justifyContent: "center",
    alignItems: "center"
  },
  cancelButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700"
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20
  },
  modalMessage: {
    fontSize: 16,
    color: "#505866",
    textAlign: "center",
    marginBottom: 30
  },
  modalButtonContainer: {
    flexDirection: "row",
    gap: 15
  },
  modalButton: {
    backgroundColor: "#2B2B2B",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 100,
    alignItems: "center"
  },
  modalButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600"
  },
  popoverOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(43, 43, 43, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },
  popoverContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
    marginHorizontal: 24,
    minWidth: 327,
    alignItems: "center"
  },
  popoverContent: {
    alignItems: "center",
    gap: 24
  },
  popoverTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#2B2B2B",
    textAlign: "center"
  },
  popoverMessage: {
    fontSize: 16,
    fontWeight: "400",
    color: "#505866",
    textAlign: "center",
    lineHeight: 24,
    letterSpacing: -0.64
  },
  popoverButtonContainer: {
    flexDirection: "column",
    gap: 12,
    width: 279
  },
  popoverPrimaryButton: {
    backgroundColor: "#2B2B2B",
    borderRadius: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    width: 279
  },
  popoverPrimaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700"
  },
  popoverSecondaryButton: {
    backgroundColor: "transparent",
    borderRadius: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    width: 279
  },
  popoverSecondaryButtonText: {
    color: "#6C7072",
    fontSize: 16,
    fontWeight: "700"
  }
});
