// Dummy Backend API for Temple Sanathan Admin System
// This simulates the actual Supabase backend functionality

interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'super_admin';
  name: string;
  created_at: string;
}

interface Festival {
  id: string;
  name: {
    english: string;
    telugu: string;
  };
  description: {
    english: string;
    telugu: string;
  };
  date: string;
  temple_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface TempleData {
  id: string;
  name: {
    english: string;
    telugu: string;
  };
  deity: {
    english: string;
    telugu: string;
  };
  description: {
    english: string;
    telugu: string;
  };
  district: string;
  state: string;
  temple_type: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  timings: {
    morning: string;
    evening: string;
  };
  is_open: boolean;
  image_url: string;
  contact_info: {
    phone?: string;
    email?: string;
    website?: string;
  };
  facilities: string[];
  created_at: string;
  updated_at: string;
}

class AdminAPI {
  private currentAdmin: AdminUser | null = null;
  private temples: TempleData[] = [];
  private festivals: Festival[] = [];
  private isInitialized = false;

  constructor() {
    this.initializeData();
  }

  private async initializeData() {
    if (this.isInitialized) return;

    // Initialize with some dummy data
    this.temples = [
      {
        id: '1',
        name: {
          english: 'Tirumala Venkateswara Temple',
          telugu: 'తిరుమల వేంకటేశ్వర ఆలయం'
        },
        deity: {
          english: 'Lord Venkateswara',
          telugu: 'వేంకటేశ్వర స్వామి'
        },
        description: {
          english: 'Famous hill temple dedicated to Lord Venkateswara',
          telugu: 'వేంకటేశ్వర స్వామికి అంకితమైన ప్రసిద్ధ కొండ ఆలయం'
        },
        district: 'Tirupati',
        state: 'Andhra Pradesh',
        temple_type: 'Hill',
        coordinates: { lat: 13.6833, lng: 79.3167 },
        timings: {
          morning: '5:00 AM - 12:00 PM',
          evening: '4:00 PM - 9:00 PM'
        },
        is_open: true,
        image_url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600',
        contact_info: {
          phone: '+91-877-2277777',
          website: 'https://tirumala.org'
        },
        facilities: ['Parking', 'Prasadam', 'Accommodation', 'Wheelchair Access'],
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      }
    ];

    this.festivals = [
      {
        id: '1',
        name: {
          english: 'Brahmotsavam',
          telugu: 'బ్రహ్మోత్సవం'
        },
        description: {
          english: 'Annual festival celebrating Lord Venkateswara',
          telugu: 'వేంకటేశ్వర స్వామి వార్షిక ఉత్సవం'
        },
        date: '2024-09-15',
        temple_id: '1',
        is_active: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      }
    ];

    this.isInitialized = true;
  }

  // Admin Authentication
  async adminLogin(email: string, password: string): Promise<{ user: AdminUser; token: string } | null> {
    await this.delay(1000); // Simulate API delay

    // Mock admin credentials
    const mockAdmins = [
      {
        id: 'admin-1',
        email: 'admin@templesanathan.com',
        password: 'admin123',
        role: 'admin' as const,
        name: 'Temple Admin'
      },
      {
        id: 'admin-2',
        email: 'superadmin@templesanathan.com',
        password: 'superadmin123',
        role: 'super_admin' as const,
        name: 'Super Admin'
      }
    ];

    const admin = mockAdmins.find(a => a.email === email && a.password === password);
    
    if (admin) {
      const user: AdminUser = {
        id: admin.id,
        email: admin.email,
        role: admin.role,
        name: admin.name,
        created_at: '2024-01-01T00:00:00Z'
      };
      
      this.currentAdmin = user;
      const token = btoa(JSON.stringify({ userId: admin.id, timestamp: Date.now() }));
      
      return { user, token };
    }
    
    return null;
  }

  async adminLogout(): Promise<void> {
    await this.delay(500);
    this.currentAdmin = null;
  }

  getCurrentAdmin(): AdminUser | null {
    return this.currentAdmin;
  }

  // Temple Management
  async getTemples(): Promise<TempleData[]> {
    await this.delay(800);
    return [...this.temples];
  }

  async getTemple(id: string): Promise<TempleData | null> {
    await this.delay(500);
    return this.temples.find(t => t.id === id) || null;
  }

