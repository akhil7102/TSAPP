import React from 'react';
import { Temple } from '../data/temples';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ArrowLeft, MapPin, Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CategoryViewProps {
  language: 'english' | 'telugu';
  onNavigate: (screen: any, temple?: Temple, category?: string) => void;
  temples: Temple[];
  bookmarkedTemples: string[];
  onToggleBookmark: (templeId: string) => void;
  isOffline: boolean;
  category: string;
}

export function CategoryView({ 
  language, 
  onNavigate, 
  temples, 
  bookmarkedTemples, 
  onToggleBookmark, 
  isOffline,
  category 
}: CategoryViewProps) {
  const texts = {
    english: {
      backToHome: 'Back to Home',
      open: 'Open',
      closed: 'Closed',
      noTemples: 'No temples found in this category.',
      hillTemples: 'Hill Temples',
      ancientTemples: 'Ancient Temples',
      riverTemples: 'River Temples',
      caveTemples: 'Cave Temples',
      exploreCategory: 'Explore temples in this sacred category'
    },
    telugu: {
      backToHome: 'హోమ్‌కు తిరిగి',
      open: 'తెరిచి ఉంది',
      closed: 'మూసి ఉంది',
      noTemples: 'ఈ వర్గంలో ఆలయాలు లేవు.',
      hillTemples: 'కొండ ఆలయాలు',
      ancientTemples: 'పురాతన ఆలయాలు',
      riverTemples: 'నది ��లయాలు',
      caveTemples: 'గుహా ఆలయాలు',
      exploreCategory: 'ఈ పవిత్ర వర్గంలోని ఆలయాలను అన్వేషించండి'
    }
  };

  const t = texts[language];

  // Map category types to display names
  const categoryNames = {
    'Ancient': { english: 'Ancient Temples', telugu: 'పురాతన ఆలయాలు' },
    'Hill': { english: 'Hill Temples', telugu: 'కొండ ఆలయాలు' },
    'River': { english: 'River Temples', telugu: 'నది ఆలయాలు' },
    'Modern': { english: 'Modern Temples', telugu: 'ఆధునిక ఆలయాలు' }
  };

  // Filter temples by category
  const filteredTemples = temples.filter(temple => temple.templeType === category);

  const categoryDisplayName = categoryNames[category as keyof typeof categoryNames]?.[language] || category;

  const TempleCard = ({ temple }: { temple: Temple }) => (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all duration-300 bg-card/80 backdrop-blur border-primary/20"
      onClick={() => onNavigate('temple', temple)}
    >
      <div className="relative h-40 overflow-hidden rounded-t-lg">
        <ImageWithFallback
          src={`https://images.unsplash.com/800x600/?temple,architecture,${temple.name.english}`}
          alt={temple.name[language]}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-2 right-2 flex gap-1">
          <Badge 
            variant={temple.isOpen ? 'default' : 'secondary'} 
            className={`text-xs ${temple.isOpen ? 'bg-green-600' : 'bg-gray-600'} text-white`}
          >
            {temple.isOpen ? t.open : t.closed}
          </Badge>
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-base leading-tight text-foreground">
          {temple.name[language]}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {temple.deity[language]}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
          <MapPin className="w-4 h-4" />
          {temple.district}, {temple.state}
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
          <Clock className="w-4 h-4" />
          {temple.timings.morning}
        </div>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs border-primary/30">
            {temple.templeType}
          </Badge>
          {temple.popularity && (
            <div className="flex items-center gap-1">
              {[...Array(temple.popularity)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-primary rounded-full" />
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card/50 to-accent/20">
      {/* Header with Back Button */}
      <div className="sticky top-0 z-10 bg-card/90 backdrop-blur border-b border-primary/20 p-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-primary hover:bg-accent"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.backToHome}
          </Button>
        </div>
        <div className="mt-3">
          <h1 className="text-2xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {categoryDisplayName}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {t.exploreCategory}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {filteredTemples.length > 0 ? (
          <>
            {/* Category Summary */}
            <div className="text-center">
              <h2 className="text-lg text-foreground mb-2">
                {filteredTemples.length} {language === 'english' ? 'temples found' : 'ఆలయాలు కనుగొనబడ్డాయి'}
              </h2>
            </div>

            {/* Temples Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTemples.map(temple => (
                <TempleCard key={temple.id} temple={temple} />
              ))}
            </div>
          </>
        ) : (
          <Card className="bg-card/80 backdrop-blur border-primary/20">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🏛️</div>
              <h3 className="text-lg font-medium text-foreground mb-2">
                {t.noTemples}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === 'english' 
                  ? 'We are continuously adding new temples to our database.' 
                  : 'మేము మా డేటాబేస్‌కు కొత్త ఆలయాలను నిరంతరం జోడిస్తున్నాము.'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
