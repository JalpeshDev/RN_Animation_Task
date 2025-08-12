import { MotiText, MotiView } from "moti";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import CardStyles from "../styles/CardStyles";

const ScaleCard = ({ title, image }: { title: string; image: string }) => {
  const [toggled, setToggled] = useState(false);

  useEffect(() => {
    setToggled(true);
  }, []);

  return (
    <MotiView
      from={{ scale: 0.3 }}
      animate={{ scale: toggled ? 1 : 1 }}
      transition={{ type: "timing", duration: 1000 }}
      style={[CardStyles.card]}
    >
      <Image source={{ uri: image }} style={CardStyles.image} />
      <MotiText
        animate={{
          scale: toggled ? 1.2 : 1,
          translateY: toggled ? 100 : 0,
        }}
        transition={{ type: "timing", duration: 1000 }}
        style={CardStyles.title}
      >
        {title}
      </MotiText>
    </MotiView>
  );
};

export default ScaleCard;
