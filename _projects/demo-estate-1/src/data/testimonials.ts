export interface Testimonial {
  id: string;
  quote: string;
  client: string;
  role: string;
  propertyType: string;
  location: string;
}

export const testimonialsData: Testimonial[] = [
  {
    id: "test-01",
    quote:
      "Working with Ahmad made the entire process feel simple, transparent, and remarkably serene. In a market often clouded by misinformation, LUMÉA provided unassailable legal diligence and introduced us to a private off-market villa that exceeded every family expectation.",
    client: "Hendrik & Clarissa Van Deventer",
    role: "Private Investors",
    propertyType: "Modern Tropical Villa",
    location: "Canggu, Bali",
  },
  {
    id: "test-02",
    quote:
      "Ahmad's deep understanding of Menteng's heritage regulations saved us months of bureaucratic friction. His discretion and architectural insight made our acquisition an absolute pleasure.",
    client: "Dr. Bambang Suryo",
    role: "Managing Director & Collector",
    propertyType: "Heritage Manor",
    location: "Menteng, Jakarta Pusat",
  },
  {
    id: "test-03",
    quote:
      "The curation is genuinely unparalleled. LUMÉA showed us three properties, and all three were exceptional. No wasted inspections, no exaggerated yields—just pure expertise and authentic guidance.",
    client: "Elena Rostova & Michael Davies",
    role: "Tech Founders",
    propertyType: "Oceanfront Cliff Pavilion",
    location: "Uluwatu, Bali",
  },
  {
    id: "test-04",
    quote:
      "As an institutional family office, we require institutional-grade due diligence. LUMÉA presented flawless spatial zoning analysis and title chain verification on our Surabaya golf estate.",
    client: "Raden Mas Hartono",
    role: "Family Office Principal",
    propertyType: "Fairway Estate",
    location: "CitraLand, Surabaya",
  },
];
