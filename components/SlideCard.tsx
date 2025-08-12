import { MotiText, MotiView } from "moti";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import CardStyles from "../styles/CardStyles";

const SlideCard = ({ title, image }: { title: string; image: string }) => {
  const [position, setPosition] = useState("outside");

  useEffect(() => {
    setPosition("center");
  }, []);

  const getTranslateX = () => {
    switch (position) {
      case "outside":
        return -300;
      case "center":
      default:
        return 0;
    }
  };

  return (
    <MotiView
      animate={{ translateX: getTranslateX() }}
      transition={{ type: "spring", damping: 10, stiffness: 100 }}
      style={CardStyles.card}
    >
      <Image
        source={{
          uri: image,
        }}
        style={CardStyles.image}
      />
      <MotiText
        animate={{ translateX: getTranslateX() / 2 }}
        transition={{ type: "spring", damping: 10, stiffness: 100 }}
        style={CardStyles.title}
      >
        {title}
      </MotiText>
    </MotiView>
  );
};

export default SlideCard;
