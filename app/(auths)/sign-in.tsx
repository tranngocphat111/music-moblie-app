// app/(auths)/sign-in.tsx
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
import {
  Feather,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";

const BG_IMAGE = require("../../assets/images/auth/auth-bg.jpg");

export default function SignInScreen() {
  const router = useRouter();
  const [secureText, setSecureText] = useState(true);

  const handleLogin = () => {
    // ... (Thêm logic đăng nhập ở đây) ...
    // router.replace("/home");
  };

  return (
    <ImageBackground source={BG_IMAGE} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <SafeAreaView style={styles.content}>
          <Text style={styles.title}>SIGN IN</Text>

          {/* Form */}
          <View style={styles.form}>
            {/* E-Mail Input */}
            <View style={styles.inputContainer}>
              <Feather
                name="mail"
                size={20}
                color="rgba(255,255,255,0.7)"
                style={styles.inputIcon}
              />
              {/* Quay lại màu sáng */}
              <TextInput
                style={styles.input}
                placeholder="E-Mail"
                placeholderTextColor="rgba(255,255,255,0.7)" // Quay lại màu sáng
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
              />{" "}
              {/* Quay lại màu sáng */}
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="rgba(255,255,255,0.7)" // Quay lại màu sáng
                secureTextEntry={secureText}
              />
              <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                <Feather
                  name={secureText ? "eye-off" : "eye"}
                  size={20}
                  color="rgba(255,255,255,0.7)" // Quay lại màu sáng
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => router.push("/forgot-password")}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* ... (Phần còn lại của file giữ nguyên) ... */}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>SIGN IN</Text>
          </TouchableOpacity>

          <View style={styles.socialContainer}>
            <Text style={styles.socialText}>Or connect with</Text>
            <View style={styles.socialIcons}>
              <TouchableOpacity style={styles.socialIconBtn}>
                <FontAwesome name="facebook" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialIconBtn}>
                <FontAwesome name="google" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialIconBtn}>
                <FontAwesome name="twitter" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/sign-up")}>
              <Text style={styles.footerLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
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
  form: {
    width: "100%",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    // ------------------------------------
    // THAY ĐỔI Ở ĐÂY CHO INPUT TRONG SUỐT
    backgroundColor: "rgba(255, 255, 255, 0.15)", // Màu nền trong suốt (15% trắng)
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 50,
    borderWidth: 1, // Thêm viền
    borderColor: "rgba(255, 255, 255, 0.3)", // Màu viền hơi trong suốt
    // Bỏ shadow
    // ------------------------------------
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
  forgotPassword: {
    color: "rgba(255,255,255,0.8)",
    textAlign: "right",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#CFFC00",
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
  socialContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  socialText: {
    color: "rgba(255,255,255,0.8)",
    marginBottom: 20,
  },
  socialIcons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  socialIconBtn: {
    marginHorizontal: 15,
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 50,
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
