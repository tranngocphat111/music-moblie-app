import { ImageSourcePropType } from "react-native";

export type Slide = {
  key: string;
  image: ImageSourcePropType;
  title: string;
  preTitle: string | null;
  subtitle: string | null;
  titleStyle: "large" | "normal";
};

export const slides: Slide[] = [
  {
    key: "1",
    image: require("../assets/images/onboarding/onboarding_1.jpg"),
    title: "GEEZ MUSIC",
    preTitle: null,
    subtitle: "Discover and stream your favorite songs anytime, anywhere",
    titleStyle: "large",
  },
  {
    key: "2",
    image: require("../assets/images/onboarding/onboarding_2.png"),
    preTitle: "APP UI KIT",
    title: "WELCOME TO GEEZ APP",
    subtitle: "Organize your playlists and enjoy seamless music experience",
    titleStyle: "normal",
  },
  {
    key: "3",
    image: require("../assets/images/onboarding/onboarding_3.png"),
    preTitle: "APP UI KIT",
    title: "DISCOVER NEW TRACKS",
    subtitle: "Explore trending songs and discover music you love",
    titleStyle: "normal",
  },
  {
    key: "4",
    image: require("../assets/images/onboarding/onboarding_4.png"),
    preTitle: "APP UI KIT",
    title: "ENJOY OFFLINE MODE",
    subtitle: "Download your favorite songs and listen without internet",
    titleStyle: "normal",
  },
];
