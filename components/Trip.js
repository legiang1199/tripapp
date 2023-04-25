import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import color from "../misc/color";
const Trip = ({ item, onPress }) => {
  const {
    tripName,
    tripDestination,
    tripDate,
    tripRequirements,
    tripDescription,
  } = item;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.name} numberOfLines={2}>{tripName}</Text>
      <Text numberOfLines={3}>{tripDestination}</Text>
      <Text numberOfLines={4}>{tripDate}</Text>
      <Text numberOfLines={5}>Requirements: {tripRequirements}</Text>
    </TouchableOpacity>
  );
};

const width = Dimensions.get("window").width - 40;

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.PRIMARY,
    width: width / 2 - 10,
    padding: 10,
    borderRadius: 5,
  },
  name: {
    color: color.LIGHT,
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default Trip;
