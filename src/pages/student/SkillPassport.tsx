import React, { useState, useEffect } from 'react';
import {
  IdCard,
  Printer,
  ShieldCheck,
  CheckCircle2,
  QrCode,
  Award,
  Stethoscope,
  Microscope,
  Briefcase,
  FileCheck2,
  ExternalLink,
  Share2
} from 'lucide-react';
import { SkillPassportData } from '../../types/index.js';
import { api } from '../../services/api.js';

export const SkillPassport: React.FC = () => {
  const [passport, setPassport] = useState<SkillPassportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.getSkillPassport();
        if (res.success) {
          setPassport(res.passport);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyHash = () => {
    if (passport?.verificationHash) {
      navigator.clipboard.writeText(passport.verificationHash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (!passport) {
    return <div className="py-24 text-center text-slate-400">Loading verified AYUSH Skill Passport...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Top Action Header (hidden in print) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>National Verified Credential</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
            Official AYUSH Skill Passport
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Tamper-evident, institutional digital portfolio verified by All India Institute of Ayurveda and Ministry of Ayush for healthcare industry recruitment.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleCopyHash}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'Hash Copied!' : 'Share Credential'}</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* The Printable Official Passport Document */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-emerald-700/30 dark:border-emerald-500/30 shadow-xl overflow-hidden p-8 sm:p-10 space-y-8 print:border-none print:shadow-none print:p-0">
        {/* Certificate Header / Emblems */}
        <div className="border-b-2 border-emerald-800/20 pb-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-bold text-2xl shadow-md">
              आ
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-400">
                Ministry of Ayush • Government of India
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                ALL INDIA INSTITUTE OF AYURVEDA (AIIA)
              </h2>
              <div className="text-xs font-semibold text-slate-500 tracking-wide mt-0.5">
                NATIONAL ACADEMIA–INDUSTRY VERIFIED SKILL PASSPORT
              </div>
            </div>
          </div>

          {/* QR Code Simulation & Passport ID */}
          <div className="text-center sm:text-right flex flex-col items-center sm:items-end">
            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 inline-block mb-1">
              <QrCode className="w-12 h-12 text-slate-900 dark:text-slate-100" />
            </div>
            <div className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300">
              {passport.passportNumber}
            </div>
            <div className="text-[10px] text-slate-400">Cryptographically Sealed</div>
          </div>
        </div>

        {/* Scholar Identification Card */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
          <div>
            <div className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
              Scholar Name
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5">
              {passport.studentName}
            </div>
          </div>
          <div>
            <div className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
              Medical Discipline
            </div>
            <div className="text-sm font-bold text-emerald-700 dark:text-emerald-400 mt-0.5">
              {passport.discipline} ({passport.program})
            </div>
          </div>
          <div>
            <div className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
              Institution
            </div>
            <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 mt-0.5">
              {passport.institution}
            </div>
          </div>
          <div>
            <div className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
              Academic Year
            </div>
            <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 mt-0.5">
              Year {passport.academicYear} (Senior Scholar)
            </div>
          </div>
        </div>

        {/* Verified Competencies Matrix */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Section I: Institutional Verified Competencies</span>
            </h3>
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              {passport.verifiedCompetenciesCount} Competencies Certified
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {passport.competencies.map(comp => (
              <div
                key={comp.id}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-100">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>{comp.title}</span>
                  </div>
                  <div className="text-slate-500 mt-1">{comp.description}</div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    Evaluation: {comp.evaluationMethod}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">
                    {comp.currentLevel} / 5.0
                  </span>
                  <div className="text-[10px] font-bold text-emerald-600">VERIFIED</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Clinical Exposure Hours */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
            <Stethoscope className="w-4 h-4 text-teal-600" />
            <span>Section II: Supervised Clinical Exposure & Rotations</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {passport.clinicalExposure.map((exp, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-xs"
              >
                <div className="font-bold text-slate-900 dark:text-slate-100">{exp.area}</div>
                <div className="text-slate-500 mt-0.5">{exp.institution}</div>
                <div className="mt-2 flex items-center justify-between pt-1 border-t border-slate-200 dark:border-slate-700">
                  <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">
                    {exp.hours} Verified Hours
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600">LOGBOOK VERIFIED</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Research Projects & Publications */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
            <Microscope className="w-4 h-4 text-blue-600" />
            <span>Section III: Research Projects & Clinical Studies</span>
          </h3>

          <div className="space-y-2">
            {passport.researchProjects.map((proj, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900 dark:text-slate-100">{proj.title}</div>
                  <div className="text-slate-500">Role: {proj.role}</div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300">
                    {proj.status}
                  </span>
                  <div className="text-[10px] text-emerald-600 font-bold mt-0.5">PEER REVIEWED</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Industry Internships & Certifications */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-amber-600" />
              <span>Accredited Internships</span>
            </h3>
            {passport.internships.map((int, i) => (
              <div
                key={i}
                className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-xs"
              >
                <div className="font-bold text-slate-900 dark:text-slate-100">{int.role}</div>
                <div className="text-slate-500">
                  {int.organization} • {int.period}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
              <FileCheck2 className="w-3.5 h-3.5 text-purple-600" />
              <span>Standard Certifications</span>
            </h3>
            {passport.certifications.map((cert, i) => (
              <div
                key={i}
                className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-xs"
              >
                <div className="font-bold text-slate-900 dark:text-slate-100">{cert.title}</div>
                <div className="text-slate-500">
                  {cert.issuer} ({cert.year})
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cryptographic Verification Seal Footer */}
        <div className="pt-6 border-t-2 border-emerald-800/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <div className="font-semibold text-slate-900 dark:text-slate-100">
              Issuing Authority: {passport.issueAuthority}
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              Verification Hash: {passport.verificationHash}
            </div>
            <div className="text-[10px] text-slate-500">
              Issued: {new Date(passport.issuanceDate).toLocaleDateString()} • Statutory Validity across Ministry of Ayush Network
            </div>
          </div>

          <div className="text-center sm:text-right">
            <div className="inline-block px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
              ✓ OFFICIALLY VALIDATED & ACTIVE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
