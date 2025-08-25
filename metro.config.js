const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

// Path mapping 설정
config.resolver.alias = {
  "@": path.resolve(__dirname, "src"),
  "@/components": path.resolve(__dirname, "src/components"),
  "@/screens": path.resolve(__dirname, "src/screens"),
  "@/utils": path.resolve(__dirname, "src/utils"),
  "@/types": path.resolve(__dirname, "src/types"),
  "@/styles": path.resolve(__dirname, "src/styles"),
  "@/assets": path.resolve(__dirname, "src/assets"),
  "@/data": path.resolve(__dirname, "src/data"),
  "@/context": path.resolve(__dirname, "src/context"),
  "@/navigation": path.resolve(__dirname, "src/navigation")
};

module.exports = config;
