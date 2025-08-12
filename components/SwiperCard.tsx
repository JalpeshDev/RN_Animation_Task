import { FontAwesome } from "@expo/vector-icons";
import { MotiView, useAnimationState } from "moti";
import React, { useCallback } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { DummyUser } from "../constants/data/dummyUsers";
import { theme } from "../utils/theme";

const { width, height } = Dimensions.get("window");
const CARD_WIDTH = width * 0.85;
const CARD_HEIGHT = height * 0.65;
const SWIPE_THRESHOLD = width * 0.25;

interface SwiperCardProps {
  user: DummyUser;
  index: number;
  onSwipe?: (direction: "left" | "right" | "up") => void;
}

const SwiperCard: React.FC<SwiperCardProps> = ({ user, onSwipe }) => {
  const [swipeIcon, setSwipeIcon] = React.useState<
    "heart" | "comment" | "close" | null
  >(null);
  const [tint, setTint] = React.useState<"heart" | "close" | "comment" | null>(
    null
  );
  const [drag, setDrag] = React.useState({ x: 0, y: 0 });
  const [expanded, setExpanded] = React.useState(false);
  const cardAnim = useAnimationState({
    idle: { translateX: 0, translateY: 0, rotateZ: "0deg", opacity: 1 },
    left: { translateX: -width, rotateZ: "-15deg", opacity: 0 },
    right: { translateX: width, rotateZ: "15deg", opacity: 0 },
    up: { translateY: -height, opacity: 0 },
    dragging: {},
  });
  const iconAnim = useAnimationState({
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  });

  const handleGestureEvent = useCallback(
    (event: PanGestureHandlerGestureEvent) => {
      const { translationX, translationY } = event.nativeEvent;
      setDrag({ x: translationX, y: translationY });
      if (Math.abs(translationX) > Math.abs(translationY)) {
        const dir = translationX > 0 ? "close" : "heart";
        setSwipeIcon(dir);
        setTint(dir);
        iconAnim.transitionTo("visible");
      } else if (translationY < 0) {
        setSwipeIcon("comment");
        setTint("comment");
        iconAnim.transitionTo("visible");
      } else {
        setSwipeIcon(null);
        setTint(null);
        iconAnim.transitionTo("hidden");
      }
    },
    [iconAnim]
  );

  const handleGestureEnd = useCallback(
    (event: PanGestureHandlerGestureEvent) => {
      const { translationX, translationY } = event.nativeEvent;
      if (translationX < -SWIPE_THRESHOLD) {
        setTint("heart");
        cardAnim.transitionTo("left");
        iconAnim.transitionTo("hidden");
        setSwipeIcon("heart");
        onSwipe && onSwipe("left");
        setTimeout(() => setTint(null), 350);
        setDrag({ x: 0, y: 0 });
      } else if (translationX > SWIPE_THRESHOLD) {
        setTint("close");
        cardAnim.transitionTo("right");
        iconAnim.transitionTo("hidden");
        setSwipeIcon("close");
        onSwipe && onSwipe("right");
        setTimeout(() => setTint(null), 350);
        setDrag({ x: 0, y: 0 });
      } else if (translationY < -SWIPE_THRESHOLD) {
        setTint("comment");
        cardAnim.transitionTo("up");
        iconAnim.transitionTo("hidden");
        setSwipeIcon("comment");
        onSwipe && onSwipe("up");
        setTimeout(() => setTint(null), 350);
        setDrag({ x: 0, y: 0 });
      } else {
        setDrag({ x: 0, y: 0 });
        setSwipeIcon(null);
        cardAnim.transitionTo("idle");
        iconAnim.transitionTo("hidden");
        setTint(null);
      }
    },
    [cardAnim, iconAnim, onSwipe]
  );

  // Button handlers
  const triggerSwipe = (direction: "left" | "right" | "up") => {
    if (direction === "left") {
      setTint("heart");
      setSwipeIcon("heart");
      cardAnim.transitionTo("left");
      iconAnim.transitionTo("hidden");
      onSwipe && onSwipe("left");
      setTimeout(() => setTint(null), 350);
    } else if (direction === "right") {
      setTint("close");
      setSwipeIcon("close");
      cardAnim.transitionTo("right");
      iconAnim.transitionTo("hidden");
      onSwipe && onSwipe("right");
      setTimeout(() => setTint(null), 350);
    } else if (direction === "up") {
      setTint("comment");
      setSwipeIcon("comment");
      cardAnim.transitionTo("up");
      iconAnim.transitionTo("hidden");
      onSwipe && onSwipe("up");
      setTimeout(() => setTint(null), 350);
    }
  };

  // Calculate tilt and opacity for drag (always animate)
  const tilt = `${drag.x / 18}deg`;
  const dragOpacity = Math.max(0.5, 1 - Math.abs(drag.x) / (width * 0.7));

  // Card content for both collapsed and expanded
  const cardContent = (
    <>
      <MotiView
        animate={{
          height: expanded ? CARD_HEIGHT * 0.7 : CARD_HEIGHT * 0.38,
          width: "100%",
          borderTopLeftRadius: expanded ? 24 : 32,
          borderTopRightRadius: expanded ? 24 : 32,
        }}
        transition={{ type: "timing", duration: 450 }}
        style={{ overflow: "hidden", backgroundColor: theme.card }}
      >
        <Image
          source={user.image}
          style={[styles.image, { alignSelf: "flex-start" }]}
          resizeMode="cover"
        />
        {tint && (
          <MotiView
            style={[
              StyleSheet.absoluteFill,
              styles.tintOverlay,
              tint === "heart" && { backgroundColor: "rgba(231,76,60,0.18)" },
              tint === "close" && { backgroundColor: "rgba(52,152,219,0.18)" },
              tint === "comment" && { backgroundColor: "rgba(39,174,96,0.18)" },
            ]}
            pointerEvents="none"
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "timing", duration: 200 }}
          />
        )}
        {swipeIcon && (
          <MotiView
            state={iconAnim}
            pointerEvents="none"
            style={styles.iconContainer}
            transition={{ type: "timing", duration: 200 }}
          >
            {swipeIcon === "heart" && (
              <FontAwesome name="heart" size={48} color={theme.heart} />
            )}
            {swipeIcon === "close" && (
              <FontAwesome name="close" size={48} color={theme.skip} />
            )}
            {swipeIcon === "comment" && (
              <FontAwesome name="comment" size={48} color={theme.chat} />
            )}
          </MotiView>
        )}
      </MotiView>

      {/* Always-visible name (mini + expanded) */}
      <View style={{ paddingHorizontal: 24, paddingTop: 8 }}>
        <Text
          style={[styles.name, { marginBottom: expanded ? 8 : 0 }]}
          numberOfLines={1}
        >
          {user.name}
        </Text>
      </View>

      <MotiView
        animate={{
          opacity: expanded ? 1 : 0,
          height: expanded ? undefined : 0,
          marginBottom: expanded ? 16 : 0,
        }}
        transition={{ type: "timing", duration: 500 }}
        style={[styles.footer]}
        pointerEvents={expanded ? "auto" : "none"}
      >
        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.heartBtn]}
            onPress={() => triggerSwipe("left")}
          >
            <FontAwesome name="heart" size={28} color={theme.heart} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.chatBtn]}
            onPress={() => triggerSwipe("up")}
          >
            <FontAwesome name="comment" size={28} color={theme.chat} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.skipBtn]}
            onPress={() => triggerSwipe("right")}
          >
            <FontAwesome name="close" size={28} color={theme.skip} />
          </TouchableOpacity>
        </View>
      </MotiView>
    </>
  );

  // The whole card (including gesture and animation)
  return (
    <MotiView
      animate={{
        height: expanded ? CARD_HEIGHT : CARD_HEIGHT * 0.45,
        width: expanded ? CARD_WIDTH : CARD_WIDTH * 0.7,
        borderRadius: expanded ? 24 : 32,
        marginTop: expanded ? 0 : 32,
        marginBottom: expanded ? 0 : 32,
        shadowOpacity: expanded ? 0.2 : 0.12,
        translateX: expanded ? drag.x : 0,
        translateY: expanded ? drag.y : 0,
        rotateZ: expanded ? tilt : "0deg",
        opacity: expanded ? dragOpacity : 1,
      }}
      style={[
        styles.card,
        {
          alignSelf: "center",
          overflow: "hidden",
          justifyContent: expanded ? "flex-end" : "center",
          alignItems: "center",
          position: expanded ? "absolute" : "relative",
        },
      ]}
      transition={{ type: "timing", duration: 500 }}
    >
      {expanded ? (
        <PanGestureHandler
          onGestureEvent={handleGestureEvent}
          onHandlerStateChange={handleGestureEnd}
        >
          <View style={{ width: "100%", height: "100%" }}>{cardContent}</View>
        </PanGestureHandler>
      ) : (
        <TouchableOpacity
          activeOpacity={0.9}
          style={{
            width: "100%",
            alignItems: "center",
            flex: 1,
            justifyContent: "center",
          }}
          onPress={() => setExpanded(true)}
        >
          {cardContent}
        </TouchableOpacity>
      )}
    </MotiView>
  );
};

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    backgroundColor: theme.card,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: theme.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    paddingBottom: 32,
    overflow: "hidden",
  },
  footer: {
    width: "100%",
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: theme.card,
    resizeMode: "cover",
    alignSelf: "baseline",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 12,
    color: theme.text,
  },
  iconContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -24 }, { translateY: -24 }],
    zIndex: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 8,
    marginTop: 16,
  },
  button: {
    backgroundColor: theme.surface,
    borderRadius: 32,
    padding: 18,
    marginHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: theme.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 4,
  },
  heartBtn: {
    borderWidth: 2,
    borderColor: theme.heart,
    backgroundColor: "rgba(231,76,60,0.08)",
  },
  chatBtn: {
    borderWidth: 2,
    borderColor: theme.chat,
    backgroundColor: "rgba(39,174,96,0.08)",
  },
  skipBtn: {
    borderWidth: 2,
    borderColor: theme.skip,
    backgroundColor: "rgba(52,152,219,0.08)",
  },
  tintOverlay: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
});

export default SwiperCard;
