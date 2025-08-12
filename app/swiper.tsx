import SwiperCard from "@/components/SwiperCard";
import { DummyUser, dummyUsers } from "@/constants/data/dummyUsers";
import { MotiView, SafeAreaView } from "moti";
import React, { useCallback, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const SwiperScreen: React.FC = () => {
  const [cardStack, setCardStack] = useState<DummyUser[]>(dummyUsers);

  const handleSwipe = useCallback((direction: "left" | "right" | "up") => {
    setCardStack((prev) => prev.slice(1));
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {cardStack.slice(0, 2).map((user, idx) => {
        const isTop = idx === 0;
        const offsetY = 0;
        const scale = idx === 1 ? 0.94 : 1;
        const opacity = idx === 1 ? 0.82 : 1;
        return (
          <MotiView
            key={user.id}
            from={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity, scale }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "timing", duration: 350 }}
            style={{
              position: "absolute",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              zIndex: cardStack.length - idx,
            }}
          >
            <SwiperCard
              user={user}
              index={idx}
              onSwipe={isTop ? handleSwipe : undefined}
            />
          </MotiView>
        );
      })}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#181A20",
    width,
    height,
    position: "relative",
  },
});

export default SwiperScreen;
