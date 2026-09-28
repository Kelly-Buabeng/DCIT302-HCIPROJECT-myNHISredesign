import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { AppHeader, Card, Chip, Icon, Screen, StatusBadge, TabBar } from "../components/ui";
import { claims, ClaimStatus, claimStatusTone } from "../data/dummyData";
import { colors, radius, spacing, type } from "../theme";

const filters: ("All" | ClaimStatus)[] = ["All", "Pending", "Processing", "Approved"];

export default function ClaimsScreen() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const shown = useMemo(() => (filter === "All" ? claims : claims.filter((c) => c.status === filter)), [filter]);

  return (
    <Screen header={<AppHeader title="Claims" />} footer={<TabBar active="Claims" />} padBottom={false}>
      <Text style={styles.intro}>
        Claims are filed by the hospital or pharmacy when you use your NHIS card. Track their progress here.
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips} accessibilityRole="tablist">
        {filters.map((f) => (
          <Chip
            key={f}
            label={f}
            selected={filter === f}
            count={f === "All" ? claims.length : claims.filter((c) => c.status === f).length}
            onPress={() => setFilter(f)}
          />
        ))}
      </ScrollView>

      <View style={styles.list}>
        {shown.length === 0 ? (
          <Card>
            <View style={styles.empty}>
              <Icon name="document-outline" size={32} color={colors.inkSubtle} />
              <Text style={styles.emptyTitle}>No {filter.toLowerCase()} claims</Text>
              <Text style={styles.emptyText}>Try another filter.</Text>
            </View>
          </Card>
        ) : (
          shown.map((c) => (
            <Card key={c.id}>
              <View style={styles.top}>
                <StatusBadge label={c.status} status={claimStatusTone[c.status]} />
                <Text style={styles.amount}>{c.amount}</Text>
              </View>
              <Text style={styles.facility}>{c.facility}</Text>
              <Text style={styles.service}>{c.service}</Text>
              <View style={styles.meta}>
                <View style={styles.metaItem}>
                  <Icon name="calendar-outline" size={14} color={colors.inkMuted} />
                  <Text style={styles.metaText}>{c.date}</Text>
                </View>
                <Text style={styles.metaText}>Ref {c.id}</Text>
              </View>
            </Card>
          ))
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  intro: { color: colors.inkMuted, ...type.body },
  chips: { gap: spacing.sm },
  list: { gap: spacing.md },
  top: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.md },
  amount: { color: colors.ink, ...type.heading },
  facility: { color: colors.ink, ...type.body, fontWeight: "600" },
  service: { color: colors.inkMuted, ...type.caption },
  meta: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  metaItem: { flexDirection: "row", alignItems: "center", gap: spacing.xs },
  metaText: { color: colors.inkMuted, ...type.caption },
  empty: { alignItems: "center", gap: spacing.sm, paddingVertical: spacing.xl, borderRadius: radius.md },
  emptyTitle: { color: colors.ink, ...type.label },
  emptyText: { color: colors.inkMuted, ...type.caption },
});
