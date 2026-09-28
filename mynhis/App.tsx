import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import MembershipScreen from "./src/screens/MembershipScreen";
import ClaimsScreen from "./src/screens/ClaimsScreen";
import RenewScreen from "./src/screens/RenewScreen";
import LinkGhanaCardScreen from "./src/screens/LinkGhanaCardScreen";
import BenefitsScreen from "./src/screens/BenefitsScreen";
import RenewalConfirmationScreen from "./src/screens/RenewalConfirmationScreen";
import GhanaCardLinkedScreen from "./src/screens/GhanaCardLinkedScreen";
import { RootStackParamList } from "./src/types/navigation";
import { colors } from "./src/theme";

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, primary: colors.tint, background: colors.background, card: colors.surface, text: colors.label, border: colors.separator },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />

          {/* The five tabs swap in place, like a real tab bar */}
          <Stack.Group screenOptions={{ animation: "none" }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Membership" component={MembershipScreen} />
            <Stack.Screen name="Claims" component={ClaimsScreen} />
            <Stack.Screen name="Benefits" component={BenefitsScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </Stack.Group>

          {/* Tasks open as iOS sheets (slide up, "Cancel" to dismiss) */}
          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen name="Renew" component={RenewScreen} />
            <Stack.Screen name="LinkGhanaCard" component={LinkGhanaCardScreen} />
          </Stack.Group>

          {/* Receipts: no swipe-down back into a finished payment; "Done" closes */}
          <Stack.Group screenOptions={{ presentation: "modal", animation: "fade", gestureEnabled: false }}>
            <Stack.Screen name="RenewalConfirmation" component={RenewalConfirmationScreen} />
            <Stack.Screen name="GhanaCardLinked" component={GhanaCardLinkedScreen} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
