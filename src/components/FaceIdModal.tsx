import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Modal from "react-native-modal";
import LottieView from "lottie-react-native";
import { LabelText } from "./CommonText";

interface FaceIdModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const FaceIdModal: React.FC<FaceIdModalProps> = ({ isVisible, onClose, onSuccess }) => {
  const [lottieError, setLottieError] = useState(false);

  // 생체 인증 시뮬레이션 (실제로는 생체 인증 API 사용)
  React.useEffect(() => {
    if (isVisible && onSuccess) {
      // 3초 후 생체 인증 성공으로 가정
      const timer = setTimeout(() => {
        onSuccess();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onSuccess]);

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
          <LabelText style={styles.title}>생체 인증</LabelText>
          <LabelText style={styles.subtitle}>얼굴을 인식해 주세요.</LabelText>

          <View style={styles.lottieContainer}>
            <LottieView
              source={require("@/assets/authentication/biometric.json")}
              loop
              autoPlay
              style={styles.lottieAnimation}
              speed={1}
              resizeMode="cover"
            />
          </View>

          {lottieError && <LabelText style={styles.faceIdText}>- - - - - -</LabelText>}
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
    backgroundColor: "#505866",
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 10,
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
    marginBottom: 20,
    backgroundColor: "transparent"
  },
  lottieAnimation: {
    width: 200,
    height: 200,
    borderRadius: 20
  },
  faceIdText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#8E8E93",
    letterSpacing: -0.64
  }
});
