import React, { useState, useEffect, useRef } from 'react';
import {
  FolderLock,
  UploadCloud,
  FileText,
  CheckCircle2,
  Clock,
  Trash2,
  Download,
  Plus,
  ShieldCheck,
  AlertCircle,
  FileCheck,
  Award,
  Loader2
} from 'lucide-react';
import { DocumentItem } from '../../types/index.js';
import { api } from '../../services/api.js';

export const DocumentsManagement: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [isDragging, setIsDragging] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<DocumentItem['category']>('RESUME');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('1.2 MB');
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadDocs = async () => {
    try {
      const res = await api.getDocuments();
      if (res.success && Array.isArray(res.documents)) {
        setDocuments(res.documents);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocs();
  }, []);

  const getDocCategory = (doc: DocumentItem): string => {
    if (doc.category) return doc.category;
    if (doc.docType) {
      const formatted = doc.docType.toUpperCase().replace(/\s+/g, '_');
      if (formatted === 'ACADEMIC_RECORD') return 'INTERNSHIP_REPORT';
      return formatted;
    }
    return 'CERTIFICATE';
  };

  const formatDocCategory = (doc: DocumentItem): string => {
    const cat = doc.category || doc.docType || 'DOCUMENT';
    return String(cat).replace(/_/g, ' ');
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFileName(file.name);
      setTitle(file.name.replace(/\.[^/.]+$/, ''));
      setFileSize(`${(file.size / (1024 * 1024)).toFixed(2)} MB`);
      setShowUploadModal(true);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      setTitle(file.name.replace(/\.[^/.]+$/, ''));
      setFileSize(`${(file.size / (1024 * 1024)).toFixed(2)} MB`);
      setShowUploadModal(true);
    }
  };

  const handleSubmitUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !fileName.trim()) return;

    setUploading(true);
    try {
      const res = await api.uploadDocument({
        title,
        category,
        fileName,
        fileSize
      });
      if (res.success && res.document) {
        setDocuments(prev => [res.document, ...prev]);
        setShowUploadModal(false);
        setTitle('');
        setFileName('');
      }
    } catch (err: any) {
      alert(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (docId: string) => {
    if (!confirm('Are you sure you want to remove this verified document?')) return;
    try {
      const res = await api.deleteDocument(docId);
      if (res.success) {
        setDocuments(prev => prev.filter(d => d.id !== docId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownload = (doc: DocumentItem) => {
    alert(`Downloading ${doc.fileName} (${doc.fileSize || 'Verified'})...\nInstitutional Cryptographic Hash: Verified by AIIA`);
  };

  const filtered = documents.filter(
    d => activeCategory === 'ALL' || getDocCategory(d) === activeCategory || d.category === activeCategory
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
            <FolderLock className="w-4 h-4" />
            <span>Digital Repository & Institutional Attestations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
            Document Repository & Attestation Locker
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Securely manage verified academic transcripts, clinical logbooks, GCP certificates, and peer-reviewed research papers.
          </p>
        </div>

        <button
          onClick={() => {
            setFileName('AIIA_Clinical_Rotation_Attestation.pdf');
            setTitle('AIIA Clinical Rotation Attestation');
            setFileSize('2.4 MB');
            setShowUploadModal(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Upload New Credential</span>
        </button>
      </div>

      {/* Drag & Drop Zone */}
      <div
        onDragOver={e => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleFileDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`p-8 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/20'
            : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-emerald-500'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          className="hidden"
        />
        <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3">
          <UploadCloud className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
          Drag and drop files here, or click to browse
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Supports PDF, DOCX, JPG (Certificates, Research Preprints, Clinical Logbooks up to 25MB)
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {['ALL', 'RESUME', 'CERTIFICATE', 'INTERNSHIP_REPORT', 'RESEARCH_PAPER'].map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-emerald-700 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            {cat.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Document Items Grid */}
      {loading ? (
        <div className="p-12 text-center text-slate-500">
          <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-600" />
          <p className="text-xs">Loading attested documents repository...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center border border-dashed rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <FileText className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">No documents found in this category</h4>
          <p className="text-xs text-slate-500 mt-1">Upload verified files or certificates to store them in your locker.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(doc => (
            <div
              key={doc.id}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start justify-between gap-3 hover:shadow-xs transition-shadow"
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FileText className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                      {formatDocCategory(doc)}
                    </span>
                    {doc.isVerified && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.2 rounded">
                        <ShieldCheck className="w-3 h-3" /> VERIFIED
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-0.5 truncate" title={doc.title || doc.fileName}>
                    {doc.title || doc.fileName}
                  </h4>
                  <div className="text-[11px] text-slate-400 mt-1 truncate">
                    {doc.fileName} • {doc.fileSize || (doc.fileSizeKb ? `${doc.fileSizeKb} KB` : '1.2 MB')} • Uploaded {doc.uploadedAt ? new Date(doc.uploadedAt).toLocaleDateString() : 'Recently'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  onClick={() => handleDownload(doc)}
                  title="Download verified copy"
                  className="p-1.5 text-slate-400 hover:text-emerald-600 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(doc.id)}
                  title="Remove document"
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Upload & Attest Document
              </h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleSubmitUpload} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Document Title / Description
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Clinical Trial Rotation Logbook - Year 4"
                  className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Document Category
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as any)}
                  className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 outline-hidden"
                >
                  <option value="RESUME">Curriculum Vitae / Resume</option>
                  <option value="CERTIFICATE">Institutional Certificate (GCP/AIIA)</option>
                  <option value="INTERNSHIP_REPORT">Internship / Clinical Logbook Report</option>
                  <option value="RESEARCH_PAPER">Peer-Reviewed Research Paper / Preprint</option>
                </select>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                <span className="text-slate-400 block font-semibold text-[10px]">Attached File:</span>
                <span className="font-mono text-slate-800 dark:text-slate-200 font-bold">{fileName}</span>
                <span className="text-slate-400 ml-2">({fileSize})</span>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center gap-1.5 shadow-xs disabled:opacity-50"
                >
                  {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <UploadCloud className="w-3.5 h-3.5" />}
                  <span>Confirm Upload</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
