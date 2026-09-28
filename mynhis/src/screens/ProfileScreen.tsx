import { Alert, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { Avatar, Group, ListRow, Screen, TabBar } from "../components/ui";
import { membership, profile } from "../data/dummyData";
import { colors, type } from "../theme";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const comingSoon = (title: string) => () => Alert.alert(title, "This section is coming in the next release.");

export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProp>();

  const handleLogout = () => {
    Alert.alert("Log Out?", "You'll need your NHIS number and password to log back in.", [
      { text: "Cancel", style: "cancel" },
      { text: "Log Out", style: "destructive", onPress: () => navigation.reset({ index: 0, routes: [{ name: "Login" }] }) },
    ]);
  };

  return (
    <Screen largeTitle="Profile" footer={<TabBar active="Profile" />} padBottom={false}>
      {/* Account header row, like the Apple Account row at the top of Settings */}
      <Group>
        <ListRow
          leading={<Avatar name={profile.name} size={60} />}
          title={profile.name}
          subtitle={`${membership.category} · Member since ${profile.memberSince}`}
          onPress={comingSoon("Edit Profile")}
        />
      </Group>

      <Group header="Personal Information">
        <ListRow icon="card" iconColor={colors.tint} title="NHIS Number" value={profile.nhisNumber} />
        <ListRow icon="call" iconColor={colors.green} title="Phone" value={profile.phone} />
        <ListRow icon="mail" iconColor={colors.blue} title="Email" value={profile.email} />
        <ListRow icon="gift" iconColor={colors.pink} title="Date of Birth" value={profile.dateOfBirth} />
        <ListRow
          icon="id-card"
          iconColor={colors.orange}
          title="Ghana Card"
          value={profile.ghanaCard ?? "Not Linked"}
          onPress={() => navigation.navigate("LinkGhanaCard")}
        />
      </Group>

      <Group header="Settings">
        <ListRow icon="notifications" iconColor={colors.red} title="Notifications" onPress={comingSoon("Notifications")} />
        <ListRow icon="finger-print" iconColor={colors.indigo} title="Face ID & Passcode" onPress={comingSoon("Face ID & Passcode")} />
        <ListRow icon="language" iconColor={colors.blue} title="Language" value="English" onPress={comingSoon("Language")} />
        <ListRow icon="help-buoy" iconColor={colors.teal} title="Help & Support" onPress={comingSoon("Help & Support")} />
      </Group>

      <Group>
        <ListRow title="Log Out" destructive onPress={handleLogout} />
      </Group>

      <Text style={styles.version}>myNHIS 3.0.0</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  version: { color: colors.secondaryLabel, ...type.footnote, textAlign: "center", marginTop: -8 },
});
