import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, spacing, type } from "../../theme";

interface SectionProps {
  title: string;
  /** Optional text link on the right, e.g. "See all". */
  actionLabel?: string;
  onAction?: () => void;
  children: ReactNode;
}

export default function Section({ title, actionLabel, onAction, children }: SectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.head}>
        <Text style={styles.title} accessibilityRole="header">
          {title}
        </Text>
        {actionLabel && onAction && (
          <Pressable onPress={onAction} accessibilityRole="link" hitSlop={12}>
            <Text style={styles.action}>{actionLabel}</Text>
          </Pressable>
        )}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: spacing.md },
  head: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  title: { color: colors.ink, ...type.heading },
  action: { color: colors.primary, ...type.label, paddingVertical: spacing.xs },
});
