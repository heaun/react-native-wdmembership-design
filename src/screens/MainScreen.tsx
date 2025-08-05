import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, StatusBar, Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

interface MainScreenProps {
  onLogout?: () => void;
}

export const MainScreen: React.FC<MainScreenProps> = ({ onLogout }) => {
  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Fist Care</Text>
        <View style={styles.topBarRight}>
          <TouchableOpacity style={styles.notificationButton}>
            <Text style={styles.notificationIcon}>🔔</Text>
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.couponButton}>
            <Text style={styles.couponIcon}>🎫</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* User Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileInfo}>
            <View style={styles.profileAvatar} />
            <View style={styles.profileText}>
              <Text style={styles.greeting}>안녕하세요!</Text>
              <Text style={styles.userName}>박기용님</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>내 정보 변경</Text>
            <Text style={styles.arrowIcon}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Membership Card */}
        <View style={styles.membershipCard}>
          <View style={styles.cardImage} />
          <View style={styles.cardContent}>
            <Text style={styles.cardLabel}>My 멤버쉽</Text>
            <Text style={styles.cardTitle}>PH 1603 RESIDENCE</Text>
            <Text style={styles.cardNumber}>9869 4586 2335 3698</Text>
          </View>
          <TouchableOpacity style={styles.membershipManageButton}>
            <Text style={styles.membershipManageText}>멤버쉽 관리</Text>
            <Text style={styles.arrowIcon}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Reservation Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>예약일정 체크</Text>
            <View style={styles.notificationCount}>
              <Text style={styles.notificationCountText}>3</Text>
            </View>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.reservationScroll}>
            <View style={styles.reservationCard}>
              <View style={styles.reservationImage} />
              <View style={styles.reservationBadge}>
                <Text style={styles.reservationBadgeText}>2일전</Text>
              </View>
              <View style={styles.reservationInfo}>
                <Text style={styles.reservationLocation}>서울시 서초구</Text>
                <Text style={styles.reservationTitle}>위드닥터스 케어센터 서초점</Text>
                <Text style={styles.reservationTime}>12.18(금) 오후 04:30</Text>
              </View>
            </View>
            <View style={styles.reservationCard}>
              <View style={styles.reservationImage} />
              <View style={styles.reservationBadge}>
                <Text style={styles.reservationBadgeText}>5일전</Text>
              </View>
              <View style={styles.reservationInfo}>
                <Text style={styles.reservationLocation}>서울시 서초구</Text>
                <Text style={styles.reservationTitle}>GCC 골프 서초점</Text>
                <Text style={styles.reservationTime}>12.21(월) 오후 01:30</Text>
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>예약 관리 바로가기</Text>
            <Text style={styles.arrowIcon}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Recommended Services */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>추천 서비스</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>모두보기</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.servicesContainer}>
            <View style={styles.serviceCard}>
              <View style={styles.serviceImage} />
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceLocation}>서울 서초동</Text>
                <Text style={styles.serviceTitle}>마인드앤바디 포 어덜트</Text>
                <Text style={styles.serviceDescription}>전문트레이너에게 체계적인 운동을 시작하세요.{"\n"}#전신근육강화 #코어근육 #다이어트</Text>
              </View>
            </View>
            <View style={styles.serviceCard}>
              <View style={styles.serviceImage} />
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceLocation}>서울 서대문구</Text>
                <Text style={styles.serviceTitle}>프리미엄 스파 휴리재</Text>
                <Text style={styles.serviceDescription}>단 한 번의 세션으로 두피 건강을 개선하도록 설계된 맞춤형 트리트먼트를 즐기세요.</Text>
              </View>
            </View>
            <View style={styles.serviceCard}>
              <View style={styles.serviceImage} />
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceLocation}>서울 종로구</Text>
                <Text style={styles.serviceTitle}>GCC 스크린 골프연습장</Text>
                <Text style={styles.serviceDescription}>골프입문부터 싱글플레이까지 실력에 맞춘{"\n"}전문 프로골프 강사 래슨</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EFF1F3"
  },
  menuButton: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center"
  },
  menuIcon: {
    fontSize: 18,
    color: "#2B2B2B"
  },
  topBarTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2B2B2B"
  },
  topBarRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  notificationButton: {
    position: "relative",
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center"
  },
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
  scrollView: {
    flex: 1
  },
  profileSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E0E0E0"
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
  editProfileButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5
  },
  editProfileText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#505866"
  },
  arrowIcon: {
    fontSize: 16,
    color: "#505866"
  },
  membershipCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#EFF1F3",
    borderRadius: 6,
    padding: 20,
    position: "relative"
  },
  cardImage: {
    width: "100%",
    height: 80,
    borderRadius: 6,
    marginBottom: 15,
    backgroundColor: "#D0D0D0"
  },
  cardContent: {
    gap: 5
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
  membershipManageButton: {
    position: "absolute",
    top: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 5
  },
  membershipManageText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#505866"
  },
  section: {
    marginBottom: 30
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 15
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2B2B2B"
  },
  notificationCount: {
    width: 24,
    height: 24,
    backgroundColor: "#2B2B2B",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center"
  },
  notificationCountText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#FFFFFF"
  },
  reservationScroll: {
    paddingHorizontal: 20
  },
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
    backgroundColor: "#E0E0E0"
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 15
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#505866"
  },
  servicesContainer: {
    paddingHorizontal: 20,
    gap: 15
  },
  serviceCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#EFF1F3",
    overflow: "hidden"
  },
  serviceImage: {
    width: "100%",
    height: 168,
    backgroundColor: "#E0E0E0"
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
    fontSize: 20,
    fontWeight: "800",
    color: "#2B2B2B"
  },
  serviceDescription: {
    fontSize: 14,
    fontWeight: "400",
    color: "#2B2B2B",
    lineHeight: 20
  }
});
