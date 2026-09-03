import React, { useState } from 'react';
import {
  Users,
  GraduationCap,
  Building2,
  Briefcase,
  Microscope,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Link as LinkIcon,
  Filter
} from 'lucide-react';

interface GraphNode {
  id: string;
  name: string;
  role: 'STUDENT' | 'FACULTY' | 'MENTOR' | 'INDUSTRY' | 'OPPORTUNITY';
  tag: string;
  details: string;
  activeCollaborations: number;
}

interface GraphConnection {
  from: string;
  to: string;
  type: string;
  description: string;
}

export const CollaborationGraph: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-student');
  const [filterType, setFilterType] = useState<string>('ALL');

  const nodes: GraphNode[] = [
    {
      id: 'node-student',
      name: 'Aarav Sharma (Scholar)',
      role: 'STUDENT',
      tag: 'BAMS Senior Scholar • AIIA New Delhi',
      details: 'Specializing in Ayurvedic Clinical Trials & GCP Documentation. Career target: Clinical Research Coordinator.',
      activeCollaborations: 4
    },
    {
      id: 'node-faculty',
      name: 'Prof. Dr. Anand Kulkarni',
      role: 'FACULTY',
      tag: 'Professor & Dean (Research) • AIIA',
      details: 'Supervises BAMS clinical rotations, manages ICMR-AYUSH trial protocols, and endorses Skill Passport records.',
      activeCollaborations: 6
    },
    {
      id: 'node-mentor',
      name: 'Dr. Rajeshwar Sharma',
      role: 'MENTOR',
      tag: 'Principal Clinical Scientist • CCRAS Archive',
      details: 'Provides 1-on-1 industry guidance, reviews GCP milestones, and validates clinical documentation competencies.',
      activeCollaborations: 5
    },
    {
      id: 'node-industry',
      name: 'Charak Clinical Research Unit',
      role: 'INDUSTRY',
      tag: 'Healthcare Industry Partner',
      details: 'Hosts Phase II/III Ayurvedic clinical trials, offers pharmacovigilance apprenticeships, and sponsors live projects.',
      activeCollaborations: 8
    },
    {
      id: 'node-opp',
      name: 'Ayurvedic Pharmacovigilance & Safety Project',
      role: 'OPPORTUNITY',
      tag: 'Live Research & Training Program',
      details: 'Collaborative initiative between AIIA Faculty, Industry Pharmacovigilance team, and Student Scholars.',
      activeCollaborations: 3
    }
  ];

  const connections: GraphConnection[] = [
    {
      from: 'node-student',
      to: 'node-faculty',
      type: 'Academic Supervision',
      description: 'Faculty verifies 120 hospital clinical hours & endorses Panchakarma protocols in Skill Passport'
    },
    {
      from: 'node-student',
      to: 'node-mentor',
      type: 'Goal-Based Mentorship',
      description: 'Weekly 15-minute focused connect on GCP ethics and Case Report Form data handling'
    },
    {
      from: 'node-faculty',
      to: 'node-industry',
      type: 'Academia-Industry MOU',
      description: 'Joint research project on heavy-metal standardization and clinical safety data analytics'
    },
    {
      from: 'node-industry',
      to: 'node-student',
      type: 'Internship Opportunity',
      description: 'Competency-based matched candidate placement with 92% readiness alignment'
    },
    {
      from: 'node-faculty',
      to: 'node-opp',
      type: 'Academic Co-Investigator',
      description: 'Faculty coordinates student nominations and reviews research deliverables'
    },
    {
      from: 'node-mentor',
      to: 'node-opp',
      type: 'Industry Reviewer',
      description: 'Mentor provides structured evaluation on student milestone submissions'
    }
  ];

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];
  const relatedConnections = connections.filter(
    c => c.from === selectedNode.id || c.to === selectedNode.id
  );

  const getNodeColor = (role: GraphNode['role']) => {
    switch (role) {
      case 'STUDENT':
        return 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700';
      case 'FACULTY':
        return 'bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-700';
      case 'MENTOR':
        return 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700';
      case 'INDUSTRY':
        return 'bg-purple-50 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-700';
      case 'OPPORTUNITY':
        return 'bg-teal-50 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 border-teal-300 dark:border-teal-700';
    }
  };

  const getNodeIcon = (role: GraphNode['role']) => {
    switch (role) {
      case 'STUDENT':
        return <Users className="w-4 h-4 text-emerald-600" />;
      case 'FACULTY':
        return <GraduationCap className="w-4 h-4 text-blue-600" />;
      case 'MENTOR':
        return <ShieldCheck className="w-4 h-4 text-amber-600" />;
      case 'INDUSTRY':
        return <Building2 className="w-4 h-4 text-purple-600" />;
      case 'OPPORTUNITY':
        return <Microscope className="w-4 h-4 text-teal-600" />;
    }
  };

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-1">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            <span>Interactive Collaboration Graph</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Cross-Sector AYUSH Collaboration Network
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Real-time relationship mapping between Students, Mentors, Faculty, and Healthcare Industry Partners.
          </p>
        </div>

        <div className="flex items-center gap-1 text-xs">
          <span className="text-slate-400">Filter View:</span>
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="px-2.5 py-1 text-xs font-semibold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 outline-hidden"
          >
            <option value="ALL">All 5 Ecosystem Pillars</option>
            <option value="ACADEMIC">Academic & Faculty</option>
            <option value="INDUSTRY">Industry & Opportunities</option>
          </select>
        </div>
      </div>

      {/* Visual Node Ring / Topology */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {nodes.map(node => {
          const isSelected = node.id === selectedNodeId;
          return (
            <button
              key={node.id}
              onClick={() => setSelectedNodeId(node.id)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between space-y-2 ${
                isSelected
                  ? 'ring-2 ring-emerald-500 shadow-xs ' + getNodeColor(node.role)
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {node.role}
                  </span>
                  {getNodeIcon(node.role)}
                </div>
                <div className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                  {node.name}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                  {node.tag}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/50 flex items-center justify-between text-[10px] font-medium text-slate-500">
                <span>Collaborations:</span>
                <span className="font-bold text-slate-700 dark:text-slate-300">{node.activeCollaborations}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Node Details & Active Interconnectivity */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 dark:border-slate-700/60 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              {getNodeIcon(selectedNode.role)}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {selectedNode.name}
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                  {selectedNode.role}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{selectedNode.tag}</p>
            </div>
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-300 max-w-md text-right sm:block hidden">
            {selectedNode.details}
          </div>
        </div>

        {/* Connections List */}
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
            Active Institutional Links & Verifications ({relatedConnections.length}):
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {relatedConnections.map((conn, idx) => {
              const otherNodeId = conn.from === selectedNode.id ? conn.to : conn.from;
              const otherNode = nodes.find(n => n.id === otherNodeId)!;
              const isOutgoing = conn.from === selectedNode.id;

              return (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-slate-100">
                      <LinkIcon className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{conn.type}</span>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      Active
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {conn.description}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                    <span>Connected to:</span>
                    <button
                      onClick={() => setSelectedNodeId(otherNode.id)}
                      className="font-semibold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <span>{otherNode.name}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
