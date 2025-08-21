import React, { useState, useEffect } from "react";
import { SafeAreaView, Linking, Alert, Platform } from "react-native";
import { MainScreen } from "../src/screens/MainScreen";
import { BenefitsScreen } from "../src/screens/BenefitsScreen";
import { ProfileScreen } from "../src/screens/ProfileScreen";
import { MembershipCardScreen } from "../src/screens/MembershipCardScreen";
import { MembershipVerificationScreen } from "../src/screens/MembershipVerificationScreen";
import { MembershipGuideScreen } from "../src/screens/MembershipGuideScreen";
import { MyServiceScreen } from "../src/screens/MyServiceScreen";
import { ServiceDetailScreen } from "../src/screens/ServiceDetailScreen";
import { LocationSelectionScreen } from "../src/screens/LocationSelectionScreen";
import { DateSelectionScreen } from "../src/screens/DateSelectionScreen";
import { TimeSelectionScreen } from "../src/screens/TimeSelectionScreen";
import { PersonSelectionScreen } from "../src/screens/PersonSelectionScreen";
import { ReservationConfirmScreen } from "../src/screens/ReservationConfirmScreen";
import { ProductSelectionScreen } from "../src/screens/ProductSelectionScreen";
import { ProductOptionScreen } from "../src/screens/ProductOptionScreen";
// import { OrderConfirmScreen } from "../src/screens/OrderConfirmScreen";
import { PaymentScreen } from "../src/screens/PaymentScreen";
import { PasswordInputScreen } from "../src/screens/PasswordInputScreen";
import { PaymentCompleteScreen } from "../src/screens/PaymentCompleteScreen";
import { ScheduleScreen } from "../src/screens/ScheduleScreen";
import { ReservationDetailScreen } from "../src/screens/ReservationDetailScreen";
import { MembershipInfoScreen } from "../src/screens/MembershipInfoScreen";
import { VehicleManagementScreen } from "../src/screens/VehicleManagementScreen";
import { MembershipDetailScreen } from "../src/screens/MembershipDetailScreen";
import { UserMembershipInfoScreen } from "../src/screens/UserMembershipInfoScreen";
import { VersionUpdateScreen } from "../src/screens/VersionUpdateScreen";
import { VersionInfo } from "../types/version";
import { AppSettingsSubMenuScreen } from "../src/screens/AppSettingsSubMenuScreen";
import { HomeScreen } from "../src/screens/HomeScreen";
import { MembershipType } from "../types/membership";

type ScreenType =
  | "Home"
  | "MyService"
  | "Schedule"
  | "Profile"
  | "Login"
  | "Intro"
  | "Splash"
  | "Test"
  | "LocationSelection"
  | "DateSelection"
  | "TimeSelection"
  | "PersonSelection"
  | "ReservationConfirm"
  | "ProductSelection"
  | "ProductOption"
  | "OrderConfirm"
  | "Payment"
  | "PasswordInput"
  | "PaymentComplete"
  | "MembershipInfo"
  | "VehicleManagement"
  | "MembershipGuide"
  | "MembershipDetail"
  | "MembershipCard"
  | "UserMembershipInfo"
  | "AppSettings"
  | "VersionUpdate"
  | "ReservationDetail"
  | "MembershipVerification"
  | "ServiceDetail"
  | "AppSettingsSubMenu"
  | "MembershipResult";

interface AppNavigatorProps {
  onLogout?: () => void;
}

