import { StyleSheet } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import TabStack from "./TabStack";








// stack navigation
const Stack = createStackNavigator();


const AppScreens = () => {
  return <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} screenOption={{headerShown: false }}/>
      <Stack.Screen name="TabStack" component={TabStack} />
    </Stack.Navigator>
  </NavigationContainer>
};

export default AppScreens;

const styles = StyleSheet.create({});
