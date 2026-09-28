import { Platform } from "react-native";

// myNHIS design tokens — follows Apple's iOS Human Interface Guidelines:
// grouped backgrounds, system text styles, 44pt targets, inset grouped lists.
// Colours use Apple's "increased contrast" variants so text meets WCAG AA.

export const colors = {
  // Brand tint (the app's accent, like an iOS app's tintColor)
  tint: "#1C7A35",           // NHIS green: buttons, links, selected state, active tab
  tintPressed: "#145C27",
  tintSoft: "#E3F1E7",       // tinted button fill, selected segment glow
  onTint: "#FFFFFF",

  // Backgrounds (iOS grouped style)
  background: "#F2F2F7",     // systemGroupedBackground
  surface: "#FFFFFF",        // secondarySystemGroupedBackground: list groups, cards
  fill: "#E3E3E8",           // tertiarySystemFill: search field, segmented track
  barBackground: "rgba(249,249,249,0.94)", // translucent nav/tab bars

  // Text
  label: "#000000",
  secondaryLabel: "#636366", // subtitles, group headers/footers
  tertiaryLabel: "#8E8E93",  // chevrons and decorative glyphs only (not text)
  placeholder: "#636366",

  separator: "#C6C6C8",

  // System colours (accessible variants)
  green: "#1C7A35",
  red: "#D70015",
  orange: "#C93400",
  blue: "#0040DD",
  indigo: "#3634A3",
  purple: "#8944AB",
  teal: "#0071A4",
  pink: "#D30F45",
  gray: "#7C7C80",

  // Soft fills for status capsules
  greenSoft: "#E3F1E7",
  redSoft: "#FFE5E8",
  orangeSoft: "#FFF0E5",
  blueSoft: "#E5ECFF",

  // Wallet-style membership pass
  pass: "#0B5E3A",
  passAccent: "#F4B400",
  onPass: "#FFFFFF",
  onPassMuted: "#CFE6D8",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 32,
};

export const radius = {
  icon: 7,       // Settings-style icon squares
  control: 10,   // inset grouped lists, fields, search
  button: 12,    // large buttons
  card: 16,      // membership pass, tiles
  pill: 999,
};

// iOS Dynamic Type default ("Large") sizes.
export const type = {
  largeTitle: { fontSize: 34, lineHeight: 41, fontWeight: "700" as const, letterSpacing: 0.37 },
  title1: { fontSize: 28, lineHeight: 34, fontWeight: "700" as const, letterSpacing: 0.36 },
  title2: { fontSize: 22, lineHeight: 28, fontWeight: "700" as const, letterSpacing: 0.35 },
  title3: { fontSize: 20, lineHeight: 25, fontWeight: "600" as const, letterSpacing: 0.38 },
  headline: { fontSize: 17, lineHeight: 22, fontWeight: "600" as const, letterSpacing: -0.41 },
  body: { fontSize: 17, lineHeight: 22, fontWeight: "400" as const, letterSpacing: -0.41 },
  callout: { fontSize: 16, lineHeight: 21, fontWeight: "400" as const, letterSpacing: -0.32 },
  subheadline: { fontSize: 15, lineHeight: 20, fontWeight: "400" as const, letterSpacing: -0.24 },
  footnote: { fontSize: 13, lineHeight: 18, fontWeight: "400" as const, letterSpacing: -0.08 },
  caption1: { fontSize: 12, lineHeight: 16, fontWeight: "400" as const, letterSpacing: 0 },
  caption2: { fontSize: 11, lineHeight: 13, fontWeight: "400" as const, letterSpacing: 0.07 },
};

// Apple's minimum hit target.
export const touchTarget = 44;

export const hairline = Platform.OS === "web" ? 1 : 0.5;

export const shadow = {
  pass: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 8,
  },
  segment: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 2,
  },
};

export const theme = { colors, spacing, radius, type, touchTarget, hairline, shadow };
export default theme;
