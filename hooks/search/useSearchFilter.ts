import { useCallback } from "react";
import { SearchResult, TabType } from "@/types/search";
import { filterSearchResults } from "@/utils/searchUtils";

/**
 * Custom hook to handle search filtering
 */
export const useSearchFilter = (
  searchQuery: string,
  activeTab: TabType,
  songs: any[] | undefined,
  artists: any[] | undefined,
  albums: any[] | undefined
) => {
  const getFilteredResults = useCallback((): SearchResult[] => {
    if (!searchQuery || !songs || !artists || !albums) {
      return [];
    }

    return filterSearchResults(searchQuery, activeTab, songs, artists, albums);
  }, [searchQuery, activeTab, songs, artists, albums]);

  return { getFilteredResults };
};
