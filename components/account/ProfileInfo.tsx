import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { avatarUrl } from "@/constants/AccountScreenData"; // Import URL

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <View style={styles.statItem}>
    <Text style={styles.statNumber}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

export default function ProfileInfo() {
  return (
    <View style={styles.profileSection}>
      <Image source={{ uri: avatarUrl }} style={styles.avatar} />
      <View style={styles.statsContainer}>
        <StatItem value="22" label="Playlist" />
        <StatItem value="360 K" label="Follower" />
        <StatItem value="56" label="Following" />
      </View>
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  profileSection: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#E040FB",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
    marginTop: 4,
  },
  editButton: {
    backgroundColor: "#CFFC00",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 20,
  },
  editButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
