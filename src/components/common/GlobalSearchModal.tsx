import React, { useState, useEffect } from 'react';
import {
  Search,
  X,
  Compass,
  BookOpen,
  Video,
  Briefcase,
  Microscope,
  Users,
  Award,
  Building2,
  Calendar,
  Layers,
  ArrowRight,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api.js';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>('ALL');

  const [results, setResults] = useState<{
    careers: any[];
    learning: any[];
    videos: any[];
    internships: any[];
    research: any[];
    mentors: any[];
    certifications?: any[];
    industryOpportunities?: any[];
    workshops?: any[];
    projects?: any[];
  }>({
    careers: [],
    learning: [],
    videos: [],
    internships: [],
    research: [],
    mentors: [],
    certifications: [],
    industryOpportunities: [],
    workshops: [],
    projects: []
  });

  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults({
        careers: [],
        learning: [],
        videos: [],
        internships: [],
        research: [],
        mentors: [],
        certifications: [],
        industryOpportunities: [],
        workshops: [],
        projects: []
      });
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await api.searchGlobal(query);
        if (res.success) {
          setResults(res.results);
        }
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const totalResults =
    (results.careers?.length || 0) +
    (results.learning?.length || 0) +
    (results.videos?.length || 0) +
    (results.internships?.length || 0) +
    (results.research?.length || 0) +
    (results.mentors?.length || 0) +
    (results.certifications?.length || 0) +
    (results.industryOpportunities?.length || 0) +
    (results.workshops?.length || 0) +
    (results.projects?.length || 0);

  const handleSelect = (url: string) => {
    navigate(url);
    onClose();
  };

  const categoryCounts = {
    careers: results.careers?.length || 0,
    learning: results.learning?.length || 0,
    videos: results.videos?.length || 0,
    internships: results.internships?.length || 0,
    research: results.research?.length || 0,
    mentors: results.mentors?.length || 0,
    certifications: results.certifications?.length || 0,
    industry: results.industryOpportunities?.length || 0,
    workshops: results.workshops?.length || 0,
    projects: results.projects?.length || 0
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-16 px-4 bg-slate-900/60 backdrop-blur-xs" id="global-search-modal">
      <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-emerald-600" />
          <input
            type="text"
            className="flex-1 bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-base outline-hidden"
            placeholder="Search across Internships, Research, Mentors, Learning, Certifications, FDPs..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
          {loading && <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />}
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs (Section 19: Categorized search) */}
        {query && totalResults > 0 && (
          <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto text-xs no-scrollbar bg-slate-50/50 dark:bg-slate-800/30">
            <button
              onClick={() => setActiveCategoryTab('ALL')}
              className={`px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-colors ${
                activeCategoryTab === 'ALL'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              All Results ({totalResults})
            </button>
            {categoryCounts.internships > 0 && (
              <button
                onClick={() => setActiveCategoryTab('INTERNSHIPS')}
                className={`px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-colors ${
                  activeCategoryTab === 'INTERNSHIPS'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                Internships ({categoryCounts.internships})
              </button>
            )}
            {categoryCounts.research > 0 && (
              <button
                onClick={() => setActiveCategoryTab('RESEARCH')}
                className={`px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-colors ${
                  activeCategoryTab === 'RESEARCH'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                Research ({categoryCounts.research})
              </button>
            )}
            {categoryCounts.mentors > 0 && (
              <button
                onClick={() => setActiveCategoryTab('MENTORS')}
                className={`px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-colors ${
                  activeCategoryTab === 'MENTORS'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                Mentors ({categoryCounts.mentors})
              </button>
            )}
            {categoryCounts.learning > 0 && (
              <button
                onClick={() => setActiveCategoryTab('LEARNING')}
                className={`px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-colors ${
                  activeCategoryTab === 'LEARNING'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                Learning Modules ({categoryCounts.learning})
              </button>
            )}
            {categoryCounts.certifications > 0 && (
              <button
                onClick={() => setActiveCategoryTab('CERTIFICATIONS')}
                className={`px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-colors ${
                  activeCategoryTab === 'CERTIFICATIONS'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                Certifications ({categoryCounts.certifications})
              </button>
            )}
            {categoryCounts.workshops > 0 && (
              <button
                onClick={() => setActiveCategoryTab('WORKSHOPS')}
                className={`px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-colors ${
                  activeCategoryTab === 'WORKSHOPS'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                Workshops & FDPs ({categoryCounts.workshops})
              </button>
            )}
            {categoryCounts.projects > 0 && (
              <button
                onClick={() => setActiveCategoryTab('PROJECTS')}
                className={`px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-colors ${
                  activeCategoryTab === 'PROJECTS'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                Projects ({categoryCounts.projects})
              </button>
            )}
            {categoryCounts.careers > 0 && (
              <button
                onClick={() => setActiveCategoryTab('CAREERS')}
                className={`px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-colors ${
                  activeCategoryTab === 'CAREERS'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                Career Paths ({categoryCounts.careers})
              </button>
            )}
          </div>
        )}

        {/* Results Area */}
        <div className="overflow-y-auto p-4 space-y-5">
          {!query && (
            <div className="py-8 text-center text-slate-500 dark:text-slate-400 text-sm space-y-2">
              <p>Type keywords to search verified AYUSH resources:</p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
                {['Research', 'Panchakarma', 'GCP', 'Schedule T', 'NAMASTE', 'HPTLC', 'Clinical Trial', 'Biostatistics'].map(chip => (
                  <button
                    key={chip}
                    onClick={() => setQuery(chip)}
                    className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                  >
                    "{chip}"
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && totalResults === 0 && !loading && (
            <div className="py-8 text-center text-slate-500 dark:text-slate-400 text-sm">
              No matching records found for "{query}". Try searching broader terms like "Clinical", "Pharma", "Quality Control", or "Ayurveda".
            </div>
          )}

          {/* 1. Internships & Opportunities */}
          {(activeCategoryTab === 'ALL' || activeCategoryTab === 'INTERNSHIPS') && results.internships?.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-2">
                <Briefcase className="w-3.5 h-3.5" /> Internships & Clinical Opportunities ({results.internships.length})
              </div>
              <div className="space-y-1.5">
                {results.internships.map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.url)}
                    className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 hover:bg-amber-50/50 dark:hover:bg-amber-950/20 hover:border-amber-200 dark:hover:border-amber-900/60 text-left group transition-all"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-amber-700 dark:group-hover:text-amber-400">
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        <span className="font-medium text-emerald-700 dark:text-emerald-400">{item.category}</span>
                        {item.subtitle && ` • ${item.subtitle}`}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 2. Research Opportunities */}
          {(activeCategoryTab === 'ALL' || activeCategoryTab === 'RESEARCH') && results.research?.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider mb-2">
                <Microscope className="w-3.5 h-3.5" /> Research Projects & Extramural Grants ({results.research.length})
              </div>
              <div className="space-y-1.5">
                {results.research.map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.url)}
                    className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 hover:bg-purple-50/50 dark:hover:bg-purple-950/20 hover:border-purple-200 dark:hover:border-purple-900/60 text-left group transition-all"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-purple-700 dark:group-hover:text-purple-400">
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        <span className="font-medium text-purple-700 dark:text-purple-400">{item.category}</span>
                        {item.subtitle && ` • ${item.subtitle}`}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 3. Mentors */}
          {(activeCategoryTab === 'ALL' || activeCategoryTab === 'MENTORS') && results.mentors?.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider mb-2">
                <Users className="w-3.5 h-3.5" /> Academic & Clinical Mentors ({results.mentors.length})
              </div>
              <div className="space-y-1.5">
                {results.mentors.map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.url)}
                    className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 hover:bg-teal-50/50 dark:hover:bg-teal-950/20 hover:border-teal-200 dark:hover:border-teal-900/60 text-left group transition-all"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-teal-700 dark:group-hover:text-teal-400">
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        <span className="font-medium text-teal-700 dark:text-teal-400">{item.category}</span>
                        {item.subtitle && ` • ${item.subtitle}`}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 4. Learning Resources & Modules */}
          {(activeCategoryTab === 'ALL' || activeCategoryTab === 'LEARNING') && results.learning?.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider mb-2">
                <BookOpen className="w-3.5 h-3.5" /> Learning Modules & Micro-Courses ({results.learning.length})
              </div>
              <div className="space-y-1.5">
                {results.learning.map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.url)}
                    className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 hover:border-blue-200 dark:hover:border-blue-900/60 text-left group transition-all"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-700 dark:group-hover:text-blue-400">
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        <span className="font-medium text-blue-700 dark:text-blue-400">{item.category}</span>
                        {item.subtitle && ` • ${item.subtitle}`}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 5. Certifications */}
          {(activeCategoryTab === 'ALL' || activeCategoryTab === 'CERTIFICATIONS') && (results.certifications?.length || 0) > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-2">
                <Award className="w-3.5 h-3.5" /> Accredited AYUSH Certifications ({results.certifications?.length})
              </div>
              <div className="space-y-1.5">
                {results.certifications?.map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.url)}
                    className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 hover:border-emerald-200 dark:hover:border-emerald-900/60 text-left group transition-all"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        <span className="font-medium text-emerald-700 dark:text-emerald-400">{item.category}</span>
                        {item.subtitle && ` • ${item.subtitle}`}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 6. Workshops & FDPs */}
          {(activeCategoryTab === 'ALL' || activeCategoryTab === 'WORKSHOPS') && (results.workshops?.length || 0) > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider mb-2">
                <Calendar className="w-3.5 h-3.5" /> Workshops & Faculty Development Programs (FDPs) ({results.workshops?.length})
              </div>
              <div className="space-y-1.5">
                {results.workshops?.map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.url)}
                    className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 hover:border-indigo-200 dark:hover:border-indigo-900/60 text-left group transition-all"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-700 dark:group-hover:text-indigo-400">
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        <span className="font-medium text-indigo-700 dark:text-indigo-400">{item.category}</span>
                        {item.subtitle && ` • ${item.subtitle}`}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 7. Live Projects & Challenges */}
          {(activeCategoryTab === 'ALL' || activeCategoryTab === 'PROJECTS') && (results.projects?.length || 0) > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider mb-2">
                <Layers className="w-3.5 h-3.5" /> Live Projects & Innovation Challenges ({results.projects?.length})
              </div>
              <div className="space-y-1.5">
                {results.projects?.map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.url)}
                    className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 hover:bg-cyan-50/50 dark:hover:bg-cyan-950/20 hover:border-cyan-200 dark:hover:border-cyan-900/60 text-left group transition-all"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-cyan-700 dark:group-hover:text-cyan-400">
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        <span className="font-medium text-cyan-700 dark:text-cyan-400">{item.category}</span>
                        {item.subtitle && ` • ${item.subtitle}`}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 8. Career Pathways */}
          {(activeCategoryTab === 'ALL' || activeCategoryTab === 'CAREERS') && results.careers?.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                <Compass className="w-3.5 h-3.5 text-emerald-600" /> Career Pathways ({results.careers.length})
              </div>
              <div className="space-y-1.5">
                {results.careers.map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.url)}
                    className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-left group transition-all"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        <span className="font-medium">{item.category}</span>
                        {item.subtitle && ` • ${item.subtitle}`}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>Press <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-slate-200 dark:bg-slate-700 font-mono">ESC</kbd> to close</span>
            <span>•</span>
            <span>Shortcut: <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-slate-200 dark:bg-slate-700 font-mono">⌘K</kbd> / <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-slate-200 dark:bg-slate-700 font-mono">Ctrl+K</kbd></span>
          </div>
          <span className="hidden sm:inline">Ministry of Ayush & AIIA Platform Search</span>
        </div>
      </div>
    </div>
  );
};
