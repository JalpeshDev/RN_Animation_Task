import { MotiView } from "moti";
import React, { useState } from "react";
import { Image, StyleSheet, Text } from "react-native";
import {
  GestureHandlerStateChangeEvent,
  PanGestureHandler,
} from "react-native-gesture-handler";
import CardStyles from "../styles/CardStyles";

const GestureCard = ({ title, image }: { title: string; image: string }) => {
  const [dimensions, setDimensions] = useState({ width: 150, height: 150 });

  const handleGesture = (event: GestureHandlerStateChangeEvent) => {
    const { translationY } = event.nativeEvent;

    if ((translationY as number) < 0) {
      // Bottom-to-top gesture
      setDimensions({ width: 300, height: 300 });
    } else {
      // Top-to-bottom gesture
      setDimensions({ width: 150, height: 150 });
    }
  };

  return (
    <PanGestureHandler onEnded={handleGesture}>
      <MotiView
        animate={{ width: dimensions.width, height: dimensions.height }}
        transition={{ type: "timing", duration: 300 }}
        style={[CardStyles.card, styles.card]}
      >
        <Image
          source={{
            uri: image,
          }}
          style={CardStyles.image}
        />
        <Text style={CardStyles.title}>{title}</Text>
      </MotiView>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GestureCard;
