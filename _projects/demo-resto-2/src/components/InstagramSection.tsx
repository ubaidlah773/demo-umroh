"use client";

import React from "react";
import Image from "next/image";
import { Instagram, Heart, MessageCircle, ExternalLink } from "lucide-react";
import { CAFE_INFO } from "@/data/cafeInfo";

const INSTAGRAM_POSTS = [
  {
    id: "ig-1",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
    likes: "248",
    comments: "19",
    caption: "Malam syahdu di sudut favorit D'Sultan Tuban ✨",
  },
  {
    id: "ig-2",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    likes: "412",
    comments: "34",
    caption: "The legendary Nasi IGA Bakar Sultan! Dagingnya empuk meresap 🔥",
  },
  {
    id: "ig-3",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80",
    likes: "189",
    comments: "12",
    caption: "Segelas es kopi susu aren untuk memulai sore yang santai ☕",
  },
  {
    id: "ig-4",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
    likes: "376",
    comments: "28",
    caption: "Sing along bareng di panggung Friday Acoustic Session 🎸🎶",
  },
  {
    id: "ig-5",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80",
    likes: "320",
    comments: "22",
    caption: "Breeze & chill di area outdoor kami yang teduh 🌿",
  },
  {
    id: "ig-6",
    image: "https://images.unsplash.com/photo-1560008581-09826d1de69e?auto=format&fit=crop&w=600&q=80",
    likes: "275",
    comments: "15",
    caption: "Sweet treat alert! Handcrafted artisan gelato pilihan rasa 🍨",
  },
];

export default function InstagramSection() {
  return (
    <section className="py-20 sm:py-24 bg-charcoal-900 border-t border-gold-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-400 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            <Instagram className="w-3.5 h-3.5" />
            FOLLOW THE EXPERIENCE
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-ivory-100 tracking-tight mb-3">
            @dsultan.id
          </h2>
          <p className="text-sm sm:text-base text-ivory-300 font-light">
            Ikuti keseharian kami, intip update menu spesial, dan temukan jadwal live music terbaru lewat Instagram.
          </p>
        </div>

        {/* 6-Grid Instagram Feed */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-10">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href={CAFE_INFO.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-charcoal-800 border border-charcoal-700/60 block"
            >
              <Image
                src={post.image}
                alt={post.caption}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
              />

              {/* Hover Dark Overlay with Likes/Comments */}
              <div className="absolute inset-0 bg-charcoal-950/80 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center">
                <div className="flex items-center gap-3 text-gold-300 mb-2 text-xs font-medium">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-gold-300" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5" />
                    {post.comments}
                  </span>
                </div>
                <p className="text-[10px] text-ivory-300 line-clamp-2">
                  {post.caption}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={CAFE_INFO.contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-semibold text-xs uppercase tracking-wider transition-all duration-200 shadow-gold-glow group"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow @dsultan.id on Instagram</span>
            <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
