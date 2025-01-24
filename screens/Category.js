import { StyleSheet, Text, SafeAreaView ,FlatList} from "react-native";
import React from "react";
const recipes = {
  Breakfast: [
    { id: "1", name: "Pancakes" },
    { id: "2", name: "Omelette" }
  ],
  Lunch: [
    { id: "3", name: "Grilled Cheese" },
    { id: "4", name: "Caesar Salad" },
    { id: "5", name: "Chicken Sandwich" }
  ],
  Dinner: [
    { id: "5", name: "Spaghetti Bolognese" },
    { id: "6", name: "Roast Chicken" }
  ],
  Snacks: [
    { id: "7", name: "Fruit Salad" },
    { id: "8", name: "Chips and Dip" }
  ],
  Desserts: [
    { id: "9", name: "Chocolate Cake" },
    { id: "10", name: "Ice Cream Sundae" }
  ]
};

const Category = ({ route, navigation, location }) => {
  const { Category } = route.params;
  return (
    <SafeAreaView>
      <Text>menu </Text>
      <Text>{Category} menu</Text>
<FlatList
data={recipes[Category]}
keyExtractor={(item)=>item.id}
renderItem={({item})=>(
  <Text>{item.name}</Text>
)}


/>


    </SafeAreaView>
  );
};

export default Category;

const styles = StyleSheet.create({});
