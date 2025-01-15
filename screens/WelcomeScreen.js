import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>WelcomeScreen</Text>
      <Button
        title="Restaurant 1 – Main Street"
        onPress={() => navigation.navigate("TabStack")}
        color="#FF6347"
      />
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});
