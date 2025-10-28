import { COLORS } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

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

const AppHeader: React.FC = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerTitle}>Geez</Text>
    <Ionicons name="search-outline" size={26} color={COLORS.primaryText} />
  </View>
);

export default AppHeader;