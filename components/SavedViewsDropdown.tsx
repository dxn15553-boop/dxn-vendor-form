import React, { useState, useEffect } from 'react';
import { Bookmark, ChevronDown, Check, Star } from 'lucide-react';
import { getSavedViews } from '../services/SupabaseService';

interface SavedViewsDropdownProps {
  adminId: string;
  onApplyView: (filters: any) => void;
  currentViewName?: string;
}

const SavedViewsDropdown: React.FC<SavedViewsDropdownProps> = ({ adminId, onApplyView, currentViewName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [views, setViews] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen && views.length === 0) {
      fetchViews();
    }
  }, [isOpen]);

  const fetchViews = async () => {
    try {
      const data = await getSavedViews(adminId);
      setViews(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-semibold transition-all ${
          currentViewName
            ? 'bg-red-600/10 border-red-500/40 text-red-400'
            : 'bg-neutral-800 border-white/10 text-neutral-300 hover:border-white/20 hover:text-white'
        }`}
      >
        <Bookmark className="w-3.5 h-3.5" />
        <span className="truncate max-w-[120px]">{currentViewName || 'Saved Views'}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full mt-2 right-0 w-52 bg-neutral-900 border border-white/10 shadow-2xl z-50 rounded-xl py-2 overflow-hidden"
            style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)' }}
          >
            <div className="px-3 py-1.5 mb-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-600">Saved Views</p>
            </div>
            {views.length === 0 ? (
              <div className="px-3 py-4 text-center">
                <Star className="w-5 h-5 text-neutral-700 mx-auto mb-1.5" />
                <p className="text-[11px] text-neutral-600 font-semibold">No saved views yet</p>
              </div>
            ) : (
              views.map((v) => (
                <button
                  key={v.id}
                  onClick={() => {
                    onApplyView(v.filters);
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-3 py-2.5 text-xs text-neutral-300 hover:text-white hover:bg-white/5 flex items-center justify-between transition-colors"
                >
                  <span className="truncate">{v.name}</span>
                  {currentViewName === v.name && <Check className="w-3.5 h-3.5 text-red-500 shrink-0" />}
                </button>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SavedViewsDropdown;
