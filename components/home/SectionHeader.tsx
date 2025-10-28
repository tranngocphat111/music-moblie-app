import { COLORS } from "@/constants/Colors";
import { SectionHeaderProps } from "@/types";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  sectionHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.primaryText,
  },
  sectionViewAll: {
    fontSize: 14,
    color: COLORS.secondaryText,
  },
});

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => (
  <View style={styles.sectionHeaderContainer}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.sectionViewAll}>View all</Text>
  </View>
);

export default SectionHeader;