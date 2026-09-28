import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon, { IconName } from "./Icon";
import { colors, radius, shadow, spacing, type } from "../../theme";

interface QuickActionProps {
  label: string;
  icon: IconName;
  onPress: () => void;
  /** Small dot + text to draw attention, e.g. "Due soon". */
  badge?: string;
}

/** Square shortcut tile for the Home grid (2 per row). */
export default function QuickAction({ label, icon, onPress, badge }: QuickActionProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={badge ? `${label}, ${badge}` : label}
      style={({ pressed }) => [styles.tile, pressed && styles.pressed]}
    >
      <View style={styles.iconWrap}>
        <Icon name={icon} size={24} color={colors.primary} />
      </View>
      <Text style={styles.label}>{label}</Text>
      {badge ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    flexBasis: "47%",
    flexGrow: 1,
    minHeight: 112,
    padding: spacing.lg,
    gap: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
  },
  pressed: { backgroundColor: colors.primarySoft, borderColor: colors.primary },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  label: { color: colors.ink, ...type.label, fontSize: 15 },
  badge: {
    position: "absolute",
    top: spacing.md,
    right: spacing.md,
    backgroundColor: colors.warningSoft,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  badgeText: { color: colors.warning, ...type.caption, fontWeight: "600", fontSize: 12 },
});
