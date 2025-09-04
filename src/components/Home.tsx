import React from 'react';
import { Temple } from '../data/temples';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MapPin, Clock, Star, Calendar, Plus } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomeProps {
  language: 'english' | 'telugu';
  onNavigate: (screen: any, temple?: Temple, category?: string) => void;
  temples: Temple[];
  bookmarkedTemples: string[];
  onToggleBookmark: (templeId: string) => void;
  isOffline: boolean;
}

export function Home({ language, onNavigate, temples, bookmarkedTemples, onToggleBookmark, isOffline }: HomeProps) {
  const texts = {
    english: {
      title: 'Discover Sacred Temples',
      subtitle: 'Discover the sacred temples of Telangana & Andhra Pradesh',
      featuredTemples: 'Featured Temples',
      upcomingFestivals: 'Upcoming Festivals',
      categories: 'Browse by Category',
      viewAll: 'View All',
      open: 'Open',
      closed: 'Closed',
      popularTemples: 'Popular Temples',
      recentlyAdded: 'Recently Added',
      nearYou: 'Near You',
      searchPlaceholder: 'Search temples...',
      addTemple: 'Add Temple',
      noFestivals: 'No upcoming festivals for this temple.'
    },
    telugu: {
      title: 'పవిత్ర ఆలయాలను కనుగొనండి',
      subtitle: 'తెలంగాణ మరియు ఆంధ్రప్రదేశ్ పవిత్ర ఆలయాలను కనుగొనండి',
      featuredTemples: 'ప్రముఖ ఆలయాలు',
      upcomingFestivals: 'రాబోయే పండుగలు',
      categories: 'వర్గాల వారీగా చూడండి',
      viewAll: 'అన్నీ చూడండి',
      open: 'తెరిచి ఉంది',
      closed: 'మూసి ఉంది',
      popularTemples: 'ప్రసిద్ధ ఆలయ���లు',
      recentlyAdded: 'ఇటీవల జోడించినవి',
      nearYou: 'మీ దగ్గర',
      searchPlaceholder: 'Search temples...',
      addTemple: 'ఆలయం జోడించు',
      noFestivals: 'ఈ ఆలయానికి రాబోయే పండుగలు లేవు.'
    }
  };

  const t = texts[language];

  // Get featured temples (daily shuffled selection)
  const dailySeed = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const hashFor = (s: string) => {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  };
  const featuredTemples = [...temples]
    .sort((a, b) => (hashFor(`${dailySeed}-${a.id}`) - hashFor(`${dailySeed}-${b.id}`)))
    .slice(0, 4);

  // Get upcoming festivals (merge from DB + embedded temple data)
  const today = new Date();
  const [dbFestivals, setDbFestivals] = React.useState<any[]>([]);
  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { supabaseClient } = await import('../lib/supabase');
        if (!supabaseClient) return;
        const { data, error } = await supabaseClient
          .from('upcoming_festivals')
          .select('*')
          .gte('date', new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString())
          .order('date', { ascending: true })
          .limit(10);
        if (!cancelled && !error) setDbFestivals(data || []);
      } catch {}
    })();
    return () => { cancelled = true; };
  }, []);

  const embedded = temples
    .flatMap(temple =>
      temple.festivals.map(festival => ({
        ...festival,
        templeId: temple.id,
        templeName: temple.name[language]
      }))
    )
    .filter(f => new Date(f.date) >= new Date(today.getFullYear(), today.getMonth(), today.getDate()));

  const mergedUpcoming = [
    ...dbFestivals.map((f) => ({
      name: { english: f.name, telugu: f.name },
      description: { english: f.description || '', telugu: f.description || '' },
      date: f.date,
      templeId: null,
      templeName: f.temple_name || '',
    })),
    ...embedded
  ]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  // All temple categories (removed Cave category)
  const categories = [
    {
      name: { english: 'Ancient Temples', telugu: 'పురాతన ఆలయాలు' },
      type: 'Ancient',
      emoji: '🏛️',
      bgColor: 'bg-amber-100',
      iconColor: 'text-amber-600'
    },
    {
      name: { english: 'Hill Temples', telugu: 'కొండ ఆలయాలు' },
      type: 'Hill',
      emoji: '⛰️',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      name: { english: 'River Temples', telugu: 'నది ఆలయాలు' },
      type: 'River',
      emoji: '🌊',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      name: { english: 'Modern Temples', telugu: 'ఆధునిక ఆలయాలు' },
      type: 'Modern',
      emoji: '🏢',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600'
    }
  ];

  const TempleCard = ({ temple }: { temple: Temple }) => (
    <Card 
      className="w-64 flex-shrink-0 cursor-pointer hover:shadow-lg transition-all duration-300 bg-card/80 backdrop-blur border-primary/20"
      onClick={() => onNavigate('temple', temple)}
    >
      <div className="relative h-32 overflow-hidden rounded-t-lg">
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
        <CardTitle className="text-sm leading-tight text-foreground">
          {temple.name[language]}
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          {temple.deity[language]}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
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
      </CardContent>
    </Card>
  );

  return (
    <div className="p-4 space-y-6 pb-20" style={{ scrollBehavior: 'smooth' }}>
      {/* Search Bar */}
      <Button
        variant="outline"
        className="w-full justify-start text-muted-foreground border-primary/30 hover:bg-accent"
        onClick={() => onNavigate('search')}
      >
        <span>{t.searchPlaceholder}</span>
      </Button>

      {/* Hero Section */}
      <div className="text-center space-y-3 py-4">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {t.title}
        </h2>
        <p className="text-base text-muted-foreground max-w-md mx-auto">
          {t.subtitle}
        </p>
      </div>

      {/* Beta notice */}
      <div className="bg-yellow-50 text-yellow-900 border border-yellow-200 rounded-md p-3 text-sm">
        Temple Sanathan is currently in beta. Please verify all directions on Google Maps and avoid relying solely on the app for navigation.
      </div>

      {/* Featured Temples */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">{t.featuredTemples}</h3>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onNavigate('search')}
            className="text-primary hover:bg-accent"
          >
            {t.viewAll}
          </Button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {featuredTemples.map(temple => (
            <TempleCard key={temple.id} temple={temple} />
          ))}
        </div>
      </section>

      {/* Browse by Category */}
      <section>
        <h3 className="text-lg font-semibold text-foreground mb-4">{t.categories}</h3>
        
        <div className="grid grid-cols-2 gap-4">
          {categories.map(category => {
            const categoryTempleCount = temples.filter(t => t.templeType === category.type).length;
            return (
              <Card
                key={category.type}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 bg-card/80 backdrop-blur border-primary/20 h-32"
                onClick={() => onNavigate('category', undefined, category.type)}
              >
                <CardContent className="p-4 h-full flex flex-col items-center justify-center text-center">
                  <div className={`w-12 h-12 rounded-full ${category.bgColor} flex items-center justify-center mb-3`}>
                    <span className="text-2xl">{category.emoji}</span>
                  </div>
                  <h4 className="font-medium text-foreground text-sm mb-1">
                    {category.name[language]}
                  </h4>
                  <Badge variant="outline" className="text-xs border-primary/30">
                    {categoryTempleCount} {language === 'english' ? 'temples' : 'ఆలయాలు'}
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Upcoming Festivals */}
      <section>
        <h3 className="text-lg font-semibold text-foreground mb-4">{t.upcomingFestivals}</h3>
        {mergedUpcoming.length > 0 ? (
          <div className="space-y-3">
            {mergedUpcoming.map((festival, index) => {
              const pick = (val: any): string => {
                if (!val) return '';
                if (typeof val === 'string') return val;
                if (typeof val === 'object') {
                  const loc = val[language];
                  if (typeof loc === 'string') return loc;
                  if (typeof val.english === 'string') return val.english;
                  return '';
                }
                return String(val);
              };
              return (
                <Card key={index} className="bg-card/80 backdrop-blur border-primary/20">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="gradient-primary text-white rounded-lg p-2 text-center min-w-[50px]">
                        <div className="text-xs">
                          {new Date(festival.date).toLocaleDateString('en-US', { month: 'short' })}
                        </div>
                        <div className="text-lg font-bold">
                          {new Date(festival.date).getDate()}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-foreground mb-1">
                          {pick(festival.name)}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-1">
                          {pick(festival.templeName)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {pick(festival.description)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="bg-card/80 backdrop-blur border-primary/20">
            <CardContent className="p-6 text-center">
              <Calendar className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">{t.noFestivals}</p>
            </CardContent>
          </Card>
        )}
      </section>

      {/* Add Temple Button */}
      <div className="pt-4">
        <Button 
          onClick={() => onNavigate('submit')}
          className="w-full gradient-primary text-white hover:opacity-90"
        >
          <Plus className="w-4 h-4 mr-2" />
          {t.addTemple}
        </Button>
      </div>
    </div>
  );
}
