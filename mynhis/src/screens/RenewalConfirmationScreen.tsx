import { StyleSheet, Text, View } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { Button, Card, Icon, ListRow, Screen } from "../components/ui";
import { colors, spacing, type } from "../theme";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function RenewalConfirmationScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { params } = useRoute<RouteProp<RootStackParamList, "RenewalConfirmation">>();

  return (
    <Screen
      footer={
        <View style={styles.footer}>
          <Button label="View my card" icon="card-outline" onPress={() => navigation.reset({ index: 1, routes: [{ name: "Home" }, { name: "Membership" }] })} />
          <Button variant="secondary" label="Back to Home" onPress={() => navigation.reset({ index: 0, routes: [{ name: "Home" }] })} />
        </View>
      }
    >
      <View style={styles.hero}>
        <View style={styles.check}>
          <Icon name="checkmark" size={44} color={colors.onPrimary} />
        </View>
        <Text style={styles.title} accessibilityRole="header">
          Payment successful
        </Text>
        <Text style={styles.subtitle}>
          Your NHIS cover is renewed until <Text style={styles.strong}>{params.validUntil}</Text>. We've sent a receipt by SMS.
        </Text>
      </View>

      <Card padding="none">
        <ListRow title="Plan" trailing={params.plan} />
        <ListRow title="Amount paid" trailing={params.amount} divider />
        <ListRow title="Paid with" trailing={params.method} divider />
        <ListRow title="New expiry date" trailing={params.validUntil} divider />
        <ListRow title="Reference" trailing={params.reference} divider />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: "center", gap: spacing.md, marginTop: spacing.xxl },
  check: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 8,
    borderColor: colors.primarySoft,
  },
  title: { color: colors.ink, ...type.display, textAlign: "center" },
  subtitle: { color: colors.inkMuted, ...type.bodyLarge, textAlign: "center" },
  strong: { color: colors.ink, fontWeight: "700" },
  footer: { gap: spacing.md, paddingHorizontal: spacing.lg, paddingTop: spacing.sm },
});
