import React from "react";
import { View, StyleSheet, ViewStyle, TouchableOpacity } from "react-native";
import { colors } from "../../utils/colors";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  variant?: "default" | "elevated" | "outlined";
  padding?: "small" | "medium" | "large";
}

export const Card: React.FC<CardProps> = ({ children, style, onPress, variant = "default", padding = "medium" }) => {
  const cardStyle = [styles.card, styles[variant], styles[`padding${padding.charAt(0).toUpperCase() + padding.slice(1)}`], style];

  if (onPress) {
    return (
      <TouchableOpacity style={cardStyle} onPress={onPress} activeOpacity={0.8}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderRadius: 16
  },

  // Variants
  default: {
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3
  },

  elevated: {
    shadowColor: colors.shadowDark,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8
  },

  outlined: {
    borderWidth: 1,
    borderColor: colors.border
  },

  // Padding variants
  paddingSmall: {
    padding: 12
  },

  paddingMedium: {
    padding: 16
  },

  paddingLarge: {
    padding: 24
  }
});
