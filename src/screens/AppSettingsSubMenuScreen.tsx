import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Image } from "react-native";
import { CommonLayout } from "../components/CommonLayout";
import { FaceIdModal } from "../components/FaceIdModal";
import { VersionInfo } from "../../types/version";
import Constants from "expo-constants";
import { LabelText, ButtonText, SmallText } from "../components/CommonText";

interface AppSettingsSubMenuScreenProps {
  onBackPress?: () => void;
  onVersionUpdatePress?: (versionInfo: VersionInfo) => void;
  onPrivacyPolicyPress?: () => void;
  onTermsOfServicePress?: () => void;
  onOpenLicensePress?: () => void;
}

interface SettingItem {
  id: string;
  title: string;
  type: "toggle" | "navigation";
  value?: boolean;
  onToggleChange?: (value: boolean) => void;
  onPress?: () => void;
  subtitle?: string;
}

export const AppSettingsSubMenuScreen: React.FC<AppSettingsSubMenuScreenProps> = ({
  onBackPress,
  onVersionUpdatePress,
  onPrivacyPolicyPress,
  onTermsOfServicePress,
  onOpenLicensePress
}) => {
  const [toggleStates, setToggleStates] = useState({
    pushNotification: true,
    autoLogin: false,
    biometricLogin: false
  });

  const [showFaceIdModal, setShowFaceIdModal] = useState(false);

  const [versionInfo, setVersionInfo] = useState({
    currentVersion: "1.0.0",
    newVersion: "1.0.0",
    status: false
  });

  // 실제 앱 버전 가져오기
  useEffect(() => {
    const getAppVersion = () => {
      try {
        // expo-constants에서 앱 버전 가져오기
        const appVersion = Constants.expoConfig?.version || Constants.manifest?.version || Constants.manifest2?.extra?.expoClient?.version || "1.0.0";

        console.log("현재 앱 버전:", appVersion);

        // 버전 비교 함수
        const compareVersions = (current: string, latest: string): boolean => {
          const currentParts = current.split(".").map(Number);
          const latestParts = latest.split(".").map(Number);

          for (let i = 0; i < Math.max(currentParts.length, latestParts.length); i++) {
            const currentPart = currentParts[i] || 0;
            const latestPart = latestParts[i] || 0;

            if (currentPart < latestPart) {
              return true; // 업데이트 필요
            } else if (currentPart > latestPart) {
              return false; // 현재 버전이 더 높음
            }
          }
          return false; // 버전이 동일함
        };

        const needsUpdate = compareVersions(appVersion, versionInfo.newVersion);
        console.log("업데이트 필요:", needsUpdate);

        setVersionInfo((prev) => ({
          ...prev,
          currentVersion: appVersion,
          status: needsUpdate
        }));
      } catch (error) {
        console.log("앱 버전 가져오기 실패:", error);
        // 기본값 사용
        setVersionInfo((prev) => ({
          ...prev,
          currentVersion: "1.0.0"
        }));
      }
    };

    getAppVersion();
  }, [versionInfo.newVersion]); // newVersion이 변경될 때도 재실행

  const handleToggleChange = (key: keyof typeof toggleStates) => {
    if (key === "biometricLogin") {
      const newValue = !toggleStates.biometricLogin;

      if (newValue) {
        // 생체 인식 로그인을 on으로 설정할 때 Face ID 모달 표시
        setShowFaceIdModal(true);
      } else {
        // 생체 인식 로그인을 off로 설정할 때 설정 해제
        setToggleStates((prev) => ({
          ...prev,
          [key]: false
        }));
        console.log("생체 인식 로그인 설정 해제");
      }
    } else {
      setToggleStates((prev) => ({
        ...prev,
        [key]: !prev[key]
      }));
    }
  };

  const handleVersionUpdatePress = () => {
    if (onVersionUpdatePress) {
      // versionStatus 값을 전달하는 방식으로 수정
      onVersionUpdatePress(versionInfo);
    }
  };

  const handleCloseFaceIdModal = () => {
    setShowFaceIdModal(false);
  };

  const handleBiometricAuthSuccess = () => {
    // 생체 인증 성공 시 설정 활성화
    setToggleStates((prev) => ({
      ...prev,
      biometricLogin: true
    }));
    setShowFaceIdModal(false);
    console.log("생체 인식 로그인 설정 활성화");
  };

  // 데이터 바인딩 객체
  const settingsData: SettingItem[] = [
    {
      id: "pushNotification",
      title: "푸쉬 알림 설정",
      type: "toggle",
      value: toggleStates.pushNotification,
      onToggleChange: () => handleToggleChange("pushNotification")
    },
    {
      id: "autoLogin",
      title: "자동 로그인",
      type: "toggle",
      value: toggleStates.autoLogin,
      onToggleChange: () => handleToggleChange("autoLogin")
    },
    {
      id: "biometricLogin",
      title: "생체 인식 로그인",
      type: "toggle",
      value: toggleStates.biometricLogin,
      onToggleChange: () => handleToggleChange("biometricLogin")
    },
    {
      id: "versionUpdate",
      title: "버전 안내 / 업데이트",
      type: "navigation",
      value: versionInfo.status,
      onPress: handleVersionUpdatePress
    },
    {
      id: "privacyPolicy",
      title: "개인정보 처리방침",
      type: "navigation",
      onPress: onPrivacyPolicyPress
    },
    {
      id: "termsOfService",
      title: "서비스 이용 약관",
      type: "navigation",
      onPress: onTermsOfServicePress
    },
    {
      id: "openLicense",
      title: "오픈 라이센스",
      type: "navigation",
      onPress: onOpenLicensePress
    }
  ];

  const renderSettingItem = (item: SettingItem) => {
    if (item.type === "toggle") {
      return (
        <View key={item.id} style={styles.settingItem}>
          <LabelText style={styles.settingTitle}>{item.title}</LabelText>
          <Switch
            value={item.value}
            onValueChange={item.onToggleChange}
            trackColor={{ false: "#D6DADF", true: "#B48327" }}
            thumbColor={item.value ? "#FFFFFF" : "#FFFFFF"}
          />
        </View>
      );
    }

    return (
      <TouchableOpacity key={item.id} style={styles.settingItem} onPress={item.onPress}>
        <View style={styles.settingLeft}>
          {item.id === "versionUpdate" ? (
            <View style={styles.versionContainer}>
              <LabelText style={styles.settingTitle}>{item.title}</LabelText>
              <LabelText style={[styles.versionStatus, versionInfo.status ? styles.versionStatusActive : {}]}>
                {versionInfo.status ? "업데이트 필요" : "최신 버전 사용 중"}
              </LabelText>
            </View>
          ) : (
            <LabelText style={styles.settingTitle}>{item.title}</LabelText>
          )}
        </View>
        <Image source={require("../assets/icons/ic-chevron-right.png")} style={styles.chevron} />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <CommonLayout title="앱설정" showBackButton={true} showTabBar={false} onBackPress={onBackPress}>
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          {settingsData.map(renderSettingItem)}
        </ScrollView>
      </CommonLayout>

      <FaceIdModal isVisible={showFaceIdModal} onClose={handleCloseFaceIdModal} onSuccess={handleBiometricAuthSuccess} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,

    height: 50
  },
  settingLeft: {
    flex: 1,
    justifyContent: "center"
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2B2B2B",
    letterSpacing: -0.64
  },
  versionStatus: {
    fontSize: 14,
    fontWeight: "700",
    color: "#79818B",
    textAlign: "right"
  },
  versionStatusActive: {
    color: "#B48327"
  },
  chevron: {
    width: 18,
    height: 18
  },
  versionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});
