import { useRef, useState } from "react";
import { Platform, Pressable, StyleSheet, TextInput, View } from "react-native";
import T from "./T";
import { color, font, radius } from "../theme";

interface CodeInputProps {
  value: string;
  onChange: (v: string) => void;
  length?: number;
  error?: boolean;
  label: string;
}

/** One-time code: separate boxes over a single hidden input (keeps paste + SMS autofill working). */
export default function CodeInput({ value, onChange, length = 6, error, label }: CodeInputProps) {
  const ref = useRef<TextInput>(null);
  const [focus, setFocus] = useState(false);
  return (
    <Pressable onPress={() => ref.current?.focus()} accessible={false}>
      <View style={styles.row}>
        {Array.from({ length }).map((_, i) => {
          const current = focus && i === Math.min(value.length, length - 1);
          return (
            <View
              key={i}
              style={[
                styles.box,
                current && { borderColor: color.brand, borderWidth: 1.5 },
                error && { borderColor: color.danger },
              ]}
            >
              <T v="title">{value[i] ?? ""}</T>
            </View>
          );
        })}
      </View>
      <TextInput
        ref={ref}
        value={value}
        onChangeText={(t) => onChange(t.replace(/\D/g, "").slice(0, length))}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="one-time-code"
        maxLength={length}
        accessibilityLabel={label}
        style={styles.hidden}
        autoFocus
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 8, justifyContent: "space-between" },
  box: {
    flex: 1,
    maxWidth: 52,
    height: 60,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: color.lineStrong,
    backgroundColor: color.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  hidden: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.011,
    color: "transparent",
    fontFamily: font.regular,
    ...(Platform.OS === "web" ? ({ outlineStyle: "none", caretColor: "transparent" } as object) : null),
  },
});
