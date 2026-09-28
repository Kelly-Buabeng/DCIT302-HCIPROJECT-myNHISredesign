import { StyleSheet, Text, View } from "react-native";
import Icon from "./Icon";
import { colors, radius, shadow, spacing, type } from "../../theme";

interface MembershipCardProps {
  name: string;
  nhisNumber: string;
  plan: string;
  validUntil: string;
  active: boolean;
  /** Hide the number (e.g. in public) — shows only the last 4 digits. */
  masked?: boolean;
}

/** The NHIS card as a Wallet-style pass: header strip, primary field, secondary fields. */
export default function MembershipCard({ name, nhisNumber, plan, validUntil, active, masked }: MembershipCardProps) {
  const shown = masked ? `•••• •••• ${nhisNumber.slice(-4)}` : nhisNumber;
  return (
    <View
      style={styles.pass}
      accessible
      accessibilityLabel={`NHIS membership card for ${name}. ${plan}. Number ${masked ? "hidden" : nhisNumber}. Valid until ${validUntil}. ${active ? "Active" : "Expired"}.`}
    >
      <View style={styles.header}>
        <View style={styles.logo}>
          <Icon name="medical" size={15} color={colors.pass} />
        </View>
        <Text style={styles.brand}>NHIS Ghana</Text>
        <View style={styles.headerField}>
          <Text style={styles.fieldLabel}>STATUS</Text>
          <View style={styles.statusRow}>
            <View style={[styles.dot, { backgroundColor: active ? colors.passAccent : colors.red }]} />
            <Text style={styles.headerValue}>{active ? "Active" : "Expired"}</Text>
          </View>
        </View>
      </View>

      <View style={styles.primary}>
        <Text style={styles.fieldLabel}>MEMBER</Text>
        <Text style={styles.primaryValue} numberOfLines={1}>
          {name}
        </Text>
      </View>

      <View style={styles.secondary}>
        <View style={styles.flex}>
          <Text style={styles.fieldLabel}>NHIS NUMBER</Text>
          <Text style={styles.value}>{shown}</Text>
        </View>
        <View>
          <Text style={[styles.fieldLabel, styles.right]}>VALID UNTIL</Text>
          <Text style={[styles.value, styles.right]}>{validUntil}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.plan}>{plan}</Text>
        <View style={styles.stripe} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pass: {
    backgroundColor: colors.pass,
    borderRadius: radius.card,
    padding: spacing.lg,
    gap: spacing.lg,
    overflow: "hidden",
    ...shadow.pass,
  },
  header: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  logo: {
    width: 28,
    height: 28,
    borderRadius: 7,
    backgroundColor: colors.onPass,
    alignItems: "center",
    justifyContent: "center",
  },
  brand: { flex: 1, color: colors.onPass, ...type.headline },
  headerField: { alignItems: "flex-end" },
  statusRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  headerValue: { color: colors.onPass, ...type.subheadline, fontWeight: "600" },
  fieldLabel: { color: colors.onPassMuted, ...type.caption2, fontWeight: "600", letterSpacing: 0.6 },
  primary: { gap: 2, marginTop: spacing.sm },
  primaryValue: { color: colors.onPass, ...type.title1, fontWeight: "400" },
  secondary: { flexDirection: "row", gap: spacing.lg },
  flex: { flex: 1 },
  value: { color: colors.onPass, ...type.body, fontVariant: ["tabular-nums"] },
  right: { textAlign: "right" },
  footer: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  plan: { color: colors.onPassMuted, ...type.footnote },
  stripe: { flex: 1, height: 3, borderRadius: 2, backgroundColor: colors.passAccent },
});
