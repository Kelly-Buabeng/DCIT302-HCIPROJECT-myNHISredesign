import { StyleSheet, View } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStack } from "../navigation/types";
import { Card, Icon, Row, Screen, StatusText, T, TopBar } from "../components";
import { claims, claimStages, claimTone } from "../data/mock";
import { color, space } from "../theme";

export default function ClaimDetailScreen() {
  const { params } = useRoute<RouteProp<RootStack, "ClaimDetail">>();
  const claim = claims.find((c) => c.id === params.id)!;
  const reached = claimStages.indexOf(claim.status);

  return (
    <Screen top={<TopBar title="Claim" />}>
      <View style={styles.summary}>
        <View style={styles.icon}>
          <Icon name={claim.icon} size={22} color={color.brand} />
        </View>
        <T v="small" c={color.ink2} center>
          {claim.facility}
        </T>
        <T v="hero" center style={styles.num}>
          {claim.amount}
        </T>
        <StatusText label={claim.status} tone={claimTone[claim.status]} />
      </View>

      <View style={styles.section}>
        <T v="heading" accessibilityRole="header">
          Progress
        </T>
        <Card>
          {claimStages.map((stage, i) => {
            const done = i <= reached;
            const entry = claim.history.find((h) => h.stage === stage);
            const last = i === claimStages.length - 1;
            return (
              <View key={stage} style={styles.step} accessible accessibilityLabel={`${stage}, ${done ? `done ${entry?.date ?? ""}` : "not yet"}`}>
                <View style={styles.rail}>
                  <View style={[styles.node, done && styles.nodeOn]}>{done ? <Icon name="check" size={12} color={color.onBrand} /> : null}</View>
                  {!last ? <View style={[styles.line, i < reached && styles.lineOn]} /> : null}
                </View>
                <View style={styles.stepText}>
                  <T v="bodyStrong" c={done ? color.ink : color.ink2}>
                    {stage}
                  </T>
                  <T v="small" c={color.ink2}>
                    {entry ? entry.date : "Waiting"}
                  </T>
                </View>
              </View>
            );
          })}
        </Card>
        <T v="small" c={color.ink2}>
          NHIS pays the facility directly. You don't need to do anything.
        </T>
      </View>

      <View style={styles.section}>
        <T v="heading" accessibilityRole="header">
          Details
        </T>
        <Card padding="flush">
          <Row label="Service" value={claim.service} />
          <Row label="Patient" value={claim.patient} divider />
          <Row label="Date of visit" value={claim.date} divider />
          <Row label="Reference" value={claim.id} divider />
        </Card>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  summary: { alignItems: "center", gap: space[2], paddingTop: space[2] },
  icon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: color.brandSoft,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: space[1],
  },
  num: { fontVariant: ["tabular-nums"] },
  section: { gap: space[3] },
  step: { flexDirection: "row", gap: space[3] },
  rail: { alignItems: "center", width: 22 },
  node: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: color.lineStrong,
    backgroundColor: color.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  nodeOn: { backgroundColor: color.brand, borderColor: color.brand },
  line: { width: 2, flex: 1, minHeight: 22, backgroundColor: color.line },
  lineOn: { backgroundColor: color.brand },
  stepText: { flex: 1, paddingBottom: space[4], gap: 2, marginTop: 1 },
});
