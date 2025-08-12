import { StyleSheet } from "react-native";
import { theme } from "../utils/theme";

const CardStyles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 10,
    alignItems: "center",
  },
  card: {
    width: 300,
    height: 300,
    backgroundColor: theme.card,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    borderRadius: 10,
  },
  title: {
    color: theme.text,
    fontSize: 24,
    fontWeight: "bold",
    shadowColor: theme.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    textAlign: "center",
  },
});

export default CardStyles;
