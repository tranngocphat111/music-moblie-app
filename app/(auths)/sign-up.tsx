import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

// Import các component con
import SignUpForm from "../../components/auth/SignUpForm";
import AuthFooter from "../../components/auth/AuthFooter";

const BG_IMAGE = require("../../assets/images/auth/sign-up_bg.jpg");

export default function SignUpScreen() {
  const router = useRouter();

  return (
    <ImageBackground source={BG_IMAGE} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <SafeAreaView style={styles.content}>
          <Text style={styles.title}>SIGN UP</Text>

          {/* 1. Form Đăng ký */}
          <SignUpForm />

          {/* 2. Footer Link */}
          <AuthFooter
            promptText="Already have an account? "
            linkText="Sign In"
            onLinkPress={() => router.back()}
          />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 50,
  },
  // Các style khác đã được chuyển vào SignUpForm và AuthFooter
});
