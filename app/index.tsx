import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import animationCards from "../constants/data/animationCards";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#181A20",
    paddingTop: 64,
    paddingHorizontal: 16,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
    width: "100%",
  },
  navButton: {
    padding: 8,
  },
  navButtonDisabled: {
    opacity: 0.3,
  },
  label: {
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 18,
    color: "#F2F6FF",
    letterSpacing: 0.5,
    flex: 1,
    textAlign: "center",
  },
  instructions: {
    marginBottom: 24,
    color: "#B0B8C1",
    fontSize: 16,
    textAlign: "center",
    maxWidth: 340,
    fontWeight: "500",
    letterSpacing: 0.1,
  },
  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 32,
  },
});

const Home = () => {
  const [index, setIndex] = useState(0);
  const { Component, title, image, label, instruction } = animationCards[index];

  return (
    <View style={styles.container}>
      {/* Header with navigation */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setIndex((i) => Math.max(i - 1, 0))}
          disabled={index === 0}
          style={[styles.navButton, index === 0 && styles.navButtonDisabled]}
        >
          <Ionicons name="chevron-back" size={32} color="#7FB3FF" />
        </TouchableOpacity>
        <Text style={styles.label} numberOfLines={1}>
          {label}
        </Text>
        <TouchableOpacity
          onPress={() =>
            setIndex((i) => Math.min(i + 1, animationCards.length - 1))
          }
          disabled={index === animationCards.length - 1}
          style={[
            styles.navButton,
            index === animationCards.length - 1 && styles.navButtonDisabled,
          ]}
        >
          <Ionicons name="chevron-forward" size={32} color="#7FB3FF" />
        </TouchableOpacity>
      </View>

      {/* Instructions */}
      <Text style={styles.instructions}>{instruction}</Text>

      {/* Animated Card Container */}
      <View style={styles.cardContainer}>
        <Component title={title} image={image} />
      </View>
    </View>
  );
};

export default Home;
