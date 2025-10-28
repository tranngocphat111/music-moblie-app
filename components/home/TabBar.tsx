import { COLORS } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface TabItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  route: string;
  isActive: boolean;
  isHome?: boolean;
}

const TabItem = ({ icon, label, route, isActive, isHome }: TabItemProps) => {
  const handlePress = () => {
    // Không làm gì nếu đã ở trang hiện tại
    if (isActive && !isHome) return;
    if (isHome && route.includes('home')) return;
    
    // Dùng replace để không có animation slide
    router.replace(route as any);
  };

  return (
    <TouchableOpacity 
      style={styles.tabItem} 
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Ionicons 
        name={icon} 
        size={26} 
        color={isHome || isActive ? COLORS.accent : COLORS.secondaryText} 
      />
      <Text 
        style={[
          styles.tabLabel, 
          { color: isHome || isActive ? COLORS.accent : COLORS.secondaryText }
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.tabBar,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
    paddingTop: 8,
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    flex: 1,
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 6,
    fontWeight: "500",
  },
});

const TabBar: React.FC = () => {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();

  // Determine active tab based on current route
  const isHomeActive = pathname.includes('/home');
  const isSearchActive = pathname.includes('/search');
  const isSongsActive = pathname.includes('/songs');
  const isAccountActive = pathname.includes('/account');

  return (
    <View style={[
      styles.tabBarContainer, 
      { 
        paddingBottom: Math.max(insets.bottom, 8)
      }
    ]}>
      <TabItem
        icon="home"
        label="Home"
        route="/home/home-screen"
        isActive={isHomeActive}
        isHome={isHomeActive}
      />
      <TabItem
        icon="search"
        label="Search"
        route="/(modals)/search"
        isActive={isSearchActive}
      />
      <TabItem
        icon="musical-notes"
        label="Songs"
        route="/songs/SongScreen"
        isActive={isSongsActive}
      />
      <TabItem
        icon="person"
        label="Account"
        route="/(account)"
        isActive={isAccountActive}
      />
    </View>
  );
};

export default TabBar;
