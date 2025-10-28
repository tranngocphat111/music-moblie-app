import React from "react";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome5,
  Feather,
} from "@expo/vector-icons";

export const libraryItems = [
  {
    key: "1",
    title: "My playlist",
    icon: (
      <MaterialIcons
        name="playlist-play"
        size={24}
        color="rgba(255,255,255,0.7)"
      />
    ),
  },
  {
    key: "2",
    title: "Album",
    icon: (
      <Ionicons
        name="musical-notes-outline"
        size={22}
        color="rgba(255,255,255,0.7)"
      />
    ),
  },
  {
    key: "3",
    title: "MV",
    icon: (
      <MaterialIcons
        name="video-library"
        size={22}
        color="rgba(255,255,255,0.7)"
      />
    ),
  },
  {
    key: "4",
    title: "Artist",
    icon: (
      <FontAwesome5 name="user-alt" size={20} color="rgba(255,255,255,0.7)" />
    ),
  },
  {
    key: "5",
    title: "Download",
    icon: <Feather name="download" size={22} color="rgba(255,255,255,0.7)" />,
  },
];

// --- Dữ liệu Recent Activity ---
export const recentActivityImages = [
  { key: "1", uri: "https://placehold.co/150x150/00F0FF/000000?text=Recent+1" },
  { key: "2", uri: "https://placehold.co/150x150/FF00FF/000000?text=Recent+2" },
  { key: "3", uri: "https://placehold.co/150x150/FFFF00/000000?text=Recent+3" },
  { key: "4", uri: "https://placehold.co/150x150/FF007F/000000?text=Recent+4" },
  { key: "5", uri: "https://placehold.co/150x150/00FFFF/000000?text=Recent+5" },
  { key: "6", uri: "https://placehold.co/150x150/FF6600/000000?text=Recent+6" },
];

// --- URLs ---
export const avatarUrl =
  "https://placehold.co/100x100/E040FB/FFFFFF?text=Avatar";
export const songAvatarUrl =
  "https://placehold.co/50x50/E040FB/FFFFFF?text=Song";
