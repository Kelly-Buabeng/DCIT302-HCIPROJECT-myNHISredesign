import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { AppHeader, Button, Card, ListRow, MembershipCard, Screen, Section, StatusBadge, TabBar } from "../components/ui";
import { dependents as initialDependents, membership, profile } from "../data/dummyData";
import { colors, spacing, type } from "../theme";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function MembershipScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [masked, setMasked] = useState(true);
  const [dependents, setDependents] = useState(initialDependents);

  const removeDependent = (id: number, name: string) => {
    Alert.alert("Remove dependent?", `${name} will lose NHIS cover under your membership.`, [
      { text: "Keep", style: "cancel" },
      { text: "Remove", style: "destructive", onPress: () => setDependents((d) => d.filter((x) => x.id !== id)) },
    ]);
  };

  return (
    <Screen header={<AppHeader title="My Card" />} footer={<TabBar active="Membership" />} padBottom={false}>
      <View style={styles.cardBlock}>
        <MembershipCard
          name={profile.name}
          nhisNumber={profile.nhisNumber}
          plan={membership.plan}
          validUntil={membership.validUntil}
          active={membership.status === "active"}
          masked={masked}
        />
        <Button
          variant="ghost"
          icon={masked ? "eye-outline" : "eye-off-outline"}
          label={masked ? "Show full number" : "Hide number"}
          onPress={() => setMasked((m) => !m)}
        />
        <Text style={styles.note}>Show this card at any NHIS-accredited facility.</Text>
      </View>

      <Section title="Membership details">
        <Card padding="none">
          <ListRow icon="shield-checkmark-outline" title="Status" trailing={<StatusBadge label="Active" status="success" />} />
          <ListRow icon="layers-outline" title="Plan" trailing={membership.plan} divider />
          <ListRow icon="person-outline" title="Category" trailing={membership.category} divider />
          <ListRow icon="calendar-outline" title="Valid until" trailing={membership.validUntil} divider />
          <ListRow icon="location-outline" title="Scheme" subtitle={membership.scheme} divider />
        </Card>
        <Button label="Renew membership" icon="refresh" onPress={() => navigation.navigate("Renew")} />
      </Section>

      <Section title="Ghana Card">
        <Card padding="none">
          <ListRow
            icon="id-card-outline"
            title={profile.ghanaCard ? "Ghana Card linked" : "Not linked yet"}
            subtitle={profile.ghanaCard ?? "Link it to verify your identity faster"}
            trailing={profile.ghanaCard ? <StatusBadge label="Linked" status="success" /> : <StatusBadge label="To do" status="warning" />}
            onPress={() => navigation.navigate("LinkGhanaCard")}
          />
        </Card>
      </Section>

      <Section title={`Dependents (${dependents.length})`}>
        {dependents.length === 0 ? (
          <Card>
            <Text style={styles.empty}>No dependents on your membership.</Text>
          </Card>
        ) : (
          <Card padding="none">
            {dependents.map((d, i) => (
              <ListRow
                key={d.id}
                icon={d.relationship === "Spouse" ? "heart-outline" : "happy-outline"}
                title={d.name}
                subtitle={`${d.relationship} · ${d.nhisNumber}`}
                trailing={
                  <Button variant="ghost" block={false} label="Remove" onPress={() => removeDependent(d.id, d.name)} />
                }
                divider={i > 0}
              />
            ))}
          </Card>
        )}
        <Button
          variant="secondary"
          icon="person-add-outline"
          label="Add a dependent"
          onPress={() =>
            Alert.alert("Add a dependent", "Bring the dependent's Ghana Card or birth certificate to your district office to add them.")
          }
        />
      </Section>
    </Screen>
  );
}

const styles = StyleSheet.create({
  cardBlock: { gap: spacing.sm },
  note: { color: colors.inkMuted, ...type.caption, textAlign: "center" },
  empty: { color: colors.inkMuted, ...type.body },
});
