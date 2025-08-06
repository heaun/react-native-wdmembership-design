import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image } from "react-native";
import { CommonModal } from "../components/CommonModal";
import { CommonLayout } from "../components/CommonLayout";
import Toast from "react-native-toast-message";

interface ReservationDetailScreenProps {
  onBackPress?: () => void;
  currentTab?: string;
  onTabPress?: (tabName: string) => void;
  onSideMenuItemPress?: (itemId: string) => void;
}

const { width } = Dimensions.get("window");

export const ReservationDetailScreen: React.FC<ReservationDetailScreenProps> = ({ onBackPress, currentTab, onTabPress, onSideMenuItemPress }) => {
  const [isReservationModalVisible, setIsReservationModalVisible] = React.useState(false);
  const [isCancelModalVisible, setIsCancelModalVisible] = React.useState(false);
  const [isReserved, setIsReserved] = React.useState(false);

  const handleReservationPress = () => {
    if (isReserved) {
      return;
    }
    setIsReservationModalVisible(true);
  };

  const handleConfirmReservation = () => {
    setIsReservationModalVisible(false);
    setIsReserved(true);
    Toast.show({
      type: "success",
      text1: "예약 완료",
      text2: "예약이 성공적으로 완료되었습니다.",
      position: "top",
      visibilityTime: 2000
    });
  };

  const handleCancelReservationModal = () => {
    setIsReservationModalVisible(false);
  };

  const handleCancelPress = () => {
    setIsCancelModalVisible(true);
  };

  const handleConfirmCancel = () => {
    setIsCancelModalVisible(false);
    setIsReserved(false);
    Toast.show({
      type: "success",
      text1: "예약 취소",
      text2: "예약이 성공적으로 취소되었습니다.",
      position: "top",
      visibilityTime: 2000
    });
  };

  const handleCancelModalClose = () => {
    setIsCancelModalVisible(false);
  };

  return (
    <CommonLayout
      title="마인드 앤 바디 포 어덜트"
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
        <Image source={require("../assets/reservation-1.png")} style={styles.reservationImage} resizeMode="cover" />

        {/* 예약 상태 배지 */}
        <View style={styles.statusContainer}>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>예약확정</Text>
          </View>
        </View>

        {/* 클래스 제목 */}
        <Text style={styles.classTitle}>마인드앤바디 포 어덜트</Text>

        {/* 예약 정보 */}
        <View style={styles.infoContainer}>
          {/* 강사 정보 */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>강사</Text>
            <Text style={styles.infoValue}>최다니엘 강사</Text>
          </View>

          {/* 일정 정보 */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>일정</Text>
            <Text style={styles.infoValue}>2026년 10월 31 (금) 오후 02:30 ~03:30</Text>
          </View>

          {/* 장소 정보 */}
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>장소</Text>
            <Text style={styles.infoValue}>서초 메디웰하우스 1층 마인드앤바디 201</Text>
          </View>

          {/* 구분선 */}
          <View style={styles.divider} />

          {/* 예약 변경/취소 안내 */}
          <Text style={styles.infoLabel}>예약 취소 및 변경</Text>
          <Text style={styles.infoDescription}>
            예약변경은 클래스 시작 4시간 전까지 가능합니다.{"\n"}
            클래스 시작 2시간 전까지 예약취소 가능합니다.
          </Text>

          {/* 부가정보 */}
          <Text style={styles.infoLabel}>부가정보</Text>
          <Text style={styles.infoDescription}>
            예약된 회원분만 참여 가능하며, 양도나 대리 수업참관을 지양합니다.{"\n"}
            호흡의 리듬을 따라 자연스럽게 자세를 교정하고 바른 신체 연결동작을 통해 체형교정및 심신안정을 찾도록 도움을 드립니다.
          </Text>
        </View>
      </ScrollView>

      {/* 하단 버튼 */}
      <View style={styles.bottomButtonContainer}>
        {!isReserved ? (
          <TouchableOpacity style={styles.bottomButton} onPress={handleReservationPress}>
            <Text style={styles.bottomButtonText}>예약하기</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.changeButton}>
              <Text style={styles.changeButtonText}>예약변경</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancelPress}>
              <Text style={styles.cancelButtonText}>취소</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* 예약하기 모달 */}
      <CommonModal
        visible={isReservationModalVisible}
        title="예약하기"
        message="예약신청이 가능합니다.\n예약을 진행하시겠습니까?"
        primaryButtonLabel="네, 예약하겠습니다."
        secondaryButtonLabel="아니요"
        primaryButtonColor="#B48327"
        onPrimaryPress={handleConfirmReservation}
        onSecondaryPress={handleCancelReservationModal}
      />

      {/* 예약 취소 모달 */}
      <CommonModal
        visible={isCancelModalVisible}
        title="예약취소"
        message="예약을 취소하시겠습니까?"
        primaryButtonLabel="네, 취소하겠습니다."
        secondaryButtonLabel="아니요"
        primaryButtonColor="#2B2B2B"
        onPrimaryPress={handleConfirmCancel}
        onSecondaryPress={handleCancelModalClose}
      />
    </CommonLayout>
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
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#EFF1F3"
  },
  bottomButton: {
    backgroundColor: "#B48327",
    borderRadius: 48,
    height: 50,
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
  }
});
