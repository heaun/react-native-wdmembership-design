import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CommonLayout } from "../components/CommonLayout";
import { VersionInfo } from "../../types/version";
import Constants from "expo-constants";

interface VersionUpdateScreenProps {
  onBackPress?: () => void;
  onUpdatePress?: () => void;
  versionInfo?: VersionInfo;
}

export const VersionUpdateScreen: React.FC<VersionUpdateScreenProps> = ({ onBackPress, onUpdatePress, versionInfo }) => {
  return (
    <CommonLayout title="버전 안내 / 업데이트" showBackButton={true} showTabBar={false} onBackPress={onBackPress}>
      <View style={styles.container}>
        {/* 앱 아이콘 */}
        <View style={styles.appIconContainer}>
          <View style={styles.appIcon}>
            <Text style={styles.appIconText}>FIST{"\n"}CARE</Text>
          </View>
        </View>

        {/* 버전 정보 */}
        <View style={styles.versionInfo}>
          <Text style={styles.newVersion}>v {versionInfo?.newVersion}</Text>
          <Text style={styles.updateMessage}>{versionInfo?.status ? "새로운 업데이트가 있습니다." : "최신 버전 입니다"}</Text>

          <View style={styles.divider} />

          <Text style={styles.currentVersionLabel}>현재 버전</Text>
          <Text style={styles.currentVersion}>{versionInfo?.currentVersion}</Text>
        </View>

        {/* 업데이트 버튼 */}
        <TouchableOpacity
          style={[styles.updateButton, !versionInfo?.status && styles.updateButtonDisabled]}
          onPress={versionInfo?.status ? onUpdatePress : undefined}
          disabled={!versionInfo?.status}
        >
          <Text style={[styles.updateButtonText, !versionInfo?.status && styles.updateButtonTextDisabled]}>업데이트</Text>
        </TouchableOpacity>
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
    color: "#2B2B2B",
    marginBottom: 30
  },
  divider: {
    width: 200,
    height: 1,
    backgroundColor: "#D6DADF",
    marginBottom: 30
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
  },
  updateButton: {
    position: "absolute",
    bottom: 60,
    left: 24,
    right: 24,
    backgroundColor: "#B48327",
    borderRadius: 48,
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  updateButtonDisabled: {
    backgroundColor: "#D6DADF",
    opacity: 0.7
  },
  updateButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF"
  },
  updateButtonTextDisabled: {
    color: "#79818B"
  }
});
