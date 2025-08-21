import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView, Platform, Image } from "react-native";
import { LabelText, ButtonText } from "./CommonText";
import { SideMenu } from "./SideMenu";
import { typography } from "../../utils/typography";

interface TabItem {
  name: string;
  icon: any;
  activeIcon: any;
  label: string;
}

interface ButtonConfig {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  style?: "primary" | "secondary" | "custom";
  customStyle?: {
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
  };
}

interface CommonLayoutProps {
  title: string;
  onBackPress?: () => void;
  showBackButton?: boolean;
  showTabBar?: boolean;
  showTopIcons?: boolean;
  onMenuPress?: () => void;
  onCouponPress?: () => void;
  onNotificationPress?: () => void;
  currentTab?: string;
  onTabPress?: (tabName: string) => void;
  children: React.ReactNode;
  isWideLayout?: boolean;
  onSideMenuItemPress?: (itemId: string) => void;
  buttons?: ButtonConfig[];
  showTitle?: boolean;
}

export const CommonLayout: React.FC<CommonLayoutProps> = ({
  title = "타이틀",
  onBackPress,
  showBackButton = true,
  showTabBar = true,
  showTopIcons = true,
  onMenuPress,
  onCouponPress,
  onNotificationPress,
  currentTab = "Home",
  onTabPress,
  children,
  isWideLayout = false,
  onSideMenuItemPress,
  buttons,
  showTitle = true
}) => {
  const [sideMenuVisible, setSideMenuVisible] = useState(false);

  const handleMenuPress = () => {
    setSideMenuVisible(true);
  };

  const handleSideMenuClose = () => {
    setSideMenuVisible(false);
  };

  const handleSideMenuItemPress = (itemId: string) => {
    console.log(`Side menu item pressed: ${itemId}`);
    setSideMenuVisible(false);
    onSideMenuItemPress?.(itemId);
  };
  const tabs: TabItem[] = [
    {
      name: "Home",
      icon: require("../assets/icons/ic_tap_01_off.png"),
      activeIcon: require("../assets/icons/ic_tap_01_on.png"),
      label: "홈"
    },
    {
      name: "Schedule",
      icon: require("../assets/icons/ic_tap_02_off.png"),
      activeIcon: require("../assets/icons/ic_tap_02_on.png"),
      label: "나의일정"
    },
    {
      name: "MembershipCard",
      icon: require("../assets/icons/ic_tap_03_off.png"),
      activeIcon: require("../assets/icons/ic_tap_03_on.png"),
      label: "멤버십카드"
    },
    {
      name: "MyService",
      icon: require("../assets/icons/ic_tap_04_off.png"),
      activeIcon: require("../assets/icons/ic_tap_04_on.png"),
      label: "멤버십서비스"
    }
  ];
  return (
    <View style={[styles.container, isWideLayout && styles.wideContainer]}>
      {/* Status Bar */}
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Safe Area for Top */}
      <SafeAreaView style={styles.safeAreaTop} />

      {/* Top Bar */}
      <View style={[styles.topBar, isWideLayout && styles.wideTopBar, !showTitle && styles.noTitle]}>
        {showTitle && <LabelText style={styles.topBarTitle}>{title}</LabelText>}

        {/* Left side */}
        <View style={styles.topBarIcons}>
          <View style={styles.leftSide}>
            {showBackButton ? (
              <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
                <Image source={require("../assets/icons/ic-chevron-left.png")} style={styles.backButtonIcon} />
              </TouchableOpacity>
            ) : showTopIcons ? (
              <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
                <Image source={require("../assets/icons/ic_menu.png")} style={styles.menuIcon} />
              </TouchableOpacity>
            ) : (
              <View style={styles.emptyButton} />
            )}
          </View>

          {/* Right side */}
          <View style={styles.rightSide}>
            {showTopIcons && !showBackButton ? (
              <View style={styles.rightIcons}>
                <TouchableOpacity style={styles.iconButton} onPress={onCouponPress}>
                  <Image source={require("../assets/icons/ic_coupon.png")} style={styles.iconImage} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton} onPress={onNotificationPress}>
                  <View style={styles.notificationContainer}>
                    <Image source={require("../assets/icons/ic_notification.png")} style={styles.iconImage} />
                    <View style={styles.notificationDot} />
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.emptyButton} />
            )}
          </View>
        </View>
      </View>

      {/* Main Content */}
      <View style={[styles.content, !showTabBar && styles.contentWithoutTabBar, isWideLayout && styles.wideContent]}>
        {children}

        {/* Common Button Container */}
        {buttons && buttons.length > 0 && (
          <View style={styles.buttonContainer}>
            {buttons.length === 1 ? (
              // 단일 버튼
              <TouchableOpacity
                style={[
                  buttons[0].style === "custom" && buttons[0].customStyle
                    ? {
                        backgroundColor: buttons[0].customStyle.backgroundColor || "#2B2B2B",
                        borderRadius: 25,
                        height: 50,
                        justifyContent: "center",
                        alignItems: "center",
                        borderWidth: buttons[0].customStyle.borderColor ? 1 : 0,
                        borderColor: buttons[0].customStyle.borderColor
                      }
                    : styles.solidButton,
                  buttons[0].disabled && styles.buttonDisabled
                ]}
                onPress={buttons[0].onPress}
                disabled={buttons[0].disabled}
              >
                <ButtonText
                  style={[
                    buttons[0].style === "custom" && buttons[0].customStyle
                      ? {
                          fontSize: 16,
                          fontWeight: "700",
                          color: buttons[0].customStyle.textColor || "#FFFFFF"
                        }
                      : styles.solidButtonText
                  ]}
                >
                  {buttons[0].text}
                </ButtonText>
              </TouchableOpacity>
            ) : (
              // 다중 버튼
              <>
                <TouchableOpacity
                  style={[
                    buttons[0].style === "custom" && buttons[0].customStyle
                      ? {
                          backgroundColor: buttons[0].customStyle.backgroundColor || "#FFFFFF",
                          borderRadius: 25,
                          height: 50,
                          justifyContent: "center",
                          alignItems: "center",
                          borderWidth: 1,
                          borderColor: buttons[0].customStyle.borderColor || "#D6DADF"
                        }
                      : styles.outlineButton,
                    buttons[0].disabled && styles.buttonDisabled
                  ]}
                  onPress={buttons[0].onPress}
                  disabled={buttons[0].disabled}
                >
                  <ButtonText
                    style={[
                      buttons[0].style === "custom" && buttons[0].customStyle
                        ? {
                            fontSize: 16,
                            fontWeight: "700",
                            color: buttons[0].customStyle.textColor || "#505866"
                          }
                        : styles.outlineButtonText
                    ]}
                  >
                    {buttons[0].text}
                  </ButtonText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    buttons[1].style === "custom" && buttons[1].customStyle
                      ? {
                          backgroundColor: buttons[1].customStyle.backgroundColor || "#2B2B2B",
                          borderRadius: 25,
                          height: 50,
                          justifyContent: "center",
                          alignItems: "center",
                          borderWidth: buttons[1].customStyle.borderColor ? 1 : 0,
                          borderColor: buttons[1].customStyle.borderColor
                        }
                      : styles.solidButton,
                    buttons[1].disabled && styles.buttonDisabled
                  ]}
                  onPress={buttons[1].onPress}
                  disabled={buttons[1].disabled}
                >
                  <ButtonText
                    style={[
                      buttons[1].style === "custom" && buttons[1].customStyle
                        ? {
                            fontSize: 16,
                            fontWeight: "700",
                            color: buttons[1].customStyle.textColor || "#FFFFFF"
                          }
                        : styles.solidButtonText
                    ]}
                  >
                    {buttons[1].text}
                  </ButtonText>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}
      </View>

      {/* Bottom Tab Bar */}
      {showTabBar && (
        <View style={styles.bottomTabBar}>
          {tabs.map((tab) => (
            <TouchableOpacity key={tab.name} style={styles.tabItem} onPress={() => onTabPress?.(tab.name)}>
              <Image source={currentTab === tab.name ? tab.activeIcon : tab.icon} style={styles.tabIcon} />
              <LabelText style={[styles.tabText, currentTab === tab.name && styles.activeTabText]}>{tab.label}</LabelText>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Safe Area for Bottom */}
      <SafeAreaView style={styles.safeAreaBottom} />

      {/* Side Menu */}
      <SideMenu visible={sideMenuVisible} onClose={handleSideMenuClose} onMenuItemPress={handleSideMenuItemPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFF1F3",
    fontFamily: typography.fontFamily
  },

  wideContainer: {
    marginHorizontal: 0
  },

  safeAreaTop: {
    backgroundColor: "#FFFFFF"
  },
  safeAreaBottom: {
    backgroundColor: "#FFFFFF"
  },
  topBar: {
    backgroundColor: "#FFFFFF",
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    height: 60
  },
  noTitle: {
    height: 0,
    paddingTop: 0
  },
  wideTopBar: {
    paddingHorizontal: 5
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  backButtonText: {
    fontSize: 24,
    color: "#2B2B2B"
  },
  backButtonIcon: {
    width: 24,
    height: 24
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  menuIcon: {
    width: 24,
    height: 24
  },
  emptyButton: {
    width: 40,
    height: 40
  },
  topBarTitle: {
    position: "absolute",
    left: 0,
    right: 0,
    fontSize: 18,
    fontWeight: "700",
    color: "#2B2B2B",
    textAlign: "center",
    zIndex: 1
  },
  topBarIcons: {
    position: "absolute",
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2
  },
  leftSide: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  rightSide: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10
  },
  centeredTitle: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center"
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  iconImage: {
    width: 24,
    height: 24
  },

  notificationContainer: {
    position: "relative"
  },
  notificationDot: {
    position: "absolute",
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ECA31D"
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
    fontFamily: typography.fontFamily
  },
  wideContent: {
    paddingHorizontal: 0,
    backgroundColor: "transparent"
  },
  contentWithoutTabBar: {},
  bottomTabBar: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EFF1F3",
    paddingBottom: 8,
    paddingTop: 8,
    justifyContent: "space-between"
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  tabIcon: {
    width: 24,
    height: 24
  },
  tabText: {
    fontSize: 11,
    color: "#505866",
    marginTop: 4
  },
  activeTabText: {
    color: "#6C7072"
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12
  },
  solidButton: {
    backgroundColor: "#2B2B2B",
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  outlineButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D6DADF"
  },
  buttonDisabled: {
    backgroundColor: "#D6DADF"
  },
  solidButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF"
  },
  outlineButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#505866"
  }
});
