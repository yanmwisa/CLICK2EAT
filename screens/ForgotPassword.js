import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert
} from "react-native";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useNavigation } from "@react-navigation/native"; // ✅ Import Navigation Hook

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const auth = getAuth();
  const navigation = useNavigation(); // ✅ Use Navigation Hook

  const handleRecoverPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        "Success",
        "A password reset link has been sent to your email.",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("Login"), // ✅ Navigate to Login after alert
          },
        ]
      );
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ backgroundColor: "#fff", flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={styles.pageContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Recover Your Password</Text>

          <Text style={styles.instructions}>
            Enter your email address below to receive instructions on how to{" "}
            <Text style={styles.redText}>reset your password</Text>.
          </Text>

          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Enter your email"
            style={styles.textInput}
            placeholderTextColor="grey"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleRecoverPassword}
          >
            <Text style={styles.submitButtonText}>Recover Password</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  formContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    marginTop: 120,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 20,
    textAlign: "left",
  },
  instructions: {
    fontSize: 16,
    color: "#555",
    textAlign: "left",
    marginBottom: 20,
    lineHeight: 22,
  },
  redText: {
    color: "#EA2831", // ✅ Text highlighted in red
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
    color: "#333",
  },
  textInput: {
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EA2831", // ✅ Border color red
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 14,
    color: "#000",
  },
  submitButton: {
    backgroundColor: "#EA2831", // ✅ Button in red color
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#EA2831",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});