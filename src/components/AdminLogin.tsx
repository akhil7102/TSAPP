import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { Eye, EyeOff, Shield, LogIn } from 'lucide-react';
import { adminAPI, AdminUser } from '../lib/admin-api';

interface AdminLoginProps {
  language: 'english' | 'telugu';
  onLoginSuccess: (user: AdminUser, token: string) => void;
}

export function AdminLogin({ language, onLoginSuccess }: AdminLoginProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const texts = {
    english: {
      title: 'Admin Login',
      subtitle: 'Access Temple Sanathan Admin Dashboard',
      email: 'Email Address',
      password: 'Password',
      login: 'Login',
      emailPlaceholder: 'admin@templesanathan.com',
      passwordPlaceholder: 'Enter your password',
      loginError: 'Invalid email or password',
      networkError: 'Network error. Please try again.',
      demoCredentials: 'Demo Credentials',
      adminDemo: 'Admin: admin@templesanathan.com / admin123',
      superAdminDemo: 'Super Admin: superadmin@templesanathan.com / superadmin123'
    },
    telugu: {
      title: 'అడ్మిన్ లాగిన్',
      subtitle: 'టెంపుల్ సనాతన్ అడ్మిన్ డాష్‌బోర్డ్ యాక్సెస్',
      email: 'ఇమెయిల్ చిరునామా',
      password: 'పాస్‌వర్డ్',
      login: 'లాగిన్',
      emailPlaceholder: 'admin@templesanathan.com',
      passwordPlaceholder: 'మీ పాస్‌వర్డ్ నమోదు చేయండి',
      loginError: 'చెల్లని ఇమెయిల్ లేదా పాస్‌వర్డ్',
      networkError: 'నెట్‌వర్క్ లోపం. దయచేసి మళ్లీ ప్రయత్నించండి.',
      demoCredentials: 'డెమో క్రెడెన్షియల్స్',
      adminDemo: 'అడ్మిన్: admin@templesanathan.com / admin123',
      superAdminDemo: 'సూపర్ అడ్మిన్: superadmin@templesanathan.com / superadmin123'
    }
  };

  const t = texts[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await adminAPI.adminLogin(formData.email, formData.password);
      
      if (result) {
        onLoginSuccess(result.user, result.token);
      } else {
        setError(t.loginError);
      }
    } catch (error) {
      setError(t.networkError);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(null);
  };

  const fillDemoCredentials = (email: string, password: string) => {
    setFormData({ email, password });
    setError(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto rounded-full gradient-primary flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t.title}
          </h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Login Form */}
        <Card className="bg-card/80 backdrop-blur border-primary/20">
          <CardHeader>
            <CardTitle className="text-center">Admin Access</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error Alert */}
              {error && (
                <Alert className="border-destructive bg-destructive/10">
                  <AlertDescription className="text-destructive">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">{t.email}</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder={t.emailPlaceholder}
                  required
                  className="bg-input-background border-primary/20"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">{t.password}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder={t.passwordPlaceholder}
                    required
                    className="bg-input-background border-primary/20 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full gradient-primary text-white hover:opacity-90"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <LogIn className="w-4 h-4" />
                    {t.login}
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="bg-muted/50 border-primary/20">
          <CardContent className="p-4">
            <h3 className="font-medium mb-3 text-sm">{t.demoCredentials}</h3>
            <div className="space-y-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-left justify-start h-auto p-2 text-xs"
                onClick={() => fillDemoCredentials('admin@templesanathan.com', 'admin123')}
              >
                <div>
                  <div className="font-medium">Admin Account</div>
                  <div className="text-muted-foreground">{t.adminDemo}</div>
                </div>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-left justify-start h-auto p-2 text-xs"
                onClick={() => fillDemoCredentials('superadmin@templesanathan.com', 'superadmin123')}
              >
                <div>
                  <div className="font-medium">Super Admin Account</div>
                  <div className="text-muted-foreground">{t.superAdminDemo}</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="text-center text-xs text-muted-foreground">
          <p>This is a demo admin system for Temple Sanathan</p>
          <p>In production, this will be integrated with Supabase authentication</p>
        </div>
      </div>
    </div>
  );
}