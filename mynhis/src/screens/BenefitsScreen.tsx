import { useState } from "react";
import { LayoutAnimation, Pressable, StyleSheet, Text, View } from "react-native";
import { AppHeader, Banner, Card, Icon, Screen, TabBar } from "../components/ui";
import { benefits } from "../data/dummyData";
import { colors, radius, spacing, type } from "../theme";

export default function BenefitsScreen() {
  const [open, setOpen] = useState<string | null>(null);

  const toggle = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen((o) => (o === id ? null : id));
  };

  return (
    <Screen header={<AppHeader title="Benefits" />} footer={<TabBar active="Benefits" />} padBottom={false}>
      <Text style={styles.intro}>What your NHIS membership pays for at accredited hospitals, clinics and pharmacies.</Text>

      <Card padding="none">
        {benefits.map((b, i) => {
          const expanded = open === b.id;
          return (
            <View key={b.id} style={i > 0 && styles.divider}>
              <Pressable
                onPress={() => toggle(b.id)}
                accessibilityRole="button"
                accessibilityState={{ expanded }}
                accessibilityLabel={`${b.title}. ${b.summary}`}
                accessibilityHint={expanded ? "Hides details" : "Shows what is included"}
                style={({ pressed }) => [styles.row, pressed && { backgroundColor: colors.primarySoft }]}
              >
                <View style={styles.tile}>
                  <Icon name={b.icon} size={22} color={colors.primary} />
                </View>
                <View style={styles.text}>
                  <Text style={styles.title}>{b.title}</Text>
                  <Text style={styles.summary}>{b.summary}</Text>
                </View>
                <Icon name={expanded ? "chevron-up" : "chevron-down"} size={20} color={colors.inkMuted} />
              </Pressable>
              {expanded && (
                <View style={styles.details}>
                  {b.details.map((d) => (
                    <View key={d} style={styles.detail}>
                      <Icon name="checkmark-circle" size={18} color={colors.success} />
                      <Text style={styles.detailText}>{d}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          );
        })}
      </Card>

      <Banner
        tone="info"
        title="Not sure if something is covered?"
        message="Ask at the facility's NHIS desk before treatment, or call the NHIA helpline."
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  intro: { color: colors.inkMuted, ...type.body },
  divider: { borderTopWidth: 1, borderTopColor: colors.border },
  row: { flexDirection: "row", alignItems: "center", gap: spacing.md, padding: spacing.lg, minHeight: 64 },
  tile: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  text: { flex: 1, gap: 2 },
  title: { color: colors.ink, ...type.body, fontWeight: "600" },
  summary: { color: colors.inkMuted, ...type.caption },
  details: { paddingLeft: 76, paddingRight: spacing.lg, paddingBottom: spacing.lg, gap: spacing.sm },
  detail: { flexDirection: "row", gap: spacing.sm, alignItems: "flex-start" },
  detailText: { color: colors.ink, ...type.body, flex: 1 },
});
