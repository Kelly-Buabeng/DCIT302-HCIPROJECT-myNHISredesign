import type { IconName } from "../components/Icon";
import type { Tone } from "../components/StatusText";

// Demo data. Swap for API calls when the NHIA backend is connected.

export const member = {
  name: "Kwame Boateng",
  firstName: "Kwame",
  nhisNumber: "3210 9876 5432",
  phone: "024 123 4567",
  email: "kwame.boateng@gmail.com",
  dateOfBirth: "14 Mar 1990",
  region: "Greater Accra",
  scheme: "Accra Metro District",
  memberSince: "2021",
  ghanaCard: null as string | null,
  plan: "Standard",
  category: "Principal member",
  validUntil: "28 Oct 2026",
  daysLeft: 30,
};

export const dependents = [
  { id: 1, name: "Akosua Boateng", relation: "Spouse", nhisNumber: "3210 9876 1101" },
  { id: 2, name: "Kofi Boateng", relation: "Son", nhisNumber: "3210 9876 1102" },
  { id: 3, name: "Ama Boateng", relation: "Daughter", nhisNumber: "3210 9876 1103" },
];

export type ClaimStatus = "Submitted" | "In review" | "Approved" | "Paid" | "Rejected";

export const claimTone: Record<ClaimStatus, Tone> = {
  Submitted: "neutral",
  "In review": "warning",
  Approved: "info",
  Paid: "success",
  Rejected: "danger",
};

// Order a claim moves through.
export const claimStages: ClaimStatus[] = ["Submitted", "In review", "Approved", "Paid"];

export const claims: {
  id: string;
  facility: string;
  service: string;
  icon: IconName;
  date: string;
  month: string;
  amount: string;
  status: ClaimStatus;
  patient: string;
  history: { stage: ClaimStatus; date: string }[];
}[] = [
  {
    id: "CLM-24031",
    facility: "Korle Bu Teaching Hospital",
    service: "Outpatient consultation",
    icon: "activity",
    date: "12 Sep 2026",
    month: "September 2026",
    amount: "GH₵ 200.00",
    status: "In review",
    patient: "Kwame Boateng",
    history: [
      { stage: "Submitted", date: "12 Sep" },
      { stage: "In review", date: "15 Sep" },
    ],
  },
  {
    id: "CLM-23877",
    facility: "37 Military Hospital",
    service: "Laboratory tests",
    icon: "droplet",
    date: "28 Aug 2026",
    month: "August 2026",
    amount: "GH₵ 300.00",
    status: "Approved",
    patient: "Kofi Boateng",
    history: [
      { stage: "Submitted", date: "28 Aug" },
      { stage: "In review", date: "30 Aug" },
      { stage: "Approved", date: "4 Sep" },
    ],
  },
  {
    id: "CLM-23510",
    facility: "Ridge Hospital",
    service: "Prescription medicines",
    icon: "package",
    date: "3 Aug 2026",
    month: "August 2026",
    amount: "GH₵ 150.00",
    status: "Paid",
    patient: "Kwame Boateng",
    history: [
      { stage: "Submitted", date: "3 Aug" },
      { stage: "In review", date: "5 Aug" },
      { stage: "Approved", date: "9 Aug" },
      { stage: "Paid", date: "20 Aug" },
    ],
  },
  {
    id: "CLM-22964",
    facility: "La General Hospital",
    service: "Dental extraction",
    icon: "smile",
    date: "19 Jun 2026",
    month: "June 2026",
    amount: "GH₵ 120.00",
    status: "Paid",
    patient: "Akosua Boateng",
    history: [
      { stage: "Submitted", date: "19 Jun" },
      { stage: "In review", date: "21 Jun" },
      { stage: "Approved", date: "26 Jun" },
      { stage: "Paid", date: "8 Jul" },
    ],
  },
];

export const plans = [
  { id: "standard", name: "Standard", detail: "Covers you", price: 15 },
  { id: "premium", name: "Premium", detail: "Wider choice of facilities", price: 25 },
  { id: "family", name: "Family", detail: "You + up to 4 dependents", price: 40 },
];

export const networks = [
  { id: "mtn", name: "MTN MoMo" },
  { id: "telecel", name: "Telecel Cash" },
  { id: "at", name: "AirtelTigo Money" },
];

export const coverage: { id: string; title: string; summary: string; icon: IconName; items: string[] }[] = [
  { id: "opd", title: "Outpatient", summary: "Consultations and check-ups", icon: "activity", items: ["General and specialist consultations", "Review visits", "Health education"] },
  { id: "meds", title: "Medicines", summary: "Drugs on the NHIS list", icon: "package", items: ["Prescribed drugs on the NHIS medicines list", "Collect at any accredited pharmacy"] },
  { id: "inpatient", title: "Hospital stays", summary: "Admission and surgery", icon: "home", items: ["General ward accommodation", "Surgical operations", "Meals during admission"] },
  { id: "lab", title: "Tests & scans", summary: "Lab tests and imaging", icon: "droplet", items: ["Blood and urine tests", "X-ray and ultrasound", "Other listed investigations"] },
  { id: "maternity", title: "Maternity", summary: "Pregnancy to postnatal", icon: "heart", items: ["Antenatal visits", "Normal and caesarean delivery", "Postnatal care for mother and baby"] },
  { id: "emergency", title: "Emergencies", summary: "Urgent care anywhere", icon: "alert-triangle", items: ["Emergency treatment at any accredited facility", "Stabilisation and referral"] },
];

export const notCovered = ["Cosmetic surgery", "Treatment abroad", "Drugs not on the NHIS list", "HIV antiretroviral drugs (covered by a separate programme)"];
