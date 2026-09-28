import { Alert, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { AppHeader, Avatar, Card, ListRow, Screen, Section, StatusBadge, TabBar } from "../components/ui";
import { membership, profile } from "../data/dummyData";
import { colors, spacing, type } from "../theme";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const comingSoon = (title: string) => () => Alert.alert(title, "This section is coming in the next release.");

export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProp>();

  const handleLogout = () => {
    Alert.alert("Log out?", "You'll need your NHIS number and password to log back in.", [
      { text: "Cancel", style: "cancel" },
      { text: "Log out", style: "destructive", onPress: () => navigation.reset({ index: 0, routes: [{ name: "Login" }] }) },
    ]);
  };

  return (
    <Screen header={<AppHeader title="Profile" />} footer={<TabBar active="Profile" />} padBottom={false}>
      <View style={styles.identity}>
        <Avatar name={profile.name} size={72} />
        <View style={styles.identityText}>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.meta}>
            {membership.category} · member since {profile.memberSince}
          </Text>
          <StatusBadge label="Active cover" status="success" />
        </View>
      </View>

      <Section title="Personal information">
        <Card padding="none">
          <ListRow icon="card-outline" title="NHIS number" subtitle={profile.nhisNumber} />
          <ListRow icon="call-outline" title="Phone" subtitle={profile.phone} divider />
          <ListRow icon="mail-outline" title="Email" subtitle={profile.email} divider />
          <ListRow icon="gift-outline" title="Date of birth" subtitle={profile.dateOfBirth} divider />
          <ListRow
            icon="id-card-outline"
            title="Ghana Card"
            subtitle={profile.ghanaCard ?? "Not linked"}
            onPress={() => navigation.navigate("LinkGhanaCard")}
            divider
          />
        </Card>
      </Section>

      <Section title="Settings">
        <Card padding="none">
          <ListRow icon="notifications-outline" title="Notifications" subtitle="Renewal reminders, claim updates" onPress={comingSoon("Notifications")} />
          <ListRow icon="lock-closed-outline" title="Security" subtitle="Password, PIN and fingerprint" onPress={comingSoon("Security")} divider />
          <ListRow icon="language-outline" title="Language" subtitle="English" onPress={comingSoon("Language")} divider />
          <ListRow icon="help-circle-outline" title="Help & support" subtitle="FAQs, contact NHIA" onPress={comingSoon("Help & support")} divider />
        </Card>
      </Section>

      <Card padding="none">
        <ListRow icon="log-out-outline" title="Log out" tone="danger" onPress={handleLogout} />
      </Card>

      <Text style={styles.version}>myNHIS version 3.0.0</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  identity: { flexDirection: "row", alignItems: "center", gap: spacing.lg },
  identityText: { flex: 1, gap: spacing.xs },
  name: { color: colors.ink, ...type.title },
  meta: { color: colors.inkMuted, ...type.caption },
  version: { color: colors.inkMuted, ...type.caption, textAlign: "center" },
});
