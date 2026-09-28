import { StyleSheet, Text, View } from "react-native";
import Icon from "./Icon";
import { colors, spacing, type } from "../../theme";

/** "Step 2 of 3" progress for short multi-step flows. */
export default function StepIndicator({ steps, current }: { steps: string[]; current: number }) {
  return (
    <View
      style={styles.row}
      accessible
      accessibilityLabel={`Step ${current + 1} of ${steps.length}: ${steps[current]}`}
    >
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <View key={s} style={styles.step}>
            <View style={[styles.bar, (done || active) && styles.barOn]} />
            <View style={styles.labelRow}>
              {done && <Icon name="checkmark" size={14} color={colors.primary} />}
              <Text style={[styles.label, (done || active) && styles.labelOn]} numberOfLines={1}>
                {s}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: spacing.sm },
  step: { flex: 1, gap: spacing.sm },
  bar: { height: 4, borderRadius: 2, backgroundColor: colors.border },
  barOn: { backgroundColor: colors.primary },
  labelRow: { flexDirection: "row", alignItems: "center", gap: 2 },
  label: { color: colors.inkSubtle, ...type.caption },
  labelOn: { color: colors.ink, fontWeight: "600" },
});
