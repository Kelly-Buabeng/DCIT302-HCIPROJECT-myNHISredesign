import { StyleSheet, View } from "react-native";
import T from "./T";
import { color } from "../theme";

export type Tone = "success" | "warning" | "danger" | "info" | "neutral";

export const toneColor: Record<Tone, string> = {
  success: color.success,
  warning: color.warning,
  danger: color.danger,
  info: color.info,
  neutral: color.ink2,
};

/** Quiet status: a small dot + the word. Never colour alone, never a big badge. */
export default function StatusText({ label, tone }: { label: string; tone: Tone }) {
  return (
    <View style={styles.row} accessible accessibilityLabel={`Status: ${label}`}>
      <View style={[styles.dot, { backgroundColor: toneColor[tone] }]} />
      <T v="smallStrong" c={toneColor[tone]}>
        {label}
      </T>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 6 },
  dot: { width: 7, height: 7, borderRadius: 4 },
});
