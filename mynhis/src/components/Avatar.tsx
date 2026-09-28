import { StyleSheet, View } from "react-native";
import T from "./T";
import { color, font } from "../theme";

interface AvatarProps {
  name: string;
  size?: number;
  /** "onBrand" for use on the green header. */
  variant?: "default" | "onBrand";
}

export default function Avatar({ name, size = 44, variant = "default" }: AvatarProps) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
  const onBrand = variant === "onBrand";
  return (
    <View
      accessibilityLabel={`${name}`}
      style={[
        styles.circle,
        { width: size, height: size, borderRadius: size / 2 },
        onBrand ? styles.onBrand : styles.default,
      ]}
    >
      <T
        c={onBrand ? color.onBrand : color.brand}
        style={{ fontFamily: font.semibold, fontSize: size * 0.36, lineHeight: size * 0.46 }}
      >
        {initials}
      </T>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: { alignItems: "center", justifyContent: "center" },
  default: { backgroundColor: color.brandSoft },
  onBrand: { backgroundColor: color.brandRaised, borderWidth: 1, borderColor: "rgba(255,255,255,0.18)" },
});
