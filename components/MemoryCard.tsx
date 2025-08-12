import { useReducedMotionDuration } from "@/hooks/useReducedMotionDuration";
import { ANIMATION } from "@/styles/animation";
import styles from "@/styles/MemoryCard.styles";
import { BlurView } from "expo-blur";
import { AnimatePresence, MotiView } from "moti";
import React, { memo, useCallback, useEffect, useState } from "react";
import {
  AccessibilityProps,
  AccessibilityRole,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";

export interface MemoryCardProps extends AccessibilityProps {
  title: string;
  image?: string;
  collapsedHeight?: number;
  expandedHeight?: number;
  onToggle?: (expanded: boolean) => void;
  accessibilityRole?: AccessibilityRole;
  accessibilityLabel?: string;
}

const MemoryCard: React.FC<MemoryCardProps> = memo(
  ({
    title,
    image,
    collapsedHeight = 80,
    expandedHeight = 260,
    onToggle,
    accessibilityRole = "button",
    accessibilityLabel,
    ...rest
  }) => {
    const [expanded, setExpanded] = useState(false);
    const duration = useReducedMotionDuration(ANIMATION.duration);

    // Preload image to avoid first-time lag
    useEffect(() => {
      if (image) Image.prefetch(image).catch(() => {});
    }, [image]);

    const handleToggle = useCallback(() => {
      setExpanded((prev) => {
        const next = !prev;
        onToggle?.(next);
        return next;
      });
    }, [onToggle]);

    return (
      <Pressable
        accessibilityRole={accessibilityRole}
        accessibilityLabel={accessibilityLabel || title}
        onPress={handleToggle}
        style={{ width: "100%" }}
        {...rest}
      >
        {/* Card height animation */}
        <MotiView
          animate={{ height: expanded ? expandedHeight : collapsedHeight }}
          transition={{ type: "timing", duration }}
          style={styles.container}
        >
          <View style={styles.imageWrapper}>
            {image && (
              <>
                <Image
                  source={{ uri: image }}
                  style={styles.image}
                  resizeMode="cover"
                />
                {/* Blur overlay fades out on expand */}
                <MotiView
                  animate={{ opacity: expanded ? 0 : 1 }}
                  transition={{ type: "timing", duration }}
                  style={styles.blurOverlay}
                >
                  <BlurView
                    intensity={60}
                    tint="light"
                    style={styles.blurFill}
                  />
                </MotiView>
              </>
            )}

            <AnimatePresence>
              <MotiView
                key={expanded ? "expandedTitle" : "collapsedTitle"}
                from={{
                  scale: expanded ? 1.25 : 1,
                  translateY: 0,
                }}
                animate={{
                  scale: expanded ? 1.25 : 1,
                  translateY: expanded ? -18 : 0,
                }}
                transition={{
                  type: "timing",
                  duration,
                  delay: expanded ? duration * 0.6 : 0,
                }}
                style={styles.titleOverlay}
              >
                <Text
                  style={styles.titleInImage}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {title}
                </Text>
              </MotiView>
            </AnimatePresence>
          </View>
        </MotiView>
      </Pressable>
    );
  }
);

export default MemoryCard;
