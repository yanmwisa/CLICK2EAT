import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import MenuScreen from "../screens/MenuScreen";
import CartScreen from "../screens/CartScreen";
import TrackingScreen from "../screens/TrackingScreen";
import Setting from "../screens/Setting";

const Tab = createBottomTabNavigator();

const TabStack = ({ route }) => {
  // Get the selected location from the route params or set a default location
  const location = route.params?.location || "Default";

  return (
    <Tab.Navigator
      // Screen options for the bottom tab navigator
      screenOptions={({ route }) => ({
        // Set the tab bar icon based on the route name
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Menu") {
            iconName = focused ? "menu" : "menu-outline";
          } else if (route.name === "Cart") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "Tracking") {
            iconName = focused ? "locate" : "locate-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#EA2831", // Active tab color
        tabBarInactiveTintColor: "gray", // Inactive tab color
        headerShown: false // Hide the header for all screens
      })}
    >
      {/* Menu Tab */}
      <Tab.Screen
        name="Menu"
        children={({ navigation }) => (
          <MenuScreen navigation={navigation} location={location} />
        )}
      />

      {/* Cart Tab */}
      <Tab.Screen name="Cart" component={CartScreen} />

      {/* Tracking Tab */}
      <Tab.Screen name="Tracking" component={TrackingScreen} />

      {/* Settings Tab */}
      <Tab.Screen name="Settings" component={Setting} />
    </Tab.Navigator>
  );
};

export default TabStack;
