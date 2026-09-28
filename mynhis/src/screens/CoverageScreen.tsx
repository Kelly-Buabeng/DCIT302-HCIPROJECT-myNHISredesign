import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Card, Icon, Screen, Sheet, T, TabBar } from "../components";
import { coverage, notCovered } from "../data/mock";
import { color, radius, space } from "../theme";

export default function CoverageScreen() {
  const [open, setOpen] = useState<(typeof coverage)[number] | null>(null);

  return (
    <Screen bottom={<TabBar active="Coverage" />} bottomHandlesInset>
      <View style={styles.head}>
        <T v="title" accessibilityRole="header">
          Coverage
        </T>
        <T v="body" c={color.ink2}>
          What your NHIS membership pays for at accredited hospitals, clinics and pharmacies.
        </T>
      </View>

      <View style={styles.grid}>
        {coverage.map((c) => (
          <Pressable
            key={c.id}
            onPress={() => setOpen(c)}
            accessibilityRole="button"
            accessibilityLabel={`${c.title}. ${c.summary}`}
            accessibilityHint="Shows what is included"
            style={({ pressed }) => [styles.tile, pressed && { borderColor: color.lineStrong }]}
          >
            <View style={styles.tileIcon}>
              <Icon name={c.icon} size={18} color={color.brand} />
            </View>
            <View style={styles.tileText}>
              <T v="bodyStrong">{c.title}</T>
              <T v="small" c={color.ink2}>
                {c.summary}
              </T>
            </View>
          </Pressable>
        ))}
      </View>

      <View style={styles.section}>
        <T v="heading" accessibilityRole="header">
          Not covered
        </T>
        <Card>
          <View style={styles.list}>
            {notCovered.map((n) => (
              <View key={n} style={styles.item}>
                <Icon name="minus-circle" size={16} color={color.ink2} style={styles.itemIcon} />
                <T v="body" style={styles.flex}>
                  {n}
                </T>
              </View>
            ))}
          </View>
        </Card>
        <T v="small" c={color.ink2}>
          Not sure? Ask the NHIS desk at the facility before treatment.
        </T>
      </View>

      <Sheet visible={!!open} onClose={() => setOpen(null)} title={open?.title ?? ""}>
        <T v="body" c={color.ink2}>
          {open?.summary}. Included:
        </T>
        <View style={styles.list}>
          {open?.items.map((i) => (
            <View key={i} style={styles.item}>
              <Icon name="check" size={16} color={color.success} style={styles.itemIcon} />
              <T v="body" style={styles.flex}>
                {i}
              </T>
            </View>
          ))}
        </View>
      </Sheet>
    </Screen>
  );
}

const styles = StyleSheet.create({
  head: { gap: space[1], marginBottom: -space[3] },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: space[3] },
  tile: {
    flexBasis: "47%",
    flexGrow: 1,
    minHeight: 124,
    padding: space[4],
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: color.line,
    backgroundColor: color.surface,
    gap: space[4],
  },
  tileIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: color.brandSoft, alignItems: "center", justifyContent: "center" },
  tileText: { gap: 2 },
  section: { gap: space[3] },
  list: { gap: space[3] },
  item: { flexDirection: "row", gap: space[3], alignItems: "flex-start" },
  itemIcon: { marginTop: 3 },
  flex: { flex: 1 },
});
