import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import TripProvider from "./contexts/TripProvider";
import Home from "./screens/Home";
import TripDetail from "./components/TripDetail";

const Stack = createStackNavigator();

const RenderHomeScreen = (props) => <Home {...props} />;

export default function App() {
  return (
    <NavigationContainer>
      <TripProvider>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={RenderHomeScreen} />
          <Stack.Screen name="TripDetail" component={TripDetail} />
        </Stack.Navigator>
      </TripProvider>
    </NavigationContainer>
  );
}
