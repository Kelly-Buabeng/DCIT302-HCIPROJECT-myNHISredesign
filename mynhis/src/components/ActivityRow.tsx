import { Pressable, StyleSheet, View } from "react-native";
import Icon, { IconName } from "./Icon";
import StatusText, { Tone } from "./StatusText";
import T from "./T";
import { color, space } from "../theme";

interface ActivityRowProps {
  icon: IconName;
  title: string;
  subtitle: string;
  amount?: string;
  status?: { label: string; tone: Tone };
  onPress?: () => void;
  /** Draw a divider above (all rows but the first in a Card). */
  divider?: boolean;
}

/** Transaction-style row: icon circle, what + when, amount + status on the right. */
export default function ActivityRow({ icon, title, subtitle, amount, status, onPress, divider }: ActivityRowProps) {
  const label = [title, subtitle, amount, status && `status ${status.label}`].filter(Boolean).join(", ");
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? "button" : undefined}
      accessibilityLabel={label}
      style={({ pressed }) => [styles.row, pressed && { backgroundColor: color.bg }]}
    >
      <View style={styles.icon}>
        <Icon name={icon} size={18} color={color.brand} />
      </View>
      <View style={[styles.main, divider && styles.divider]}>
        <View style={styles.text}>
          <T v="bodyStrong" numberOfLines={2}>
            {title}
          </T>
          <T v="small" c={color.ink2} numberOfLines={1}>
            {subtitle}
          </T>
        </View>
        <View style={styles.right}>
          {amount ? <T v="number">{amount}</T> : null}
          {status ? <StatusText {...status} /> : null}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", paddingLeft: space[4], gap: space[3] },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: color.brandSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  main: { flex: 1, flexDirection: "row", alignItems: "center", gap: space[3], paddingVertical: 14, paddingRight: space[4] },
  divider: { borderTopWidth: 1, borderTopColor: color.line },
  text: { flex: 1, gap: 2 },
  right: { alignItems: "flex-end", gap: 2 },
});
