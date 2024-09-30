import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { memoFC } from "@/utils";
import { useMemoFunc } from "@/hooks";
import { HomeScreen } from "./screens";

const RootStack = createNativeStackNavigator<NavigationStackParamList>();

export const RootNavigation = memoFC(function App({}) {
  const onReady = useMemoFunc(() => {
    console.info("Navigation is ready");
  });

  return (
    <NavigationContainer onReady={onReady}>
      <RootStack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
          headerShown: false
        }}
      >
        <RootStack.Group screenOptions={{ headerShown: false }}>
          <RootStack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ animation: "slide_from_bottom" }}
          />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
});
