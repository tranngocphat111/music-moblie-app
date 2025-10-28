import { SearchTabsProps, TabType } from '@/types/search';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const SearchTabs = ({ activeTab, setActiveTab }: SearchTabsProps) => {
  const tabs: TabType[] = ["all", "artist", "album", "song", "playlist"];
  const underlinePosition = useRef(new Animated.Value(0)).current;
  const tabWidths = useRef<{ [key: string]: number }>({}).current;
  const tabPositions = useRef<{ [key: string]: number }>({}).current;

  // Capitalize first letter
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    const position = tabPositions[activeTab] || 0;
    Animated.spring(underlinePosition, {
      toValue: position,
      useNativeDriver: true,
      tension: 68,
      friction: 10,
    }).start();
  }, [activeTab]);

  const handleLayout = (tab: TabType, event: any, index: number) => {
    const { width, x } = event.nativeEvent.layout;
    tabWidths[tab] = width;
    tabPositions[tab] = x;
    
    // Set initial position for first tab
    if (index === 0 && activeTab === tab) {
      underlinePosition.setValue(x);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabContainer}
      >
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={tab}
            style={styles.tab}
            onPress={() => setActiveTab(tab)}
            onLayout={(event) => handleLayout(tab, event, index)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {capitalize(tab)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Animated.View
        style={[
          styles.underline,
          {
            transform: [{ translateX: underlinePosition }],
            width: tabWidths[activeTab] || 50,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginBottom: 16,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    maxHeight: 50,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 12,
  },
  tabText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },
  activeTabText: {
    color: "#fff",
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    backgroundColor: "#fff",
    marginLeft: 16,
  },
});

export default SearchTabs;