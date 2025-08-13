import { useLocalSearchParams } from "expo-router";
import React from "react";
import { WebView } from "react-native-webview";

export default function ZoomViewScreen() {
  const { html } = useLocalSearchParams<{ html: string }>();
  const decodedHtml = decodeURIComponent(html);

  return <WebView originWhitelist={["*"]} source={{ html: decodedHtml }} />;
}