export const AppNavigator: React.FC<AppNavigatorProps> = ({ onLogout }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("Home");
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [versionInfo, setVersionInfo] = useState<VersionInfo>({
    currentVersion: "2.4.2",
    newVersion: "3.0.0",
    status: false
  });
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedPersonCount, setSelectedPersonCount] = useState<number>(0);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedOptions, setSelectedOptions] = useState<any>(null);
  const [newOrder, setNewOrder] = useState<any>(null);
  const [selectedMembershipId, setSelectedMembershipId] = useState<string>("with-doctors");
  const [selectedReservation, setSelectedReservation] = useState<any>(null);
  const [previousScreen, setPreviousScreen] = useState<ScreenType>("Home");

  useEffect(() => {
    console.log("currentScreen ::", currentScreen);
  }, []);

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
    setCurrentScreen("MembershipInfo");
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

  const handleUpdatePress = async () => {
    try {
      // 앱스토어 URL (실제 앱 ID로 변경 필요)
      const appStoreUrl =
        Platform.OS === "ios"
          ? "https://apps.apple.com/app/id123456789" // iOS App Store URL
          : "https://play.google.com/store/apps/details?id=com.wdmembership.app"; // Android Play Store URL

      const supported = await Linking.canOpenURL(appStoreUrl);
      if (supported) {
        await Linking.openURL(appStoreUrl);
      } else {
        Alert.alert("앱스토어 연결 실패", "앱스토어를 열 수 없습니다. 수동으로 앱스토어에서 업데이트를 확인해주세요.");
      }
    } catch (error) {
      console.error("앱스토어 연결 오류:", error);
      Alert.alert("오류 발생", "앱스토어 연결 중 오류가 발생했습니다. 수동으로 앱스토어에서 업데이트를 확인해주세요.");
    }
  };

  const handleBackToHome = () => {
    setCurrentScreen("Home");
  };

  const handleUserMembershipInfoPress = (membershipId: string) => {
    setSelectedMembershipId(membershipId);
    setCurrentScreen("UserMembershipInfo");
  };

  const handleMembershipGuidePress = () => {
    setCurrentScreen("MembershipGuide");
  };

  const handleBackToMembershipCardFromGuide = () => {
    setCurrentScreen("MembershipCard");
  };

  const handleMembershipDetailPress = (membershipId: string) => {
    setSelectedMembershipId(membershipId);
    setCurrentScreen("MembershipDetail");
  };

  const handleServiceDetailPress = (service: any) => {
    setSelectedService(service);
    setCurrentScreen("ServiceDetail");
  };

  const handleBackToMyService = () => {
    setCurrentScreen("MyService");
  };

  const handleBackToPreviousScreen = () => {
    setCurrentScreen(previousScreen);
  };

  const handleReservationChangePress = () => {
    // selectedReservation 데이터를 ReservationConfirmScreen에서 사용할 수 있는 형식으로 변환
    if (selectedReservation) {
      const reservationData = {
        service: {
          id: selectedReservation.id || 1,
          title: selectedReservation.title || "서비스 미정",
          category: "건강 프로그램",
          tags: "자세교정, 심신안정",
          image: selectedReservation.image || require("../assets/services/service-image-1.png")
        },
        location: {
          id: 1,
          name: selectedReservation.location || "장소 미정",
          address: "서울 서초구 서초대로 396",
          image: require("../assets/locations/mediwell-house.png")
        },
        date: selectedReservation.date || "2026-10-31",
        time: selectedReservation.time || "14:30",
        personCount: 1
      };
      setSelectedService(reservationData.service);
      setSelectedLocation(reservationData.location);
      setSelectedDate(reservationData.date);
      setSelectedTime(reservationData.time);
      setSelectedPersonCount(reservationData.personCount);
    }
    setPreviousScreen("ReservationDetail");
    setCurrentScreen("ReservationConfirm");
  };

  const handleLocationSelectPress = () => {
    setCurrentScreen("LocationSelection");
  };

  const handleBackToServiceDetail = () => {
    setCurrentScreen("ServiceDetail");
  };

  const handleLocationSelect = (location: any) => {
    console.log("선택된 지점:", location);
    setSelectedLocation(location);
    setCurrentScreen("DateSelection");
  };

  const handleDateSelect = (date: string) => {
    console.log("선택된 날짜:", date);
    setSelectedDate(date);

    // Healthy Meal Plan인 경우 상품 선택으로 이동
    if (selectedService?.title === "Healthy Meal Plan") {
      setCurrentScreen("ProductSelection");
    } else {
      setCurrentScreen("TimeSelection");
    }
  };

  const handleTimeSelect = (time: string) => {
    console.log("선택된 시간:", time);
    setSelectedTime(time);
    setCurrentScreen("PersonSelection");
  };

  const handlePersonSelect = (personCount: number) => {
    console.log("선택된 인원:", personCount);
    setSelectedPersonCount(personCount);
    setPreviousScreen("PersonSelection");
    setCurrentScreen("ReservationConfirm");
  };

  const [newReservation, setNewReservation] = useState<any>(null);

  const handleProductSelect = (product: any) => {
    console.log("선택된 상품:", product);
    setSelectedProduct(product);
    setCurrentScreen("ProductOption");
  };

  const handleOptionSelect = (options: any) => {
    console.log("선택된 옵션:", options);
    setSelectedOptions(options);
    setCurrentScreen("OrderConfirm");
  };

  const handlePaymentStart = () => {
    setCurrentScreen("Payment");
  };

  const handlePaymentConfirm = () => {
    setCurrentScreen("PasswordInput");
  };

  const handlePasswordConfirm = () => {
    setCurrentScreen("PaymentComplete");
  };

  const handlePaymentComplete = () => {
    const orderData = {
      service: selectedService,
      location: selectedLocation,
      date: selectedDate,
      product: selectedProduct,
      options: selectedOptions
    };
    console.log("주문 완료:", orderData);
    setNewOrder(orderData);
    setCurrentScreen("Schedule");
  };

  const handleConfirmOrder = () => {
    const orderData = {
      service: selectedService,
      location: selectedLocation,
      date: selectedDate,
      product: selectedProduct,
      options: selectedOptions
    };
    console.log("주문 확정:", orderData);
    setNewReservation(orderData);
    setCurrentScreen("Schedule");
  };

  const handleConfirmReservation = () => {
    const reservationData = {
      service: selectedService,
      location: selectedLocation,
      date: selectedDate,
      time: selectedTime,
      personCount: selectedPersonCount
    };
    console.log("예약 확정:", reservationData);
    setNewReservation(reservationData);
    setCurrentScreen("Schedule");
  };

  const handleBackToDateSelection = () => {
    setCurrentScreen("DateSelection");
  };

  const handleBackToTimeSelection = () => {
    setCurrentScreen("TimeSelection");
  };

  const handleBackToPersonSelection = () => {
    setCurrentScreen("PersonSelection");
  };

  const handleBackToReservationConfirm = () => {
    setCurrentScreen("ReservationConfirm");
  };

  const handleBackToProductSelection = () => {
    setCurrentScreen("ProductSelection");
  };

  const handleBackToProductOption = () => {
    setCurrentScreen("ProductOption");
  };

  const handleBackToOrderConfirm = () => {
    setCurrentScreen("OrderConfirm");
  };

  const handleBackToPayment = () => {
    setCurrentScreen("Payment");
  };

  const handleBackToPasswordInput = () => {
    setCurrentScreen("PasswordInput");
  };

  const handleSideMenuItemPress = (itemId: string) => {
    console.log(`Side menu item pressed: ${itemId}`);

    switch (itemId) {
      case "membership-info":
        setCurrentScreen("MembershipCard");
        break;
      case "membership-management":
        setCurrentScreen("MembershipInfo");
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
        console.log("챗봇 상담 시작");
        break;
      case "butler":
        console.log("전담 버틀러 연결");
        break;
      case "notice":
        console.log("공지사항 화면으로 이동");
        break;
      case "app-settings":
        setCurrentScreen("AppSettingsSubMenu");
        break;
      case "logout":
        console.log("로그아웃 처리");
        onLogout?.();
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
        setCurrentScreen("VehicleManagement");
        break;
      default:
        console.log(`처리되지 않은 메뉴 아이템: ${itemId}`);
    }
  };

  const handleMenuItemPress = (itemId: string) => {
    switch (itemId) {
      case "membershipInfo":
        setCurrentScreen("MembershipInfo");
        break;
      case "profile":
        setCurrentScreen("Profile");
        break;
      case "vehicleManagement":
        setCurrentScreen("VehicleManagement");
        break;
      case "membershipGuide":
        setCurrentScreen("MembershipGuide");
        break;
      case "appSettings":
        setCurrentScreen("AppSettingsSubMenu");
        break;
      default:
        console.log("Unknown menu item:", itemId);
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
            onServiceDetailPress={handleServiceDetailPress}
          />
        );
      case "Schedule":
        return (
          <ScheduleScreen
            currentTab={currentScreen}
            onTabPress={handleTabPress}
            onReservationDetailPress={(reservationData) => {
              setSelectedReservation(reservationData);
              setCurrentScreen("ReservationDetail");
            }}
            onSideMenuItemPress={handleSideMenuItemPress}
            newReservation={newReservation}
          />
        );
      case "MembershipCard":
        return (
          <MembershipCardScreen
            currentTab={currentScreen}
            onTabPress={handleTabPress}
            onMembershipVerificationPress={handleMembershipVerificationPress}
            onUserMembershipInfoPress={(membershipId) => handleUserMembershipInfoPress(membershipId)}
            onMembershipInfoPress={() => handleUserMembershipInfoPress(selectedMembershipId)}
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
            onMenuItemPress={(itemId) => handleMembershipDetailPress(itemId as MembershipType)}
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
            onLocationSelectPress={handleLocationSelectPress}
            currentTab={currentScreen}
            onTabPress={handleTabPress}
            onSideMenuItemPress={handleSideMenuItemPress}
          />
        );
      case "LocationSelection":
        console.log("LocationSelection 렌더링 - selectedService:", selectedService);
        return (
          <LocationSelectionScreen
            service={selectedService}
            onBackPress={handleBackToServiceDetail}
            onLocationSelect={handleLocationSelect}
            currentTab={currentScreen}
            onTabPress={handleTabPress}
            onSideMenuItemPress={handleSideMenuItemPress}
          />
        );
      case "DateSelection":
        return (
          <DateSelectionScreen
            service={selectedService}
            selectedLocation={selectedLocation}
            onBackPress={handleBackToServiceDetail}
            onDateSelect={handleDateSelect}
            currentTab={currentScreen}
            onTabPress={handleTabPress}
            onSideMenuItemPress={handleSideMenuItemPress}
          />
        );
      case "TimeSelection":
        return (
          <TimeSelectionScreen
            service={selectedService}
            selectedLocation={selectedLocation}
            selectedDate={selectedDate}
            onBackPress={handleBackToDateSelection}
            onTimeSelect={handleTimeSelect}
            currentTab={currentScreen}
            onTabPress={handleTabPress}
            onSideMenuItemPress={handleSideMenuItemPress}
          />
        );
      case "PersonSelection":
        return (
          <PersonSelectionScreen
            service={selectedService}
            selectedLocation={selectedLocation}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onBackPress={handleBackToTimeSelection}
            onPersonSelect={handlePersonSelect}
            currentTab={currentScreen}
            onTabPress={handleTabPress}
            onSideMenuItemPress={handleSideMenuItemPress}
          />
        );
      case "ProductSelection":
        return (
          <ProductSelectionScreen
            service={selectedService}
            selectedLocation={selectedLocation}
            selectedDate={selectedDate}
            onBackPress={handleBackToServiceDetail}
            onProductSelect={handleProductSelect}
            currentTab={currentScreen}
            onTabPress={handleTabPress}
            onSideMenuItemPress={handleSideMenuItemPress}
          />
        );
      case "ProductOption":
        return (
          <ProductOptionScreen
            service={selectedService}
            selectedLocation={selectedLocation}
            selectedDate={selectedDate}
            selectedProduct={selectedProduct}
            onBackPress={handleBackToProductSelection}
            onOptionSelect={handleOptionSelect}
            currentTab={currentScreen}
            onTabPress={handleTabPress}
            onSideMenuItemPress={handleSideMenuItemPress}
          />
        );
      case "OrderConfirm":
        return (
          <ReservationConfirmScreen
            reservationData={{
              service: selectedService,
              location: selectedLocation,
              date: selectedDate,
              time: selectedTime || "14:30", // 기본값 설정
              personCount: selectedPersonCount || 1, // 기본값 설정
              type: selectedService.type
            }}
            onBackPress={handleBackToProductOption}
            onConfirmReservation={handlePaymentStart} // 결제 시작으로 연결
            currentTab={currentScreen}
            onTabPress={handleTabPress}
            onSideMenuItemPress={handleSideMenuItemPress}
          />
        );
      case "Payment":
        return (
          <PaymentScreen
            service={selectedService}
            selectedLocation={selectedLocation}
            selectedDate={selectedDate}
            selectedProduct={selectedProduct}
            selectedOptions={selectedOptions}
            onBackPress={handleBackToOrderConfirm}
            onPaymentConfirm={handlePaymentConfirm}
            currentTab={currentScreen}
            onTabPress={handleTabPress}
            onSideMenuItemPress={handleSideMenuItemPress}
          />
        );
      case "PasswordInput":
        return (
          <PasswordInputScreen
            onBackPress={handleBackToPayment}
            onPasswordConfirm={handlePasswordConfirm}
            currentTab={currentScreen}
            onTabPress={handleTabPress}
            onSideMenuItemPress={handleSideMenuItemPress}
          />
        );
      case "PaymentComplete":
        return (
          <PaymentCompleteScreen
            service={selectedService}
            selectedLocation={selectedLocation}
            selectedDate={selectedDate}
            selectedProduct={selectedProduct}
            selectedOptions={selectedOptions}
            onBackPress={handleBackToPasswordInput}
            onGoToMyService={handlePaymentComplete}
            currentTab={currentScreen}
            onTabPress={handleTabPress}
            onSideMenuItemPress={handleSideMenuItemPress}
          />
        );
      case "ReservationConfirm":
        return (
          <ReservationConfirmScreen
            reservationData={{
              service: selectedService,
              location: selectedLocation,
              date: selectedDate,
              time: selectedTime,
              personCount: selectedPersonCount,
              type: selectedService.type
            }}
            onBackPress={handleBackToPreviousScreen}
            onConfirmReservation={handleConfirmReservation}
            currentTab={currentScreen}
            onTabPress={handleTabPress}
            onSideMenuItemPress={handleSideMenuItemPress}
          />
        );
      case "ReservationDetail":
        return (
          <ReservationDetailScreen
            reservationData={selectedReservation}
            onBackPress={handleBackToSchedule}
            onReservationStart={() => setCurrentScreen("MyService")}
            onReservationChangePress={handleReservationChangePress}
            currentTab={currentScreen}
            onTabPress={handleTabPress}
            onSideMenuItemPress={handleSideMenuItemPress}
          />
        );
      case "MembershipInfo":
        return (
          <MembershipInfoScreen
            onBackPress={handleBackToHome}
            onMenuPress={() => {}}
            onCouponPress={() => {}}
            onNotificationPress={() => {}}
            currentTab={currentScreen}
            onTabPress={handleTabPress}
            onSideMenuItemPress={handleSideMenuItemPress}
          />
        );
      case "VehicleManagement":
        return (
          <VehicleManagementScreen onBackPress={handleBackToHome} onMenuPress={() => {}} onCouponPress={() => {}} onNotificationPress={() => {}} />
        );
      case "Profile":
        return <ProfileScreen currentTab={currentScreen} onTabPress={handleTabPress} onSideMenuItemPress={handleSideMenuItemPress} />;
      case "MembershipDetail":
        return (
          <MembershipDetailScreen
            membershipId={selectedMembershipId}
            onBackPress={handleMembershipGuidePress}
            onConsultationPress={() => {}} // 전화 기능은 컴포넌트 내부에서 처리
          />
        );
      case "UserMembershipInfo":
        return (
          <UserMembershipInfoScreen
            membershipId={selectedMembershipId}
            membershipType={MembershipType.PH_1603} // 임시로 고정값 사용
            onBackPress={handleBackToMembershipCard}
            onConsultationPress={async () => {
              // 멤버십 상담 문의 처리
              console.log("멤버십 상담 문의");
              const phoneNumber = "1588-1234";

              try {
                // 전화번호에서 하이픈 제거
                const cleanPhoneNumber = phoneNumber.replace(/-/g, "");
                const telUrl = `tel:${cleanPhoneNumber}`;

                console.log("전화 연결 시도:", telUrl);

                const supported = await Linking.canOpenURL(telUrl);
                console.log("전화 앱 지원 여부:", supported);

                if (supported) {
                  await Linking.openURL(telUrl);
                } else {
                  // 전화 앱이 지원되지 않는 경우 (시뮬레이터 등)
                  Alert.alert("전화 연결", `전화 앱을 열 수 없습니다.\n\n전화번호: ${phoneNumber}\n\n직접 전화를 걸어주세요.`, [
                    { text: "확인", style: "default" }
                  ]);
                }
              } catch (error) {
                console.error("전화 연결 오류:", error);
                Alert.alert("오류 발생", "전화 연결 중 오류가 발생했습니다.\n\n전화번호: 1588-1234\n\n직접 전화를 걸어주세요.", [
                  { text: "확인", style: "default" }
                ]);
              }
            }}
          />
        );
      case "AppSettings":
        return <AppSettingsSubMenuScreen onBackPress={handleBackToHome} onVersionUpdatePress={() => setCurrentScreen("VersionUpdate")} />;
      case "VersionUpdate":
        return (
          <VersionUpdateScreen
            onBackPress={() => setCurrentScreen("AppSettingsSubMenu")}
            onUpdatePress={handleUpdatePress}
            versionInfo={versionInfo}
          />
        );
      case "AppSettingsSubMenu":
        return (
          <AppSettingsSubMenuScreen
            onBackPress={() => setCurrentScreen("Home")}
            onVersionUpdatePress={(info) => {
              setVersionInfo(info);
              setCurrentScreen("VersionUpdate");
            }}
          />
        );
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
