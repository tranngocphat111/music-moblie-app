import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface PlayerControlsProps {
  isPlaying: boolean;
  positionMillis: number;
  durationMillis: number;
  onSeekStart: () => void;
  onSeekComplete: (value: number) => void;
  onPlayPausePress: () => void;
}

const formatTime = (millis: number) => {
  const totalSeconds = Math.floor(millis / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export function PlayerControls({
  isPlaying,
  positionMillis,
  durationMillis,
  onSeekStart,
  onSeekComplete,
  onPlayPausePress,
}: PlayerControlsProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.controlsWrapper,
        { paddingBottom: Math.max(insets.bottom + 10, 20) },
      ]}
    >
      <View style={styles.sliderContainer}>
        <Text style={styles.timeText}>{formatTime(positionMillis)}</Text>

        <Slider
          style={styles.slider}
          value={positionMillis}
          minimumValue={0}
          maximumValue={durationMillis}
          minimumTrackTintColor="#9DFE00"
          maximumTrackTintColor="#555"
          thumbTintColor="#9DFE00"
          onSlidingStart={onSeekStart}
          onSlidingComplete={onSeekComplete}
        />

        <Text style={styles.timeText}>{formatTime(durationMillis)}</Text>
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity>
          <MaterialCommunityIcons name="shuffle" size={28} color="white" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="play-skip-back" size={32} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={onPlayPausePress} style={styles.playButton}>
          <Ionicons
            name={isPlaying ? "pause-outline" : "play-outline"}
            size={40}
            color="#000"
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="play-skip-forward" size={32} color="white" />
        </TouchableOpacity>

        <TouchableOpacity>
          <MaterialCommunityIcons name="repeat" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  controlsWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#0c0c0f",
    paddingTop: 15,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: "#1e1e1e",
    height: 120,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  timeText: {
    fontSize: 12,
    color: "#ccc",
    width: 40,
    textAlign: "center",
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  playButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#9DFE00",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
});
