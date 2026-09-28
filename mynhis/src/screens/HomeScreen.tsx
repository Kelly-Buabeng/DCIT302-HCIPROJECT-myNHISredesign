import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { Avatar, Banner, Card, ListRow, MembershipCard, QuickAction, Screen, Section, StatusBadge, TabBar } from "../components/ui";
import { claims, claimStatusTone, membership, profile } from "../data/dummyData";
import { colors, spacing, type } from "../theme";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
}

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const expiringSoon = membership.daysLeft <= 30;
  const recent = claims.slice(0, 2);

  return (
    <Screen footer={<TabBar active="Home" />} padBottom={false}>
      <View style={styles.header}>
        <View style={styles.flex}>
          <Text style={styles.greeting}>{greeting()},</Text>
          <Text style={styles.name} accessibilityRole="header">
            {profile.firstName}
          </Text>
        </View>
        <Avatar name={profile.name} />
      </View>

      <MembershipCard
        name={profile.name}
        nhisNumber={profile.nhisNumber}
        plan={membership.plan}
        validUntil={membership.validUntil}
        active={membership.status === "active"}
        masked
      />

      {expiringSoon && (
        <Banner
          tone="warning"
          title={`Your cover ends in ${membership.daysLeft} days`}
          message={`Renew before ${membership.validUntil} to avoid a break in cover.`}
          actionLabel="Renew now"
          onAction={() => navigation.navigate("Renew")}
        />
      )}

      <Section title="What would you like to do?">
        <View style={styles.grid}>
          <QuickAction label="Renew membership" icon="refresh-circle-outline" onPress={() => navigation.navigate("Renew")} badge={expiringSoon ? "Due" : undefined} />
          <QuickAction label="Track claims" icon="document-text-outline" onPress={() => navigation.navigate("Claims")} />
          <QuickAction label="Link Ghana Card" icon="id-card-outline" onPress={() => navigation.navigate("LinkGhanaCard")} badge={profile.ghanaCard ? undefined : "To do"} />
          <QuickAction label="Family & dependents" icon="people-outline" onPress={() => navigation.navigate("Membership")} />
        </View>
      </Section>

      <Section title="Recent claims" actionLabel="See all" onAction={() => navigation.navigate("Claims")}>
        <Card padding="none">
          {recent.map((c, i) => (
            <ListRow
              key={c.id}
              icon="business-outline"
              title={c.facility}
              subtitle={`${c.date} · ${c.amount}`}
              trailing={<StatusBadge label={c.status} status={claimStatusTone[c.status]} />}
              divider={i > 0}
            />
          ))}
        </Card>
      </Section>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: { flexDirection: "row", alignItems: "center", gap: spacing.md, marginTop: spacing.sm },
  greeting: { color: colors.inkMuted, ...type.body },
  name: { color: colors.ink, ...type.display },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.md },
});
