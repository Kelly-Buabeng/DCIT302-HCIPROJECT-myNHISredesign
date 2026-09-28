import { Pressable, StyleSheet, View } from "react-native";
import Icon, { IconName } from "./Icon";
import T from "./T";
import { color, radius, space } from "../theme";

interface OptionProps {
  title: string;
  subtitle?: string;
  value?: string;
  icon?: IconName;
  /** Small gold-outlined note, e.g. "Your plan". */
  note?: string;
  selected: boolean;
  onPress: () => void;
}

/** A selectable card for one-of-many choices (plans, payment networks). */
export default function Option({ title, subtitle, value, icon, note, selected, onPress }: OptionProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected, selected }}
      accessibilityLabel={[title, subtitle, value, note].filter(Boolean).join(", ")}
      style={[styles.card, selected && styles.on]}
    >
      {icon ? (
        <View style={styles.icon}>
          <Icon name={icon} size={18} color={color.brand} />
        </View>
      ) : null}
      <View style={styles.text}>
        <View style={styles.titleRow}>
          <T v="bodyStrong">{title}</T>
          {note ? (
            <View style={styles.note}>
              <T v="label" c={color.warning}>
                {note}
              </T>
            </View>
          ) : null}
        </View>
        {subtitle ? (
          <T v="small" c={color.ink2}>
            {subtitle}
          </T>
        ) : null}
      </View>
      {value ? <T v="number">{value}</T> : null}
      <View style={[styles.radio, selected && styles.radioOn]}>{selected ? <View style={styles.radioDot} /> : null}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: space[3],
    minHeight: 68,
    paddingHorizontal: space[4],
    paddingVertical: space[3],
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: color.line,
    backgroundColor: color.surface,
  },
  on: { borderColor: color.brand, borderWidth: 1.5, backgroundColor: color.brandSoft },
  icon: { width: 36, height: 36, borderRadius: 18, backgroundColor: color.surface, borderWidth: 1, borderColor: color.line, alignItems: "center", justifyContent: "center" },
  text: { flex: 1, gap: 2 },
  titleRow: { flexDirection: "row", alignItems: "center", gap: space[2], flexWrap: "wrap" },
  note: { paddingHorizontal: 8, paddingVertical: 1, borderRadius: radius.pill, backgroundColor: color.warningSoft },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 1.5, borderColor: color.lineStrong, alignItems: "center", justifyContent: "center" },
  radioOn: { borderColor: color.brand },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: color.brand },
});
