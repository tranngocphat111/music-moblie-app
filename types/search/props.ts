import { SearchResult } from "./result";
import { TabType } from "./tab";

/**
 * Props for the SearchHeader component
 */
export interface SearchHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isFocused: boolean;
  setIsFocused: (focused: boolean) => void;
  onCancel?: () => void;
  showCancelButton?: boolean;
}

/**
 * Props for the SearchHistory component
 */
export interface SearchHistoryProps {
  searchHistory: string[];
  topSearching: string[];
}

/**
 * Props for the SearchTabs component
 */
export interface SearchTabsProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

/**
 * Props for the SearchResults component
 */
export interface SearchResultsProps {
  results: SearchResult[];
}

/**
 * Props for the ResultItem component
 */
export interface ResultItemProps {
  id: string;
  title: string;
  artist: string;
  image: string;
}