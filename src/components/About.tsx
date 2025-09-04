import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { ArrowLeft, Book, Star, Calendar, Camera, Heart, Target, Users } from 'lucide-react';
import logoImage from 'figma:asset/4a0beeffa82cccff43eb2c512134e22623390cec.png';

interface AboutProps {
  language: 'english' | 'telugu';
  onNavigate: (screen: any) => void;
}

export function About({ language, onNavigate }: AboutProps) {
  const texts = {
    english: {
      title: 'About Temple Sanathan',
      back: 'Back',
      mission: 'Our Mission',
      whatWeOffer: 'What We Offer',
      vision: 'Our Vision',
      templeInfo: 'Temple Information',
      templeInfoDesc: 'Learn about temples across Telangana & Andhra Pradesh with details like history, location, and images.',
      featuredTemples: 'Featured Temples',
      featuredTemplesDesc: 'Explore some of the most famous and powerful temples.',
      upcomingFestivals: 'Upcoming Festivals',
      upcomingFestivalsDesc: 'Stay updated with major spiritual and cultural events.',
      photoGallery: 'Photo Gallery',
      photoGalleryDesc: 'Experience the beauty of temple architecture and divine energy through real images.',
      missionDesc: 'Temple Sanathan is a spiritual platform dedicated to showcasing the divine heritage of Telangana and Andhra Pradesh. Our mission is to connect devotees, travelers, and culture lovers with the sacred temples, festivals, and traditions that have shaped our Sanathana Dharma for centuries.',
      visionDesc: 'To preserve, promote, and spread awareness of India\'s timeless spiritual roots, making it easier for devotees to explore temples digitally while staying connected to their traditions.',
      teamTitle: 'Built with Devotion',
      teamDesc: 'Made with love and dedication for temple seekers and spiritual explorers.',
      contact: 'Contact Us',
      contactDesc: 'rudracore@gmail.com\nhttps://discord.gg/eDBmRg7Vns'
    },
    telugu: {
      title: 'Temple Sanathan గురించి',
      back: 'వెనుకకు',
      mission: 'మా లక్ష్యం',
      whatWeOffer: 'మేము అందించేది',
      vision: 'మా దృష్టికోణం',
      templeInfo: 'ఆలయ సమాచారం',
      templeInfoDesc: 'చరిత్ర, స్థానం మరియు చిత్రాలతో సహా వివరాలతో తెలంగాణ మరియు ఆంధ్రప్రదేశ్‌లోని ఆలయాల గురించి తెలుసుకోండి.',
      featuredTemples: 'ప్రముఖ ఆలయాలు',
      featuredTemplesDesc: 'అత్యంత ప్రసిద్ధ మరియు శక్తివంతమైన కొన్ని ఆలయాలను అన్వేషించండి.',
      upcomingFestivals: 'రాబోయే పండుగలు',
      upcomingFestivalsDesc: 'ప్రధాన ఆధ్యాత్మిక మరియు సాంస్కృతిక కార్యక్రమాలతో అప్‌డేట్‌గా ఉండండి.',
      photoGallery: 'ఫోటో గ్యాలరీ',
      photoGalleryDesc: 'నిజమైన చిత్రాల ద్వారా ఆలయ వాస్తుశిల్పం మరియు దైవిక శక్తి యొక్క అందాన్ని అనుభవించండి.',
      missionDesc: 'Temple Sanathan అనేది తెలంగాణ మరియు ఆంధ్రప్రదేశ్ యొక్క దైవిక వారసత్వాన్ని ప్రదర్శించడానికి అంకితమైన ఆధ్యాత్మిక వేదిక. భక్తులు, ప్రయాణికులు మరియు సంస్కృతి ప్రేమికులను శతాబ్దాలుగా మన సనాతన ధర్మాన్ని రూపొందించిన పవిత్ర ఆలయాలు, పండుగలు మరియు సంప్రదాయాలతో కనెక్ట్ చేయడం మా లక్ష్యం.',
      visionDesc: 'భారతదేశం యొక్క కాలాతీత ఆధ్యాత్మిక మూలాలను సంరక్షించడం, ప్రోత్సహించడం మరియు అవగాహన వ్యాప్తి చేయడం, భక్తులు తమ సంప్రదాయాలతో అనుసంధానంగా ఉంటూ డిజిటల్‌గా ఆలయాలను అన్వేషించడాన్ని సులభతరం చేయడం.',
      teamTitle: 'భక్తితో నిర్మించబడింది',
      teamDesc: 'ఆలయ అన్వేషకులు మరియు ఆధ్యాత్మిక అన్వేషకుల కోసం ప్రేమ మరియు అంకితభావంతో తయారు చేయబడింది.',
      contact: 'మమ్మల్ని సంప్రదించండి',
      contactDesc: 'rudracore@gmail.com\nhttps://discord.gg/eDBmRg7Vns'
    }
  };

  const t = texts[language];

  return (
    <div className="min-h-screen" style={{ scrollBehavior: 'smooth' }}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card/90 backdrop-blur">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate('settings')}
          className="p-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="ml-2">{t.back}</span>
        </Button>
        <h1 className="text-lg font-semibold">{t.title}</h1>
        <div className="w-8" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-6 pb-20">
        {/* Header with Logo */}
        <div className="text-center py-6">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden gradient-primary p-3">
            <img 
              src={logoImage} 
              alt="Temple Sanathan" 
              className="w-full h-full object-contain mix-blend-screen"
            />
          </div>
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            🛕 Temple Sanathan
          </h2>
          <p className="text-muted-foreground">
            {t.teamDesc}
          </p>
        </div>

        {/* Mission */}
        <Card className="bg-card/80 backdrop-blur border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              {t.mission}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {t.missionDesc}
            </p>
          </CardContent>
        </Card>

        {/* What We Offer */}
        <Card className="bg-card/80 backdrop-blur border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              ✨ {t.whatWeOffer}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex gap-3">
                <Book className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">📖 {t.templeInfo}</h4>
                  <p className="text-sm text-muted-foreground">{t.templeInfoDesc}</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Star className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">🌸 {t.featuredTemples}</h4>
                  <p className="text-sm text-muted-foreground">{t.featuredTemplesDesc}</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Calendar className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">🎉 {t.upcomingFestivals}</h4>
                  <p className="text-sm text-muted-foreground">{t.upcomingFestivalsDesc}</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Camera className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">🏞 {t.photoGallery}</h4>
                  <p className="text-sm text-muted-foreground">{t.photoGalleryDesc}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vision */}
        <Card className="bg-card/80 backdrop-blur border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              🙏 {t.vision}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {t.visionDesc}
            </p>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="bg-gradient-accent border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              {t.contact}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p>📧 rudracore@gmail.com</p>
              <p>💬 https://discord.gg/eDBmRg7Vns</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}