export type Role = "client" | "agency" | "contractor" | "public";
const policies: Record<
  Role,
  { visible: readonly string[]; hidden: readonly string[] }
> = {
  client: {
    visible: [
      "Project total and scope",
      "Reserved funding status",
      "Milestone submissions and approval",
      "Your payment receipts",
    ],
    hidden: [
      "Individual contractor allocations",
      "Other contractors’ rates",
      "Agency margin breakdown",
    ],
  },
  agency: {
    visible: [
      "Project total and scope",
      "Accepted contractor allocations",
      "Milestone submissions and approval",
      "Agency receipts",
    ],
    hidden: ["Unrelated contractor transactions", "Other agencies’ agreements"],
  },
  contractor: {
    visible: [
      "Your agreed allocation",
      "Your assigned work",
      "Your payment status and receipt",
    ],
    hidden: [
      "Other contractors’ rates",
      "Agency margin breakdown",
      "Unrelated project documents",
    ],
  },
  public: {
    visible: [
      "Transaction timing and fees",
      "Addresses and interaction patterns",
      "Public token deposits and withdrawals",
    ],
    hidden: [
      "Confidential transfer amounts",
      "Encrypted document contents",
      "Authorized private receipts",
    ],
  },
};
export function visibilityFor(role: Role): {
  visible: readonly string[];
  hidden: readonly string[];
} {
  return policies[role];
}
