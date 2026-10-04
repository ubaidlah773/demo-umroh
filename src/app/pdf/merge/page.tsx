import React from 'react';
import { Metadata } from 'next';
import { getToolBySlug } from '@/data/tools';
import ToolDispatcher from '@/components/tools/ToolDispatcher';

export const metadata: Metadata = {
  title: 'Merge PDF Online — AdminTools',
  description: 'Combine multiple PDF files into one document directly from your browser.',
};

export default function LegacyMergePdfPage() {
  const tool = getToolBySlug('merge-pdf')!;
  return <ToolDispatcher tool={tool} />;
}
