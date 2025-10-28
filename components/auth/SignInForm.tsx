// components/auth/SignInForm
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "../../contexts/AuthContext"; // <--- THÊM: Import AuthContext

export default function SignInForm() {
  const router = useRouter();
  const { signIn, isLoading, error } = useAuth(); // <--- THAY ĐỔI
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ email và mật khẩu.");
      return;
    }
    try {
      await signIn({ email, password });
      router.replace("/home/home-screen");
    } catch (err) {
      Alert.alert(
        "Lỗi Đăng Nhập",
        err instanceof Error ? err.message : "Đã xảy ra lỗi không xác định."
      );
    }
  };

  return (
    <View style={styles.formContainer}>
      {/* Form Inputs */}
      <View style={styles.form}>
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
            value={email}
            onChangeText={setEmail}
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
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setSecureText(!secureText)}>
            <Feather
              name={secureText ? "eye-off" : "eye"}
              size={20}
              color="rgba(255,255,255,0.7)"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.push("/forgot-password")}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]} // <--- THAY ĐỔI: Thêm style khi đang tải
        onPress={handleLogin}
        disabled={isLoading} // <--- THAY ĐỔI: Vô hiệu hóa nút khi đang tải
      >
        {isLoading ? ( // <--- THAY ĐỔI: Hiển thị ActivityIndicator khi đang tải
          <ActivityIndicator color="#000" />
        ) : (
          <Text style={styles.buttonText}>SIGN IN</Text>
        )}
      </TouchableOpacity>

      {/* Hiển thị lỗi từ Context nếu có */}
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
  },
  form: {
    width: "100%",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    color: "#fff",
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
    marginBottom: 10, // Giảm marginBottom để chừa chỗ cho errorText
  },
  buttonDisabled: {
    // <--- THÊM: Style cho nút bị vô hiệu hóa
    backgroundColor: "#868686",
    opacity: 0.7,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    // <--- THÊM: Style cho thông báo lỗi
    color: "#ff6b6b",
    textAlign: "center",
    marginBottom: 20,
    fontSize: 14,
  },
});
