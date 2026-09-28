import { Pressable, StyleSheet, Text } from "react-native";
import { colors, radius, spacing, type } from "../../theme";

interface ChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  count?: number;
}

/** Filter chip. Use in a horizontal row; exactly one selected. */
export default function Chip({ label, selected, onPress, count }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityState={{ selected }}
      accessibilityLabel={count !== undefined ? `${label}, ${count}` : label}
      style={[styles.chip, selected ? styles.on : styles.off]}
    >
      <Text style={[styles.text, { color: selected ? colors.onPrimary : colors.ink }]}>
        {label}
        {count !== undefined ? ` · ${count}` : ""}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    minHeight: 40,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    justifyContent: "center",
    borderWidth: 1,
  },
  on: { backgroundColor: colors.primary, borderColor: colors.primary },
  off: { backgroundColor: colors.surface, borderColor: colors.borderStrong },
  text: { ...type.label },
});
