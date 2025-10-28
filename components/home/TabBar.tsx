import { COLORS } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  tabBarContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: COLORS.tabBar,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  tabItem: {
    alignItems: "center",
  },
  tabLabel: {
    fontSize: 10,
    color: COLORS.secondaryText,
    marginTop: 4,
  },
});

const TabBar: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.tabBarContainer, { bottom: insets.bottom }]}>
      <TouchableOpacity style={styles.tabItem}>
        <Ionicons name="home" size={24} color={COLORS.accent} />
        <Text style={[styles.tabLabel, { color: COLORS.accent }]}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem}>
        <Ionicons
          name="compass-outline"
          size={24}
          color={COLORS.secondaryText}
        />
        <Text style={styles.tabLabel}>Explore</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem}>
        <Ionicons name="radio-outline" size={24} color={COLORS.secondaryText} />
        <Text style={styles.tabLabel}>Radio</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem}>
        <Ionicons
          name="person-outline"
          size={24}
          color={COLORS.secondaryText}
        />
        <Text style={styles.tabLabel}>Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TabBar;
