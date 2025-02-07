import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Modal,
  TouchableWithoutFeedback, Keyboard,
} from "react-native";
import { db } from "../firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { auth } from "../firebase-auth";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";


const EditProfile = ({ navigation }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [saveButton, setSaveButton] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.error("No user logged in");
          return;
        }

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setName(userData.name || "");
          setSurname(userData.surname || "");
          setEmail(userData.email || "");
        } else {
          console.log("No such user found!");
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleSaveChanges = () => {
    const user = auth.currentUser;
    if (!user) {
      console.error("No user logged in");
      return;
    }
    if (email !== user.email) {
      setModalVisible(true);
    } else {
      handleEditCard();
    }
  };

  const handleEditCard = async () => {
    setSaveButton(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error("No user logged in");
        return;
      }
  
      const userRef = doc(db, "users", user.uid); // Ensure we update the current user
  
      // Fetch current user document
      const userSnap = await getDoc(userRef);
  
      if (!userSnap.exists()) {
        console.error("User document not found!");
        Alert.alert("Error", "User profile not found.");
        return;
      }
  
      // Only update the fields that changed
      const updatedData = {};
      if (name) updatedData.name = name;
      if (surname) updatedData.surname = surname;
      if (email) updatedData.email = email;
  
      await updateDoc(userRef, updatedData);
  
      Alert.alert("Success", "Profile updated successfully", [
        { text: "OK", onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert("Error updating profile", error.message);
      console.error("Error updating document: ", error);
    }
    setSaveButton(false);
  };
  
  const handleReauthenticate = async () => {
    setVerifying(true);
    try {
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
      
      setPassword(""); 
      setTimeout(() => {
        setVerifying(false); 
        setModalVisible(false);
        handleEditCard();
      }, 5000); // Give the animation time to play
    } catch (error) {
      setVerifying(false);
      Alert.alert("Authentication Failed", "Please check your password and try again.");
      console.error("Error re-authenticating: ", error);
    }
  };
  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#EA2831" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center" }}> 
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.formContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />

            <Text style={styles.label}>Surname</Text>
            <TextInput style={styles.input} value={surname} onChangeText={setSurname} />

            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />

            <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
              {saveButton ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.saveButtonText}>Save Changes</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <Modal visible={modalVisible} transparent animationType="slide">
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                {verifying ? (
                  <LottieView source={require("../assets/tick.json")} autoPlay loop={false} style={styles.lottie} />
                ) : (
                  <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Re-authenticate</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter Current Password"
                      secureTextEntry
                      value={password}
                      onChangeText={setPassword}
                    />
                    <TouchableOpacity style={styles.nextButton} onPress={handleReauthenticate}>
                      <Text style={styles.nextButtonText}>Next</Text>
                      <Ionicons name="arrow-forward" size={20} color="#fff" />
                    </TouchableOpacity>
                  </View>
                )}
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff"},
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
    marginTop: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    width: "100%",
  },
  saveButton: {
    backgroundColor: "#EA2831",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  nextButton: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    width: "100%",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
  lottie: { 
    width: '80%', 
    height: 200,
    backgroundColor:'#fff',
    borderRadius:10,
    alignItems:'center'
  },
})