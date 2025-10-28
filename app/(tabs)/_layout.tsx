import { Stack } from "expo-router";

export default function AccountLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="home-screen"
        options={{
          headerShown: false,
          title: "Home",
        }}
      />
    </Stack>
  );
}
