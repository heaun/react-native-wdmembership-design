import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { MainScreen } from "../src/screens/MainScreen";
import { BenefitsScreen } from "../src/screens/BenefitsScreen";
import { ProfileScreen } from "../src/screens/ProfileScreen";
import { MembershipCardScreen } from "../src/screens/MembershipCardScreen";
import { ScheduleScreen } from "../src/screens/ScheduleScreen";
import { ReservationDetailScreen } from "../src/screens/ReservationDetailScreen";

type ScreenType = "Home" | "Schedule" | "MembershipCard" | "MyService" | "ReservationDetail";

export const AppNavigator: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("Home");

  const handleTabPress = (tabName: string) => {
    if (tabName === "Home" || tabName === "Schedule" || tabName === "MembershipCard" || tabName === "MyService") {
      setCurrentScreen(tabName as ScreenType);
    }
  };

  const handleReservationDetailPress = () => {
    setCurrentScreen("ReservationDetail");
  };

  const handleBackToSchedule = () => {
    setCurrentScreen("Schedule");
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "Home":
        return <MainScreen currentTab={currentScreen} onTabPress={handleTabPress} onReservationDetailPress={handleReservationDetailPress} />;
      case "Schedule":
        return <ScheduleScreen currentTab={currentScreen} onTabPress={handleTabPress} onReservationDetailPress={handleReservationDetailPress} />;
      case "MembershipCard":
        return <MembershipCardScreen currentTab={currentScreen} onTabPress={handleTabPress} />;
      case "MyService":
        return <ProfileScreen currentTab={currentScreen} onTabPress={handleTabPress} />;
      case "ReservationDetail":
        return <ReservationDetailScreen onBackPress={handleBackToSchedule} currentTab={currentScreen} onTabPress={handleTabPress} />;
      default:
        return <MainScreen currentTab={currentScreen} onTabPress={handleTabPress} onReservationDetailPress={handleReservationDetailPress} />;
    }
  };

  return <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>{renderScreen()}</SafeAreaView>;
};
