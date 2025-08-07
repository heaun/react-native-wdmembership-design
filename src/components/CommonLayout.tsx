import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SideMenu } from "./SideMenu";

interface TabItem {
  name: string;
  icon: string;
  label: string;
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
}

export const CommonLayout: React.FC<CommonLayoutProps> = ({
  title,
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
  onSideMenuItemPress
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
    { name: "Home", icon: "home", label: "홈" },
    { name: "Schedule", icon: "calendar", label: "나의일정" },
    { name: "MembershipCard", icon: "card", label: "멤버쉽카드" },
    { name: "MyService", icon: "person", label: "마이서비스" }
  ];
  return (
    <View style={[styles.container, isWideLayout && styles.wideContainer]}>
      {/* Status Bar */}
      {/* <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" /> */}

      {/* Top Bar */}
      <View style={[styles.topBar, isWideLayout && styles.wideTopBar]}>
        {showBackButton ? (
          <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
        ) : showTopIcons ? (
          <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
            <Ionicons name="menu" size={24} color="#2B2B2B" />
          </TouchableOpacity>
        ) : (
          <View style={styles.emptyButton} />
        )}
        <Text style={[styles.topBarTitle, !showBackButton && !showTopIcons && styles.centeredTitle]}>{title}</Text>
        {showTopIcons && (
          <View style={styles.rightIcons}>
            <TouchableOpacity style={styles.iconButton} onPress={onCouponPress}>
              <Ionicons name="ticket-outline" size={24} color="#2B2B2B" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={onNotificationPress}>
              <View style={styles.notificationContainer}>
                <Ionicons name="notifications-outline" size={24} color="#2B2B2B" />
                <View style={styles.notificationDot} />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Main Content */}
      <View style={[styles.content, !showTabBar && styles.contentWithoutTabBar, isWideLayout && styles.wideContent]}>{children}</View>

      {/* Bottom Tab Bar */}
      {showTabBar && (
        <View style={styles.bottomTabBar}>
          {tabs.map((tab) => (
            <TouchableOpacity key={tab.name} style={styles.tabItem} onPress={() => onTabPress?.(tab.name)}>
              <Ionicons
                name={currentTab === tab.name ? (tab.icon as any) : (`${tab.icon}-outline` as any)}
                size={24}
                color={currentTab === tab.name ? "#6C7072" : "#505866"}
              />
              <Text style={[styles.tabText, currentTab === tab.name && styles.activeTabText]}>{tab.label}</Text>
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
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 5
  },

  wideContainer: {
    paddingHorizontal: 0
  },

  safeAreaTop: {
    backgroundColor: "#FFFFFF"
  },
  safeAreaBottom: {
    backgroundColor: "#FFFFFF"
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 10,
    height: 60
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
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  emptyButton: {
    width: 40,
    height: 40
  },
  topBarTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2B2B2B"
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
    paddingHorizontal: 10
  },
  wideContent: {
    paddingHorizontal: 0
  },
  contentWithoutTabBar: {
    paddingBottom: 20
  },
  bottomTabBar: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EFF1F3",
    paddingBottom: 8,
    paddingTop: 8,
    height: 56
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4
  },
  tabText: {
    fontSize: 11,
    fontWeight: "400",
    color: "#505866",
    marginTop: 4
  },
  activeTabText: {
    color: "#6C7072"
  }
});
