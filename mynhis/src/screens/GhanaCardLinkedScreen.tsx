import { StyleSheet, Text, View } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { Button, Card, Icon, ListRow, Screen, StatusBadge } from "../components/ui";
import { profile } from "../data/dummyData";
import { colors, spacing, type } from "../theme";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function GhanaCardLinkedScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { params } = useRoute<RouteProp<RootStackParamList, "GhanaCardLinked">>();

  return (
    <Screen
      footer={
        <View style={styles.footer}>
          <Button label="Back to Home" onPress={() => navigation.reset({ index: 0, routes: [{ name: "Home" }] })} />
        </View>
      }
    >
      <View style={styles.hero}>
        <View style={styles.check}>
          <Icon name="id-card" size={40} color={colors.onPrimary} />
        </View>
        <Text style={styles.title} accessibilityRole="header">
          Ghana Card linked
        </Text>
        <Text style={styles.subtitle}>Your NHIS membership is now connected to your national ID.</Text>
      </View>

      <Card padding="none">
        <ListRow title="Name" trailing={profile.name} />
        <ListRow title="Ghana Card" trailing={params.cardNumber} divider />
        <ListRow title="NHIS number" trailing={profile.nhisNumber} divider />
        <ListRow title="Status" trailing={<StatusBadge label="Verified" status="success" />} divider />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: "center", gap: spacing.md, marginTop: spacing.xxl },
  check: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 8,
    borderColor: colors.primarySoft,
  },
  title: { color: colors.ink, ...type.display, textAlign: "center" },
  subtitle: { color: colors.inkMuted, ...type.bodyLarge, textAlign: "center" },
  footer: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm },
});
