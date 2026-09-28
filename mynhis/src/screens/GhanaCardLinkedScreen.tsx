import { StyleSheet, Text, View } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { Button, Group, Icon, ListRow, NavBar, Screen, StatusBadge } from "../components/ui";
import { profile } from "../data/dummyData";
import { colors, spacing, type } from "../theme";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function GhanaCardLinkedScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { params } = useRoute<RouteProp<RootStackParamList, "GhanaCardLinked">>();
  const done = () => navigation.reset({ index: 0, routes: [{ name: "Home" }] });

  return (
    <Screen
      navBar={<NavBar title="Ghana Card" right={{ label: "Done", onPress: done, prominent: true }} sheet />}
      footer={
        <View style={styles.footer}>
          <Button label="Back to Home" onPress={done} />
        </View>
      }
    >
      <View style={styles.hero}>
        <Icon name="checkmark-circle" size={88} color={colors.tint} />
        <Text style={styles.title} accessibilityRole="header">
          Ghana Card Linked
        </Text>
        <Text style={styles.subtitle}>Your NHIS membership is now connected to your national ID.</Text>
      </View>

      <Group header="Details">
        <ListRow title="Name" value={profile.name} />
        <ListRow title="Ghana Card" value={params.cardNumber} />
        <ListRow title="NHIS Number" value={profile.nhisNumber} />
        <ListRow title="Status" trailing={<StatusBadge label="Verified" status="success" />} />
      </Group>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: "center", gap: spacing.sm, marginTop: spacing.xl },
  title: { color: colors.label, ...type.title1, textAlign: "center" },
  subtitle: { color: colors.secondaryLabel, ...type.body, textAlign: "center", paddingHorizontal: spacing.lg },
  footer: { paddingHorizontal: spacing.lg },
});
