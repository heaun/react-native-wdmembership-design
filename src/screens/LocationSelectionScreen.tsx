import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions } from "react-native";
import { CommonLayout } from "../components/CommonLayout";
import { LabelText, ButtonText, SmallText, BodyText } from "../components/CommonText";

const { width: screenWidth } = Dimensions.get("window");

interface LocationSelectionScreenProps {
  service: {
    id: number;
    title: string;
    category: string;
    tags: string;
    image: any;
  };
  onBackPress?: () => void;
  onLocationSelect?: (location: LocationItem) => void;
  currentTab?: string;
  onTabPress?: (tabName: string) => void;
  onSideMenuItemPress?: (itemId: string) => void;
}

interface LocationItem {
  id: number;
  name: string;
  address: string;
  image: any;
  isSelected?: boolean;
}

export const LocationSelectionScreen: React.FC<LocationSelectionScreenProps> = ({
  service,
  onBackPress,
  onLocationSelect,
  currentTab,
  onTabPress,
  onSideMenuItemPress
}) => {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);

  // 서비스별 지점 데이터
  const getLocationData = (serviceId: number): LocationItem[] => {
    const locationDataMap: { [key: number]: LocationItem[] } = {
      1: [
        {
          id: 1,
          name: "오르빗 라이프센터",
          address: "서울 종로구",
          image: require("../../assets/locations/orbit-life-center-655ee4.png")
        },
        {
          id: 2,
          name: "루미엘 센터",
          address: "경기도 인천시 연수구",
          image: require("../../assets/locations/lumiere-center.png")
        },
        {
          id: 3,
          name: "모브 루멘 레지던스",
          address: "서울 서대문구",
          image: require("../../assets/locations/mob-lumen-residence-6e118e.png")
        },
        {
          id: 4,
          name: "위드닥터스 케어센터",
          address: "경기도 하남시",
          image: require("../../assets/locations/withdoctors-care-center.png")
        },
        {
          id: 5,
          name: "메디웰하우스",
          address: "서울 서초구",
          image: require("../../assets/locations/mediwell-house.png")
        },
        {
          id: 6,
          name: "에스카야 프라이빗",
          address: "서울 구로구",
          image: require("../../assets/locations/escaya-private-3fee92.png")
        },
        {
          id: 7,
          name: "세레노 타워",
          address: "서울 종로구",
          image: require("../../assets/locations/sereno-tower-d0b7ca.png")
        },
        {
          id: 8,
          name: "디아망 레지던스",
          address: "세종특별별치시",
          image: require("../../assets/locations/diamond-residence-41faf3.png")
        }
      ],
      2: [
        {
          id: 1,
          name: "오르빗 라이프센터",
          address: "서울 종로구",
          image: require("../../assets/locations/orbit-life-center-655ee4.png")
        },
        {
          id: 2,
          name: "루미엘 센터",
          address: "경기도 인천시 연수구",
          image: require("../../assets/locations/lumiere-center.png")
        },
        {
          id: 3,
          name: "모브 루멘 레지던스",
          address: "서울 서대문구",
          image: require("../../assets/locations/mob-lumen-residence-6e118e.png")
        },
        {
          id: 4,
          name: "위드닥터스 케어센터",
          address: "경기도 하남시",
          image: require("../../assets/locations/withdoctors-care-center.png")
        },
        {
          id: 5,
          name: "메디웰하우스",
          address: "서울 서초구",
          image: require("../../assets/locations/mediwell-house.png")
        },
        {
          id: 6,
          name: "에스카야 프라이빗",
          address: "서울 구로구",
          image: require("../../assets/locations/escaya-private-3fee92.png")
        },
        {
          id: 7,
          name: "세레노 타워",
          address: "서울 종로구",
          image: require("../../assets/locations/sereno-tower-d0b7ca.png")
        },
        {
          id: 8,
          name: "디아망 레지던스",
          address: "세종특별별치시",
          image: require("../../assets/locations/diamond-residence-41faf3.png")
        }
      ],
      3: [
        {
          id: 1,
          name: "오르빗 라이프센터",
          address: "서울 종로구",
          image: require("../../assets/locations/orbit-life-center-655ee4.png")
        },
        {
          id: 2,
          name: "루미엘 센터",
          address: "경기도 인천시 연수구",
          image: require("../../assets/locations/lumiere-center.png")
        },
        {
          id: 3,
          name: "모브 루멘 레지던스",
          address: "서울 서대문구",
          image: require("../../assets/locations/mob-lumen-residence-6e118e.png")
        },
        {
          id: 4,
          name: "위드닥터스 케어센터",
          address: "경기도 하남시",
          image: require("../../assets/locations/withdoctors-care-center.png")
        },
        {
          id: 5,
          name: "메디웰하우스",
          address: "서울 서초구",
          image: require("../../assets/locations/mediwell-house.png")
        },
        {
          id: 6,
          name: "에스카야 프라이빗",
          address: "서울 구로구",
          image: require("../../assets/locations/escaya-private-3fee92.png")
        },
        {
          id: 7,
          name: "세레노 타워",
          address: "서울 종로구",
          image: require("../../assets/locations/sereno-tower-d0b7ca.png")
        },
        {
          id: 8,
          name: "디아망 레지던스",
          address: "세종특별별치시",
          image: require("../../assets/locations/diamond-residence-41faf3.png")
        }
      ],
      4: [
        {
          id: 1,
          name: "오르빗 라이프센터",
          address: "서울 종로구",
          image: require("../../assets/locations/orbit-life-center-655ee4.png")
        },
        {
          id: 2,
          name: "루미엘 센터",
          address: "경기도 인천시 연수구",
          image: require("../../assets/locations/lumiere-center.png")
        },
        {
          id: 3,
          name: "모브 루멘 레지던스",
          address: "서울 서대문구",
          image: require("../../assets/locations/mob-lumen-residence-6e118e.png")
        },
        {
          id: 4,
          name: "위드닥터스 케어센터",
          address: "경기도 하남시",
          image: require("../../assets/locations/withdoctors-care-center.png")
        },
        {
          id: 5,
          name: "메디웰하우스",
          address: "서울 서초구",
          image: require("../../assets/locations/mediwell-house.png")
        },
        {
          id: 6,
          name: "에스카야 프라이빗",
          address: "서울 구로구",
          image: require("../../assets/locations/escaya-private-3fee92.png")
        },
        {
          id: 7,
          name: "세레노 타워",
          address: "서울 종로구",
          image: require("../../assets/locations/sereno-tower-d0b7ca.png")
        },
        {
          id: 8,
          name: "디아망 레지던스",
          address: "세종특별별치시",
          image: require("../../assets/locations/diamond-residence-41faf3.png")
        }
      ],
      5: [
        {
          id: 1,
          name: "오르빗 라이프센터",
          address: "서울 종로구",
          image: require("../../assets/locations/orbit-life-center-655ee4.png")
        },
        {
          id: 2,
          name: "루미엘 센터",
          address: "경기도 인천시 연수구",
          image: require("../../assets/locations/lumiere-center.png")
        },
        {
          id: 3,
          name: "모브 루멘 레지던스",
          address: "서울 서대문구",
          image: require("../../assets/locations/mob-lumen-residence-6e118e.png")
        },
        {
          id: 4,
          name: "위드닥터스 케어센터",
          address: "경기도 하남시",
          image: require("../../assets/locations/withdoctors-care-center.png")
        },
        {
          id: 5,
          name: "메디웰하우스",
          address: "서울 서초구",
          image: require("../../assets/locations/mediwell-house.png")
        },
        {
          id: 6,
          name: "에스카야 프라이빗",
          address: "서울 구로구",
          image: require("../../assets/locations/escaya-private-3fee92.png")
        },
        {
          id: 7,
          name: "세레노 타워",
          address: "서울 종로구",
          image: require("../../assets/locations/sereno-tower-d0b7ca.png")
        },
        {
          id: 8,
          name: "디아망 레지던스",
          address: "세종특별별치시",
          image: require("../../assets/locations/diamond-residence-41faf3.png")
        }
      ],
      6: [
        {
          id: 1,
          name: "오르빗 라이프센터",
          address: "서울 종로구",
          image: require("../../assets/locations/orbit-life-center-655ee4.png")
        },
        {
          id: 2,
          name: "루미엘 센터",
          address: "경기도 인천시 연수구",
          image: require("../../assets/locations/lumiere-center.png")
        },
        {
          id: 3,
          name: "모브 루멘 레지던스",
          address: "서울 서대문구",
          image: require("../../assets/locations/mob-lumen-residence-6e118e.png")
        },
        {
          id: 4,
          name: "위드닥터스 케어센터",
          address: "경기도 하남시",
          image: require("../../assets/locations/withdoctors-care-center.png")
        },
        {
          id: 5,
          name: "메디웰하우스",
          address: "서울 서초구",
          image: require("../../assets/locations/mediwell-house.png")
        },
        {
          id: 6,
          name: "에스카야 프라이빗",
          address: "서울 구로구",
          image: require("../../assets/locations/escaya-private-3fee92.png")
        },
        {
          id: 7,
          name: "세레노 타워",
          address: "서울 종로구",
          image: require("../../assets/locations/sereno-tower-d0b7ca.png")
        },
        {
          id: 8,
          name: "디아망 레지던스",
          address: "세종특별별치시",
          image: require("../../assets/locations/diamond-residence-41faf3.png")
        }
      ]
    };

    return locationDataMap[serviceId] || locationDataMap[1];
  };

  console.log("LocationSelectionScreen - service:", service);

  // service가 없을 경우 기본값 제공
  const serviceId = service?.id || 1;
  const locations = getLocationData(serviceId);
  console.log("LocationSelectionScreen - locations:", locations);

  const handleLocationPress = (location: LocationItem) => {
    setSelectedLocation(location.id);
  };

  const handleConfirmPress = () => {
    if (selectedLocation) {
      const selectedLocationData = locations.find((loc) => loc.id === selectedLocation);
      if (selectedLocationData) {
        onLocationSelect?.(selectedLocationData);
      }
    }
  };

  return (
    <CommonLayout
      title="장소 선택"
      showBackButton={true}
      showTabBar={false}
      onBackPress={onBackPress}
      onMenuPress={() => console.log("메뉴 버튼 클릭")}
      onCouponPress={() => console.log("쿠폰 버튼 클릭")}
      onNotificationPress={() => console.log("알림 버튼 클릭")}
      currentTab={currentTab}
      onTabPress={onTabPress}
      onSideMenuItemPress={onSideMenuItemPress}
    >
      <View style={styles.container}>
        <LabelText style={styles.title}>원하시는 장소를 선택해주세요.</LabelText>

        <ScrollView style={styles.locationList} showsVerticalScrollIndicator={false}>
          {locations.map((location) => (
            <TouchableOpacity
              key={location.id}
              style={[styles.locationItem, selectedLocation === location.id && styles.selectedLocationItem]}
              onPress={() => handleLocationPress(location)}
            >
              <View style={styles.locationImageContainer}>
                <Image source={location.image} style={styles.locationImage} resizeMode="cover" />
              </View>
              <View style={styles.locationInfo}>
                <LabelText style={styles.locationName}>{location.name}</LabelText>
                <LabelText style={styles.locationAddress}>{location.address}</LabelText>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.confirmButton, !selectedLocation && styles.disabledButton]}
            onPress={handleConfirmPress}
            disabled={!selectedLocation}
          >
            <LabelText style={styles.confirmButtonText}>장소 선택</LabelText>
          </TouchableOpacity>
        </View>
      </View>
    </CommonLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#2B2B2B",
    marginTop: 20,
    marginBottom: 20,
    letterSpacing: -0.8
  },
  locationList: {
    flex: 1
  },
  locationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D6DADF",
    borderRadius: 6
  },
  selectedLocationItem: {
    borderColor: "#B48327",
    borderWidth: 2
  },
  locationImageContainer: {
    width: 60,
    height: 45,
    borderRadius: 6,
    overflow: "hidden",
    marginRight: 16
  },
  locationImage: {
    width: "100%",
    height: "100%"
  },
  locationInfo: {
    flex: 1
  },
  locationName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2B2B2B",
    marginBottom: 6,
    letterSpacing: -0.64
  },
  locationAddress: {
    fontSize: 12,
    fontWeight: "700",
    color: "#505866",
    letterSpacing: -0.48
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EFF1F3"
  },
  confirmButton: {
    backgroundColor: "#2B2B2B",
    borderRadius: 48,
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  disabledButton: {
    backgroundColor: "#E0E0E0"
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.64
  }
});
