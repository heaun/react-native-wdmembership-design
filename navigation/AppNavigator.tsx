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
import { LocationSelectionScreen } from "../src/screens/LocationSelectionScreen";
import { DateSelectionScreen } from "../src/screens/DateSelectionScreen";
import { TimeSelectionScreen } from "../src/screens/TimeSelectionScreen";
import { PersonSelectionScreen } from "../src/screens/PersonSelectionScreen";
import { ReservationConfirmScreen } from "../src/screens/ReservationConfirmScreen";
import { ProductSelectionScreen } from "../src/screens/ProductSelectionScreen";
import { ProductOptionScreen } from "../src/screens/ProductOptionScreen";
import { OrderConfirmScreen } from "../src/screens/OrderConfirmScreen";
import { PaymentScreen } from "../src/screens/PaymentScreen";
import { PasswordInputScreen } from "../src/screens/PasswordInputScreen";
import { PaymentCompleteScreen } from "../src/screens/PaymentCompleteScreen";
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
  | "ServiceDetail"
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
  | "PaymentComplete";

export const AppNavigator: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("Home");
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedPersonCount, setSelectedPersonCount] = useState<number>(0);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedOptions, setSelectedOptions] = useState<any>(null);
  const [newOrder, setNewOrder] = useState<any>(null);

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
    setCurrentScreen("MyService");
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
            newReservation={newReservation}
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
            onLocationSelectPress={handleLocationSelectPress}
            currentTab={currentScreen}
            onTabPress={handleTabPress}
            onSideMenuItemPress={handleSideMenuItemPress}
          />
        );
      case "LocationSelection":
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
          <OrderConfirmScreen
            service={selectedService}
            selectedLocation={selectedLocation}
            selectedDate={selectedDate}
            selectedProduct={selectedProduct}
            selectedOptions={selectedOptions}
            onBackPress={handleBackToProductOption}
            onConfirmOrder={handleConfirmOrder}
            onPaymentStart={handlePaymentStart}
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
            service={selectedService}
            selectedLocation={selectedLocation}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            selectedPersonCount={selectedPersonCount}
            onBackPress={handleBackToPersonSelection}
            onConfirmReservation={handleConfirmReservation}
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
