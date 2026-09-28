import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "./Icon";
import { colors, spacing, touchTarget, type } from "../../theme";

interface AppHeaderProps {
  title: string;
  /** Shows a back arrow on the left. Tab screens leave this off. */
  back?: boolean;
  /** Optional element on the right, e.g. an IconButton. */
  right?: ReactNode;
}

export default function AppHeader({ title, back = false, right }: AppHeaderProps) {
  const navigation = useNavigation();
  return (
    <View style={styles.bar}>
      <View style={styles.side}>
        {back && (
          <Pressable
            onPress={() => navigation.canGoBack() && navigation.goBack()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            hitSlop={8}
            style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
          >
            <Icon name="arrow-back" size={24} color={colors.ink} />
          </Pressable>
        )}
      </View>
      <Text style={styles.title} accessibilityRole="header" numberOfLines={1}>
        {title}
      </Text>
      <View style={[styles.side, styles.right]}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.canvas,
  },
  side: { width: touchTarget, alignItems: "flex-start" },
  right: { alignItems: "flex-end" },
  title: { flex: 1, textAlign: "center", color: colors.ink, ...type.heading },
  iconButton: {
    width: touchTarget,
    height: touchTarget,
    borderRadius: touchTarget / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: { backgroundColor: colors.primarySoft },
});
