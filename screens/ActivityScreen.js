import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";

const ActivityScreen = () => {
  const [activeTab, setActiveTab] = useState("Current");

  const currentOrders = [
    { id: "1", name: "Pizza Margherita", status: "Preparing" },
    { id: "2", name: "Sushi Combo", status: "On the way" },
  ];

  const previousOrders = [
    { id: "3", name: "Burger Meal", status: "Delivered" },
    { id: "4", name: "Pasta Carbonara", status: "Delivered" },
  ];

  const renderOrder = ({ item }) => (
    <View style={styles.orderCard}>
      <Text style={styles.orderName}>{item.name}</Text>
      <Text style={styles.orderStatus}>{item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Current" ? styles.activeTab : styles.inactiveTab]}
          onPress={() => setActiveTab("Current")}
        >
          <Text style={[styles.tabText, activeTab === "Current" ? styles.activeTabText : styles.inactiveTabText]}>Current Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Previous" ? styles.activeTab : styles.inactiveTab]}
          onPress={() => setActiveTab("Previous")}
        >
          <Text style={[styles.tabText, activeTab === "Previous" ? styles.activeTabText : styles.inactiveTabText]}>Previous Orders</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={activeTab === "Current" ? currentOrders : previousOrders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrder}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default ActivityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 15,
    marginTop:'15%',
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 5,
  },
  activeTab: {
    backgroundColor: "#EA2831",
  },
  inactiveTab: {
    backgroundColor: "#D3D3D3",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  activeTabText: {
    color: "#fff",
  },
  inactiveTabText: {
    color: "#333",
  },
  listContainer: {
    padding: 20,
  },
  orderCard: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  orderName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  orderStatus: {
    fontSize: 14,
    color: "#555",
  },
});
