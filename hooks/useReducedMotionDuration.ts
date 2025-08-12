import { useEffect, useState } from "react";
import { AccessibilityInfo } from "react-native";

/**
 * Returns a duration that is 0 or very short if reduce motion is enabled.
 * @param defaultDuration The default animation duration in ms
 */
export function useReducedMotionDuration(defaultDuration: number) {
  const [duration, setDuration] = useState(defaultDuration);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      setDuration(enabled ? 50 : defaultDuration);
    });
  }, [defaultDuration]);

  return duration;
}
