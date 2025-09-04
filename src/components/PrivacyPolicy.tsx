import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { ArrowLeft, Shield, Database, Users, Eye, Mail, Calendar } from 'lucide-react';

interface PrivacyPolicyProps {
  language: 'english' | 'telugu';
  onNavigate: (screen: any) => void;
}

export function PrivacyPolicy({ language, onNavigate }: PrivacyPolicyProps) {
  const texts = {
    english: {
      title: 'Privacy Policy',
      back: 'Back',
      lastUpdated: 'Last Updated: 27 August 2025',
      intro: 'Temple Sanathan ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our app.',
      infoWeCollect: 'Information We Collect',
      personalInfo: 'Personal Information',
      personalInfoDesc: 'Name, email, and login credentials (when you sign up).',
      usageInfo: 'Usage Information',
      usageInfoDesc: 'App usage data such as pages visited, temples viewed, and features used.',
      deviceInfo: 'Device Information',
      deviceInfoDesc: 'Device type, operating system, and general technical data.',
      howWeUse: 'How We Use Your Information',
      usePoint1: 'To provide access to temple information, festivals, and app features.',
      usePoint2: 'To improve the app\'s performance and user experience.',
      usePoint3: 'To notify you about important updates or festivals.',
      usePoint4: 'To ensure security and prevent unauthorized access.',
      dataSharing: 'Data Sharing',
      dataSharingDesc: 'We do not sell or rent your personal information to third parties. We may share limited data only with:',
      supabase: 'Supabase (our backend service provider, for authentication and database storage).',
      legal: 'Legal authorities, if required by law.',
      dataSecurity: 'Data Security',
      dataSecurityDesc1: 'All sensitive data is stored securely using Supabase\'s authentication and database services.',
      dataSecurityDesc2: 'We use industry-standard security practices to protect your information.',
      yourRights: 'Your Rights',
      yourRightsDesc: 'You have the right to:',
      rightAccess: 'Access the personal data we store about you.',
      rightCorrect: 'Request correction or deletion of your data.',
      rightWithdraw: 'Withdraw your consent for data collection.',
      childrenPrivacy: 'Children\'s Privacy',
      childrenPrivacyDesc: 'Our app is not intended for children under 13. We do not knowingly collect information from minors.',
      changes: 'Changes to this Privacy Policy',
      changesDesc: 'We may update this Privacy Policy from time to time. Any changes will be posted within the app.',
      contact: 'Contact Us',
      contactDesc: 'If you have any questions about this Privacy Policy, you can contact us at:',
      email: '📧 rudracore@gmail.com',
      discord: 'https://discord.gg/eDBmRg7Vns'
    },
    telugu: {
      title: 'గోప్యతా విధానం',
      back: 'వెనుకకు',
      lastUpdated: 'చివరిగా అప్‌డేట్ చేయబడింది: 27 ఆగస్టు 2025',
      intro: 'Temple Sanathan ("మేము," "మా," లేదా "మాకు") మీ గోప్యతను గౌరవిస్తుంది మరియు మీ వ్యక్తిగత డేటాను రక్షించడానికి కట్టుబడి ఉంది. మీరు మా యాప్‌ను ఉపయోగించినప్పుడు మేము మీ సమాచారాన్ని ఎలా సేకరిస్తామో, ఉపయోగిస్తామో మరియు రక్షిస్తామో ఈ గోప్యతా విధానం వివరిస్తుంది.',
      infoWeCollect: 'మేము సేకరించే సమాచారం',
      personalInfo: 'వ్యక్తిగత సమాచారం',
      personalInfoDesc: 'పేరు, ఇమెయిల్ మరియు లాగిన్ ఆధారాలు (మీరు సైన్ అప్ చేసినప్పుడు).',
      usageInfo: 'వినియోగ సమాచారం',
      usageInfoDesc: 'సందర్శించిన పేజీలు, చూసిన ఆలయాలు మరియు ఉపయోగించిన ఫీచర్లు వంటి యాప్ వినియోగ డేటా.',
      deviceInfo: 'పరికర సమాచారం',
      deviceInfoDesc: 'పరికర రకం, ఆపరేటింగ్ సిస్టమ్ మరియు సాధారణ సాంకేతిక డేటా.',
      howWeUse: 'మీ సమాచారాన్ని మేము ఎలా ఉపయోగిస్తాము',
      usePoint1: 'ఆలయ సమాచారం, పండుగలు మరియు యాప్ ఫీచర్లకు యాక్సెస్ అందించడానికి.',
      usePoint2: 'యాప్ పనితీరు మరియు వినియోగదారు అనుభవాన్ని మెరుగుపరచడానికి.',
      usePoint3: 'ముఖ్యమైన అప్‌డేట్‌లు లేదా పండుగల గురించి మీకు తెలియజేయడానికి.',
      usePoint4: 'భద్రతను నిర్ధారించడానికి మరియు అనధికార ప్రవేశాన్ని నిరోధించడానికి.',
      dataSharing: 'డేటా భాగస్వామ్యం',
      dataSharingDesc: 'మేము మీ వ్యక్తిగత సమాచారాన్ని మూడవ పక్షాలకు విక్రయించము లేదా అద్దెకు ఇవ్వము. మేము పరిమిత డేటాను మాత్రమే షేర్ చేయవచ్చు:',
      supabase: 'Supabase (మా బ్యాకెండ్ సేవా ప్రదాత, ప్రమాణీకరణ మరియు డేటాబేస్ నిల్వ కోసం).',
      legal: 'చట్టపరమైన అధికారులు, చట్టం ప్రకారం అవసరమైతే.',
      dataSecurity: 'డేటా భద్రత',
      dataSecurityDesc1: 'అన్ని సున్నితమైన డేటా Supabase యొక్క ప్రమాణీకరణ మరియు డేటాబేస్ సేవలను ఉపయోగించి సురక్షితంగా నిల్వ చేయబడుతుంది.',
      dataSecurityDesc2: 'మీ సమాచారాన్ని రక్షించడానికి మేము పరిశ్రమ-ప్రామాణిక భద్రతా పద్ధతులను ఉపయోగిస్తాము.',
      yourRights: 'మీ హక్కులు',
      yourRightsDesc: 'మీకు హక్కు ఉంది:',
      rightAccess: 'మా గురించి మేము నిల్వ చేసిన వ్యక్తిగత డేటాను యాక్సెస్ చేయడానికి.',
      rightCorrect: 'మీ డేటా యొక్క దిద్దుబాటు లేదా తొలగింపును అభ్యర్థించడానికి.',
      rightWithdraw: 'డేటా సేకరణ కోసం మీ సమ్మతిని ఉపసంహరించుకోవడానికి.',
      childrenPrivacy: 'పిల్లల గోప్యత',
      childrenPrivacyDesc: 'మా యాప్ 13 సంవత్సరాలలోపు పిల్లల కోసం ఉద్దేశించబడలేదు. మేము మైనర్ల నుండి తెలిసి సమాచారాన్ని సేకరించము.',
      changes: 'ఈ గోప్యతా విధానంలో మార్పులు',
      changesDesc: 'మేము ఎప్పటికప్పుడు ఈ గోప్యతా విధానాన్ని అప్‌డేట్ చేయవచ్చు. ఏవైనా మార్పులు యాప్‌లో పోస్ట్ చేయబడతాయి.',
      contact: 'మమ్మల్ని సంప్రదించండి',
      contactDesc: 'ఈ గోప్యతా విధానం గురించి మీకు ఏవైనా ప్రశ్నలు ఉంటే, మీరు మమ్మల్ని సంప్రదించవచ్చు:',
      email: '📧 rudracore@gmail.com',
      discord: 'https://discord.gg/eDBmRg7Vns'
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
        {/* Header */}
        <div className="text-center py-4">
          <Shield className="w-12 h-12 mx-auto mb-3 text-primary" />
          <h2 className="text-xl font-semibold text-foreground mb-1">🔒 {t.title}</h2>
          <p className="text-sm text-muted-foreground">{t.lastUpdated}</p>
        </div>

        {/* Introduction */}
        <Card className="bg-card/80 backdrop-blur border-primary/20">
          <CardContent className="p-4">
            <p className="text-muted-foreground leading-relaxed">
              {t.intro}
            </p>
          </CardContent>
        </Card>

        {/* Information We Collect */}
        <Card className="bg-card/80 backdrop-blur border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" />
              📌 {t.infoWeCollect}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">{t.personalInfo}</h4>
              <p className="text-sm text-muted-foreground">{t.personalInfoDesc}</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">{t.usageInfo}</h4>
              <p className="text-sm text-muted-foreground">{t.usageInfoDesc}</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">{t.deviceInfo}</h4>
              <p className="text-sm text-muted-foreground">{t.deviceInfoDesc}</p>
            </div>
          </CardContent>
        </Card>

        {/* How We Use Your Information */}
        <Card className="bg-card/80 backdrop-blur border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              📌 {t.howWeUse}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li>{t.usePoint1}</li>
              <li>{t.usePoint2}</li>
              <li>{t.usePoint3}</li>
              <li>{t.usePoint4}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Data Sharing */}
        <Card className="bg-card/80 backdrop-blur border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              📌 {t.dataSharing}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">{t.dataSharingDesc}</p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside pl-4">
              <li>{t.supabase}</li>
              <li>{t.legal}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Data Security */}
        <Card className="bg-card/80 backdrop-blur border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              📌 {t.dataSecurity}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li>{t.dataSecurityDesc1}</li>
              <li>{t.dataSecurityDesc2}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Your Rights */}
        <Card className="bg-card/80 backdrop-blur border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              📌 {t.yourRights}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">{t.yourRightsDesc}</p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside pl-4">
              <li>{t.rightAccess}</li>
              <li>{t.rightCorrect}</li>
              <li>{t.rightWithdraw}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Children's Privacy */}
        <Card className="bg-card/80 backdrop-blur border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              📌 {t.childrenPrivacy}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{t.childrenPrivacyDesc}</p>
          </CardContent>
        </Card>

        {/* Changes */}
        <Card className="bg-card/80 backdrop-blur border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              📌 {t.changes}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{t.changesDesc}</p>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="bg-gradient-accent border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              📌 {t.contact}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">{t.contactDesc}</p>
            <div className="space-y-1 text-sm">
              <p>{t.email}</p>
              <p>{t.discord}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}