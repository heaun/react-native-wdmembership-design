import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { colors, membershipLevels } from "../../utils/colors";
import { MembershipLevel } from "../../types";
import { LabelText, ButtonText, SmallText } from "../components/CommonText";

interface MembershipBadgeProps {
  level: MembershipLevel;
  size?: "small" | "medium" | "large";
  style?: ViewStyle;
  showPoints?: boolean;
}

export const MembershipBadge: React.FC<MembershipBadgeProps> = ({ level, size = "medium", style, showPoints = false }) => {
  const badgeStyle = [styles.badge, styles[size], { backgroundColor: level.color }, style];

  const textStyle = [styles.text, styles[`${size}Text`]];

  return (
    <View style={badgeStyle}>
      <LabelText style={textStyle}>{level.name}</LabelText>
      {showPoints && <LabelText style={[textStyle, styles.pointsText]}>{level.minPoints.toLocaleString()} pts</LabelText>}
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 4
  },
  text: {
    color: colors.textInverse,
    fontWeight: "600",
    textAlign: "center"
  },
  pointsText: {
    opacity: 0.8,
    fontSize: 10
  },

  // Sizes
  small: {
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  smallText: {
    fontSize: 10
  },

  medium: {
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  mediumText: {
    fontSize: 12
  },

  large: {
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  largeText: {
    fontSize: 14
  }
});
