import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, spacing, type } from "../../theme";

interface SectionProps {
  title: string;
  /** Tint text link on the right, e.g. "See All". */
  actionLabel?: string;
  onAction?: () => void;
  children: ReactNode;
}

/** A bold section title (Title 3), like the Health and App Store apps. */
export default function Section({ title, actionLabel, onAction, children }: SectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.head}>
        <Text style={styles.title} accessibilityRole="header">
          {title}
        </Text>
        {actionLabel && onAction && (
          <Pressable onPress={onAction} accessibilityRole="button" hitSlop={12} style={({ pressed }) => pressed && { opacity: 0.4 }}>
            <Text style={styles.action}>{actionLabel}</Text>
          </Pressable>
        )}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: spacing.sm + 2 },
  head: { flexDirection: "row", alignItems: "baseline", justifyContent: "space-between", paddingHorizontal: 2 },
  title: { color: colors.label, ...type.title3, fontWeight: "700" },
  action: { color: colors.tint, ...type.body },
});
