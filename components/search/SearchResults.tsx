import { SearchResultsProps } from '@/types/search';
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import ResultItem from './ResultItem';


const SearchResults = ({ results }: SearchResultsProps) => {
  return (
    <View style={styles.resultsContainer}>
      <Text style={styles.sectionTitle}>Top searching</Text>
      {results.map((result) => (
        <ResultItem
          key={result.id}
          id={result.id}
          title={result.title}
          artist={result.artist}
          image={result.image}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  resultsContainer: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 8,
  },
});

export default SearchResults;