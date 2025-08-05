import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator } from "react-native";
import { colors } from "../../utils/colors";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  style,
  textStyle
}) => {
  const buttonStyle = [styles.button, styles[variant], styles[size], disabled && styles.disabled, style];

  const textStyleCombined = [styles.text, styles[`${variant}Text`], styles[`${size}Text`], disabled && styles.disabledText, textStyle];

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress} disabled={disabled || loading} activeOpacity={0.8}>
      {loading ? (
        <ActivityIndicator color={variant === "primary" ? colors.textInverse : colors.primary} size="small" />
      ) : (
        <Text style={textStyleCombined}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  text: {
    fontWeight: "600",
    textAlign: "center"
  },

  // Variants
  primary: {
    backgroundColor: colors.primary
  },
  primaryText: {
    color: colors.textInverse
  },

  secondary: {
    backgroundColor: colors.secondary
  },
  secondaryText: {
    color: colors.textInverse
  },

  outline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: colors.primary
  },
  outlineText: {
    color: colors.primary
  },

  ghost: {
    backgroundColor: "transparent"
  },
  ghostText: {
    color: colors.primary
  },

  // Sizes
  small: {
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  smallText: {
    fontSize: 14
  },

  medium: {
    paddingHorizontal: 24,
    paddingVertical: 12
  },
  mediumText: {
    fontSize: 16
  },

  large: {
    paddingHorizontal: 32,
    paddingVertical: 16
  },
  largeText: {
    fontSize: 18
  },

  // States
  disabled: {
    opacity: 0.5
  },
  disabledText: {
    opacity: 0.7
  }
});
