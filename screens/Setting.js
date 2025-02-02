import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView
} from "react-native";
import { auth, signout,deleteUser } from "../firebase-auth";
import {db} from "../firebase-config";
import { onSnapshot,doc} from "firebase/firestore";

const Setting = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUserId = auth.currentUser?.uid;
  
    if (currentUserId) {
      const userDoc = doc(db, "users", currentUserId);
  
      const unsubscribe = onSnapshot(userDoc, (docSnapshot) => {
        if (docSnapshot.exists()) {
          setUser(docSnapshot.data()); 
        } else {
          Alert.alert("Error", "User data not found.");
        }
      });
  
      return () => unsubscribe();
    }
  }, []);
  const handleSignOut = async () => {
    try {
      await signout(auth);
      navigation.navigate("SignIn");
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
              await deleteUser(auth.currentUser); //delete the user account

              await signout();
              console.log("Account deleted.");
              navigation.navigate("SignIn");
            } catch (error) {
              console.error("Error deleting account:", error);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{flex:1}}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Settings</Text>
      </View>

      <View style={styles.userInfo}>
        {user ? (
          <>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            <View style={{justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity
              style={styles.editProfileButton}
            >
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </TouchableOpacity>
            </View>
          </>
        ) : (
          <Text style={styles.loadingText}>Loading...</Text>
        )}
      </View>

      <View style={styles.preferences}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <TouchableOpacity style={styles.preferenceItem}>
          <Text style={styles.preferenceText}>Languages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.preferenceItem}>
          <Text style={styles.preferenceText}>Dark Mode</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.preferenceItem}>
          <Text style={styles.preferenceText}>Notifications</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteAccountButton}
          onPress={handleDeleteAccount}
        >
          <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    // paddingHorizontal: 20,
  },
  header: {
    backgroundColor: "#EA2831",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    height: 180,
    justifyContent:'center',
    top:-10,
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  userInfo: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    justifyContent:'center',
    alignItems:'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: "#555",
    marginBottom: 15,
  },
  editProfileButton: {
    backgroundColor: "#EA2831",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  editProfileText: {
    color: "#fff",
    fontWeight: "bold",
  },
  loadingText: {
    fontSize: 14,
    color: "#999",
  },
  preferences: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  preferenceItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  preferenceText: {
    fontSize: 14,
    color: "#555",
  },
  actions: {
    marginTop: 20,
    padding:20,
  },
  signOutButton: {
    backgroundColor: "#EA2831",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  deleteAccountButton: {
    backgroundColor: "#333",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
