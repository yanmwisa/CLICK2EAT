import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import React from "react";

const MenuScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Text>MenuScreen</Text>
      <Button title="Back" onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({});
