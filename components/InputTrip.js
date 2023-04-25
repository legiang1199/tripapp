import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Alert,
  Button,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import color from "../misc/color";

const InputTrip = ({ visible, onClose, onSubmit, trip, isEdit }) => {
  const [tripName, setTripName] = React.useState("");
  const [tripDestination, setTripDestination] = React.useState("");
  const [tripDate, setTripDate] = React.useState("");
  const [tripRequirements, setTripRequirements] = React.useState("");
  const [tripDescription, setTripDescription] = React.useState("");

  const handleModalClose = () => {
    Keyboard.dismiss();
    console.log("Modal Closed");
  };

  React.useEffect(() => {
    if (isEdit) {
      setTripName(trip.tripName);
      setTripDestination(trip.tripDestination);
      setTripDate(trip.tripDate);
      setTripRequirements(trip.tripRequirements);
      setTripDescription(trip.tripDescription);
    }
  }, [isEdit, trip]);

  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === "tripName") {
      setTripName(text);
    }
    if (valueFor === "tripDestination") {
      setTripDestination(text);
    }
    if (valueFor === "tripDate") {
      setTripDate(text);
    }
    if (valueFor === "tripRequirements") {
      setTripRequirements(text);
    }
    if (valueFor === "tripDescription") {
      setTripDescription(text);
    }
  };
  const handleSubmit = () => {
    if (
      !tripName.trim() &&
      !tripDestination.trim() &&
      !tripDate.trim() &&
      !tripRequirements.trim() &&
      !tripDescription.trim()
    ) 
      return onClose();

    if (isEdit) {
      onSubmit(
        tripName,
        tripDestination,
        tripDate,
        tripRequirements,
        tripDescription
      );
    } else {
      onSubmit(
        tripName,
        tripDestination,
        tripDate,
        tripRequirements,
        tripDescription
      );
      setTripName("");
      setTripDestination("");
      setTripDate("");
      setTripRequirements("");
      setTripDescription("");
    }
    onClose();
  };

  const closeModal = () => {
    if (!isEdit) {
      setTripName("");
      setTripDestination("");
      setTripDate("");
      setTripRequirements("");
      setTripDescription("");
    }
    onClose();
  };

  // const validateForm = () => {
  //   if (
  //     !tripName.trim() &&
  //     !tripDestination.trim() &&
  //     !tripDate.trim() &&
  //     !tripRequirements.trim() &&
  //     !tripDescription.trim()
  //   ) {
  //     Alert.alert("Please fill in all fields");
  //     return false;
  //   }
  //   return true;
  // };

  // const displayAddForm = (tripName,tripDestination,tripDate) => {
  //   if (validateForm()){
  //     alert("Name:" + {tripName} + "Destination:" + {tripDestination} + "Date:" + {tripDate} + "Requirements:" + {tripRequirements} + "Description:" + {tripDescription});
  //     [
  //       {
  //         text: "Cancel",
  //         onPress: () => console.log("Cancel Pressed"),
  //         style: "cancel",
  //       },
  //       { text: "OK", onPress: handleSubmit },
  //     ],
  //     { cancelable: true };
  //   }
  // };
  return (
    <>
      <StatusBar hidden />
      <Modal visible={visible} animationType="fade">
        <View style={styles.container}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Name</Text>
          <TextInput
            value={tripName}
            onChangeText={(text) => handleOnChangeText(text, "tripName")}
            style={[styles.input, styles.name]}
            placeholder="Enter Trip Name"
          />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Destination</Text>
          <TextInput
            value={tripDestination}
            onChangeText={(text) => handleOnChangeText(text, "tripDestination")}
            style={[styles.input, styles.name]}
            placeholder="Enter Trip Destination"
          />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Date Of Trip</Text>

          <TextInput
            value={tripDate}
            onChangeText={(text) => handleOnChangeText(text, "tripDate")}
            style={[styles.input, styles.name]}
            placeholder="Enter Trip Date"
          />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Requirements</Text>

          <TextInput
            value={tripRequirements}
            onChangeText={(text) =>
              handleOnChangeText(text, "tripRequirements")
            }
            style={[styles.input, styles.name]}
            placeholder="Enter Trip Requirements"
          />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Description</Text>

          <TextInput
            value={tripDescription}
            onChangeText={(text) => handleOnChangeText(text, "tripDescription")}
            style={[styles.input, styles.name]}
            placeholder="Enter Trip Description"
          />
        </View>
        <View>
          <Button
            style={styles.Button}
            title="Add Trip"
            onPress={handleSubmit}
          />
          {tripName.trim() ||
          tripDestination.trim() ||
          tripDate.trim() ||
          tripRequirements.trim() ||
          tripDescription.trim() ? (
            <Button style={styles.Button} title="Cancel" onPress={closeModal} />
          ) : null}
        </View>
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: color.PRIMARY,
    fontSize: 20,
    color: color.DARK,
  },
  name: {
    height: 40,
    marginBottom: 15,
  },
  description: {
    height: 80,
  },

  modalBG: {
    backgroundColor: color.MODAL_BG,
    flex: 1,
    zIndex: -1,
  },
  Button: {
    backgroundColor: color.PRIMARY,
    color: color.WHITE,
    fontSize: 20,
    padding: 10,
    borderRadius: 5,
    margin: 10,
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
  },
});

export default InputTrip;
