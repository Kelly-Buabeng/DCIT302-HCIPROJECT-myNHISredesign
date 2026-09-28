import { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Group, Icon, Screen, SegmentedControl, StatusBadge, TabBar } from "../components/ui";
import { claims, ClaimStatus, claimStatusTone } from "../data/dummyData";
import { colors, hairline, spacing, type } from "../theme";

type Filter = "All" | ClaimStatus;

const segments: { value: Filter; label: string }[] = [
  { value: "All", label: "All" },
  { value: "Pending", label: "Pending" },
  { value: "Processing", label: "Processing" },
  { value: "Approved", label: "Approved" },
];

function ClaimRow({ claim, first }: { claim: (typeof claims)[number]; first?: boolean }) {
  return (
    <View
      style={styles.row}
      accessible
      accessibilityLabel={`${claim.facility}, ${claim.service}, ${claim.amount}, ${claim.date}, status ${claim.status}`}
    >
      <View style={[styles.rowInner, !first && styles.separator]}>
        <View style={styles.rowTop}>
          <Text style={styles.facility} numberOfLines={1}>
            {claim.facility}
          </Text>
          <Text style={styles.amount}>{claim.amount}</Text>
        </View>
        <Text style={styles.meta}>
          {claim.service} · {claim.date}
        </Text>
        <View style={styles.rowBottom}>
          <StatusBadge label={claim.status} status={claimStatusTone[claim.status]} />
          <Text style={styles.ref}>{claim.id}</Text>
        </View>
      </View>
    </View>
  );
}

export default function ClaimsScreen() {
  const [filter, setFilter] = useState<Filter>("All");
  const shown = useMemo(() => (filter === "All" ? claims : claims.filter((c) => c.status === filter)), [filter]);

  return (
    <Screen largeTitle="Claims" footer={<TabBar active="Claims" />} padBottom={false}>
      <SegmentedControl segments={segments} selected={filter} onChange={setFilter} />

      {shown.length === 0 ? (
        <View style={styles.empty}>
          <Icon name="document-text-outline" size={48} color={colors.tertiaryLabel} />
          <Text style={styles.emptyTitle}>No {filter} Claims</Text>
          <Text style={styles.emptyText}>Claims appear here when a facility bills NHIS for your care.</Text>
        </View>
      ) : (
        <Group
          header={`${shown.length} ${shown.length === 1 ? "claim" : "claims"}`}
          footer="Hospitals and pharmacies file claims when you use your NHIS card. Approved claims are paid to the facility, not to you."
        >
          {shown.map((c) => (
            <ClaimRow key={c.id} claim={c} />
          ))}
        </Group>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { paddingLeft: spacing.lg, backgroundColor: colors.surface },
  rowInner: { paddingVertical: spacing.md, paddingRight: spacing.lg, gap: 3 },
  separator: { borderTopWidth: hairline, borderTopColor: colors.separator },
  rowTop: { flexDirection: "row", justifyContent: "space-between", gap: spacing.md },
  facility: { flex: 1, color: colors.label, ...type.headline },
  amount: { color: colors.label, ...type.body, fontVariant: ["tabular-nums"] },
  meta: { color: colors.secondaryLabel, ...type.subheadline },
  rowBottom: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 6 },
  ref: { color: colors.secondaryLabel, ...type.footnote },
  empty: { alignItems: "center", gap: spacing.sm, paddingVertical: 64, paddingHorizontal: spacing.xl },
  emptyTitle: { color: colors.label, ...type.title3 },
  emptyText: { color: colors.secondaryLabel, ...type.subheadline, textAlign: "center" },
});
