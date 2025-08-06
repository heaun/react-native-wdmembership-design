import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { MainScreen } from "../src/screens/MainScreen";
import { BenefitsScreen } from "../src/screens/BenefitsScreen";
import { ProfileScreen } from "../src/screens/ProfileScreen";
import { MembershipCardScreen } from "../src/screens/MembershipCardScreen";
import { MembershipVerificationScreen } from "../src/screens/MembershipVerificationScreen";
import { MembershipGuideScreen } from "../src/screens/MembershipGuideScreen";
import { ScheduleScreen } from "../src/screens/ScheduleScreen";
import { ReservationDetailScreen } from "../src/screens/ReservationDetailScreen";

type ScreenType =
  | "Home"
  | "Schedule"
  | "MembershipCard"
  | "MyService"
  | "ReservationDetail"
  | "Profile"
  | "MembershipVerification"
  | "MembershipGuide";

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

  const handleMembershipManagePress = () => {
    setCurrentScreen("MembershipCard");
  };

  const handleEditProfilePress = () => {
    setCurrentScreen("Profile");
  };

  const handleViewAllServicesPress = () => {
    setCurrentScreen("MyService");
  };

  const handleMembershipVerificationPress = () => {
    setCurrentScreen("MembershipVerification");
  };

  const handleBackToMembershipCard = () => {
    setCurrentScreen("MembershipCard");
  };

  const handleMembershipGuidePress = () => {
    setCurrentScreen("MembershipGuide");
  };

  const handleBackToMembershipCardFromGuide = () => {
    setCurrentScreen("MembershipCard");
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "Home":
        return (
          <MainScreen
            currentTab={currentScreen}
            onTabPress={handleTabPress}
            onReservationDetailPress={handleReservationDetailPress}
            onMembershipManagePress={handleMembershipManagePress}
            onEditProfilePress={handleEditProfilePress}
            onViewAllServicesPress={handleViewAllServicesPress}
          />
        );
      case "Schedule":
        return <ScheduleScreen currentTab={currentScreen} onTabPress={handleTabPress} onReservationDetailPress={handleReservationDetailPress} />;
      case "MembershipCard":
        return (
          <MembershipCardScreen
            currentTab={currentScreen}
            onTabPress={handleTabPress}
            onMembershipVerificationPress={handleMembershipVerificationPress}
            onMembershipGuidePress={handleMembershipGuidePress}
          />
        );
      case "MembershipVerification":
        return <MembershipVerificationScreen onBackPress={handleBackToMembershipCard} currentTab={currentScreen} onTabPress={handleTabPress} />;
      case "MembershipGuide":
        return <MembershipGuideScreen onBackPress={handleBackToMembershipCardFromGuide} currentTab={currentScreen} onTabPress={handleTabPress} />;
      case "MyService":
        return <ProfileScreen currentTab={currentScreen} onTabPress={handleTabPress} />;
      case "ReservationDetail":
        return <ReservationDetailScreen onBackPress={handleBackToSchedule} currentTab={currentScreen} onTabPress={handleTabPress} />;
      case "Profile":
        return <ProfileScreen currentTab={currentScreen} onTabPress={handleTabPress} />;
      default:
        return <MainScreen currentTab={currentScreen} onTabPress={handleTabPress} onReservationDetailPress={handleReservationDetailPress} />;
    }
  };

  return <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>{renderScreen()}</SafeAreaView>;
};
