import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList,Modal,SafeAreaView,TouchableWithoutFeedback } from "react-native";
import { useSelector } from "react-redux";


const ActivityScreen = () => {
  const [activeTab, setActiveTab] = useState("Current");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const currentOrders = useSelector((state) => state.cart.activity); 
  const previousOrders = useSelector((state) => state.cart.previousOrders); 



  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Current" ? styles.activeTab : styles.inactiveTab]}
          onPress={() => setActiveTab("Current")}
        >
          <Text style={[styles.tabText, activeTab === "Current" ? styles.activeTabText : styles.inactiveTabText]}>
            Current Orders
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Previous" ? styles.activeTab : styles.inactiveTab]}
          onPress={() => setActiveTab("Previous")}
        >
          <Text style={[styles.tabText, activeTab === "Previous" ? styles.activeTabText : styles.inactiveTabText]}>
            Previous Orders
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={activeTab === "Current" ? currentOrders : activeTab === "Previous" ? previousOrders:[] } 
        keyExtractor={(item, index) => `${item.name}-${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {
            setSelectedOrder(item);
            setModalVisible(true)
            }}> 
          <View style={styles.orderCard}>
            <Text style={styles.orderName}>{item.name}</Text>
            <Text style={styles.orderStatus}>{item.status}</Text>
          </View>
          </TouchableOpacity>
        )}
      />
    </View>

    
        <Modal visible= {modalVisible} transparent animationType="slide">
        <TouchableWithoutFeedback onPress ={() => setModalVisible(false)}>
          
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                {selectedOrder && (
                  <>
                    <Text style={styles.orderName}>Order Details</Text>

                    <Text style={styles.orderName}>Order Name:{selectedOrder.name}</Text>
                    <Text style={styles.orderStatus}>Status:{selectedOrder.status}</Text>
                    <Text style={styles.orderTime}>Order Time: {selectedOrder.time}</Text>
                  </>          
                )}
              </View>
            </View>
            </TouchableWithoutFeedback>
        </Modal>

    </SafeAreaView>
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
    color: "#EA2831",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
});
