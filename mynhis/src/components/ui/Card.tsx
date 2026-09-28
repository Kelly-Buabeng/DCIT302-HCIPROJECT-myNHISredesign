import { ReactNode } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { colors, radius, shadow, spacing } from "../../theme";

interface CardProps {
  children: ReactNode;
  /** "none" lets ListRows run edge to edge inside the card. */
  padding?: "none" | "md";
  style?: StyleProp<ViewStyle>;
}

export default function Card({ children, padding = "md", style }: CardProps) {
  return <View style={[styles.card, padding === "md" && styles.padded, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
    ...shadow.card,
  },
  padded: { padding: spacing.lg },
});
