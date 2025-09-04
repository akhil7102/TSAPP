import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { Switch } from './ui/switch';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  BarChart3,
  Settings,
  LogOut,
  Upload,
  Save,
  X
} from 'lucide-react';
import { adminAPI, AdminUser, Festival, TempleData } from '../lib/admin-api';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AdminDashboardProps {
  language: 'english' | 'telugu';
  onLogout: () => void;
}

export function AdminDashboard({ language, onLogout }: AdminDashboardProps) {
  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(null);
  const [temples, setTemples] = useState<TempleData[]>([]);
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [editingTemple, setEditingTemple] = useState<TempleData | null>(null);
  const [editingFestival, setEditingFestival] = useState<Festival | null>(null);
  const [showTempleDialog, setShowTempleDialog] = useState(false);
  const [showFestivalDialog, setShowFestivalDialog] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const texts = {
    english: {
      dashboard: 'Admin Dashboard',
      overview: 'Overview',
      temples: 'Temples',
      festivals: 'Festivals',
      settings: 'Settings',
      logout: 'Logout',
      totalTemples: 'Total Temples',
      totalFestivals: 'Total Festivals',
      activeTemples: 'Active Temples',
      upcomingFestivals: 'Upcoming Festivals',
      addTemple: 'Add Temple',
      editTemple: 'Edit Temple',
      addFestival: 'Add Festival',
      editFestival: 'Edit Festival',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      view: 'View',
      name: 'Name',
      deity: 'Deity',
      description: 'Description',
      district: 'District',
      state: 'State',
      templeType: 'Temple Type',
      timings: 'Timings',
      morning: 'Morning',
      evening: 'Evening',
      image: 'Image',
      contact: 'Contact Info',
      facilities: 'Facilities',
      isOpen: 'Currently Open',
      date: 'Date',
      isActive: 'Active',
      success: 'Operation completed successfully',
      error: 'An error occurred',
      confirmDelete: 'Are you sure you want to delete this item?'
    },
    telugu: {
      dashboard: 'అడ్మిన్ డాష్‌బోర్డ్',
      overview: 'అవలోకనం',
      temples: 'ఆలయాలు',
      festivals: 'పండుగలు',
      settings: 'సెట్టింగ్స్',
      logout: 'లాగ్ అవుట్',
      totalTemples: 'మొత్తం ఆలయాలు',
      totalFestivals: 'మొత్తం పండుగలు',
      activeTemples: 'చురుకైన ఆలయాలు',
      upcomingFestivals: 'రాబోయే పండుగలు',
      addTemple: 'ఆలయం జోడించండి',
      editTemple: 'ఆలయం సవరించండి',
      addFestival: 'పండుగ జోడించండి',
      editFestival: 'పండుగ సవరించండి',
      save: 'సేవ్',
      cancel: 'రద్దు',
      delete: 'తొలగించు',
      edit: 'సవరించు',
      view: 'చూడండి',
      name: 'పేరు',
      deity: 'దేవత',
      description: 'వివరణ',
      district: 'జిల్లా',
      state: 'రాష్ట్రం',
      templeType: 'ఆలయ రకం',
      timings: 'సమయాలు',
      morning: 'ఉదయం',
      evening: 'సాయంత్రం',
      image: 'చిత్రం',
      contact: 'సంప్రదింపు',
      facilities: 'సౌకర్యాలు',
      isOpen: 'ప్రస్తుతం తెరిచి ఉంది',
      date: 'తేదీ',
      isActive: 'చురుకు',
      success: 'ఆపరేషన్ విజయవంతంగా పూర్తయింది',
      error: 'లోపం సంభవించింది',
      confirmDelete: 'మీరు ఈ అంశాన్ని తొలగించాలని నిర్ధారిస్తున్నారా?'
    }
  };

  const t = texts[language];

  useEffect(() => {
    setCurrentAdmin(adminAPI.getCurrentAdmin());
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [templesData, festivalsData, statsData] = await Promise.all([
        adminAPI.getTemples(),
        adminAPI.getFestivals(),
        adminAPI.getStats()
      ]);
      setTemples(templesData);
      setFestivals(festivalsData);
      setStats(statsData);
    } catch (error) {
      showAlert('error', t.error);
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (type: 'success' | 'error', message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleLogout = async () => {
    await adminAPI.adminLogout();
    onLogout();
  };

  const handleSaveTemple = async (templeData: any) => {
    try {
      if (editingTemple) {
        await adminAPI.updateTemple(editingTemple.id, templeData);
        showAlert('success', t.success);
      } else {
        await adminAPI.createTemple(templeData);
        showAlert('success', t.success);
      }
      setShowTempleDialog(false);
      setEditingTemple(null);
      loadData();
    } catch (error) {
      showAlert('error', t.error);
    }
  };

  const handleSaveFestival = async (festivalData: any) => {
    try {
      if (editingFestival) {
        await adminAPI.updateFestival(editingFestival.id, festivalData);
        showAlert('success', t.success);
      } else {
        await adminAPI.createFestival(festivalData);
        showAlert('success', t.success);
      }
      setShowFestivalDialog(false);
      setEditingFestival(null);
      loadData();
    } catch (error) {
      showAlert('error', t.error);
    }
  };

  const handleDeleteTemple = async (id: string) => {
    if (confirm(t.confirmDelete)) {
      try {
        await adminAPI.deleteTemple(id);
        showAlert('success', t.success);
        loadData();
      } catch (error) {
        showAlert('error', t.error);
      }
    }
  };

  const handleDeleteFestival = async (id: string) => {
    if (confirm(t.confirmDelete)) {
      try {
        await adminAPI.deleteFestival(id);
        showAlert('success', t.success);
        loadData();
      } catch (error) {
        showAlert('error', t.error);
      }
    }
  };

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats?.totalTemples || 0}</div>
            <div className="text-sm text-muted-foreground">{t.totalTemples}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-secondary">{stats?.totalFestivals || 0}</div>
            <div className="text-sm text-muted-foreground">{t.totalFestivals}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats?.activeTemples || 0}</div>
            <div className="text-sm text-muted-foreground">{t.activeTemples}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats?.upcomingFestivals || 0}</div>
            <div className="text-sm text-muted-foreground">{t.upcomingFestivals}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Temples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {temples.slice(0, 5).map(temple => (
              <div key={temple.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={temple.image_url}
                      alt={temple.name[language]}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{temple.name[language]}</div>
                    <div className="text-sm text-muted-foreground">{temple.district}</div>
                  </div>
                </div>
                <Badge variant={temple.is_open ? 'default' : 'secondary'}>
                  {temple.is_open ? 'Open' : 'Closed'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const TemplesTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{t.temples}</h3>
        <Button
          onClick={() => {
            setEditingTemple(null);
            setShowTempleDialog(true);
          }}
          className="gradient-primary text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          {t.addTemple}
        </Button>
      </div>

      <div className="grid gap-4">
        {temples.map(temple => (
          <Card key={temple.id}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={temple.image_url}
                    alt={temple.name[language]}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{temple.name[language]}</h4>
                      <p className="text-sm text-muted-foreground">{temple.deity[language]}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {temple.district}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {temple.timings.morning}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={temple.is_open ? 'default' : 'secondary'}>
                        {temple.is_open ? 'Open' : 'Closed'}
                      </Badge>
                      <Badge variant="outline">{temple.temple_type}</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingTemple(temple);
                      setShowTempleDialog(true);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteTemple(temple.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const FestivalsTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{t.festivals}</h3>
        <Button
          onClick={() => {
            setEditingFestival(null);
            setShowFestivalDialog(true);
          }}
          className="gradient-primary text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          {t.addFestival}
        </Button>
      </div>

      <div className="grid gap-4">
        {festivals.map(festival => {
          const associatedTemple = temples.find(t => t.id === festival.temple_id);
          return (
            <Card key={festival.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold">{festival.name[language]}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{festival.description[language]}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(festival.date).toLocaleDateString()}
                      </span>
                      {associatedTemple && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {associatedTemple.name[language]}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={festival.is_active ? 'default' : 'secondary'}>
                      {festival.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingFestival(festival);
                        setShowFestivalDialog(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteFestival(festival.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/90 backdrop-blur">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">{t.dashboard}</h1>
              <p className="text-sm text-muted-foreground">
                Welcome, {currentAdmin?.name}
              </p>
            </div>
          </div>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            {t.logout}
          </Button>
        </div>
      </div>

      {/* Alert */}
      {alert && (
        <Alert className={`m-4 ${alert.type === 'error' ? 'border-destructive' : 'border-green-500'}`}>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}

      {/* Main Content */}
      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">{t.overview}</TabsTrigger>
            <TabsTrigger value="temples">{t.temples}</TabsTrigger>
            <TabsTrigger value="festivals">{t.festivals}</TabsTrigger>
            <TabsTrigger value="settings">{t.settings}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <OverviewTab />
          </TabsContent>

          <TabsContent value="temples" className="mt-6">
            <TemplesTab />
          </TabsContent>

          <TabsContent value="festivals" className="mt-6">
            <FestivalsTab />
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.settings}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Settings panel coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Temple Dialog */}
      <TempleDialog
        temple={editingTemple}
        open={showTempleDialog}
        onClose={() => {
          setShowTempleDialog(false);
          setEditingTemple(null);
        }}
        onSave={handleSaveTemple}
        language={language}
      />

      {/* Festival Dialog */}
      <FestivalDialog
        festival={editingFestival}
        temples={temples}
        open={showFestivalDialog}
        onClose={() => {
          setShowFestivalDialog(false);
          setEditingFestival(null);
        }}
        onSave={handleSaveFestival}
        language={language}
      />
    </div>
  );
}

// Temple Edit Dialog Component
function TempleDialog({ 
  temple, 
  open, 
  onClose, 
  onSave, 
  language 
}: { 
  temple: TempleData | null;
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  language: 'english' | 'telugu';
}) {
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (temple) {
      setFormData(temple);
    } else {
      setFormData({
        name: { english: '', telugu: '' },
        deity: { english: '', telugu: '' },
        description: { english: '', telugu: '' },
        district: '',
        state: 'Telangana',
        temple_type: 'Hill',
        coordinates: { lat: 0, lng: 0 },
        timings: { morning: '', evening: '' },
        is_open: true,
        image_url: '',
        contact_info: {},
        facilities: []
      });
    }
  }, [temple]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {temple ? 'Edit Temple' : 'Add Temple'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Name (English)</Label>
              <Input
                value={formData.name?.english || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  name: { ...prev.name, english: e.target.value }
                }))}
                required
              />
            </div>
            <div>
              <Label>Name (Telugu)</Label>
              <Input
                value={formData.name?.telugu || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  name: { ...prev.name, telugu: e.target.value }
                }))}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Deity (English)</Label>
              <Input
                value={formData.deity?.english || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  deity: { ...prev.deity, english: e.target.value }
                }))}
                required
              />
            </div>
            <div>
              <Label>Deity (Telugu)</Label>
              <Input
                value={formData.deity?.telugu || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  deity: { ...prev.deity, telugu: e.target.value }
                }))}
                required
              />
            </div>
          </div>

          <div>
            <Label>Description (English)</Label>
            <Textarea
              value={formData.description?.english || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                description: { ...prev.description, english: e.target.value }
              }))}
              rows={3}
            />
          </div>

          <div>
            <Label>Description (Telugu)</Label>
            <Textarea
              value={formData.description?.telugu || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                description: { ...prev.description, telugu: e.target.value }
              }))}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>District</Label>
              <Input
                value={formData.district || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, district: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label>State</Label>
              <Select
                value={formData.state || 'Telangana'}
                onValueChange={(value) => setFormData(prev => ({ ...prev, state: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Telangana">Telangana</SelectItem>
                  <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Temple Type</Label>
              <Select
                value={formData.temple_type || 'Hill'}
                onValueChange={(value) => setFormData(prev => ({ ...prev, temple_type: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hill">Hill</SelectItem>
                  <SelectItem value="Ancient">Ancient</SelectItem>
                  <SelectItem value="River">River</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Morning Timings</Label>
              <Input
                value={formData.timings?.morning || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  timings: { ...prev.timings, morning: e.target.value }
                }))}
                placeholder="6:00 AM - 12:00 PM"
              />
            </div>
            <div>
              <Label>Evening Timings</Label>
              <Input
                value={formData.timings?.evening || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  timings: { ...prev.timings, evening: e.target.value }
                }))}
                placeholder="4:00 PM - 9:00 PM"
              />
            </div>
          </div>

          <div>
            <Label>Image URL</Label>
            <Input
              value={formData.image_url || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={formData.is_open || false}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_open: checked }))}
            />
            <Label>Currently Open</Label>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="gradient-primary text-white">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Festival Edit Dialog Component
