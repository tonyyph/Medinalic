import { useIsFocused } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { memoFC, tw } from "@/utils";
// import { commonStore } from "@/store";

export const ScreenLoading = memoFC(() => {
  const isFocused = useIsFocused();
  const isLoading = false;
  //   const isLoading = commonStore((store) => store.isLoading);
  return isLoading && isFocused ? (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={tw`absolute z-50 inset-0 justify-center items-center bg-overlay`}
    >
      <ActivityIndicator size="large" color={"white"} />
    </Animated.View>
  ) : null;
});
