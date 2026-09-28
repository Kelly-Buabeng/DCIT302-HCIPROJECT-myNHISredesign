import { Children, cloneElement, isValidElement, ReactElement, ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "./Icon";
import { colors, radius, spacing, type } from "../../theme";

interface GroupProps {
  /** Small uppercase header above the group (iOS section header). */
  header?: string;
  /** Explanatory text under the group (iOS section footer). */
  footer?: string;
  /** Shows the footer as an error in red with an icon. */
  error?: string;
  children: ReactNode;
}

/**
 * An iOS inset grouped list section. Put ListRow, FormRow or ChoiceRow inside;
 * separators are drawn between rows automatically.
 */
export default function Group({ header, footer, error, children }: GroupProps) {
  const rows = Children.toArray(children).filter(isValidElement) as ReactElement<{ first?: boolean }>[];
  return (
    <View>
      {header ? (
        <Text style={styles.header} accessibilityRole="header">
          {header.toUpperCase()}
        </Text>
      ) : null}
      <View style={styles.group}>{rows.map((row, i) => cloneElement(row, { first: i === 0 }))}</View>
      {error ? (
        <View style={styles.errorRow} accessibilityRole="alert">
          <Icon name="alert-circle" size={15} color={colors.red} />
          <Text style={[styles.footer, styles.error]}>{error}</Text>
        </View>
      ) : footer ? (
        <Text style={[styles.footer, styles.footerPad]}>{footer}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    color: colors.secondaryLabel,
    ...type.footnote,
    paddingHorizontal: spacing.lg,
    paddingBottom: 7,
  },
  group: { backgroundColor: colors.surface, borderRadius: radius.control, overflow: "hidden" },
  footer: { color: colors.secondaryLabel, ...type.footnote },
  footerPad: { paddingHorizontal: spacing.lg, paddingTop: 7 },
  errorRow: { flexDirection: "row", gap: 6, paddingHorizontal: spacing.lg, paddingTop: 7, alignItems: "flex-start" },
  error: { color: colors.red, flex: 1 },
});
