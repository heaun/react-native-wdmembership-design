import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, Dimensions } from "react-native";

interface CommonModalProps {
  visible: boolean;
  title: string;
  message: string;
  primaryButtonLabel: string;
  secondaryButtonLabel: string;
  primaryButtonColor?: string;
  onPrimaryPress: () => void;
  onSecondaryPress: () => void;
}

const { width } = Dimensions.get("window");

export const CommonModal: React.FC<CommonModalProps> = ({
  visible,
  title,
  message,
  primaryButtonLabel,
  secondaryButtonLabel,
  primaryButtonColor = "#B48327",
  onPrimaryPress,
  onSecondaryPress
}) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onSecondaryPress}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* 모달 내용 */}
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
          </View>

          {/* 버튼 영역 */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.primaryButton, { backgroundColor: primaryButtonColor }]} onPress={onPrimaryPress}>
              <Text style={styles.primaryButtonText}>{primaryButtonLabel}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton} onPress={onSecondaryPress}>
              <Text style={styles.secondaryButtonText}>{secondaryButtonLabel}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(43, 43, 43, 0.8)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
    width: width - 48,
    alignItems: "center"
  },
  content: {
    alignItems: "center",
    marginBottom: 24
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#2B2B2B",
    textAlign: "center",
    marginBottom: 8
  },
  message: {
    fontSize: 16,
    fontWeight: "400",
    color: "#505866",
    textAlign: "center",
    lineHeight: 24
  },
  buttonContainer: {
    width: "100%",
    gap: 12
  },
  primaryButton: {
    width: "100%",
    height: 48,
    borderRadius: 48,
    justifyContent: "center",
    alignItems: "center"
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700"
  },
  secondaryButton: {
    width: "100%",
    height: 48,
    borderRadius: 48,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent"
  },
  secondaryButtonText: {
    color: "#6C7072",
    fontSize: 16,
    fontWeight: "700"
  }
});
