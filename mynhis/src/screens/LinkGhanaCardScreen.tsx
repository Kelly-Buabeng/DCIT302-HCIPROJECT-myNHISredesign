import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { Button, FormRow, Group, Icon, NavBar, Screen, StepIndicator } from "../components/ui";
import { profile } from "../data/dummyData";
import { colors, spacing, type } from "../theme";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

/** Formats typed characters as GHA-XXXXXXXXX-X. */
function formatCard(raw: string) {
  const digits = raw.toUpperCase().replace(/^GHA/, "").replace(/\D/g, "").slice(0, 10);
  if (!digits) return raw.toUpperCase().startsWith("G") ? "GHA-" : "";
  return `GHA-${digits.slice(0, 9)}${digits.length > 9 ? `-${digits.slice(9)}` : ""}`;
}

const CARD_PATTERN = /^GHA-\d{9}-\d$/;

export default function LinkGhanaCardScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [step, setStep] = useState<0 | 1>(0);
  const [card, setCard] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const sendCode = () => {
    if (!CARD_PATTERN.test(card)) {
      setError("Enter all 10 digits as shown on your card, e.g. GHA-123456789-0.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(1);
    }, 700);
  };

  const verify = () => {
    if (!/^\d{6}$/.test(code)) {
      setError("The code has 6 digits. Check the SMS and try again.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.replace("GhanaCardLinked", { cardNumber: card });
    }, 700);
  };

  return (
    <Screen
      navBar={
        <NavBar
          title="Link Ghana Card"
          sheet
          left={
            step === 0
              ? "cancel"
              : { label: "Back", onPress: () => { setStep(0); setCode(""); setError(undefined); } }
          }
        />
      }
      footer={
        <View style={styles.footer}>
          {step === 0 ? (
            <Button label="Send Code" onPress={sendCode} loading={loading} />
          ) : (
            <Button label="Verify & Link" onPress={verify} loading={loading} />
          )}
        </View>
      }
    >
      <StepIndicator steps={["Card Number", "Verify", "Done"]} current={step} />

      <View style={styles.hero}>
        <View style={styles.heroIcon}>
          <Icon name={step === 0 ? "id-card" : "chatbubble-ellipses"} size={36} color="#FFFFFF" />
        </View>
        <Text style={styles.title} accessibilityRole="header">
          {step === 0 ? "Enter Your Ghana Card Number" : "Enter the Code"}
        </Text>
        <Text style={styles.body}>
          {step === 0
            ? "It's under your photo on the front of the card."
            : `We sent a 6-digit code by SMS to ${profile.phone.replace(/\d(?=\d{3})/g, "•")}.`}
        </Text>
      </View>

      {step === 0 ? (
        <Group header="Ghana Card Number" footer="Format: GHA-123456789-0" error={error}>
          <FormRow
            label="Ghana Card number"
            hideLabel
            placeholder="GHA-000000000-0"
            value={card}
            onChangeText={(t) => {
              setCard(formatCard(t));
              setError(undefined);
            }}
            autoCapitalize="characters"
            autoCorrect={false}
            maxLength={15}
            invalid={!!error}
          />
        </Group>
      ) : (
        <Group header={`Code for ${card}`} footer="The code expires in 10 minutes." error={error}>
          <FormRow
            label="Verification code"
            hideLabel
            placeholder="6-digit code"
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            maxLength={6}
            value={code}
            onChangeText={(t) => {
              setCode(t.replace(/\D/g, ""));
              setError(undefined);
            }}
            invalid={!!error}
          />
        </Group>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: "center", gap: spacing.sm },
  heroIcon: {
    width: 64,
    height: 64,
    borderRadius: 14,
    backgroundColor: colors.orange,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xs,
  },
  title: { color: colors.label, ...type.title2, textAlign: "center" },
  body: { color: colors.secondaryLabel, ...type.body, textAlign: "center" },
  footer: { paddingHorizontal: spacing.lg },
});
