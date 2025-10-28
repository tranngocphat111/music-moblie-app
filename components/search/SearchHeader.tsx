import { SearchHeaderProps } from '@/types/search';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
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
  onSubmitEditing,
  onBlur,
}: SearchHeaderProps) => {
  const focusAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(focusAnimation, {
      toValue: isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused]);

  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) {
      onBlur();
    }
  };

  const borderColor = focusAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.2)'],
  });

  return (
    <View style={styles.header}>
      <Animated.View 
        style={[
          styles.searchContainer,
          {
            borderColor,
          }
        ]}
      >
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search songs, artists, albums..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          onSubmitEditing={onSubmitEditing}
          returnKeyType="search"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity 
            onPress={() => setSearchQuery("")}
            style={styles.clearButton}
          >
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </Animated.View>
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
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 46,
    borderWidth: 1,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
    opacity: 0.6,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 15,
  },
  clearButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: '600',
  },
  cancelButton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default SearchHeader;