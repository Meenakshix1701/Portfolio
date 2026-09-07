"use client";

import { motion } from "framer-motion";
import { Trophy, Award, GraduationCap, FileText, ExternalLink } from "lucide-react";

const awards = [
  {
    icon: Trophy,
    title: "2nd Runner-up, The Hormuz Ripple Report",
    description: "GLIM, Gurgaon",
    year: "2026",
    gradient: "from-[#F5E2E3] to-[#ECCBC9]",
    pdfUrl: "/Hormuz_Chokepoint_Policy_Brief.pdf",
    pdfLabel: "View Policy Brief (PDF)",
  },
  {
    icon: Award,
    title: "Employee of the Quarter Award",
    description: "IDS InfoTech Pvt. Ltd., Mohali",
    year: "Q2 2024",
    gradient: "from-[#ECEBE8] to-[#F5E2E3]",
  },
  {
    icon: GraduationCap,
    title: "Academic Excellence Recognition",
    description: "ISF College of Pharmacy, Moga",
    year: "2023",
    gradient: "from-[#ECCBC9] to-[#E0C5C4]",
  },
];

export function Awards() {
  return (
    <section id="achievements" className="relative w-full py-24 bg-white overflow-hidden flex flex-col items-center scroll-mt-24">
      <div className="w-full max-w-5xl px-8">
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#D0A0A3]">Recognition</span>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mt-2 mb-4">
          Awards &amp; Achievements
        </h2>
        <div className="w-12 h-1 bg-gradient-to-r from-[#D0A0A3] to-[#ECCBC9] rounded mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {awards.map((award, i) => {
            const Icon = award.icon;
            return (
              <motion.div
                key={award.title}
                className={`bg-gradient-to-br ${award.gradient} border border-[#ECCBC9] rounded-2xl p-6 flex flex-col justify-between`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <div>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#D0A0A3] to-[#8A4B52] text-white mb-5 shadow-sm">
                    <Icon size={22} strokeWidth={2.25} />
                  </div>
                  <h3 className="font-heading font-bold text-slate-900 leading-snug mb-2">{award.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{award.description}</p>
                </div>

                <div>
                  {"pdfUrl" in award && award.pdfUrl && (
                    <a
                      href={award.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8A4B52] bg-white/80 hover:bg-white hover:text-[#6e373d] px-3 py-1.5 rounded-lg border border-[#ECCBC9] shadow-sm transition-all hover:shadow mb-4 w-fit group"
                    >
                      <FileText size={13} className="text-[#8A4B52]" />
                      <span>{award.pdfLabel || "View Policy Brief (PDF)"}</span>
                      <ExternalLink size={11} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                    </a>
                  )}
                  <p className="text-sm font-bold text-[#8A4B52]">{award.year}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
