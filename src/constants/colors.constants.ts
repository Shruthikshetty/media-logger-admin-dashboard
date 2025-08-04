//colors to be used in the app
export const Colors = {
  // Base colors
  white: "#ffffff",
  black: "#1A202C", // Using the darkest neutral from the app for black

  // Primary Palette (Blues)
  primary: {
    100: "#eff6ff", // Very light blue for active nav item backgrounds
    200: "#60a5fa", // Lighter primary blue
    500: "#3b82f6", // Main primary blue for buttons and highlights
    600: "#2563eb", // Darker primary blue for hover states
  },

  // Neutral Palette (Grays for backgrounds, text, and borders)
  neutral: {
    50: "#f9fafb",   // Lightest gray for card backgrounds
    100: "#f3f4f6",  // Light gray for subtle backgrounds/hovers
    200: "#e5e7eb",  // Light theme borders and dark theme secondary text
    300: "#d1d5db",  // Muted text in dark mode
    600: "#4b5563",  // Muted text in light mode and dark theme borders
    700: "#374151",  // Dark theme secondary background
    800: "#1f2937",   // Dark theme card backgrounds
    900: "#111827",  // Main dark theme background
  },

  // Success Palette
  success: {
    300: "#34d399", // Light green for backgrounds
    500: "#10b981", // Main success green for indicators
  },

  // Error Palette
  error: {
    500: "#ef4444", // Main error red
  },

  // Warning Palette
  warning: {
    500: "#f59e0b", // Main warning amber
  },

  // Information Palette
  info: {
    500: "#3b82f6", // Main info blue, consistent with primary color
  },

  // Secondary/Accent Palette
  secondary: {
    400: "#8b5cf6", // Accent purple
    500: "#6366f1", // Accent indigo
  },
};
