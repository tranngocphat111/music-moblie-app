import { recentActivityImages } from "@/constants/AccountScreenData";
import React from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";

const renderRecentItem = ({
  item,
}: {
  item: (typeof recentActivityImages)[0];
}) => <Image source={{ uri: item.uri }} style={styles.recentImage} />;

export default function RecentActivity() {
  return (
    <View style={styles.recentSection}>
      <Text style={styles.sectionTitle}>Recent Activity</Text>
      <FlatList
        data={recentActivityImages}
        renderItem={renderRecentItem}
        numColumns={3}
        scrollEnabled={false} // Tắt scroll của FlatList
        columnWrapperStyle={styles.recentRow}
      />
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
  recentSection: {
    marginTop: 20,
  },
  recentRow: {
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  recentImage: {
    width: "32%",
    height: 120,
    borderRadius: 8,
  },
});
