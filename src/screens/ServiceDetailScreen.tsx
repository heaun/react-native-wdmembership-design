import React from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions } from "react-native";
import { CommonLayout } from "../components/CommonLayout";
import { LabelText, ButtonText, SmallText, ExtraBoldText, HeavyText } from "../components/CommonText";
const { width: screenWidth } = Dimensions.get("window");

interface ServiceDetailScreenProps {
  service: {
    id: number;
    title: string;
    category: string;
    tags: string;
    image: any;
  };
  onBackPress?: () => void;
  onLocationSelectPress?: () => void;
  currentTab?: string;
  onTabPress?: (tabName: string) => void;
  onSideMenuItemPress?: (itemId: string) => void;
}

interface ServiceDetailData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  serviceItems: ServiceItem[];
  locations: LocationInfo[];
  contact: ContactInfo;
}

interface ServiceItem {
  id: number;
  image: any;
  description: string;
}

interface LocationInfo {
  region: string;
  branches: string[];
}

interface ContactInfo {
  phoneNumber: string;
  operatingHours: string;
}

export const ServiceDetailScreen: React.FC<ServiceDetailScreenProps> = ({
  service,
  onBackPress,
  onLocationSelectPress,
  currentTab,
  onTabPress,
  onSideMenuItemPress
}) => {
  // 서비스별 상세 데이터
  const getServiceDetailData = (serviceId: number): ServiceDetailData => {
    const serviceDataMap: { [key: number]: ServiceDetailData } = {
      1: {
        id: 1,
        title: "마인드앤바디 포 어덜트",
        subtitle: "건강 프로그램",
        description: "자세고정과 심신안정을 통한 체형 다이어트",
        serviceItems: [
          {
            id: 1,
            image: require("../assets/services/service-image-1.png"),
            description: "24시간 응급내과 진료, 응급 이송 서비스, 일상 외 응급상황에도 빠른 대응과 진단으로 웰니스의 격을 높입니다."
          },
          {
            id: 2,
            image: require("../assets/services/service-image-2.png"),
            description: "겉보다 속을 먼저 살피는 진단, 정확한 진단과 따뜻한 관리로 메디컬 웰니스의 기초를 다집니다."
          },
          {
            id: 3,
            image: require("../assets/services/service-image-3.png"),
            description: "호르몬관리, 안티에이징, 기본 건강 관리 등 몸과 건강의 균형을 바로잡는 가장 과학적인 진료와 차별화된 의료 상품을 제공합니다."
          }
        ],
        locations: [
          {
            region: "서울",
            branches: ["서초점", "종로점", "신촌점", "구로점"]
          },
          {
            region: "경기",
            branches: ["인천송도점", "하남점"]
          }
        ],
        contact: {
          phoneNumber: "070-5489-7894",
          operatingHours: "오전 8시 - 오후 10:00"
        }
      },
      2: {
        id: 2,
        title: "웰리스컴 Wellness Come",
        subtitle: "건강 프로그램",
        description: "회복운동과 기초체력강화를 통한 건강 관리",
        serviceItems: [
          {
            id: 1,
            image: require("../assets/services/service-image-1.png"),
            description: "24시간 응급내과 진료, 응급 이송 서비스, 일상 외 응급상황에도 빠른 대응과 진단으로 웰니스의 격을 높입니다."
          },
          {
            id: 2,
            image: require("../assets/services/service-image-2.png"),
            description: "겉보다 속을 먼저 살피는 진단, 정확한 진단과 따뜻한 관리로 메디컬 웰니스의 기초를 다집니다."
          },
          {
            id: 3,
            image: require("../assets/services/service-image-3.png"),
            description: "호르몬관리, 안티에이징, 기본 건강 관리 등 몸과 건강의 균형을 바로잡는 가장 과학적인 진료와 차별화된 의료 상품을 제공합니다."
          }
        ],
        locations: [
          {
            region: "서울",
            branches: ["서초점", "종로점", "신촌점", "구로점"]
          },
          {
            region: "경기",
            branches: ["인천송도점", "하남점"]
          }
        ],
        contact: {
          phoneNumber: "070-5489-7894",
          operatingHours: "오전 8시 - 오후 10:00"
        }
      },
      3: {
        id: 3,
        title: "Healthy Meal Plan",
        subtitle: "레스토랑 / 카페",
        description: "균형식단과 비타민보충을 통한 다이어트",
        serviceItems: [
          {
            id: 1,
            image: require("../assets/services/service-image-1.png"),
            description: "영양학적으로 균형 잡힌 식단을 통해 건강한 다이어트를 지원합니다."
          },
          {
            id: 2,
            image: require("../assets/services/service-image-2.png"),
            description: "개인별 맞춤 영양 상담과 식단 계획을 제공합니다."
          },
          {
            id: 3,
            image: require("../assets/services/service-image-3.png"),
            description: "신선한 재료로 만든 건강한 식사와 영양 보충제를 함께 제공합니다."
          }
        ],
        locations: [
          {
            region: "서울",
            branches: ["서초점", "종로점", "신촌점"]
          },
          {
            region: "경기",
            branches: ["인천송도점", "하남점"]
          }
        ],
        contact: {
          phoneNumber: "070-1234-5678",
          operatingHours: "오전 9시 - 오후 9:00"
        }
      },
      4: {
        id: 4,
        title: "전문 내과병원",
        subtitle: "의료",
        description: "내과치료와 의료서비스를 통한 건강 관리",
        serviceItems: [
          {
            id: 1,
            image: require("../assets/services/service-image-1.png"),
            description: "전문 의료진의 정확한 진단과 치료를 통해 건강을 관리합니다."
          },
          {
            id: 2,
            image: require("../assets/services/service-image-2.png"),
            description: "최신 의료 장비를 활용한 정밀 검진과 치료 서비스를 제공합니다."
          },
          {
            id: 3,
            image: require("../assets/services/service-image-3.png"),
            description: "개인별 맞춤 치료 계획과 지속적인 건강 관리를 지원합니다."
          }
        ],
        locations: [
          {
            region: "서울",
            branches: ["서초점", "종로점", "신촌점"]
          },
          {
            region: "경기",
            branches: ["인천송도점"]
          }
        ],
        contact: {
          phoneNumber: "070-9876-5432",
          operatingHours: "오전 9시 - 오후 6:00"
        }
      },
      5: {
        id: 5,
        title: "GCC 스크린 골프",
        subtitle: "레저 스포츠",
        description: "자세교정과 코스공략을 통한 골프 실력 향상",
        serviceItems: [
          {
            id: 1,
            image: require("../assets/services/service-image-1.png"),
            description: "전문 골프 강사의 지도하에 정확한 자세 교정을 통해 실력을 향상시킵니다."
          },
          {
            id: 2,
            image: require("../assets/services/service-image-2.png"),
            description: "스크린 골프를 통한 코스 공략 연습과 실전 감각을 기릅니다."
          },
          {
            id: 3,
            image: require("../assets/services/service-image-3.png"),
            description: "개인별 맞춤 레슨과 체계적인 골프 교육 프로그램을 제공합니다."
          }
        ],
        locations: [
          {
            region: "서울",
            branches: ["서초점", "종로점", "구로점"]
          },
          {
            region: "경기",
            branches: ["인천송도점", "하남점"]
          }
        ],
        contact: {
          phoneNumber: "070-5555-1234",
          operatingHours: "오전 7시 - 오후 11:00"
        }
      },
      6: {
        id: 6,
        title: "에코스 스파",
        subtitle: "스파/에스테틱",
        description: "수술전운동과 코어운동을 통한 건강 관리",
        serviceItems: [
          {
            id: 1,
            image: require("../assets/services/service-image-1.png"),
            description: "전문 스파 테라피를 통한 심신의 휴식과 건강 관리를 제공합니다."
          },
          {
            id: 2,
            image: require("../assets/services/service-image-2.png"),
            description: "수술 전후 운동과 코어 강화 운동을 통해 건강한 몸을 만듭니다."
          },
          {
            id: 3,
            image: require("../assets/services/service-image-3.png"),
            description: "개인별 맞춤 케어 프로그램과 프리미엄 스파 서비스를 제공합니다."
          }
        ],
        locations: [
          {
            region: "서울",
            branches: ["서초점", "종로점", "신촌점"]
          },
          {
            region: "경기",
            branches: ["인천송도점", "하남점"]
          }
        ],
        contact: {
          phoneNumber: "070-7777-8888",
          operatingHours: "오전 10시 - 오후 10:00"
        }
      }
    };

    return serviceDataMap[serviceId] || serviceDataMap[2]; // 기본값으로 웰리스컴 데이터 반환
  };

  const serviceDetailData = getServiceDetailData(service.id);

  const handleReservationPress = () => {
    console.log(`${service.title} 예약 시작하기 클릭`);
    onLocationSelectPress?.();
  };

  return (
    <CommonLayout
      title="서비스 예약"
      showBackButton={true}
      showTabBar={false}
      onBackPress={onBackPress}
      onMenuPress={() => console.log("메뉴 버튼 클릭")}
      onCouponPress={() => console.log("쿠폰 버튼 클릭")}
      onNotificationPress={() => console.log("알림 버튼 클릭")}
      currentTab={currentTab}
      onTabPress={onTabPress}
      onSideMenuItemPress={onSideMenuItemPress}
      isWideLayout={true}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Service Header Image */}
        <View style={styles.headerImageContainer}>
          <Image source={require("../assets/services/header-image.png")} style={styles.headerImage} resizeMode="cover" />
        </View>

        {/* Service Info Card */}
        <View style={styles.infoCard}>
          <LabelText style={styles.serviceTitle}>{serviceDetailData.title}</LabelText>
          <LabelText style={styles.serviceSubtitle}>{serviceDetailData.subtitle}</LabelText>
          <LabelText style={styles.serviceDescription}>{serviceDetailData.description}</LabelText>
        </View>

        {/* Service Content */}
        <View style={styles.contentSection}>
          {/* Service List */}
          <View style={styles.serviceList}>
            {serviceDetailData.serviceItems.map((item, index) => (
              <View key={item.id} style={styles.serviceListItem}>
                {index === 1 ? (
                  // index가 1번째인 경우 (두 번째 항목): 텍스트가 왼쪽, 이미지가 오른쪽
                  <>
                    <View style={styles.serviceTextContainer}>
                      <LabelText style={[styles.descriptionText, { paddingHorizontal: 0, paddingRight: 40 }]}>{item.description}</LabelText>
                    </View>
                    <Image source={item.image} style={styles.serviceImage} resizeMode="cover" />
                  </>
                ) : (
                  // 나머지 항목들: 이미지가 왼쪽, 텍스트가 오른쪽
                  <>
                    <Image source={item.image} style={styles.serviceImage} resizeMode="cover" />
                    <View style={styles.serviceTextContainer}>
                      <LabelText style={styles.descriptionText}>{item.description}</LabelText>
                    </View>
                  </>
                )}
              </View>
            ))}
          </View>

          {/* Location Information */}
          <View style={styles.locationSection}>
            <ExtraBoldText style={styles.sectionTitle}>지점위치</ExtraBoldText>
            <View style={styles.divider} />

            {serviceDetailData.locations.map((location, index) => (
              <View key={index} style={styles.locationInfo}>
                <LabelText style={styles.regionLabel}>{location.region}</LabelText>
                <View style={styles.branchList}>
                  {location.branches.map((branch, branchIndex) => (
                    <ExtraBoldText key={branchIndex} style={styles.branchName}>
                      {branch}
                    </ExtraBoldText>
                  ))}
                </View>
              </View>
            ))}
          </View>

          {/* Contact Information */}
          <View style={styles.contactSection}>
            <ExtraBoldText style={styles.sectionTitle}>대표번호</ExtraBoldText>
            <View style={styles.divider} />
            <HeavyText style={styles.phoneNumber}>{serviceDetailData.contact.phoneNumber}</HeavyText>
            <LabelText style={styles.operatingHours}>{serviceDetailData.contact.operatingHours}</LabelText>
          </View>
        </View>
      </ScrollView>

      {/* Reservation Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.reservationButton} onPress={handleReservationPress}>
          <LabelText style={styles.reservationButtonText}>예약 시작하기</LabelText>
        </TouchableOpacity>
      </View>
    </CommonLayout>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1
  },
  headerImageContainer: {
    width: "100%",
    height: 263
  },
  headerImage: {
    width: "100%",
    height: "100%"
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: -90,
    marginHorizontal: 20,
    marginBottom: 30
  },
  serviceTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: "#000000",
    textAlign: "center",
    marginBottom: 5,
    letterSpacing: -1.2
  },
  serviceSubtitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#B1B8C0",
    textAlign: "center",
    marginBottom: 10,
    letterSpacing: -0.52
  },
  serviceDescription: {
    fontSize: 18,
    fontWeight: "800",
    color: "#000000",
    textAlign: "center",
    lineHeight: 24,
    letterSpacing: -0.72,
    paddingTop: 10
  },
  contentSection: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 30
  },
  serviceList: {
    marginBottom: 40,
    marginTop: 30
  },
  serviceListItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    gap: 20
  },
  serviceImage: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  serviceTextContainer: {},
  descriptionText: {
    fontSize: 13,
    color: "#000000",
    lineHeight: 20,
    letterSpacing: -0.52,
    paddingHorizontal: 30,
    paddingVertical: 10,
    minWidth: 160,
    maxWidth: 200
  },
  locationSection: {
    marginBottom: 30
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2B2B2B",
    letterSpacing: -0.64
  },
  locationInfo: {
    marginVertical: 15
  },
  regionLabel: {
    fontSize: 16,
    fontWeight: "400",
    color: "#505866",
    marginBottom: 10,
    letterSpacing: -0.64
  },
  branchList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20
  },
  branchName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#2B2B2B",
    letterSpacing: -0.72
  },
  divider: {
    height: 1,
    backgroundColor: "#D6DADF",
    marginVertical: 10
  },
  contactSection: {
    marginBottom: 30
  },
  phoneNumber: {
    fontSize: 20,
    fontWeight: "900",
    color: "#2B2B2B",
    marginBottom: 10,
    letterSpacing: -0.8
  },
  operatingHours: {
    fontSize: 16,
    fontWeight: "400",
    color: "#505866",
    letterSpacing: -0.64
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EFF1F3"
  },
  reservationButton: {
    backgroundColor: "#B48327",
    borderRadius: 48,
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  reservationButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.64
  }
});
