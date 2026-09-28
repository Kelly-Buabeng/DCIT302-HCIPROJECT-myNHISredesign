import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme";

/** Contacts-style initials avatar. */
export default function Avatar({ name, size = 40 }: { name: string; size?: number }) {
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
      <Text style={[styles.text, { fontSize: size * 0.4 }]}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: { backgroundColor: colors.gray, alignItems: "center", justifyContent: "center" },
  text: { color: "#FFFFFF", fontWeight: "600" },
});
