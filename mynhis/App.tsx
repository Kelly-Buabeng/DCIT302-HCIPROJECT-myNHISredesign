import React from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
} from "@expo-google-fonts/plus-jakarta-sans";
import { RootStack } from "./src/navigation/types";
import { color } from "./src/theme";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ClaimsScreen from "./src/screens/ClaimsScreen";
import ClaimDetailScreen from "./src/screens/ClaimDetailScreen";
import CoverageScreen from "./src/screens/CoverageScreen";
import AccountScreen from "./src/screens/AccountScreen";
import MembershipScreen from "./src/screens/MembershipScreen";
import RenewScreen from "./src/screens/RenewScreen";
import LinkCardScreen from "./src/screens/LinkCardScreen";
import { LinkDoneScreen, RenewDoneScreen } from "./src/screens/DoneScreen";

const Stack = createNativeStackNavigator<RootStack>();

const navTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, primary: color.brand, background: color.bg, card: color.surface, text: color.ink, border: color.line },
};

export default function App() {
  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: color.brand }}>
        <ActivityIndicator color={color.gold} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} options={{ statusBarStyle: "light" }} />

          {/* Tabs swap in place */}
          <Stack.Group screenOptions={{ animation: "none" }}>
            <Stack.Screen name="Home" component={HomeScreen} options={{ statusBarStyle: "light" }} />
            <Stack.Screen name="Claims" component={ClaimsScreen} />
            <Stack.Screen name="Coverage" component={CoverageScreen} />
            <Stack.Screen name="Account" component={AccountScreen} />
          </Stack.Group>

          {/* Details slide in from the right */}
          <Stack.Group screenOptions={{ animation: "slide_from_right" }}>
            <Stack.Screen name="Membership" component={MembershipScreen} />
            <Stack.Screen name="ClaimDetail" component={ClaimDetailScreen} />
          </Stack.Group>

          {/* Tasks rise from the bottom; confirmations can't be swiped back into */}
          <Stack.Group screenOptions={{ animation: "slide_from_bottom" }}>
            <Stack.Screen name="Renew" component={RenewScreen} />
            <Stack.Screen name="LinkCard" component={LinkCardScreen} />
          </Stack.Group>
          <Stack.Group screenOptions={{ animation: "fade", gestureEnabled: false }}>
            <Stack.Screen name="RenewDone" component={RenewDoneScreen} />
            <Stack.Screen name="LinkDone" component={LinkDoneScreen} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
