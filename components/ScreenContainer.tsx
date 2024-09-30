import { LinearGradient } from "expo-linear-gradient";
import { Style } from "twrnc";
import { PropsWithChildren } from "react";
import { View } from "react-native";
import { memoFC, tw } from "@/utils";
import { ScreenLoading } from "./ScreenLoading";

export const ScreenContainer = memoFC(
  ({ style, children }: PropsWithChildren<{ style?: Style }>) => {
    return (
      <LinearGradient
        colors={["#D3E7F1", "#F3EFED"]}
        style={tw.style(`bg-white flex-1`)}
        start={[0, 1]}
        end={[1, 1]}
      >
        <View style={tw.style("flex-1", style)}>
          <ScreenLoading />
          {children}
        </View>
      </LinearGradient>
    );
  }
);
