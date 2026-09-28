import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon, { IconName } from "./Icon";
import { colors, radius, spacing, type } from "../../theme";

type Tone = "info" | "warning" | "success" | "danger";

const tones: Record<Tone, { fg: string; icon: IconName }> = {
  info: { fg: colors.blue, icon: "information-circle" },
  warning: { fg: colors.orange, icon: "warning" },
  success: { fg: colors.green, icon: "checkmark-circle" },
  danger: { fg: colors.red, icon: "alert-circle" },
};

interface BannerProps {
  tone?: Tone;
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

/** A tip-style card (like iOS TipKit): white card, coloured glyph, optional text action. */
export default function Banner({ tone = "info", title, message, actionLabel, onAction }: BannerProps) {
  const t = tones[tone];
  return (
    <View style={styles.card} accessibilityRole="alert">
      <Icon name={t.icon} size={28} color={t.fg} />
      <View style={styles.text}>
        <Text style={styles.title}>{title}</Text>
        {message ? <Text style={styles.message}>{message}</Text> : null}
        {actionLabel && onAction ? (
          <Pressable onPress={onAction} accessibilityRole="button" hitSlop={10} style={({ pressed }) => [styles.action, pressed && { opacity: 0.4 }]}>
            <Text style={styles.actionText}>{actionLabel}</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.control,
    backgroundColor: colors.surface,
  },
  text: { flex: 1, gap: 2 },
  title: { color: colors.label, ...type.headline },
  message: { color: colors.secondaryLabel, ...type.subheadline },
  action: { marginTop: spacing.sm, minHeight: 28, justifyContent: "center", alignSelf: "flex-start" },
  actionText: { color: colors.tint, ...type.body },
});
