// myNHIS design tokens.
// One brand colour (deep green), one accent used sparingly (Ghana gold), neutrals.
// Every text pair here meets WCAG AA (4.5:1) — see the design system for ratios.

export const color = {
  brand: "#0B3D2E",        // header, primary buttons, active tab, links
  brandRaised: "#134B39",  // the member card sitting on the brand header
  brandSoft: "#EAF2EE",    // icon circles, selected option, subtle fills
  onBrand: "#FFFFFF",
  onBrandMuted: "#A8C4B8", // secondary text on brand / brandRaised
  gold: "#E9B949",         // accent only: progress, active dot, one highlight per screen

  bg: "#F6F7F5",           // app background
  surface: "#FFFFFF",      // cards, sheets, inputs
  ink: "#101714",          // primary text
  ink2: "#5B6660",         // secondary text
  line: "#E4E8E5",         // hairline borders and dividers (decorative)
  lineStrong: "#8A9690",   // input borders (3:1)

  success: "#1F7A4D",
  warning: "#9A5700",
  warningSoft: "#FDF6E7",
  danger: "#B42318",
  dangerSoft: "#FDF0EF",
  info: "#175CD3",
};

export const space = { 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32, 10: 40 } as const;

export const radius = { sm: 10, md: 14, lg: 20, xl: 28, pill: 999 } as const;

// Plus Jakarta Sans, loaded in App.tsx. Each weight is its own family on native.
export const font = {
  regular: "PlusJakartaSans_400Regular",
  medium: "PlusJakartaSans_500Medium",
  semibold: "PlusJakartaSans_600SemiBold",
  bold: "PlusJakartaSans_700Bold",
};

export const text = {
  hero: { fontFamily: font.semibold, fontSize: 32, lineHeight: 38, letterSpacing: -0.8 },
  title: { fontFamily: font.semibold, fontSize: 24, lineHeight: 30, letterSpacing: -0.5 },
  heading: { fontFamily: font.semibold, fontSize: 18, lineHeight: 24, letterSpacing: -0.2 },
  body: { fontFamily: font.regular, fontSize: 15, lineHeight: 22 },
  bodyStrong: { fontFamily: font.medium, fontSize: 15, lineHeight: 22 },
  small: { fontFamily: font.regular, fontSize: 13, lineHeight: 18 },
  smallStrong: { fontFamily: font.medium, fontSize: 13, lineHeight: 18 },
  label: { fontFamily: font.medium, fontSize: 12, lineHeight: 16, letterSpacing: 0.2 },
  number: { fontFamily: font.semibold, fontSize: 15, lineHeight: 22, fontVariant: ["tabular-nums" as const] },
};

export const touch = 48;

export const shadow = {
  soft: {
    shadowColor: "#0B3D2E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
};
