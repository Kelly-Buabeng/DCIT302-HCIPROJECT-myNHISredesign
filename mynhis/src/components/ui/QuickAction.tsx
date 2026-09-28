import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon, { IconName } from "./Icon";
import { colors, radius, spacing, type } from "../../theme";

interface QuickActionProps {
  label: string;
  icon: IconName;
  /** Colour of the round glyph background (a system colour). */
  color?: string;
  onPress: () => void;
  /** Short note that draws attention, e.g. "Due". */
  badge?: string;
}

/** Shortcut tile for the Home grid (2 per row), in the style of Shortcuts/Health tiles. */
export default function QuickAction({ label, icon, color = colors.tint, onPress, badge }: QuickActionProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={badge ? `${label}, ${badge}` : label}
      style={({ pressed }) => [styles.tile, pressed && styles.pressed]}
    >
      <View style={styles.top}>
        <View style={[styles.glyph, { backgroundColor: color }]}>
          <Icon name={icon} size={20} color="#FFFFFF" />
        </View>
        {badge ? <Text style={styles.badge}>{badge}</Text> : null}
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    flexBasis: "47%",
    flexGrow: 1,
    minHeight: 96,
    padding: spacing.md + 2,
    justifyContent: "space-between",
    gap: spacing.md,
    borderRadius: radius.button,
    backgroundColor: colors.surface,
  },
  pressed: { backgroundColor: "#E5E5EA" },
  top: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  glyph: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center" },
  badge: { color: colors.orange, ...type.footnote, fontWeight: "600" },
  label: { color: colors.label, ...type.headline },
});
