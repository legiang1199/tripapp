import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import color from "../misc/color";
import { AntDesign } from "@expo/vector-icons";

const SearchBar = ({ containerStyle, value, onChangeText, onClear }) => {
  return (
    <View style={[styles.container, { ...containerStyle }]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.searchBar}
        placeholder="Search Here ..."
      />
      {value ? (
        <AntDesign name="close" size={24} color="black" onPress={onClear} style={styles.clearIcon} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    borderWidth: 0.5,
    borderColor: color.PRIMARY,
    height: 40,
    borderRadius: 40,
    paddingLeft: 15,
    fontSize: 20,
  },
  clearIcon: {
    position: "absolute",
    right: 10,
  },
  container: {
    justifyContent: "center",
  },
});

export default SearchBar;
