import React, { useState, useEffect } from 'react';
import {
  Video,
  Play,
  CheckCircle2,
  Clock,
  ExternalLink,
  BookOpen,
  Filter,
  Search,
  Sparkles
} from 'lucide-react';
import { VideoResource } from '../../types/index.js';
import { api } from '../../services/api.js';

export const VideoLearning: React.FC = () => {
  const [videos, setVideos] = useState<VideoResource[]>([]);
  const [activeTab, setActiveTab] = useState<'ALL' | 'FIVE_MIN' | 'COMPLETED'>('ALL');
  const [selectedVideo, setSelectedVideo] = useState<VideoResource | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.getVideos();
        if (res.success) {
          setVideos(res.videos);
          if (res.videos.length > 0) setSelectedVideo(res.videos[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleToggleComplete = async (vidId: string) => {
    try {
      const res = await api.toggleVideoComplete(vidId);
      if (res.success) {
        setVideos(prev =>
          prev.map(v => (v.id === vidId ? { ...v, completed: res.completed } : v))
        );
        if (selectedVideo?.id === vidId) {
          setSelectedVideo(prev => (prev ? { ...prev, completed: res.completed } : null));
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = videos.filter(v => {
    if (activeTab === 'FIVE_MIN' && !v.isFiveMinute) return false;
    if (activeTab === 'COMPLETED' && !v.completed) return false;
    if (searchQuery) {
      const match =
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.category.toLowerCase().includes(searchQuery.toLowerCase());
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
          <Video className="w-4 h-4" />
          <span>Curated Video Learning & Micro-Lectures</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
          AYUSH Micro-Learning & Clinical Video Archive
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          High-yield 5-minute explanations covering Good Clinical Practice (GCP), Pharmacovigilance, Schedule T manufacturing compliance, and the Ayush Grid.
        </p>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('ALL')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'ALL'
                ? 'bg-emerald-700 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            All Videos ({videos.length})
          </button>
          <button
            onClick={() => setActiveTab('FIVE_MIN')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ${
              activeTab === 'FIVE_MIN'
                ? 'bg-emerald-700 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>5-Min Micro-Learning ({videos.filter(v => v.isFiveMinute).length})</span>
          </button>
          <button
            onClick={() => setActiveTab('COMPLETED')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'COMPLETED'
                ? 'bg-emerald-700 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Completed ({videos.filter(v => v.completed).length})
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search videos..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 outline-hidden"
          />
        </div>
      </div>

      {/* Video Theater Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Active Player / Detail Viewer (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {selectedVideo ? (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              {/* Mock Player Screen with Clean Academic UI */}
              <div className="relative w-full aspect-video bg-slate-950 rounded-xl overflow-hidden flex flex-col justify-between p-6 text-white shadow-inner">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded bg-emerald-700/80 text-white font-bold uppercase tracking-wider">
                    {selectedVideo.topic}
                  </span>
                  <span className="font-mono bg-black/60 px-2 py-0.5 rounded text-[11px]">
                    Duration: {selectedVideo.duration}
                  </span>
                </div>

                <div className="text-center space-y-2">
                  <div className="w-14 h-14 rounded-full bg-emerald-600/90 text-white flex items-center justify-center mx-auto shadow-lg hover:scale-105 transition-transform cursor-pointer">
                    <Play className="w-6 h-6 ml-0.5" />
                  </div>
                  <h3 className="text-base font-bold drop-shadow-xs max-w-md mx-auto">
                    {selectedVideo.title}
                  </h3>
                  <div className="text-xs text-slate-300">
                    Source: {selectedVideo.source}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Educational Archive • Ministry of Ayush</span>
                  <span>1080p HD</span>
                </div>
              </div>

              {/* Video Info and Controls */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {selectedVideo.category}
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    {selectedVideo.title}
                  </h2>
                </div>

                <button
                  onClick={() => handleToggleComplete(selectedVideo.id)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
                    selectedVideo.completed
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{selectedVideo.completed ? 'Marked Completed' : 'Mark as Done'}</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                <div className="font-bold text-slate-900 dark:text-slate-100">
                  Key Learning Objective:
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedVideo.learningObjective}
                </p>
                <div className="pt-1 flex items-center gap-2">
                  <a
                    href={selectedVideo.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
                  >
                    <span>Visit Official Institutional Repository</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-24 text-center text-slate-400">
              Select a video from the list on the right.
            </div>
          )}
        </div>

        {/* Video Playlist (5 Cols) */}
        <div className="lg:col-span-5 space-y-3 max-h-[850px] overflow-y-auto pr-1">
          {filtered.map(vid => {
            const isSelected = selectedVideo?.id === vid.id;
            return (
              <div
                key={vid.id}
                onClick={() => setSelectedVideo(vid)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/40 dark:bg-emerald-950/20 shadow-xs ring-1 ring-emerald-500'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Play className="w-4 h-4 ml-0.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                      {vid.topic}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{vid.duration}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                    {vid.title}
                  </h4>
                  <div className="flex items-center justify-between mt-2 text-[11px] text-slate-500">
                    <span className="truncate">{vid.source}</span>
                    {vid.completed && (
                      <span className="text-emerald-600 flex items-center gap-0.5 font-semibold">
                        <CheckCircle2 className="w-3 h-3" /> Done
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
