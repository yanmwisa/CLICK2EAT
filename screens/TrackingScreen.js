import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Modal } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useSelector } from "react-redux";

const TrackingScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const orderDetails = useSelector((state) => state.cart.activity[0]) || {};
  console.log("Order Details:", orderDetails);

  const restaurantLocations = [
    {
      latitude: 41.688078051130915,
      longitude: -86.28337824596447,
      title: "2324 Lincoln Way W",
      description: "South Bend, IN 46628, United States"
    },
    {
      latitude: 41.69470063119259,
      longitude: -86.19717713494656,
      title: "3622 Edison Rd Ste 400",
      description: "South Bend, IN 46615, United States"
    },
    {
      latitude: 41.6574403364669,
      longitude: -86.25015911349146,
      title: "1631-1633 S Michigan St",
      description: "South Bend, IN 46613, United States"
    }
  ];

  const handleGetDirections = () => {
    if (
      orderDetails.restaurant &&
      orderDetails.restaurant.latitude &&
      orderDetails.restaurant.longitude
    ) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${orderDetails.restaurant.latitude},${orderDetails.restaurant.longitude}`;
      // You can use Linking API to open Google Maps
      Linking.openURL(url);
    } else {
      console.error("Restaurant location is not available");
    }
  };

  return (
    <View style={styles.container}>
      {/* Map View on Top Half */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 41.6794,
            longitude: -86.2499,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          {/* Loop through the locations and add a marker for each */}
          {restaurantLocations.map((location, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude
              }}
              title={location.title}
              description={location.description}
            />
          ))}
        </MapView>
      </View>

      {/* Bottom Half: Order Details and Button */}
      <View style={styles.detailsContainer}>
        <Text style={styles.header}>Order Details</Text>
        <Text>{`Restaurant: ${
          orderDetails.restaurant ? orderDetails.restaurant.name : "N/A"
        }`}</Text>
        <Text>{`Order Status: ${orderDetails.status || "N/A"}`}</Text>
        <Text>{`Estimated Time of Arrival: ${orderDetails.eta || "N/A"}`}</Text>

        <Button title="Get Directions" onPress={handleGetDirections} />

        {orderDetails.status === "Being Prepared" && (
          <Button title="Cancel Order" onPress={() => setModalVisible(true)} />
        )}

        {/* Modal for Cancel Order Confirmation */}
        <Modal visible={modalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text>Are you sure you want to cancel the order?</Text>
              <Button
                title="Yes"
                onPress={() => {
                  /* cancel order logic */
                }}
              />
              <Button title="No" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  mapContainer: {
    flex: 1, // Take half of the screen for the map
    marginBottom: 20
  },
  map: {
    width: "100%",
    height: "100%"
  },
  detailsContainer: {
    flex: 1, // Take the other half of the screen
    padding: 20,
    backgroundColor: "#f9f9f9"
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center"
  }
});

export default TrackingScreen;
