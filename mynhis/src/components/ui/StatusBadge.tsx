import { StyleSheet, Text, View } from "react-native";
import Icon, { IconName } from "./Icon";
import { colors, radius, spacing, type } from "../../theme";

export type Status = "success" | "warning" | "danger" | "info" | "neutral";

const map: Record<Status, { fg: string; bg: string; icon: IconName }> = {
  success: { fg: colors.green, bg: colors.greenSoft, icon: "checkmark-circle" },
  warning: { fg: colors.orange, bg: colors.orangeSoft, icon: "time" },
  danger: { fg: colors.red, bg: colors.redSoft, icon: "close-circle" },
  info: { fg: colors.blue, bg: colors.blueSoft, icon: "ellipsis-horizontal-circle" },
  neutral: { fg: colors.secondaryLabel, bg: colors.fill, icon: "ellipse-outline" },
};

/** Status capsule: always an icon and a word, never colour alone. */
export default function StatusBadge({ label, status }: { label: string; status: Status }) {
  const s = map[status];
  return (
    <View style={[styles.badge, { backgroundColor: s.bg }]} accessible accessibilityLabel={`Status: ${label}`}>
      <Icon name={s.icon} size={13} color={s.fg} />
      <Text style={[styles.text, { color: s.fg }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 3,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  text: { ...type.footnote, fontWeight: "600" },
});
