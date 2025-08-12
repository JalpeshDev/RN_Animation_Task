import { MotiView } from "moti";
import React, { useEffect, useState } from "react";
import { Image, Text } from "react-native";
import CardStyles from "../styles/CardStyles";

const RotateCard = ({ title, image }: { title: string; image: string }) => {
  const [animationState, setAnimationState] = useState({
    scale: 0,
    rotate: "0deg",
    translateX: 300,
    translateY: 300,
  });

  useEffect(() => {
    setAnimationState({
      scale: 1,
      rotate: "360deg",
      translateX: 0,
      translateY: 0,
    });
  }, []);

  return (
    <MotiView
      animate={{
        scale: animationState.scale,
        rotate: animationState.rotate,
        translateX: animationState.translateX,
        translateY: animationState.translateY,
      }}
      transition={{ type: "timing", duration: 1000 }}
      style={[
        CardStyles.card,
        { alignItems: "center", justifyContent: "center" },
      ]}
    >
      <Image
        source={{
          uri: image,
        }}
        style={[
          CardStyles.image,
          { width: "100%", height: "100%", borderRadius: 8 },
        ]}
      />
      <Text
        style={[
          CardStyles.title,
          { position: "absolute", textAlign: "center" },
        ]}
      >
        {title}
      </Text>
    </MotiView>
  );
};

export default RotateCard;
