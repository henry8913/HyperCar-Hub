import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

interface FilterBarProps {
  brands: string[];
  onFilterChange: (filters: {
    minPrice: number;
    maxPrice: number;
    brand: string;
    searchQuery: string;
  }) => void;
}

const FilterBar = ({ brands, onFilterChange }: FilterBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 10000000,
    brand: "all",
    searchQuery: "",
  });

  const handleFilterChange = (key: string, value: string | number) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    // Delay filter application slightly to avoid too many rapid updates
    setTimeout(() => {
      onFilterChange(newFilters);
    }, 100);
  };

  return (
    <div className="bg-slate-800 rounded-lg p-4 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="relative flex-1 mr-4">
          <input
            type="text"
            placeholder="Cerca auto..."
            value={filters.searchQuery}
            onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
            className="w-full bg-slate-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <Search className="absolute left-3 top-2.5 text-slate-400 h-4 w-4" />
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <SlidersHorizontal size={18} />
          Filtri
        </button>
      </div>

      {isOpen && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-slate-300 mb-2">Prezzo Minimo</label>
            <input
              type="range"
              min="0"
              max="10000000"
              step="500000"
              value={filters.minPrice}
              onChange={(e) =>
                handleFilterChange("minPrice", parseInt(e.target.value))
              }
              className="w-full"
            />
            <span className="text-amber-500">
              €{filters.minPrice.toLocaleString()}
            </span>
          </div>
          <div>
            <label className="block text-slate-300 mb-2">Prezzo Massimo</label>
            <input
              type="range"
              min="0"
              max="10000000"
              step="50000"
              value={filters.maxPrice}
              onChange={(e) =>
                handleFilterChange("maxPrice", parseInt(e.target.value))
              }
              className="w-full"
            />
            <span className="text-amber-500">
              €{filters.maxPrice.toLocaleString()}
            </span>
          </div>
          <div>
            <label className="block text-slate-300 mb-2">Marca</label>
            <select
              value={filters.brand}
              onChange={(e) => handleFilterChange("brand", e.target.value)}
              className="w-full bg-slate-700 text-white py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">Tutte le Marche</option>
              {brands.map((brand) => (
                <option key={brand} value={brand.toLowerCase()}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
