import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { Banner, Button, Icon, Screen, TextField } from "../components/ui";
import { colors, radius, spacing, type } from "../theme";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Demo accounts — any password works.
const DEMO_IDS = ["kwame", "321098765432", "nhis123456789", "emmanuel", "mensah"];

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ id?: string; password?: string; form?: string }>({});
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    const next: typeof errors = {};
    if (!id.trim()) next.id = "Enter your NHIS number or username";
    if (!password.trim()) next.password = "Enter your password";
    setErrors(next);
    if (next.id || next.password) return;

    const normalised = id.replace(/[\s-]/g, "").toLowerCase();
    if (!DEMO_IDS.includes(normalised)) {
      setErrors({ form: "We couldn't find an account with those details. Check them and try again." });
      return;
    }
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
          <Button label="Log in" onPress={handleLogin} loading={loading} />
          <View style={styles.signup}>
            <Text style={styles.muted}>New to myNHIS?</Text>
            <Pressable
              onPress={() => Alert.alert("Create account", "To register, visit any NHIS district office with your Ghana Card. You can then log in here.")}
              accessibilityRole="link"
              hitSlop={12}
            >
              <Text style={styles.link}>Create an account</Text>
            </Pressable>
          </View>
        </View>
      }
    >
      <View style={styles.brand}>
        <View style={styles.logo}>
          <Icon name="medical" size={28} color={colors.onPrimary} />
        </View>
        <Text style={styles.brandName}>myNHIS</Text>
      </View>

      <View style={styles.intro}>
        <Text style={styles.title} accessibilityRole="header">
          Welcome back
        </Text>
        <Text style={styles.subtitle}>Log in to see your card, renew your membership and track claims.</Text>
      </View>

      {errors.form ? <Banner tone="danger" title="Login failed" message={errors.form} /> : null}

      <View style={styles.form}>
        <TextField
          label="NHIS number or username"
          placeholder="e.g. 3210 9876 5432"
          icon="card-outline"
          value={id}
          onChangeText={(t) => {
            setId(t);
            if (errors.id || errors.form) setErrors({});
          }}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          error={errors.id}
        />
        <TextField
          label="Password"
          placeholder="Your password"
          icon="lock-closed-outline"
          secure
          value={password}
          onChangeText={(t) => {
            setPassword(t);
            if (errors.password || errors.form) setErrors({});
          }}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="go"
          onSubmitEditing={handleLogin}
          error={errors.password}
        />
        <Pressable
          onPress={() => Alert.alert("Reset password", "We'll send a reset code by SMS to the phone number on your NHIS record.")}
          accessibilityRole="link"
          hitSlop={12}
          style={styles.forgot}
        >
          <Text style={styles.link}>Forgot password?</Text>
        </Pressable>
      </View>

      <View style={styles.hint}>
        <Icon name="information-circle-outline" size={18} color={colors.inkMuted} />
        <Text style={styles.hintText}>Demo: use “kwame” with any password.</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  brand: { flexDirection: "row", alignItems: "center", gap: spacing.md, marginTop: spacing.xl },
  logo: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  brandName: { color: colors.primary, ...type.title },
  intro: { gap: spacing.sm },
  title: { color: colors.ink, ...type.display },
  subtitle: { color: colors.inkMuted, ...type.bodyLarge },
  form: { gap: spacing.lg },
  forgot: { alignSelf: "flex-end", paddingVertical: spacing.xs },
  link: { color: colors.primary, ...type.label, fontSize: 15 },
  footer: { paddingHorizontal: spacing.lg, gap: spacing.lg, paddingTop: spacing.sm },
  signup: { flexDirection: "row", justifyContent: "center", gap: spacing.xs, flexWrap: "wrap" },
  muted: { color: colors.inkMuted, ...type.body },
  hint: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  hintText: { color: colors.inkMuted, ...type.caption },
});
