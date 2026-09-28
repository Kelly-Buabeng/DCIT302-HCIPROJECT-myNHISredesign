import { StyleSheet, Text, View } from "react-native";
import Icon, { IconName } from "./Icon";
import { colors, radius, spacing, type } from "../../theme";

export type Status = "success" | "warning" | "danger" | "info" | "neutral";

const map: Record<Status, { fg: string; bg: string; icon: IconName }> = {
  success: { fg: colors.success, bg: colors.successSoft, icon: "checkmark-circle" },
  warning: { fg: colors.warning, bg: colors.warningSoft, icon: "time" },
  danger: { fg: colors.danger, bg: colors.dangerSoft, icon: "alert-circle" },
  info: { fg: colors.info, bg: colors.infoSoft, icon: "sync" },
  neutral: { fg: colors.inkMuted, bg: colors.canvas, icon: "ellipse-outline" },
};

/** A status is never colour alone: icon + word, always. */
export default function StatusBadge({ label, status }: { label: string; status: Status }) {
  const s = map[status];
  return (
    <View style={[styles.badge, { backgroundColor: s.bg }]} accessible accessibilityLabel={`Status: ${label}`}>
      <Icon name={s.icon} size={14} color={s.fg} />
      <Text style={[styles.text, { color: s.fg }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: spacing.xs,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
  },
  text: { ...type.caption, fontWeight: "600" },
});
