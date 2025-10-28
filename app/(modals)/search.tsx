import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SearchHeader from "@/components/search/SearchHeader";
import SearchHistory from "@/components/search/SearchHistory";
import SearchResults from "@/components/search/SearchResults";
import SearchTabs from "@/components/search/SearchTabs";
import { DEFAULT_TOP_SEARCHING } from "@/constants/Search";
import { useSearchFilter, useSearchHistory, useSearchNavigation } from "@/hooks/search";
import { useFetchAlbums } from "@/hooks/useFetchAlbums";
import { useFetchArtists } from "@/hooks/useFetchArtists";
import { useFetchSongs } from "@/hooks/useFetchSongs";
import { TabType } from "@/types/search";

export default function SearchModal() {
  // URL params
  const { initialQuery } = useLocalSearchParams<{ initialQuery: string }>();
  
  // Local state
  const [searchQuery, setSearchQuery] = useState(initialQuery || "");
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [isFocused, setIsFocused] = useState(true);
  const [topSearching] = useState<string[]>(DEFAULT_TOP_SEARCHING);

  // Custom hooks
  const { songs, isLoading: loadingSongs } = useFetchSongs();
  const { artists, loading: loadingArtists } = useFetchArtists();
  const { albums, isLoading: loadingAlbums } = useFetchAlbums();
  
  const { searchHistory, saveToHistory, setSearchHistory } = useSearchHistory();
  const { getFilteredResults } = useSearchFilter(searchQuery, activeTab, songs, artists, albums);
  const { handleNavigation, handleCancel } = useSearchNavigation();

  // Event handlers
  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    // Không lưu history ở đây nữa, chỉ update state
  }, []);

  const handleSearchSubmit = useCallback(() => {
    // Chỉ lưu vào history khi submit (nhấn Enter hoặc blur)
    if (searchQuery.trim()) {
      saveToHistory(searchQuery.trim());
    }
  }, [searchQuery, saveToHistory]);

  const handleHistoryItemPress = useCallback((query: string) => {
    setSearchQuery(query);
    // Không cần lưu lại vào history vì đã có sẵn
  }, []);

  // Computed values
  const isLoading = loadingSongs || loadingArtists || loadingAlbums;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SearchHeader 
        searchQuery={searchQuery}
        setSearchQuery={handleSearchChange}
        onCancel={handleCancel}
        isFocused={isFocused}
        setIsFocused={setIsFocused}
        showCancelButton={isFocused}
        onSubmitEditing={handleSearchSubmit}
        onBlur={handleSearchSubmit}
      />
      <SearchTabs 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <ScrollView style={styles.content}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#1DB954" />
          </View>
        ) : searchQuery ? (
          <SearchResults 
            results={getFilteredResults()} 
            onPress={handleNavigation}
          />
        ) : (
          <SearchHistory 
            searchHistory={searchHistory}
            topSearching={topSearching} 
            onHistoryPress={handleHistoryItemPress}
            onClearHistory={() => setSearchHistory([])}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
