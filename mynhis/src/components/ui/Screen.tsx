import { ReactNode } from "react";
import { ScrollView, StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, spacing } from "../../theme";

interface ScreenProps {
  children: ReactNode;
  /** Rendered above the content (e.g. AppHeader). */
  header?: ReactNode;
  /** Pinned below the content (e.g. a primary action or the TabBar). */
  footer?: ReactNode;
  scroll?: boolean;
  /** Set false when the footer handles the bottom safe area itself (TabBar). */
  padBottom?: boolean;
  background?: string;
  /** Paint the footer area white with a top border (sticky checkout bars). */
  footerSurface?: boolean;
}

export default function Screen({
  children,
  header,
  footer,
  scroll = true,
  padBottom = true,
  background = colors.canvas,
  footerSurface = false,
}: ScreenProps) {
  const insets = useSafeAreaInsets();
  const body = scroll ? (
    <ScrollView
      style={styles.flex}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.flex, styles.content]}>{children}</View>
  );

  return (
    <View style={[styles.flex, { backgroundColor: background, paddingTop: insets.top }]}>
      {header}
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        {body}
        {footer ? (
          <View
            style={[
              { paddingBottom: padBottom ? Math.max(insets.bottom, spacing.lg) : 0 },
              footerSurface && styles.footerSurface,
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
  footerSurface: { backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.xl },
});
