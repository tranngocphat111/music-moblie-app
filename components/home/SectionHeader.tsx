import { COLORS } from "@/constants/Colors";
import { SectionHeaderProps } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const styles = StyleSheet.create({
  sectionHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 28,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.primaryText,
    letterSpacing: -0.5,
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  sectionViewAll: {
    fontSize: 13,
    color: COLORS.secondaryText,
    fontWeight: "600",
  },
});

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => (
  <View style={styles.sectionHeaderContainer}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <TouchableOpacity style={styles.viewAllButton} activeOpacity={0.7}>
      <Text style={styles.sectionViewAll}>View all</Text>
      <Ionicons name="chevron-forward" size={16} color={COLORS.secondaryText} />
    </TouchableOpacity>
  </View>
);

export default SectionHeader;