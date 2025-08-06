import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { MainScreen } from "../src/screens/MainScreen";
import { BenefitsScreen } from "../src/screens/BenefitsScreen";
import { ProfileScreen } from "../src/screens/ProfileScreen";
import { MembershipCardScreen } from "../src/screens/MembershipCardScreen";
import { MembershipVerificationScreen } from "../src/screens/MembershipVerificationScreen";
import { MembershipGuideScreen } from "../src/screens/MembershipGuideScreen";
import { MyServiceScreen } from "../src/screens/MyServiceScreen";
import { ServiceDetailScreen } from "../src/screens/ServiceDetailScreen";
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
  | "MembershipGuide"
  | "ServiceDetail";

export const AppNavigator: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("Home");
  const [selectedService, setSelectedService] = useState<any>(null);

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

  const handleServiceDetailPress = (service: any) => {
    setSelectedService(service);
    setCurrentScreen("ServiceDetail");
  };

  const handleBackToMyService = () => {
    setCurrentScreen("MyService");
  };

  const handleSideMenuItemPress = (itemId: string) => {
    console.log(`Side menu item pressed: ${itemId}`);

    switch (itemId) {
      case "membership-info":
        setCurrentScreen("MembershipCard");
        break;
      case "my-info":
        setCurrentScreen("Profile");
        break;
      case "membership-benefits":
        setCurrentScreen("MembershipGuide");
        break;
      case "faq":
        console.log("FAQ 화면으로 이동");
        break;
      case "chatbot":
        console.log("쳇봇 상담 시작");
        break;
      case "butler":
        console.log("전담 버틀러 연결");
        break;
      case "notice":
        console.log("공지사항 화면으로 이동");
        break;
      case "app-settings":
        console.log("앱 설정 화면으로 이동");
        break;
      case "logout":
        console.log("로그아웃 처리");
        break;
      case "payment-methods":
        console.log("결제 수단 리스트 조회");
        break;
      case "payment-history":
        console.log("결제 이력 조회");
        break;
      case "payment-register":
        console.log("결제 수단 등록/삭제");
        break;
      case "vehicle-management":
        console.log("차량 관리");
        break;
      default:
        console.log(`처리되지 않은 메뉴 아이템: ${itemId}`);
    }
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
            onSideMenuItemPress={handleSideMenuItemPress}
          />
        );
      case "Schedule":
        return (
          <ScheduleScreen
            currentTab={currentScreen}
            onTabPress={handleTabPress}
            onReservationDetailPress={handleReservationDetailPress}
            onSideMenuItemPress={handleSideMenuItemPress}
          />
        );
      case "MembershipCard":
        return (
          <MembershipCardScreen
            currentTab={currentScreen}
            onTabPress={handleTabPress}
            onMembershipVerificationPress={handleMembershipVerificationPress}
            onMembershipGuidePress={handleMembershipGuidePress}
            onSideMenuItemPress={handleSideMenuItemPress}
          />
        );
      case "MembershipVerification":
        return (
          <MembershipVerificationScreen
            onBackPress={handleBackToMembershipCard}
            currentTab={currentScreen}
            onTabPress={handleTabPress}
            onSideMenuItemPress={handleSideMenuItemPress}
          />
        );
      case "MembershipGuide":
        return (
          <MembershipGuideScreen
            onBackPress={handleBackToMembershipCardFromGuide}
            currentTab={currentScreen}
            onTabPress={handleTabPress}
            onSideMenuItemPress={handleSideMenuItemPress}
          />
        );
      case "MyService":
        return (
          <MyServiceScreen
            currentTab={currentScreen}
            onTabPress={handleTabPress}
            onServiceDetailPress={handleServiceDetailPress}
            onSideMenuItemPress={handleSideMenuItemPress}
          />
        );
      case "ServiceDetail":
        return (
          <ServiceDetailScreen
            service={selectedService}
            onBackPress={handleBackToMyService}
            currentTab={currentScreen}
            onTabPress={handleTabPress}
            onSideMenuItemPress={handleSideMenuItemPress}
          />
        );
      case "ReservationDetail":
        return (
          <ReservationDetailScreen
            onBackPress={handleBackToSchedule}
            currentTab={currentScreen}
            onTabPress={handleTabPress}
            onSideMenuItemPress={handleSideMenuItemPress}
          />
        );
      case "Profile":
        return <ProfileScreen currentTab={currentScreen} onTabPress={handleTabPress} onSideMenuItemPress={handleSideMenuItemPress} />;
      default:
        return (
          <MainScreen
            currentTab={currentScreen}
            onTabPress={handleTabPress}
            onReservationDetailPress={handleReservationDetailPress}
            onSideMenuItemPress={handleSideMenuItemPress}
          />
        );
    }
  };

  return <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>{renderScreen()}</SafeAreaView>;
};
