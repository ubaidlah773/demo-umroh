"use client";

import React, { useState } from "react";
import { Property } from "@/types/property";
import { ChevronDown, ChevronUp } from "lucide-react";

interface PropertyDescriptionProps {
  property: Property;
}

export default function PropertyDescription({ property }: PropertyDescriptionProps) {
  const [expanded, setExpanded] = useState(false);
  const paragraphs = property.description;
  const hasMultiple = paragraphs.length > 1;

  return (
    <div className="bg-white border border-lumea-border rounded-lg p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-6">
        <span className="h-[1px] w-5 bg-lumea-accent" />
        <h3 className="font-editorial text-2xl text-lumea-primary font-normal">
          ABOUT THE PROPERTY
        </h3>
      </div>

      <div className="space-y-4 text-sm sm:text-base text-lumea-secondary leading-relaxed">
        <p className="first-letter:font-editorial first-letter:text-4xl first-letter:float-left first-letter:mr-2 first-letter:leading-none first-letter:text-lumea-primary">
          {paragraphs[0]}
        </p>

        {hasMultiple && (
          <div
            className={`space-y-4 transition-all duration-300 ${
              expanded ? "block animate-in fade-in" : "hidden sm:block"
            }`}
          >
            {paragraphs.slice(1).map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        )}
      </div>

      {hasMultiple && (
        <div className="sm:hidden mt-4 pt-4 border-t border-lumea-border/60">
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-lumea-primary hover:text-lumea-accent transition-colors"
          >
            <span>{expanded ? "Read Less" : "Read More"}</span>
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      )}
    </div>
  );
}
