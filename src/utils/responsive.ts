import { Dimensions, Platform } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// 기준 디자인 크기 (iPhone 14 기준)
const DESIGN_WIDTH = 375;
const DESIGN_HEIGHT = 812;

// 반응형 스케일 계산 함수
export const scale = (size: number) => (screenWidth / DESIGN_WIDTH) * size;
export const verticalScale = (size: number) => (screenHeight / DESIGN_HEIGHT) * size;

// 폰트 크기 조정 (최소/최대 크기 제한)
export const moderateScale = (size: number, factor = 0.5) => {
  const scaledSize = scale(size);
  return Math.min(Math.max(scaledSize, size * 0.8), size * 1.2);
};

// 화면 크기별 브레이크포인트
export const isSmallDevice = screenWidth < 375;
export const isMediumDevice = screenWidth >= 375 && screenWidth < 414;
export const isLargeDevice = screenWidth >= 414;

// 플랫폼별 폰트 패밀리
export const getFontFamily = (weight: "light" | "regular" | "medium" | "bold" = "regular") => {
  if (Platform.OS === "ios") {
    switch (weight) {
      case "light":
        return "System";
      case "regular":
        return "System";
      case "medium":
        return "System";
      case "bold":
        return "System";
      default:
        return "System";
    }
  } else {
    switch (weight) {
      case "light":
        return "sans-serif-light";
      case "regular":
        return "sans-serif";
      case "medium":
        return "sans-serif-medium";
      case "bold":
        return "sans-serif-bold";
      default:
        return "sans-serif";
    }
  }
};

// 안전 영역 고려한 패딩
export const getSafePadding = () => {
  return {
    top: Platform.OS === "ios" ? 44 : 0,
    bottom: Platform.OS === "ios" ? 34 : 0
  };
};

// 화면 비율에 따른 동적 크기 조정
export const getResponsiveSize = (baseSize: number, minSize?: number, maxSize?: number) => {
  const scaledSize = scale(baseSize);
  const min = minSize || baseSize * 0.8;
  const max = maxSize || baseSize * 1.2;
  return Math.min(Math.max(scaledSize, min), max);
};
