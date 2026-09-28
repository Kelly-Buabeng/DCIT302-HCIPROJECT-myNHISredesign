import { useMemo, useState } from "react";
import { LayoutAnimation, Pressable, StyleSheet, Text, View } from "react-native";
import { Group, Icon, Screen, SearchField, TabBar } from "../components/ui";
import { benefits } from "../data/dummyData";
import { colors, hairline, radius, spacing, type } from "../theme";

const tileColors = [colors.blue, colors.teal, colors.indigo, colors.purple, colors.pink, colors.red];

function BenefitRow({ benefit, color, expanded, onToggle, first }: {
  benefit: (typeof benefits)[number];
  color: string;
  expanded: boolean;
  onToggle: () => void;
  first?: boolean;
}) {
  return (
    <View style={styles.row}>
      <Pressable
        onPress={onToggle}
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        accessibilityLabel={`${benefit.title}. ${benefit.summary}`}
        accessibilityHint={expanded ? "Hides details" : "Shows what is included"}
        style={({ pressed }) => [styles.head, pressed && styles.pressed]}
      >
        <View style={[styles.iconSquare, { backgroundColor: color }]}>
          <Icon name={benefit.icon} size={18} color="#FFFFFF" />
        </View>
        <View style={[styles.main, !first && styles.separator]}>
          <View style={styles.text}>
            <Text style={styles.title}>{benefit.title}</Text>
            <Text style={styles.summary}>{benefit.summary}</Text>
          </View>
          <Icon name={expanded ? "chevron-up" : "chevron-down"} size={18} color={colors.tertiaryLabel} />
        </View>
      </Pressable>
      {expanded && (
        <View style={styles.details}>
          {benefit.details.map((d) => (
            <View key={d} style={styles.detail}>
              <Icon name="checkmark-circle" size={18} color={colors.green} />
              <Text style={styles.detailText}>{d}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

export default function BenefitsScreen() {
  const [open, setOpen] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return benefits;
    return benefits.filter((b) => [b.title, b.summary, ...b.details].some((s) => s.toLowerCase().includes(q)));
  }, [query]);

  const toggle = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen((o) => (o === id ? null : id));
  };

  return (
    <Screen largeTitle="Benefits" footer={<TabBar active="Benefits" />} padBottom={false}>
      <SearchField value={query} onChangeText={setQuery} placeholder="Search services" />

      {shown.length === 0 ? (
        <Text style={styles.noResults}>No results for “{query}”. Ask at the facility's NHIS desk.</Text>
      ) : (
        <Group
          header="Covered at accredited facilities"
          footer="Not sure if something is covered? Ask at the facility's NHIS desk before treatment."
        >
          {shown.map((b) => (
            <BenefitRow
              key={b.id}
              benefit={b}
              color={tileColors[benefits.indexOf(b) % tileColors.length]}
              expanded={open === b.id}
              onToggle={() => toggle(b.id)}
            />
          ))}
        </Group>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { backgroundColor: colors.surface },
  head: { flexDirection: "row", alignItems: "center", paddingLeft: spacing.lg },
  pressed: { backgroundColor: "#D1D1D6" },
  iconSquare: {
    width: 29,
    height: 29,
    borderRadius: radius.icon,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  main: { flex: 1, minHeight: 56, flexDirection: "row", alignItems: "center", paddingVertical: 10, paddingRight: spacing.lg },
  separator: { borderTopWidth: hairline, borderTopColor: colors.separator },
  text: { flex: 1, gap: 1 },
  title: { color: colors.label, ...type.body },
  summary: { color: colors.secondaryLabel, ...type.subheadline },
  details: { paddingLeft: 57, paddingRight: spacing.lg, paddingBottom: spacing.md, gap: spacing.sm },
  detail: { flexDirection: "row", gap: spacing.sm, alignItems: "flex-start" },
  detailText: { color: colors.label, ...type.subheadline, flex: 1 },
  noResults: { color: colors.secondaryLabel, ...type.body, textAlign: "center", paddingVertical: spacing.xxl },
});
