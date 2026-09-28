import { useState } from "react";
import { Platform, Pressable, StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import Icon from "./Icon";
import { colors, hairline, spacing, touchTarget, type } from "../../theme";

interface FormRowProps extends Omit<TextInputProps, "style"> {
  /** Shown on the left like iOS Settings forms, and read by screen readers. */
  label: string;
  /** Hide the left label when the Group header already names the field. */
  hideLabel?: boolean;
  /** Adds a show/hide button for passwords and PINs. */
  secure?: boolean;
  /** Marks the row as invalid (put the message in the Group's `error`). */
  invalid?: boolean;
  /** Injected by Group. */
  first?: boolean;
}

/** A text field row for use inside a Group. */
export default function FormRow({ label, hideLabel, secure, invalid, first, ...input }: FormRowProps) {
  const [hidden, setHidden] = useState(true);
  const [focused, setFocused] = useState(false);
  const hasText = !!input.value;

  return (
    <View style={styles.row}>
      <View style={[styles.main, !first && styles.separator]}>
        {!hideLabel && (
          <Text style={[styles.label, invalid && { color: colors.red }]} numberOfLines={1}>
            {label}
          </Text>
        )}
        <TextInput
          {...input}
          accessibilityLabel={label}
          secureTextEntry={secure ? hidden : false}
          placeholderTextColor={colors.placeholder}
          selectionColor={colors.tint}
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
        {secure ? (
          <Pressable
            onPress={() => setHidden((h) => !h)}
            accessibilityRole="button"
            accessibilityLabel={hidden ? "Show password" : "Hide password"}
            style={styles.accessory}
          >
            <Icon name={hidden ? "eye-outline" : "eye-off-outline"} size={20} color={colors.secondaryLabel} />
          </Pressable>
        ) : hasText && focused && input.editable !== false ? (
          <Pressable
            onPress={() => input.onChangeText?.("")}
            accessibilityRole="button"
            accessibilityLabel={`Clear ${label}`}
            style={styles.accessory}
          >
            <Icon name="close-circle" size={18} color={colors.tertiaryLabel} />
          </Pressable>
        ) : invalid ? (
          <View style={styles.accessory}>
            <Icon name="alert-circle" size={20} color={colors.red} />
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { paddingLeft: spacing.lg, backgroundColor: colors.surface },
  main: { minHeight: 48, flexDirection: "row", alignItems: "center", gap: spacing.md, paddingRight: spacing.xs },
  separator: { borderTopWidth: hairline, borderTopColor: colors.separator },
  label: { width: 112, color: colors.label, ...type.body },
  input: {
    flex: 1,
    minWidth: 0,
    color: colors.label,
    ...type.body,
    paddingVertical: 12,
    ...(Platform.OS === "web" ? ({ outlineStyle: "none" } as object) : null),
  },
  accessory: { width: touchTarget, height: touchTarget, alignItems: "center", justifyContent: "center" },
});
