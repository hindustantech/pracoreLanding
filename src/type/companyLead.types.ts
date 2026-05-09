export type CompanySize = "1-25" | "26-50" | "51-100" | "100+";

export interface CompanyLeadPayload {
  name: string;
  email: string;
  phoneNumber: string;
  whatsappNumber?: string;
  companyName: string;
  companySize: CompanySize;
  address?: string;
  tags?: string[];
  source?: "website" | "referral" | "ads" | "manual";
}