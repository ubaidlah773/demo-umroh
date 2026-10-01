import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { journalArticles } from "@/data/journal";
import { defaultAgent } from "@/data/agent";
import { ArrowLeft, Clock, Calendar, Share2, ChevronRight, User } from "lucide-react";

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return journalArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = journalArticles.find((a) => a.slug === params.slug);
  if (!article) return { title: "Article Not Found | LUMÉA" };

  return {
    title: `${article.title} | LUMÉA Journal`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.image }],
    },
  };
}

export default function ArticleDetailPage({ params }: ArticlePageProps) {
  const article = journalArticles.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  const otherArticles = journalArticles.filter((a) => a.id !== article.id).slice(0, 2);

  return (
    <article className="pt-28 sm:pt-36 pb-24">
      {/* Breadcrumb & Navigation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <nav className="flex items-center gap-2 text-xs text-lumea-secondary mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-lumea-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-lumea-secondary/60" />
          <Link href="/journal" className="hover:text-lumea-primary transition-colors">
            Journal
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-lumea-secondary/60" />
          <span className="text-lumea-primary font-medium truncate max-w-xs">{article.category}</span>
        </nav>

        <Link
          href="/journal"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-lumea-secondary hover:text-lumea-primary transition-colors min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Journal</span>
        </Link>
      </div>

      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <span className="px-3 py-1 bg-white border border-lumea-border rounded text-xs uppercase tracking-wider font-semibold text-lumea-accent inline-block mb-4">
          {article.category}
        </span>

        <h1 className="font-editorial text-3xl sm:text-5xl md:text-6xl text-lumea-primary font-normal leading-tight mb-6">
          {article.title}
        </h1>

        <div className="flex items-center justify-center gap-4 text-xs text-lumea-secondary">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-lumea-accent" />
            <span>{article.date}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-lumea-accent" />
            <span>{article.readTime}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-lumea-accent" />
            <span>By {defaultAgent.name}</span>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-lumea-border bg-lumea-surface">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1100px"
            className="object-cover"
          />
        </div>
      </div>

      {/* Editorial Content Body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <p className="font-editorial text-xl sm:text-2xl text-lumea-primary italic leading-relaxed border-l-2 border-lumea-accent pl-6 py-1">
          {article.excerpt}
        </p>

        {article.content.map((sec, idx) => (
          <div key={idx} className="space-y-4">
            {sec.heading && (
              <h2 className="font-editorial text-2xl sm:text-3xl text-lumea-primary font-normal mt-8 mb-3">
                {sec.heading}
              </h2>
            )}
            {sec.paragraphs.map((p, pIdx) => (
              <p key={pIdx} className="text-base sm:text-lg text-lumea-secondary leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        ))}

        {/* Author Bio Box */}
        <div className="mt-16 p-6 sm:p-8 bg-white border border-lumea-border rounded-lg flex flex-col sm:flex-row items-center gap-6">
          <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 border border-lumea-border">
            <Image
              src={defaultAgent.avatar}
              alt={defaultAgent.name}
              fill
              className="object-cover object-top"
              sizes="80px"
            />
          </div>
          <div className="text-center sm:text-left">
            <span className="text-[11px] uppercase tracking-wider text-lumea-accent font-semibold">
              Authored By Senior Consultant
            </span>
            <h4 className="font-editorial text-2xl text-lumea-primary font-medium mt-0.5">
              {defaultAgent.name}
            </h4>
            <p className="text-xs sm:text-sm text-lumea-secondary mt-1 leading-relaxed">
              Advising ultra-high-net-worth individuals and international family offices on trophy residential acquisitions and development feasibility across Indonesia.
            </p>
          </div>
        </div>

        {/* Read Next Section */}
        {otherArticles.length > 0 && (
          <div className="pt-16 border-t border-lumea-border">
            <h3 className="font-editorial text-2xl text-lumea-primary font-normal mb-6">
              Continue Reading
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {otherArticles.map((oa) => (
                <div key={oa.id} className="p-4 bg-white border border-lumea-border rounded-lg">
                  <span className="text-[10px] uppercase tracking-wider text-lumea-accent font-semibold">
                    {oa.category}
                  </span>
                  <h4 className="font-editorial text-lg text-lumea-primary font-medium mt-1 mb-2">
                    <Link href={`/journal/${oa.slug}`} className="hover:text-lumea-accent transition-colors">
                      {oa.title}
                    </Link>
                  </h4>
                  <Link
                    href={`/journal/${oa.slug}`}
                    className="text-xs uppercase tracking-wider text-lumea-primary font-semibold hover:text-lumea-accent inline-flex items-center gap-1"
                  >
                    <span>Read Guide</span>
                    <ArrowLeft className="w-3 h-3 rotate-180" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
