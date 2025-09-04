import React from 'react';
import { Temple } from '../data/temples';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MapPin, Clock, Bookmark } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BookmarksProps {
  language: 'english' | 'telugu';
  onNavigate: (screen: any, temple?: Temple) => void;
  temples: Temple[];
  bookmarkedTemples: string[];
  onToggleBookmark: (templeId: string) => void;
  isOffline: boolean;
}

export function Bookmarks({ 
  language, 
  onNavigate, 
  temples, 
  bookmarkedTemples, 
  onToggleBookmark 
}: BookmarksProps) {
  const texts = {
    english: {
      title: 'Saved Temples',
      subtitle: 'Your bookmarked temples',
      noBookmarks: 'No saved temples yet',
      noBookmarksDesc: 'You haven\'t saved any temples yet. Bookmark your favorite temples here.',
      exploreTemples: 'Explore Temples',
      removeBookmark: 'Remove from saved',
      open: 'Open',
      closed: 'Closed',
      viewDetails: 'View Details',
      getDirections: 'Get Directions'
    },
    telugu: {
      title: 'సేవ్ చేసిన ఆలయాలు',
      subtitle: 'మీరు బుక్‌మార్క్ చేసిన ఆలయాలు',
      noBookmarks: 'సేవ్ చేసిన ఆలయాలు లేవు',
      noBookmarksDesc: 'మీరు ఇంకా ఎలాంటి ఆలయాలను సేవ్ చేయలేదు. మీ ఇష్ట ఆలయాలను ఇక్కడ బుక్‌మార్క్ చేయండి.',
      exploreTemples: 'ఆలయాలను అన్వేషించండి',
      removeBookmark: 'సేవ్ నుండి తొలగించు',
      open: 'తెరిచి ఉంది',
      closed: 'మూసి ఉంది',
      viewDetails: 'వివరాలు చూడండి',
      getDirections: 'దిశలు పొందండి'
    }
  };

  const t = texts[language];

  const savedTemples = temples.filter(temple => bookmarkedTemples.includes(temple.id));

  const handleGetDirections = (temple: Temple) => {
    const { latitude, longitude } = temple.location;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving`;
    window.open(url, '_blank');
  };

  const TempleCard = ({ temple }: { temple: Temple }) => (
    <Card className="overflow-hidden bg-card/80 backdrop-blur border-primary/20 hover:shadow-lg transition-all duration-300">
      <div className="flex">
        <div className="w-24 h-24 flex-shrink-0">
          <ImageWithFallback
            src={`https://images.unsplash.com/400x400/?temple,${temple.templeType},${temple.name.english}`}
            alt={temple.name[language]}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 p-3">
          <div className="flex items-start justify-between mb-1">
            <h3 className="text-sm text-foreground leading-tight font-medium">
              {temple.name[language]}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleBookmark(temple.id)}
              className="p-1 h-auto text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </Button>
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge 
                variant={temple.isOpen ? 'default' : 'secondary'} 
                className={`text-xs ${temple.isOpen ? 'bg-green-600' : 'bg-gray-600'} text-white`}
              >
                {temple.isOpen ? t.open : t.closed}
              </Badge>
            </div>
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleGetDirections(temple)}
                className="text-xs h-6 px-2 border-primary/30"
              >
                {t.getDirections}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate('temple', temple)}
                className="text-xs h-6 px-2 border-primary/30"
              >
                {t.viewDetails}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="p-4 pb-20" style={{ scrollBehavior: 'smooth' }}>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-1">{t.title}</h2>
        <p className="text-sm text-muted-foreground">{t.subtitle}</p>
      </div>

      {/* Content */}
      {savedTemples.length > 0 ? (
        <div className="space-y-3">
          {savedTemples.map(temple => (
            <TempleCard key={temple.id} temple={temple} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="gradient-accent p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <Bookmark className="w-12 h-12 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-3">{t.noBookmarks}</h3>
          <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
            {t.noBookmarksDesc}
          </p>
          <Button 
            onClick={() => onNavigate('search')}
            className="gradient-primary text-white px-6 py-2"
          >
            {t.exploreTemples}
          </Button>
        </div>
      )}
    </div>
  );
}