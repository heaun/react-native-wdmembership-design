import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CommonLayout } from "../components/CommonLayout";
import { useToast } from "../context/ToastContext";

interface Vehicle {
  id: string;
  number: string;
  model: string;
  household: string;
  registrationDate: string;
  isResidentVehicle: boolean;
}

interface VehicleManagementScreenProps {
  onBackPress?: () => void;
  onMenuPress?: () => void;
  onCouponPress?: () => void;
  onNotificationPress?: () => void;
}

export const VehicleManagementScreen: React.FC<VehicleManagementScreenProps> = ({ onBackPress, onMenuPress, onCouponPress, onNotificationPress }) => {
  const { showToast } = useToast();
  // Mock data
  const vehicles: Vehicle[] = [
    {
      id: "1",
      number: "123가 4568",
      model: "BMW X5",
      household: "A1102 호",
      registrationDate: "2026.03.14",
      isResidentVehicle: true
    }
  ];

  const handleAddVehiclePress = () => {
    // 추가 차량 등록 화면으로 이동
    showToast("error", "차량 등록", "개발 중입니다...🛠️");
  };

  const handleParkingInfoPress = (vehicleId: string) => {
    // 입차정보 보기 화면으로 이동
    showToast("error", "입차정보", "개발 중입니다...🛠️");
  };

  const handleEditVehicle = (vehicleId: string) => {
    // 차량 정보 편집
    showToast("error", "차량 정보 편집", "개발 중입니다...🛠️");
  };

  return (
    <CommonLayout
      title="차량관리"
      showBackButton={true}
      showTabBar={false}
      onBackPress={onBackPress}
      onMenuPress={onMenuPress}
      onCouponPress={onCouponPress}
      onNotificationPress={onNotificationPress}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* 등록 차량 섹션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            등록 차량 <Text style={styles.vehicleCount}>{vehicles.length}</Text>
          </Text>
        </View>

        {/* 등록된 차량 카드들 */}
        {vehicles.map((vehicle) => (
          <View key={vehicle.id} style={styles.vehicleCard}>
            <View style={styles.vehicleHeader}>
              <Text style={styles.vehicleNumber}>{vehicle.number}</Text>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEditVehicle(vehicle.id)}>
                <Ionicons name="pencil" size={20} color="#B1B8C0" />
              </TouchableOpacity>
            </View>

            <Text style={styles.vehicleStatus}>{vehicle.isResidentVehicle ? "해당 차량은 입주차량입니다." : "해당 차량은 방문차량입니다."}</Text>

            <View style={styles.divider} />

            <View style={styles.vehicleDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>차종</Text>
                <Text style={styles.detailValue}>{vehicle.model}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>등록세대</Text>
                <Text style={styles.detailValue}>{vehicle.household}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>등록일</Text>
                <Text style={styles.detailValue}>{vehicle.registrationDate}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.parkingInfoButton} onPress={() => handleParkingInfoPress(vehicle.id)}>
              <Text style={styles.parkingInfoText}>입차정보 보기</Text>
              <Ionicons name="chevron-forward" size={24} color="#505866" />
            </TouchableOpacity>
          </View>
        ))}

        {/* 추가 차량 등록 카드 */}
        <TouchableOpacity style={styles.addVehicleCard} onPress={handleAddVehiclePress}>
          <View style={styles.addVehicleContent}>
            <View style={styles.carIconContainer}>
              <Image source={require("../assets/vehicle/car-icon.png")} style={styles.carIcon} resizeMode="contain" />
            </View>
            <Text style={styles.addVehicleTitle}>추가 차량 등록</Text>
            <Text style={styles.addVehicleDescription}>추가로 등록/이용하실 차량을 등록해 주세요.</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </CommonLayout>
  );
};

const styles = StyleSheet.create({
  section: {
    marginTop: 20,
    marginBottom: 15
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2B2B2B",
    letterSpacing: -0.64
  },
  vehicleCount: {
    color: "#B48327"
  },
  vehicleCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    padding: 20,
    borderWidth: 1,
    borderColor: "#D6DADF",
    marginBottom: 20
  },
  vehicleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  vehicleNumber: {
    fontSize: 30,
    fontWeight: "900",
    color: "#B48327",
    lineHeight: 28
  },
  editButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  vehicleStatus: {
    fontSize: 13,
    fontWeight: "700",
    color: "#79818B",
    marginBottom: 20
  },
  divider: {
    height: 1,
    backgroundColor: "#B1B8C0",
    marginVertical: 20
  },
  vehicleDetails: {
    marginBottom: 20
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#505866"
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "800",
    color: "#2B2B2B",
    textAlign: "right"
  },
  parkingInfoButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  parkingInfoText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#505866"
  },
  addVehicleCard: {
    backgroundColor: "#EFF1F3",
    borderRadius: 6,
    padding: 40,
    borderWidth: 1,
    borderColor: "#EFF1F3",
    marginBottom: 20
  },
  addVehicleContent: {
    alignItems: "center"
  },
  carIconContainer: {
    marginBottom: 20
  },
  carIcon: {
    width: 97,
    height: 43
  },
  addVehicleTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#79818B",
    textAlign: "center",
    marginBottom: 10
  },
  addVehicleDescription: {
    fontSize: 13,
    fontWeight: "700",
    color: "#505866",
    textAlign: "center",
    lineHeight: 20
  }
});
