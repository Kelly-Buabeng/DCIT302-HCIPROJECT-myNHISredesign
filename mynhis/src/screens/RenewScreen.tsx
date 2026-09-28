import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../navigation/types";
import { Button, Field, Icon, Option, Screen, Steps, T, TopBar } from "../components";
import { member, networks, plans } from "../data/mock";
import { color, space } from "../theme";

const cedi = (n: number) => `GH₵ ${n.toFixed(2)}`;
const STEP_NAMES = ["Choose plan", "Payment", "Approve"];

export default function RenewScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStack>>();
  const [step, setStep] = useState(0);
  const [planId, setPlanId] = useState("standard");
  const [networkId, setNetworkId] = useState("mtn");
  const [phone, setPhone] = useState(member.phone);
  const [phoneError, setPhoneError] = useState<string>();

  const plan = plans.find((p) => p.id === planId)!;
  const network = networks.find((n) => n.id === networkId)!;

  // Step 3 simulates the MoMo approval prompt, then shows the receipt.
  useEffect(() => {
    if (step !== 2) return;
    const t = setTimeout(() => {
      navigation.replace("RenewDone", {
        plan: plan.name,
        amount: cedi(plan.price),
        network: network.name,
        reference: `RNW-${Date.now().toString().slice(-6)}`,
        validUntil: "28 Oct 2027",
      });
    }, 2500);
    return () => clearTimeout(t);
  }, [step]);

  const pay = () => {
    if (phone.replace(/\D/g, "").length !== 10) {
      setPhoneError("Enter the 10-digit number registered for Mobile Money.");
      return;
    }
    setStep(2);
  };

  const back = () => (step === 0 ? navigation.goBack() : setStep(step - 1));

  const bottom =
    step === 0 ? (
      <View style={styles.bottom}>
        <Button label={`Continue · ${cedi(plan.price)}`} onPress={() => setStep(1)} />
      </View>
    ) : step === 1 ? (
      <View style={styles.bottom}>
        <Button label={`Pay ${cedi(plan.price)}`} icon="lock" onPress={pay} />
      </View>
    ) : undefined;

  return (
    <Screen
      top={<TopBar title="Renew" leading={step === 0 ? "close" : step === 1 ? "back" : "none"} onLeading={back} />}
      bottom={bottom}
      bottomSurface
    >
      <Steps total={3} current={step} label={STEP_NAMES[step]} />

      {step === 0 && (
        <>
          <View style={styles.head}>
            <T v="title" accessibilityRole="header">
              Choose your plan
            </T>
            <T v="body" c={color.ink2}>
              Your cover ends {member.validUntil}. Renewing adds a full year from that date.
            </T>
          </View>
          <View style={styles.options} accessibilityRole="radiogroup">
            {plans.map((p) => (
              <Option
                key={p.id}
                title={p.name}
                subtitle={p.detail}
                value={cedi(p.price)}
                note={p.name === member.plan ? "Your plan" : undefined}
                selected={planId === p.id}
                onPress={() => setPlanId(p.id)}
              />
            ))}
          </View>
        </>
      )}

      {step === 1 && (
        <>
          <View style={styles.amount}>
            <T v="small" c={color.ink2}>
              {plan.name} plan · 12 months
            </T>
            <T v="hero" style={styles.num}>
              {cedi(plan.price)}
            </T>
          </View>
          <View style={styles.block}>
            <T v="heading">Pay with Mobile Money</T>
            <View style={styles.options} accessibilityRole="radiogroup">
              {networks.map((n) => (
                <Option key={n.id} title={n.name} icon="smartphone" selected={networkId === n.id} onPress={() => setNetworkId(n.id)} />
              ))}
            </View>
          </View>
          <Field
            label="Mobile Money number"
            value={phone}
            onChangeText={(t) => {
              setPhone(t);
              setPhoneError(undefined);
            }}
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            hint="You'll get a prompt on this phone to approve with your PIN."
            error={phoneError}
          />
        </>
      )}

      {step === 2 && (
        <View style={styles.waiting} accessibilityLiveRegion="polite">
          <View style={styles.phoneIcon}>
            <Icon name="smartphone" size={30} color={color.brand} />
          </View>
          <T v="title" center accessibilityRole="header">
            Check your phone
          </T>
          <T v="body" c={color.ink2} center>
            Approve the {cedi(plan.price)} request from NHIA on {phone} with your {network.name} PIN.
          </T>
          <ActivityIndicator color={color.brand} style={styles.spinner} />
          <T v="small" c={color.ink2} center>
            Waiting for approval…
          </T>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  head: { gap: space[2], marginBottom: -space[3] },
  options: { gap: space[3] },
  amount: { alignItems: "center", gap: space[1], paddingVertical: space[2] },
  num: { fontVariant: ["tabular-nums"] },
  block: { gap: space[3] },
  waiting: { alignItems: "center", gap: space[3], paddingTop: space[10], paddingHorizontal: space[4] },
  phoneIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: color.brandSoft,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: space[2],
  },
  spinner: { marginTop: space[6] },
  bottom: { paddingHorizontal: space[5], paddingTop: space[3] },
});
