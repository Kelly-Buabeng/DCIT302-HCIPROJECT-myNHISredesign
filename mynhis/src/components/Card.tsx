import { ReactNode } from "react";
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { color, radius, space } from "../theme";

interface CardProps {
  children: ReactNode;
  onPress?: () => void;
  accessibilityLabel?: string;
  /** "flush" lets rows run edge to edge. */
  padding?: "normal" | "flush";
  style?: StyleProp<ViewStyle>;
}

/** White surface with a hairline border. No heavy shadows. */
export default function Card({ children, onPress, accessibilityLabel, padding = "normal", style }: CardProps) {
  const s = [styles.card, padding === "normal" && styles.pad, style];
  if (!onPress) return <View style={s}>{children}</View>;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [...s, pressed && { borderColor: color.lineStrong }]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: color.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: color.line,
    overflow: "hidden",
  },
  pad: { padding: space[5] },
});
