import { Pressable, StyleSheet, View } from "react-native";
import Icon, { IconName } from "./Icon";
import T from "./T";
import { color, radius, space } from "../theme";

interface NoticeProps {
  title: string;
  message?: string;
  tone?: "warning" | "danger" | "neutral";
  icon?: IconName;
  action?: string;
  onAction?: () => void;
}

const tones = {
  warning: { bg: color.warningSoft, fg: color.warning },
  danger: { bg: color.dangerSoft, fg: color.danger },
  neutral: { bg: color.brandSoft, fg: color.brand },
};

/** A slim inline message. Used for one thing per screen at most. */
export default function Notice({ title, message, tone = "neutral", icon = "info", action, onAction }: NoticeProps) {
  const t = tones[tone];
  return (
    <View style={[styles.box, { backgroundColor: t.bg }]} accessibilityRole="alert">
      <Icon name={icon} size={18} color={t.fg} style={styles.icon} />
      <View style={styles.text}>
        <T v="bodyStrong" c={t.fg}>
          {title}
        </T>
        {message ? (
          <T v="small" c={color.ink}>
            {message}
          </T>
        ) : null}
      </View>
      {action && onAction ? (
        <Pressable onPress={onAction} accessibilityRole="button" hitSlop={10} style={styles.action}>
          <T v="smallStrong" c={t.fg}>
            {action}
          </T>
          <Icon name="arrow-right" size={14} color={t.fg} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  box: { flexDirection: "row", alignItems: "center", gap: space[3], padding: space[4], borderRadius: radius.md },
  icon: { alignSelf: "flex-start", marginTop: 2 },
  text: { flex: 1, gap: 2 },
  action: { flexDirection: "row", alignItems: "center", gap: 4, minHeight: 40 },
});
