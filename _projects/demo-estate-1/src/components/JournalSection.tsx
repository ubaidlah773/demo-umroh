import React from "react";
import Image from "next/image";
import Link from "next/link";
import { journalArticles } from "@/data/journal";
import { ArrowRight, Clock } from "lucide-react";

export default function JournalSection() {
  return (
    <section className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="h-[1px] w-6 bg-lumea-accent" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-lumea-accent">
              EDITORIAL & PERSPECTIVE
            </span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-lumea-primary font-normal leading-tight">
            PROPERTY JOURNAL
          </h2>
          <p className="text-sm sm:text-base text-lumea-secondary mt-2 max-w-xl">
            In-depth analysis, legal due diligence, and market perspectives for discerning investors.
          </p>
        </div>

        <Link
          href="/journal"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-lumea-primary hover:text-lumea-accent transition-colors pb-1 border-b border-lumea-primary hover:border-lumea-accent w-fit min-h-[44px]"
        >
          <span>View All Journal Entries</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 3 Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {journalArticles.map((article) => (
          <article
            key={article.id}
            className="group flex flex-col justify-between bg-white border border-lumea-border rounded-lg overflow-hidden shadow-lumea-subtle hover:shadow-lumea-card transition-all duration-300"
          >
            <div>
              {/* Thumbnail */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-lumea-surface">
                <Link href={`/journal/${article.slug}`}>
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </Link>
                <div className="absolute top-3 left-3 z-10 pointer-events-none">
                  <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-lumea-primary text-[10px] uppercase tracking-wider font-semibold rounded-sm">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-lumea-secondary mb-2.5">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3 h-3 text-lumea-accent" />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="font-editorial text-xl sm:text-2xl text-lumea-primary font-medium group-hover:text-lumea-accent transition-colors leading-snug mb-3">
                  <Link href={`/journal/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>

                <p className="text-xs sm:text-sm text-lumea-secondary leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>
            </div>

            {/* Footer Action */}
            <div className="px-6 pb-6 pt-2">
              <Link
                href={`/journal/${article.slug}`}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-lumea-primary group-hover:text-lumea-accent transition-colors min-h-[44px]"
              >
                <span>Read Article</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
