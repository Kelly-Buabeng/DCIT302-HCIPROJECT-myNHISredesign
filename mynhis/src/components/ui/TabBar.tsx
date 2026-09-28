import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon, { IconName } from "./Icon";
import { RootStackParamList, TabName } from "../../types/navigation";
import { colors, hairline, spacing } from "../../theme";

const tabs: { name: TabName; label: string; icon: IconName; iconActive: IconName }[] = [
  { name: "Home", label: "Home", icon: "home-outline", iconActive: "home" },
  { name: "Membership", label: "My Card", icon: "card-outline", iconActive: "card" },
  { name: "Claims", label: "Claims", icon: "document-text-outline", iconActive: "document-text" },
  { name: "Benefits", label: "Benefits", icon: "heart-outline", iconActive: "heart" },
  { name: "Profile", label: "Profile", icon: "person-circle-outline", iconActive: "person-circle" },
];

/** iOS tab bar: translucent, hairline on top, filled glyph + tint for the selected tab. */
export default function TabBar({ active }: { active: TabName }) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();

  // Tabs replace each other instead of piling up; Android back from any tab lands on Home.
  const goTo = (name: TabName) =>
    navigation.reset({ index: name === "Home" ? 0 : 1, routes: name === "Home" ? [{ name: "Home" }] : [{ name: "Home" }, { name }] });

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, spacing.xs) }]} accessibilityRole="tablist">
      {tabs.map((t) => {
        const on = t.name === active;
        const color = on ? colors.tint : colors.secondaryLabel;
        return (
          <Pressable
            key={t.name}
            onPress={() => !on && goTo(t.name)}
            accessibilityRole="tab"
            accessibilityState={{ selected: on }}
            accessibilityLabel={t.label}
            style={styles.item}
          >
            <Icon name={on ? t.iconActive : t.icon} size={25} color={color} />
            <Text style={[styles.label, { color }]}>{t.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    backgroundColor: "rgba(249,249,249,0.94)",
    borderTopWidth: hairline,
    borderTopColor: colors.separator,
    paddingTop: 6,
  },
  item: { flex: 1, alignItems: "center", gap: 2, minHeight: 44, justifyContent: "center" },
  label: { fontSize: 10, lineHeight: 12, fontWeight: "500", letterSpacing: 0.1 },
});
