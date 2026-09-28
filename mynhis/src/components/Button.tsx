import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import Icon, { IconName } from "./Icon";
import T from "./T";
import { color, radius, space } from "../theme";

type Variant = "primary" | "secondary" | "text";

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: Variant;
  icon?: IconName;
  loading?: boolean;
  disabled?: boolean;
  accessibilityHint?: string;
}

const look: Record<Variant, { bg: string; fg: string; border: string }> = {
  primary: { bg: color.brand, fg: color.onBrand, border: color.brand },
  secondary: { bg: color.surface, fg: color.brand, border: color.line },
  text: { bg: "transparent", fg: color.brand, border: "transparent" },
};

/** Pill buttons. One primary per screen; secondary for the alternative; text for low emphasis. */
export default function Button({ label, onPress, variant = "primary", icon, loading, disabled, accessibilityHint }: ButtonProps) {
  const l = look[variant];
  const off = disabled || loading;
  return (
    <Pressable
      onPress={onPress}
      disabled={off}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: off, busy: loading }}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: l.bg, borderColor: l.border },
        variant === "text" && styles.text,
        pressed && { opacity: 0.85, transform: [{ scale: 0.99 }] },
        disabled && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={l.fg} />
      ) : (
        <View style={styles.row}>
          {icon ? <Icon name={icon} size={18} color={disabled ? color.ink2 : l.fg} /> : null}
          <T v="bodyStrong" c={disabled ? color.ink2 : l.fg}>
            {label}
          </T>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 54,
    borderRadius: radius.pill,
    borderWidth: 1,
    paddingHorizontal: space[6],
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  text: { minHeight: 48, alignSelf: "center" },
  row: { flexDirection: "row", alignItems: "center", gap: space[2] },
  disabled: { backgroundColor: color.line, borderColor: color.line },
});
