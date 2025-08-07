import React, { useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import LottieView from "lottie-react-native";

interface FaceIdModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export const FaceIdModal: React.FC<FaceIdModalProps> = ({ isVisible, onClose }) => {
  const animation = useRef<LottieView>(null);
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
          <Text style={styles.title}>생체 인증</Text>
          <Text style={styles.subtitle}>얼굴을 인식해 주세요.</Text>

          <View style={styles.lottieContainer}>
            <LottieView ref={animation} source={require("../assets/authentication/face-id.json")} loop autoPlay style={styles.lottieAnimation} />
          </View>

          <Text style={styles.faceIdText}>- - - - - -</Text>
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
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "red"
  },
  faceIdText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#8E8E93",
    letterSpacing: -0.64
  }
});
