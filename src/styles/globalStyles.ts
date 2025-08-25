import { StyleSheet } from "react-native";

// 전역 폰트 스타일 정의
export const globalStyles = StyleSheet.create({
  // 기본 텍스트 스타일
  text: {
    fontFamily: "NanumSquareNeo-bRg",
    color: "#2B2B2B"
  },

  // 제목 스타일
  title: {
    fontFamily: "NanumSquareNeo-eHv",
    fontSize: 24,
    fontWeight: "800",
    color: "#2B2B2B"
  },

  // 부제목 스타일
  subtitle: {
    fontFamily: "NanumSquareNeo-bRg",
    fontSize: 16,
    fontWeight: "400",
    color: "#505866"
  },

  // 본문 텍스트 스타일
  body: {
    fontFamily: "NanumSquareNeo-bRg",
    fontSize: 14,
    fontWeight: "400",
    color: "#2B2B2B"
  },

  // 버튼 텍스트 스타일
  buttonText: {
    fontFamily: "NanumSquareNeo-cBd",
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF"
  },

  // 입력 필드 텍스트 스타일
  inputText: {
    fontFamily: "NanumSquareNeo-cBd",
    fontSize: 18,
    fontWeight: "700",
    color: "#2B2B2B"
  },

  // 라벨 텍스트 스타일
  labelText: {
    fontFamily: "NanumSquareNeo-cBd",
    fontSize: 16,
    fontWeight: "700",
    color: "#2B2B2B"
  },

  // 작은 텍스트 스타일
  smallText: {
    fontFamily: "NanumSquareNeo-aLt",
    fontSize: 12,
    fontWeight: "400",
    color: "#B1B8C0"
  },

  // 강조 텍스트 스타일
  emphasisText: {
    fontFamily: "NanumSquareNeo-dEb",
    fontSize: 16,
    fontWeight: "800",
    color: "#B48327"
  },

  // 명조체 텍스트 스타일
  myeongjoText: {
    fontFamily: "NanumMyeongjo",
    fontSize: 16,
    fontWeight: "400",
    color: "#2B2B2B"
  },

  // 명조체 제목 스타일
  myeongjoTitle: {
    fontFamily: "NanumMyeongjo",
    fontSize: 20,
    fontWeight: "400",
    color: "#2B2B2B"
  },

  // 명조체 부제목 스타일
  myeongjoSubtitle: {
    fontFamily: "NanumMyeongjo",
    fontSize: 14,
    fontWeight: "400",
    color: "#505866"
  },

  myeongjoExtraBoldText: {
    fontFamily: "NanumMyeongjoExtraBold",
    fontSize: 20,
    color: "#2B2B2B"
  },

  /* input */
  input: {
    flex: 1,
    fontSize: 16,
    color: "#2B2B2B",
    paddingVertical: 12,
    fontFamily: "NanumSquareNeo-cBd"
  },
  chevronContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  chevron: {
    width: 18,
    height: 18
  },
  chevronText: {
    fontSize: 13,
    color: "#505866"
  }
});

// 폰트 패밀리 상수
export const FONT_FAMILY = {
  LIGHT: "NanumSquareNeo-aLt",
  REGULAR: "NanumSquareNeo-bRg",
  BOLD: "NanumSquareNeo-cBd",
  EXTRA_BOLD: "NanumSquareNeo-dEb",
  HEAVY: "NanumSquareNeo-eHv",
  MYEONGJO: "NanumMyeongjo",
  MYEONGJO_EXTRA_BOLD: "NanumMyeongjoExtraBold"
} as const;

// 폰트 크기 상수
export const FONT_SIZE = {
  XS: 10,
  SM: 12,
  BASE: 14,
  LG: 16,
  XL: 18,
  XXL: 20,
  XXXL: 24,
  TITLE: 30
} as const;
