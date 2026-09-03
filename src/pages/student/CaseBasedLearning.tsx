import React, { useState } from 'react';
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Stethoscope,
  ChevronRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { MedicalDisclaimerBadge } from '../../components/common/MedicalDisclaimerBadge.js';

interface ClinicalCase {
  id: string;
  title: string;
  discipline: string;
  category: string;
  patientScenario: string;
  doshaPrakriti: string;
  clinicalFindings: string[];
  investigations: string[];
  challengeQuestion: string;
  options: { text: string; correct: boolean; reasoning: string }[];
}

export const CaseBasedLearning: React.FC = () => {
  const cases: ClinicalCase[] = [
    {
      id: 'case-1',
      title: 'Clinical Protocol for Severe Amavata (Rheumatoid Arthritis Equivalent)',
      discipline: 'Ayurveda',
      category: 'Kayachikitsa & Panchakarma',
      patientScenario: 'A 42-year-old female presents with severe morning stiffness lasting >2 hours, bilateral symmetrical wrist and small joint swelling, anorexia (Aruchi), and heaviness (Gaurava). Tongue shows thick white coating (Ama lakshana).',
      doshaPrakriti: 'Vata-Kapha dominant with severe Ama formation',
      clinicalFindings: [
        'Bilateral wrist and PIP joint tenderness with localized warmth',
        'Impaired digestion (Mandagni) with constipation',
        'Pulse: Manda, Gati: Sarpa with heaviness'
      ],
      investigations: [
        'Rheumatoid Factor (RF): Positive (84 IU/ml)',
        'Anti-CCP: Elevated (120 U/ml)',
        'ESR: 54 mm/1st hr, CRP: 24 mg/L'
      ],
      challengeQuestion: 'According to Classical Ayurvedic Therapeutics, what is the mandatory immediate phase-1 intervention prior to any nourishing (Brimhana) or Oleation (Snehana) protocol?',
      options: [
        {
          text: 'Immediate Abhyanga with Mahanarayana Taila and Mridu Virechana',
          correct: false,
          reasoning: 'Contraindicated! In Amavata with active Ama, external sneha (oil massage) will cause severe exacerbation of inflammation and strotorodha (vascular occlusion).'
        },
        {
          text: 'Deepana-Pachana (Langhana, Shunthi-Guduchi kwath) followed by Valuka Sweda (dry heat)',
          correct: true,
          reasoning: 'Accurate classical protocol. Amavata treatment mandates Langhana, Swedana (Ruksha/Valuka), Tikta-Katu Deepana herbs to digest circulating Ama before administering internal medicated oils.'
        },
        {
          text: 'High-dose Rasayana therapy with Ashwagandha and Shilajit',
          correct: false,
          reasoning: 'Premature. Rasayana therapy is administered only post-purification (Shodhana) when agni is restored.'
        },
        {
          text: 'Immediate Raktamokshana (Bloodletting via Jalauka)',
          correct: false,
          reasoning: 'Raktamokshana is specific for Pitta-Rakta disorders (e.g. Vatarakta), not primary Amavata with predominant Ama.'
        }
      ]
    },
    {
      id: 'case-2',
      title: 'Standardization and Safety Testing of Mineral-Herbal Formulations (Rasashastra)',
      discipline: 'Ayurveda / Pharmacy',
      category: 'Quality Assurance & Regulatory',
      patientScenario: 'An Ayurvedic pharmacy is manufacturing a batch of Arogyavardhini Vati containing purified Shuddha Parada and Shuddha Gandhaka. The batch must comply with Schedule T GMP and Ayurvedic Pharmacopoeia of India (API) standards before clinical release.',
      doshaPrakriti: 'Standard Manufacturing Quality Protocol',
      clinicalFindings: [
        'Batch size: 50 kg tablet compression',
        'Organoleptic: Blackish-brown tablets with characteristic metallic-herbal odor'
      ],
      investigations: [
        'Disintegration time: 24 minutes',
        'Heavy metal analysis: Lead, Mercury, Arsenic, Cadmium testing required'
      ],
      challengeQuestion: 'Under the Drugs and Cosmetics Rules (Rule 158-B) and Schedule T, what analytical technique is mandated to verify that mercury in Arogyavardhini Vati is present as non-toxic mercuric sulfide (HgS) rather than free elemental mercury?',
      options: [
        {
          text: 'Simple pH measurement and loss on drying',
          correct: false,
          reasoning: 'Insufficient to identify organometallic states or elemental mercury presence.'
        },
        {
          text: 'X-Ray Diffraction (XRD) and Inductively Coupled Plasma Mass Spectrometry (ICP-MS) / AAS',
          correct: true,
          reasoning: 'Correct regulatory standard. XRD verifies the crystalline structure of metacinnabar/cinnabar (HgS), while ICP-MS confirms heavy metal limits comply with pharmacopoeial limits.'
        },
        {
          text: 'Thin Layer Chromatography (TLC) alone',
          correct: false,
          reasoning: 'TLC evaluates organic herbal phyto-constituents, not inorganic crystal lattice or heavy metal speciation.'
        },
        {
          text: 'Visual inspection through standard stereo-microscope',
          correct: false,
          reasoning: 'Microscopy cannot determine elemental speciation or sub-ppm toxic metal limits.'
        }
      ]
    }
  ];

  const [selectedCase, setSelectedCase] = useState<ClinicalCase>(cases[0]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const handleSelectOption = (idx: number) => {
    setSelectedOption(idx);
    setShowExplanation(true);
  };

  const handleReset = () => {
    setSelectedOption(null);
    setShowExplanation(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
            <Stethoscope className="w-4 h-4" />
            <span>Interactive Diagnostic Reasoning</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
            Case-Based Clinical & Pharmacological Learning
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-world AYUSH clinical scenarios, diagnostic challenges, and pharmacopoeial standardization dilemmas designed for medical scholars and researchers.
          </p>
        </div>
        <MedicalDisclaimerBadge />
      </div>

      {/* Case Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {cases.map((c, i) => (
          <button
            key={c.id}
            onClick={() => {
              setSelectedCase(c);
              handleReset();
            }}
            className={`px-4 py-2 text-xs font-semibold rounded-xl border whitespace-nowrap transition-all ${
              selectedCase.id === c.id
                ? 'bg-emerald-700 text-white border-emerald-700 dark:bg-emerald-600'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            Case {i + 1}: {c.discipline} - {c.category}
          </button>
        ))}
      </div>

      {/* Main Case Study Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Patient / Scenario Details (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                {selectedCase.category}
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold">
                {selectedCase.discipline}
              </span>
            </div>

            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-snug">
              {selectedCase.title}
            </h2>

            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Scenario Background
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {selectedCase.patientScenario}
              </p>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
              <span className="font-bold text-slate-900 dark:text-slate-100 block mb-1">
                Classical Assessment / Foundation:
              </span>
              <span className="text-slate-600 dark:text-slate-300">{selectedCase.doshaPrakriti}</span>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Clinical Observations
              </span>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                {selectedCase.clinicalFindings.map((f, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Laboratory / Analytical Data
              </span>
              <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                {selectedCase.investigations.map((inv, i) => (
                  <li key={i} className="flex items-start gap-1.5 font-mono text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                    <span>{inv}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Clinical Judgment Challenge & Interaction (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                Clinical Decision-Making Challenge
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-1">
                {selectedCase.challengeQuestion}
              </h3>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {selectedCase.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? opt.correct
                          ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/30 ring-1 ring-emerald-500'
                          : 'border-rose-600 bg-rose-50/50 dark:bg-rose-950/30 ring-1 ring-rose-500'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                          isSelected
                            ? opt.correct
                              ? 'border-emerald-600 bg-emerald-600 text-white'
                              : 'border-rose-600 bg-rose-600 text-white'
                            : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <div className="flex-1 text-sm font-medium text-slate-900 dark:text-slate-100">
                        {opt.text}
                      </div>
                    </div>

                    {/* Immediate Explanation on Click */}
                    {isSelected && showExplanation && (
                      <div
                        className={`mt-3 p-3 rounded-lg text-xs leading-relaxed border ${
                          opt.correct
                            ? 'bg-emerald-100/70 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800'
                            : 'bg-rose-100/70 dark:bg-rose-900/40 text-rose-900 dark:text-rose-200 border-rose-300 dark:border-rose-800'
                        }`}
                      >
                        <div className="font-bold mb-1 flex items-center gap-1.5">
                          {opt.correct ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                              <span>Optimal AYUSH Standard of Care</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-4 h-4 text-rose-700" />
                              <span>Clinical Rationale & Risk Warning</span>
                            </>
                          )}
                        </div>
                        {opt.reasoning}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {selectedOption !== null && (
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Try Other Options</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
