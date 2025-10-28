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
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.primaryText,
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

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Geez</Text>
      <TouchableOpacity onPress={handleSearchPress}>
        <Ionicons name="search-outline" size={26} color={COLORS.primaryText} />
      </TouchableOpacity>
    </View>
  );
};

export default AppHeader;