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
import { Picker } from "@react-native-picker/picker";
import DatePicker from "react-native-date-picker";
import MaskInput, { Masks } from "react-native-mask-input";

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
      return Alert.alert("Please fill all the fields");

    if (!tripName.trim()) return Alert.alert("Please fill the trip name field");
    if (!tripDestination.trim())
      return Alert.alert("Please fill the trip destination field");
    if (!tripDate.trim()) return Alert.alert("Please fill the trip date field");
    if (!tripRequirements.trim())
      return Alert.alert("Please fill the trip requirements field");
    if (!tripDescription.trim())
      return Alert.alert("Please fill the trip description field");

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
      Alert.alert(
        "Trip Added",
        "Name: " +
          tripName +
          "\n" +
          "Destination: " +
          tripDestination +
          "\n" +
          "Date: " +
          tripDate +
          "\n" +
          "Requirements: " +
          tripRequirements +
          "\n" +
          "Description: " +
          tripDescription,
        [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
          },
        ]
      );
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
          <MaskInput
            mask={Masks.DATE_DDMMYYYY}
            onChangeText={(text) => handleOnChangeText(text, "tripDate")}
            value={tripDate}
            style={[styles.input, styles.name]}
            placeholder="Enter Trip Date // DD/MM/YYYY"
          />

          <>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Require Risks Assessment
            </Text>
            <Picker
              style={{ height: 160 }}
              selectedValue={tripRequirements}
              onValueChange={(itemValue) => setTripRequirements(itemValue)}
            >
              <Picker.Item label="Choose" value="" />
              <Picker.Item label="Yes" value="Yes" />
              <Picker.Item label="No" value="No" />
            </Picker>
          </>

          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Description</Text>

          <TextInput
            value={tripDescription}
            onChangeText={(text) => handleOnChangeText(text, "tripDescription")}
            style={[styles.input, styles.name]}
            placeholder="Enter Trip Description"
          />
        </View>
        <View>
          <Button style={styles.Button} title="Submit" onPress={handleSubmit} />

          <Button style={styles.Button} title="Cancel" onPress={closeModal} />
        </View>
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
