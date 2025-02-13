import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-auth";
import { Provider } from "react-redux";
import { store } from "../constant/store";

// Screens
import EditScreen from "../screens/EditScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import TabStack from "./TabStack";
import HomeScreen from "../screens/HomeScreen";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import ForgotPassword from "../screens/ForgotPassword";
import CategoryScreen from "../screens/CategoryScreen";
import CartScreen from "../screens/CartScreen";
import TransitionScreen from "../screens/TransitionScreen";
import TrackingScreen from "../screens/TrackingScreen";

// Stack Navigation
const Stack = createStackNavigator();

const AppScreens = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // `null` means loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("✅ User is authenticated:", user.email);
        setIsAuthenticated(true);
      } else {
        console.log("❌ User is NOT authenticated");
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Show loading screen while checking auth state
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
            // **Authenticated Users**
            <>
              <Stack.Screen
                name="HomeScreen"
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
                name="Transition"
                component={TransitionScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Tracking" component={TrackingScreen} />
              <Stack.Screen
                name="EditProfile"
                component={EditScreen}
                options={{ title: " ", headerShown: true }}
              />
            </>
          ) : (
            // **Unauthenticated Users**
            <>
              <Stack.Screen
                name="WelcomeScreen"
                component={WelcomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  headerTitle: "",
                  headerTransparent: true,
                  headerShown: false
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

// **Styles**
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
