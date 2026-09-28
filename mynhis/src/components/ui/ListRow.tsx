import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon, { IconName } from "./Icon";
import { colors, radius, spacing, type } from "../../theme";

interface ListRowProps {
  title: string;
  subtitle?: string;
  icon?: IconName;
  /** Tints the icon tile — use "danger" only for destructive rows like Log out. */
  tone?: "default" | "danger";
  /** Text or element on the right (e.g. a StatusBadge). */
  trailing?: ReactNode;
  onPress?: () => void;
  /** Draw a divider above this row (all rows but the first in a Card). */
  divider?: boolean;
}

export default function ListRow({ title, subtitle, icon, tone = "default", trailing, onPress, divider }: ListRowProps) {
  const fg = tone === "danger" ? colors.danger : colors.primary;
  const bg = tone === "danger" ? colors.dangerSoft : colors.primarySoft;
  const content = (
    <>
      {icon && (
        <View style={[styles.tile, { backgroundColor: bg }]}>
          <Icon name={icon} size={20} color={fg} />
        </View>
      )}
      <View style={styles.text}>
        <Text style={[styles.title, tone === "danger" && { color: colors.danger }]}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {typeof trailing === "string" ? <Text style={styles.value}>{trailing}</Text> : trailing}
      {onPress && <Icon name="chevron-forward" size={20} color={colors.inkSubtle} />}
    </>
  );

  const rowStyle = [styles.row, divider && styles.divider];
  if (!onPress) {
    return (
      <View style={rowStyle} accessible accessibilityLabel={[title, subtitle, typeof trailing === "string" ? trailing : ""].filter(Boolean).join(", ")}>
        {content}
      </View>
    );
  }
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={subtitle ? `${title}, ${subtitle}` : title}
      style={({ pressed }) => [...rowStyle, pressed && styles.pressed]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 60,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
  },
  divider: { borderTopWidth: 1, borderTopColor: colors.border },
  pressed: { backgroundColor: colors.primarySoft },
  tile: { width: 40, height: 40, borderRadius: radius.md, alignItems: "center", justifyContent: "center" },
  text: { flex: 1, gap: 2 },
  title: { color: colors.ink, ...type.body, fontWeight: "600" },
  subtitle: { color: colors.inkMuted, ...type.caption },
  value: { color: colors.ink, ...type.body, textAlign: "right", flexShrink: 1 },
});
