import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { CommonLayout } from "../components/CommonLayout";
import { VersionInfo } from "../types/version";
import Constants from "expo-constants";
import { LabelText } from "../components/CommonText";

interface VersionUpdateScreenProps {
  onBackPress?: () => void;
  onUpdatePress?: () => void;
  versionInfo?: VersionInfo;
}

export const VersionUpdateScreen: React.FC<VersionUpdateScreenProps> = ({ onBackPress, onUpdatePress, versionInfo }) => {
  // 버튼 설정을 동적으로 생성하는 함수

  const isUpdateAvailable = versionInfo?.status;
  const getButtons = () => {
    return [
      {
        text: "업데이트",
        onPress: isUpdateAvailable && onUpdatePress ? onUpdatePress : () => {},
        disabled: !isUpdateAvailable,
        style: "custom" as const,
        customStyle: {
          backgroundColor: "#B48327"
        }
      }
    ];
  };

  return (
    <CommonLayout title="버전 안내 / 업데이트" showBackButton={true} showTabBar={false} onBackPress={onBackPress} buttons={getButtons()}>
      <View style={styles.container}>
        {/* 앱 아이콘 */}
        <View style={styles.appIconContainer}>
          <Image source={require("@/assets/icon.png")} style={styles.appIcon} />
        </View>

        {/* 버전 정보 */}
        <View style={styles.versionInfo}>
          <LabelText style={styles.newVersion}>v {versionInfo?.newVersion}</LabelText>
          <LabelText style={styles.updateMessage}>{isUpdateAvailable ? "새로운 업데이트가 있습니다." : "최신 버전 입니다"}</LabelText>

          <View style={styles.divider} />

          <LabelText style={styles.currentVersionLabel}>현재 버전</LabelText>
          <LabelText style={styles.currentVersion}>{versionInfo?.currentVersion}</LabelText>
        </View>
      </View>
    </CommonLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    paddingHorizontal: 20
  },
  appIconContainer: {
    marginTop: 80,
    marginBottom: 50
  },
  appIcon: {
    width: 90,
    height: 90,
    backgroundColor: "#2B2B2B",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  appIconText: {
    color: "#89744C",
    fontSize: 23,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 23
  },
  versionInfo: {
    alignItems: "center",
    width: "100%"
  },
  newVersion: {
    fontSize: 20,
    fontWeight: "800",
    color: "#2B2B2B",
    marginBottom: 10
  },
  updateMessage: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2B2B2B"
  },
  divider: {
    width: 200,
    height: 1,
    backgroundColor: "#D6DADF",
    marginVertical: 10
  },
  currentVersionLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#79818B",
    marginBottom: 10
  },
  currentVersion: {
    fontSize: 16,
    fontWeight: "800",
    color: "#79818B"
  }
});
