import React from 'react';
import { ShieldAlert, Mail, BookOpen, ShieldCheck, HelpCircle } from 'lucide-react';

/* About Us Page */
export function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 flex flex-col gap-6 text-zinc-300 pb-20">
      <h1 className="text-3xl font-black text-white">About FutIA</h1>
      <p className="text-sm leading-relaxed font-sans">
        FutIA is a cutting-edge, next-generation football analytics platform. By fusing live data streams with generative artificial intelligence, we offer fans, scouts, and managers unparalleled insights into the tactical, financial, and competitive dimensions of the world&apos;s beautiful game.
      </p>
      <h3 className="text-base font-bold text-emerald-400 mt-2">Our Mission</h3>
      <p className="text-xs sm:text-sm leading-relaxed font-sans">
        To democratize complex football statistics, tactical structures, and predictive variables so that enthusiasts can analyze lineups, study player comparison dashboards, and explore historical results with AI assistance.
      </p>
    </div>
  );
}

/* Contact Us Page */
export function Contact() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 flex flex-col gap-6 text-zinc-300 pb-20">
      <h1 className="text-3xl font-black text-white">Contact Us</h1>
      <p className="text-sm leading-relaxed font-sans">
        Have questions, feedback, or advertising inquiries? Feel free to reach out to our global administrative compliance team.
      </p>
      
      <div className="rounded-2xl border border-zinc-900 bg-zinc-900/15 p-5 flex flex-col gap-3">
        <span className="flex items-center gap-2 text-xs">
          <Mail className="h-4 w-4 text-emerald-500" />
          compliance@futia.io
        </span>
        <span className="text-xs text-zinc-500">
          📍 FutIA HQ • Wembley, London, United Kingdom
        </span>
      </div>
    </div>
  );
}

/* Privacy Policy Page */
export function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 flex flex-col gap-6 text-zinc-300 pb-20">
      <h1 className="text-3xl font-black text-white">Privacy Policy</h1>
      <p className="text-xs sm:text-sm leading-relaxed font-sans">
        Last updated: July 06, 2026. This Privacy Policy describes our policies and procedures on the collection, use and disclosure of your information when you use the Service and tells you about your privacy rights.
      </p>
      <h3 className="text-base font-bold text-emerald-400">Google AdSense & Cookies</h3>
      <p className="text-xs sm:text-sm leading-relaxed font-sans">
        We use third-party advertising companies to serve ads when you visit our website. These companies may use information (not including your name, address, email address, or telephone number) about your visits to this and other websites in order to provide advertisements about goods and services of interest to you. Google, as a third-party vendor, uses cookies to serve ads on our site.
      </p>
    </div>
  );
}

/* Terms of Service Page */
export function TermsOfService() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 flex flex-col gap-6 text-zinc-300 pb-20">
      <h1 className="text-3xl font-black text-white">Terms of Service</h1>
      <p className="text-xs sm:text-sm leading-relaxed font-sans">
        By accessing the website at FutIA, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
      </p>
    </div>
  );
}

/* Cookie Policy Page */
export function CookiePolicy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 flex flex-col gap-6 text-zinc-300 pb-20">
      <h1 className="text-3xl font-black text-white">Cookie Policy</h1>
      <p className="text-xs sm:text-sm leading-relaxed font-sans">
        This Cookie Policy explains how FutIA uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
      </p>
    </div>
  );
}

/* Disclaimer Page */
export function Disclaimer() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 flex flex-col gap-6 text-zinc-300 pb-20">
      <h1 className="text-3xl font-black text-white">Disclaimer</h1>
      <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 flex gap-3">
        <ShieldAlert className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
        <p className="text-xs leading-relaxed text-yellow-500/80">
          The AI-generated insights, outcome forecasts, and match statistics provided on FutIA are for recreational, fantasy, and educational purposes only. They do not constitute financial, investment, or legal sports betting advice.
        </p>
      </div>
    </div>
  );
}
