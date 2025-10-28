import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Feather } from "@expo/vector-icons";

type EmailStepProps = {
  onSubmit: (email: string) => void;
};

export default function EmailStep({ onSubmit }: EmailStepProps) {
  const [email, setEmail] = useState("");

  return (
    <View style={styles.form}>
      <View style={styles.inputContainer}>
        <Feather
          name="mail"
          size={20}
          color="#333" // Cập nhật màu icon cho nền sáng
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="E-Mail"
          placeholderTextColor="#666" // Cập nhật placeholder
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => onSubmit(email)}>
        <Text style={styles.buttonText}>SENT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: "100%",
    color: "#000",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#CFFC00",
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
