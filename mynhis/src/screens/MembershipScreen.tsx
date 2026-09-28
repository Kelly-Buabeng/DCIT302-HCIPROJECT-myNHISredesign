import { useState } from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../navigation/types";
import { Avatar, Button, Card, Icon, MemberCard, Row, Screen, T, TopBar } from "../components";
import { dependents as initial, member } from "../data/mock";
import { color, space } from "../theme";

export default function MembershipScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStack>>();
  const [masked, setMasked] = useState(true);
  const [dependents, setDependents] = useState(initial);

  const remove = (id: number, name: string) =>
    Alert.alert(`Remove ${name}?`, `${name} will lose NHIS cover under your membership.`, [
      { text: "Keep", style: "cancel" },
      { text: "Remove", style: "destructive", onPress: () => setDependents((d) => d.filter((x) => x.id !== id)) },
    ]);

  return (
    <Screen
      top={<TopBar title="Membership" />}
      bottomSurface
      bottom={
        <View style={styles.bottom}>
          <Button label="Renew membership" onPress={() => navigation.navigate("Renew")} />
        </View>
      }
    >
      <View style={styles.cardWrap}>
        <MemberCard
          name={member.name}
          nhisNumber={member.nhisNumber}
          plan={member.plan}
          validUntil={member.validUntil}
          daysLeft={member.daysLeft}
          masked={masked}
        />
      </View>
      <Pressable onPress={() => setMasked((m) => !m)} accessibilityRole="button" style={styles.reveal} hitSlop={8}>
        <Icon name={masked ? "eye" : "eye-off"} size={16} color={color.brand} />
        <T v="smallStrong" c={color.brand}>
          {masked ? "Show full number" : "Hide number"}
        </T>
      </Pressable>

      <View style={styles.section}>
        <T v="heading" accessibilityRole="header">
          Details
        </T>
        <Card padding="flush">
          <Row label="Plan" value={member.plan} />
          <Row label="Category" value="Principal" divider />
          <Row label="Valid until" value={member.validUntil} divider />
          <Row label="Scheme" value={member.scheme} divider />
        </Card>
      </View>

      <View style={styles.section}>
        <View style={styles.headRow}>
          <T v="heading" accessibilityRole="header">
            Family
          </T>
          <T v="small" c={color.ink2}>
            {dependents.length} of 4 dependents
          </T>
        </View>
        <Card padding="flush">
          {dependents.map((d, i) => (
            <View key={d.id} style={[styles.person, i > 0 && styles.divider]}>
              <Avatar name={d.name} size={40} />
              <View style={styles.flex}>
                <T v="bodyStrong">{d.name}</T>
                <T v="small" c={color.ink2}>
                  {d.relation} · {d.nhisNumber}
                </T>
              </View>
              <Pressable onPress={() => remove(d.id, d.name)} accessibilityRole="button" accessibilityLabel={`Remove ${d.name}`} style={styles.iconBtn}>
                <Icon name="trash-2" size={18} color={color.ink2} />
              </Pressable>
            </View>
          ))}
          <Pressable
            onPress={() => Alert.alert("Add a family member", "Bring their Ghana Card or birth certificate to your district office to add them.")}
            accessibilityRole="button"
            style={({ pressed }) => [styles.person, dependents.length > 0 && styles.divider, pressed && { backgroundColor: color.bg }]}
          >
            <View style={styles.addIcon}>
              <Icon name="plus" size={18} color={color.brand} />
            </View>
            <T v="bodyStrong" c={color.brand}>
              Add family member
            </T>
          </Pressable>
        </Card>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  cardWrap: { backgroundColor: color.brand, borderRadius: 24, padding: space[2] },
  reveal: { flexDirection: "row", alignItems: "center", gap: space[2], alignSelf: "center", marginTop: -space[5], minHeight: 44 },
  section: { gap: space[3] },
  headRow: { flexDirection: "row", alignItems: "baseline", justifyContent: "space-between" },
  person: { flexDirection: "row", alignItems: "center", gap: space[3], paddingHorizontal: space[4], minHeight: 68 },
  divider: { borderTopWidth: 1, borderTopColor: color.line },
  flex: { flex: 1 },
  iconBtn: { width: 44, height: 44, alignItems: "center", justifyContent: "center" },
  addIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: color.brand,
    alignItems: "center",
    justifyContent: "center",
  },
  bottom: { paddingHorizontal: space[5], paddingTop: space[3] },
});
