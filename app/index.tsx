import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0a0e27",
      }}
    >
      <Text style={{ color: "#fff", fontSize: 16 }}>
        Đây là màn hình Index (trang chính)
      </Text>

      <Link
        href="/home/HomeScreen"
        style={{ marginTop: 20, color: "#1DB954", fontSize: 18 }}
      >
        👉 Đi tới trang Home
      </Link>

      <Link
        href="/search/SearchScreen"
        style={{ marginTop: 20, color: "#1DB954", fontSize: 18 }}
      >
        🔍 Đi tới trang Search
      </Link>

      <Link
        href="/(onboarding)"
        style={{ marginTop: 20, color: "#1DB954", fontSize: 18 }}
      >
        🚀 Onboarding
      </Link>
    </View>
  );
}
