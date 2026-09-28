import { useState } from "react";
import { Platform, Pressable, StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import Icon, { IconName } from "./Icon";
import { colors, radius, spacing, touchTarget, type } from "../../theme";

interface TextFieldProps extends Omit<TextInputProps, "style"> {
  /** Always-visible label above the input (never rely on placeholder alone). */
  label: string;
  helper?: string;
  error?: string;
  icon?: IconName;
  /** Adds a show/hide toggle for passwords and PINs. */
  secure?: boolean;
}

export default function TextField({ label, helper, error, icon, secure, ...input }: TextFieldProps) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(true);
  const borderColor = error ? colors.danger : focused ? colors.primary : colors.borderStrong;

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.field, { borderColor, borderWidth: focused || error ? 2 : 1 }]}>
        {icon && <Icon name={icon} size={20} color={focused ? colors.primary : colors.inkSubtle} />}
        <TextInput
          {...input}
          accessibilityLabel={label}
          accessibilityHint={error ?? helper}
          secureTextEntry={secure ? hidden : false}
          placeholderTextColor={colors.inkSubtle}
          onFocus={(e) => {
            setFocused(true);
            input.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            input.onBlur?.(e);
          }}
          style={styles.input}
        />
        {secure && (
          <Pressable
            onPress={() => setHidden((h) => !h)}
            accessibilityRole="button"
            accessibilityLabel={hidden ? "Show password" : "Hide password"}
            style={styles.toggle}
          >
            <Icon name={hidden ? "eye-outline" : "eye-off-outline"} size={22} color={colors.inkMuted} />
          </Pressable>
        )}
      </View>
      {error ? (
        <View style={styles.msgRow}>
          <Icon name="alert-circle" size={16} color={colors.danger} />
          <Text style={[styles.msg, { color: colors.danger }]}>{error}</Text>
        </View>
      ) : helper ? (
        <Text style={styles.msg}>{helper}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: spacing.sm },
  label: { color: colors.ink, ...type.label },
  field: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingLeft: spacing.lg,
    paddingRight: spacing.xs,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
  },
  input: {
    flex: 1,
    color: colors.ink,
    ...type.bodyLarge,
    paddingVertical: spacing.md,
    paddingRight: spacing.md,
    // The field border already shows focus; drop the browser's second outline on web.
    ...(Platform.OS === "web" ? ({ outlineStyle: "none" } as object) : null),
  },
  toggle: { width: touchTarget, height: touchTarget, alignItems: "center", justifyContent: "center" },
  msgRow: { flexDirection: "row", alignItems: "center", gap: spacing.xs },
  msg: { color: colors.inkMuted, ...type.caption, flexShrink: 1 },
});
