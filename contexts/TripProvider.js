import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TripContext = React.createContext();
const TripProvider = ({ children }) => {
  const [trips, setTrips] = React.useState([]);
  const findTrips = async () => {
    const result = await AsyncStorage.getItem("trips");
    console.log("🚀 ~ file: Home.js:22 ~ findTrips ~ result:", result);
    if (result !== null) setTrips(JSON.parse(result));
  };

    useEffect(() => {
    findTrips();
    }, []);
  return (
    <TripContext.Provider value={{ trips, setTrips, findTrips }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => React.useContext(TripContext);

export default TripProvider;
