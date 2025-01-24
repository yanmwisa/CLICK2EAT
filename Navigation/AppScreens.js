import { StyleSheet } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import TabStack from "./TabStack";
import HomeScreen from "../screens/HomeScreen";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import ForgotPassword from "../screens/ForgotPassword";
import HomeStack from "./HomeStack";

// stack navigation
const Stack = createStackNavigator();

const AppScreens = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="TabStack" component={TabStack} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerTitle: "" ,headerTransparent:true}} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name ="ForgotPassword" component={ForgotPassword} options={{headerTitle: "",headerTransparent:true}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppScreens;

const styles = StyleSheet.create({});
