import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import Icon, { IconName } from "./Icon";
import { colors, radius, spacing, touchTarget, type } from "../../theme";

type Variant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: Variant;
  icon?: IconName;
  disabled?: boolean;
  loading?: boolean;
  /** Stretch to the container width (default true). */
  block?: boolean;
  accessibilityHint?: string;
}

const palette: Record<Variant, { bg: string; bgPressed: string; fg: string; border: string }> = {
  primary: { bg: colors.primary, bgPressed: colors.primaryPressed, fg: colors.onPrimary, border: colors.primary },
  secondary: { bg: colors.surface, bgPressed: colors.primarySoft, fg: colors.primary, border: colors.primary },
  ghost: { bg: "transparent", bgPressed: colors.primarySoft, fg: colors.primary, border: "transparent" },
  danger: { bg: colors.surface, bgPressed: colors.dangerSoft, fg: colors.danger, border: colors.danger },
};

export default function Button({
  label,
  onPress,
  variant = "primary",
  icon,
  disabled = false,
  loading = false,
  block = true,
  accessibilityHint,
}: ButtonProps) {
  const p = palette[variant];
  const inactive = disabled || loading;
  return (
    <Pressable
      onPress={onPress}
      disabled={inactive}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: inactive, busy: loading }}
      style={({ pressed }) => [
        styles.base,
        block && styles.block,
        { backgroundColor: pressed ? p.bgPressed : p.bg, borderColor: p.border },
        disabled && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={p.fg} />
      ) : (
        <View style={styles.row}>
          {icon && <Icon name={icon} size={20} color={disabled ? colors.inkMuted : p.fg} />}
          <Text style={[styles.label, { color: disabled ? colors.inkMuted : p.fg }]}>{label}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    minWidth: touchTarget,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.md,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  block: { alignSelf: "stretch" },
  row: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  label: { ...type.label, fontSize: 16 },
  disabled: { backgroundColor: colors.disabled, borderColor: colors.disabled },
});
