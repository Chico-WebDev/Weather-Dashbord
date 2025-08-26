// Bar de Recherche
import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

interface SearchBarProps {
  onLocationSelect: (location: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onLocationSelect }) => {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const suggestions = [
    'Paris, France',
    'London, UK',
    'New York, USA',
    'Tokyo, Japan',
    'Sydney, Australia',
    'Berlin, Germany'
  ];

  const handleSearch = (location: string) => {
    onLocationSelect(location);
    setQuery('');
    setIsExpanded(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (query.trim()) {
    onLocationSelect(query.trim());
    setQuery("");
    setIsExpanded(false);
  }
};


  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search for a city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          onBlur={() => setTimeout(() => setIsExpanded(false), 200)}
          className="w-full md:w-80 pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-100 outline-none transition-all duration-300 shadow-sm hover:shadow-md"
        />
      </form>

      {/* Suggestions de recherche */}
      {isExpanded && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-10 overflow-hidden">
          {suggestions
            .filter(location => 
              location.toLowerCase().includes(query.toLowerCase())
            )
            .map((location, index) => (
              <button
                key={index}
                onClick={() => handleSearch(location)}
                className="w-full px-4 py-3 text-left hover:bg-sky-50 transition-colors duration-200 flex items-center group"
              >
                <MapPin className="w-4 h-4 text-gray-400 mr-3 group-hover:text-sky-500" />
                <span className="text-gray-800 group-hover:text-sky-700">
                  {location}
                </span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;