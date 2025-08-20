import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import LottieView from "lottie-react-native";
import { LabelText } from "./CommonText";

interface FaceIdModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export const FaceIdModalAlternative: React.FC<FaceIdModalProps> = ({ isVisible, onClose }) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
      backdropOpacity={0.8}
      animationIn="fadeIn"
      animationOut="fadeOut"
    >
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>

        <View style={styles.faceIdContainer}>
          <LabelText style={styles.title}>등록하신 비밀번호를 입력하세요.</LabelText>
          <LabelText style={styles.subtitle}>비밀번호 6자리를 입력해 주세요.</LabelText>

          <View style={styles.lottieContainer}>
            <LottieView source={require("../assets/face-id.json")} autoPlay loop style={styles.lottieAnimation} />
          </View>

          <LabelText style={styles.faceIdText}>Face ID</LabelText>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  modalContent: {
    backgroundColor: "transparent",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  },
  closeButton: {
    position: "absolute",
    top: 60,
    right: 20,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600"
  },
  faceIdContainer: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#505866",
    borderRadius: 20,
    padding: 20,
    width: "90%",
    maxWidth: 350
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 16,
    letterSpacing: -0.8
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 30,
    letterSpacing: -0.64
  },
  lottieContainer: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  lottieAnimation: {
    width: "100%",
    height: "100%",
    borderRadius: 20
  },
  faceIdText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#8E8E93",
    letterSpacing: -0.64
  }
});
