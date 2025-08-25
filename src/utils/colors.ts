export const colors = {
  // Primary colors
  primary: "#6366F1",
  primaryDark: "#4F46E5",
  primaryLight: "#A5B4FC",

  // Secondary colors
  secondary: "#10B981",
  secondaryDark: "#059669",
  secondaryLight: "#6EE7B7",

  // Background colors
  background: "#FFFFFF",
  backgroundSecondary: "#F8FAFC",
  backgroundTertiary: "#F1F5F9",

  // Text colors
  textPrimary: "#1E293B",
  textSecondary: "#64748B",
  textTertiary: "#94A3B8",
  textInverse: "#FFFFFF",

  // Status colors
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",

  // Border colors
  border: "#E2E8F0",
  borderLight: "#F1F5F9",

  // Shadow colors
  shadow: "rgba(0, 0, 0, 0.1)",
  shadowDark: "rgba(0, 0, 0, 0.2)",

  // Membership level colors
  bronze: "#CD7F32",
  silver: "#C0C0C0",
  gold: "#FFD700",
  platinum: "#E5E4E2",

  // Gradient colors
  gradientStart: "#6366F1",
  gradientEnd: "#8B5CF6"
};

export const membershipLevels = {
  bronze: {
    name: "Bronze",
    color: colors.bronze,
    minPoints: 0,
    discount: 5
  },
  silver: {
    name: "Silver",
    color: colors.silver,
    minPoints: 1000,
    discount: 10
  },
  gold: {
    name: "Gold",
    color: colors.gold,
    minPoints: 5000,
    discount: 15
  },
  platinum: {
    name: "Platinum",
    color: colors.platinum,
    minPoints: 10000,
    discount: 20
  }
};
