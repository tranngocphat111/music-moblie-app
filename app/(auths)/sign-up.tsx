// app/(auths)/sign-up.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";

// Đảm bảo đường dẫn này đúng từ thư mục (auths)
const BG_IMAGE = require("../../assets/images/auth/sign-up_bg.jpg");

export default function SignUpScreen() {
  const router = useRouter();
  const [secureText, setSecureText] = useState(true);

  const handleSignUp = () => {
    // ... (Thêm logic đăng ký ở đây) ...
    // router.replace("/home"); // Chuyển đến màn hình chính
  };

  return (
    <ImageBackground source={BG_IMAGE} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <SafeAreaView style={styles.content}>
          <Text style={styles.title}>SIGN UP</Text>

          {/* Form */}
          <View style={styles.form}>
            {/* Name Input */}
            <View style={styles.inputContainer}>
              <Feather
                name="user"
                size={20}
                color="rgba(255,255,255,0.7)"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="rgba(255,255,255,0.7)"
                autoCapitalize="words"
              />
            </View>

            {/* E-Mail Input */}
            <View style={styles.inputContainer}>
              <Feather
                name="mail"
                size={20}
                color="rgba(255,255,255,0.7)"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="E-Mail"
                placeholderTextColor="rgba(255,255,255,0.7)"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Feather
                name="lock"
                size={20}
                color="rgba(255,255,255,0.7)"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="rgba(255,255,255,0.7)"
                secureTextEntry={secureText}
              />
              <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                <Feather
                  name={secureText ? "eye-off" : "eye"}
                  size={20}
                  color="rgba(255,255,255,0.7)"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Nút Sign Up */}
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>SIGN UP</Text>
          </TouchableOpacity>

          {/* Link Sign In */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.footerLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

// Styles đã được cập nhật
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
  form: {
    width: "100%",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    // CẬP NHẬT STYLE TRONG SUỐT
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 50,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: "100%",
    color: "#fff", // Chữ nhập vào màu trắng
    fontSize: 16,
  },
  button: {
    backgroundColor: "#CFFC00", // Màu xanh neon
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
  },
  footerLink: {
    color: "#CFFC00",
    fontSize: 14,
    fontWeight: "bold",
  },
});
