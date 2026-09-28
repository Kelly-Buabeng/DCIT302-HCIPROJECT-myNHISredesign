import { StyleSheet, View } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../navigation/types";
import { Button, Card, Icon, Row, Screen, T } from "../components";
import { member } from "../data/mock";
import { color, space } from "../theme";

/** Shared success screen layout. */
function Done({ title, message, rows, primary, onPrimary }: {
  title: string;
  message: string;
  rows: [string, string][];
  primary: string;
  onPrimary: () => void;
}) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStack>>();
  return (
    <Screen
      bottom={
        <View style={styles.bottom}>
          <Button label={primary} onPress={onPrimary} />
          <Button variant="text" label="Back to home" onPress={() => navigation.reset({ index: 0, routes: [{ name: "Home" }] })} />
        </View>
      }
    >
      <View style={styles.hero} accessibilityLiveRegion="polite">
        <View style={styles.ring}>
          <View style={styles.check}>
            <Icon name="check" size={32} color={color.brand} />
          </View>
        </View>
        <T v="title" center accessibilityRole="header">
          {title}
        </T>
        <T v="body" c={color.ink2} center>
          {message}
        </T>
      </View>
      <Card padding="flush">
        {rows.map(([k, v], i) => (
          <Row key={k} label={k} value={v} divider={i > 0} />
        ))}
      </Card>
    </Screen>
  );
}

export function RenewDoneScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStack>>();
  const { params } = useRoute<RouteProp<RootStack, "RenewDone">>();
  return (
    <Done
      title="You're covered"
      message={`Your NHIS membership now runs until ${params.validUntil}. A receipt is on its way by SMS.`}
      rows={[
        ["Plan", params.plan],
        ["Amount", params.amount],
        ["Paid with", params.network],
        ["New expiry", params.validUntil],
        ["Reference", params.reference],
      ]}
      primary="View membership"
      onPrimary={() => navigation.reset({ index: 1, routes: [{ name: "Home" }, { name: "Membership" }] })}
    />
  );
}

export function LinkDoneScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStack>>();
  const { params } = useRoute<RouteProp<RootStack, "LinkDone">>();
  return (
    <Done
      title="Ghana Card linked"
      message="Hospitals can now confirm who you are with your Ghana Card alone."
      rows={[
        ["Name", member.name],
        ["Ghana Card", params.cardNumber],
        ["NHIS number", member.nhisNumber],
      ]}
      primary="Done"
      onPrimary={() => navigation.reset({ index: 0, routes: [{ name: "Home" }] })}
    />
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: "center", gap: space[2], paddingTop: space[8] },
  ring: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: color.brandSoft,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: space[4],
  },
  check: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: color.gold,
    alignItems: "center",
    justifyContent: "center",
  },
  bottom: { paddingHorizontal: space[5], paddingTop: space[3], gap: space[1] },
});
