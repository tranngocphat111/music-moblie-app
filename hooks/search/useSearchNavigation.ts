import { useCallback } from "react";
import { router } from "expo-router";
import { SearchResult } from "@/types/search";
import { navigateToResult } from "@/utils/searchUtils";

/**
 * Custom hook to handle search navigation
 */
export const useSearchNavigation = () => {
  const handleNavigation = useCallback((result: SearchResult) => {
    navigateToResult(result, router);
  }, []);

  const handleCancel = useCallback(() => {
    router.back();
  }, []);

  return {
    handleNavigation,
    handleCancel
  };
};