  async createTemple(templeData: Omit<TempleData, 'id' | 'created_at' | 'updated_at'>): Promise<TempleData> {
    await this.delay(1000);
    
    if (!this.currentAdmin) {
      throw new Error('Admin authentication required');
    }

    const newTemple: TempleData = {
      ...templeData,
      id: `temple-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.temples.push(newTemple);
    return newTemple;
  }

  async updateTemple(id: string, updates: Partial<Omit<TempleData, 'id' | 'created_at'>>): Promise<TempleData | null> {
    await this.delay(1000);
    
    if (!this.currentAdmin) {
      throw new Error('Admin authentication required');
    }

    const index = this.temples.findIndex(t => t.id === id);
    if (index === -1) return null;

    this.temples[index] = {
      ...this.temples[index],
      ...updates,
      updated_at: new Date().toISOString()
    };

    return this.temples[index];
  }

  async deleteTemple(id: string): Promise<boolean> {
    await this.delay(800);
    
    if (!this.currentAdmin) {
      throw new Error('Admin authentication required');
    }

    const index = this.temples.findIndex(t => t.id === id);
    if (index === -1) return false;

    // Also delete associated festivals
    this.festivals = this.festivals.filter(f => f.temple_id !== id);
    this.temples.splice(index, 1);
    
    return true;
  }

  async updateTempleImage(id: string, imageUrl: string): Promise<boolean> {
    await this.delay(1200);
    
    if (!this.currentAdmin) {
      throw new Error('Admin authentication required');
    }

    const temple = this.temples.find(t => t.id === id);
    if (!temple) return false;

    temple.image_url = imageUrl;
    temple.updated_at = new Date().toISOString();
    
    return true;
  }

  async updateTempleTimings(id: string, timings: { morning: string; evening: string }): Promise<boolean> {
    await this.delay(800);
    
    if (!this.currentAdmin) {
      throw new Error('Admin authentication required');
    }

    const temple = this.temples.find(t => t.id === id);
    if (!temple) return false;

    temple.timings = timings;
    temple.updated_at = new Date().toISOString();
    
    return true;
  }

  // Festival Management
  async getFestivals(templeId?: string): Promise<Festival[]> {
    await this.delay(600);
    
    if (templeId) {
      return this.festivals.filter(f => f.temple_id === templeId);
    }
    
    return [...this.festivals];
  }

  async getFestival(id: string): Promise<Festival | null> {
    await this.delay(400);
    return this.festivals.find(f => f.id === id) || null;
  }

  async createFestival(festivalData: Omit<Festival, 'id' | 'created_at' | 'updated_at'>): Promise<Festival> {
    await this.delay(1000);
    
    if (!this.currentAdmin) {
      throw new Error('Admin authentication required');
    }

    const newFestival: Festival = {
      ...festivalData,
      id: `festival-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.festivals.push(newFestival);
    return newFestival;
  }

  async updateFestival(id: string, updates: Partial<Omit<Festival, 'id' | 'created_at'>>): Promise<Festival | null> {
    await this.delay(800);
    
    if (!this.currentAdmin) {
      throw new Error('Admin authentication required');
    }

    const index = this.festivals.findIndex(f => f.id === id);
    if (index === -1) return null;

    this.festivals[index] = {
      ...this.festivals[index],
      ...updates,
      updated_at: new Date().toISOString()
    };

    return this.festivals[index];
  }

  async deleteFestival(id: string): Promise<boolean> {
    await this.delay(600);
    
    if (!this.currentAdmin) {
      throw new Error('Admin authentication required');
    }

    const index = this.festivals.findIndex(f => f.id === id);
    if (index === -1) return false;

    this.festivals.splice(index, 1);
    return true;
  }

  async toggleFestivalStatus(id: string): Promise<boolean> {
    await this.delay(500);
    
    if (!this.currentAdmin) {
      throw new Error('Admin authentication required');
    }

    const festival = this.festivals.find(f => f.id === id);
    if (!festival) return false;

    festival.is_active = !festival.is_active;
    festival.updated_at = new Date().toISOString();
    
    return true;
  }

  // Utility function to simulate API delays
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Analytics and Stats (for admin dashboard)
  async getStats(): Promise<{
    totalTemples: number;
    totalFestivals: number;
    activeTemples: number;
    upcomingFestivals: number;
    templesByType: Record<string, number>;
  }> {
    await this.delay(1000);
    
    const totalTemples = this.temples.length;
    const totalFestivals = this.festivals.length;
    const activeTemples = this.temples.filter(t => t.is_open).length;
    const upcomingFestivals = this.festivals.filter(f => 
      f.is_active && new Date(f.date) > new Date()
    ).length;
    
    const templesByType = this.temples.reduce((acc, temple) => {
      acc[temple.temple_type] = (acc[temple.temple_type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalTemples,
      totalFestivals,
      activeTemples,
      upcomingFestivals,
      templesByType
    };
  }

  // Batch operations
  async bulkUpdateTempleStatus(templeIds: string[], isOpen: boolean): Promise<number> {
    await this.delay(1500);
    
    if (!this.currentAdmin) {
      throw new Error('Admin authentication required');
    }

    let updatedCount = 0;
    const now = new Date().toISOString();

    this.temples.forEach(temple => {
      if (templeIds.includes(temple.id)) {
        temple.is_open = isOpen;
        temple.updated_at = now;
        updatedCount++;
      }
    });

    return updatedCount;
  }

  async bulkDeleteFestivals(festivalIds: string[]): Promise<number> {
    await this.delay(1200);
    
    if (!this.currentAdmin) {
      throw new Error('Admin authentication required');
    }

    const initialLength = this.festivals.length;
    this.festivals = this.festivals.filter(f => !festivalIds.includes(f.id));
    
    return initialLength - this.festivals.length;
  }
}

// Export singleton instance
export const adminAPI = new AdminAPI();

// Export types for use in components
export type { AdminUser, Festival, TempleData };