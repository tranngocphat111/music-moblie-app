import { SearchTabsProps, TabType } from '@/types/search';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  LayoutChangeEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const SearchTabs = ({ activeTab, setActiveTab }: SearchTabsProps) => {
  const tabs: TabType[] = ["all", "artist", "album", "song", "playlist"];
  const scrollViewRef = useRef<ScrollView>(null);
  const underlinePosition = useRef(new Animated.Value(0)).current;
  const underlineWidth = useRef(new Animated.Value(50)).current;
  
  const tabRefs = useRef<{ [key: string]: { ref: View | null; width: number } }>({});

  // Capitalize first letter
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    const tabInfo = tabRefs.current[activeTab];
    if (tabInfo?.ref) {
      // Measure vị trí tuyệt đối của tab trong ScrollView
      tabInfo.ref.measureLayout(
        scrollViewRef.current as any,
        (x, y, width, height) => {
          const targetPosition = x; // Không cần +16 vì underline cùng nằm trong ScrollView
          
          // Animation nhanh hơn
          Animated.parallel([
            Animated.timing(underlinePosition, {
              toValue: targetPosition,
              duration: 150,
              useNativeDriver: false,
            }),
            Animated.timing(underlineWidth, {
              toValue: width,
              duration: 150,
              useNativeDriver: false,
            }),
          ]).start();

          // Auto scroll to active tab
          scrollViewRef.current?.scrollTo({
            x: Math.max(0, x - 50),
            animated: true,
          });
        },
        () => {
          console.log('measureLayout failed');
        }
      );
    }
  }, [activeTab]);

  const handleLayout = (tab: TabType, event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    // Lưu width để dùng sau, không lưu x vì nó thay đổi khi scroll
    if (!tabRefs.current[tab]) {
      tabRefs.current[tab] = { ref: null, width };
    } else {
      tabRefs.current[tab].width = width;
    }
    
    // Set initial position cho tab đầu tiên
    if (tab === activeTab && tabRefs.current[tab].ref) {
      tabRefs.current[tab].ref!.measureLayout(
        scrollViewRef.current as any,
        (x) => {
          underlinePosition.setValue(x);
          underlineWidth.setValue(width);
        },
        () => {}
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabContainer}
        contentContainerStyle={styles.scrollContent}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={styles.tab}
            onPress={() => setActiveTab(tab)}
            onLayout={(event) => handleLayout(tab, event)}
            ref={(ref) => {
              if (ref && tabRefs.current[tab]) {
                tabRefs.current[tab].ref = ref as any;
              } else if (ref) {
                tabRefs.current[tab] = { ref: ref as any, width: 0 };
              }
            }}
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
        <Animated.View
          style={[
            styles.underline,
            {
              left: underlinePosition,
              width: underlineWidth,
            },
          ]}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  tabContainer: {
    flexDirection: "row",
    maxHeight: 50,
  },
  scrollContent: {
    paddingHorizontal: 16,
    position: 'relative',
  },
  tab: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginRight: 8,
  },
  tabText: {
    color: "#888",
    fontSize: 15,
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
    borderRadius: 1,
  },
});

export default SearchTabs;