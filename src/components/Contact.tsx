"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Send, CheckCircle2, Loader2, Copy, Check } from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setStatus("error");
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please enter your message.");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("https://formsubmit.co/ajax/meenakshibansal1701@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Portfolio Message from ${formData.name}`,
          _template: "table",
          _captcha: "false",
        }),
      });

      const data = await response.json();

      if (response.ok && (data.success === "true" || data.success === true)) {
        setStatus("success");
      } else if (data.message && data.message.toLowerCase().includes("activation")) {
        // On very first submission, FormSubmit sends an activation link to the recipient
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Failed to deliver message. Please try emailing directly.");
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setStatus("error");
      setErrorMessage("Network error sending message. Please try emailing meenakshibansal1701@gmail.com directly.");
    }
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", message: "" });
    setStatus("idle");
    setErrorMessage("");
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("meenakshibansal1701@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <footer
      id="contact"
      className="relative w-full py-28 md:py-36 text-slate-900 flex flex-col items-center overflow-hidden scroll-mt-24"
      style={{
        background: "linear-gradient(135deg, #ECEBE8 0%, #F5E2E3 22%, #ECCBC9 48%, #E0C5C4 74%, #D0A0A3 100%)",
      }}
    >
      {/* Ambient glowing dessert rose orbs for luminous frosted glass refraction */}
      <div className="absolute top-1/4 left-1/4 w-[28rem] h-[28rem] bg-[#F5E2E3] rounded-full blur-[100px] pointer-events-none opacity-90" />
      <div className="absolute bottom-1/4 right-1/4 w-[28rem] h-[28rem] bg-[#D0A0A3]/55 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 w-[22rem] h-[22rem] bg-[#ECCBC9]/70 rounded-full blur-[90px] pointer-events-none" />

      {/* Subtle architectural background grid */}
      <div
        className="absolute inset-0 z-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #8A4B52 1px, transparent 1px), linear-gradient(to bottom, #8A4B52 1px, transparent 1px)",
          backgroundSize: "4.5rem 4.5rem",
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Heading & Contact Details */}
          <motion.div
            className="lg:col-span-6 flex flex-col"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 border border-white/90 backdrop-blur-md w-fit mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[#8A4B52] text-xs font-semibold tracking-widest uppercase">
                Get In Touch
              </span>
            </div>

            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-5 leading-[1.15]">
              Let’s create something great together.
            </h2>

            <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-10 max-w-lg">
              Open to conversations around operations, strategy, consulting roles, and applied collaboration.
              Drop a message or reach out directly!
            </p>

            {/* Direct Contact Cards */}
            <div className="flex flex-col gap-3.5 max-w-md">
              <div className="flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white/65 hover:bg-white/85 border border-white/80 backdrop-blur-lg transition-all shadow-sm group">
                <a
                  href="mailto:meenakshibansal1701@gmail.com"
                  className="flex items-center gap-3.5 min-w-0 text-slate-900"
                >
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#D0A0A3] to-[#8A4B52] text-white shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                    <Mail size={19} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-slate-500 font-medium">Email Me</div>
                    <div className="text-sm sm:text-base font-semibold truncate text-slate-900">
                      meenakshibansal1701@gmail.com
                    </div>
                  </div>
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  title="Copy email"
                  className="p-2.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-white/60 transition-colors ml-2 shrink-0 cursor-pointer"
                >
                  {copiedEmail ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                </button>
              </div>

              <div className="flex items-center p-3.5 sm:p-4 rounded-2xl bg-white/65 hover:bg-white/85 border border-white/80 backdrop-blur-lg transition-all shadow-sm group">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#D0A0A3] to-[#8A4B52] text-white shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                  <Phone size={19} />
                </div>
                <div className="ml-3.5">
                  <div className="text-xs text-slate-500 font-medium">Phone</div>
                  <div className="text-sm sm:text-base font-semibold text-slate-900">965****208</div>
                </div>
              </div>

              <a
                href="https://www.linkedin.com/in/meenakshi-bansal-a5a05622a"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3.5 sm:p-4 rounded-2xl bg-white/65 hover:bg-white/85 border border-white/80 backdrop-blur-lg transition-all shadow-sm group"
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#D0A0A3] to-[#8A4B52] text-white shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                  <LinkedInIcon />
                </div>
                <div className="ml-3.5 min-w-0">
                  <div className="text-xs text-slate-500 font-medium">LinkedIn</div>
                  <div className="text-sm sm:text-base font-semibold text-slate-900 truncate">
                    meenakshi-bansal-a5a05622a
                  </div>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Exact Glassmorphic Contact Form in Dessert Rose Theme */}
          <motion.div
            className="lg:col-span-6 w-full max-w-xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {/* Glass Container matching user image */}
            <div className="relative rounded-[32px] p-7 sm:p-9 md:p-10 bg-white/50 border border-white/80 backdrop-blur-2xl shadow-2xl shadow-[#D0A0A3]/30 overflow-hidden">
              {/* Subtle glass reflection highlight */}
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-white/40 rounded-full blur-2xl pointer-events-none" />

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-12 flex flex-col items-center text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/15">
                      <CheckCircle2 size={36} />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                    <p className="text-slate-600 max-w-sm mb-8 text-base">
                      Thank you, <span className="font-semibold text-slate-900">{formData.name}</span>. Your message has been received. I will reply to you at{" "}
                      <span className="font-semibold text-slate-900">{formData.email}</span> shortly.
                    </p>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-6 py-3 rounded-full bg-[#8A4B52] hover:bg-[#743A40] text-white font-semibold text-sm transition-all duration-200 shadow-md shadow-[#8A4B52]/20 cursor-pointer"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5 relative z-10"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Name Input */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-slate-900 font-semibold text-base mb-2 tracking-wide"
                      >
                        Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="w-full bg-white/70 hover:bg-white/85 focus:bg-white border border-white/90 focus:border-[#D0A0A3] rounded-2xl px-5 py-3.5 text-slate-900 placeholder:text-slate-400 text-base focus:outline-none focus:ring-2 focus:ring-[#D0A0A3]/50 transition-all duration-200 shadow-inner"
                      />
                    </div>

                    {/* Email Input */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-slate-900 font-semibold text-base mb-2 tracking-wide"
                      >
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        required
                        className="w-full bg-white/70 hover:bg-white/85 focus:bg-white border border-white/90 focus:border-[#D0A0A3] rounded-2xl px-5 py-3.5 text-slate-900 placeholder:text-slate-400 text-base focus:outline-none focus:ring-2 focus:ring-[#D0A0A3]/50 transition-all duration-200 shadow-inner"
                      />
                    </div>

                    {/* Message Input */}
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-slate-900 font-semibold text-base mb-2 tracking-wide"
                      >
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="How can I help?"
                        required
                        className="w-full bg-white/70 hover:bg-white/85 focus:bg-white border border-white/90 focus:border-[#D0A0A3] rounded-2xl px-5 py-3.5 text-slate-900 placeholder:text-slate-400 text-base focus:outline-none focus:ring-2 focus:ring-[#D0A0A3]/50 transition-all duration-200 resize-y min-h-[135px] shadow-inner"
                      />
                    </div>

                    {/* Error Message */}
                    {status === "error" && errorMessage && (
                      <p className="text-[#8A4B52] text-sm font-medium bg-[#8A4B52]/10 border border-[#8A4B52]/20 rounded-xl px-4 py-2">
                        {errorMessage}
                      </p>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="w-full mt-2 py-3.5 px-6 rounded-full bg-gradient-to-r from-[#D0A0A3] via-[#B87077] to-[#8A4B52] hover:opacity-95 active:scale-[0.99] text-white font-bold text-base flex items-center justify-center gap-2.5 shadow-lg shadow-[#8A4B52]/25 hover:shadow-[#8A4B52]/40 transition-all duration-200 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed group"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 size={18} className="animate-spin text-white" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send
                            size={18}
                            className="text-white transform -rotate-12 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                            strokeWidth={2.2}
                          />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="relative z-10 mt-20 text-slate-600/70 text-xs font-mono tracking-widest uppercase text-center">
        © {new Date().getFullYear()} Meenakshi. All rights reserved.
      </div>
    </footer>
  );
}

function LinkedInIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.049c.475-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.114 20.452H3.558V9h3.556v11.452z" />
    </svg>
  );
}
