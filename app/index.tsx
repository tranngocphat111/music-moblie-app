import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const { width } = Dimensions.get('window');

interface NavItemProps {
  icon: any;
  title: string;
  subtitle: string;
  route: string;
  color: string;
  delay: number;
}

const NavItem = ({ icon, title, subtitle, route, color, delay }: NavItemProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
    >
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => router.push(route as any)}
        activeOpacity={0.7}
      >
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.navItemGradient}
        >
          <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
            <Ionicons name={icon} size={28} color={color} />
          </View>
          <View style={styles.navItemText}>
            <Text style={styles.navItemTitle}>{title}</Text>
            <Text style={styles.navItemSubtitle}>{subtitle}</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="rgba(255,255,255,0.3)" />
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function Index() {
  const titleAnim = useRef(new Animated.Value(0)).current;
  const subtitleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(titleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(subtitleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#1DB954', '#121212', '#000000']}
        style={styles.background}
      >
        {/* Header */}
        <View style={styles.header}>
          <Animated.View style={{ opacity: titleAnim }}>
            <Text style={styles.title}>Music App</Text>
          </Animated.View>
          <Animated.View style={{ opacity: subtitleAnim }}>
            <Text style={styles.subtitle}>Choose where you want to go</Text>
          </Animated.View>
        </View>

        {/* Navigation Items */}
        <View style={styles.navContainer}>
          <NavItem
            icon="home"
            title="Home"
            subtitle="Discover new music"
            route="/home/home-screen"
            color="#1DB954"
            delay={200}
          />
          <NavItem
            icon="search"
            title="Search"
            subtitle="Find your favorite songs"
            route="/(modals)/search"
            color="#ff6b6b"
            delay={300}
          />
          <NavItem
            icon="musical-notes"
            title="Songs"
            subtitle="Browse all tracks"
            route="/songs/SongScreen"
            color="#4ecdc4"
            delay={400}
          />
          <NavItem
            icon="rocket"
            title="Onboarding"
            subtitle="Get started guide"
            route="/(onboarding)"
            color="#ffd93d"
            delay={500}
          />
          <NavItem
            icon="person-circle"
            title="Account"
            subtitle="Manage your profile"
            route="/(account)"
            color="#a78bfa"
            delay={600}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Made with ❤️ for music lovers</Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  background: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  title: {
    fontSize: 42,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '400',
  },
  navContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  navItem: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  navItemGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  navItemText: {
    flex: 1,
  },
  navItemTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  navItemSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.5)',
    fontWeight: '400',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.3)',
    fontWeight: '500',
  },
});
