import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { SEARCH_HISTORY_KEY, MAX_HISTORY_ITEMS } from "@/constants/Search";

/**
 * Custom hook to manage search history
 */
export const useSearchHistory = () => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // Load search history from AsyncStorage on mount
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const history = await AsyncStorage.getItem(SEARCH_HISTORY_KEY);
        if (history) {
          setSearchHistory(JSON.parse(history));
        }
      } catch (error) {
        console.error('Error loading search history:', error);
      }
    };
    loadHistory();
  }, []);

  // Save search query to history
  const saveToHistory = useCallback(async (query: string) => {
    try {
      const updatedHistory = [
        query,
        ...searchHistory.filter(item => item !== query)
      ].slice(0, MAX_HISTORY_ITEMS);
      
      setSearchHistory(updatedHistory);
      await AsyncStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Error saving search history:', error);
    }
  }, [searchHistory]);

  // Clear all search history
  const clearHistory = useCallback(async () => {
    try {
      setSearchHistory([]);
      await AsyncStorage.removeItem(SEARCH_HISTORY_KEY);
    } catch (error) {
      console.error('Error clearing search history:', error);
    }
  }, []);

  return {
    searchHistory,
    saveToHistory,
    clearHistory,
    setSearchHistory
  };
};
