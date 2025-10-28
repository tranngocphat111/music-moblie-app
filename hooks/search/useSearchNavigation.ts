import { SearchResult } from "@/types/search";
import { navigateToResult } from "@/utils/searchUtils";
import { router } from "expo-router";
import { useCallback } from "react";

/**
 * Custom hook to handle search navigation
 */
export const useSearchNavigation = () => {
  const handleNavigation = useCallback((result: SearchResult) => {
    navigateToResult(result, router);
  }, []);

  const handleCancel = useCallback(() => {
    router.push("/home/home-screen");
  }, []);

  return {
    handleNavigation,
    handleCancel
  };
};
