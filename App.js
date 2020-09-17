import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Screen from "./app/components/Screen";

import OnBoarding from "./app/screens/OnBoarding/OnBoarding";

const Stack = createStackNavigator();
const NavigationStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="OnBoarding" component={OnBoarding} />
  </Stack.Navigator>
);
export default function App() {
  return (
    <Screen>
      <NavigationContainer>
        <NavigationStack />
      </NavigationContainer>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
