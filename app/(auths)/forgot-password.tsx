import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

// Import các component con
import ForgotPasswordHeader from "../../components/auth/ForgotPasswordHeader";
import EmailStep from "../../components/auth/EmailStep";
import ResetStep from "../../components/auth/ResetStep";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  // 'email' | 'reset'
  const [step, setStep] = useState("email");

  // Gửi link reset
  const handleSendLink = (email: string) => {
    console.log("Sending reset link to:", email);
    setStep("reset");
  };

  // Đổi mật khẩu
  const handleChangePassword = (password: string) => {
    console.log("Changing password to:", password);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ForgotPasswordHeader onBackPress={() => router.back()} />

        {step === "email" && <EmailStep onSubmit={handleSendLink} />}

        {step === "reset" && <ResetStep onSubmit={handleChangePassword} />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191A1E",
  },
  content: {
    flex: 1,
    // justifyContent: "center", // Header đã xử lý padding
    paddingHorizontal: 30,
  },
});
