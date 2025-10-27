import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>

      {/* <Link
        href="/home/Home"
        style={{ marginTop: 20, color: "blue", fontSize: 18 }}
      >
        Đi tới trang Home
      </Link>
      <Link
        href="/search/SearchScreen"
        style={{ marginTop: 20, color: "blue", fontSize: 18 }}
      >
        Đi tới trang Search
      </Link> */}
      <Link href="/(onboarding)">heheh</Link>
    </View>
  );
}
