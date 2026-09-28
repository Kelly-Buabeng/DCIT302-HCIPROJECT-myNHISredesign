import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, shadow, spacing, type } from "../../theme";

interface SegmentedControlProps<T extends string> {
  segments: { value: T; label: string }[];
  selected: T;
  onChange: (value: T) => void;
}

/** iOS segmented control: grey track, white sliding segment. 2–5 short options. */
export default function SegmentedControl<T extends string>({ segments, selected, onChange }: SegmentedControlProps<T>) {
  return (
    <View style={styles.track} accessibilityRole="tablist">
      {segments.map((s) => {
        const on = s.value === selected;
        return (
          <Pressable
            key={s.value}
            onPress={() => onChange(s.value)}
            accessibilityRole="tab"
            accessibilityState={{ selected: on }}
            accessibilityLabel={s.label}
            hitSlop={{ top: 6, bottom: 6 }}
            style={[styles.segment, on && styles.on]}
          >
            <Text style={[styles.text, on && styles.textOn]} numberOfLines={1}>
              {s.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: { flexDirection: "row", backgroundColor: colors.fill, borderRadius: 9, padding: 2 },
  segment: { flex: 1, minHeight: 32, borderRadius: 7, alignItems: "center", justifyContent: "center", paddingHorizontal: spacing.xs },
  on: { backgroundColor: colors.surface, ...shadow.segment },
  text: { color: colors.label, ...type.footnote, fontWeight: "500" },
  textOn: { fontWeight: "600" },
});
