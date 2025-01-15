import React from 'react'
import { StyleSheet } from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";


const Stack = createStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={MenuScreen}
        screenOptions={{ headerShown: false }}
      />
      {/* <Stack.Screen name="Menu" component={MenuScreen} /> */}
    </Stack.Navigator>
  );
};

export default HomeStack

const styles = StyleSheet.create({})