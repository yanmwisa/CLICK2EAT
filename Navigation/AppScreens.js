import { StyleSheet } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import TabStack from "./TabStack";
import HomeScreen from "../screens/HomeScreen";
import HomeStack from "./HomeStack";
import CategoryScreen from "../screens/CategoryScreen";
import { Provider } from "react-redux";
import { store } from "../constant/store";

// stack navigation
const Stack = createStackNavigator();

const AppScreens = () => {
  return (
    <Provider store={store}>
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
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default AppScreens;

const styles = StyleSheet.create({});
