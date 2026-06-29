import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, Download, X } from 'lucide-react';
import { batchUpdateStatus, exportVendorsCsv } from '../services/SupabaseService';

interface BulkActionBarProps {
  selectedIds: number[];
  onClearSelection: () => void;
  onRefresh: () => void;
}

const BulkActionBar: React.FC<BulkActionBarProps> = ({ selectedIds, onClearSelection, onRefresh }) => {
  if (selectedIds.length === 0) return null;

  const handleStatusChange = async (status: string) => {
    if (!window.confirm(`Are you sure you want to mark ${selectedIds.length} vendor(s) as "${status}"?`)) return;
    try {
      await batchUpdateStatus(selectedIds, status);
      onRefresh();
      onClearSelection();
    } catch (err) {
      console.error(err);
      alert('Failed to update status.');
    }
  };

  const handleExportCsv = async () => {
    try {
      const csvData = await exportVendorsCsv(selectedIds);
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `vendors_export_${new Date().getTime()}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert('Failed to export CSV.');
    }
  };

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
      style={{ animation: 'slideUp 0.25s ease-out both' }}
    >
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
      <div className="flex items-center gap-3 bg-neutral-900/95 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl px-5 py-3.5"
        style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)' }}
      >
        {/* Selected count */}
        <div className="flex items-center gap-2.5 pr-4 border-r border-white/10">
          <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-black shrink-0">
            {selectedIds.length}
          </div>
          <span className="text-sm text-white font-semibold whitespace-nowrap">vendor{selectedIds.length > 1 ? 's' : ''} selected</span>
          <button onClick={onClearSelection} className="ml-1 text-neutral-500 hover:text-white transition-colors" title="Clear selection">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleStatusChange('approved')}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all hover:shadow-md hover:shadow-emerald-600/30"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            Approve
          </button>

          <button
            onClick={() => handleStatusChange('rejected')}
            className="flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-all hover:shadow-md hover:shadow-red-600/30"
          >
            <XCircle className="w-3.5 h-3.5" />
            Reject
          </button>

          <button
            onClick={() => handleStatusChange('observation')}
            className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black rounded-xl text-xs font-bold transition-all hover:shadow-md hover:shadow-amber-500/30"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Flag
          </button>

          <div className="w-px h-5 bg-white/10 mx-1" />

          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-4 py-2 bg-white/8 hover:bg-white/15 text-white rounded-xl text-xs font-bold border border-white/10 hover:border-white/20 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionBar;