function FestivalDialog({ 
  festival, 
  temples,
  open, 
  onClose, 
  onSave, 
  language 
}: { 
  festival: Festival | null;
  temples: TempleData[];
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  language: 'english' | 'telugu';
}) {
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (festival) {
      setFormData(festival);
    } else {
      setFormData({
        name: { english: '', telugu: '' },
        description: { english: '', telugu: '' },
        date: '',
        temple_id: '',
        is_active: true
      });
    }
  }, [festival]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {festival ? 'Edit Festival' : 'Add Festival'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Festival Name (English)</Label>
              <Input
                value={formData.name?.english || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  name: { ...prev.name, english: e.target.value }
                }))}
                required
              />
            </div>
            <div>
              <Label>Festival Name (Telugu)</Label>
              <Input
                value={formData.name?.telugu || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  name: { ...prev.name, telugu: e.target.value }
                }))}
                required
              />
            </div>
          </div>

          <div>
            <Label>Description (English)</Label>
            <Textarea
              value={formData.description?.english || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                description: { ...prev.description, english: e.target.value }
              }))}
              rows={3}
            />
          </div>

          <div>
            <Label>Description (Telugu)</Label>
            <Textarea
              value={formData.description?.telugu || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                description: { ...prev.description, telugu: e.target.value }
              }))}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Date</Label>
              <Input
                type="date"
                value={formData.date || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label>Temple</Label>
              <Select
                value={formData.temple_id || ''}
                onValueChange={(value) => setFormData(prev => ({ ...prev, temple_id: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select temple" />
                </SelectTrigger>
                <SelectContent>
                  {temples.map(temple => (
                    <SelectItem key={temple.id} value={temple.id}>
                      {temple.name[language]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={formData.is_active || false}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
            />
            <Label>Active Festival</Label>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="gradient-primary text-white">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}