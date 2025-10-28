import { SearchResult, SearchResultsProps } from '@/types/search';
import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const ResultItem = ({ result, onPress }: { result: SearchResult; onPress: (result: SearchResult) => void }) => (
  <TouchableOpacity style={styles.resultItem} onPress={() => onPress(result)}>
    <Image source={{ uri: result.image }} style={styles.resultImage} />
    <View style={styles.resultInfo}>
      <Text style={styles.resultTitle} numberOfLines={1}>
        {result.title}
      </Text>
      <Text style={styles.resultArtist} numberOfLines={1}>
        {result.artist}
      </Text>
    </View>
  </TouchableOpacity>
);

const SearchResults = ({ results, onPress }: SearchResultsProps) => {
  // Group results by type
  const groupedResults = results.reduce<{ [key in string]: SearchResult[] }>(
    (acc, result) => {
      if (!acc[result.type]) {
        acc[result.type] = [];
      }
      acc[result.type].push(result);
      return acc;
    }, 
    {}
  );

  return (
    <View style={styles.resultsContainer}>
      {Object.entries(groupedResults).map(([type, items]) => (
        <View key={type} style={styles.section}>
          <Text style={styles.sectionTitle}>{type.charAt(0).toUpperCase() + type.slice(1)}s</Text>
          <View style={styles.resultsList}>
            {items.map((result) => (
              <ResultItem key={result.id} result={result} onPress={onPress} />
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  resultsContainer: {
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 8,
  },
  resultsList: {
    gap: 16,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  resultImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  resultInfo: {
    flex: 1,
  },
  resultTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultArtist: {
    color: '#999',
    fontSize: 14,
    marginTop: 4,
  },
});

export default SearchResults;