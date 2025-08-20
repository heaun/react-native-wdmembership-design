import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal, SafeAreaView, Image } from "react-native";
import { LabelText, ButtonText, SmallText } from "../components/CommonText";

interface CommonModalProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const CommonModal: React.FC<CommonModalProps> = ({ visible, title, onClose, children }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
      <SafeAreaView style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Top Bar */}
          <View style={styles.modalTopBar}>
            <LabelText style={styles.modalTitle}>{title}</LabelText>

            <View style={styles.topBarIcons}>
              <View style={styles.leftSide}>
                <View style={styles.emptyButton}></View>
              </View>
              <View style={styles.rightSide}>
                <TouchableOpacity onPress={onClose} style={styles.iconButton}>
                  <Image source={require("../assets/icons/ic_close.png")} style={styles.iconImage} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Content */}
          <View style={styles.modalContent}>{children}</View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  modalTopBar: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    backgroundColor: "#FFFFFF"
  },
  modalTitle: {
    position: "absolute",
    left: 0,
    right: 0,
    fontSize: 18,
    fontWeight: "700",
    color: "#2B2B2B",
    textAlign: "center",
    zIndex: 1
  },
  topBarIcons: {
    position: "absolute",
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2,
    paddingHorizontal: 20
  },
  leftSide: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  rightSide: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10
  },
  emptyButton: {
    width: 40,
    height: 40
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  iconImage: {
    width: 24,
    height: 24
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 10
  }
});
