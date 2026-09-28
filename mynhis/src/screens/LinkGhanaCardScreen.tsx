import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { AppHeader, Banner, Button, Card, Icon, Screen, StepIndicator, TextField } from "../components/ui";
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
      setError("Enter all 10 digits as shown on your card, e.g. GHA-123456789-0");
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
      header={<AppHeader title="Link Ghana Card" back />}
      footer={
        <View style={styles.footer}>
          {step === 0 ? (
            <Button label="Send verification code" icon="chatbubble-ellipses-outline" onPress={sendCode} loading={loading} />
          ) : (
            <>
              <Button label="Verify and link" icon="shield-checkmark-outline" onPress={verify} loading={loading} />
              <Button variant="ghost" label="Use a different card number" onPress={() => { setStep(0); setCode(""); setError(undefined); }} />
            </>
          )}
        </View>
      }
    >
      <StepIndicator steps={["Card number", "Verify", "Done"]} current={step} />

      {step === 0 ? (
        <>
          <View style={styles.intro}>
            <Text style={styles.title} accessibilityRole="header">
              Enter your Ghana Card number
            </Text>
            <Text style={styles.body}>
              Linking lets hospitals confirm who you are with one card, and keeps your NHIS record up to date.
            </Text>
          </View>
          <Card style={styles.sample}>
            <Icon name="id-card-outline" size={28} color={colors.primary} />
            <Text style={styles.sampleText}>
              Find the number under your photo on the front of the card:{"\n"}
              <Text style={styles.mono}>GHA-123456789-0</Text>
            </Text>
          </Card>
          <TextField
            label="Ghana Card number"
            placeholder="GHA-000000000-0"
            icon="id-card-outline"
            value={card}
            onChangeText={(t) => {
              setCard(formatCard(t));
              setError(undefined);
            }}
            autoCapitalize="characters"
            autoCorrect={false}
            maxLength={15}
            error={error}
          />
        </>
      ) : (
        <>
          <View style={styles.intro}>
            <Text style={styles.title} accessibilityRole="header">
              Enter the 6-digit code
            </Text>
            <Text style={styles.body}>
              We sent it by SMS to {profile.phone.replace(/\d(?=\d{3})/g, "•")}, the number registered with NIA.
            </Text>
          </View>
          <Banner tone="info" title={`Card ${card}`} message="The code expires in 10 minutes." />
          <TextField
            label="Verification code"
            placeholder="000000"
            icon="keypad-outline"
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            maxLength={6}
            value={code}
            onChangeText={(t) => {
              setCode(t.replace(/\D/g, ""));
              setError(undefined);
            }}
            error={error}
          />
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  intro: { gap: spacing.sm },
  title: { color: colors.ink, ...type.title },
  body: { color: colors.inkMuted, ...type.body },
  sample: { flexDirection: "row", gap: spacing.md, alignItems: "center" },
  sampleText: { color: colors.inkMuted, ...type.caption, flex: 1 },
  mono: { color: colors.ink, fontWeight: "700", letterSpacing: 1 },
  footer: { gap: spacing.sm, paddingHorizontal: spacing.lg, paddingTop: spacing.sm },
});
