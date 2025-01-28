import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Fontisto from '@expo/vector-icons/Fontisto';
import { auth,signin } from '../firebase-auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [password, setPassword] = useState(true);
  const [checkbox, setCheckbox] = useState(true);
  const [isLoggingIn,setIsLoggingIn] = useState(false);

  const handlePasswordVisibile = () => {
    setPassword(!password);
  };

  const handleCheckbox = () => {
    setCheckbox(!checkbox);
  };

  const navigation = useNavigation();

  const handleLogin = async () => {
    setIsLoggingIn(true);
    
    if (!email || !passwordValue) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    try{
      const userCredential = await signin(email, passwordValue);
      console.log('User logged in:', userCredential.user);
      console.log('Email:', email, 'Password:', passwordValue);
      navigation.navigate('HomeScreen');
    }
  catch(error) {
    console.log(error.code, error.message);
    Alert.alert('Invalid Credentials', 'Please check your email and password.');
  }finally{
    setIsLoggingIn(false);
  }
  };

  const handleSignUpRedirect = () => {
    navigation.navigate('SignUp');
  };

  

  return (
    <KeyboardAvoidingView
      style={styles.pageContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled">
        <SafeAreaView style={{justifyContent:'center',flex:1,padding:20}}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Welcome Back!</Text>

            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Enter your email"
              style={styles.textInput}
              placeholderTextColor="grey"
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />

            <Text style={styles.label}>Password</Text>
            <View>
              <TextInput
                placeholder="Enter your password"
                style={styles.textInput}
                placeholderTextColor="grey"
                secureTextEntry={password}
                // value={passwordValue}
                onChangeText={(text) => setPasswordValue(text)}
              />

              <TouchableOpacity style={styles.eyeIcon} onPress={handlePasswordVisibile}>
                <Feather name={password ? 'eye' : 'eye-off'} size={20} color="black" />
              </TouchableOpacity>
            </View>

            <View style={styles.Container}>
              <View style={styles.rememberMeContainer}>
                <Text style={styles.footerText}>Remember Me</Text>
                <TouchableOpacity onPress={handleCheckbox}>
                  <Fontisto name={checkbox ? 'checkbox-passive' : 'checkbox-active'} size={18} color="black" />
                </TouchableOpacity>
              </View>

              <Text style={[styles.footerText,{textDecorationLine:'underline'}]} onPress={() => navigation.navigate('ForgotPassword')}>
                Forgot password?
              </Text>
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              {isLoggingIn ? 
                ( <Text style={styles.loginButtonText}>Logging in</Text>):
            ( <Text style={styles.loginButtonText}>Log in</Text>)
             }
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Don't have an account?{' '}
                <Text style={styles.linkText} onPress={handleSignUpRedirect}>
                  Sign Up
                </Text>
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingHorizontal: 20,
    // paddingTop: 40,
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
  loginButton: {
    backgroundColor: '#EA2831',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  Container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  rememberMeContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 5,
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
