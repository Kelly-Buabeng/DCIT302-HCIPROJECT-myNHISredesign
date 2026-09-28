import { ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Icon, { IconName } from "./Icon";
import T from "./T";
import { color, space } from "../theme";

interface RowProps {
  label: string;
  value?: string;
  icon?: IconName;
  trailing?: ReactNode;
  onPress?: () => void;
  danger?: boolean;
  divider?: boolean;
}

/** A plain label/value line inside a Card. Icons are thin, single colour. */
export default function Row({ label, value, icon, trailing, onPress, danger, divider }: RowProps) {
  const fg = danger ? color.danger : color.ink;
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? "button" : undefined}
      accessibilityLabel={value ? `${label}, ${value}` : label}
      style={({ pressed }) => [styles.row, divider && styles.divider, pressed && { backgroundColor: color.bg }]}
    >
      {icon ? <Icon name={icon} size={18} color={danger ? color.danger : color.ink2} /> : null}
      <T v="body" c={fg} style={styles.label}>
        {label}
      </T>
      {value ? (
        <T v="bodyStrong" style={styles.value} numberOfLines={1}>
          {value}
        </T>
      ) : null}
      {trailing}
      {onPress && !danger ? <Icon name="chevron-right" size={18} color={color.ink2} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { minHeight: 56, flexDirection: "row", alignItems: "center", gap: space[3], paddingHorizontal: space[5] },
  divider: { borderTopWidth: 1, borderTopColor: color.line },
  label: { flex: 1 },
  value: { flexShrink: 1, textAlign: "right" },
});
