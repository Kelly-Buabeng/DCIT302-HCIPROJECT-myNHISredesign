import { Platform, Pressable, StyleSheet, TextInput, View } from "react-native";
import Icon from "./Icon";
import { colors, radius, spacing, type } from "../../theme";

interface SearchFieldProps {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
}

/** iOS search bar: grey rounded field with a magnifying glass and clear button. */
export default function SearchField({ value, onChangeText, placeholder = "Search" }: SearchFieldProps) {
  return (
    <View style={styles.field}>
      <Icon name="search" size={17} color={colors.secondaryLabel} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        selectionColor={colors.tint}
        accessibilityLabel={placeholder}
        returnKeyType="search"
        autoCorrect={false}
        style={styles.input}
      />
      {value ? (
        <Pressable onPress={() => onChangeText("")} accessibilityRole="button" accessibilityLabel="Clear search" hitSlop={10}>
          <Icon name="close-circle" size={17} color={colors.tertiaryLabel} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    minHeight: 36,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.control,
    backgroundColor: colors.fill,
  },
  input: {
    flex: 1,
    color: colors.label,
    ...type.body,
    paddingVertical: 7,
    ...(Platform.OS === "web" ? ({ outlineStyle: "none" } as object) : null),
  },
});
