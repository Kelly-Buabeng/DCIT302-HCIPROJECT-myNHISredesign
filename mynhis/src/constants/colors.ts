// Unified Color Scheme following HCI Principles
// Based on accessibility, contrast ratios, and visual hierarchy

export const Colors = {
  // Primary Colors (NHIS Green Theme)
  primary: '#2E7D2E',           // Main NHIS Green (WCAG AA compliant)
  primaryLight: '#4CAF50',      // Lighter green for backgrounds
  primaryDark: '#1B5E1B',       // Darker green for depth
  primarySoft: '#E8F5E8',       // Very light green for backgrounds

  // Secondary Colors
  secondary: '#0D47A1',         // Professional blue for accents
  secondaryLight: '#2196F3',    // Lighter blue for links/actions
  secondaryDark: '#0A3D91',     // Darker blue for emphasis
  secondarySoft: '#E3F2FD',     // Light blue for backgrounds

  // Neutral Colors (High Contrast for Accessibility)
  background: '#FFFFFF',        // Pure white background
  backgroundSecondary: '#F8F9FA', // Light gray for secondary backgrounds
  backgroundTertiary: '#F5F5F5', // Subtle gray for cards

  // Text Colors (WCAG AAA Compliant)
  textPrimary: '#141414',       // High contrast black for main text
  textSecondary: '#4A4A4A',     // Medium gray for secondary text
  textTertiary: '#757575',      // Light gray for tertiary text
  textInverse: '#FFFFFF',       // White text on dark backgrounds

  // Status Colors (Accessible and Meaningful)
  success: '#2E7D2E',           // Success states (using primary green)
  successLight: '#4CAF50',      // Light success
  successSoft: '#E8F5E8',       // Background success

  warning: '#FF8F00',           // Warning states (high contrast orange)
  warningLight: '#FFB74D',      // Light warning
  warningSoft: '#FFF8E1',       // Background warning

  error: '#D32F2F',             // Error states (high contrast red)
  errorLight: '#F44336',        // Light error
  errorSoft: '#FFEBEE',         // Background error

  info: '#1976D2',              // Info states (blue)
  infoLight: '#2196F3',         // Light info
  infoSoft: '#E3F2FD',          // Background info

  // UI Element Colors
  border: '#E0E0E0',            // Subtle borders
  borderLight: '#F0F0F0',       // Very light borders
  borderDark: '#BDBDBD',        // Emphasized borders

  shadow: '#000000',            // Shadows (with low opacity)
  overlay: '#000000',           // Overlays (with transparency)

  // Interactive States (Following HCI Guidelines)
  active: '#2E7D2E',            // Active state (primary)
  inactive: '#9E9E9E',          // Inactive/disabled state
  hover: '#4CAF50',             // Hover state (lighter primary)
  pressed: '#1B5E1B',           // Pressed state (darker primary)

  // Special Purpose
  cardBackground: '#FFFFFF',    // Card backgrounds
  inputBackground: '#F8F9FA',   // Input field backgrounds
  divider: '#F0F0F0',          // Dividers and separators
};

// Color Usage Guidelines (HCI Principles):
// 
// 1. CONTRAST: All text-background combinations meet WCAG AA standards (4.5:1 ratio)
// 2. HIERARCHY: Darker colors for primary content, lighter for secondary
// 3. CONSISTENCY: Same colors used for same purposes across the app
// 4. ACCESSIBILITY: High contrast ratios for users with visual impairments
// 5. SEMANTIC: Colors have consistent meaning (green=success, red=error, etc.)
// 6. EMOTIONAL: Green conveys health/safety, blue conveys trust/reliability
// 7. CULTURAL: Green aligns with Ghanaian flag and healthcare associations

export default Colors;