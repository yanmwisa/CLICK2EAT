import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch,
  Alert,
  ActivityIndicator
} from "react-native";
import { auth, signout, deleteUser } from "../firebase-auth";
import { db } from "../firebase-config";
import { onSnapshot, doc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { MaterialIcons, Feather } from "@expo/vector-icons";

const Setting = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Fetch user data
  useEffect(() => {
    const currentUserId = auth.currentUser?.uid;
    if (currentUserId) {
      const userDoc = doc(db, "users", currentUserId);
      const unsubscribe = onSnapshot(userDoc, (docSnapshot) => {
        if (docSnapshot.exists()) {
          setUser(docSnapshot.data());
        }
      });
      return () => unsubscribe();
    }
  }, []);

  // Load theme preference from AsyncStorage
  useEffect(() => {
    const loadThemePreference = async () => {
      const savedTheme = await AsyncStorage.getItem("theme");
      if (savedTheme === "dark") {
        setIsDarkMode(true);
      }
    };
    loadThemePreference();
  }, []);

  // Toggle Dark Mode and Save Preference
  const toggleDarkMode = async () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    await AsyncStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  // Toggle Notifications
  const toggleNotifications = () => {
    setNotificationsEnabled((prevState) => !prevState);
    Alert.alert(
      "Notifications",
      notificationsEnabled ? "Notifications Disabled" : "Notifications Enabled"
    );
  };

  // Sign Out with Navigation Reset
  const handleSignOut = async () => {
    try {
      await signout(auth);

      
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Delete Account
  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteUser(auth.currentUser);
              await signout();
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: "SignUp" }]
                })
              );
            } catch (error) {
              console.error("Error deleting account:", error);
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, isDarkMode && styles.darkContainer]}
    >
      <ScrollView>
        <View style={[styles.header, isDarkMode && styles.darkHeader]}>
          <Image
            source={require("../assets/fish.jpg")}
            style={styles.profileImage}
          />
          {user ? (
            <>
              <Text style={[styles.userName, isDarkMode && styles.darkText]}>
                {user.name}
              </Text>
              <Text style={[styles.userEmail, isDarkMode && styles.darkText]}>
                {user.email}
              </Text>
            </>
          ) : (
            <Text style={[styles.loadingText, isDarkMode && styles.darkText]}>
              Loading user data...
            </Text>
          )}
        </View>

        <View style={styles.optionsContainer}>
          <View style={styles.optionSection}>
            <Text style={[styles.sectionTitle, isDarkMode && styles.darkText]}>
              Account
            </Text>

            {/* Edit Profile */}
            <TouchableOpacity
              style={styles.option}
              onPress={() => navigation.navigate("EditProfile")}
            >
              <Text style={[styles.optionText, isDarkMode && styles.darkText]}>
                Edit Profile
              </Text>
            </TouchableOpacity>

            {/* Dark Mode Toggle */}
            <View style={styles.option}>
              <Text style={[styles.optionText, isDarkMode && styles.darkText]}>
                Dark Mode
              </Text>
              <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
            </View>

            {/* Notifications Toggle */}
            <View style={styles.option}>
              <Text style={[styles.optionText, isDarkMode && styles.darkText]}>
                Notifications
              </Text>
              <Switch
                value={notificationsEnabled}
                onValueChange={toggleNotifications}
              />
            </View>

            {/* Sign Out */}
            <TouchableOpacity style={styles.option} onPress={handleSignOut}>
              <Text style={[styles.optionText, isDarkMode && styles.darkText]}>
                Sign Out
              </Text>
            </TouchableOpacity>

            {/* Delete Account */}
            <TouchableOpacity
              style={[styles.option, styles.deleteOption]}
              onPress={handleDeleteAccount}
            >
              <Text style={[styles.optionText, styles.deleteText]}>
                Delete Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f4" },
  darkContainer: { backgroundColor: "#121212" },
  header: {
    backgroundColor: "#EA2831",
    paddingVertical: 30,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  darkHeader: { backgroundColor: "#1f1f1f" },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
    marginBottom: 10
  },
  userName: { fontSize: 22, fontWeight: "600", color: "#fff", marginBottom: 5 },
  userEmail: { fontSize: 16, color: "#e0e0e0" },
  loadingText: { fontSize: 16, color: "#fff" },
  darkText: { color: "#fff" },
  optionsContainer: { marginTop: 20, paddingHorizontal: 20 },
  optionSection: {
    marginBottom: 30,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    flexDirection: "column",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#333", marginBottom: 10 },
  option: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  deleteOption: { borderBottomWidth: 0 },
  deleteText: { color: "red", fontWeight: "bold" },
  optionText: { fontSize: 16, color: "#444" }
});
