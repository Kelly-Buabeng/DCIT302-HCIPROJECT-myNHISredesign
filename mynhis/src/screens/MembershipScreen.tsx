import { useState } from "react";
import { Alert, StyleSheet, Switch, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { Button, Group, ListRow, MembershipCard, Screen, StatusBadge, TabBar } from "../components/ui";
import { dependents as initialDependents, membership, profile } from "../data/dummyData";
import { colors, spacing, type } from "../theme";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function MembershipScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [showNumber, setShowNumber] = useState(false);
  const [dependents, setDependents] = useState(initialDependents);

  const removeDependent = (id: number, name: string) => {
    Alert.alert(`Remove ${name}?`, `${name} will lose NHIS cover under your membership.`, [
      { text: "Cancel", style: "cancel" },
      { text: "Remove", style: "destructive", onPress: () => setDependents((d) => d.filter((x) => x.id !== id)) },
    ]);
  };

  return (
    <Screen largeTitle="My Card" footer={<TabBar active="Membership" />} padBottom={false}>
      <View style={styles.cardBlock}>
        <MembershipCard
          name={profile.name}
          nhisNumber={profile.nhisNumber}
          plan={membership.plan}
          validUntil={membership.validUntil}
          active={membership.status === "active"}
          masked={!showNumber}
        />
        <Text style={styles.note}>Show this card at any NHIS-accredited facility.</Text>
      </View>

      <Group>
        <ListRow
          icon="eye"
          iconColor={colors.gray}
          title="Show Full Number"
          trailing={
            <Switch
              value={showNumber}
              onValueChange={setShowNumber}
              trackColor={{ true: colors.tint, false: colors.fill }}
              accessibilityLabel="Show full NHIS number"
            />
          }
        />
      </Group>

      <Group header="Membership">
        <ListRow icon="shield-checkmark" iconColor={colors.green} title="Status" trailing={<StatusBadge label="Active" status="success" />} />
        <ListRow icon="layers" iconColor={colors.blue} title="Plan" value={membership.plan} />
        <ListRow icon="person" iconColor={colors.indigo} title="Category" value="Principal" />
        <ListRow icon="calendar" iconColor={colors.red} title="Valid Until" value={membership.validUntil} />
        <ListRow icon="location" iconColor={colors.teal} title="Scheme" value="Accra Metro" />
        <ListRow icon="refresh" iconColor={colors.tint} title="Renew Membership" onPress={() => navigation.navigate("Renew")} />
      </Group>

      <Group header="Identity" footer="Linking your Ghana Card lets facilities confirm who you are with one card.">
        <ListRow
          icon="id-card"
          iconColor={colors.orange}
          title="Ghana Card"
          value={profile.ghanaCard ?? "Not Linked"}
          onPress={() => navigation.navigate("LinkGhanaCard")}
        />
      </Group>

      <Group
        header={`Dependents (${dependents.length})`}
        footer="To add a dependent, bring their Ghana Card or birth certificate to your district office."
      >
        {dependents.map((d) => (
          <ListRow
            key={d.id}
            icon={d.relationship === "Spouse" ? "heart" : "happy"}
            iconColor={d.relationship === "Spouse" ? colors.pink : colors.purple}
            title={d.name}
            subtitle={`${d.relationship} · ${d.nhisNumber}`}
            trailing={<Button variant="destructive" size="small" label="Remove" onPress={() => removeDependent(d.id, d.name)} />}
          />
        ))}
        {dependents.length === 0 ? <ListRow title="No dependents" /> : null}
      </Group>
    </Screen>
  );
}

const styles = StyleSheet.create({
  cardBlock: { gap: spacing.md },
  note: { color: colors.secondaryLabel, ...type.footnote, textAlign: "center" },
});
