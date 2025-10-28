import { COLORS } from "@/constants/Colors";
import { Album } from "@/types";
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef } from "react";
import {
  Animated,
  Easing,
  ImageBackground,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const styles = StyleSheet.create({
  albumCardContainer: {
    width: 150,
    marginRight: 16,
    marginVertical: 8, // Thêm spacing dọc
  },
  albumCard: {
    width: 150,
    height: 150,
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  albumImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    overflow: 'hidden',
    borderRadius: 20,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  albumTextOverlay: {
    padding: 16,
    zIndex: 1,
  },
  albumTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.primaryText,
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  albumArtist: {
    fontSize: 13,
    color: COLORS.primaryText,
    opacity: 0.9,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});

interface AlbumCardProps {
  item: Album; // Type của album
}

export const AlbumCard: React.FC<AlbumCardProps> = ({ item }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.95,
      duration: 150,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 150,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.albumCardContainer}
    >
      <Animated.View
        style={[
          styles.albumCard,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        <ImageBackground
          source={{ uri: item.image }}
          style={styles.albumImage}
          imageStyle={{ borderRadius: 20 }}
        >
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.gradient}
          />
          <View style={styles.albumTextOverlay}>
            <Text style={styles.albumTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.albumArtist} numberOfLines={1}>
              {item.artist}
            </Text>
          </View>
        </ImageBackground>
      </Animated.View>
    </Pressable>
  );
};