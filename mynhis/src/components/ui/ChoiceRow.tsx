import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon, { IconName } from "./Icon";
import { colors, hairline, radius, spacing, type } from "../../theme";

interface ChoiceRowProps {
  title: string;
  subtitle?: string;
  /** Grey detail on the right, e.g. a price. */
  value?: string;
  icon?: IconName;
  iconColor?: string;
  selected: boolean;
  onPress: () => void;
  /** Injected by Group. */
  first?: boolean;
}

/** An iOS selection row: tap to choose, the chosen row shows a tint checkmark. */
export default function ChoiceRow({ title, subtitle, value, icon, iconColor = colors.tint, selected, onPress, first }: ChoiceRowProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected, selected }}
      accessibilityLabel={[title, subtitle, value].filter(Boolean).join(", ")}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      {icon ? (
        <View style={[styles.iconSquare, { backgroundColor: iconColor }]}>
          <Icon name={icon} size={18} color="#FFFFFF" />
        </View>
      ) : null}
      <View style={[styles.main, !first && styles.separator]}>
        <View style={styles.text}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        {value ? <Text style={styles.value}>{value}</Text> : null}
        <View style={styles.check}>{selected && <Icon name="checkmark" size={22} color={colors.tint} />}</View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", paddingLeft: spacing.lg, backgroundColor: colors.surface },
  pressed: { backgroundColor: "#D1D1D6" },
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
  separator: { borderTopWidth: hairline, borderTopColor: colors.separator },
  text: { flex: 1, gap: 1 },
  title: { color: colors.label, ...type.body },
  subtitle: { color: colors.secondaryLabel, ...type.subheadline },
  value: { color: colors.secondaryLabel, ...type.body },
  check: { width: 24, alignItems: "flex-end" },
});
