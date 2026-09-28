import { StyleSheet, View } from "react-native";
import Icon from "./Icon";
import T from "./T";
import { color, radius, space } from "../theme";

interface MemberCardProps {
  name: string;
  nhisNumber: string;
  plan: string;
  validUntil: string;
  daysLeft: number;
  /** Days in a membership year, to draw the progress bar. */
  termDays?: number;
  masked?: boolean;
}

/** The NHIS card, designed to sit on the brand header. */
export default function MemberCard({ name, nhisNumber, plan, validUntil, daysLeft, termDays = 365, masked = true }: MemberCardProps) {
  const shown = masked ? `${nhisNumber.slice(0, 4)} •••• ${nhisNumber.slice(-4)}` : nhisNumber;
  const used = Math.min(1, Math.max(0, 1 - daysLeft / termDays));
  return (
    <View
      style={styles.card}
      accessible
      accessibilityLabel={`NHIS card. ${name}. ${plan}. Number ${masked ? "partly hidden" : nhisNumber}. Active, valid until ${validUntil}, ${daysLeft} days left.`}
    >
      <View style={styles.top}>
        <View style={styles.brand}>
          <View style={styles.logo}>
            <Icon name="plus" size={14} color={color.brand} />
          </View>
          <T v="smallStrong" c={color.onBrand}>
            NHIS · {plan}
          </T>
        </View>
        <View style={styles.status}>
          <View style={styles.dot} />
          <T v="label" c={color.onBrand}>
            Active
          </T>
        </View>
      </View>

      <View style={styles.numberBlock}>
        <T v="label" c={color.onBrandMuted}>
          Membership number
        </T>
        <T v="title" c={color.onBrand} style={styles.number}>
          {shown}
        </T>
      </View>

      <View style={styles.meta}>
        <T v="small" c={color.onBrandMuted}>
          {name}
        </T>
        <T v="small" c={color.onBrandMuted}>
          Valid to {validUntil}
        </T>
      </View>

      <View style={styles.track} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        <View style={[styles.fill, { width: `${used * 100}%` }]} />
      </View>
      <T v="smallStrong" c={color.gold}>
        {daysLeft} days left
      </T>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: color.brandRaised,
    borderRadius: radius.lg,
    padding: space[5],
    gap: space[4],
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
  },
  top: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  brand: { flexDirection: "row", alignItems: "center", gap: space[2] },
  logo: {
    width: 24,
    height: 24,
    borderRadius: 7,
    backgroundColor: color.onBrand,
    alignItems: "center",
    justifyContent: "center",
  },
  status: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
    backgroundColor: "rgba(255,255,255,0.10)",
  },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: color.gold },
  numberBlock: { gap: 4 },
  number: { letterSpacing: 1, fontVariant: ["tabular-nums"] },
  meta: { flexDirection: "row", justifyContent: "space-between" },
  track: { height: 4, borderRadius: 2, backgroundColor: "rgba(255,255,255,0.14)", overflow: "hidden", marginBottom: -6 },
  fill: { height: 4, borderRadius: 2, backgroundColor: color.gold },
});
