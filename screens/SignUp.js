import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { signup } from "../firebase-auth";
import { db } from "../firebase-config";
import { setDoc, doc } from "firebase/firestore";

export default function SignUp() {
  const navigation = useNavigation();
  const [password, setPassword] = useState(true);
  const [repeatPassword, setRepeatPassword] = useState(true);
  const [checkbox, setCheckbox] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [repeatPasswordValue, setRepeatPasswordValue] = useState("");

  const handlePasswordVisible = () => setPassword(!password);
  const handleRepeatPasswordVisible = () => setRepeatPassword(!repeatPassword);
  const handleCheckbox = () => setCheckbox(!checkbox);

  const handleSignUp = async () => {
    setLoading(true);

    if (!checkbox) {
      Alert.alert("Error", "Please accept the Terms and Conditions.");
      setLoading(false);
      return;
    }
    if (passwordValue !== repeatPasswordValue) {
      Alert.alert("Error", "Passwords do not match. Please try again.");
      setLoading(false);
      return;
    }
    try {
      const userCredential = await signup(email, passwordValue);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: name,
        surname: surname,
        email: email,
        // phone: phone
      });

      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
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
            <View style={styles.logoContainer}>
              <Text style={styles.appName}>Click2Eat</Text>
              <Text style={styles.subtitle}>Create an Account</Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <MaterialIcons
                  name="person"
                  size={20}
                  color="#888"
                  style={styles.icon}
                />
                <TextInput
                  placeholder="Enter your name"
                  style={styles.textInput}
                  placeholderTextColor="#888"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View style={styles.inputContainer}>
                <MaterialIcons
                  name="person-outline"
                  size={20}
                  color="#888"
                  style={styles.icon}
                />
                <TextInput
                  placeholder="Enter your surname"
                  style={styles.textInput}
                  placeholderTextColor="#888"
                  value={surname}
                  onChangeText={setSurname}
                />
              </View>

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
              {/* <View style={styles.inputContainer}>
                <MaterialIcons
                  name="phone"
                  size={20}
                  color="#888"
                  style={styles.icon}
                />
                <TextInput
                  placeholder="Enter your phone number"
                  style={styles.textInput}
                  placeholderTextColor="#888"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                />
              </View> */}

              <View style={styles.inputContainer}>
                <Feather
                  name="lock"
                  size={20}
                  color="#888"
                  style={styles.icon}
                />
                <TextInput
                  placeholder="Enter password"
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

              <View style={styles.inputContainer}>
                <Feather
                  name="lock"
                  size={20}
                  color="#888"
                  style={styles.icon}
                />
                <TextInput
                  placeholder="Repeat your password"
                  style={styles.textInput}
                  placeholderTextColor="#888"
                  secureTextEntry={repeatPassword}
                  value={repeatPasswordValue}
                  onChangeText={setRepeatPasswordValue}
                />
                <TouchableOpacity
                  onPress={handleRepeatPasswordVisible}
                  style={styles.eyeIcon}
                >
                  <Feather
                    name={repeatPassword ? "eye-off" : "eye"}
                    size={20}
                    color="#888"
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.termsContainer}>
                <TouchableOpacity onPress={handleCheckbox}>
                  <Fontisto
                    name={checkbox ? "checkbox-active" : "checkbox-passive"}
                    size={18}
                    color="#EA2831"
                  />
                </TouchableOpacity>
                <Text style={styles.termsText}>
                  I accept the{" "}
                  <Text style={styles.termsLink}>Terms and Conditions</Text>
                </Text>
              </View>

              <TouchableOpacity
                style={styles.signupButton}
                onPress={handleSignUp}
                disabled={loading}
              >
                <LinearGradient
                  colors={["#EA2831", "#ff4d4d"]}
                  style={styles.gradientButton}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.signupButtonText}>Sign Up</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              <View style={styles.footer}>
                <Text style={styles.footerText}>
                  Already have an account?
                  <Text
                    style={styles.linkText}
                    onPress={() => navigation.navigate("Login")}
                  >
                    {" "}
                    Log In
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
  container: { flex: 1 },
  innerContainer: { padding: 20 },
  logoContainer: { alignItems: "center", marginBottom: 40 },
  appName: { fontSize: 32, fontWeight: "bold", color: "#fff" },
  subtitle: { fontSize: 16, color: "#fff", marginTop: 5 },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    elevation: 3
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginBottom: 15
  },
  textInput: { flex: 1, height: 50, paddingHorizontal: 15, fontSize: 16 },
  eyeIcon: { position: "absolute", right: 10 },
  termsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 25,
    gap: 3,
  },
  termsText: { fontSize: 13, color: "#333" },
  termsLink: { color: "#EA2831", fontWeight: "bold" },
  signupButton: { borderRadius: 10, overflow: "hidden" },
  gradientButton: { paddingVertical: 15, alignItems: "center" },
  signupButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  linkText: {
    color: "#EA2831",  
    fontWeight: "bold",
  },
  footer: {
    marginTop: 30,  
    alignItems: "center",
  },
});
