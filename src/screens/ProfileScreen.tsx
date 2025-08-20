import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CommonLayout } from "../components/CommonLayout";
import { LabelText, ButtonText, SmallText } from "../components/CommonText";

interface ProfileScreenProps {
  currentTab?: string;
  onTabPress?: (tabName: string) => void;
  onSideMenuItemPress?: (itemId: string) => void;
  profileData?: {
    name: string;
    birthDate: string;
    gender: string;
    phoneNumber: string;
    email: string;
    defaultLocation: string;
    avatarImage?: any;
  };
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ currentTab, onTabPress, onSideMenuItemPress, profileData }) => {
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

  // 기본 데이터 (profileData가 없을 때 사용)
  const defaultProfileData = {
    name: "박기용",
    birthDate: "1966년 10월28일",
    gender: "남",
    phoneNumber: "010-12**-56**",
    email: "jgcho**@wiiv****.com",
    defaultLocation: "메디웰 하우스 (서울 서초구)",
    avatarImage: require("../assets/profile/profile-avatar-6bf758.png")
  };

  // 실제 사용할 데이터 (props로 받은 데이터가 있으면 사용, 없으면 기본 데이터 사용)
  const userProfileData = profileData || defaultProfileData;

  return (
    <CommonLayout
      title="내 정보 조회/변경"
      showBackButton={true}
      showTabBar={false}
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
            <Image source={userProfileData.avatarImage} style={styles.avatar} resizeMode="cover" />
            <TouchableOpacity style={styles.editAvatarButton} onPress={handleProfileEditPress}>
              <View style={styles.editAvatarIcon}>
                <Ionicons name="camera" size={12} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.userInfo}>
            <LabelText style={styles.userName}>{userProfileData.name}</LabelText>
            <LabelText style={styles.userNameSuffix}>님</LabelText>
          </View>

          <LabelText style={styles.userDetails}>
            {userProfileData.birthDate} ㅣ {userProfileData.gender}
          </LabelText>
        </View>

        {/* 구분선 */}
        <View style={styles.divider} />

        {/* 휴대전화 번호 */}
        <View style={styles.infoSection}>
          <LabelText style={styles.infoLabel}>휴대전화 번호</LabelText>
          <View style={styles.infoRow}>
            <LabelText style={styles.infoValue}>{userProfileData.phoneNumber}</LabelText>
            <TouchableOpacity style={styles.editButton} onPress={handlePhoneEditPress}>
              <LabelText style={styles.editButtonText}>수정</LabelText>
            </TouchableOpacity>
          </View>
        </View>

        {/* 구분선 */}
        <View style={styles.divider} />

        {/* 이메일 */}
        <View style={styles.infoSection}>
          <LabelText style={styles.infoLabel}>이메일</LabelText>
          <View style={styles.infoRow}>
            <LabelText style={styles.infoValue}>{userProfileData.email}</LabelText>
            <TouchableOpacity style={styles.editButton} onPress={handleEmailEditPress}>
              <LabelText style={styles.editButtonText}>수정</LabelText>
            </TouchableOpacity>
          </View>
        </View>

        {/* 구분선 */}
        <View style={styles.divider} />

        {/* 비밀번호 변경 */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <LabelText style={styles.infoValue}>비밀번호 변경</LabelText>
            <TouchableOpacity style={styles.editButton} onPress={handlePasswordChangePress}>
              <LabelText style={styles.editButtonText}>변경</LabelText>
            </TouchableOpacity>
          </View>
        </View>

        {/* 구분선 */}
        <View style={styles.divider} />

        {/* 기본 장소 */}
        <View style={styles.infoSection}>
          <LabelText style={styles.infoLabel}>기본 장소</LabelText>
          <View style={styles.infoRow}>
            <LabelText style={styles.infoValue}>{userProfileData.defaultLocation}</LabelText>
            <TouchableOpacity style={styles.editButton} onPress={handleLocationEditPress}>
              <LabelText style={styles.editButtonText}>변경</LabelText>
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
    backgroundColor: "#FFFFFF"
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 20
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
    marginVertical: 15
  },
  infoSection: {
    minHeight: 40,
    justifyContent: "center"
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
    color: "#79818B",
    padding: 2
  }
});
