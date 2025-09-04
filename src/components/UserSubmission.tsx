import React, { useState } from 'react';
import { Temple } from '../data/temples';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { districts, templeTypes } from '../data/temples';
import { ArrowLeft, Upload, Plus, X, MapPin, Camera, CheckCircle, AlertTriangle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { submitTempleSubmission } from '../lib/supabase';

interface UserSubmissionProps {
  language: 'english' | 'telugu';
  onNavigate: (screen: any, temple?: Temple) => void;
  temples: Temple[];
  bookmarkedTemples: string[];
  onToggleBookmark: (templeId: string) => void;
  isOffline: boolean;
}

interface SubmissionForm {
  name: { english: string; telugu: string };
  deity: { english: string; telugu: string };
  state: 'TS' | 'AP' | '';
  district: string;
  address: { english: string; telugu: string };
  description: { english: string; telugu: string };
  templeType: string;
  contact: {
    phone: string;
    website: string;
    email: string;
  };
  timings: {
    morning: string;
    evening: string;
  };
  features: string[];
  images: string[];
}

export function UserSubmission({ language, onNavigate, isOffline }: UserSubmissionProps) {
  const [form, setForm] = useState<SubmissionForm>({
    name: { english: '', telugu: '' },
    deity: { english: '', telugu: '' },
    state: '',
    district: '',
    address: { english: '', telugu: '' },
    description: { english: '', telugu: '' },
    templeType: '',
    contact: {
      phone: '',
      website: '',
      email: ''
    },
    timings: {
      morning: '',
      evening: ''
    },
    features: [],
    images: []
  });
  
  const [newFeature, setNewFeature] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'none' | 'success' | 'error'>('none');

  const texts = {
    english: {
      title: 'Suggest New Temple',
      subtitle: 'Help others discover sacred places',
      back: 'Back',
      basicInfo: 'Basic Information',
      templeName: 'Temple Name',
      templeNameEn: 'Temple Name (English)',
      templeNameTe: 'Temple Name (Telugu)',
      deity: 'Main Deity',
      deityEn: 'Deity Name (English)',
      deityTe: 'Deity Name (Telugu)',
      location: 'Location',
      state: 'State',
      selectState: 'Select State',
      district: 'District',
      selectDistrict: 'Select District',
      address: 'Full Address',
      addressEn: 'Address (English)',
      addressTe: 'Address (Telugu)',
      details: 'Temple Details',
      templeType: 'Temple Type',
      selectType: 'Select Type',
      description: 'Description',
      descEn: 'Description (English)',
      descTe: 'Description (Telugu)',
      timings: 'Visiting Hours',
      morning: 'Morning Hours',
      evening: 'Evening Hours',
      morningPlaceholder: 'e.g., 6:00 AM - 12:00 PM',
      eveningPlaceholder: 'e.g., 4:00 PM - 9:00 PM',
      contact: 'Contact Information',
      phone: 'Phone Number',
      website: 'Website URL',
      email: 'Email Address',
      features: 'Temple Features',
      addFeature: 'Add Feature',
      featurePlaceholder: 'e.g., Accommodation, Prasadam',
      images: 'Images',
      uploadImages: 'Upload Images',
      submit: 'Submit Temple',
      submitting: 'Submitting...',
      required: 'Required',
      optional: 'Optional',
      success: 'Thank you! Your temple submission has been received and will be reviewed.',
      error: 'Something went wrong. Please check your details and try again.',
      validationError: 'Please fill all required fields',
      telangana: 'Telangana',
      andhraPradesh: 'Andhra Pradesh',
      submitAnother: 'Submit Another',
      goHome: 'Go Home',
      offlineError: 'Cannot submit while offline. Please connect to internet and try again.'
    },
    telugu: {
      title: 'కొత్త ఆలయం సూచించండి',
      subtitle: 'ఇతరులు పవిత్ర స్థలాలను కనుగొనడంలో సహాయపడండి',
      back: 'వెనుకకు',
      basicInfo: 'ప్రాథమిక సమాచారం',
      templeName: 'ఆలయ పేరు',
      templeNameEn: 'ఆ��య పేరు (ఇంగ్లీష్)',
      templeNameTe: 'ఆలయ పేరు (తెలుగు)',
      deity: 'ప్రధాన దేవత',
      deityEn: 'దేవత పేరు (ఇంగ్లీష్)',
      deityTe: 'దేవత పేరు (తెలుగు)',
      location: 'స్థానం',
      state: 'రాష్ట్రం',
      selectState: 'రాష్ట్రం ఎంచుకోండి',
      district: 'జిల్లా',
      selectDistrict: 'జిల్లా ఎంచుకోండి',
      address: 'పూర్తి చిరునామా',
      addressEn: 'చిరునామా (ఇంగ్లీష్)',
      addressTe: 'చిరునామా (తెలుగు)',
      details: 'ఆలయ వివరాలు',
      templeType: 'ఆలయ రకం',
      selectType: 'రకం ఎంచుకోండి',
      description: 'వివరణ',
      descEn: 'వివరణ (ఇంగ్లీష్)',
      descTe: 'వివరణ (తెలుగు)',
      timings: 'దర్శన సమయాలు',
      morning: 'ఉదయ సమయాలు',
      evening: 'సాయంత్రం సమయాలు',
      morningPlaceholder: 'ఉదా., 6:00 AM - 12:00 PM',
      eveningPlaceholder: 'ఉదా., 4:00 PM - 9:00 PM',
      contact: 'సంప్రదింపు సమాచారం',
      phone: 'ఫోన్ నంబర్',
      website: 'వెబ్‌సైట్ URL',
      email: 'ఇమెయిల్ చిరునామా',
      features: 'ఆలయ సౌకర్యాలు',
      addFeature: 'సౌకర్యం జోడించండి',
      featurePlaceholder: 'ఉదా., వసతి, ప్రసాదం',
      images: 'చిత్రాలు',
      uploadImages: 'చిత్రాలు అప్‌లోడ్ చేయండి',
      submit: 'ఆలయం సమర్పించండి',
      submitting: 'సమర్పిస్తోంద���...',
      required: 'అవసరం',
      optional: 'ఐచ్ఛికం',
      success: 'ధన్యవాదాలు! మీ ఆలయ సమర్పణ స్వీకరించబడింది మరియు సమీక్షించబడుతుంది.',
      error: 'ఏదో తప్పు జరిగింది. దయచేసి మీ వివరాలను తనిఖీ చేసి మళ్లీ ప్రయత్నించండి.',
      validationError: 'దయచేసి అన్ని అవసరమైన ఫీల్డ్‌లను పూరించండి',
      telangana: 'తెలంగాణ',
      andhraPradesh: 'ఆంధ్రప్రదేశ్',
      submitAnother: 'మరొకటి సమర్పించండి',
      goHome: 'హోమ్‌కు వెళ్లండి',
      offlineError: 'ఆఫ్‌లైన్‌లో ఉన్నప్పుడు సమర్పించలేరు. దయచేసి ఇంటర్నెట్‌కు కనెక్ట్ అయ్యి మళ్లీ ప్రయత్నించండి.'
    }
  };

  const t = texts[language];

  const isValidTempleName = (name: string): boolean => {
    const invalidPatterns = [
      /^test$/i,
      /^hello$/i,
      /test.*temple/i,
      /^[a-z]{1,5}$/i, // Very short random strings
      /^[a-z]*\d+[a-z]*$/i, // Contains numbers
      /^[a-z]{2,4}\1+/i, // Repeated patterns like "ksks"
      /^[^a-z\s]/i, // Starts with non-letter
      /^.{1,2}$/i, // Too short (1-2 chars)
    ];

    return !invalidPatterns.some(pattern => pattern.test(name.trim()));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isOffline) {
      setSubmitStatus('error');
      alert(t.offlineError);
      return;
    }

    // Basic validation
    if (!form.name.english || !form.deity.english || !form.state || !form.district) {
      setSubmitStatus('error');
      alert(t.validationError);
      return;
    }

    // Validate temple name to prevent fake/test submissions
    if (!isValidTempleName(form.name.english)) {
      setSubmitStatus('error');
      alert('Please enter a valid temple name. Test names and random characters are not allowed.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('none');
    
    // Submit to Supabase
    try {
      const payload = {
        name: form.name,
        deity: form.deity,
        state: form.state,
        district: form.district,
        address: form.address,
        description: form.description,
        templeType: form.templeType,
        contact: form.contact,
        timings: form.timings,
        features: form.features,
        images: form.images,
      };
      const { error } = await submitTempleSubmission(payload);
      if (error) {
        throw error;
      }
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setForm(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setForm(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const resetForm = () => {
    setForm({
      name: { english: '', telugu: '' },
      deity: { english: '', telugu: '' },
      state: '',
      district: '',
      address: { english: '', telugu: '' },
      description: { english: '', telugu: '' },
      templeType: '',
      contact: { phone: '', website: '', email: '' },
      timings: { morning: '', evening: '' },
      features: [],
      images: []
    });
    setSubmitStatus('none');
  };

  // Success Screen
  if (submitStatus === 'success') {
    return (
      <div className="p-4 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md mx-auto">
          <div className="w-20 h-20 gradient-primary rounded-full mx-auto mb-6 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Success!</h2>
          <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
            {t.success}
          </p>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={resetForm}
              className="flex-1 border-primary/30"
            >
              {t.submitAnother}
            </Button>
            <Button
              onClick={() => onNavigate('home')}
              className="flex-1 gradient-primary text-white"
            >
              {t.goHome}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Error Screen
  if (submitStatus === 'error') {
    return (
      <div className="p-4 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md mx-auto">
          <div className="w-20 h-20 bg-red-100 rounded-full mx-auto mb-6 flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Submission Failed</h2>
          <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
            {isOffline ? t.offlineError : t.error}
          </p>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setSubmitStatus('none')}
              className="flex-1 border-primary/30"
            >
              Try Again
            </Button>
            <Button
              onClick={() => onNavigate('home')}
              className="flex-1 gradient-primary text-white"
            >
              {t.goHome}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card/90 backdrop-blur border-b p-4 flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate('home')}
          className="p-2"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-lg font-semibold text-foreground">{t.title}</h1>
          <p className="text-sm text-muted-foreground">{t.subtitle}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {/* Basic Information */}
        <Card className="bg-card/80 backdrop-blur border-primary/20">
          <CardHeader>
            <CardTitle className="text-base text-foreground">{t.basicInfo}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-foreground font-medium">
                {t.templeName} <span className="text-red-500">*</span>
              </Label>
              <div className="space-y-2">
                <Input
                  placeholder={t.templeNameEn}
                  value={form.name.english}
                  onChange={(e) => setForm(prev => ({
                    ...prev,
                    name: { ...prev.name, english: e.target.value }
                  }))}
                  required
                  className="border-primary/30 focus:border-primary"
                />
                <Input
                  placeholder={t.templeNameTe}
                  value={form.name.telugu}
                  onChange={(e) => setForm(prev => ({
                    ...prev,
                    name: { ...prev.name, telugu: e.target.value }
                  }))}
                  className="border-primary/30 focus:border-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground font-medium">
                {t.deity} <span className="text-red-500">*</span>
              </Label>
              <div className="space-y-2">
                <Input
                  placeholder={t.deityEn}
                  value={form.deity.english}
                  onChange={(e) => setForm(prev => ({
                    ...prev,
                    deity: { ...prev.deity, english: e.target.value }
                  }))}
                  required
                  className="border-primary/30 focus:border-primary"
                />
                <Input
                  placeholder={t.deityTe}
                  value={form.deity.telugu}
                  onChange={(e) => setForm(prev => ({
                    ...prev,
                    deity: { ...prev.deity, telugu: e.target.value }
                  }))}
                  className="border-primary/30 focus:border-primary"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location */}
        <Card className="bg-card/80 backdrop-blur border-primary/20">
          <CardHeader>
            <CardTitle className="text-base text-foreground">{t.location}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-foreground font-medium">
                {t.state} <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={form.state || undefined} 
                onValueChange={(value: 'TS' | 'AP') => setForm(prev => ({ 
                  ...prev, 
                  state: value, 
                  district: '' 
                }))}
              >
                <SelectTrigger className="border-primary/30">
                  <SelectValue placeholder={t.selectState} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TS">{t.telangana}</SelectItem>
                  <SelectItem value="AP">{t.andhraPradesh}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground font-medium">
                {t.district} <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={form.district || undefined} 
                onValueChange={(value) => setForm(prev => ({ ...prev, district: value || '' }))}
                disabled={!form.state}
              >
                <SelectTrigger className="border-primary/30">
                  <SelectValue placeholder={t.selectDistrict} />
                </SelectTrigger>
                <SelectContent>
                  {form.state && districts[form.state].map(district => (
                    <SelectItem key={district} value={district}>{district}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground font-medium">{t.address}</Label>
              <div className="space-y-2">
                <Textarea
                  placeholder={t.addressEn}
                  value={form.address.english}
                  onChange={(e) => setForm(prev => ({
                    ...prev,
                    address: { ...prev.address, english: e.target.value }
                  }))}
                  rows={2}
                  className="border-primary/30 focus:border-primary"
                />
                <Textarea
                  placeholder={t.addressTe}
                  value={form.address.telugu}
                  onChange={(e) => setForm(prev => ({
                    ...prev,
                    address: { ...prev.address, telugu: e.target.value }
                  }))}
                  rows={2}
                  className="border-primary/30 focus:border-primary"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Temple Details */}
        <Card className="bg-card/80 backdrop-blur border-primary/20">
          <CardHeader>
            <CardTitle className="text-base text-foreground">{t.details}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-foreground font-medium">{t.templeType}</Label>
              <Select 
                value={form.templeType || undefined} 
                onValueChange={(value) => setForm(prev => ({ ...prev, templeType: value || '' }))}
              >
                <SelectTrigger className="border-primary/30">
                  <SelectValue placeholder={t.selectType} />
                </SelectTrigger>
                <SelectContent>
                  {templeTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground font-medium">{t.description}</Label>
              <div className="space-y-2">
                <Textarea
                  placeholder={t.descEn}
                  value={form.description.english}
                  onChange={(e) => setForm(prev => ({
                    ...prev,
                    description: { ...prev.description, english: e.target.value }
                  }))}
                  rows={3}
                  className="border-primary/30 focus:border-primary"
                />
                <Textarea
                  placeholder={t.descTe}
                  value={form.description.telugu}
                  onChange={(e) => setForm(prev => ({
                    ...prev,
                    description: { ...prev.description, telugu: e.target.value }
                  }))}
                  rows={3}
                  className="border-primary/30 focus:border-primary"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timings */}
        <Card className="bg-card/80 backdrop-blur border-primary/20">
          <CardHeader>
            <CardTitle className="text-base text-foreground">{t.timings}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="space-y-2">
              <Label className="text-foreground font-medium">{t.morning}</Label>
              <Input
                placeholder={t.morningPlaceholder}
                value={form.timings.morning}
                onChange={(e) => setForm(prev => ({
                  ...prev,
                  timings: { ...prev.timings, morning: e.target.value }
                }))}
                className="border-primary/30 focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground font-medium">{t.evening}</Label>
              <Input
                placeholder={t.eveningPlaceholder}
                value={form.timings.evening}
                onChange={(e) => setForm(prev => ({
                  ...prev,
                  timings: { ...prev.timings, evening: e.target.value }
                }))}
                className="border-primary/30 focus:border-primary"
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="bg-card/80 backdrop-blur border-primary/20">
          <CardHeader>
            <CardTitle className="text-base text-foreground">{t.contact}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="space-y-2">
              <Label className="text-foreground font-medium">{t.phone} <span className="text-muted-foreground">({t.optional})</span></Label>
              <Input
                type="tel"
                inputMode="tel"
                placeholder="e.g., +91 98765 43210"
                value={form.contact.phone}
                onChange={(e) => setForm(prev => ({
                  ...prev,
                  contact: { ...prev.contact, phone: e.target.value }
                }))}
                className="border-primary/30 focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground font-medium">{t.website} <span className="text-muted-foreground">({t.optional})</span></Label>
              <Input
                type="url"
                inputMode="url"
                placeholder="https://example.com"
                value={form.contact.website}
                onChange={(e) => setForm(prev => ({
                  ...prev,
                  contact: { ...prev.contact, website: e.target.value }
                }))}
                className="border-primary/30 focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground font-medium">{t.email} <span className="text-muted-foreground">({t.optional})</span></Label>
              <Input
                type="email"
                inputMode="email"
                placeholder="temple@example.com"
                value={form.contact.email}
                onChange={(e) => setForm(prev => ({
                  ...prev,
                  contact: { ...prev.contact, email: e.target.value }
                }))}
                className="border-primary/30 focus:border-primary"
              />
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card className="bg-card/80 backdrop-blur border-primary/20">
          <CardHeader>
            <CardTitle className="text-base text-foreground">{t.features}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder={t.featurePlaceholder}
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                className="border-primary/30 focus:border-primary"
              />
              <Button type="button" onClick={addFeature} size="sm" className="gradient-primary text-white">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {form.features.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {form.features.map((feature, index) => (
                  <Badge key={index} variant="secondary" className="text-xs bg-primary/10 text-primary">
                    {feature}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFeature(index)}
                      className="h-4 w-4 p-0 ml-1 hover:bg-red-100"
                    >
                      <X className="w-2 h-2" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full gradient-primary text-white"
          disabled={isSubmitting || isOffline}
        >
          {isSubmitting ? t.submitting : t.submit}
        </Button>

        {isOffline && (
          <p className="text-center text-sm text-muted-foreground">
            {t.offlineError}
          </p>
        )}
      </form>
    </div>
  );
}
