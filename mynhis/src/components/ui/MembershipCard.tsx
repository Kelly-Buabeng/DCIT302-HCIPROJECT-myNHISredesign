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

/** The digital NHIS card. Shown on Home (compact) and My Card. */
export default function MembershipCard({ name, nhisNumber, plan, validUntil, active, masked }: MembershipCardProps) {
  const shown = masked ? `•••• •••• ${nhisNumber.slice(-4)}` : nhisNumber;
  return (
    <View
      style={styles.card}
      accessible
      accessibilityLabel={`NHIS membership card for ${name}. ${plan}. Number ${masked ? "hidden" : nhisNumber}. Valid until ${validUntil}. ${active ? "Active" : "Expired"}.`}
    >
      {/* Decorative shapes: a gold arc and a lighter disc, echoing the design-system cover */}
      <View style={styles.discLarge} />
      <View style={styles.arc} />

      <View style={styles.top}>
        <View style={styles.brand}>
          <View style={styles.logo}>
            <Icon name="medical" size={16} color={colors.primary} />
          </View>
          <View>
            <Text style={styles.brandName}>myNHIS</Text>
            <Text style={styles.brandSub}>National Health Insurance</Text>
          </View>
        </View>
        <View style={styles.status}>
          <Icon name={active ? "checkmark-circle" : "close-circle"} size={14} color={colors.onGold} />
          <Text style={styles.statusText}>{active ? "ACTIVE" : "EXPIRED"}</Text>
        </View>
      </View>

      <View style={styles.middle}>
        <Text style={styles.overline}>NHIS NUMBER</Text>
        <Text style={styles.number}>{shown}</Text>
      </View>

      <View style={styles.bottom}>
        <View style={styles.flex}>
          <Text style={styles.overline}>MEMBER</Text>
          <Text style={styles.value} numberOfLines={1}>
            {name}
          </Text>
        </View>
        <View>
          <Text style={styles.overline}>VALID UNTIL</Text>
          <Text style={styles.value}>{validUntil}</Text>
        </View>
      </View>
      <Text style={styles.plan}>{plan}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.lg,
    overflow: "hidden",
    minHeight: 200,
    ...shadow.raised,
  },
  discLarge: {
    position: "absolute",
    right: -60,
    top: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.primaryPressed,
  },
  arc: {
    position: "absolute",
    right: -70,
    bottom: -110,
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 14,
    borderColor: colors.gold,
    opacity: 0.9,
  },
  top: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  brand: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  logo: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  brandName: { color: colors.onPrimary, ...type.label, fontSize: 15 },
  brandSub: { color: colors.onPrimaryMuted, ...type.caption, fontSize: 11, lineHeight: 14 },
  status: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.gold,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  statusText: { color: colors.onGold, ...type.overline, fontSize: 11 },
  middle: { gap: 2 },
  overline: { color: colors.onPrimaryMuted, ...type.overline, fontSize: 11 },
  number: { color: colors.onPrimary, fontSize: 22, lineHeight: 28, fontWeight: "700", letterSpacing: 1.5 },
  bottom: { flexDirection: "row", gap: spacing.lg },
  flex: { flex: 1 },
  value: { color: colors.onPrimary, ...type.label, fontSize: 15 },
  plan: { color: colors.onPrimaryMuted, ...type.caption },
});
