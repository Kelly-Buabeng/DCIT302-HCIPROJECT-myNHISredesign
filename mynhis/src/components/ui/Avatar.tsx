import { StyleSheet, Text, View } from "react-native";
import { colors, type } from "../../theme";

/** Initials avatar — works offline and never shows a stranger's photo. */
export default function Avatar({ name, size = 48 }: { name: string; size?: number }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
  return (
    <View
      style={[styles.circle, { width: size, height: size, borderRadius: size / 2 }]}
      accessibilityLabel={`${name} profile picture`}
    >
      <Text style={[styles.text, { fontSize: size * 0.38 }]}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: { backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" },
  text: { color: colors.onPrimary, ...type.label, lineHeight: undefined },
});
