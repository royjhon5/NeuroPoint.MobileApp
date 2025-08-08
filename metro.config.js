const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const {
  wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);
  return wrapWithReanimatedMetroConfig(
    withNativeWind(config, { input: "./global.css" })
  );
})();
