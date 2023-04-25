import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import color from "../misc/color";
import SearchBar from "../components/SearchBar";
import InputTrip from "../components/InputTrip";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Trip from "../components/Trip";
import { useTrip } from "../contexts/TripProvider";
import NotFound from "../components/NotFound";
import { Colors } from "react-native/Libraries/NewAppScreen";

const Home = ({ navigation }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [resultNotFound, setResultNotFound] = React.useState(false);
  const { trips, setTrips, findTrips } = useTrip();

  const handleOnSubmit = async (
    tripName,
    tripDestination,
    tripDate,
    tripRequirements,
    tripDescription
  ) => {
    const trip = {
      id: Math.floor(Math.random() * 10000),
      tripName,
      tripDestination,
      tripDate,
      tripRequirements,
      tripDescription,
    };

    const updatedTrips = [...trips, trip];
    setTrips(updatedTrips);
    await AsyncStorage.setItem("trips", JSON.stringify(updatedTrips));
  };

  const openTripDetail = (trip) => {
    navigation.navigate("TripDetail", { trip });
  };

  const handleOnSearchInput = async (text) => {
    setSearchQuery(text);
    if (!text) {
      setSearchQuery("");
      setResultNotFound(false);
      return await findTrips();
    }
    const filteredNotes = trips.filter((trip) => {
      if (trip.tripName.toLowerCase().includes(text.toLowerCase())) {
        return trip;
      }
      if (trip.tripDestination.toLowerCase().includes(text.toLowerCase())) {
        return trip;
      }
    });

    if (filteredNotes.length) {
      setTrips([...filteredNotes]);
    } else {
      setResultNotFound(true);
    }
  };
  const handleOnClear = async () => {
    setSearchQuery("");
    setResultNotFound(false);
    await findTrips();
  };

  const deleteAllTrip = async () => {
    await AsyncStorage.removeItem("trips");
    setTrips([]);
  };

  const displayDeleteAlert = () => {
    Alert.alert(
      "Delete Trip",
      "Are you sure you want to delete all trip?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: deleteAllTrip },
      ],
      { cancelable: true }
    );
  };

  return (
    <>
      <View style={styles.container}>
        <SearchBar
          value={searchQuery}
          onChangeText={handleOnSearchInput}
          containerStyle={{ marginVertical: 10 }}
          onClear={handleOnClear}
        />
        <View style={[styles.HeadingContainer]}>
          <Text style={styles.Heading}>Add Trip</Text>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.addBtn}
          >
            <Text style={styles.addBtn}>+</Text>
          </TouchableOpacity>
        </View>
        <View>
          {resultNotFound ? (
            <NotFound />
          ) : (
            <>
              <FlatList
                data={trips}
                numColumns={2}
                columnWrapperStyle={{
                  justifyContent: "space-between",
                  marginBottom: 20,
                  marginBottom: 20,
                }}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <Trip onPress={() => openTripDetail(item)} item={item} />
                )}
              />
              {trips.length ? (
                <Icon
                  name="delete"
                  style={{
                    backgroundColor: "red",
                    borderRadius: 50,
                    padding: 10,
                  }}
                  onPress={displayDeleteAlert}
                />
              ) : null}
            </>
          )}
        </View>
      </View>
      <InputTrip
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleOnSubmit}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: "bold",
  },
  container: {
    paddingHorizontal: 20,
  },
  Heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: color.PRIMARY,
  },
  HeadingContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  addBtn: {
    fontSize: 20,
    color: color.PRIMARY,
    position: "absolute",
    right: 15,
  },
  deleteBtn: {
    fontSize: 20,
    position: "absolute",
    right: 50,
  },
});

export default Home;
