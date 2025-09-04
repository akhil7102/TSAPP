import React, { useState, useEffect, useMemo } from 'react';
import { Temple, districts, deities, templeTypes } from '../data/temples';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Search as SearchIcon, Filter, MapPin, Clock, Star, X, Mic } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SearchProps {
  language: 'english' | 'telugu';
  onNavigate: (screen: any, temple?: Temple) => void;
  temples: Temple[];
  bookmarkedTemples: string[];
  onToggleBookmark: (templeId: string) => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  isOffline: boolean;
  headerPinned?: boolean;
}

interface SearchFilters {
  state: string;
  district: string;
  deity: string;
  templeType: string;
  isOpen: boolean | null;

}

export function Search({
  language,
  onNavigate,
  temples,
  bookmarkedTemples,
  onToggleBookmark,
  searchQuery,
  onSearchQueryChange,
  isOffline,
  headerPinned = false
}: SearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    state: '',
    district: '',
    deity: '',
    templeType: '',
    isOpen: null
  });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const texts = {
    english: {
      searchPlaceholder: 'Search temples, deities, locations...',
      filters: 'Filters',
      state: 'State',
      district: 'District',
      deity: 'Deity',
      templeType: 'Temple Type',
      openStatus: 'Status',

      openOnly: 'Open Now',
      anyState: 'Any State',
      anyDistrict: 'Any District',
      anyDeity: 'Any Deity',
      anyType: 'Any Type',
      clearFilters: 'Clear All',
      applyFilters: 'Apply Filters',
      resultsFound: 'temples found',
      noResults: 'No temples found',
      noResultsDesc: 'No temples found. Try refining your search.',
      suggestions: 'Suggestions',
      recentSearches: 'Recent Searches',
      popularSearches: 'Popular Searches',
      open: 'Open',
      closed: 'Closed'
    },
    telugu: {
      searchPlaceholder: 'ఆలయాలు, దేవతలు, ప్రాంతాలను వెతకండి...',
      filters: 'ఫిల్ట���్లు',
      state: 'రాష్ట్రం',
      district: 'జిల్లా',
      deity: 'దేవత',
      templeType: 'ఆలయ రకం',
      openStatus: 'స్థితి',

      openOnly: 'ఇప్పుడు తెరిచి ఉంది',
      anyState: 'ఏదైనా రాష్ట్రం',
      anyDistrict: 'ఏదైనా జిల్లా',
      anyDeity: 'ఏదైనా దేవత',
      anyType: 'ఏదైనా రకం',
      clearFilters: 'అన్నీ క్లియర్ చేయి',
      applyFilters: 'ఫిల్టర్లు వేయి',
      resultsFound: 'ఆలయాలు దొరికాయి',
      noResults: 'ఆలయాలు దొరకలేదు',
      noResultsDesc: 'ఆలయాలు దొరకలేదు. మీ వెతుకులాటను మెరుగుపరచండి.',
      suggestions: 'సూచనలు',
      recentSearches: 'ఇటీవలి వెతుకులాట',
      popularSearches: 'ప్రసిద్ధ వెతుకులాట',
      open: 'తెరిచి ఉంది',
      closed: 'మూసి ఉంది'
    }
  };

  const t = texts[language];

  // Generate search suggestions
  const suggestions = useMemo(() => {
    if (!searchQuery || searchQuery.length < 2) return [];
    
    const query = searchQuery.toLowerCase();
    const suggestions = new Set<string>();
    
    temples.forEach(temple => {
      // Temple names
      if (temple.name[language].toLowerCase().includes(query)) {
        suggestions.add(temple.name[language]);
      }
      // Deities
      if (temple.deity[language].toLowerCase().includes(query)) {
        suggestions.add(temple.deity[language]);
      }
      // Districts
      if (temple.district.toLowerCase().includes(query)) {
        suggestions.add(temple.district);
      }
      // States
      if (temple.state.toLowerCase().includes(query)) {
        suggestions.add(temple.state === 'TS' ? 'Telangana' : 'Andhra Pradesh');
      }
    });
    
    return Array.from(suggestions).slice(0, 5);
  }, [searchQuery, language, temples]);

  // Filter temples based on search query and filters
  const filteredTemples = useMemo(() => {
    return temples.filter(temple => {
      // Text search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = temple.name[language].toLowerCase().includes(query);
        const matchesDeity = temple.deity[language].toLowerCase().includes(query);
        const matchesDistrict = temple.district.toLowerCase().includes(query);
        const matchesState = temple.state.toLowerCase().includes(query);
        const matchesDescription = temple.description[language].toLowerCase().includes(query);
        
        if (!(matchesName || matchesDeity || matchesDistrict || matchesState || matchesDescription)) {
          return false;
        }
      }

      // Apply filters
      if (filters.state && temple.state !== filters.state) return false;
      if (filters.district && temple.district !== filters.district) return false;
      if (filters.deity && !temple.deity[language].includes(filters.deity)) return false;
      if (filters.templeType && temple.templeType !== filters.templeType) return false;
      if (filters.isOpen !== null && temple.isOpen !== filters.isOpen) return false;


      return true;
    });
  }, [temples, searchQuery, filters, language]);

  const clearFilters = () => {
    setFilters({
      state: '',
      district: '',
      deity: '',
      templeType: '',
      isOpen: null
    });
  };

  const TempleCard = ({ temple }: { temple: Temple }) => (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all duration-300 bg-card/80 backdrop-blur border-primary/20"
      onClick={() => onNavigate('temple', temple)}
    >
      <div className="flex">
        <div className="w-24 h-24 flex-shrink-0">
          <ImageWithFallback
            src={`https://images.unsplash.com/400x400/?temple,${temple.templeType},${temple.name.english}`}
            alt={temple.name[language]}
            className="w-full h-full object-cover rounded-l-lg"
          />
        </div>
        <div className="flex-1 p-3">
          <div className="flex items-start justify-between mb-1">
            <h3 className="text-sm text-foreground leading-tight font-medium">
              {temple.name[language]}
            </h3>
            <Badge 
              variant={temple.isOpen ? 'default' : 'secondary'} 
              className={`text-xs ml-2 ${temple.isOpen ? 'bg-green-600' : 'bg-gray-600'} text-white`}
            >
              {temple.isOpen ? t.open : t.closed}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mb-2">
            {temple.deity[language]}
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
            <MapPin className="w-3 h-3" />
            {temple.district}, {temple.state}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
            <Clock className="w-3 h-3" />
            {temple.timings.morning}
          </div>
          <div className="flex items-center justify-end">
            <Badge variant="outline" className="text-xs border-primary/30">
              {temple.templeType}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="p-4 pt-4 space-y-4 pb-20" style={{ scrollBehavior: 'smooth' }}>


      {/* Search row with Filters button */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-full">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => {
              onSearchQueryChange(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder={t.searchPlaceholder}
            className="h-9 text-sm pl-10 pr-20 border-primary/30 focus:border-primary bg-input-background"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onSearchQueryChange('');
                  setShowSuggestions(false);
                }}
                className="h-6 w-6 p-0 hover:bg-accent"
              >
                <X className="w-3 h-3" />
              </Button>
            )}
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-accent">
              <Mic className="w-3 h-3" />
            </Button>
          </div>

          {/* Search Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <Card className="absolute top-full left-0 right-0 z-10 mt-1 bg-card/95 backdrop-blur border-primary/20">
              <CardContent className="p-2">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-accent rounded cursor-pointer text-sm text-foreground"
                    onClick={() => {
                      onSearchQueryChange(suggestion);
                      setShowSuggestions(false);
                    }}
                  >
                    {suggestion}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Filters button */}
        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 border-primary/30 hover:bg-accent whitespace-nowrap">
              <Filter className="w-4 h-4 mr-1" />
              {t.filters}
              {Object.values(filters).some(v => v) && (
                <Badge variant="secondary" className="ml-1 text-xs bg-primary text-white">
                  {Object.values(filters).filter(v => v).length}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh] bg-card/95 backdrop-blur">
            <SheetHeader>
              <SheetTitle className="text-foreground">{t.filters}</SheetTitle>
              <SheetDescription className="text-muted-foreground">
                Refine your temple search
              </SheetDescription>
            </SheetHeader>

            <div className="py-4 space-y-4">
              {/* State Filter */}
              <div>
                <label className="text-sm mb-2 block text-foreground font-medium">{t.state}</label>
                <Select value={filters.state || undefined} onValueChange={(value) => setFilters(prev => ({ ...prev, state: value || '', district: '' }))}>
                  <SelectTrigger className="border-primary/30">
                    <SelectValue placeholder={t.anyState} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TS">Telangana</SelectItem>
                    <SelectItem value="AP">Andhra Pradesh</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* District Filter */}
              <div>
                <label className="text-sm mb-2 block text-foreground font-medium">{t.district}</label>
                <Select
                  value={filters.district || undefined}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, district: value || '' }))}
                  disabled={!filters.state}
                >
                  <SelectTrigger className="border-primary/30">
                    <SelectValue placeholder={t.anyDistrict} />
                  </SelectTrigger>
                  <SelectContent>
                    {filters.state && districts[filters.state as 'TS' | 'AP'].map(district => (
                      <SelectItem key={district} value={district}>{district}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Deity Filter */}
              <div>
                <label className="text-sm mb-2 block text-foreground font-medium">{t.deity}</label>
                <Select value={filters.deity || undefined} onValueChange={(value) => setFilters(prev => ({ ...prev, deity: value || '' }))}>
                  <SelectTrigger className="border-primary/30">
                    <SelectValue placeholder={t.anyDeity} />
                  </SelectTrigger>
                  <SelectContent>
                    {deities.map(deity => (
                      <SelectItem key={deity} value={deity}>{deity}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Temple Type Filter */}
              <div>
                <label className="text-sm mb-2 block text-foreground font-medium">{t.templeType}</label>
                <Select value={filters.templeType || undefined} onValueChange={(value) => setFilters(prev => ({ ...prev, templeType: value || '' }))}>
                  <SelectTrigger className="border-primary/30">
                    <SelectValue placeholder={t.anyType} />
                  </SelectTrigger>
                  <SelectContent>
                    {templeTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Open Status */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="openOnly"
                  checked={filters.isOpen === true}
                  onCheckedChange={(checked) => setFilters(prev => ({ ...prev, isOpen: checked ? true : null }))}
                />
                <label htmlFor="openOnly" className="text-sm text-foreground">
                  {t.openOnly}
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={clearFilters} className="flex-1 border-primary/30">
                  {t.clearFilters}
                </Button>
                <Button onClick={() => setIsFilterOpen(false)} className="flex-1 gradient-primary text-white">
                  {t.applyFilters}
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Active Filter Chips */}
      <div className="flex items-center gap-2 flex-wrap">
        {filters.state && (
          <Badge variant="secondary" className="text-xs bg-primary text-white">
            {filters.state === 'TS' ? 'Telangana' : 'Andhra Pradesh'}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFilters(prev => ({ ...prev, state: '', district: '' }))}
              className="h-4 w-4 p-0 ml-1 hover:bg-white/20"
            >
              <X className="w-2 h-2" />
            </Button>
          </Badge>
        )}
        {filters.district && (
          <Badge variant="secondary" className="text-xs bg-primary text-white">
            {filters.district}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFilters(prev => ({ ...prev, district: '' }))}
              className="h-4 w-4 p-0 ml-1 hover:bg-white/20"
            >
              <X className="w-2 h-2" />
            </Button>
          </Badge>
        )}
      </div>

      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-muted-foreground font-medium">
            {filteredTemples.length} {t.resultsFound}
          </p>
        </div>

        {filteredTemples.length > 0 ? (
          <div className="space-y-3">
            {filteredTemples.map(temple => (
              <TempleCard key={temple.id} temple={temple} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <SearchIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium text-foreground mb-2">{t.noResults}</p>
            <p className="text-sm text-muted-foreground">{t.noResultsDesc}</p>
          </div>
        )}
      </div>
    </div>
  );
}
