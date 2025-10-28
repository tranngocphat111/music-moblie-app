import { COLORS } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.primaryText,
  },
  iconButton: {
    padding: 8,
  },
});

const AppHeader: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchPress = () => {
    router.push({
      pathname: "/(modals)/search",
      params: { initialQuery: searchQuery }
    });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>SPTunes</Text>
      <TouchableOpacity 
        style={styles.iconButton}
        onPress={handleSearchPress}
        activeOpacity={0.7}
      >
        <Ionicons name="search-outline" size={28} color={COLORS.primaryText} />
      </TouchableOpacity>
    </View>
  );
};

export default AppHeader;