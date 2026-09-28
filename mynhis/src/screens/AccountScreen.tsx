import { Alert, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../navigation/types";
import { Avatar, Card, Row, Screen, T, TabBar } from "../components";
import { member } from "../data/mock";
import { color, space } from "../theme";

const soon = (title: string) => () => Alert.alert(title, "Coming in the next update.");

export default function AccountScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStack>>();

  const logOut = () =>
    Alert.alert("Log out?", "You'll need your NHIS number and password to log back in.", [
      { text: "Cancel", style: "cancel" },
      { text: "Log out", style: "destructive", onPress: () => navigation.reset({ index: 0, routes: [{ name: "Login" }] }) },
    ]);

  return (
    <Screen bottom={<TabBar active="Account" />} bottomHandlesInset>
      <View style={styles.profile}>
        <Avatar name={member.name} size={72} />
        <View style={styles.center}>
          <T v="title">{member.name}</T>
          <T v="body" c={color.ink2}>
            {member.category} · since {member.memberSince}
          </T>
        </View>
      </View>

      <View style={styles.section}>
        <T v="label" c={color.ink2}>
          PERSONAL DETAILS
        </T>
        <Card padding="flush">
          <Row label="NHIS number" value={member.nhisNumber} />
          <Row label="Phone" value={member.phone} divider />
          <Row label="Email" value={member.email} divider />
          <Row label="Date of birth" value={member.dateOfBirth} divider />
          <Row label="Ghana Card" value={member.ghanaCard ?? "Not linked"} onPress={() => navigation.navigate("LinkCard")} divider />
        </Card>
      </View>

      <View style={styles.section}>
        <T v="label" c={color.ink2}>
          SETTINGS
        </T>
        <Card padding="flush">
          <Row icon="bell" label="Notifications" onPress={soon("Notifications")} />
          <Row icon="lock" label="Security & PIN" onPress={soon("Security & PIN")} divider />
          <Row icon="globe" label="Language" value="English" onPress={soon("Language")} divider />
          <Row icon="help-circle" label="Help & support" onPress={soon("Help & support")} divider />
        </Card>
      </View>

      <Card padding="flush">
        <Row icon="log-out" label="Log out" danger onPress={logOut} />
      </Card>

      <T v="small" c={color.ink2} center>
        myNHIS 4.0
      </T>
    </Screen>
  );
}

const styles = StyleSheet.create({
  profile: { alignItems: "center", gap: space[3], paddingTop: space[4] },
  center: { alignItems: "center", gap: 2 },
  section: { gap: space[2] },
});
