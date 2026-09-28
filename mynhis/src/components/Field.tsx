import { useState } from "react";
import { Platform, Pressable, StyleSheet, TextInput, TextInputProps, View } from "react-native";
import Icon, { IconName } from "./Icon";
import T from "./T";
import { color, font, radius, space, touch } from "../theme";

interface FieldProps extends Omit<TextInputProps, "style"> {
  label: string;
  hint?: string;
  error?: string;
  icon?: IconName;
  /** Text shown inside the field before the input, e.g. "+233". */
  prefix?: string;
  secure?: boolean;
}

/** Outlined text field with its label above. Errors appear underneath. */
export default function Field({ label, hint, error, icon, prefix, secure, ...input }: FieldProps) {
  const [focus, setFocus] = useState(false);
  const [hidden, setHidden] = useState(true);
  const border = error ? color.danger : focus ? color.brand : color.lineStrong;

  return (
    <View style={styles.wrap}>
      <T v="smallStrong">{label}</T>
      <View style={[styles.box, { borderColor: border, borderWidth: focus || error ? 1.5 : 1 }]}>
        {icon ? <Icon name={icon} size={18} color={focus ? color.brand : color.ink2} /> : null}
        {prefix ? (
          <T v="body" c={color.ink2}>
            {prefix}
          </T>
        ) : null}
        <TextInput
          {...input}
          accessibilityLabel={label}
          accessibilityHint={error ?? hint}
          secureTextEntry={secure ? hidden : false}
          placeholderTextColor={color.ink2}
          selectionColor={color.brand}
          onFocus={(e) => {
            setFocus(true);
            input.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocus(false);
            input.onBlur?.(e);
          }}
          style={styles.input}
        />
        {secure ? (
          <Pressable
            onPress={() => setHidden((h) => !h)}
            accessibilityRole="button"
            accessibilityLabel={hidden ? "Show password" : "Hide password"}
            style={styles.eye}
          >
            <Icon name={hidden ? "eye" : "eye-off"} size={18} color={color.ink2} />
          </Pressable>
        ) : null}
      </View>
      {error ? (
        <View style={styles.msg}>
          <Icon name="alert-circle" size={14} color={color.danger} />
          <T v="small" c={color.danger} style={styles.flex}>
            {error}
          </T>
        </View>
      ) : hint ? (
        <T v="small" c={color.ink2}>
          {hint}
        </T>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: space[2] },
  box: {
    minHeight: 54,
    flexDirection: "row",
    alignItems: "center",
    gap: space[3],
    paddingLeft: space[4],
    paddingRight: space[1],
    borderRadius: radius.md,
    backgroundColor: color.surface,
  },
  input: {
    flex: 1,
    minWidth: 0,
    fontFamily: font.regular,
    fontSize: 16,
    color: color.ink,
    paddingVertical: 14,
    paddingRight: space[3],
    ...(Platform.OS === "web" ? ({ outlineStyle: "none" } as object) : null),
  },
  eye: { width: touch, height: touch, alignItems: "center", justifyContent: "center" },
  msg: { flexDirection: "row", gap: 6, alignItems: "flex-start" },
  flex: { flex: 1 },
});
