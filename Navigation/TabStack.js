import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import MenuScreen from "../screens/MenuScreen";
import CartScreen from "../screens/CartScreen";
import TrackingScreen from "../screens/TrackingScreen";
import Setting from "../screens/Setting";


const Tab = createBottomTabNavigator();

const TabStack = ({ route }) => {
  const location = route.params?.location || "Default";


  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
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
        tabBarActiveTintColor: "#EA2831",
        tabBarInactiveTintColor: "gray",
        headerShown: false
      })}
    >
       <Tab.Screen
        name="Menu"
        children={({ navigation }) => (
          <MenuScreen
            navigation={navigation}
            location={location} 
          />
        )}
      />
      
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Tracking" component={TrackingScreen} />
      <Tab.Screen name="Settings" component={Setting} />
    </Tab.Navigator>
  );
};

export default TabStack;
