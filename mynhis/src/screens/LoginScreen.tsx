import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RootStack } from "../navigation/types";
import { Button, Field, Icon, Notice, T } from "../components";
import { color, radius, space } from "../theme";

// Demo accounts — any password works.
const DEMO_IDS = ["kwame", "321098765432", "0241234567"];

export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStack>>();
  const insets = useSafeAreaInsets();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ id?: string; password?: string; form?: string }>({});
  const [loading, setLoading] = useState(false);

  const logIn = () => {
    const next: typeof errors = {};
    if (!id.trim()) next.id = "Enter your NHIS number or phone number.";
    if (!password.trim()) next.password = "Enter your password.";
    if (next.id || next.password) return setErrors(next);
    if (!DEMO_IDS.includes(id.replace(/[\s-]/g, "").toLowerCase())) {
      return setErrors({ form: "Those details don't match an account. Check them and try again." });
    }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.reset({ index: 0, routes: [{ name: "Home" }] });
    }, 600);
  };

  return (
    <View style={styles.root}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={styles.grow} keyboardShouldPersistTaps="handled" bounces={false}>
          <View style={[styles.brand, { paddingTop: insets.top + space[10] }]}>
            <View style={styles.logo}>
              <Icon name="plus" size={26} color={color.brand} />
            </View>
            <T v="hero" c={color.onBrand}>
              myNHIS
            </T>
            <T v="body" c={color.onBrandMuted}>
              Your health cover, in your pocket.
            </T>
          </View>

          <View style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, space[6]) }]}>
            <T v="title" accessibilityRole="header">
              Log in
            </T>

            {errors.form ? <Notice tone="danger" icon="alert-circle" title="Couldn't log you in" message={errors.form} /> : null}

            <Field
              label="NHIS number or phone"
              placeholder="e.g. 3210 9876 5432"
              value={id}
              onChangeText={(t) => {
                setId(t);
                setErrors({});
              }}
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="username"
              error={errors.id}
            />
            <View style={styles.gapSm}>
              <Field
                label="Password"
                placeholder="Your password"
                secure
                value={password}
                onChangeText={(t) => {
                  setPassword(t);
                  setErrors({});
                }}
                autoCapitalize="none"
                textContentType="password"
                onSubmitEditing={logIn}
                returnKeyType="go"
                error={errors.password}
              />
              <Pressable
                onPress={() => Alert.alert("Reset password", "We'll text a reset code to the phone number on your NHIS record.")}
                accessibilityRole="button"
                hitSlop={10}
                style={styles.forgot}
              >
                <T v="smallStrong" c={color.brand} style={styles.underline}>
                  Forgot password?
                </T>
              </Pressable>
            </View>

            <View style={styles.actions}>
              <Button label="Log in" onPress={logIn} loading={loading} />
              <Button
                variant="secondary"
                label="Create an account"
                onPress={() => Alert.alert("Create an account", "Register at any NHIS district office with your Ghana Card, then log in here.")}
              />
            </View>

            <T v="small" c={color.ink2} center>
              Demo: “kwame” with any password
            </T>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: color.brand },
  flex: { flex: 1 },
  grow: { flexGrow: 1 },
  brand: { paddingHorizontal: space[6], paddingBottom: space[10], gap: space[2] },
  logo: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: color.gold,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: space[4],
  },
  sheet: {
    flexGrow: 1,
    backgroundColor: color.bg,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    paddingHorizontal: space[5],
    paddingTop: space[8],
    gap: space[5],
  },
  gapSm: { gap: space[2] },
  forgot: { alignSelf: "flex-end", paddingVertical: space[1] },
  underline: { textDecorationLine: "underline" },
  actions: { gap: space[3], marginTop: space[2] },
});
