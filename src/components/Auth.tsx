import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import logoImage from 'figma:asset/4a0beeffa82cccff43eb2c512134e22623390cec.png';
import { signUp, signIn } from '../lib/supabase';

interface AuthProps {
  language: 'english' | 'telugu';
  onNavigate: (screen: any) => void;
  onAuthSuccess: (user: any) => void;
}

export function Auth({ language, onNavigate, onAuthSuccess }: AuthProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const texts = {
    english: {
      signIn: 'Sign In',
      signUp: 'Sign Up',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      signInButton: 'Sign In',
      signUpButton: 'Create Account',
      back: 'Back',
      welcome: 'Welcome to Temple Sanathan',
      signInDesc: 'Sign in to bookmark temples and submit suggestions',
      signUpDesc: 'Create an account to get personalized experience',
      noAccount: "Don't have an account?",
      hasAccount: 'Already have an account?',
      signUpLink: 'Sign up here',
      signInLink: 'Sign in here',
      emailRequired: 'Email is required',
      passwordRequired: 'Password is required',
      passwordsMatch: 'Passwords must match',
      passwordLength: 'Password must be at least 6 characters',
      signUpSuccess: 'Account created successfully! Please check your email to verify.',
      signInSuccess: 'Welcome back!',
      forgotPassword: 'Forgot Password?',
      or: 'or',
      enterEmail: 'Enter your email address',
      enterPassword: 'Enter your password',
      reenterPassword: 'Re-enter your password'
    },
    telugu: {
      signIn: 'సైన్ ఇన్',
      signUp: 'సైన్ అప్',
      email: 'ఇమెయిల్',
      password: 'పాస్‌వర్డ్',
      confirmPassword: 'పాస్‌వర్డ్ నిర్ధారించండి',
      signInButton: 'సైన్ ��న్',
      signUpButton: 'ఖాతా సృష్టించండి',
      back: 'వెనుకకు',
      welcome: 'Temple Sanathan కి స్వాగతం',
      signInDesc: 'ఆలయాలను బుక్‌మార్క్ చేయడానికి మరియు సూచనలు పంపడానికి సైన్ ఇన్ చేయండ��',
      signUpDesc: 'వ్యక్తిగత అనుభవం పొందడానికి ఖాతా సృష్టించండి',
      noAccount: 'ఖాతా లేదా?',
      hasAccount: 'ఇప్పటికే ఖాతా ఉందా?',
      signUpLink: 'ఇక్కడ సైన్ అప్ చేయండి',
      signInLink: 'ఇక్కడ సైన్ ఇన్ చేయండి',
      emailRequired: 'ఇమెయిల్ అవసరం',
      passwordRequired: 'పాస్‌వర్డ్ అవసరం',
      passwordsMatch: 'పాస్‌వర్డ్‌లు సరిపోలాలి',
      passwordLength: 'పాస్‌వర్డ్ కనీసం 6 అక్షరాలు ఉండాలి',
      signUpSuccess: 'ఖాతా విజయవంతంగా సృష్టించబడింది! దయచేసి ధృవీకరించడానికి మీ ఇమెయిల్‌ను తనిఖీ చేయండి.',
      signInSuccess: 'తిరిగి స్వాగతం!',
      forgotPassword: 'పాస్‌వర్డ్ మర్చిపోయారా?',
      or: 'లేదా',
      enterEmail: 'మీ ఇమెయిల్ చిరునామా నమోదు చేయండి',
      enterPassword: 'మీ పాస్‌వర్డ్ నమోదు చేయండి',
      reenterPassword: 'మీ పాస్‌వర్డ్ మళ్లీ నమోదు చేయండి'
    }
  };

  const t = texts[language];

  const validateForm = () => {
    if (!formData.email) {
      setError(t.emailRequired);
      return false;
    }
    if (!formData.password) {
      setError(t.passwordRequired);
      return false;
    }
    if (formData.password.length < 6) {
      setError(t.passwordLength);
      return false;
    }
    if (isSignUp && formData.password !== formData.confirmPassword) {
      setError(t.passwordsMatch);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      if (isSignUp) {
        const { data, error } = await signUp(formData.email, formData.password);
        if (error) {
          setError(error.message);
        } else {
          setSuccess(t.signUpSuccess);
          setTimeout(() => {
            setIsSignUp(false);
            setFormData({ email: '', password: '', confirmPassword: '' });
          }, 2000);
        }
      } else {
        // Direct admin access when exact credentials match
        if (formData.email.toLowerCase() === 'akhilnarra02@gmail.com' && formData.password === '21325456') {
          try { localStorage.setItem('ts-admin', '1'); } catch {}
          onNavigate('admin');
          return;
        }
        const { data, error } = await signIn(formData.email, formData.password);
        if (error) {
          setError(error.message);
        } else {
          setSuccess(t.signInSuccess);
          onAuthSuccess(data.user);
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ scrollBehavior: 'smooth' }}>
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
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-card/90 backdrop-blur border-primary/20">
          <CardHeader className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full overflow-hidden gradient-primary p-2">
              <img 
                src={logoImage} 
                alt="Temple Sanathan" 
                className="w-full h-full object-contain mix-blend-screen"
              />
            </div>
            <div>
              <CardTitle className="text-xl">{t.welcome}</CardTitle>
              <CardDescription className="mt-2">
                {isSignUp ? t.signUpDesc : t.signInDesc}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {success && (
              <Alert className="border-green-200 bg-green-50 text-green-800">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t.email}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder={t.enterEmail}
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t.password}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t.enterPassword}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t.confirmPassword}</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder={t.reenterPassword}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full gradient-primary text-white"
                disabled={loading}
              >
                {loading ? '...' : (isSignUp ? t.signUpButton : t.signInButton)}
              </Button>
            </form>

            <div className="text-center">
              <Separator className="my-4" />
              <p className="text-sm text-muted-foreground">
                {isSignUp ? t.hasAccount : t.noAccount}
              </p>
              <Button
                variant="link"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setFormData({ email: '', password: '', confirmPassword: '' });
                  setError('');
                  setSuccess('');
                }}
                className="text-primary h-auto p-0 mt-2"
              >
                {isSignUp ? t.signInLink : t.signUpLink}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
