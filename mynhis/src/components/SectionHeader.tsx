import { Pressable, StyleSheet, View } from "react-native";
import T from "./T";
import { color } from "../theme";

interface SectionHeaderProps {
  title: string;
  action?: string;
  onAction?: () => void;
}

export default function SectionHeader({ title, action, onAction }: SectionHeaderProps) {
  return (
    <View style={styles.row}>
      <T v="heading" accessibilityRole="header">
        {title}
      </T>
      {action && onAction ? (
        <Pressable onPress={onAction} accessibilityRole="button" hitSlop={12}>
          <T v="smallStrong" c={color.brand} style={styles.link}>
            {action}
          </T>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: -4 },
  link: { textDecorationLine: "underline" },
});
