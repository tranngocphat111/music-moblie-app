//components/auth/AuthFooter
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type AuthFooterProps = {
  promptText: string;
  linkText: string;
  onLinkPress: () => void;
};

export default function AuthFooter({
  promptText,
  linkText,
  onLinkPress,
}: AuthFooterProps) {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>{promptText}</Text>
      <TouchableOpacity onPress={onLinkPress}>
        <Text style={styles.footerLink}>{linkText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
  },
  footerLink: {
    color: "#CFFC00",
    fontSize: 14,
    fontWeight: "bold",
  },
});
