export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: {
    heading?: string;
    paragraphs: string[];
  }[];
}

export const journalArticles: JournalArticle[] = [
  {
    id: "journal-01",
    slug: "how-to-choose-the-right-villa-location-for-investment",
    title: "How to Choose the Right Villa Location for Investment",
    category: "Investment Guide",
    date: "September 18, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    excerpt:
      "A strategic analysis of yield metrics, spatial planning regulations, and micro-location factors that distinguish high-performing resort assets from speculative developments.",
    content: [
      {
        heading: "The Micro-Location Premium",
        paragraphs: [
          "When acquiring luxury villa property in destinations like Bali or Lombok, investors frequently mistake broad regional popularity for rental demand. However, returns in prime enclaves like Canggu, Pererenan, or Uluwatu are overwhelmingly dictated by micro-location specifics: proximity to accessible beach tracks, absence of major road bottlenecking, and acoustic privacy.",
          "A difference of 400 metres can translate to a 20% disparity in annual occupancy. Savvy investors evaluate the daily guest journey: how easily can a resident walk to high-end dining, reach the shoreline at sunrise, and return to an undisturbed sanctuary?",
        ],
      },
      {
        heading: "Zoning & Legal Certainty (ITR)",
        paragraphs: [
          "In Indonesia, verification of the Spatial Land Utilization Plan (ITR or Rencana Tata Ruang) is non-negotiable. Only land classified under yellow (Pariwisata / Residential Tourism) permits legitimate commercial holiday letting with Pondok Wisata or PBG licensing.",
          "Acquiring property on green-belt (Jalur Hijau) or agricultural zoned parcels carries catastrophic legal risk. At LUMÉA, our legal advisory conducts independent spatial registry cross-checks before any villa enters our portfolio.",
        ],
      },
      {
        heading: "Architectural Longevity vs. Fast Trends",
        paragraphs: [
          "Properties designed with natural Sukabumi stone, reclaimed ironwood, and monolithic concrete maintain their tactile prestige with minimal operational maintenance. In contrast, fragile faux-bohemian finishes deteriorate quickly under tropical humidity and high guest turnover.",
          "Target properties whose architecture will remain dignified twenty years from today.",
        ],
      },
    ],
  },
  {
    id: "journal-02",
    slug: "5-things-to-check-before-buying-property",
    title: "5 Things to Check Before Buying Property",
    category: "Due Diligence",
    date: "August 24, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    excerpt:
      "Essential legal, structural, and environmental due diligence checkpoints every private investor must verify prior to signing an Indonesian property deed.",
    content: [
      {
        heading: "1. Certificate Authenticity at the Land Office (BPN)",
        paragraphs: [
          "Never rely solely on a physical certificate photocopy. A formal SKPT (Surat Keterangan Pendaftaran Tanah) must be requested directly through an authorized notary (PPAT) at the National Land Agency (BPN) to verify zero active disputes, confiscation claims, or bank liens.",
        ],
      },
      {
        heading: "2. Guaranteed Road Access & Right-of-Way (Hak Akses)",
        paragraphs: [
          "Ensure that access roads leading from the public thoroughfare to your property perimeter are either officially public or protected by an indisputable legal covenant (Akte Perjanjian Hak Melintas) registered in the deed.",
        ],
      },
      {
        heading: "3. Building Approval (PBG/SLF)",
        paragraphs: [
          "Verify the Persetujuan Bangunan Gedung (PBG) and Sertifikat Laik Fungsi (SLF). Confirm that the constructed dimensions strictly match the registered architectural drawings to avoid municipal fines or demolition orders.",
        ],
      },
      {
        heading: "4. Soil Quality, Drainage & Water Tables",
        paragraphs: [
          "Evaluate seasonal monsoon drainage runoff. A tropical property must have gravity-fed channels, rainwater retention wells, and deep artesian water bores tested for purity and salinity.",
        ],
      },
      {
        heading: "5. Tax Compliance & Clear PBB History",
        paragraphs: [
          "Obtain full historical receipts for Pajak Bumi dan Bangunan (PBB) and calculate final acquisition taxes (BPHTB 5% and PPh 2.5%) upfront to avoid unexpected closing liabilities.",
        ],
      },
    ],
  },
  {
    id: "journal-03",
    slug: "the-2026-property-guide",
    title: "The 2026 Property Guide",
    category: "Market Report",
    date: "July 12, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    excerpt:
      "A comprehensive forecast on Indonesian prime residential capital flows, sovereign infrastructure impacts, and emerging luxury corridors.",
    content: [
      {
        heading: "The Shift Toward Architectural Authenticity",
        paragraphs: [
          "As global high-net-worth buyers continue to relocate to Indonesia under Second Home Visas and Golden Visas, demand has definitively migrated away from sterile cookie-cutter developments toward bespoke, bioclimatic residential sanctuaries.",
          "High-end buyers are prioritizing carbon neutrality, private art galleries, dedicated wellness pavilions, and acoustic insulation that allows productive international remote leadership.",
        ],
      },
      {
        heading: "Infrastructure Milestones Driving Capital Growth",
        paragraphs: [
          "The ongoing expansion of toll roads connecting West Java to East Java, combined with modern international air terminals in Bali and Yogyakarta, has unlocked secondary luxury hubs like Batu and Kaliurang. These destinations offer superior climate appeal and entry pricing at a fraction of central Jakarta.",
        ],
      },
      {
        heading: "Summary for 2026 Buyers",
        paragraphs: [
          "In 2026, the key to successful property acquisition is patience and selectivity. Prioritize freehold assets in established zones, seek architectural integrity over flashy novelties, and partner with advisors who offer total transparency.",
        ],
      },
    ],
  },
];
