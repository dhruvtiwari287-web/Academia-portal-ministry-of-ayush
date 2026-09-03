import React, { useState, useEffect } from 'react';
import {
  Compass,
  Search,
  Filter,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Briefcase,
  Award,
  Layers,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { CareerPathway } from '../../types/index.js';
import { api } from '../../services/api.js';
import { VisualCareerTreeMap } from '../../components/career/VisualCareerTreeMap.js';
import { QuickExploreGrid } from '../../components/career/QuickExploreGrid.js';
import { CareerSpotlight } from '../../components/career/CareerSpotlight.js';
import { CareerMatrixTable } from '../../components/career/CareerMatrixTable.js';
import { CareerComparison } from '../../components/career/CareerComparison.js';

export const CareerExplorer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'FLOWCHART' | 'VISUAL_TREE' | 'QUICK_EXPLORE' | 'SPOTLIGHT' | 'MATRIX' | 'COMPARE'>('FLOWCHART');
  const [pathways, setPathways] = useState<CareerPathway[]>([]);
  const [selectedPathway, setSelectedPathway] = useState<CareerPathway | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [targetSetSuccess, setTargetSetSuccess] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.getCareers();
        if (res.success) {
          setPathways(res.pathways);
          if (res.pathways.length > 0) {
            setSelectedPathway(res.pathways[0]);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const categories = [
    'All',
    'Clinical Care',
    'Research & Academia',
    'Pharmaceutical Industry',
    'Public Health & Policy',
    'Healthcare Management',
    'Wellness & Lifestyle Medicine',
    'Healthcare Technology',
    'Innovation & Incubation'
  ];

  const filtered = pathways.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.competenciesRequired.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  const handleSetTarget = async (pathwayId: string) => {
    try {
      await api.setStudentPathway(pathwayId);
      setTargetSetSuccess(true);
      setTimeout(() => setTargetSetSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" />
            <span>Interactive AYUSH Career Exploration & Progression</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
            Career Explorer & Progression Pathways
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl">
            Explore structured, academic–industry progression flowcharts tailored to AYUSH medical disciplines, required clinical competencies, research certifications, and employment outcomes.
          </p>
        </div>
      </div>

      {/* Primary Sub-View Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('FLOWCHART')}
          className={`px-3.5 py-2 rounded-t-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'FLOWCHART'
              ? 'border-b-2 border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>8-Stage Flowchart Roadmap</span>
        </button>

        <button
          onClick={() => setActiveTab('VISUAL_TREE')}
          className={`px-3.5 py-2 rounded-t-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'VISUAL_TREE'
              ? 'border-b-2 border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Interactive Career Tree (Discipline Switcher)</span>
        </button>

        <button
          onClick={() => setActiveTab('QUICK_EXPLORE')}
          className={`px-3.5 py-2 rounded-t-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'QUICK_EXPLORE'
              ? 'border-b-2 border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Quick Explore (10 Verticals)</span>
        </button>

        <button
          onClick={() => setActiveTab('SPOTLIGHT')}
          className={`px-3.5 py-2 rounded-t-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'SPOTLIGHT'
              ? 'border-b-2 border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Career Spotlight (Emerging Fields)</span>
        </button>

        <button
          onClick={() => setActiveTab('MATRIX')}
          className={`px-3.5 py-2 rounded-t-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'MATRIX'
              ? 'border-b-2 border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Medical Branch Matrix Table</span>
        </button>

        <button
          onClick={() => setActiveTab('COMPARE')}
          className={`px-3.5 py-2 rounded-t-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'COMPARE'
              ? 'border-b-2 border-emerald-600 text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Side-by-Side Comparison</span>
        </button>
      </div>

      {/* VIEW: VISUAL TREE */}
      {activeTab === 'VISUAL_TREE' && (
        <VisualCareerTreeMap
          onSelectPathwayKeyword={(keyword) => {
            const found = pathways.find(p => p.title.toLowerCase().includes(keyword.toLowerCase()) || p.overview.toLowerCase().includes(keyword.toLowerCase()));
            if (found) setSelectedPathway(found);
            setActiveTab('FLOWCHART');
          }}
        />
      )}

      {/* VIEW: QUICK EXPLORE */}
      {activeTab === 'QUICK_EXPLORE' && (
        <QuickExploreGrid
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            setActiveTab('FLOWCHART');
          }}
          onSelectPathwayTitle={(keyword) => {
            const match = pathways.find(p => p.title.toLowerCase().includes(keyword.toLowerCase()) || p.category.toLowerCase().includes(keyword.toLowerCase()));
            if (match) setSelectedPathway(match);
            setActiveTab('FLOWCHART');
          }}
        />
      )}

      {/* VIEW: SPOTLIGHT */}
      {activeTab === 'SPOTLIGHT' && (
        <CareerSpotlight
          onExplorePathway={(areaName) => {
            const found = pathways.find(p => p.title.toLowerCase().includes(areaName.toLowerCase()) || p.category.toLowerCase().includes(areaName.toLowerCase()));
            if (found) setSelectedPathway(found);
            setActiveTab('FLOWCHART');
          }}
        />
      )}

      {/* VIEW: MEDICAL BRANCH MATRIX */}
      {activeTab === 'MATRIX' && (
        <CareerMatrixTable
          onSelectPathway={(branchName) => {
            const found = pathways.find(p => p.title.toLowerCase().includes(branchName.toLowerCase()) || p.category.toLowerCase().includes(branchName.toLowerCase()));
            if (found) setSelectedPathway(found);
            setActiveTab('FLOWCHART');
          }}
        />
      )}

      {/* VIEW: SIDE-BY-SIDE COMPARISON */}
      {activeTab === 'COMPARE' && (
        <CareerComparison
          pathways={pathways}
          onSetTargetPathway={handleSetTarget}
        />
      )}

      {/* VIEW: FLOWCHART (DEFAULT) */}
      {activeTab === 'FLOWCHART' && (
        <div className="space-y-6">
          {/* Filter and Search Bar */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search pathways by title, competencies (e.g., GCP, Pharmacovigilance, Schedule T)..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-hidden"
                />
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-colors ${
                    activeCategory === cat
                      ? 'bg-emerald-700 text-white dark:bg-emerald-600'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

      {/* Main Grid: Left Pathway Cards, Right Interactive Flowchart Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Pathways List (4 cols) */}
        <div className="lg:col-span-4 space-y-3 max-h-[850px] overflow-y-auto pr-1">
          {filtered.map(p => {
            const isSelected = selectedPathway?.id === p.id;
            return (
              <div
                key={p.id}
                onClick={() => setSelectedPathway(p)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-emerald-600 dark:border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 shadow-xs ring-1 ring-emerald-500'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                    {p.category}
                  </span>
                  <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-emerald-600' : 'text-slate-400'}`} />
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1 leading-snug">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
                  {p.overview}
                </p>
                <div className="flex flex-wrap gap-1">
                  {p.disciplineAffinity.slice(0, 3).map(d => (
                    <span
                      key={d}
                      className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Interactive Step-by-Step Flowchart & Detail View (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {selectedPathway ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
              {/* Top Banner of Selected Pathway */}
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                      {selectedPathway.category}
                    </span>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                      {selectedPathway.title}
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
                      {selectedPathway.overview}
                    </p>
                  </div>
                  <button
                    onClick={() => handleSetTarget(selectedPathway.id)}
                    className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 rounded-lg shadow-xs transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Set as Target Pathway</span>
                  </button>
                </div>

                {targetSetSuccess && (
                  <div className="mt-3 p-2.5 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 rounded-lg text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>
                      Successfully set <strong>{selectedPathway.title}</strong> as your primary career goal!
                    </span>
                  </div>
                )}
              </div>

              {/* Interactive Flowchart Diagram Canvas */}
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-emerald-600" />
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                      Step-by-Step Career Progression Flowchart
                    </h3>
                  </div>
                  {/* Zoom Controls */}
                  <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                    <button
                      onClick={() => setZoomLevel(prev => Math.max(0.8, prev - 0.1))}
                      className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-300"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[11px] font-mono px-1 text-slate-500">
                      {Math.round(zoomLevel * 100)}%
                    </span>
                    <button
                      onClick={() => setZoomLevel(prev => Math.min(1.3, prev + 0.1))}
                      className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-300"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setZoomLevel(1)}
                      className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-300"
                      title="Reset Zoom"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Interactive 8-Step Career Progression Pipeline */}
                <div
                  className="overflow-x-auto pb-4 transition-transform duration-200 origin-top-left"
                  style={{ transform: `scale(${zoomLevel})` }}
                >
                  <div className="min-w-[1050px] grid grid-cols-8 gap-2 relative">
                    {/* Step 1: Current Profile */}
                    <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 flex flex-col justify-between">
                      <div>
                        <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-bold flex items-center justify-center mb-1.5">
                          1
                        </div>
                        <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                          Current Profile
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-0.5 mb-1">
                          Academic Baseline
                        </h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                          BAMS Final Year, AIIA New Delhi.
                        </p>
                      </div>
                      <div className="mt-2 pt-1.5 border-t border-slate-200 dark:border-slate-700 text-[9px] text-slate-500 font-mono">
                        Readiness: 78%
                      </div>
                    </div>

                    {/* Step 2: Required Competencies */}
                    <div className="p-3 rounded-xl border border-emerald-300 dark:border-emerald-800/80 bg-emerald-50/40 dark:bg-emerald-950/20 flex flex-col justify-between">
                      <div>
                        <div className="w-5 h-5 rounded-full bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-[10px] font-bold flex items-center justify-center mb-1.5">
                          2
                        </div>
                        <div className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                          Required Competencies
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-0.5 mb-1">
                          Domain Standards
                        </h4>
                        <ul className="text-[10px] text-slate-600 dark:text-slate-300 space-y-0.5">
                          {selectedPathway.competenciesRequired.slice(0, 2).map(c => (
                            <li key={c} className="truncate" title={c}>• {c}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-2 pt-1.5 border-t border-emerald-200 dark:border-emerald-900/60 text-[9px] text-emerald-700 dark:text-emerald-400 font-medium">
                        NCISM Standards
                      </div>
                    </div>

                    {/* Step 3: Skill Gaps */}
                    <div className="p-3 rounded-xl border border-amber-300 dark:border-amber-800/80 bg-amber-50/40 dark:bg-amber-950/20 flex flex-col justify-between">
                      <div>
                        <div className="w-5 h-5 rounded-full bg-amber-200 dark:bg-amber-900 text-amber-800 dark:text-amber-200 text-[10px] font-bold flex items-center justify-center mb-1.5">
                          3
                        </div>
                        <div className="text-[10px] font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                          Skill Gaps
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-0.5 mb-1">
                          Delta Identified
                        </h4>
                        <p className="text-[10px] text-slate-600 dark:text-slate-300 leading-tight">
                          Biostatistics (-32%), Ayush Grid Literacy (-30%).
                        </p>
                      </div>
                      <div className="mt-2 pt-1.5 border-t border-amber-200 dark:border-amber-900/60 text-[9px] text-amber-700 dark:text-amber-400 font-medium">
                        Target: Level 4/5
                      </div>
                    </div>

                    {/* Step 4: Learning */}
                    <div className="p-3 rounded-xl border border-teal-300 dark:border-teal-800/80 bg-teal-50/40 dark:bg-teal-950/20 flex flex-col justify-between">
                      <div>
                        <div className="w-5 h-5 rounded-full bg-teal-200 dark:bg-teal-900 text-teal-800 dark:text-teal-200 text-[10px] font-bold flex items-center justify-center mb-1.5">
                          4
                        </div>
                        <div className="text-[10px] font-semibold text-teal-700 dark:text-teal-400 uppercase tracking-wider">
                          Learning
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-0.5 mb-1">
                          Curriculum Modules
                        </h4>
                        <ul className="text-[10px] text-slate-600 dark:text-slate-300 space-y-0.5">
                          {selectedPathway.learningAreas.slice(0, 2).map(l => (
                            <li key={l} className="truncate" title={l}>• {l}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-2 pt-1.5 border-t border-teal-200 dark:border-teal-900/60 text-[9px] text-teal-700 dark:text-teal-400 font-medium">
                        Ayush Grid Aligned
                      </div>
                    </div>

                    {/* Step 5: Mentorship */}
                    <div className="p-3 rounded-xl border border-indigo-300 dark:border-indigo-800/80 bg-indigo-50/40 dark:bg-indigo-950/20 flex flex-col justify-between">
                      <div>
                        <div className="w-5 h-5 rounded-full bg-indigo-200 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-[10px] font-bold flex items-center justify-center mb-1.5">
                          5
                        </div>
                        <div className="text-[10px] font-semibold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider">
                          Mentorship
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-0.5 mb-1">
                          Faculty Guidance
                        </h4>
                        <p className="text-[10px] text-slate-600 dark:text-slate-300 leading-tight">
                          1-on-1 milestone reviews & research protocol guidance.
                        </p>
                      </div>
                      <div className="mt-2 pt-1.5 border-t border-indigo-200 dark:border-indigo-900/60 text-[9px] text-indigo-700 dark:text-indigo-400 font-medium">
                        AIIA / CCRAS Mentors
                      </div>
                    </div>

                    {/* Step 6: Project/Research */}
                    <div className="p-3 rounded-xl border border-blue-300 dark:border-blue-800/80 bg-blue-50/40 dark:bg-blue-950/20 flex flex-col justify-between">
                      <div>
                        <div className="w-5 h-5 rounded-full bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-[10px] font-bold flex items-center justify-center mb-1.5">
                          6
                        </div>
                        <div className="text-[10px] font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
                          Project/Research
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-0.5 mb-1">
                          Translational Work
                        </h4>
                        <ul className="text-[10px] text-slate-600 dark:text-slate-300 space-y-0.5">
                          {selectedPathway.projectTypes.slice(0, 2).map(p => (
                            <li key={p} className="truncate" title={p}>• {p}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-2 pt-1.5 border-t border-blue-200 dark:border-blue-900/60 text-[9px] text-blue-700 dark:text-blue-400 font-medium">
                        EMR / Institutional
                      </div>
                    </div>

                    {/* Step 7: Internship */}
                    <div className="p-3 rounded-xl border border-violet-300 dark:border-violet-800/80 bg-violet-50/40 dark:bg-violet-950/20 flex flex-col justify-between">
                      <div>
                        <div className="w-5 h-5 rounded-full bg-violet-200 dark:bg-violet-900 text-violet-800 dark:text-violet-200 text-[10px] font-bold flex items-center justify-center mb-1.5">
                          7
                        </div>
                        <div className="text-[10px] font-semibold text-violet-700 dark:text-violet-400 uppercase tracking-wider">
                          Internship
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-0.5 mb-1">
                          Industry Immersion
                        </h4>
                        <ul className="text-[10px] text-slate-600 dark:text-slate-300 space-y-0.5">
                          {selectedPathway.internshipTypes.slice(0, 2).map(i => (
                            <li key={i} className="truncate" title={i}>• {i}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-2 pt-1.5 border-t border-violet-200 dark:border-violet-900/60 text-[9px] text-violet-700 dark:text-violet-400 font-medium">
                        Stipendiary Clinical
                      </div>
                    </div>

                    {/* Step 8: Career Opportunity */}
                    <div className="p-3 rounded-xl border border-rose-300 dark:border-rose-800/80 bg-rose-50/40 dark:bg-rose-950/20 flex flex-col justify-between">
                      <div>
                        <div className="w-5 h-5 rounded-full bg-rose-200 dark:bg-rose-900 text-rose-800 dark:text-rose-200 text-[10px] font-bold flex items-center justify-center mb-1.5">
                          8
                        </div>
                        <div className="text-[10px] font-semibold text-rose-700 dark:text-rose-400 uppercase tracking-wider">
                          Career Opportunity
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-0.5 mb-1">
                          Target Placements
                        </h4>
                        <p className="text-[10px] text-slate-600 dark:text-slate-300 line-clamp-2 leading-tight">
                          {selectedPathway.marketOutlook}
                        </p>
                      </div>
                      <div className="mt-2 pt-1.5 border-t border-rose-200 dark:border-rose-900/60 text-[9px] text-rose-700 dark:text-rose-400 font-medium">
                        Healthcare & Industry
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detailed 2-Column Breakdown Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                  {/* Learning Areas */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                      <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Curriculum Learning Modules</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedPathway.learningAreas.map(item => (
                        <span
                          key={item}
                          className="px-2.5 py-1 rounded text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Certifications Recommended */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      <span>Accredited Certifications</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedPathway.certifications.map(item => (
                        <span
                          key={item}
                          className="px-2.5 py-1 rounded text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-24 text-center text-slate-400">
              Select a pathway on the left to view the interactive flowchart.
            </div>
          )}
        </div>
      </div>
    </div>
  )}
</div>
);
};
