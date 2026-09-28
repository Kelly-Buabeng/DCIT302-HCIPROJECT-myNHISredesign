import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon, { IconName } from "./Icon";
import { colors, hairline, radius, spacing, type } from "../../theme";

interface ListRowProps {
  title: string;
  subtitle?: string;
  /** Right-detail text in grey, like iOS Settings values. */
  value?: string;
  /** Settings-style glyph in a coloured rounded square. */
  icon?: IconName;
  iconColor?: string;
  /** Custom element on the right (e.g. a StatusBadge or Switch). */
  trailing?: ReactNode;
  /** Adds a chevron and makes the row tappable. */
  onPress?: () => void;
  /** Red title, no chevron — for Log out, Remove. */
  destructive?: boolean;
  /** Injected by Group. */
  first?: boolean;
  /** Custom left element instead of an icon (e.g. an Avatar). */
  leading?: ReactNode;
}

export default function ListRow({
  title,
  subtitle,
  value,
  icon,
  iconColor = colors.tint,
  trailing,
  onPress,
  destructive,
  first,
  leading,
}: ListRowProps) {
  const body = (
    <>
      {leading ? (
        <View style={styles.leading}>{leading}</View>
      ) : icon ? (
        <View style={[styles.iconSquare, { backgroundColor: iconColor }]}>
          <Icon name={icon} size={18} color="#FFFFFF" />
        </View>
      ) : null}
      <View style={[styles.main, !first && styles.separator]}>
        <View style={styles.text}>
          <Text style={[styles.title, destructive && { color: colors.red }]}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        {value ? (
          <Text style={styles.value} numberOfLines={1}>
            {value}
          </Text>
        ) : null}
        {trailing}
        {onPress && !destructive ? <Icon name="chevron-forward" size={18} color={colors.tertiaryLabel} /> : null}
      </View>
    </>
  );

  const rowStyle = [styles.row];
  if (!onPress) {
    return (
      <View style={rowStyle} accessible accessibilityLabel={[title, subtitle, value].filter(Boolean).join(", ")}>
        {body}
      </View>
    );
  }
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={[title, subtitle, value].filter(Boolean).join(", ")}
      style={({ pressed }) => [...rowStyle, pressed && styles.pressed]}
    >
      {body}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", paddingLeft: spacing.lg, backgroundColor: colors.surface },
  pressed: { backgroundColor: "#D1D1D6" },
  leading: { marginRight: spacing.md, paddingVertical: spacing.sm },
  iconSquare: {
    width: 29,
    height: 29,
    borderRadius: radius.icon,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  main: {
    flex: 1,
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: 11,
    paddingRight: spacing.lg,
  },
  // iOS separators start where the text starts, not at the screen edge.
  separator: { borderTopWidth: hairline, borderTopColor: colors.separator },
  text: { flex: 1, gap: 1 },
  title: { color: colors.label, ...type.body },
  subtitle: { color: colors.secondaryLabel, ...type.subheadline },
  value: { color: colors.secondaryLabel, ...type.body, flexShrink: 1, textAlign: "right" },
});
