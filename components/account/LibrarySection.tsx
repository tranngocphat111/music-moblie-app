import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { libraryItems } from "@/constants/AccountScreenData";

type LibraryItemProps = {
  item: (typeof libraryItems)[0];
};

const LibraryItem = ({ item }: LibraryItemProps) => (
  <TouchableOpacity style={styles.libraryItem}>
    <View style={styles.libraryIcon}>{item.icon}</View>
    <Text style={styles.libraryText}>{item.title}</Text>
    <MaterialIcons
      name="keyboard-arrow-right"
      size={24}
      color="rgba(255,255,255,0.5)"
    />
  </TouchableOpacity>
);

export default function LibrarySection() {
  return (
    <View style={styles.librarySection}>
      <Text style={styles.sectionTitle}>Library</Text>
      {libraryItems.map((item) => (
        <LibraryItem key={item.key} item={item} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 30,
    marginBottom: 10,
  },
  librarySection: {
    marginTop: 20,
  },
  libraryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  libraryIcon: {
    width: 30,
    alignItems: "center",
    marginRight: 15,
  },
  libraryText: {
    flex: 1,
    color: "white",
    fontSize: 17,
  },
});
