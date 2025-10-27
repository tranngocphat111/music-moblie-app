// app/forgot-password.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  // 'email' | 'reset'
  const [step, setStep] = useState("email");
  const [secureText, setSecureText] = useState(true);
  const [secureTextConfirm, setSecureTextConfirm] = useState(true);

  // Gửi link reset
  const handleSendLink = () => {
    setStep("reset");
  };

  const handleChangePassword = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Nút Back thủ công */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subtitle}>
          If you need help resetting your password, we can help by sending you a
          link to reset it.
        </Text>

        {step === "email" && (
          <View style={styles.form}>
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
            <TouchableOpacity style={styles.button} onPress={handleSendLink}>
              <Text style={styles.buttonText}>SENT</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Bước 2: Nhập mật khẩu mới */}
        {step === "reset" && (
          <View style={styles.form}>
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
            {/* Confirm Password Input */}
            <View style={styles.inputContainer}>
              <Feather
                name="lock"
                size={20}
                color="rgba(255,255,255,0.7)"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="rgba(255,255,255,0.7)"
                secureTextEntry={secureTextConfirm}
              />
              <TouchableOpacity
                onPress={() => setSecureTextConfirm(!secureTextConfirm)}
              >
                <Feather
                  name={secureTextConfirm ? "eye-off" : "eye"}
                  size={20}
                  color="rgba(255,255,255,0.7)"
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={handleChangePassword}
            >
              <Text style={styles.buttonText}>CHANGE PASSWORD</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191A1E",
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.7)",
    marginBottom: 40,
    lineHeight: 22,
  },
  form: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAEAEA",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: "100%", // Input chiếm toàn bộ chiều cao của container
    color: "#000", // Màu chữ nhập vào là đen
    fontSize: 16,
  },
  button: {
    backgroundColor: "#CFFC00", // Màu xanh neon
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
