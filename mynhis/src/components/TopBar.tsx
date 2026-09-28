import { ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "./Icon";
import T from "./T";
import { color, space, touch } from "../theme";

interface TopBarProps {
  title?: string;
  /** "back" arrow (default) or "close" ×. */
  leading?: "back" | "close" | "none";
  onLeading?: () => void;
  trailing?: ReactNode;
}

/** Header for screens pushed from a tab: round back button + centred title. */
export default function TopBar({ title, leading = "back", onLeading, trailing }: TopBarProps) {
  const navigation = useNavigation();
  const press = onLeading ?? (() => navigation.canGoBack() && navigation.goBack());
  return (
    <View style={styles.bar}>
      <View style={styles.side}>
        {leading !== "none" && (
          <Pressable
            onPress={press}
            accessibilityRole="button"
            accessibilityLabel={leading === "close" ? "Close" : "Go back"}
            style={({ pressed }) => [styles.round, pressed && { backgroundColor: color.brandSoft }]}
          >
            <Icon name={leading === "close" ? "x" : "arrow-left"} size={20} color={color.ink} />
          </Pressable>
        )}
      </View>
      <T v="bodyStrong" center numberOfLines={1} style={styles.title} accessibilityRole="header">
        {title}
      </T>
      <View style={[styles.side, { alignItems: "flex-end" }]}>{trailing}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { height: 60, flexDirection: "row", alignItems: "center", paddingHorizontal: space[4], backgroundColor: color.bg },
  side: { width: touch + 8 },
  title: { flex: 1 },
  round: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: color.line,
    backgroundColor: color.surface,
    alignItems: "center",
    justifyContent: "center",
  },
});
