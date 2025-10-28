import { SearchHistoryProps } from '@/types/search';
import { Ionicons } from '@expo/vector-icons';
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
    <View style={styles.container}>
      {/* Recent Search History */}
      {searchHistory.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent</Text>
            <TouchableOpacity onPress={onClearHistory}>
              <Text style={styles.clearButton}>Clear</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.chipContainer}>
            {searchHistory.map((term, index) => (
              <TouchableOpacity 
                key={`history-${index}`}
                style={styles.chip} 
                onPress={() => onHistoryPress(term)}
              >
                <Text style={styles.chipText}>{term}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Top Searching */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Searches</Text>
        <View style={styles.topSearchContainer}>
          {topSearching.map((term, index) => (
            <TouchableOpacity 
              key={`top-${index}`}
              style={styles.topSearchItem} 
              onPress={() => onHistoryPress(term)}
            >
              <View style={styles.topSearchContent}>
                <View style={styles.topSearchLeft}>
                  <Text style={styles.rankNumber}>{index + 1}</Text>
                  <Text style={styles.topSearchText}>{term}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#555" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  clearButton: {
    color: "#888",
    fontSize: 14,
    fontWeight: "500",
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  chipText: {
    color: "#ddd",
    fontSize: 14,
    fontWeight: "500",
  },
  topSearchContainer: {
    gap: 1,
    marginTop: 8,
  },
  topSearchItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 8,
    padding: 12,
  },
  topSearchContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topSearchLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  rankNumber: {
    color: '#666',
    fontSize: 15,
    fontWeight: '700',
    width: 20,
  },
  topSearchText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
});

export default SearchHistory;