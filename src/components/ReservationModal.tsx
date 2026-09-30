"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useModal } from "@/context/ModalContext";
import ReservationWizard from "./reservation/ReservationWizard";

export default function ReservationModal() {
  const { isReservationOpen, closeReservation } = useModal();

  return (
    <AnimatePresence>
      {isReservationOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeReservation}
            className="fixed inset-0 bg-espresso-950/75 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl bg-ivory-100 border border-espresso-900/15 rounded-3xl shadow-2xl p-6 sm:p-10 text-espresso-900 z-10 my-8 max-h-[92vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Close button */}
            <button
              onClick={closeReservation}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-ivory-200/80 hover:bg-espresso-900 hover:text-ivory-100 text-espresso-900 flex items-center justify-center transition-colors cursor-pointer z-20"
              aria-label="Close reservation modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Embedded Reservation Wizard */}
            <ReservationWizard isModal={true} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
