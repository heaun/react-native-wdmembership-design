import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image, StatusBar, Dimensions } from "react-native";
import { typography } from "../../utils/typography";
import { LabelText, ButtonText, SmallText, MyeongjoExtraBoldText, MyeongjoTitleText } from "../components/CommonText";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    // 3초 후에 스플래시 스크린 종료
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  const thisYear = new Date().getFullYear();
  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoSection}>
        <Image source={require("../assets/splash-icon.png")} style={styles.logo} resizeMode="contain" />

        {/* Title Section */}
        <View style={styles.titleSection}>
          <MyeongjoTitleText style={styles.title}>WITH DOCTORS</MyeongjoTitleText>
          <MyeongjoTitleText style={styles.title}>FIRST CARE</MyeongjoTitleText>
          <MyeongjoTitleText style={styles.title}>MEMBERSHIP</MyeongjoTitleText>
        </View>
      </View>
      {/* Copyright */}
      <View style={styles.copyrightSection}>
        <LabelText style={styles.copyrightText}>© {thisYear} WithDoctors Co. Ltd. All rights reserved</LabelText>
      </View>

      {/* Home Indicator */}
      <View style={styles.homeIndicator}>
        <View style={styles.homeIndicatorBar} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2B2B2B",
    alignItems: "center",
    justifyContent: "space-between",
    fontFamily: typography.fontFamily
  },
  statusBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 16,
    height: 44,
    width: "100%"
  },
  statusBarTime: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2B2B2B"
  },
  statusBarIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5
  },
  signalIcon: {
    width: 18,
    height: 10,
    backgroundColor: "#2B2B2B"
  },
  wifiIcon: {
    width: 15,
    height: 11,
    backgroundColor: "#2B2B2B"
  },
  batteryIcon: {
    width: 27,
    height: 13,
    backgroundColor: "#2B2B2B",
    borderRadius: 2
  },
  logoSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100
  },
  logo: {
    width: 116,
    height: 55
  },
  titleSection: {
    alignItems: "center",
    marginTop: 80
  },
  title: {
    fontSize: 31,
    letterSpacing: 0.93,
    textAlign: "center",
    lineHeight: 36,
    color: "#89744C"
  },

  copyrightSection: {
    paddingHorizontal: 24,
    paddingBottom: 20
  },
  copyrightText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#505866",
    textAlign: "center",
    lineHeight: 19
  },
  homeIndicator: {
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  homeIndicatorBar: {
    width: 148,
    height: 5,
    backgroundColor: "#2B2B2B",
    borderRadius: 100
  }
});
