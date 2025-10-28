export type TabType = "all" | "song" | "artist" | "album" | "playlist";

export interface SearchResult {
  id: string;
  title: string;
  artist: string;
  image: string;
  type: TabType;
  data?: any;
}

export interface SearchHistoryProps {
  searchHistory: string[];
  topSearching: string[];
  onHistoryPress: (query: string) => void;
  onClearHistory: () => void;
}

export interface SearchHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isFocused: boolean;
  setIsFocused: (focused: boolean) => void;
  onCancel: () => void;
  showCancelButton: boolean;
  onSubmitEditing?: () => void;
  onBlur?: () => void;
}

export interface SearchTabsProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export interface SearchResultsProps {
  results: SearchResult[];
  onPress: (result: SearchResult) => void;
  footerComponent?: React.ReactNode;
}