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
    width: 160,
    marginRight: 16,
    marginVertical: 8,
  },
  albumCard: {
    width: 160,
    height: 160,
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  albumImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    overflow: 'hidden',
    borderRadius: 16,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  albumTextOverlay: {
    padding: 14,
    zIndex: 1,
  },
  albumTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.primaryText,
    marginBottom: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  albumArtist: {
    fontSize: 12,
    color: COLORS.primaryText,
    opacity: 0.85,
    fontWeight: "500",
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
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
          imageStyle={{ borderRadius: 16 }}
        >
          <LinearGradient
            colors={['transparent', 'rgba(0, 0, 0, 0.9)']}
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