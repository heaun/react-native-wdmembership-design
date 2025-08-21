import React from "react";
import { Text, TextProps, StyleSheet } from "react-native";
import { FONT_FAMILY, FONT_SIZE } from "../utils/globalStyles";

// 기본 Text 컴포넌트
interface CommonTextProps extends TextProps {
  variant?:
    | "title"
    | "subtitle"
    | "body"
    | "button"
    | "input"
    | "label"
    | "small"
    | "emphasis"
    | "myeongjo"
    | "myeongjoTitle"
    | "myeongjoSubtitle"
    | "myeongjoExtraBold";
  weight?: "light" | "regular" | "bold" | "extraBold" | "heavy" | "myeongjo";
  size?: number;
  color?: string;
}

export const CommonText: React.FC<CommonTextProps> = ({ variant = "body", weight, size, color, style, children, ...props }) => {
  const getFontFamily = () => {
    if (weight) {
      switch (weight) {
        case "light":
          return FONT_FAMILY.LIGHT;
        case "regular":
          return FONT_FAMILY.REGULAR;
        case "bold":
          return FONT_FAMILY.BOLD;
        case "extraBold":
          return FONT_FAMILY.EXTRA_BOLD;
        case "heavy":
          return FONT_FAMILY.HEAVY;
        case "myeongjo":
          return FONT_FAMILY.MYEONGJO;
        default:
          return FONT_FAMILY.REGULAR;
      }
    }

    switch (variant) {
      case "title":
        return FONT_FAMILY.HEAVY;
      case "subtitle":
        return FONT_FAMILY.REGULAR;
      case "body":
        return FONT_FAMILY.REGULAR;
      case "button":
        return FONT_FAMILY.BOLD;
      case "input":
        return FONT_FAMILY.BOLD;
      case "label":
        return FONT_FAMILY.BOLD;
      case "small":
        return FONT_FAMILY.LIGHT;
      case "emphasis":
        return FONT_FAMILY.EXTRA_BOLD;
      case "myeongjo":
        return FONT_FAMILY.MYEONGJO;
      case "myeongjoTitle":
        return FONT_FAMILY.MYEONGJO;
      case "myeongjoSubtitle":
        return FONT_FAMILY.MYEONGJO;
      case "myeongjoExtraBold":
        return FONT_FAMILY.MYEONGJO_EXTRA_BOLD;
      default:
        return FONT_FAMILY.REGULAR;
    }
  };

  const getFontSize = () => {
    if (size) return size;

    switch (variant) {
      case "title":
        return FONT_SIZE.XXXL;
      case "subtitle":
        return FONT_SIZE.LG;
      case "body":
        return FONT_SIZE.BASE;
      case "button":
        return FONT_SIZE.LG;
      case "input":
        return FONT_SIZE.XL;
      case "label":
        return FONT_SIZE.LG;
      case "small":
        return FONT_SIZE.SM;
      case "emphasis":
        return FONT_SIZE.LG;
      case "myeongjo":
        return FONT_SIZE.LG;
      case "myeongjoTitle":
        return FONT_SIZE.XXL;
      case "myeongjoSubtitle":
        return FONT_SIZE.BASE;
      case "myeongjoExtraBold":
        return FONT_SIZE.XXL;
      default:
        return FONT_SIZE.BASE;
    }
  };

  const getColor = () => {
    if (color) return color;

    switch (variant) {
      case "title":
        return "#2B2B2B";
      case "subtitle":
        return "#505866";
      case "body":
        return "#2B2B2B";
      case "button":
        return "#FFFFFF";
      case "input":
        return "#2B2B2B";
      case "label":
        return "#2B2B2B";
      case "small":
        return "#B1B8C0";
      case "emphasis":
        return "#B48327";
      case "myeongjo":
        return "#2B2B2B";
      case "myeongjoTitle":
        return "#2B2B2B";
      case "myeongjoSubtitle":
        return "#505866";
      case "myeongjoExtraBold":
        return "#2B2B2B";
      default:
        return "#2B2B2B";
    }
  };

  const textStyle = {
    fontFamily: getFontFamily(),
    fontSize: getFontSize(),
    color: getColor()
  };

  return (
    <Text style={[textStyle, style]} {...props}>
      {children}
    </Text>
  );
};

// 특정 용도의 Text 컴포넌트들
export const TitleText: React.FC<TextProps> = (props) => <CommonText variant="title" {...props} />;

export const SubtitleText: React.FC<TextProps> = (props) => <CommonText variant="subtitle" {...props} />;

export const BodyText: React.FC<TextProps> = (props) => <CommonText variant="body" {...props} />;

export const ButtonText: React.FC<TextProps> = (props) => <CommonText variant="button" {...props} />;

export const InputText: React.FC<TextProps> = (props) => <CommonText variant="input" {...props} />;

export const LabelText: React.FC<TextProps> = (props) => <CommonText variant="label" {...props} />;

export const SmallText: React.FC<TextProps> = (props) => <CommonText variant="small" {...props} />;

export const EmphasisText: React.FC<TextProps> = (props) => <CommonText variant="emphasis" {...props} />;

// 폰트 무게별 Text 컴포넌트들
export const LightText: React.FC<TextProps> = (props) => <CommonText weight="light" {...props} />;

export const RegularText: React.FC<TextProps> = (props) => <CommonText weight="regular" {...props} />;

export const BoldText: React.FC<TextProps> = (props) => <CommonText weight="bold" {...props} />;

export const ExtraBoldText: React.FC<TextProps> = (props) => <CommonText weight="extraBold" {...props} />;

export const HeavyText: React.FC<TextProps> = (props) => <CommonText weight="heavy" {...props} />;

// NanumMyeongjo 폰트 컴포넌트들
export const MyeongjoText: React.FC<TextProps> = (props) => <CommonText variant="myeongjo" {...props} />;

export const MyeongjoTitleText: React.FC<TextProps> = (props) => <CommonText variant="myeongjoTitle" {...props} />;

export const MyeongjoSubtitleText: React.FC<TextProps> = (props) => <CommonText variant="myeongjoSubtitle" {...props} />;

export const MyeongjoExtraBoldText: React.FC<TextProps> = (props) => <CommonText variant="myeongjoExtraBold" {...props} />;
