import { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../navigation/types";
import { ActivityRow, Card, Icon, Pills, Screen, T, TabBar } from "../components";
import { claims, claimTone } from "../data/mock";
import { color, space } from "../theme";

type Filter = "all" | "open" | "paid";

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "open", label: "In progress" },
  { value: "paid", label: "Paid" },
];

const isOpen = (s: string) => s !== "Paid" && s !== "Rejected";

export default function ClaimsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStack>>();
  const [filter, setFilter] = useState<Filter>("all");

  const shown = useMemo(
    () => claims.filter((c) => (filter === "all" ? true : filter === "open" ? isOpen(c.status) : c.status === "Paid")),
    [filter],
  );
  const months = [...new Set(shown.map((c) => c.month))];
  const total = claims.reduce((sum, c) => sum + parseFloat(c.amount.replace(/[^\d.]/g, "")), 0);
  const open = claims.filter((c) => isOpen(c.status)).length;

  return (
    <Screen bottom={<TabBar active="Claims" />} bottomHandlesInset>
      <View style={styles.head}>
        <T v="title" accessibilityRole="header">
          Claims
        </T>
        <T v="body" c={color.ink2}>
          What NHIS has paid for your care this year.
        </T>
      </View>

      <Card>
        <View style={styles.stats}>
          <View style={styles.stat}>
            <T v="small" c={color.ink2}>
              Covered this year
            </T>
            <T v="title" style={styles.num}>
              GH₵ {total.toFixed(2)}
            </T>
          </View>
          <View style={styles.vr} />
          <View style={styles.stat}>
            <T v="small" c={color.ink2}>
              In progress
            </T>
            <T v="title" style={styles.num}>
              {open}
            </T>
          </View>
        </View>
      </Card>

      <View style={styles.list}>
        <Pills options={filters} value={filter} onChange={setFilter} />

        {shown.length === 0 ? (
          <View style={styles.empty}>
            <Icon name="inbox" size={28} color={color.ink2} />
            <T v="bodyStrong">Nothing here yet</T>
            <T v="small" c={color.ink2} center>
              Claims appear when a hospital or pharmacy bills NHIS for your care.
            </T>
          </View>
        ) : (
          months.map((m) => (
            <View key={m} style={styles.month}>
              <T v="label" c={color.ink2}>
                {m.toUpperCase()}
              </T>
              <Card padding="flush">
                {shown
                  .filter((c) => c.month === m)
                  .map((c, i) => (
                    <ActivityRow
                      key={c.id}
                      icon={c.icon}
                      title={c.facility}
                      subtitle={`${c.service} · ${c.date}`}
                      amount={c.amount}
                      status={{ label: c.status, tone: claimTone[c.status] }}
                      onPress={() => navigation.navigate("ClaimDetail", { id: c.id })}
                      divider={i > 0}
                    />
                  ))}
              </Card>
            </View>
          ))
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  head: { gap: space[1], marginBottom: -space[3] },
  stats: { flexDirection: "row", alignItems: "center" },
  stat: { flex: 1, gap: 2 },
  num: { fontVariant: ["tabular-nums"] },
  vr: { width: 1, alignSelf: "stretch", backgroundColor: color.line, marginHorizontal: space[4] },
  list: { gap: space[5] },
  month: { gap: space[2] },
  empty: { alignItems: "center", gap: space[2], paddingVertical: space[10], paddingHorizontal: space[6] },
});
