import { MotiView } from "moti";
import React, { useEffect, useState } from "react";
import { Image, Text } from "react-native";
import CardStyles from "../styles/CardStyles";

const FlipCard = ({ title, image }: { title: string; image: string }) => {
  const [flipped, setFlipped] = useState(false);
  useEffect(() => {
    setFlipped(true);
    setTimeout(() => {
      setFlipped(false);
    }, 500);
  }, []);
  return (
    <MotiView style={CardStyles.container}>
      <MotiView
        animate={{ rotateY: flipped ? "180deg" : "0deg" }}
        transition={{ type: "timing", duration: 300 }}
        style={CardStyles.card}
      >
        <Image
          source={{
            uri: image,
          }}
          style={CardStyles.image}
        />
        <Text style={CardStyles.title}>{title}</Text>
      </MotiView>
    </MotiView>
  );
};

export default FlipCard;
