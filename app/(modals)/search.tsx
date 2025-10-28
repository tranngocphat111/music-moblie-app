import SearchHeader from "@/components/search/SearchHeader";
import SearchHistory from "@/components/search/SearchHistory";
import SearchResults from "@/components/search/SearchResults";
import SearchTabs from "@/components/search/SearchTabs";
import { SearchResult, TabType } from "@/types/search";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useState } from "react";
import {
    ScrollView,
    StatusBar,
    StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchModal() {
  const navigation = useNavigation();
  const { initialQuery } = useLocalSearchParams<{ initialQuery: string }>();
  const [searchQuery, setSearchQuery] = useState(initialQuery || "");
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [isFocused, setIsFocused] = useState(true);

  const handleCancel = () => {
    router.back();
  };

  // Sample data
  const searchHistory: string[] = ["Fall out boy", "Good girl"];
  const topSearching: string[] = ["Girl generation", "Imagine Dragon"];

  const allResults: SearchResult[] = [
    {
      id: "1",
      title: "Just For What",
      artist: "Avinci John",
      image: "https://via.placeholder.com/60/FF69B4/FFFFFF?text=AJ",
      type: "song",
    },
    {
      id: "2",
      title: "Johnny Scott",
      artist: "Artist",
      image: "https://via.placeholder.com/60/4CAF50/FFFFFF?text=JS",
      type: "artist",
    },
    {
      id: "3",
      title: "Justin Scarrent",
      artist: "Artist",
      image: "https://via.placeholder.com/60/2196F3/FFFFFF?text=JS",
      type: "artist",
    },
  ];

  const albumResults: SearchResult[] = [
    {
      id: "1",
      title: "Run Run Run",
      artist: "Avinci John",
      image: "https://via.placeholder.com/60/FF69B4/FFFFFF?text=RRR",
      type: "album",
    },
    {
      id: "2",
      title: "Rulia and Remé",
      artist: "Jeeny Benmy",
      image: "https://via.placeholder.com/60/FF5722/FFFFFF?text=RR",
      type: "album",
    },
    {
      id: "3",
      title: "Roomate 01",
      artist: "Chain Smoker",
      image: "https://via.placeholder.com/60/4CAF50/FFFFFF?text=R01",
      type: "album",
    },
  ];

  const artistResults: SearchResult[] = [
    {
      id: "1",
      title: "Johnny Scott",
      artist: "Artist",
      image: "https://via.placeholder.com/60/2196F3/FFFFFF?text=JS",
      type: "artist",
    },
    {
      id: "2",
      title: "Justin Scarrent",
      artist: "Artist",
      image: "https://via.placeholder.com/60/4CAF50/FFFFFF?text=JS",
      type: "artist",
    },
  ];

  const mvResults: SearchResult[] = [
    {
      id: "1",
      title: "Run Run Run",
      artist: "Avinci John",
      image: "https://via.placeholder.com/60/FF69B4/FFFFFF?text=RRR",
      type: "mv",
    },
    {
      id: "2",
      title: "Rulia and Remé",
      artist: "Jeeny Benmy",
      image: "https://via.placeholder.com/60/FF5722/FFFFFF?text=RR",
      type: "mv",
    },
  ];

  const songResults: SearchResult[] = [
    {
      id: "1",
      title: "Just For What",
      artist: "Avinci John",
      image: "https://via.placeholder.com/60/FF69B4/FFFFFF?text=JFW",
      type: "song",
    },
    {
      id: "2",
      title: "July and Remé",
      artist: "Jeeny Benmy",
      image: "https://via.placeholder.com/60/4CAF50/FFFFFF?text=JR",
      type: "song",
    },
  ];

  const getResultsForTab = () => {
    switch (activeTab) {
      case "album":
        return albumResults;
      case "artist":
        return artistResults;
      case "song":
        return songResults;
      case "playlist":
        return allResults; // TODO: Add playlist results when available
      default:
        return allResults;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <SearchHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
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
        {searchQuery.length === 0 ? (
          <SearchHistory
            searchHistory={searchHistory}
            topSearching={topSearching}
          />
        ) : (
          <SearchResults results={getResultsForTab()} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0e27",
  },
  content: {
    flex: 1,
  },
});