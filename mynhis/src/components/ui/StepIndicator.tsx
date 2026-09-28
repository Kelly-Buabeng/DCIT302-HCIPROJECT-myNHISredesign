import { StyleSheet, Text, View } from "react-native";
import { colors, spacing, type } from "../../theme";

/** "Step 2 of 3 · Payment" with a thin iOS progress bar. */
export default function StepIndicator({ steps, current }: { steps: string[]; current: number }) {
  const progress = (current + 1) / steps.length;
  return (
    <View style={styles.wrap} accessible accessibilityLabel={`Step ${current + 1} of ${steps.length}: ${steps[current]}`}>
      <Text style={styles.text}>
        STEP {current + 1} OF {steps.length} · {steps[current].toUpperCase()}
      </Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${progress * 100}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: spacing.sm, paddingHorizontal: 2 },
  text: { color: colors.secondaryLabel, ...type.footnote, fontWeight: "600" },
  track: { height: 4, borderRadius: 2, backgroundColor: colors.fill, overflow: "hidden" },
  fill: { height: 4, borderRadius: 2, backgroundColor: colors.tint },
});
