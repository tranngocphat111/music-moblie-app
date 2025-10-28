import { SearchHeaderProps } from '@/types/search';
import React from 'react';
import {
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';


const SearchHeader = ({
  searchQuery,
  setSearchQuery,
  isFocused,
  setIsFocused,
  onCancel,
  showCancelButton = false,
}: SearchHeaderProps) => {
  return (
    <View style={styles.header}>
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Text style={styles.clearButton}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
      {showCancelButton && (
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            setIsFocused(false);
            if (onCancel) {
              onCancel();
            }
          }}
        >
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default SearchHeader;