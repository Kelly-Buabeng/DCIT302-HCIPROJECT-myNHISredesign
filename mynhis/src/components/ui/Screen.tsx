import { ReactNode } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, spacing, type } from "../../theme";

interface ScreenProps {
  children: ReactNode;
  /** iOS large title shown at the top of the scroll content (tab screens). */
  largeTitle?: string;
  /** Small grey line above the large title, e.g. today's date. */
  overline?: string;
  /** Element beside the large title, e.g. an Avatar button. */
  titleAccessory?: ReactNode;
  /** A NavBar for pushed/modal screens. */
  navBar?: ReactNode;
  /** Pinned below the content (a TabBar or a toolbar with the main action). */
  footer?: ReactNode;
  /** Set false when the footer handles the bottom safe area itself (TabBar). */
  padBottom?: boolean;
  /** Paint the footer as a translucent toolbar with a hairline on top. */
  toolbar?: boolean;
  scroll?: boolean;
}

export default function Screen({
  children,
  largeTitle,
  overline,
  titleAccessory,
  navBar,
  footer,
  padBottom = true,
  toolbar = false,
  scroll = true,
}: ScreenProps) {
  const insets = useSafeAreaInsets();

  const title = largeTitle ? (
    <View style={styles.titleRow}>
      <View style={styles.flex}>
        {overline ? <Text style={styles.overline}>{overline}</Text> : null}
        <Text style={styles.largeTitle} accessibilityRole="header">
          {largeTitle}
        </Text>
      </View>
      {titleAccessory}
    </View>
  ) : null;

  const content = (
    <>
      {title}
      {children}
    </>
  );

  return (
    <View style={[styles.flex, styles.bg, { paddingTop: navBar ? 0 : insets.top }]}>
      {navBar}
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        {scroll ? (
          <ScrollView
            style={styles.flex}
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            contentInsetAdjustmentBehavior="automatic"
          >
            {content}
          </ScrollView>
        ) : (
          <View style={[styles.flex, styles.content]}>{content}</View>
        )}
        {footer ? (
          <View
            style={[
              toolbar && styles.toolbar,
              { paddingBottom: padBottom ? Math.max(insets.bottom, spacing.lg) : 0 },
            ]}
          >
            {footer}
          </View>
        ) : padBottom ? (
          <View style={{ height: insets.bottom }} />
        ) : null}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  bg: { backgroundColor: colors.background },
  content: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.xxl, gap: spacing.xl + 4 },
  titleRow: { flexDirection: "row", alignItems: "flex-end", gap: spacing.md, marginTop: spacing.sm, marginBottom: -spacing.sm },
  overline: { color: colors.secondaryLabel, ...type.footnote, fontWeight: "600", textTransform: "uppercase" },
  largeTitle: { color: colors.label, ...type.largeTitle },
  toolbar: {
    backgroundColor: colors.barBackground,
    borderTopWidth: 0.5,
    borderTopColor: colors.separator,
    paddingTop: spacing.md,
  },
});
