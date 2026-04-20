import { Search, Filter, SortDesc } from 'lucide-react';

const FilterBar = ({ setFilterText, setSortBy, sortBy }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 w-full relative z-10">
      <div className="relative w-full md:w-auto flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-white/50 w-5 h-5 pointer-events-none" />
        <input 
          type="text" 
          placeholder="Scan frequencies (Search)..." 
          onChange={(e) => setFilterText(e.target.value)}
          className="w-full bg-space-black/50 border border-glass-border rounded-full py-2 pl-10 pr-4 text-sm font-body text-white placeholder-muted-white/40 focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_10px_rgba(0,255,209,0.3)] transition-all duration-300"
        />
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="flex items-center gap-2 bg-space-black/50 border border-glass-border rounded-full py-1.5 px-3">
          <SortDesc className="text-electric-indigo w-4 h-4" />
          <select 
            className="bg-transparent text-sm font-heading tracking-wide focus:outline-none text-muted-white/80 cursor-pointer appearance-none"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="cost-desc" className="bg-space-black text-white">Cost (High - Low)</option>
            <option value="cost-asc" className="bg-space-black text-white">Cost (Low - High)</option>
            <option value="name" className="bg-space-black text-white">Name</option>
            <option value="date" className="bg-space-black text-white">Next Billing Date</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
