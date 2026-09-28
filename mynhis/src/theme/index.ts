// myNHIS design tokens — mirrors the "myNHIS Redesign" design system.
// Every text/background pair used in the app meets WCAG AA (4.5:1).

export const colors = {
  // Brand
  primary: "#0B6E4F",        // NHIS green: primary buttons, active tab, links
  primaryPressed: "#085A40", // pressed state of primary
  primarySoft: "#E6F2EC",    // selected rows, icon tiles, chips
  onPrimary: "#FFFFFF",      // text/icons on primary
  onPrimaryMuted: "#D3E9DE", // secondary text on the membership card
  gold: "#F4B400",           // Ghana gold accent: card chip, highlights
  onGold: "#12201A",

  // Neutrals
  canvas: "#F4F6F3",         // screen background
  surface: "#FFFFFF",        // cards, sheets, inputs
  ink: "#12201A",            // headings and body text
  inkMuted: "#4B5B53",       // secondary text
  inkSubtle: "#5F6E66",      // captions, placeholders
  border: "#DDE3DE",         // card and input borders
  borderStrong: "#7A8880",   // input and radio borders (3:1 on surface and canvas)
  disabled: "#C9D1CC",

  // Status (always paired with an icon and a word)
  success: "#1E6B45",
  successSoft: "#E4F3EA",
  warning: "#8A5300",
  warningSoft: "#FFF4DC",
  danger: "#B3261E",
  dangerSoft: "#FDECEA",
  info: "#1D5FA8",
  infoSoft: "#E8F0FA",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
};

export const type = {
  display: { fontSize: 28, lineHeight: 34, fontWeight: "700" as const },
  title: { fontSize: 22, lineHeight: 28, fontWeight: "700" as const },
  heading: { fontSize: 18, lineHeight: 24, fontWeight: "600" as const },
  bodyLarge: { fontSize: 17, lineHeight: 24, fontWeight: "400" as const },
  body: { fontSize: 15, lineHeight: 22, fontWeight: "400" as const },
  label: { fontSize: 14, lineHeight: 20, fontWeight: "600" as const },
  caption: { fontSize: 13, lineHeight: 18, fontWeight: "400" as const },
  overline: { fontSize: 12, lineHeight: 16, fontWeight: "600" as const, letterSpacing: 0.8 },
};

// Minimum size for anything tappable (WCAG 2.5.5 / Material guidance).
export const touchTarget = 48;

export const shadow = {
  card: {
    shadowColor: "#12201A",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  raised: {
    shadowColor: "#12201A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
};

export const theme = { colors, spacing, radius, type, touchTarget, shadow };
export default theme;
