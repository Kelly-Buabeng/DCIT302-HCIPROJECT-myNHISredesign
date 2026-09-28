import { Pressable, ScrollView, StyleSheet } from "react-native";
import T from "./T";
import { color, radius, space } from "../theme";

interface PillsProps<V extends string> {
  options: { value: V; label: string }[];
  value: V;
  onChange: (v: V) => void;
}

/** Thin filter pills in a horizontal row. The selected one fills with brand. */
export default function Pills<V extends string>({ options, value, onChange }: PillsProps<V>) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row} accessibilityRole="tablist">
      {options.map((o) => {
        const on = o.value === value;
        return (
          <Pressable
            key={o.value}
            onPress={() => onChange(o.value)}
            accessibilityRole="tab"
            accessibilityState={{ selected: on }}
            style={[styles.pill, on ? styles.on : styles.off]}
          >
            <T v="smallStrong" c={on ? color.onBrand : color.ink}>
              {o.label}
            </T>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { gap: space[2] },
  pill: { minHeight: 40, paddingHorizontal: space[4], borderRadius: radius.pill, justifyContent: "center", borderWidth: 1 },
  on: { backgroundColor: color.brand, borderColor: color.brand },
  off: { backgroundColor: color.surface, borderColor: color.line },
});
