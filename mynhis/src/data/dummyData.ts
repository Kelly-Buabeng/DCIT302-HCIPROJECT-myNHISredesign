import type { Status } from "../components/ui/StatusBadge";
import type { IconName } from "../components/ui/Icon";

// Demo data. Replace with API calls when the NHIS backend is connected.

export const profile = {
  name: "Kwame Boateng",
  firstName: "Kwame",
  email: "kwame.boateng@gmail.com",
  phone: "+233 24 123 4567",
  nhisNumber: "3210 9876 5432",
  ghanaCard: null as string | null,
  dateOfBirth: "14 March 1990",
  region: "Greater Accra",
  memberSince: "2021",
};

export const membership = {
  plan: "Standard Plan",
  category: "Principal member",
  status: "active" as const,
  validUntil: "28 Oct 2026",
  daysLeft: 30,
  issued: "28 Oct 2025",
  scheme: "Accra Metro District Scheme",
};

export const dependents = [
  { id: 1, name: "Akosua Boateng", relationship: "Spouse", nhisNumber: "3210 9876 1101" },
  { id: 2, name: "Kofi Boateng", relationship: "Child", nhisNumber: "3210 9876 1102" },
  { id: 3, name: "Ama Boateng", relationship: "Child", nhisNumber: "3210 9876 1103" },
];

export type ClaimStatus = "Approved" | "Pending" | "Processing" | "Rejected";

export const claimStatusTone: Record<ClaimStatus, Status> = {
  Approved: "success",
  Pending: "warning",
  Processing: "info",
  Rejected: "danger",
};

export const claims: {
  id: string;
  facility: string;
  service: string;
  date: string;
  amount: string;
  status: ClaimStatus;
}[] = [
  { id: "CLM-24031", facility: "Korle Bu Teaching Hospital", service: "Outpatient consultation", date: "12 Sep 2026", amount: "GH₵ 200.00", status: "Pending" },
  { id: "CLM-23877", facility: "37 Military Hospital", service: "Laboratory tests", date: "28 Aug 2026", amount: "GH₵ 300.00", status: "Processing" },
  { id: "CLM-23510", facility: "Ridge Hospital", service: "Prescription drugs", date: "03 Aug 2026", amount: "GH₵ 150.00", status: "Approved" },
  { id: "CLM-22964", facility: "La General Hospital", service: "Dental extraction", date: "19 Jun 2026", amount: "GH₵ 120.00", status: "Approved" },
];

export const plans = [
  { id: "standard", name: "Standard", description: "Covers you only", price: 15, tag: "Current plan" },
  { id: "premium", name: "Premium", description: "Wider facility network", price: 25 },
  { id: "family", name: "Family", description: "You + up to 4 dependents", price: 40 },
];

export const paymentMethods: { id: string; name: string; description: string; icon: IconName }[] = [
  { id: "momo", name: "Mobile Money", description: "MTN, Telecel or AirtelTigo", icon: "phone-portrait-outline" },
  { id: "card", name: "Bank card", description: "Visa or Mastercard", icon: "card-outline" },
];

export const benefits: { id: string; title: string; summary: string; details: string[]; icon: IconName }[] = [
  {
    id: "opd",
    title: "Outpatient care",
    summary: "Consultations and check-ups",
    icon: "medkit-outline",
    details: ["General and specialist consultations", "Review visits", "Health education"],
  },
  {
    id: "drugs",
    title: "Medicines",
    summary: "Drugs on the NHIS medicines list",
    icon: "bandage-outline",
    details: ["Prescribed drugs on the NHIS list", "Collect at any accredited pharmacy"],
  },
  {
    id: "inpatient",
    title: "Hospital stays",
    summary: "Admission, surgery and ward care",
    icon: "bed-outline",
    details: ["General ward accommodation", "Surgical operations", "Meals during admission"],
  },
  {
    id: "lab",
    title: "Lab tests & scans",
    summary: "Diagnostic tests and imaging",
    icon: "flask-outline",
    details: ["Blood and urine tests", "X-ray and ultrasound", "Other listed investigations"],
  },
  {
    id: "maternity",
    title: "Maternity care",
    summary: "Antenatal, delivery and postnatal",
    icon: "heart-circle-outline",
    details: ["Antenatal visits", "Normal and caesarean delivery", "Postnatal care for mother and baby"],
  },
  {
    id: "emergency",
    title: "Emergencies",
    summary: "Urgent care at any accredited facility",
    icon: "pulse-outline",
    details: ["Emergency treatment", "Stabilisation and referral"],
  },
];
