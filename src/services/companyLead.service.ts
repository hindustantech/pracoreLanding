import { apiClient } from "@/api/companyLead.api";
import { CompanyLeadPayload } from "@/type/companyLead.types";

export const createCompanyLead = async (payload: CompanyLeadPayload) => {
  return await apiClient.post("/v1/company-leads", payload);
};