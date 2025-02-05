import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator, Modal } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-auth";

import WelcomeScreen from "../screens/WelcomeScreen";
import TabStack from "./TabStack";
import HomeScreen from "../screens/HomeScreen";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import ForgotPassword from "../screens/ForgotPassword";
// import HomeStack from "./HomeStack";
import CategoryScreen from "../screens/CategoryScreen";
import { Provider } from "react-redux";
import { store } from "../constant/store";
import CartScreen from "../screens/CartScreen";
import TransitionScreen from "../screens/TransitionScreen";
import TrackingScreen from "../screens/TrackingScreen";

// Stack Navigation
const Stack = createStackNavigator();

const AppScreens = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); //null during initial load
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#EA2831" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {isAuthenticated ? (
            <>
              <Stack.Screen
                name="WelcomeScreen"
                component={WelcomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="TabStack"
                component={TabStack}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Category"
                component={CategoryScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Cart"
                component={CartScreen}
                options={{ presentation: "card", headerShown: false }}
              />
              <Stack.Screen
                name="transition"
                component={TransitionScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Tracking" component={TrackingScreen} />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  headerTitle: "",
                  headerTransparent: true
                }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{
                  headerTitle: "",
                  headerTransparent: true
                }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default AppScreens;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
    marginTop: 10
  }
});
