import { StyleSheet, Text, View } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { Button, Group, Icon, ListRow, NavBar, Screen } from "../components/ui";
import { colors, spacing, type } from "../theme";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function RenewalConfirmationScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { params } = useRoute<RouteProp<RootStackParamList, "RenewalConfirmation">>();
  const done = () => navigation.reset({ index: 0, routes: [{ name: "Home" }] });

  return (
    <Screen
      navBar={<NavBar title="Receipt" right={{ label: "Done", onPress: done, prominent: true }} sheet />}
      footer={
        <View style={styles.footer}>
          <Button
            label="View My Card"
            onPress={() => navigation.reset({ index: 1, routes: [{ name: "Home" }, { name: "Membership" }] })}
          />
        </View>
      }
    >
      <View style={styles.hero}>
        <Icon name="checkmark-circle" size={88} color={colors.tint} />
        <Text style={styles.title} accessibilityRole="header">
          Payment Complete
        </Text>
        <Text style={styles.subtitle}>
          Your NHIS cover is renewed until {params.validUntil}. We've sent a receipt by SMS.
        </Text>
      </View>

      <Group header="Details">
        <ListRow title="Plan" value={params.plan} />
        <ListRow title="Amount Paid" value={params.amount} />
        <ListRow title="Paid With" value={params.method} />
        <ListRow title="New Expiry Date" value={params.validUntil} />
        <ListRow title="Reference" value={params.reference} />
      </Group>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: "center", gap: spacing.sm, marginTop: spacing.xl },
  title: { color: colors.label, ...type.title1, textAlign: "center" },
  subtitle: { color: colors.secondaryLabel, ...type.body, textAlign: "center", paddingHorizontal: spacing.lg },
  footer: { paddingHorizontal: spacing.lg },
});
