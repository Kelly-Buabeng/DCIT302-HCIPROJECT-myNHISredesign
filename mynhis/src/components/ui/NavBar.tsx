import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "./Icon";
import { colors, hairline, spacing, touchTarget, type } from "../../theme";

const isIOS = Platform.OS === "ios";

interface BarButton {
  label: string;
  onPress: () => void;
  /** Bold, like a sheet's "Done". */
  prominent?: boolean;
}

interface NavBarProps {
  title: string;
  /**
   * "back" — chevron + "Back" (pushed screens)
   * "cancel" — "Cancel" text (modal sheets)
   * a BarButton — custom left action
   */
  left?: "back" | "cancel" | BarButton;
  right?: BarButton;
  /** Draw the sheet grabber above the bar (modal presentation). */
  sheet?: boolean;
}

/** iOS navigation bar: centred 17pt semibold title, tint-coloured text buttons. */
export default function NavBar({ title, left, right, sheet }: NavBarProps) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const goBack = () => navigation.canGoBack() && navigation.goBack();

  const leftButton: BarButton | null =
    left === "back"
      ? { label: "Back", onPress: goBack }
      : left === "cancel"
        ? { label: "Cancel", onPress: goBack }
        : left ?? null;

  return (
    // On iOS a sheet starts below the status bar; elsewhere modals are full screen.
    <View style={[styles.wrap, { paddingTop: sheet && isIOS ? spacing.sm : insets.top }]}>
      {sheet && isIOS && <View style={styles.grabber} />}
      <View style={styles.bar}>
        <View style={styles.side}>
          {leftButton && (
            <Pressable
              onPress={leftButton.onPress}
              accessibilityRole="button"
              accessibilityLabel={left === "back" ? "Back" : leftButton.label}
              hitSlop={8}
              style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            >
              {left === "back" && <Icon name="chevron-back" size={26} color={colors.tint} style={styles.chevron} />}
              <Text style={[styles.buttonText, leftButton.prominent && styles.bold]}>{leftButton.label}</Text>
            </Pressable>
          )}
        </View>
        <Text style={styles.title} accessibilityRole="header" numberOfLines={1}>
          {title}
        </Text>
        <View style={[styles.side, styles.right]}>
          {right && (
            <Pressable
              onPress={right.onPress}
              accessibilityRole="button"
              hitSlop={8}
              style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            >
              <Text style={[styles.buttonText, right.prominent && styles.bold]}>{right.label}</Text>
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.barBackground,
    borderBottomWidth: hairline,
    borderBottomColor: colors.separator,
  },
  grabber: {
    alignSelf: "center",
    width: 36,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.separator,
    marginBottom: spacing.xs,
  },
  bar: { height: touchTarget, flexDirection: "row", alignItems: "center", paddingHorizontal: spacing.sm },
  side: { flex: 1, alignItems: "flex-start" },
  right: { alignItems: "flex-end" },
  title: { flex: 2, textAlign: "center", color: colors.label, ...type.headline },
  button: { minHeight: touchTarget, flexDirection: "row", alignItems: "center", paddingHorizontal: spacing.sm },
  chevron: { marginLeft: -spacing.sm, marginRight: -2 },
  buttonText: { color: colors.tint, ...type.body },
  bold: { fontWeight: "600" },
  pressed: { opacity: 0.4 },
});
