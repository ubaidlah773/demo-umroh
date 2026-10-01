import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { journalArticles } from "@/data/journal";
import { ArrowRight, Clock, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Property Journal & Market Advisory | LUMÉA",
  description:
    "Editorial analysis on luxury property investment, Indonesian spatial zoning (ITR), legal due diligence, and high-yield villa acquisitions.",
};

export default function JournalPage() {
  const featuredArticle = journalArticles[0];
  const secondaryArticles = journalArticles.slice(1);

  return (
    <div className="pt-28 sm:pt-36 pb-24">
      {/* Breadcrumb & Header */}
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <nav className="flex items-center gap-2 text-xs text-lumea-secondary mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-lumea-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-lumea-secondary/60" />
          <span className="text-lumea-primary font-medium">Property Journal</span>
        </nav>

        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="h-[1px] w-6 bg-lumea-accent" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-lumea-accent">
              EDITORIAL INSIGHTS
            </span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-lumea-primary font-normal leading-tight">
            The LUMÉA Journal
          </h1>
          <p className="text-base sm:text-lg text-lumea-secondary mt-3 leading-relaxed">
            Rigorous perspectives on Indonesian luxury real estate, zoning frameworks, architectural preservation, and wealth structuring.
          </p>
        </div>
      </div>

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Featured Editorial Cover Article */}
        <article className="bg-white border border-lumea-border rounded-xl overflow-hidden shadow-lumea-subtle hover:shadow-lumea-card transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="relative lg:col-span-7 aspect-[16/10] lg:aspect-auto min-h-[300px] sm:min-h-[420px] bg-lumea-surface">
              <Link href={`/journal/${featuredArticle.slug}`}>
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </Link>
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-lumea-primary text-xs uppercase tracking-wider font-semibold rounded-sm">
                  {featuredArticle.category}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-lumea-secondary mb-3">
                  <span>{featuredArticle.date}</span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3 h-3 text-lumea-accent" />
                    {featuredArticle.readTime}
                  </span>
                </div>

                <h2 className="font-editorial text-3xl sm:text-4xl text-lumea-primary font-normal leading-tight mb-4">
                  <Link
                    href={`/journal/${featuredArticle.slug}`}
                    className="hover:text-lumea-accent transition-colors"
                  >
                    {featuredArticle.title}
                  </Link>
                </h2>

                <p className="text-sm text-lumea-secondary leading-relaxed mb-6">
                  {featuredArticle.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-lumea-border">
                <Link
                  href={`/journal/${featuredArticle.slug}`}
                  className="inline-flex items-center gap-2 py-3 px-6 bg-lumea-primary text-white text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-lumea-accent transition-colors min-h-[44px]"
                >
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Secondary Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {secondaryArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white border border-lumea-border rounded-xl overflow-hidden shadow-lumea-subtle hover:shadow-lumea-card transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] w-full bg-lumea-surface">
                  <Link href={`/journal/${article.slug}`}>
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </Link>
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 bg-white/95 text-lumea-primary text-[10px] uppercase tracking-wider font-semibold rounded-sm">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-2 text-xs text-lumea-secondary mb-2.5">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3 text-lumea-accent" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="font-editorial text-2xl text-lumea-primary font-medium hover:text-lumea-accent transition-colors leading-snug mb-3">
                    <Link href={`/journal/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-lumea-secondary leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <Link
                  href={`/journal/${article.slug}`}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-lumea-primary hover:text-lumea-accent transition-colors min-h-[44px]"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
