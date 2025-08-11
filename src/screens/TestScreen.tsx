import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { FontTestComponent } from "../components/FontTestComponent";
import { GlobalFontTest } from "../components/GlobalFontTest";

/**
 * 폰트 테스트 화면
 * NanumSquareNeo 폰트가 실제로 적용되었는지 확인할 수 있습니다.
 */
export const TestScreen: React.FC<{ onBackPress: () => void }> = ({ onBackPress }) => {
  const [showGlobalTest, setShowGlobalTest] = React.useState(false);

  return (
    <View style={styles.container}>
      {showGlobalTest ? <GlobalFontTest /> : <FontTestComponent />}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.switchButton} onPress={() => setShowGlobalTest(!showGlobalTest)}>
          <Text style={styles.switchButtonText}>{showGlobalTest ? "개별 폰트 테스트" : "전역 폰트 테스트"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
          <Text style={styles.backButtonText}>뒤로가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  buttonContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1000,
    flexDirection: "row",
    gap: 10
  },
  switchButton: {
    backgroundColor: "#34C759",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8
  },
  switchButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600"
  },
  backButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600"
  }
});
