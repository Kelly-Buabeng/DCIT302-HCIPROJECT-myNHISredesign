import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { Button, ChoiceRow, FormRow, Group, NavBar, Screen, StepIndicator } from "../components/ui";
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
      setPhoneError("Enter the 10-digit Mobile Money number that will approve the payment.");
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
      navBar={<NavBar title="Renew Membership" left="cancel" sheet />}
      toolbar
      footer={
        <View style={styles.footer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.total}>{cedi(plan.price)}</Text>
          </View>
          <Button label={`Pay ${cedi(plan.price)}`} icon="lock-closed" onPress={handlePay} loading={loading} />
        </View>
      }
    >
      <StepIndicator steps={["Plan", "Payment", "Confirm"]} current={1} />

      <Group
        header="Plan"
        footer={`Your cover ends ${membership.validUntil}. Renewing adds 12 months from that date, so you lose no days.`}
      >
        {plans.map((p) => (
          <ChoiceRow
            key={p.id}
            title={p.tag ? `${p.name} (current)` : p.name}
            subtitle={p.description}
            value={cedi(p.price)}
            selected={planId === p.id}
            onPress={() => setPlanId(p.id)}
          />
        ))}
      </Group>

      <Group header="Pay With">
        {paymentMethods.map((m) => (
          <ChoiceRow
            key={m.id}
            icon={m.icon}
            iconColor={m.id === "momo" ? colors.orange : colors.blue}
            title={m.name}
            subtitle={m.description}
            selected={methodId === m.id}
            onPress={() => setMethodId(m.id)}
          />
        ))}
      </Group>

      {methodId === "momo" && (
        <Group
          header="Mobile Money Number"
          footer="You'll get a prompt on this phone to approve with your MoMo PIN."
          error={phoneError}
        >
          <FormRow
            label="Mobile Money number"
            hideLabel
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            value={phone}
            onChangeText={(t) => {
              setPhone(t);
              setPhoneError(undefined);
            }}
            invalid={!!phoneError}
          />
        </Group>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  footer: { gap: spacing.md, paddingHorizontal: spacing.lg },
  totalRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" },
  totalLabel: { color: colors.secondaryLabel, ...type.body },
  total: { color: colors.label, ...type.title2, fontVariant: ["tabular-nums"] },
});
