import { Pressable, StyleSheet, View } from "react-native";
import Icon, { IconName } from "./Icon";
import T from "./T";
import { color } from "../theme";

interface QuickActionProps {
  label: string;
  icon: IconName;
  onPress: () => void;
  /** Shows a small gold dot — something needs attention. */
  attention?: boolean;
}

/** Round shortcut with a label underneath, like the action row in money apps. */
export default function QuickAction({ label, icon, onPress, attention }: QuickActionProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={attention ? `${label}, needs attention` : label}
      style={styles.item}
    >
      {({ pressed }) => (
        <>
          <View style={[styles.circle, pressed && { backgroundColor: color.brandSoft }]}>
            <Icon name={icon} size={22} color={color.brand} />
            {attention ? <View style={styles.dot} /> : null}
          </View>
          <T v="smallStrong" center numberOfLines={2}>
            {label}
          </T>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: { flex: 1, alignItems: "center", gap: 8 },
  circle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: color.surface,
    borderWidth: 1,
    borderColor: color.line,
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: color.gold,
    borderWidth: 2,
    borderColor: color.surface,
  },
});
