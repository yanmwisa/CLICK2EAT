import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image
} from "react-native";
import { Feather } from "@expo/vector-icons";

const EditProfile = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleEditCard = async () => {
    try {
      const userRef = doc(db, 'users', user.uid); 
      await updateDoc(userRef, {
        name: name,
        surname: surname,
        email: email
      });

      navigation.goBack();
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />

          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />

          <Text style={styles.label}>Phone</Text>
          <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

          <Text style={styles.label}>Delivery Address</Text>
          <TextInput style={styles.input} value={address} onChangeText={setAddress} />

          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f4" },
  header: {
    backgroundColor: "#EA2831",
    paddingVertical: 30,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: "relative"
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
    marginBottom: 10,
    backgroundColor:'grey',
  },
  editIcon: {
    position: "absolute",
    bottom: 10,
    right: "40%",
    backgroundColor: "#000",
    padding: 5,
    borderRadius: 15
  },
  formContainer: {
    justifyContent:'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    padding: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ccc"
  },
  saveButton: {
    backgroundColor: "#EA2831",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  }
});
