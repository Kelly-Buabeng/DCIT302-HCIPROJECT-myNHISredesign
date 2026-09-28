import { Alert, Pressable, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../navigation/types";
import { ActivityRow, Avatar, Card, Icon, MemberCard, Notice, QuickAction, Screen, SectionHeader, T, TabBar } from "../components";
import { claims, claimTone, member } from "../data/mock";
import { color, radius, space } from "../theme";

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
}

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStack>>();
  const dueSoon = member.daysLeft <= 30;

  const hero = (
    <View style={styles.hero}>
      <View style={styles.greetRow}>
        <Pressable onPress={() => navigation.navigate("Account")} accessibilityRole="button" accessibilityLabel="Your account">
          <Avatar name={member.name} size={42} variant="onBrand" />
        </Pressable>
        <View style={styles.flex}>
          <T v="small" c={color.onBrandMuted}>
            {greeting()}
          </T>
          <T v="heading" c={color.onBrand}>
            Akwaaba, {member.firstName}
          </T>
        </View>
        <Pressable
          onPress={() => Alert.alert("Notifications", "Your cover ends in 30 days. Claim CLM-24031 is in review.")}
          accessibilityRole="button"
          accessibilityLabel="Notifications, 2 new"
          style={styles.bell}
        >
          <Icon name="bell" size={20} color={color.onBrand} />
          <View style={styles.bellDot} />
        </Pressable>
      </View>

      <Pressable onPress={() => navigation.navigate("Membership")} accessibilityRole="button" accessibilityHint="Opens your membership details">
        <MemberCard
          name={member.name}
          nhisNumber={member.nhisNumber}
          plan={member.plan}
          validUntil={member.validUntil}
          daysLeft={member.daysLeft}
        />
      </Pressable>
    </View>
  );

  return (
    <Screen statusBg={color.brand} hero={hero} bottom={<TabBar active="Home" />} bottomHandlesInset>
      <View style={styles.actions}>
        <QuickAction label="Renew" icon="refresh-cw" onPress={() => navigation.navigate("Renew")} attention={dueSoon} />
        <QuickAction label="Claims" icon="file-text" onPress={() => navigation.navigate("Claims")} />
        <QuickAction label="Ghana Card" icon="credit-card" onPress={() => navigation.navigate("LinkCard")} attention={!member.ghanaCard} />
        <QuickAction label="Family" icon="users" onPress={() => navigation.navigate("Membership")} />
      </View>

      {dueSoon ? (
        <Notice
          tone="warning"
          icon="clock"
          title="Renew before 28 Oct"
          message="Keep your cover going without a gap."
          action="Renew"
          onAction={() => navigation.navigate("Renew")}
        />
      ) : null}

      <View style={styles.section}>
        <SectionHeader title="Recent activity" action="See all" onAction={() => navigation.navigate("Claims")} />
        <Card padding="flush">
          {claims.slice(0, 3).map((c, i) => (
            <ActivityRow
              key={c.id}
              icon={c.icon}
              title={c.facility}
              subtitle={`${c.service} · ${c.date}`}
              amount={c.amount}
              status={{ label: c.status, tone: claimTone[c.status] }}
              onPress={() => navigation.navigate("ClaimDetail", { id: c.id })}
              divider={i > 0}
            />
          ))}
        </Card>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  hero: {
    backgroundColor: color.brand,
    paddingHorizontal: space[5],
    paddingTop: space[3],
    paddingBottom: space[6],
    gap: space[5],
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
  },
  greetRow: { flexDirection: "row", alignItems: "center", gap: space[3] },
  bell: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
  },
  bellDot: { position: "absolute", top: 10, right: 11, width: 8, height: 8, borderRadius: 4, backgroundColor: color.gold },
  actions: { flexDirection: "row", gap: space[2] },
  section: { gap: space[4] },
});
