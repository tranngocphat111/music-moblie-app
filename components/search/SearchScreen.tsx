import { DEFAULT_TOP_SEARCHING } from "@/constants/Search";
import { useSearchFilter, useSearchHistory } from "@/hooks/search";
import { useFetchAlbums } from "@/hooks/useFetchAlbums";
import { useFetchArtists } from "@/hooks/useFetchArtists";
import { useFetchSongs } from "@/hooks/useFetchSongs";
import { SearchResult, TabType } from "@/types/search";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import SearchHeader from "./SearchHeader";
import SearchHistory from "./SearchHistory";
import SearchResults from "./SearchResults";
import SearchTabs from "./SearchTabs";

interface SearchScreenProps {
  onClose?: () => void;
  initialSearchQuery?: string;
  onSearch?: (query: string) => void;
}

const SearchScreen: React.FC<SearchScreenProps> = ({ 
  onClose,
  initialSearchQuery = "",
  onSearch
}) => {
  // State
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [isFocused, setIsFocused] = useState(true);
  const [topSearching] = useState<string[]>(DEFAULT_TOP_SEARCHING);

  // Fetch data from API
  const { songs, isLoading: loadingSongs } = useFetchSongs();
  const { artists, loading: loadingArtists } = useFetchArtists();
  const { albums, isLoading: loadingAlbums } = useFetchAlbums();

  // Custom hooks
  const { searchHistory, saveToHistory, setSearchHistory } = useSearchHistory();
  const { getFilteredResults } = useSearchFilter(searchQuery, activeTab, songs, artists, albums);

  // Event handlers
  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      saveToHistory(query.trim());
    }
    if (onSearch) {
      onSearch(query);
    }
  }, [saveToHistory, onSearch]);

  const handleCancel = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  const handleHistoryPress = useCallback((query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      saveToHistory(query.trim());
    }
    if (onSearch) {
      onSearch(query);
    }
  }, [saveToHistory, onSearch]);

  const handleClearHistory = useCallback(() => {
    setSearchHistory([]);
  }, [setSearchHistory]);

  const handleResultPress = useCallback((result: SearchResult) => {
    // TODO: Navigate to result detail based on type
    console.log('Selected result:', result);
  }, []);

  // Computed values
  const isLoading = loadingSongs || loadingArtists || loadingAlbums;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <SearchHeader
        searchQuery={searchQuery}
        setSearchQuery={handleSearchChange}
        isFocused={isFocused}
        setIsFocused={setIsFocused}
        onCancel={handleCancel}
        showCancelButton={true}
      />

      {searchQuery.length > 0 && (
        <SearchTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}

      <ScrollView style={styles.content}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#1DB954" />
          </View>
        ) : searchQuery.length === 0 ? (
          <SearchHistory
            searchHistory={searchHistory}
            topSearching={topSearching}
            onHistoryPress={handleHistoryPress}
            onClearHistory={handleClearHistory}
          />
        ) : (
          <SearchResults 
            results={getFilteredResults()} 
            onPress={handleResultPress}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0e27",
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
});

export default SearchScreen;
