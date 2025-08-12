import { MotiText, MotiView } from "moti";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import CardStyles from "../styles/CardStyles";

const FadeInCard = ({ title, image }: { title: string; image: string }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <MotiView
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ type: "timing", duration: 1000 }}
      style={CardStyles.card}
    >
      <Image
        source={{
          uri: image,
        }}
        style={CardStyles.image}
      />
      <MotiText
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ type: "timing", duration: 1000, delay: 300 }}
        style={[CardStyles.title]}
      >
        {title}
      </MotiText>
    </MotiView>
  );
};

export default FadeInCard;
