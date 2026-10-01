"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { X, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2, Coffee } from "lucide-react";
import confetti from "canvas-confetti";

export default function CartDrawer() {
  const { cart, isOpen, setIsOpen, updateQuantity, removeFromCart, clearCart, totalPriceFormatted, totalItems } = useCart();
  const [orderType, setOrderType] = useState<"dine-in" | "takeaway">("dine-in");
  const [tableNumber, setTableNumber] = useState("07");
  const [isOrdered, setIsOrdered] = useState(false);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsOrdered(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#C9A66B", "#F4E9D8", "#B87945", "#FFFFFF"],
    });

    setTimeout(() => {
      clearCart();
      setIsOrdered(false);
      setIsOpen(false);
    }, 2800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-espresso-950/95 border-l border-gold-500/20 shadow-2xl backdrop-blur-xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold-500/10 flex items-center justify-center border border-gold-500/30 text-gold-400">
                  <ShoppingBag size={16} />
                </div>
                <div>
                  <h3 className="font-serif text-lg tracking-wider text-cream-100">YOUR ORDER</h3>
                  <p className="text-xs text-cream-100/60">{totalItems} {totalItems === 1 ? "item" : "items"} selected</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-cream-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {isOrdered ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gold-500/20 border border-gold-500 flex items-center justify-center text-gold-400 animate-bounce">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="font-serif text-2xl text-cream-100">ORDER RECEIVED!</h4>
                  <p className="text-sm text-cream-200/70 max-w-xs leading-relaxed">
                    Our baristas are preparing your specialty coffee with precision. Please relax at Table {tableNumber}.
                  </p>
                </div>
              ) : cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 text-cream-100/50 space-y-4">
                  <Coffee size={48} className="opacity-30 stroke-[1.5]" />
                  <p className="font-serif text-lg text-cream-200">Your order is currently empty</p>
                  <p className="text-xs max-w-xs text-cream-100/40">
                    Explore our signature drinks or specialty menu to start your coffee journey.
                  </p>
                </div>
              ) : (
                <>
                  {/* Dine-in / Takeaway Selector */}
                  <div className="grid grid-cols-2 p-1 bg-espresso-900 rounded-lg border border-white/5 mb-4">
                    <button
                      onClick={() => setOrderType("dine-in")}
                      className={`py-2 text-xs uppercase tracking-wider rounded-md font-medium transition-all ${
                        orderType === "dine-in"
                          ? "bg-gold-500 text-espresso-950 shadow-md font-semibold"
                          : "text-cream-200/70 hover:text-cream-100"
                      }`}
                    >
                      Dine In (Table {tableNumber})
                    </button>
                    <button
                      onClick={() => setOrderType("takeaway")}
                      className={`py-2 text-xs uppercase tracking-wider rounded-md font-medium transition-all ${
                        orderType === "takeaway"
                          ? "bg-gold-500 text-espresso-950 shadow-md font-semibold"
                          : "text-cream-200/70 hover:text-cream-100"
                      }`}
                    >
                      Takeaway
                    </button>
                  </div>

                  {/* Cart Items List */}
                  {cart.map((item) => (
                    <motion.div
                      layout
                      key={item.id}
                      className="flex gap-4 p-3.5 rounded-xl bg-espresso-900/60 border border-white/5 items-center hover:border-gold-500/20 transition-all"
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-espresso-800 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-sm font-medium text-cream-100 truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gold-400 font-mono mt-0.5">
                          {item.priceFormatted}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 rounded-md bg-espresso-800 border border-white/10 flex items-center justify-center text-cream-200 hover:border-gold-500 text-xs"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-xs font-mono font-medium text-cream-100 px-1">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 rounded-md bg-espresso-800 border border-white/10 flex items-center justify-center text-cream-200 hover:border-gold-500 text-xs"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-cream-100/40 hover:text-red-400 p-1 text-xs transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </motion.div>
                  ))}
                </>
              )}
            </div>

            {/* Footer / Summary */}
            {cart.length > 0 && !isOrdered && (
              <div className="p-6 border-t border-white/10 bg-espresso-950/80 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-cream-100/60 uppercase tracking-widest text-xs">Total</span>
                  <span className="font-serif text-xl font-medium text-gold-400">
                    {totalPriceFormatted}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-gold-500 via-gold-400 to-caramel-500 text-espresso-950 font-semibold tracking-wider uppercase text-xs shadow-gold-glow flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.99] transition-all"
                >
                  <span>CONFIRM ORDER</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
