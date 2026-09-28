import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon, { IconName } from "./Icon";
import { RootStackParamList, TabName } from "../../types/navigation";
import { colors, spacing, type } from "../../theme";

const tabs: { name: TabName; label: string; icon: IconName; iconActive: IconName }[] = [
  { name: "Home", label: "Home", icon: "home-outline", iconActive: "home" },
  { name: "Membership", label: "My Card", icon: "card-outline", iconActive: "card" },
  { name: "Claims", label: "Claims", icon: "document-text-outline", iconActive: "document-text" },
  { name: "Benefits", label: "Benefits", icon: "heart-outline", iconActive: "heart" },
  { name: "Profile", label: "Profile", icon: "person-outline", iconActive: "person" },
];

/** The app's main navigation. Shown on the five top-level screens only. */
export default function TabBar({ active }: { active: TabName }) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();

  // Tabs replace each other instead of piling up; Android back from any tab lands on Home.
  const goTo = (name: TabName) =>
    navigation.reset({ index: name === "Home" ? 0 : 1, routes: name === "Home" ? [{ name: "Home" }] : [{ name: "Home" }, { name }] });

  return (
    <View style={[styles.bar, { paddingBottom: Math.max(insets.bottom, spacing.sm) }]} accessibilityRole="tablist">
      {tabs.map((t) => {
        const on = t.name === active;
        return (
          <Pressable
            key={t.name}
            onPress={() => !on && goTo(t.name)}
            accessibilityRole="tab"
            accessibilityState={{ selected: on }}
            accessibilityLabel={t.label}
            style={styles.item}
          >
            <View style={[styles.pill, on && styles.pillOn]}>
              <Icon name={on ? t.iconActive : t.icon} size={22} color={on ? colors.primary : colors.inkMuted} />
            </View>
            <Text style={[styles.label, { color: on ? colors.primary : colors.inkMuted }, on && styles.labelOn]}>
              {t.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
  },
  item: { flex: 1, alignItems: "center", gap: 2, minHeight: 56, justifyContent: "center" },
  pill: { width: 56, height: 32, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  pillOn: { backgroundColor: colors.primarySoft },
  label: { ...type.caption, fontSize: 12 },
  labelOn: { fontWeight: "700" },
});
