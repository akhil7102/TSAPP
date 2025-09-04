import React, { useState } from 'react';
import { Temple } from '../data/temples';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { 
  MapPin, 
  Clock, 
  Star, 
  Calendar, 
  Phone, 
  Globe, 
  Mail, 
  Navigation, 
  Bookmark, 
  BookmarkCheck,
  ArrowLeft,
  Share,
  Camera
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface TempleProfileProps {
  language: 'english' | 'telugu';
  onNavigate: (screen: any, temple?: Temple) => void;
  temple: Temple;
  bookmarkedTemples: string[];
  onToggleBookmark: (templeId: string) => void;
  temples: Temple[];
}

export function TempleProfile({ 
  language, 
  onNavigate, 
  temple, 
  bookmarkedTemples, 
  onToggleBookmark 
}: TempleProfileProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const isBookmarked = bookmarkedTemples.includes(temple.id);

  const texts = {
    english: {
      back: 'Back',
      bookmark: 'Bookmark',
      bookmarked: 'Bookmarked',
      share: 'Share',
      getDirections: 'Get Directions',
      overview: 'Overview',
      timings: 'Timings',
      festivals: 'Festivals',
      contact: 'Contact',
      gallery: 'Gallery',
      description: 'Description',
      history: 'History',
      visitingHours: 'Visiting Hours',
      pujaTimings: 'Puja Timings',
      features: 'Features',

      templeType: 'Temple Type',
      upcomingFestivals: 'Upcoming Festivals',
      contactInfo: 'Contact Information',
      phone: 'Phone',
      website: 'Website',
      email: 'Email',
      address: 'Address',
      open: 'Open',
      closed: 'Closed',
      morning: 'Morning',
      evening: 'Evening',
      call: 'Call',
      visit: 'Visit Website',
      sendEmail: 'Send Email'
    },
    telugu: {
      back: 'వెనుకకు',
      bookmark: 'బుక్‌��ార్క్',
      bookmarked: 'బుక్‌మార్క్ చేయబడింది',
      share: 'షేర్',
      getDirections: 'దిశలు పొందండి',
      overview: 'వివరణ',
      timings: 'సమయాలు',
      festivals: 'పండుగలు',
      contact: 'సంప్రదింపు',
      gallery: 'గ్యాలరీ',
      description: 'వివరణ',
      history: 'చరిత్ర',
      visitingHours: 'దర్శన సమయాలు',
      pujaTimings: 'పూజ సమయాలు',
      features: 'సౌకర్యాలు',

      templeType: 'ఆలయ రకం',
      upcomingFestivals: 'రాబోయే పండుగలు',
      contactInfo: 'సంప్రదింపు సమాచారం',
      phone: 'ఫోన్',
      website: 'వెబ్‌సైట్',
      email: 'ఇమెయిల్',
      address: 'చిరునామా',
      open: 'తెరిచి ఉంది',
      closed: 'మూసి ఉంది',
      morning: 'ఉదయం',
      evening: 'సాయంత్రం',
      call: 'కాల్ చేయండి',
      visit: 'వెబ్‌సై��్ సందర్శించండి',
      sendEmail: 'ఇమెయిల్ పంపం���ి'
    }
  };

  const t = texts[language];

  const handleGetDirections = () => {
    const { latitude, longitude } = temple.location;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    window.open(url, '_blank');
  };

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleWebsite = (website: string) => {
    window.open(website, '_blank');
  };

  const handleEmail = (email: string) => {
    window.open(`mailto:${email}`, '_self');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: temple.name[language],
          text: temple.description[language],
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
    }
  };


  return (
    <div className="pb-20" style={{ scrollBehavior: 'smooth' }}>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b p-4 flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate('home')}
          className="p-2"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="flex-1 text-lg truncate">{temple.name[language]}</h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleShare}
          className="p-2"
        >
          <Share className="w-4 h-4" />
        </Button>
        <Button
          variant={isBookmarked ? "default" : "ghost"}
          size="sm"
          onClick={() => onToggleBookmark(temple.id)}
          className="p-2"
        >
          {isBookmarked ? (
            <BookmarkCheck className="w-4 h-4" />
          ) : (
            <Bookmark className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Hero Image */}
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={`https://images.unsplash.com/1200x600/?temple,${temple.templeType},architecture`}
          alt={temple.name[language]}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant={temple.isOpen ? 'default' : 'secondary'}>
              {temple.isOpen ? t.open : t.closed}
            </Badge>
            <Badge variant="outline" className="bg-white/90">
              {temple.templeType}
            </Badge>
          </div>
          <h2 className="text-xl text-white mb-1">{temple.name[language]}</h2>
          <p className="text-white/90 text-sm">{temple.deity[language]}</p>
        </div>
      </div>

      {/* Quick Info */}
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          {temple.location.address[language]}
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          {temple.timings.morning} • {temple.timings.evening}
        </div>
        


        <Button 
          onClick={handleGetDirections}
          className="w-full mt-3"
        >
          <Navigation className="w-4 h-4 mr-2" />
          {t.getDirections}
        </Button>
      </div>

      <Separator />

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="p-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="text-xs">{t.overview}</TabsTrigger>
          <TabsTrigger value="timings" className="text-xs">{t.timings}</TabsTrigger>
          <TabsTrigger value="festivals" className="text-xs">{t.festivals}</TabsTrigger>
          <TabsTrigger value="contact" className="text-xs">{t.contact}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t.description}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {temple.description[language]}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t.history}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {temple.history[language]}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t.features}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {temple.features.map((feature, index) => (
                  <Badge key={index} variant="outline">
                    {feature}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timings" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t.visitingHours}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">{t.morning}</span>
                <span className="text-sm">{temple.timings.morning}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm">{t.evening}</span>
                <span className="text-sm">{temple.timings.evening}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t.pujaTimings}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {temple.timings.pujaTimings.map((time, index) => (
                  <div key={index} className="p-2 bg-accent rounded text-center text-sm">
                    {time}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="festivals" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t.upcomingFestivals}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {temple.festivals.map((festival, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="bg-primary text-primary-foreground rounded-lg p-2 text-center min-w-[50px]">
                    <div className="text-xs">
                      {new Date(festival.date).toLocaleDateString('en-US', { month: 'short' })}
                    </div>
                    <div className="text-lg">
                      {new Date(festival.date).getDate()}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm text-foreground mb-1">
                      {festival.name[language]}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {festival.description[language]}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t.contactInfo}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {temple.contact.phone && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{t.phone}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCall(temple.contact.phone!)}
                  >
                    {t.call}
                  </Button>
                </div>
              )}

              {temple.contact.website && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span className="text-sm">{t.website}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleWebsite(temple.contact.website!)}
                  >
                    {t.visit}
                  </Button>
                </div>
              )}

              {temple.contact.email && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{t.email}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEmail(temple.contact.email!)}
                  >
                    {t.sendEmail}
                  </Button>
                </div>
              )}

              <Separator />

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{t.address}</span>
                </div>
                <p className="text-sm text-muted-foreground pl-6">
                  {temple.location.address[language]}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
