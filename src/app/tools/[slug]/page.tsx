import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TOOLS, getToolBySlug } from '@/data/tools';
import ToolDispatcher from '@/components/tools/ToolDispatcher';

interface ToolPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return TOOLS.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: 'Tool Not Found — AdminTools',
    };
  }

  return {
    title: tool.seoTitle,
    description: tool.seoDescription,
    openGraph: {
      title: tool.seoTitle,
      description: tool.seoDescription,
      type: 'website',
    },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  return <ToolDispatcher tool={tool} />;
}
