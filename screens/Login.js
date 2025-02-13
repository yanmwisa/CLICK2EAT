import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  ActivityIndicator
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { auth, signin } from "../firebase-auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Login({navigation}) {
  const [email, setEmail] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [password, setPassword] = useState(true);
  const [checkbox, setCheckbox] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // const navigation = useNavigation();

  const handlePasswordVisible = () => setPassword(!password);
  const handleCheckbox = () => setCheckbox(!checkbox);

  const handleLogin = async () => {
    setIsLoggingIn(true);

    if (!email || !passwordValue) {
      Alert.alert("Error", "Please fill in all fields.");
      setIsLoggingIn(false);
      return;
    }
    try {
      await signin(email, passwordValue);

      
    } catch (error) {
      Alert.alert(
        "Invalid Credentials",
        "Please check your email and password."
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <LinearGradient colors={["#EA2831", "#ff6f61"]} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <SafeAreaView style={styles.innerContainer}>
            {/* App Name Instead of Logo */}
            <View style={styles.logoContainer}>
              <Text style={styles.appName}>Click2Eat</Text>
              <Text style={styles.subtitle}>Log in to continue</Text>
            </View>

            <View style={styles.formContainer}>
              {/* Email Input */}
              <View style={styles.inputContainer}>
                <MaterialIcons
                  name="email"
                  size={20}
                  color="#888"
                  style={styles.icon}
                />
                <TextInput
                  placeholder="Enter your email"
                  style={styles.textInput}
                  placeholderTextColor="#888"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <Feather
                  name="lock"
                  size={20}
                  color="#888"
                  style={styles.icon}
                />
                <TextInput
                  placeholder="Enter your password"
                  style={styles.textInput}
                  placeholderTextColor="#888"
                  secureTextEntry={password}
                  value={passwordValue}
                  onChangeText={setPasswordValue}
                />
                <TouchableOpacity
                  onPress={handlePasswordVisible}
                  style={styles.eyeIcon}
                >
                  <Feather
                    name={password ? "eye-off" : "eye"}
                    size={20}
                    color="#888"
                  />
                </TouchableOpacity>
              </View>

              {/* Remember Me & Forgot Password */}
              <View style={styles.rowContainer}>
                <TouchableOpacity
                  onPress={handleCheckbox}
                  style={styles.checkboxContainer}
                >
                  <Fontisto
                    name={checkbox ? "checkbox-active" : "checkbox-passive"}
                    size={18}
                    color="#EA2831"
                  />
                  <Text style={styles.rememberText}>Remember Me</Text>
                </TouchableOpacity>

                <Text
                  style={styles.forgotText}
                  onPress={() => navigation.navigate("ForgotPassword")}
                >
                  Forgot password?
                </Text>
              </View>

              {/* Login Button */}
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
                disabled={isLoggingIn}
              >
                <LinearGradient
                  colors={["#EA2831", "#ff4d4d"]}
                  style={styles.gradientButton}
                >
                  {isLoggingIn ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.loginButtonText}>Log in</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              {/* Sign Up Link */}
              <View style={styles.footer}>
                <Text style={styles.footerText}>
                  Don't have an account?{" "}
                  <Text
                    style={styles.linkText}
                    onPress={() => navigation.navigate("SignUp")}
                  >
                    Sign Up
                  </Text>
                </Text>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textTransform: "uppercase",
    letterSpacing: 1
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    marginTop: 5
  },
  formContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd"
  },
  textInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#333"
  },
  icon: {
    marginRight: 10
  },
  eyeIcon: {
    position: "absolute",
    right: 15
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  rememberText: {
    fontSize: 14,
    marginLeft: 5,
    color: "#333"
  },
  forgotText: {
    fontSize: 14,
    color: "#EA2831",
    textDecorationLine: "underline"
  },
  loginButton: {
    borderRadius: 10,
    overflow: "hidden"
  },
  gradientButton: {
    paddingVertical: 15,
    alignItems: "center"
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  },
  footer: {
    marginTop: 20,
    alignItems: "center"
  },
  footerText: {
    fontSize: 14,
    color: "#555"
  },
  linkText: {
    color: "#EA2831",
    fontWeight: "bold"
  }
});
