// app/(auths)/sign-in.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import SignInForm from "../../components/auth/SignInForm";
import SocialAuth from "../../components/auth/SocialAuth";
import AuthFooter from "../../components/auth/AuthFooter";

const BG_IMAGE = require("../../assets/images/auth/auth-bg.jpg");

export default function SignInScreen() {
  const router = useRouter();

  return (
    <ImageBackground source={BG_IMAGE} style={styles.bg}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <SafeAreaView style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.title}>SIGN IN</Text>

            <SignInForm />
            <SocialAuth />
    
            <AuthFooter
              promptText="Don't have an account? "
              linkText="Sign Up"
              onLinkPress={() => router.push("/sign-up")}
            />
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  bg: {
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 50,
  },
});
