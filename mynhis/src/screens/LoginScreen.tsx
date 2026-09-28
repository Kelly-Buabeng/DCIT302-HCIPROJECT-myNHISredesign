import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { Button, FormRow, Group, Icon, Screen } from "../components/ui";
import { colors, spacing, type } from "../theme";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Demo accounts — any password works.
const DEMO_IDS = ["kwame", "321098765432", "nhis123456789", "emmanuel", "mensah"];

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{ field?: "id" | "password"; message: string }>();
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!id.trim()) return setError({ field: "id", message: "Enter your NHIS number or username." });
    if (!password.trim()) return setError({ field: "password", message: "Enter your password." });

    const normalised = id.replace(/[\s-]/g, "").toLowerCase();
    if (!DEMO_IDS.includes(normalised)) {
      return setError({ message: "We couldn't find an account with those details. Check them and try again." });
    }
    setError(undefined);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.reset({ index: 0, routes: [{ name: "Home" }] });
    }, 600);
  };

  return (
    <Screen
      footer={
        <View style={styles.footer}>
          <Button label="Log In" onPress={handleLogin} loading={loading} />
          <Button
            variant="plain"
            label="Create Account"
            onPress={() => Alert.alert("Create Account", "To register, visit any NHIS district office with your Ghana Card. You can then log in here.")}
          />
        </View>
      }
    >
      <View style={styles.hero}>
        <View style={styles.appIcon}>
          <Icon name="medical" size={44} color={colors.onTint} />
        </View>
        <Text style={styles.title} accessibilityRole="header">
          myNHIS
        </Text>
        <Text style={styles.subtitle}>Your health cover, card and claims in one place.</Text>
      </View>

      <Group error={error?.message} footer="Demo: use “kwame” with any password.">
        <FormRow
          label="NHIS No."
          placeholder="3210 9876 5432"
          value={id}
          onChangeText={(t) => {
            setId(t);
            setError(undefined);
          }}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          textContentType="username"
          invalid={error?.field === "id" || (!!error && !error.field)}
        />
        <FormRow
          label="Password"
          placeholder="Required"
          secure
          value={password}
          onChangeText={(t) => {
            setPassword(t);
            setError(undefined);
          }}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="go"
          textContentType="password"
          onSubmitEditing={handleLogin}
          invalid={error?.field === "password"}
        />
      </Group>

      <View style={styles.forgot}>
        <Button
          variant="plain"
          size="small"
          label="Forgot Password?"
          onPress={() => Alert.alert("Reset Password", "We'll send a reset code by SMS to the phone number on your NHIS record.")}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: "center", gap: spacing.sm, marginTop: 56 },
  appIcon: {
    width: 88,
    height: 88,
    borderRadius: 20,
    backgroundColor: colors.tint,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  title: { color: colors.label, ...type.title1 },
  subtitle: { color: colors.secondaryLabel, ...type.body, textAlign: "center", paddingHorizontal: spacing.xl },
  forgot: { alignItems: "center", marginTop: -spacing.md },
  footer: { paddingHorizontal: spacing.lg, gap: spacing.xs },
});
