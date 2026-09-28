export type RootStack = {
  Login: undefined;
  // Tabs
  Home: undefined;
  Claims: undefined;
  Coverage: undefined;
  Account: undefined;
  // Detail screens
  Membership: undefined;
  ClaimDetail: { id: string };
  // Task flows
  Renew: undefined;
  RenewDone: { plan: string; amount: string; network: string; reference: string; validUntil: string };
  LinkCard: undefined;
  LinkDone: { cardNumber: string };
};

export type Tab = "Home" | "Claims" | "Coverage" | "Account";
