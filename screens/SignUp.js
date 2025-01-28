import React, { useState } from 'react';
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
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useNavigation } from '@react-navigation/native';
import { signup } from '../firebase-auth';
import { db } from '../firebase-config';
import { setDoc, doc } from "firebase/firestore";



export default function SignUp() {

  const navigation = useNavigation();
  const [password, setPassword] = useState(true);
  const [repeatPassword, setRepeatPassword] = useState(true);
  const [checkbox, setCheckbox] = useState(false);

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [repeatPasswordValue, setRepeatPasswordValue] = useState('');

  const [loading, setLoading] = useState(false);


  const handlePasswordVisible = () => setPassword(!password);
  const handleRepeatPasswordVisible = () => setRepeatPassword(!repeatPassword);
  const handleCheckbox = () => setCheckbox(!checkbox);

  const handleSignUp = async () => {
    setLoading(true);

    if (!checkbox) {
      alert('Please accept the Terms and Conditions.');
      return;
    }
    if (passwordValue !== repeatPasswordValue) {
      alert("Passwords do not match. Please try again.");
      return;
    }
    try {
      const userCredential = await signup(email, passwordValue);
      const user = userCredential.user;
  
      await setDoc(doc(db, 'users', user.uid), {
        
        name: name,
        surname: surname,
        email: email,
      });
      navigation.navigate('Login');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('This email is already registered.');
      } else {
        alert('Error signing up: ' + error.message);
      }      
    }finally{
      setLoading(false);
    }
};

  return (
    <SafeAreaView style={styles.pageContainer}>
      <KeyboardAvoidingView
        // style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Create an Account</Text>

            <Text style={styles.label}>Name</Text>
            <TextInput
              placeholder="Enter your name"
              style={styles.textInput}
              placeholderTextColor="grey"
              value={name}
              onChangeText={(text) => setName(text)}
            />

            <Text style={styles.label}>Surname</Text>
            <TextInput
              placeholder="Enter your surname"
              style={styles.textInput}
              placeholderTextColor="grey"
              value={surname}
              onChangeText={(text) => setSurname(text)}
            />            
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Enter your email"
              style={styles.textInput}
              placeholderTextColor="grey"
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => {
                console.log('Email input:', text); 
                setEmail(text); 
              }}
            />
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Enter password"
                style={styles.textInput}
                placeholderTextColor="grey"
                secureTextEntry={password}
                value={passwordValue}
                onChangeText={(text) => setPasswordValue(text)}
              />
              <TouchableOpacity style={styles.eyeIcon} onPress={handlePasswordVisible}>
                <Feather name={password ? 'eye' : 'eye-off'} size={20} color="black" />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Repeat Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Repeat your password"
                style={styles.textInput}
                placeholderTextColor="grey"
                secureTextEntry={repeatPassword}
                value={repeatPasswordValue}
                onChangeText={(text) => setRepeatPasswordValue(text)}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={handleRepeatPasswordVisible}
              >
                <Feather name={repeatPassword ? 'eye' : 'eye-off'} size={20} color="black" />
              </TouchableOpacity>
            </View>

            <View style={styles.termsContainer}>
              <TouchableOpacity onPress={handleCheckbox}>
                <Fontisto
                  name={checkbox ? 'checkbox-active' : 'checkbox-passive'}
                  size={18}
                  color="black"
                />
              </TouchableOpacity>
              <Text style={{fontSize:12}}>
                Read and Accept the <Text style={styles.termsText}>Terms and Conditions</Text>
              </Text>
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSignUp}>
            {loading ? 
            ( <Text style={styles.submitButtonText}>Signing up</Text> ) :
            ( <Text style={styles.submitButtonText}>Sign Up</Text>)
            }
            </TouchableOpacity>

            

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Already have an account?{' '}
                <Text
                  style={styles.linkText}
                  onPress={() => navigation.navigate('Login')}
                >
                  Log In
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,

  },
  scrollContent: {
    // flexGrow: 1,
   
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    marginVertical:35,
    marginHorizontal:8,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#EA2831',
    marginBottom: 20,
    textAlign: 'center',
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
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 15,
  },
  passwordContainer: {
    position: 'relative',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
    gap: 5,
  },
  termsText: {
    fontSize: 12,
    color: '#555',
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  },
  submitButton: {
    backgroundColor: '#EA2831',
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
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#555',
  },
  linkText: {
    color: '#EA2831',
    fontWeight: 'bold',
  },
});
