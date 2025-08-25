import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Dimensions, StyleProp, ViewStyle } from "react-native";
import { CommonLayout } from "../components/CommonLayout";
import { LabelText, ButtonText, SmallText, ExtraBoldText } from "../components/CommonText";
import { globalStyles } from "../styles/globalStyles";
import { ChevronButton } from "../components/Button";

const { width: screenWidth } = Dimensions.get("window");

interface MainScreenProps {
  onLogout?: () => void;
  currentTab?: string;
  onTabPress?: (tabName: string) => void;
  onReservationDetailPress?: () => void;
  onMembershipManagePress?: () => void;
  onEditProfilePress?: () => void;
  onViewAllServicesPress?: () => void;
  onSideMenuItemPress?: (itemId: string) => void;
  onServiceDetailPress?: (service: any) => void;
}

export const MainScreen: React.FC<MainScreenProps> = ({
  onLogout,
  currentTab,
  onTabPress,
  onReservationDetailPress,
  onMembershipManagePress,
  onEditProfilePress,
  onViewAllServicesPress,
  onSideMenuItemPress,
  onServiceDetailPress
}) => {
  const reservations = [
    {
      id: 1,
      image: require("@/assets/main/reservation-1.png"),
      badge: "2일전",
      location: "서울시 서초구",
      title: "위드닥터스 케어센터 서초점",
      time: "12.18(금)  오후 04:30"
    },
    {
      id: 2,
      image: require("@/assets/main/reservation-2.png"),
      badge: "5일전",
      location: "서울시 서초구",
      title: "GCC 골프 서초점",
      time: "12.21(월)  오후 01:30"
    },
    {
      id: 3,
      image: require("@/assets/main/reservation-1.png"),
      badge: "6일전",
      location: "서울시 서초구",
      title: "위드닥터스 케어센터 서초점",
      time: "12.22(화)  오후03:30"
    },
    {
      id: 4,
      image: require("@/assets/main/reservation-2.png"),
      badge: "7일전",
      location: "서울시 서초구",
      title: "GCC 골프 서초점",
      time: "12.22(수)  오후 05:30"
    }
  ];

  const services = [
    {
      id: 1,
      image: require("@/assets/main/service-1.png"),
      location: "서울 서초동",
      title: "마인드앤바디 포 어덜트",
      description: "전문트레이너에게 체계적인 운동을 시작하세요.\n#전신근육강화 #코어근육 #다이어트"
    },
    {
      id: 6,
      image: require("@/assets/main/service-2.png"),
      location: "서울 서대문구",
      title: "에코스 스파",
      description: "단 한 번의 세션으로 두피 건강을 개선하도록 설계된 맞춤형 트리트먼트를 즐기세요."
    },
    {
      id: 5,
      image: require("@/assets/main/service-3.png"),
      location: "서울 종로구",
      title: "GCC 스크린 골프",
      description: "골프입문부터 싱글플레이까지 실력에 맞춘\n전문 프로골프 강사 래슨"
    }
  ];

  const renderChevronButton = (title: string, style?: StyleProp<ViewStyle>, onPress?: () => void) => {
    return (
      <TouchableOpacity style={[globalStyles.chevronContainer, style]} onPress={onPress}>
        <LabelText style={globalStyles.chevronText}>{title}</LabelText>
        <Image source={require("@/assets/icons/ic-chevron-right.png")} style={globalStyles.chevron} />
      </TouchableOpacity>
    );
  };

  return (
    <CommonLayout
      title="First Care"
      showBackButton={false}
      onMenuPress={() => console.log("메뉴 버튼 클릭")}
      onCouponPress={() => console.log("쿠폰 버튼 클릭")}
      onNotificationPress={() => console.log("알림 버튼 클릭")}
      currentTab={currentTab}
      onTabPress={onTabPress}
      onSideMenuItemPress={onSideMenuItemPress}
      isWideLayout={true}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={[styles.section]}>
          <View style={styles.profileInfoSection}>
            <View style={styles.profileAvatarContainer}>
              <Image source={require("@/assets/main/profile-avatar.png")} style={styles.profileAvatar} />
              <View style={styles.profileText}>
                <LabelText style={styles.greeting}>안녕하세요!</LabelText>
                <LabelText style={styles.userName}>
                  <ExtraBoldText style={styles.userNameText}>박기용</ExtraBoldText>
                  <LabelText style={styles.userNameSuffix}>님</LabelText>
                </LabelText>
              </View>
            </View>
            <ChevronButton title="내 정보 변경" onPress={onEditProfilePress ?? (() => {})} />
            {/* {renderChevronButton("내 정보 변경", {}, onEditProfilePress ?? (() => {}))} */}
          </View>

          {/* Membership Card */}
          <View style={styles.membershipCardSection}>
            <View style={styles.membershipCardContainer}>
              <Image source={require("@/assets/main/membership-card.png")} style={styles.cardImage} />
              <View style={styles.cardContainer}>
                <LabelText style={styles.cardLabel}>My 멤버십</LabelText>
                <ExtraBoldText style={styles.cardTitle}>PH 1603 RESIDENCE</ExtraBoldText>
                <LabelText style={styles.cardNumber}>9869 4586 2335 3698</LabelText>
                <ChevronButton title="멤버십 관리" onPress={onMembershipManagePress ?? (() => {})} />
                {/* {renderChevronButton("멤버십 관리", {}, onMembershipManagePress ?? (() => {}))} */}
              </View>
            </View>
          </View>
        </View>

        {/* Reservation Section */}
        <View style={[styles.section]}>
          <View style={[styles.sectionHeader, { justifyContent: "flex-start" }]}>
            <LabelText style={styles.sectionTitle}>예약일정 체크</LabelText>
            <View style={styles.notificationCount}>
              <LabelText style={styles.notificationCountText}>3</LabelText>
            </View>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.reservationScroll}>
            {reservations.map((reservation) => (
              <TouchableOpacity key={reservation.id} style={styles.reservationCard} onPress={onReservationDetailPress}>
                <Image source={reservation.image} style={styles.reservationImage} />
                <View style={styles.reservationBadge}>
                  <LabelText style={styles.reservationBadgeText}>{reservation.badge}</LabelText>
                </View>
                <View style={styles.reservationInfo}>
                  <LabelText style={styles.reservationLocation}>{reservation.location}</LabelText>
                  <LabelText style={styles.reservationTitle}>{reservation.title}</LabelText>
                  <LabelText style={styles.reservationTime}>{reservation.time}</LabelText>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <ChevronButton title="예약 관리 바로가기" onPress={onReservationDetailPress ?? (() => {})} style={styles.viewAllButton} />
        </View>

        {/* Recommended Services */}
        <View style={[styles.section, styles.servicesSection]}>
          <View style={styles.sectionHeader}>
            <LabelText style={styles.sectionTitle}>추천 서비스</LabelText>
            <ChevronButton title="모두보기" onPress={onViewAllServicesPress ?? (() => {})} />
          </View>
          <View style={styles.servicesContainer}>
            {services.map((service) => (
              <TouchableOpacity key={service.id} style={styles.serviceCard} onPress={() => onServiceDetailPress?.(service)}>
                <Image source={service.image} style={styles.serviceImage} />
                <View style={styles.serviceInfo}>
                  <LabelText style={styles.serviceLocation}>{service.location}</LabelText>
                  <ExtraBoldText style={styles.serviceTitle}>{service.title}</ExtraBoldText>
                  <LabelText style={styles.serviceDescription}>{service.description}</LabelText>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </CommonLayout>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1
  },
  profileSection: {
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: "#fff"
  },
  profileAvatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15
  },
  profileInfoSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end"
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  profileText: {
    gap: 5
  },
  greeting: {
    fontSize: 18,
    fontWeight: "400",
    color: "#2B2B2B"
  },
  userName: {
    fontSize: 20,
    fontWeight: "900",
    color: "#2B2B2B"
  },
  userNameText: {
    fontSize: 20
  },
  userNameSuffix: {
    fontSize: 20
  },

  membershipCardSection: {
    marginTop: 20,
    backgroundColor: "#EFF1F3",
    borderRadius: 6,
    paddingVertical: 10
  },
  membershipCardContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 15,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  cardImage: {
    width: 82.29,
    height: 48,
    borderRadius: 6,
    marginTop: 10
  },
  cardContainer: {
    gap: 10
  },
  cardLabel: {
    fontSize: 13,
    fontWeight: "400",
    color: "#79818B"
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "900",
    color: "#2B2B2B"
  },
  cardNumber: {
    fontSize: 13,
    fontWeight: "800",
    color: "#79818B"
  },
  membershipManageText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#505866"
  },
  section: {
    backgroundColor: "#fff",
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 20
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15
  },
  sectionTitle: {
    fontSize: 16,
    color: "#2B2B2B"
  },
  notificationCount: {
    width: 24,
    height: 24,
    backgroundColor: "#2B2B2B",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10
  },
  notificationCountText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FFFFFF"
  },
  reservationScroll: {},
  reservationCard: {
    width: 250,
    marginRight: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#EFF1F3",
    overflow: "hidden"
  },
  reservationImage: {
    width: "100%",
    height: 136,
    borderRadius: 10
  },
  reservationBadge: {
    position: "absolute",
    top: 13,
    right: 13,
    backgroundColor: "#2B2B2B",
    paddingHorizontal: 11,
    paddingVertical: 3,
    borderRadius: 20
  },
  reservationBadgeText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF"
  },
  reservationInfo: {
    padding: 15,
    gap: 5
  },
  reservationLocation: {
    fontSize: 12,
    fontWeight: "700",
    color: "#505866"
  },
  reservationTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2B2B2B"
  },
  reservationTime: {
    fontSize: 14,
    fontWeight: "800",
    color: "#2B2B2B"
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#505866"
  },
  servicesSection: {
    marginBottom: 0
  },
  servicesContainer: {
    gap: 15
  },
  serviceCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#EFF1F3",
    overflow: "hidden",
    paddingBottom: 20
  },
  serviceImage: {
    width: "100%",
    height: 168
  },
  serviceInfo: {
    padding: 15,
    gap: 5
  },
  serviceLocation: {
    fontSize: 12,
    fontWeight: "700",
    color: "#505866"
  },
  serviceTitle: {
    marginTop: 5,
    fontSize: 20,
    color: "#2B2B2B"
  },
  serviceDescription: {
    marginTop: 10,
    fontSize: 14,
    color: "#2B2B2B",
    lineHeight: 20
  }
});
