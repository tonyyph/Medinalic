import "react-native-gesture-handler";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from "@react-navigation/native";
import React from "react";
import { StatusBar, Text, useColorScheme } from "react-native";
import { RootNavigation } from "./RootNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const App = () => {
  const colorScheme = useColorScheme();
  return (
    <GestureHandlerRootView>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <RootNavigation />
        {/* <Loading /> */}
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default App;
