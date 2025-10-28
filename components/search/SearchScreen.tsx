import { SearchResult } from "@/types/search/result";
import { TabType } from "@/types/search/tab";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
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
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [isFocused, setIsFocused] = useState(true);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    }
  };

  // Sample data
  const searchHistory = ["Fall out boy", "Good girl"];
  const topSearching = ["Girl generation", "Imagine Drangon"];

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
    {
      id: "4",
      title: "Running on the rain",
      artist: "Reena Hook",
      image: "https://via.placeholder.com/60/00BCD4/FFFFFF?text=RR",
      type: "album",
    },
    {
      id: "5",
      title: "Rescuse",
      artist: "One Republic",
      image: "https://via.placeholder.com/60/E91E63/FFFFFF?text=R",
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
    {
      id: "3",
      title: "January 01",
      artist: "Chain Smoker",
      image: "https://via.placeholder.com/60/FF5722/FFFFFF?text=J01",
      type: "song",
    },
    {
      id: "4",
      title: "Jumping on the rain",
      artist: "Reena Hook",
      image: "https://via.placeholder.com/60/00BCD4/FFFFFF?text=JR",
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
      default:
        return allResults;
    }
  };

  const tabs: TabType[] = ["all", "artist", "album", "song", "playlist"];

  // Component moved to search-components/SearchHistory.tsx

  // Component moved to search-components/SearchResults.tsx

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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0e27",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1f3a",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
  clearButton: {
    color: "#666",
    fontSize: 18,
    padding: 4,
  },
  cancelButton: {
    color: "#c5ff00",
    fontSize: 16,
    fontWeight: "500",
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 16,
    maxHeight: 50,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 12,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#fff",
  },
  tabText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },
  activeTabText: {
    color: "#fff",
  },
  content: {
    flex: 1,
  },
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
  resultsContainer: {
    paddingHorizontal: 16,
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1a1f3a",
  },
  resultImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  resultInfo: {
    flex: 1,
  },
  resultTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  resultArtist: {
    color: "#666",
    fontSize: 14,
  },
  moreButton: {
    padding: 8,
  },
  moreButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default SearchScreen;
