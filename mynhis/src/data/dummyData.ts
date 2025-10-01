export const profile = {
  name: "Kwame Boateng",
  email: "kwame.boateng@gmail.com",
  phone: "+233 24 123 4567",
  nhisNumber: "NHIS123456789",
  membershipType: "Active Member",
};

export const membership = {
  type: "NHIS Basic Coverage",
  validTill: "2025-12-31",
  expiresInDays: 30,
  membershipId: "NHIS123456789",
  issueDate: "2024-01-01",
};

export const claims = [
  { id: 1, status: "Pending", amount: "GH₵ 200.00", date: "2025-01-15", hospital: "Korle Bu Teaching Hospital" },
  { id: 2, status: "Approved", amount: "GH₵ 150.00", date: "2025-02-10", hospital: "Ridge Hospital" },
  { id: 3, status: "Processing", amount: "GH₵ 300.00", date: "2025-03-05", hospital: "37 Military Hospital" },
];

export const renewOptions = [
  { plan: "NHIS Basic", price: "GH₵ 15.00/year" },
  { plan: "NHIS Premium", price: "GH₵ 25.00/year" },
  { plan: "NHIS Family Plan", price: "GH₵ 40.00/year" },
];
