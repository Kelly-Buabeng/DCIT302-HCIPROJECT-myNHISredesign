import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon, { IconName } from "./Icon";
import { colors, radius, spacing, type } from "../../theme";

interface OptionCardProps {
  title: string;
  description?: string;
  /** Right-aligned emphasis, e.g. a price. */
  value?: string;
  icon?: IconName;
  selected: boolean;
  onPress: () => void;
  /** Small tag like "Recommended". */
  tag?: string;
}

/** A large radio choice. Use inside a group where exactly one is selected. */
export default function OptionCard({ title, description, value, icon, selected, onPress, tag }: OptionCardProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected, checked: selected }}
      accessibilityLabel={[title, description, value].filter(Boolean).join(", ")}
      style={({ pressed }) => [
        styles.card,
        selected && styles.selected,
        pressed && !selected && { backgroundColor: colors.canvas },
      ]}
    >
      <View style={[styles.radio, selected && styles.radioOn]}>{selected && <View style={styles.dot} />}</View>
      {icon && <Icon name={icon} size={22} color={selected ? colors.primary : colors.inkMuted} />}
      <View style={styles.text}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{title}</Text>
          {tag ? (
            <View style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ) : null}
        </View>
        {description ? <Text style={styles.description}>{description}</Text> : null}
      </View>
      {value ? <Text style={styles.value}>{value}</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    minHeight: 64,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  selected: { borderColor: colors.primary, borderWidth: 2, backgroundColor: colors.primarySoft },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.borderStrong,
    alignItems: "center",
    justifyContent: "center",
  },
  radioOn: { borderColor: colors.primary },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary },
  text: { flex: 1, gap: 2 },
  titleRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm, flexWrap: "wrap" },
  title: { color: colors.ink, ...type.body, fontWeight: "600" },
  description: { color: colors.inkMuted, ...type.caption },
  value: { color: colors.ink, ...type.label, fontSize: 16 },
  tag: { backgroundColor: colors.gold, borderRadius: radius.pill, paddingHorizontal: spacing.sm, paddingVertical: 2 },
  tagText: { color: colors.onGold, ...type.overline, fontSize: 11 },
});
