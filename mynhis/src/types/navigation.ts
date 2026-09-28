export type RootStackParamList = {
  Login: undefined;
  // Top-level tabs
  Home: undefined;
  Membership: undefined;
  Claims: undefined;
  Benefits: undefined;
  Profile: undefined;
  // Task flows (pushed on top, with a back arrow)
  Renew: undefined;
  RenewalConfirmation: { plan: string; amount: string; method: string; reference: string; validUntil: string };
  LinkGhanaCard: undefined;
  GhanaCardLinked: { cardNumber: string };
};

export type TabName = "Home" | "Membership" | "Claims" | "Benefits" | "Profile";

export type ScreenNames = keyof RootStackParamList;
