import MemoryCard from "@/components/MemoryCard";
import { theme } from "@/utils/theme";
import React from "react";
import { View } from "react-native";

const Home = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.background,
      }}
    >
      <MemoryCard
        title="Memory from Brooklyn"
        image="https://andrewbarnesphotography.com.au/wp-content/uploads/2019/06/HWK-0038-Memories.jpg"
      />
    </View>
  );
};

export default Home;
