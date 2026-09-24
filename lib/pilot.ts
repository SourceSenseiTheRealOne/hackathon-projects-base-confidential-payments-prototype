export interface PilotInput {
  agency: string;
  email: string;
  challenge: string;
}
export function buildPilotBrief(input: PilotInput): string {
  const agency = input.agency.trim(),
    email = input.email.trim(),
    challenge = input.challenge.trim();
  if (
    agency.length < 2 ||
    agency.length > 100 ||
    /[\u0000-\u001f\u007f]/.test(input.agency)
  )
    throw new Error(
      "Agency name must be 2-100 characters without line breaks.",
    );
  if (
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    /[\u0000-\u001f\u007f]/.test(input.email)
  )
    throw new Error("Enter a valid email address.");
  if (
    challenge.length < 10 ||
    challenge.length > 2000 ||
    /[\u0000-\u0009\u000b-\u001f\u007f]/.test(input.challenge)
  )
    throw new Error(
      "Describe your challenge in 10-2000 characters without control characters.",
    );
  return `BASE CONFIDENTIAL PAYMENTS PROTOTYPE\nNot sent. This brief stays on your device.\n\nAgency: ${input.agency.trim()}\nEmail: ${input.email.trim()}\n\nCurrent workflow challenge:\n${input.challenge.trim()}\n\nPurpose: discovery conversation, not a funded engagement.\nDo not include wallet keys, customer documents or private rates.\n`;
}
