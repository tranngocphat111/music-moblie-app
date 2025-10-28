import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AccountHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Account</Text>
      <TouchableOpacity>
        <Ionicons name="settings-outline" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: "bold",
    color: "white",
  },
});
