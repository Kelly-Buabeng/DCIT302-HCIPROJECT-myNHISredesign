import { Pressable, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon, { IconName } from "./Icon";
import T from "./T";
import { RootStack, Tab } from "../navigation/types";
import { color, space } from "../theme";

const tabs: { name: Tab; label: string; icon: IconName }[] = [
  { name: "Home", label: "Home", icon: "home" },
  { name: "Claims", label: "Claims", icon: "file-text" },
  { name: "Coverage", label: "Coverage", icon: "shield" },
  { name: "Account", label: "Account", icon: "user" },
];

/** Four tabs. The current one gets brand colour and a short bar above its icon. */
export default function TabBar({ active }: { active: Tab }) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStack>>();
  const insets = useSafeAreaInsets();

  // Tabs replace each other; Android back from any tab returns to Home.
  const go = (name: Tab) =>
    navigation.reset({ index: name === "Home" ? 0 : 1, routes: name === "Home" ? [{ name: "Home" }] : [{ name: "Home" }, { name }] });

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, space[2]) }]} accessibilityRole="tablist">
      {tabs.map((t) => {
        const on = t.name === active;
        const c = on ? color.brand : color.ink2;
        return (
          <Pressable
            key={t.name}
            onPress={() => !on && go(t.name)}
            accessibilityRole="tab"
            accessibilityState={{ selected: on }}
            accessibilityLabel={t.label}
            style={styles.item}
          >
            <View style={[styles.indicator, on && { backgroundColor: color.brand }]} />
            <Icon name={t.icon} size={22} color={c} />
            <T v="label" c={c} style={on ? styles.on : undefined}>
              {t.label}
            </T>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { flexDirection: "row", backgroundColor: color.surface, borderTopWidth: 1, borderTopColor: color.line },
  item: { flex: 1, alignItems: "center", gap: 4, minHeight: 56, paddingBottom: 4 },
  indicator: { width: 28, height: 3, borderRadius: 2, marginBottom: 6, backgroundColor: "transparent" },
  on: { fontFamily: "PlusJakartaSans_600SemiBold" },
});
