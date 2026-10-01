import { defaultAgent } from "@/data/agent";

export const siteConfig = {
  name: "LUMÉA",
  tagline: "PROPERTY, CURATED FOR YOUR NEXT CHAPTER.",
  brandPositioning:
    "A sophisticated property advisor helping clients discover carefully selected homes, villas, apartments, land, and commercial properties.",
  phone: defaultAgent.phone,
  whatsapp: defaultAgent.whatsapp,
  email: defaultAgent.email,
  offices: [
    {
      city: "Bali",
      address: "Jl. Pantai Batu Bolong No. 88, Canggu, Badung, Bali 80351",
    },
    {
      city: "Jakarta",
      address: "One Pacific Place, Level 15, SCBD, Jakarta Selatan 12190",
    },
  ],
  socials: [
    { name: "Instagram", url: "https://instagram.com" },
    { name: "LinkedIn", url: "https://linkedin.com" },
  ],
};
