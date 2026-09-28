import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import Icon, { IconName } from "./Icon";
import { colors, radius, spacing, touchTarget, type } from "../../theme";

type Variant = "filled" | "tinted" | "plain" | "destructive";

interface ButtonProps {
  label: string;
  onPress: () => void;
  /** iOS button styles: filled (main action), tinted, plain (text only), destructive. */
  variant?: Variant;
  icon?: IconName;
  disabled?: boolean;
  loading?: boolean;
  /** "large" = 50pt full-width; "small" = compact capsule. */
  size?: "large" | "small";
  accessibilityHint?: string;
}

const palette: Record<Variant, { bg: string; fg: string }> = {
  filled: { bg: colors.tint, fg: colors.onTint },
  tinted: { bg: colors.tintSoft, fg: colors.tint },
  plain: { bg: "transparent", fg: colors.tint },
  destructive: { bg: colors.redSoft, fg: colors.red },
};

export default function Button({
  label,
  onPress,
  variant = "filled",
  icon,
  disabled = false,
  loading = false,
  size = "large",
  accessibilityHint,
}: ButtonProps) {
  const p = palette[variant];
  const inactive = disabled || loading;
  const small = size === "small";
  return (
    <Pressable
      onPress={onPress}
      disabled={inactive}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: inactive, busy: loading }}
      style={({ pressed }) => [
        small ? styles.small : styles.large,
        { backgroundColor: disabled ? colors.fill : p.bg },
        pressed && styles.pressed,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={p.fg} />
      ) : (
        <View style={styles.row}>
          {icon && <Icon name={icon} size={small ? 16 : 20} color={disabled ? colors.secondaryLabel : p.fg} />}
          <Text
            style={[
              small ? styles.smallText : styles.largeText,
              { color: disabled ? colors.secondaryLabel : p.fg },
            ]}
          >
            {label}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  large: {
    minHeight: 50,
    alignSelf: "stretch",
    borderRadius: radius.button,
    paddingHorizontal: spacing.xl,
    alignItems: "center",
    justifyContent: "center",
  },
  small: {
    minHeight: 30,
    minWidth: touchTarget,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    alignItems: "center",
    justifyContent: "center",
  },
  row: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  largeText: { ...type.headline },
  smallText: { ...type.subheadline, fontWeight: "600" },
  pressed: { opacity: 0.6 },
});
