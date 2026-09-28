import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { AppHeader, Button, Card, OptionCard, Screen, Section, StepIndicator, TextField } from "../components/ui";
import { membership, paymentMethods, plans, profile } from "../data/dummyData";
import { colors, spacing, type } from "../theme";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const cedi = (n: number) => `GH₵ ${n.toFixed(2)}`;

export default function RenewScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [planId, setPlanId] = useState("standard");
  const [methodId, setMethodId] = useState("momo");
  const [phone, setPhone] = useState(profile.phone);
  const [phoneError, setPhoneError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const plan = plans.find((p) => p.id === planId)!;
  const method = paymentMethods.find((m) => m.id === methodId)!;

  const handlePay = () => {
    if (methodId === "momo" && phone.replace(/\D/g, "").length < 10) {
      setPhoneError("Enter the 10-digit Mobile Money number that will approve the payment");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.replace("RenewalConfirmation", {
        plan: `${plan.name} Plan`,
        amount: cedi(plan.price),
        method: method.name,
        reference: `RNW-${Date.now().toString().slice(-6)}`,
        validUntil: "28 Oct 2027",
      });
    }, 900);
  };

  return (
    <Screen
      header={<AppHeader title="Renew membership" back />}
      footerSurface
      footer={
        <View style={styles.footer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total to pay</Text>
            <Text style={styles.total}>{cedi(plan.price)}</Text>
          </View>
          <Button label={`Pay ${cedi(plan.price)}`} icon="lock-closed" onPress={handlePay} loading={loading} />
        </View>
      }
    >
      <StepIndicator steps={["Plan", "Payment", "Confirm"]} current={1} />

      <Card>
        <Text style={styles.cardLabel}>Current cover ends</Text>
        <Text style={styles.cardValue}>
          {membership.validUntil} · {membership.daysLeft} days left
        </Text>
        <Text style={styles.cardHint}>Renewing adds 12 months from that date, so you lose no days.</Text>
      </Card>

      <Section title="1. Choose a plan">
        <View style={styles.options} accessibilityRole="radiogroup">
          {plans.map((p) => (
            <OptionCard
              key={p.id}
              title={p.name}
              description={p.description}
              value={`${cedi(p.price)}/yr`}
              tag={p.tag}
              selected={planId === p.id}
              onPress={() => setPlanId(p.id)}
            />
          ))}
        </View>
      </Section>

      <Section title="2. Pay with">
        <View style={styles.options} accessibilityRole="radiogroup">
          {paymentMethods.map((m) => (
            <OptionCard
              key={m.id}
              title={m.name}
              description={m.description}
              icon={m.icon}
              selected={methodId === m.id}
              onPress={() => setMethodId(m.id)}
            />
          ))}
        </View>
        {methodId === "momo" && (
          <TextField
            label="Mobile Money number"
            icon="call-outline"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={(t) => {
              setPhone(t);
              setPhoneError(undefined);
            }}
            helper="You'll get a prompt on this phone to approve with your MoMo PIN."
            error={phoneError}
          />
        )}
      </Section>
    </Screen>
  );
}

const styles = StyleSheet.create({
  options: { gap: spacing.md },
  cardLabel: { color: colors.inkMuted, ...type.caption },
  cardValue: { color: colors.ink, ...type.heading, marginTop: 2 },
  cardHint: { color: colors.inkMuted, ...type.caption, marginTop: spacing.sm },
  footer: {
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  totalRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" },
  totalLabel: { color: colors.inkMuted, ...type.body },
  total: { color: colors.ink, ...type.title },
});
