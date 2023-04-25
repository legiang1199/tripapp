import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import color from "../misc/color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTrip } from "../contexts/TripProvider";
import InputTrip from "../components/InputTrip";

const TripDetail = (props) => {
  const [trip, setTrip] = React.useState(props.route.params.trip);
  const { setTrips } = useTrip();
  const [showModal, setShowModal] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);

  const deleteTrip = async () => {
    const result = await AsyncStorage.getItem("trips");
    let trips = [];
    if (result !== null) trips = JSON.parse(result);

    const newTrips = trips.filter((n) => n.id !== trip.id);
    setTrips(newTrips);
    await AsyncStorage.setItem("trips", JSON.stringify(newTrips));
    props.navigation.goBack();
  };

  const displayDeleteAlert = () => {
    Alert.alert(
      "Delete Trip",
      "Are you sure you want to delete this trip?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: deleteTrip },
      ],
      { cancelable: true }
    );
  };

  const handleUpdate = async (
    tripName,
    tripDestination,
    tripDate,
    tripRequirements,
    tripDescription
  ) => {
    const result = await AsyncStorage.getItem("trips");
    let trips = [];
    if (result !== null) trips = JSON.parse(result);

    const newTrips = trips.filter((n) => {
      if (n.id === trip.id) {
        n.tripName = tripName;
        n.tripDestination = tripDestination;
        n.tripDate = tripDate;
        n.tripRequirements = tripRequirements;
        n.tripDescription = tripDescription;
        setTrip(n);
      }
      return n;
    });
    setTrips(newTrips);
    await AsyncStorage.setItem("trips", JSON.stringify(newTrips));
  };
  const handleOnClose = () => setShowModal(false);

  const openEditModal = () => {
    setShowModal(true);
    setIsEdit(true);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Name</Text>
        <Text style={styles.input}>{trip.tripName}</Text>
        <Text style={styles.title}>Destination</Text>
        <Text style={styles.input}>{trip.tripDestination}</Text>
        <Text style={styles.title}>Date Of Trip</Text>
        <Text style={styles.input}>{trip.tripDate}</Text>
        <Text style={styles.title}>Require Risks Assessment</Text>
        <Text style={styles.input}>{trip.tripRequirements}</Text>
        <Text style={styles.title}>Description</Text>
        <Text style={styles.input}>{trip.tripDescription}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Delete" onPress={displayDeleteAlert} />
        <Button title="Edit" onPress={openEditModal} />
      </View>
      <InputTrip
        visible={showModal}
        onClose={handleOnClose}
        onSubmit={handleUpdate}
        isEdit={isEdit}
        trip={trip}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 10,
    left: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: color.PRIMARY,
  },
  input: {
    fontSize: 18,
    color: color.DARK,
    marginBottom: 10,
  },
});

export default TripDetail;
