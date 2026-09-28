import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon, { IconName } from "./Icon";
import { colors, radius, spacing, type } from "../../theme";

type Tone = "info" | "warning" | "success" | "danger";

const tones: Record<Tone, { fg: string; bg: string; icon: IconName }> = {
  info: { fg: colors.info, bg: colors.infoSoft, icon: "information-circle" },
  warning: { fg: colors.warning, bg: colors.warningSoft, icon: "warning" },
  success: { fg: colors.success, bg: colors.successSoft, icon: "checkmark-circle" },
  danger: { fg: colors.danger, bg: colors.dangerSoft, icon: "alert-circle" },
};

interface BannerProps {
  tone?: Tone;
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function Banner({ tone = "info", title, message, actionLabel, onAction }: BannerProps) {
  const t = tones[tone];
  return (
    <View style={[styles.banner, { backgroundColor: t.bg }]} accessibilityRole="alert">
      <Icon name={t.icon} size={22} color={t.fg} />
      <View style={styles.text}>
        <Text style={[styles.title, { color: t.fg }]}>{title}</Text>
        {message ? <Text style={styles.message}>{message}</Text> : null}
        {actionLabel && onAction ? (
          <Pressable onPress={onAction} accessibilityRole="button" hitSlop={8} style={styles.action}>
            <Text style={[styles.actionText, { color: t.fg }]}>{actionLabel}</Text>
            <Icon name="arrow-forward" size={16} color={t.fg} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: { flexDirection: "row", gap: spacing.md, padding: spacing.lg, borderRadius: radius.lg },
  text: { flex: 1, gap: spacing.xs },
  title: { ...type.label, fontSize: 15 },
  message: { color: colors.ink, ...type.caption },
  action: { flexDirection: "row", alignItems: "center", gap: spacing.xs, marginTop: spacing.xs, minHeight: 32 },
  actionText: { ...type.label },
});
