import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import {
  getAuth,
  updateEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import Icon from "react-native-vector-icons/Feather";

const EditProfileScreen = ({ navigation }) => {
  const auth = getAuth();
  const user = auth.currentUser;

  // State for user input fields
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [currentEmail, setCurrentEmail] = useState(user?.email || "");
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch user data from Firestore when component loads
  useEffect(() => {
    const fetchUserProfile = async () => {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setName(userData.name || "");
        setUsername(userData.username || "");
      }
    };
    fetchUserProfile();
  }, []);

  // Re-authenticate the user before sensitive changes (email/password)
  const reauthenticateUser = async () => {
    if (!currentPassword) {
      Alert.alert("Authentication Required", "Enter your current password to update your email.");
      return false;
    }

    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      return true;
    } catch (error) {
      Alert.alert("Re-authentication Failed", "Incorrect password. Please try again.");
      return false;
    }
  };

  // Handle profile updates
  const handleUpdateProfile = async () => {
    if (!name || !username || !currentEmail) {
      Alert.alert("Error", "Full name, username, and current email are required.");
      return;
    }

    if (newEmail && newEmail !== confirmEmail) {
      Alert.alert("Error", "New email addresses do not match.");
      return;
    }

    setLoading(true);

    try {
      await setDoc(doc(db, "users", user.uid), { name, username }, { merge: true });

      if (newEmail && newEmail !== currentEmail) {
        const isAuthenticated = await reauthenticateUser();
        if (!isAuthenticated) {
          setLoading(false);
          return;
        }

        await updateEmail(user, newEmail);
        Alert.alert("Confirm Your Email Change", "A confirmation email has been sent to your current email. Please verify before logging in with your new email.");
        setLoading(false);
        return;
      }

      if (newPassword.length > 6) {
        await updatePassword(user, newPassword);
      }

      Alert.alert("Success", "Profile updated successfully!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <ScrollView contentContainerStyle={styles.innerContainer}>
          <Text style={styles.title}>Edit Profile</Text>

          {/* Full Name Input */}
          <View style={styles.inputContainer}>
            <Icon name="user" size={22} color="#555" style={styles.icon} />
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Full Name" />
          </View>

          {/* Username Input */}
          <View style={styles.inputContainer}>
            <Icon name="at-sign" size={22} color="#555" style={styles.icon} />
            <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholder="Username" />
          </View>

          {/* Current Email (Read-only) */}
          <View style={styles.inputContainer}>
            <Icon name="mail" size={22} color="#555" style={styles.icon} />
            <TextInput style={[styles.input, { backgroundColor: "#f0f0f0" }]} value={currentEmail} editable={false} />
          </View>

          {/* New Email Input */}
          <View style={styles.inputContainer}>
            <Icon name="mail" size={22} color="#555" style={styles.icon} />
            <TextInput style={styles.input} value={newEmail} onChangeText={setNewEmail} placeholder="New Email" keyboardType="email-address" />
          </View>

          {/* Confirm New Email */}
          <View style={styles.inputContainer}>
            <Icon name="check" size={22} color="#555" style={styles.icon} />
            <TextInput style={styles.input} value={confirmEmail} onChangeText={setConfirmEmail} placeholder="Confirm New Email" keyboardType="email-address" />
          </View>

          {/* Current Password for Email Change */}
          <View style={styles.inputContainer}>
            <Icon name="lock" size={22} color="#555" style={styles.icon} />
            <TextInput style={styles.input} value={currentPassword} onChangeText={setCurrentPassword} placeholder="Current Password" secureTextEntry />
          </View>

          {/* New Password Input */}
          <View style={styles.inputContainer}>
            <Icon name="key" size={22} color="#555" style={styles.icon} />
            <TextInput style={styles.input} value={newPassword} onChangeText={setNewPassword} placeholder="New Password (Optional)" secureTextEntry />
          </View>

          {/* Save Changes Button */}
          <TouchableOpacity style={styles.button} onPress={handleUpdateProfile} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? "Updating..." : "Save Changes"}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 15,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#FF6B6B",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default EditProfileScreen;