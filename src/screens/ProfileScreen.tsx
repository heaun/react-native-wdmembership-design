import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CommonLayout } from "../components/CommonLayout";

interface ProfileScreenProps {
  currentTab?: string;
  onTabPress?: (tabName: string) => void;
  onSideMenuItemPress?: (itemId: string) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ currentTab, onTabPress, onSideMenuItemPress }) => {
  const handleBackPress = () => {
    // 홈으로 돌아가기
    onTabPress?.("Home");
  };

  const handlePhoneEditPress = () => {
    // 휴대전화 번호 수정
    console.log("휴대전화 번호 수정");
  };

  const handleEmailEditPress = () => {
    // 이메일 수정
    console.log("이메일 수정");
  };

  const handlePasswordChangePress = () => {
    // 비밀번호 변경
    console.log("비밀번호 변경");
  };

  const handleLocationEditPress = () => {
    // 기본 장소 수정
    console.log("기본 장소 수정");
  };

  const handleProfileEditPress = () => {
    // 프로필 사진 수정
    console.log("프로필 사진 수정");
  };

  return (
    <CommonLayout
      title="내 정보 조회/변경"
      showBackButton={true}
      showTabBar={true}
      onBackPress={handleBackPress}
      onMenuPress={() => {}}
      onCouponPress={() => {}}
      onNotificationPress={() => {}}
      currentTab={currentTab}
      onTabPress={onTabPress}
      onSideMenuItemPress={onSideMenuItemPress}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* 프로필 섹션 */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image source={require("../assets/profile/profile-avatar-6bf758.png")} style={styles.avatar} resizeMode="cover" />
            <TouchableOpacity style={styles.editAvatarButton} onPress={handleProfileEditPress}>
              <View style={styles.editAvatarIcon}>
                <Ionicons name="camera" size={12} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.userInfo}>
            <Text style={styles.userName}>박기용</Text>
            <Text style={styles.userNameSuffix}>님</Text>
          </View>

          <Text style={styles.userDetails}>1966년 10월28일 ㅣ 남</Text>
        </View>

        {/* 구분선 */}
        <View style={styles.divider} />

        {/* 휴대전화 번호 */}
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>휴대전화 번호</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoValue}>010-12**-56**</Text>
            <TouchableOpacity style={styles.editButton} onPress={handlePhoneEditPress}>
              <Text style={styles.editButtonText}>수정</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 구분선 */}
        <View style={styles.divider} />

        {/* 이메일 */}
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>이메일</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoValue}>jgcho**@wiiv****.com</Text>
            <TouchableOpacity style={styles.editButton} onPress={handleEmailEditPress}>
              <Text style={styles.editButtonText}>수정</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 구분선 */}
        <View style={styles.divider} />

        {/* 비밀번호 변경 */}
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>비밀번호 변경</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoValue}></Text>
            <TouchableOpacity style={styles.editButton} onPress={handlePasswordChangePress}>
              <Text style={styles.editButtonText}>변경</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 구분선 */}
        <View style={styles.divider} />

        {/* 기본 장소 */}
        <View style={styles.infoSection}>
          <Text style={styles.infoLabel}>기본 장소</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoValue}>메디웰 하우스 (서울 서초구)</Text>
            <TouchableOpacity style={styles.editButton} onPress={handleLocationEditPress}>
              <Text style={styles.editButtonText}>변경</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </CommonLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 40
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 20
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0
  },
  editAvatarIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#B48327",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center"
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  userName: {
    fontSize: 20,
    fontWeight: "900",
    color: "#2B2B2B",
    textAlign: "center"
  },
  userNameSuffix: {
    fontSize: 20,
    fontWeight: "400",
    color: "#2B2B2B",
    marginLeft: 5
  },
  userDetails: {
    fontSize: 13,
    fontWeight: "700",
    color: "#B1B8C0",
    textAlign: "center"
  },
  divider: {
    height: 1,
    backgroundColor: "#D6DADF",
    marginVertical: 20
  },
  infoSection: {
    marginBottom: 20
  },
  infoLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#79818B",
    marginBottom: 10
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2B2B2B",
    flex: 1
  },
  editButton: {
    backgroundColor: "#EFF1F3",
    borderWidth: 1,
    borderColor: "#D6DADF",
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 13,
    minWidth: 50,
    alignItems: "center"
  },
  editButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#79818B"
  }
});
