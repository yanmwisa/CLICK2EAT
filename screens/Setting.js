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
  Alert
} from "react-native";
import { auth, signout, deleteUser } from "../firebase-auth";
import { db } from "../firebase-config";
import { onSnapshot, doc } from "firebase/firestore";

const Setting = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const currentUserId = auth.currentUser?.uid;

    if (currentUserId) {
      const userDoc = doc(db, "users", currentUserId);

      // Listen for real-time updates on user data
      const unsubscribe = onSnapshot(userDoc, (docSnapshot) => {
        if (docSnapshot.exists()) {
          setUser(docSnapshot.data());
        }
      });

      return () => unsubscribe();
    }
  }, []);

  // Function to handle user sign-out
  const handleSignOut = async () => {
    try {
      await signout(auth);
      navigation.navigate("Login"); // Navigate back to SignIn screen
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Function to handle account deletion with a confirmation alert
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
              navigation.navigate("SignIn"); // Navigate back to SignIn after deletion
            } catch (error) {
              console.error("Error deleting account:", error);
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* User Profile Header */}
        <View style={styles.header}>
          <Image
            source={require("../assets/fish.jpg")}
            style={styles.profileImage}
          />
          {user ? (
            <>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
            </>
          ) : (
            <Text style={styles.loadingText}>Loading user data...</Text>
          )}
        </View>

        <View style={styles.optionsContainer}>
          {/* Account Settings */}
          <View style={styles.optionSection}>
            <Text style={styles.sectionTitle}>Account</Text>
            <TouchableOpacity style={styles.option} onPress={handleSignOut}>
              <Text style={styles.optionText}>Sign Out</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.option, styles.deleteOption]}
              onPress={handleDeleteAccount}
            >
              <Text style={styles.optionText}>Delete Account</Text>
            </TouchableOpacity>
          </View>

          {/* Preferences Settings */}
          <View style={styles.optionSection}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            <View style={styles.preference}>
              <Text style={styles.preferenceText}>Dark Mode</Text>
              <Switch
                value={isDarkMode}
                onValueChange={(value) => setIsDarkMode(value)}
              />
            </View>
            <TouchableOpacity style={styles.option}>
              <Text style={styles.optionText}>Change Language</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option}>
              <Text style={styles.optionText}>Manage Notifications</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Setting;

// Styles for UI components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4"
  },
  header: {
    backgroundColor: "#EA2831",
    paddingVertical: 30,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
    marginBottom: 10
  },
  userName: {
    fontSize: 22,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 5
  },
  userEmail: {
    fontSize: 16,
    color: "#e0e0e0"
  },
  loadingText: {
    fontSize: 16,
    color: "#fff"
  },
  optionsContainer: {
    marginTop: 20,
    paddingHorizontal: 20
  },
  optionSection: {
    marginBottom: 30,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10
  },
  option: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0"
  },
  deleteOption: {
    borderBottomWidth: 0 // No bottom border for the last item
  },
  optionText: {
    fontSize: 16,
    color: "#444"
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0"
  },
  preferenceText: {
    fontSize: 16,
    color: "#444"
  }
});
