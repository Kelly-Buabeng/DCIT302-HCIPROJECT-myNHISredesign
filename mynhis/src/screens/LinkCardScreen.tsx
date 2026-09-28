import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../navigation/types";
import { Button, Card, CodeInput, Field, Icon, Screen, Steps, T, TopBar } from "../components";
import { member } from "../data/mock";
import { color, space } from "../theme";

/** Formats typing as GHA-XXXXXXXXX-X. */
function formatCard(raw: string) {
  const digits = raw.toUpperCase().replace(/^GHA/, "").replace(/\D/g, "").slice(0, 10);
  if (!digits) return raw.toUpperCase().startsWith("G") ? "GHA-" : "";
  return `GHA-${digits.slice(0, 9)}${digits.length > 9 ? `-${digits.slice(9)}` : ""}`;
}

const CARD = /^GHA-\d{9}-\d$/;

export default function LinkCardScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStack>>();
  const [step, setStep] = useState<0 | 1>(0);
  const [card, setCard] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const maskedPhone = member.phone.replace(/\d(?=(?:\D*\d){3})/g, "•");

  const sendCode = () => {
    if (!CARD.test(card)) return setError("Enter all 10 digits as they appear on your card.");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setError(undefined);
      setStep(1);
    }, 700);
  };

  const verify = () => {
    if (code.length !== 6) return setError("Enter the 6-digit code from the SMS.");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.replace("LinkDone", { cardNumber: card });
    }, 700);
  };

  return (
    <Screen
      top={
        <TopBar
          title="Link Ghana Card"
          leading={step === 0 ? "close" : "back"}
          onLeading={step === 0 ? undefined : () => { setStep(0); setCode(""); setError(undefined); }}
        />
      }
      bottom={
        <View style={styles.bottom}>
          {step === 0 ? (
            <Button label="Send code" onPress={sendCode} loading={loading} />
          ) : (
            <Button label="Verify and link" onPress={verify} loading={loading} />
          )}
        </View>
      }
    >
      <Steps total={2} current={step} label={step === 0 ? "Card number" : "Verify"} />

      {step === 0 ? (
        <>
          <View style={styles.head}>
            <T v="title" accessibilityRole="header">
              Your Ghana Card number
            </T>
            <T v="body" c={color.ink2}>
              Linking lets any hospital confirm who you are with one card.
            </T>
          </View>
          <Card style={styles.sample}>
            <View style={styles.cardArt}>
              <View style={styles.photo} />
              <View style={styles.lines}>
                <View style={[styles.line, { width: "70%" }]} />
                <View style={[styles.line, { width: "50%" }]} />
                <T v="label" c={color.brand}>
                  GHA-123456789-0
                </T>
              </View>
            </View>
            <T v="small" c={color.ink2} style={styles.flex}>
              The number is on the front, under your photo.
            </T>
          </Card>
          <Field
            label="Ghana Card number"
            placeholder="GHA-000000000-0"
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
          <View style={styles.head}>
            <T v="title" accessibilityRole="header">
              Enter the code
            </T>
            <T v="body" c={color.ink2}>
              We sent a 6-digit code to {maskedPhone}, the number NIA has for {card}.
            </T>
          </View>
          <CodeInput
            label="6-digit verification code"
            value={code}
            onChange={(v) => {
              setCode(v);
              setError(undefined);
            }}
            error={!!error}
          />
          {error ? (
            <View style={styles.err}>
              <Icon name="alert-circle" size={14} color={color.danger} />
              <T v="small" c={color.danger}>
                {error}
              </T>
            </View>
          ) : null}
          <Pressable onPress={() => setCode("")} accessibilityRole="button" style={styles.resend} hitSlop={8}>
            <T v="smallStrong" c={color.brand} style={styles.underline}>
              Resend code
            </T>
          </Pressable>
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  head: { gap: space[2], marginBottom: -space[3] },
  sample: { flexDirection: "row", alignItems: "center", gap: space[4] },
  cardArt: {
    width: 120,
    height: 76,
    borderRadius: 10,
    backgroundColor: color.brandSoft,
    padding: 8,
    flexDirection: "row",
    gap: 8,
  },
  photo: { width: 32, height: 40, borderRadius: 4, backgroundColor: color.surface },
  lines: { flex: 1, gap: 5, justifyContent: "flex-end" },
  line: { height: 4, borderRadius: 2, backgroundColor: color.surface },
  flex: { flex: 1 },
  err: { flexDirection: "row", gap: 6, alignItems: "center", marginTop: -space[5] },
  resend: { alignSelf: "center", marginTop: -space[3], minHeight: 44, justifyContent: "center" },
  underline: { textDecorationLine: "underline" },
  bottom: { paddingHorizontal: space[5], paddingTop: space[3] },
});
