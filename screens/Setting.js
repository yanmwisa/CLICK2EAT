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
import { MaterialIcons, Feather } from "@expo/vector-icons";

const Setting = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  const handleSignOut = async () => {
    try {
      await signout(auth);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

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
              navigation.navigate("SignIn");
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
        <View style={styles.header}>
          <Image source={require("../assets/fish.jpg")} style={styles.profileImage} />
          {user ? (
            <>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
            </>
          ) : (
            <ActivityIndicator color="#fff" />
          )}
        </View>

        <View style={styles.optionsContainer}>
          <View style={styles.optionSection}>
            <Text style={styles.sectionTitle}>Profile</Text>
            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("EditProfile")}>
              <Text style={styles.optionText}>Edit</Text>
              <Feather name="edit" size={20} color="#444" />
            </TouchableOpacity>
          </View>

          <View style={styles.optionSection}>
            <Text style={styles.sectionTitle}>Account</Text>
            <TouchableOpacity style={styles.option} onPress={handleSignOut}>
              <Text style={styles.optionText}>Sign Out</Text>
              <MaterialIcons name="logout" size={20} color="#444" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.option, styles.deleteOption]} onPress={handleDeleteAccount}>
              <Text style={styles.optionText}>Delete Account</Text>
              <MaterialIcons name="delete" size={20} color="#444" />
            </TouchableOpacity>
          </View>

          <View style={styles.optionSection}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            <View style={styles.preference}>
              <Text style={styles.preferenceText}>Dark Mode</Text>
              <Switch value={isDarkMode} onValueChange={(value) => setIsDarkMode(value)} />
            </View>
            <TouchableOpacity style={styles.option}>
              <Text style={styles.optionText}>Change Language</Text>
              <MaterialIcons name="language" size={20} color="#444" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.option}>
              <Text style={styles.optionText}>Manage Notifications</Text>
              <Feather name="bell" size={20} color="#444" />
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
  userName: { fontSize: 22, fontWeight: "600", color: "#fff", marginBottom: 5 },
  userEmail: { fontSize: 16, color: "#e0e0e0" },
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0"
  },
  deleteOption: { borderBottomWidth: 0 },
  optionText: { fontSize: 16, color: "#444" },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0"
  },
  preferenceText: { fontSize: 16, color: "#444" }
});
