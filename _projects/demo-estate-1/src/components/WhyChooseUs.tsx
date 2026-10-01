import React from "react";

export default function WhyChooseUs() {
  const pillars = [
    {
      number: "01",
      title: "Curated Selection",
      headline: "We don't show everything. We show what fits.",
      description:
        "Every listing in our portfolio undergoes stringent architectural inspection and legal vetting. If a property lacks title clarity or structural integrity, we will not present it.",
    },
    {
      number: "02",
      title: "Local Expertise",
      headline: "Deep understanding of the market, location and opportunities.",
      description:
        "From historical spatial planning (ITR) in Bali to heritage bylaws in Menteng, our insights are grounded in years of boots-on-the-ground transactions and local relationships.",
    },
    {
      number: "03",
      title: "End-to-End Service",
      headline: "From first viewing to final paperwork.",
      description:
        "We coordinate everything: private inspections, notary (PPAT) due diligence, tax structuring, and corporate PMA registration for foreign investors.",
    },
    {
      number: "04",
      title: "Private Consultation",
      headline: "Personal guidance tailored to your goals.",
      description:
        "No pressure sales or mass promotional blasts. We work with a small roster of private clients, acting as dedicated fiduciary advisors throughout your acquisition journey.",
    },
  ];

  return (
    <section className="bg-white border-y border-lumea-border py-20 sm:py-28">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-[1px] w-6 bg-lumea-accent" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-lumea-accent">
              THE LUMÉA PHILOSOPHY
            </span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-lumea-primary font-light tracking-tight leading-tight">
            PROPERTY IS PERSONAL.
          </h2>
          <p className="font-editorial text-xl sm:text-2xl text-lumea-secondary italic font-normal mt-2">
            That&apos;s why our service is built around you.
          </p>
        </div>

        {/* 4 Editorial Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {pillars.map((pillar) => (
            <div
              key={pillar.number}
              className="group flex flex-col justify-between pt-6 border-t border-lumea-border hover:border-lumea-accent transition-colors duration-300"
            >
              <div>
                <span className="font-editorial text-3xl sm:text-4xl text-lumea-accent font-light block mb-4">
                  {pillar.number}
                </span>
                <h3 className="font-editorial text-2xl text-lumea-primary font-medium mb-2">
                  {pillar.title}
                </h3>
                <h4 className="text-sm font-semibold text-lumea-primary leading-snug mb-3">
                  {pillar.headline}
                </h4>
                <p className="text-xs sm:text-sm text-lumea-secondary leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-lumea-border/40">
                <span className="text-[10px] uppercase tracking-widest text-lumea-secondary group-hover:text-lumea-accent transition-colors font-medium">
                  Standard of Excellence
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
