// import "./global.css";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import MembershipScreen from "./src/screens/MembershipScreen";
import ClaimsScreen from "./src/screens/ClaimsScreen";
import RenewScreen from "./src/screens/RenewScreen";
import LinkGhanaCardScreen from "./src/screens/LinkGhanaCardScreen";
import BenefitsScreen from "./src/screens/BenefitsScreen";
import { RootStackParamList } from "./src/types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Membership" component={MembershipScreen} />
        <Stack.Screen name="Claims" component={ClaimsScreen} />
        <Stack.Screen name="Renew" component={RenewScreen} />
        <Stack.Screen name="LinkGhanaCard" component={LinkGhanaCardScreen} />
        <Stack.Screen name="Benefits" component={BenefitsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
