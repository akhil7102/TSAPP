import React, { useState, useEffect } from 'react';
import { Temple } from '../data/temples';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MapPin, Navigation, Star, Loader } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { GoogleMap } from './maps/GoogleMap';

interface MapViewProps {
  language: 'english' | 'telugu';
  onNavigate: (screen: any, temple?: Temple) => void;
  temples: Temple[];
  bookmarkedTemples: string[];
  onToggleBookmark: (templeId: string) => void;
  isOffline: boolean;
}

export function MapView({ language, onNavigate, temples, isOffline }: MapViewProps) {
  const [selectedTemple, setSelectedTemple] = useState<Temple | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationPermission, setLocationPermission] = useState<'unknown' | 'granted' | 'denied'>('unknown');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string>('');

  const texts = {
    english: {
      title: 'Temple Locations',
      getDirections: 'Get Directions',
      viewDetails: 'View Details',
      templesNear: 'temples near you',
      open: 'Open',
      closed: 'Closed',
      loading: 'Loading map...',
      locationPermission: 'Allow Temple Sanathan to access your location for accurate directions to temples.',
      allowLocation: 'Allow Location',
      denyLocation: 'Not Now',
      locationDenied: 'Location access denied. Enable location permissions in settings for better experience.',
      offlineMap: 'Map unavailable offline. Connect to internet to view temple locations.',
      nearbyTemples: 'Nearby Temples',
      locationUnavailable: 'Location services unavailable on this device.',
      locationTimeout: 'Location request timed out. Please try again.',
      locationAccuracyIssue: 'Unable to get accurate location. Please try again.',
      gettingLocation: 'Getting your location...'
    },
    telugu: {
      title: 'ఆలయ స్థానాలు',
      getDirections: 'దిశలు పొందండి',
      viewDetails: 'వివరాలు చూడండి',
      templesNear: 'మీ దగ్గర ఆలయాలు',
      open: 'తెరిచి ఉంది',
      closed: 'మూసి ఉంది',
      loading: 'మ్యాప్ లోడ్ అవుతోంది...',
      locationPermission: 'ఆలయాలకు సరైన దిశలు కోసం Temple Sanathan మీ స్థానాన్ని యాక్సెస్ చేయడానికి అనుమతించండి.',
      allowLocation: 'స్థానాన్ని అనుమతించు',
      denyLocation: 'ఇప్పుడు వద్దు',
      locationDenied: 'స్థాన యాక్సెస్ నిరాకరించబడింది. మెరుగైన అనుభవం కోసం సెట్టింగ్స్‌లో స్థాన అనుమతులను ప్రారంభించండి.',
      offlineMap: 'ఆఫ్‌లైన్‌లో మ్యాప్ అందుబాటులో లేదు. ఆలయ స్థానాలను చూడటానికి ఇంటర్నెట్‌కు కనెక్ట్ చేయండి.',
      nearbyTemples: 'సమీప ఆలయాలు',
      locationUnavailable: 'ఈ పరికరంలో లొకేషన్ సేవలు అందుబాటులో లేవు.',
      locationTimeout: 'లొకేషన్ అభ్యర్థన సమయం ముగిసింది. దయచేసి మళ్లీ ప్రయత్నించండి.',
      locationAccuracyIssue: 'సరైన స్థానాన్ని పొందలేకపోయాము. దయచేసి మళ్లీ ప్రయత్నించండి.',
      gettingLocation: 'మీ స్థానాన్ని పొందుతోంది...'
    }
  };

  const t = texts[language];

  // Request location permission on component mount
  useEffect(() => {
    if (navigator.geolocation && locationPermission === 'unknown') {
      // Show permission dialog after a brief delay
      const timer = setTimeout(() => {
        // Don't auto-request, let user click the button
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [locationPermission]);

  const getLocationErrorMessage = (error: GeolocationPositionError) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return t.locationDenied;
      case error.POSITION_UNAVAILABLE:
        return t.locationUnavailable;
      case error.TIMEOUT:
        return t.locationTimeout;
      default:
        return t.locationAccuracyIssue;
    }
  };

  const requestLocationPermission = async () => {
    if (!navigator.geolocation) {
      setLocationPermission('denied');
      setLocationError(t.locationUnavailable);
      return;
    }

    setIsLoadingLocation(true);
    setLocationError('');
    
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve, 
          reject, 
          {
            enableHighAccuracy: true,
            timeout: 15000, // Increased timeout
            maximumAge: 300000 // 5 minutes cache
          }
        );
      });

      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
      setLocationPermission('granted');
      setLocationError('');
    } catch (error) {
      console.error('Location access error:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        code: error instanceof GeolocationPositionError ? error.code : 'No code',
        errorType: typeof error,
        errorDetails: error
      });
      
      const errorMessage = error instanceof GeolocationPositionError 
        ? getLocationErrorMessage(error)
        : t.locationAccuracyIssue;
      
      setLocationError(errorMessage);
      setLocationPermission('denied');
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const handleGetDirections = (temple: Temple) => {
    const { latitude, longitude } = temple.location;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&travelmode=driving`;
    window.open(url, '_blank');
  };

  // Calculate distance between user and temple (rough estimation)
  const calculateDistance = (temple: Temple) => {
    if (!userLocation) return null;
    
    const R = 6371; // Earth's radius in km
    const dLat = (temple.location.latitude - userLocation.lat) * Math.PI / 180;
    const dLon = (temple.location.longitude - userLocation.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(userLocation.lat * Math.PI / 180) * Math.cos(temple.location.latitude * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    return Math.round(distance * 10) / 10; // Round to 1 decimal place
  };

  // Sort temples by distance if user location is available
  const sortedTemples = userLocation 
    ? [...temples].sort((a, b) => {
        const distA = calculateDistance(a) || Infinity;
        const distB = calculateDistance(b) || Infinity;
        return distA - distB;
      })
    : temples;

  // Location Permission Dialog
  if (locationPermission === 'unknown' || (isLoadingLocation && locationPermission !== 'granted')) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-card/90 backdrop-blur rounded-lg p-6 max-w-sm mx-auto border border-primary/20">
          <MapPin className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h3 className="text-lg font-semibold text-foreground mb-3">Location Access</h3>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            {t.locationPermission}
          </p>
          
          {locationError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{locationError}</p>
            </div>
          )}
          
          {isLoadingLocation ? (
            <div className="flex items-center justify-center gap-2">
              <Loader className="w-4 h-4 animate-spin" />
              <span className="text-sm">{t.gettingLocation}</span>
            </div>
          ) : (
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setLocationPermission('denied')}
                className="flex-1 border-primary/30"
              >
                {t.denyLocation}
              </Button>
              <Button
                onClick={requestLocationPermission}
                className="flex-1 gradient-primary text-white"
              >
                {t.allowLocation}
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col" style={{ scrollBehavior: 'smooth' }}>
      {/* Header */}
      <div className="p-4 border-b bg-card/90 backdrop-blur">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">{t.title}</h2>
            <p className="text-sm text-muted-foreground">
              {temples.length} {t.templesNear}
            </p>
          </div>
          {locationPermission === 'denied' && (
            <Button
              variant="outline"
              size="sm"
              onClick={requestLocationPermission}
              className="text-xs border-primary/30"
            >
              {t.allowLocation}
            </Button>
          )}
        </div>
        
        {locationPermission === 'denied' && locationError && (
          <div className="mt-2 p-2 bg-yellow-100 border border-yellow-300 rounded text-xs text-yellow-800">
            {locationError}
          </div>
        )}
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        {isOffline ? (
          <div className="w-full h-full flex items-center justify-center bg-muted/20">
            <div className="text-center p-6">
              <MapPin className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-2">{t.offlineMap}</p>
            </div>
          </div>
        ) : (
          <>
            <div className="w-full h-full relative">
              <GoogleMap
                temples={sortedTemples}
                userLocation={userLocation}
                routeTo={selectedTemple ? { lat: selectedTemple.location.latitude, lng: selectedTemple.location.longitude } : null}
                onMarkerClick={(t) => setSelectedTemple(t)}
              />
            </div>

            {/* Selected Temple Info */}
            {selectedTemple && (
              <div className="absolute bottom-4 left-4 right-4 z-30">
                <Card className="bg-card/95 backdrop-blur border-primary/20 shadow-xl">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <div className="w-16 h-16 flex-shrink-0">
                        <ImageWithFallback
                          src={`https://images.unsplash.com/200x200/?temple,${selectedTemple.templeType},${selectedTemple.name.english}`}
                          alt={selectedTemple.name[language]}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="text-sm font-semibold text-foreground truncate">
                            {selectedTemple.name[language]}
                          </h3>
                          <Badge
                            variant={selectedTemple.isOpen ? 'default' : 'secondary'}
                            className={`text-xs ml-2 ${selectedTemple.isOpen ? 'bg-green-600' : 'bg-gray-600'} text-white`}
                          >
                            {selectedTemple.isOpen ? t.open : t.closed}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">
                          {selectedTemple.deity[language]}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                          <MapPin className="w-3 h-3" />
                          {selectedTemple.district}, {selectedTemple.state}
                          {userLocation && (
                            <span className="ml-2 font-medium">
                              • {calculateDistance(selectedTemple)}km away
                            </span>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleGetDirections(selectedTemple)}
                            className="text-xs gradient-primary text-white"
                          >
                            <Navigation className="w-3 h-3 mr-1" />
                            {t.getDirections}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onNavigate('temple', selectedTemple)}
                            className="text-xs border-primary/30"
                          >
                            {t.viewDetails}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </>
        )}
      </div>

      {/* Temple List */}
      <div className="h-48 border-t bg-card/90 backdrop-blur overflow-y-auto">
        <div className="p-2">
          <h4 className="text-sm font-semibold text-foreground mb-2 px-2">{t.nearbyTemples}</h4>
          <div className="space-y-2">
            {sortedTemples.slice(0, 10).map(temple => (
              <div
                key={temple.id}
                className="flex items-center gap-3 p-2 hover:bg-accent rounded cursor-pointer transition-colors"
                onClick={() => setSelectedTemple(temple)}
              >
                <div className="w-8 h-8 gradient-primary text-white rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground truncate">
                    {temple.name[language]}
                  </h4>
                  <p className="text-xs text-muted-foreground truncate">
                    {temple.district}, {temple.state}
                    {userLocation && (
                      <span className="ml-2">• {calculateDistance(temple)}km</span>
                    )}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
