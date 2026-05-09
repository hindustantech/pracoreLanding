export const validateLead = (data: any) => {
  if (!data.name || !data.email || !data.phoneNumber || !data.companyName) {
    return "Required fields missing";
  }

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(data.email)) return "Invalid email";

  return null;
};