import { Pressable, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { Avatar, Banner, Group, ListRow, MembershipCard, QuickAction, Screen, Section, StatusBadge, TabBar } from "../components/ui";
import { claims, claimStatusTone, membership, profile } from "../data/dummyData";
import { colors, spacing } from "../theme";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const today = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const expiringSoon = membership.daysLeft <= 30;

  return (
    <Screen
      overline={today}
      largeTitle={`Hello, ${profile.firstName}`}
      titleAccessory={
        <Pressable onPress={() => navigation.navigate("Profile")} accessibilityRole="button" accessibilityLabel="Open profile" hitSlop={6}>
          <Avatar name={profile.name} size={40} />
        </Pressable>
      }
      footer={<TabBar active="Home" />}
      padBottom={false}
    >
      <Pressable onPress={() => navigation.navigate("Membership")} accessibilityRole="button" accessibilityHint="Opens your full card">
        <MembershipCard
          name={profile.name}
          nhisNumber={profile.nhisNumber}
          plan={membership.plan}
          validUntil={membership.validUntil}
          active={membership.status === "active"}
          masked
        />
      </Pressable>

      {expiringSoon && (
        <Banner
          tone="warning"
          title={`Cover ends in ${membership.daysLeft} days`}
          message={`Renew before ${membership.validUntil} so your cover doesn't lapse.`}
          actionLabel="Renew Now"
          onAction={() => navigation.navigate("Renew")}
        />
      )}

      <Section title="Shortcuts">
        <View style={styles.grid}>
          <QuickAction label="Renew" icon="refresh" color={colors.tint} onPress={() => navigation.navigate("Renew")} badge={expiringSoon ? "Due" : undefined} />
          <QuickAction label="Claims" icon="document-text" color={colors.blue} onPress={() => navigation.navigate("Claims")} />
          <QuickAction label="Ghana Card" icon="id-card" color={colors.orange} onPress={() => navigation.navigate("LinkGhanaCard")} badge={profile.ghanaCard ? undefined : "To Do"} />
          <QuickAction label="Family" icon="people" color={colors.purple} onPress={() => navigation.navigate("Membership")} />
        </View>
      </Section>

      <Section title="Recent Claims" actionLabel="See All" onAction={() => navigation.navigate("Claims")}>
        <Group>
          {claims.slice(0, 2).map((c) => (
            <ListRow
              key={c.id}
              icon="business"
              iconColor={colors.teal}
              title={c.facility}
              subtitle={`${c.date} · ${c.amount}`}
              trailing={<StatusBadge label={c.status} status={claimStatusTone[c.status]} />}
            />
          ))}
        </Group>
      </Section>
    </Screen>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.md },
});
