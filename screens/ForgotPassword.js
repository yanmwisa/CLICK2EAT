import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function ForgotPassword() {

  const handleRecoverPassword = () => {
    //handle password recovery logic here
    console.log('Recover Password button pressed');
  };

  return (
    <KeyboardAvoidingView
          style={{backgroundColor:"#fff",flex:1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            
    <SafeAreaView style={styles.pageContainer}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Recover Your Password</Text>

        <Text style={styles.instructions} numberOfLines={2}>
          Enter your email address below to receive instructions on how to reset your password.
        </Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Enter your email"
          style={styles.textInput}
          placeholderTextColor="grey"
          keyboardType="email-address"
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleRecoverPassword}>
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
    backgroundColor: '#fff', 
    paddingHorizontal: 20,
    // justifyContent:'center',

  },
  formContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    marginTop: 120,

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333', 
    marginBottom: 20,
    textAlign: 'left',
  },
  instructions: {
    fontSize: 14,
    color: '#555',
    textAlign: 'left',
    marginBottom: 20,
    lineHeight: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: '#333',
  },
  textInput: {
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EA2831',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 14,
    color: '#000',
  },
  submitButton: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
