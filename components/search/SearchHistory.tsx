import { SearchHistoryProps } from '@/types/search';
import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';


const SearchHistory = ({ searchHistory, topSearching }: SearchHistoryProps) => {
  return (
    <View style={styles.emptyState}>
      <Text style={styles.sectionTitle}>History</Text>
      <View style={styles.chipContainer}>
        {searchHistory.map((term, index) => (
          <TouchableOpacity key={index} style={styles.chip}>
            <Text style={styles.chipText}>{term}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Top searching</Text>
      <View style={styles.chipContainer}>
        {topSearching.map((term, index) => (
          <TouchableOpacity key={index} style={styles.chip}>
            <Text style={styles.chipText}>{term}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyState: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 8,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  chip: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#c5ff00",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  chipText: {
    color: "#c5ff00",
    fontSize: 14,
    fontWeight: "500",
  },
});

export default SearchHistory;