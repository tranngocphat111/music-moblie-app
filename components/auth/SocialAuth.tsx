//components/auth/SocialAuth
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function SocialAuth() {
  return (
    <View style={styles.socialContainer}>
      <Text style={styles.socialText}>Or connect with</Text>
      <View style={styles.socialIcons}>
        <TouchableOpacity style={styles.socialIconBtn}>
          <FontAwesome name="facebook" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIconBtn}>
          <FontAwesome name="google" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIconBtn}>
          <FontAwesome name="twitter" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  socialContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  socialText: {
    color: "rgba(255,255,255,0.8)",
    marginBottom: 20,
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  socialIconBtn: {
    marginHorizontal: 15,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 50,
  },
});
