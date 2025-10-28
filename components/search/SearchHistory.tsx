import { SearchHistoryProps } from '@/types/search';
import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const SearchHistory = ({ 
  searchHistory, 
  topSearching, 
  onHistoryPress, 
  onClearHistory 
}: SearchHistoryProps) => {
  return (
    <View style={styles.emptyState}>
      <View style={styles.historyHeader}>
        <Text style={styles.sectionTitle}>History</Text>
        {searchHistory.length > 0 && (
          <TouchableOpacity onPress={onClearHistory}>
            <Text style={styles.clearButton}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.chipContainer}>
        {searchHistory.map((term, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.chip} 
            onPress={() => onHistoryPress(term)}
          >
            <Text style={styles.chipText}>{term}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Top searching</Text>
      <View style={styles.chipContainer}>
        {topSearching.map((term, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.chip} 
            onPress={() => onHistoryPress(term)}
          >
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
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  clearButton: {
    color: "#c5ff00",
    fontSize: 14,
    fontWeight: "500",
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