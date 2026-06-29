import React, { useState } from 'react';
import { Search, X, ChevronDown, SlidersHorizontal, Tag, Bookmark } from 'lucide-react';

interface FilterBarProps {
  filters: {
    search: string;
    activity: string[];
    categories: string[];
    status: string[];
    date: string;
  };
  setFilters: (filters: any) => void;
  categoriesList: string[];
  onSaveView: (name: string) => void;
  counts?: { registeredToday: number; updatedToday: number; underObservation: number };
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, setFilters, categoriesList, onSaveView, counts }) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [saveViewName, setSaveViewName] = useState('');
  const [isSavingView, setIsSavingView] = useState(false);

  const toggleFilter = (type: 'activity' | 'status' | 'categories', value: string) => {
    setFilters((prev: any) => {
      const current = prev[type];
      const updated = current.includes(value)
        ? current.filter((v: string) => v !== value)
        : [...current, value];
      return { ...prev, [type]: updated };
    });
  };

  const handleSaveView = () => {
    if (!saveViewName) return;
    onSaveView(saveViewName);
    setSaveViewName('');
    setIsSavingView(false);
  };

  const activeFilterCount = filters.activity.length + filters.status.length + filters.categories.length + (filters.date ? 1 : 0);

  const Chip = ({ label, isActive, onClick, color = 'red', count }: { label: string; isActive: boolean; onClick: () => void; color?: string; count?: number }) => {
    const activeColors: Record<string, string> = {
      red:    'bg-red-600 border-red-500 text-white shadow-sm shadow-red-600/40',
      green:  'bg-emerald-600 border-emerald-500 text-white shadow-sm shadow-emerald-600/40',
      blue:   'bg-blue-600 border-blue-500 text-white shadow-sm shadow-blue-600/40',
      amber:  'bg-amber-500 border-amber-400 text-black shadow-sm shadow-amber-500/40',
      gray:   'bg-neutral-600 border-neutral-500 text-white shadow-sm shadow-neutral-600/30',
      purple: 'bg-purple-600 border-purple-500 text-white shadow-sm shadow-purple-600/40',
    };
    return (
      <button
        onClick={onClick}
        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold border transition-all duration-150 ${
          isActive
            ? activeColors[color]
            : 'bg-neutral-800/80 border-white text-neutral-400 hover:border-white hover:text-white hover:bg-neutral-700/80'
        }`}
      >
        {label}
        {count !== undefined && count > 0 && (
          <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
            isActive ? 'bg-white/20 text-white' : 'bg-white/10 text-neutral-300'
          }`}>
            {count}
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="rounded-xl border border-white bg-neutral-800/30 p-4 mb-5 space-y-3.5">
      {/* Row 1: Search + Category */}
      <div className="flex flex-wrap gap-3 items-center">
        {/* Search */}
        <div className="relative flex-grow min-w-[200px] max-w-sm">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name, email, PAN, GST..."
            value={filters.search}
            onChange={(e) => setFilters((p: any) => ({ ...p, search: e.target.value }))}
            className="w-full bg-neutral-900/80 border border-white rounded-xl pl-10 pr-9 py-2.5 text-sm text-white placeholder-neutral-600 outline-none focus:border-red-500/60 focus:ring-1 focus:ring-red-500/20 transition-all"
          />
          {filters.search && (
            <button
              onClick={() => setFilters((p: any) => ({ ...p, search: '' }))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
              filters.categories.length > 0
                ? 'bg-red-600/10 border-red-500/40 text-red-400'
                : 'bg-neutral-900/80 border-white text-neutral-400 hover:border-white hover:text-white'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>{filters.categories.length === 0 ? 'All Categories' : `${filters.categories.length} Categories`}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
          </button>

          {isCategoryOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsCategoryOpen(false)} />
              <div className="absolute top-full mt-2 left-0 w-72 max-h-80 overflow-y-auto bg-neutral-900 border border-white shadow-2xl z-50 rounded-xl p-3 space-y-0.5 scrollbar-thin scrollbar-thumb-white/10">
                <div className="flex items-center justify-between mb-2 px-1 pb-2 border-b border-white">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Vendor Categories</p>
                  {filters.categories.length > 0 && (
                    <button onClick={() => setFilters((p: any) => ({ ...p, categories: [] }))} className="text-[10px] text-red-400 hover:text-red-300 font-bold">
                      Clear all
                    </button>
                  )}
                </div>
                {categoriesList.map(cat => (
                  <label key={cat} className="flex items-center gap-3 p-2 hover:bg-white/5 cursor-pointer rounded-lg transition-colors">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(cat)}
                      onChange={() => toggleFilter('categories', cat)}
                      className="accent-red-600 w-3.5 h-3.5 rounded cursor-pointer"
                    />
                    <span className="text-sm text-neutral-300 select-none">{cat}</span>
                  </label>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Date Picker */}
        <div className="relative">
          <input
            type="date"
            value={filters.date || ''}
            onChange={(e) => setFilters((p: any) => ({ ...p, date: e.target.value }))}
            className={`px-4 py-2 rounded-xl border text-sm font-semibold transition-all outline-none ${
              filters.date
                ? 'bg-red-600/10 border-red-500/40 text-red-400'
                : 'bg-neutral-900/80 border-white text-neutral-400 hover:border-white hover:text-white focus:border-white'
            }`}
          />
        </div>

        {/* Active filter count + clear */}
        {activeFilterCount > 0 && (
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-neutral-500 font-semibold">{activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active</span>
            <button
              onClick={() => setFilters({ search: '', activity: [], categories: [], status: [], date: '' })}
              className="text-xs text-red-400 hover:text-red-300 font-bold flex items-center gap-1 transition-colors"
            >
              <X className="w-3 h-3" /> Clear all
            </button>
          </div>
        )}
      </div>

      {/* Row 2: Activity + Status Chips + Save View */}
      <div className="flex flex-wrap gap-2 items-center">
        <div className="flex items-center gap-1.5 mr-1">
          <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-600" />
          <span className="text-[11px] font-bold text-neutral-600 uppercase tracking-wider">Activity</span>
        </div>
        <Chip label="All" isActive={filters.activity.includes('all')} onClick={() => toggleFilter('activity', 'all')} />
        <Chip
          label="⚠ Action Needed"
          count={counts?.underObservation}
          isActive={filters.activity.includes('observation')}
          onClick={() => toggleFilter('activity', 'observation')}
          color="amber"
        />
        <Chip label="✓ Ready to Review" isActive={filters.activity.includes('ready')} onClick={() => toggleFilter('activity', 'ready')} color="green" />
        <Chip
          label="Added Today"
          count={counts?.registeredToday}
          isActive={filters.activity.includes('added_today')}
          onClick={() => toggleFilter('activity', 'added_today')}
          color="blue"
        />
        <Chip
          label="Updated Today"
          count={counts?.updatedToday}
          isActive={filters.activity.includes('updated_today')}
          onClick={() => toggleFilter('activity', 'updated_today')}
          color="purple"
        />

        <div className="w-px h-4 bg-white mx-1" />

        {/* Status toggle switches */}
        <span className="text-[11px] font-bold text-neutral-600 uppercase tracking-wider mr-1">Status</span>
        {(['approved', 'pending', 'rejected'] as const).map((s) => {
          const isOn = filters.status.includes(s);
          const colors = {
            approved: { on: 'bg-emerald-500', label: 'text-emerald-400' },
            pending:  { on: 'bg-amber-500',   label: 'text-amber-400'   },
            rejected: { on: 'bg-neutral-500', label: 'text-neutral-400' },
          };
          return (
            <button
              key={s}
              onClick={() => toggleFilter('status', s)}
              className="flex items-center gap-2 group"
              title={`Filter by ${s}`}
            >
              {/* Toggle track */}
              <div className={`relative w-9 h-5 rounded-full transition-all duration-200 border ${
                isOn ? `${colors[s].on} border-transparent` : 'bg-neutral-800 border-white'
              }`}>
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${
                  isOn ? 'left-[calc(100%-18px)]' : 'left-0.5'
                }`} />
              </div>
              <span className={`text-[11px] font-bold capitalize transition-colors ${
                isOn ? colors[s].label : 'text-neutral-600'
              }`}>{s}</span>
            </button>
          );
        })}

        {/* Save View */}
        <div className="ml-auto">
          {isSavingView ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="View name..."
                value={saveViewName}
                onChange={(e) => setSaveViewName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveView()}
                className="bg-neutral-900 border border-white text-sm text-white px-3 py-1.5 rounded-lg outline-none focus:border-red-500 w-36 transition-colors"
                autoFocus
              />
              <button onClick={handleSaveView} className="text-xs bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded-lg font-bold transition-colors">Save</button>
              <button onClick={() => setIsSavingView(false)} className="text-xs text-neutral-500 hover:text-white transition-colors">Cancel</button>
            </div>
          ) : (
            <button
              onClick={() => setIsSavingView(true)}
              className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-white font-semibold transition-colors"
            >
              <Bookmark className="w-3.5 h-3.5" /> Save view
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
