import { ReactNode } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { color, space } from "../theme";

interface ScreenProps {
  children: ReactNode;
  /** Sits above the scroll area (TopBar). */
  top?: ReactNode;
  /** Scrolls with the content, full-bleed, above the padded body (a brand header). */
  hero?: ReactNode;
  /** Pinned under the content (TabBar or an action bar). */
  bottom?: ReactNode;
  /** Bottom already handles the safe area (TabBar). */
  bottomHandlesInset?: boolean;
  /** Paint the bottom area white with a hairline (sticky action bars). */
  bottomSurface?: boolean;
  /** Background behind the status bar; brand for hero screens. */
  statusBg?: string;
  scroll?: boolean;
}

export default function Screen({
  children,
  top,
  hero,
  bottom,
  bottomHandlesInset,
  bottomSurface,
  statusBg = color.bg,
  scroll = true,
}: ScreenProps) {
  const insets = useSafeAreaInsets();
  const body = <View style={styles.body}>{children}</View>;

  return (
    <View style={[styles.flex, { backgroundColor: color.bg }]}>
      <View style={{ height: insets.top, backgroundColor: statusBg }} />
      {top}
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        {scroll ? (
          <ScrollView style={styles.flex} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            {hero}
            {body}
          </ScrollView>
        ) : (
          <View style={styles.flex}>
            {hero}
            {body}
          </View>
        )}
        {bottom ? (
          <View
            style={[
              { paddingBottom: bottomHandlesInset ? 0 : Math.max(insets.bottom, space[4]) },
              bottomSurface && styles.bottomSurface,
            ]}
          >
            {bottom}
          </View>
        ) : (
          <View style={{ height: insets.bottom }} />
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  bottomSurface: { backgroundColor: color.surface, borderTopWidth: 1, borderTopColor: color.line },
  body: { paddingHorizontal: space[5], paddingTop: space[6], paddingBottom: space[10], gap: space[8] },
});
