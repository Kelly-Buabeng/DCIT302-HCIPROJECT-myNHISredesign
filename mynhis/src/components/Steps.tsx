import { StyleSheet, View } from "react-native";
import T from "./T";
import { color, space } from "../theme";

/** Thin segmented progress for short flows. */
export default function Steps({ total, current, label }: { total: number; current: number; label: string }) {
  return (
    <View style={styles.wrap} accessible accessibilityLabel={`Step ${current + 1} of ${total}: ${label}`}>
      <View style={styles.row}>
        {Array.from({ length: total }).map((_, i) => (
          <View key={i} style={[styles.seg, i <= current && { backgroundColor: color.brand }]} />
        ))}
      </View>
      <T v="small" c={color.ink2}>
        Step {current + 1} of {total} · {label}
      </T>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: space[2] },
  row: { flexDirection: "row", gap: 6 },
  seg: { flex: 1, height: 3, borderRadius: 2, backgroundColor: color.line },
});
