# Temple Sanathan Admin Backend Integration Guide

## Overview

This document provides a comprehensive guide for integrating the dummy admin backend with Supabase for the Temple Sanathan application. The dummy backend simulates all administrative functionality that will be implemented with Supabase in production.

## Architecture

### Dummy Backend Structure

The admin system consists of:

1. **Admin API (`/lib/admin-api.ts`)** - Core backend simulation
2. **Admin Login (`/components/AdminLogin.tsx`)** - Authentication interface
3. **Admin Dashboard (`/components/AdminDashboard.tsx`)** - Management interface
4. **App Integration** - Seamless integration with main application

### Features Implemented

#### Authentication System
- Admin login with email/password
- Role-based access (admin, super_admin)
- Session management
- Secure logout

#### Temple Management
- Create, read, update, delete temples
- Update temple images
- Manage temple timings
- Toggle temple status (open/closed)
- Bulk operations

#### Festival Management  
- Create, read, update, delete festivals
- Associate festivals with temples
- Manage festival status (active/inactive)
- Date-based filtering

#### Analytics & Monitoring
- Dashboard statistics
- Temple type distribution
- Upcoming festivals tracking
- Activity monitoring

## Database Schema for Supabase

### Tables Structure

```sql
-- Admin Users Table
CREATE TABLE admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- Temples Table (Enhanced)
CREATE TABLE temples (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name JSONB NOT NULL, -- {"english": "...", "telugu": "..."}
  deity JSONB NOT NULL, -- {"english": "...", "telugu": "..."}
  description JSONB, -- {"english": "...", "telugu": "..."}
  district VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  temple_type VARCHAR(50) NOT NULL CHECK (temple_type IN ('Hill', 'Ancient', 'River')),
  coordinates JSONB, -- {"lat": 0.0, "lng": 0.0}
  timings JSONB, -- {"morning": "...", "evening": "..."}
  is_open BOOLEAN DEFAULT true,
  image_url TEXT,
  contact_info JSONB, -- {"phone": "...", "email": "...", "website": "..."}
  facilities TEXT[], -- Array of facility names
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES admin_users(id),
  updated_by UUID REFERENCES admin_users(id)
);

-- Festivals Table (Enhanced)
CREATE TABLE festivals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name JSONB NOT NULL, -- {"english": "...", "telugu": "..."}
  description JSONB, -- {"english": "...", "telugu": "..."}
  date DATE NOT NULL,
  temple_id UUID REFERENCES temples(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES admin_users(id),
  updated_by UUID REFERENCES admin_users(id)
);

-- User Submissions Table (For temple submissions from app users)
CREATE TABLE temple_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  temple_data JSONB NOT NULL,
  submitted_by UUID REFERENCES auth.users(id),
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_notes TEXT,
  reviewed_by UUID REFERENCES admin_users(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE temples ENABLE ROW LEVEL SECURITY;
ALTER TABLE festivals ENABLE ROW LEVEL SECURITY;
ALTER TABLE temple_submissions ENABLE ROW LEVEL SECURITY;

-- Admin Users Policies
CREATE POLICY "Admin users can view their own data" ON admin_users
  FOR SELECT USING (auth.uid() = id);

-- Temples Policies  
CREATE POLICY "Anyone can view active temples" ON temples
  FOR SELECT USING (true);

CREATE POLICY "Only admins can modify temples" ON temples
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = auth.uid() AND is_active = true
    )
  );

-- Festivals Policies
CREATE POLICY "Anyone can view active festivals" ON festivals
  FOR SELECT USING (is_active = true);

CREATE POLICY "Only admins can modify festivals" ON festivals
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = auth.uid() AND is_active = true
    )
  );
```

## Integration Steps

### 1. Replace Dummy API Calls

Update `/lib/admin-api.ts` to use Supabase:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL!,
  process.env.REACT_APP_SUPABASE_ANON_KEY!
);

class AdminAPI {
  // Replace dummy authentication
  async adminLogin(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    
    // Verify admin role
    const { data: adminData } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .eq('is_active', true)
      .single();
      
    if (!adminData) throw new Error('Not an admin user');
    
    return { user: adminData, token: data.session?.access_token };
  }

  // Replace temple operations
  async getTemples() {
    const { data, error } = await supabase
      .from('temples')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data;
  }

  async createTemple(templeData: any) {
    const { data, error } = await supabase
      .from('temples')
      .insert([{
        ...templeData,
        created_by: this.currentAdmin?.id,
        updated_by: this.currentAdmin?.id
      }])
      .select()
      .single();
      
    if (error) throw error;
    return data;
  }

  // Continue with other methods...
}
```

### 2. Environment Variables

Add to your `.env` file:

```env
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
REACT_APP_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. File Upload Integration

For temple images, integrate with Supabase Storage:

```typescript
async updateTempleImage(templeId: string, file: File) {
  // Upload to Supabase Storage
  const fileName = `temples/${templeId}/${Date.now()}-${file.name}`;
  
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('temple-images')
    .upload(fileName, file);
    
  if (uploadError) throw uploadError;
  
  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('temple-images')
    .getPublicUrl(fileName);
    
  // Update temple record
  const { error } = await supabase
    .from('temples')
    .update({ 
      image_url: publicUrl,
      updated_by: this.currentAdmin?.id,
      updated_at: new Date().toISOString()
    })
    .eq('id', templeId);
    
  if (error) throw error;
  return true;
}
```

### 4. Real-time Updates

Add real-time functionality:

```typescript
// In AdminDashboard component
useEffect(() => {
  const channel = supabase
    .channel('admin-changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'temples' },
      (payload) => {
        // Refresh temples data
        loadData();
      }
    )
    .on(
      'postgres_changes', 
      { event: '*', schema: 'public', table: 'festivals' },
      (payload) => {
        // Refresh festivals data
        loadData();
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);
```

## Admin Access Setup

### Secret Admin Access

The application includes a secret admin access method:
- Tap the "Temple Sanathan" title 5 times quickly
- This opens the admin login screen
- Use demo credentials for testing

### Production Admin Setup

For production:

1. Create admin users in Supabase:
```sql
INSERT INTO admin_users (email, password_hash, role, name) VALUES
('admin@templesanathan.com', '$2b$10$...', 'admin', 'Temple Admin'),
('superadmin@templesanathan.com', '$2b$10$...', 'super_admin', 'Super Admin');
```

2. Set up proper authentication flow
3. Implement email verification
4. Add password reset functionality

## Security Considerations

### Production Security

1. **Environment Variables**: Never expose sensitive keys in client code
2. **Row Level Security**: Implement comprehensive RLS policies
3. **API Rate Limiting**: Configure Supabase rate limits
4. **Admin Session Management**: Implement secure session handling
5. **Audit Logging**: Track all admin actions
6. **Input Validation**: Validate all admin inputs server-side

### Admin Permissions

- **Admin**: Can manage temples and festivals
- **Super Admin**: Full access including user management
- **Audit Trail**: Log all administrative actions

## Testing the Dummy Backend

### Demo Credentials

**Admin Account:**
- Email: `admin@templesanathan.com`
- Password: `admin123`

**Super Admin Account:**
- Email: `superadmin@templesanathan.com`  
- Password: `superadmin123`

### Test Scenarios

1. **Login/Logout**: Test admin authentication flow
2. **Temple Management**: Create, update, delete temples
3. **Festival Management**: Manage festival lifecycle
4. **Image Updates**: Test temple image updates
5. **Bulk Operations**: Test mass updates
6. **Real-time Updates**: Verify live data sync

## Migration Path

### Phase 1: Setup Supabase Tables
- Create all required tables
- Set up RLS policies
- Configure storage buckets

### Phase 2: Replace Authentication
- Implement Supabase Auth
- Migrate admin user creation
- Test login/logout flow

### Phase 3: Replace CRUD Operations  
- Update temple operations
- Update festival operations
- Test all functionality

### Phase 4: Add Advanced Features
- Implement file uploads
- Add real-time updates
- Set up audit logging

### Phase 5: Production Deployment
- Configure security policies
- Set up monitoring
- Deploy to production

## Support and Maintenance

### Monitoring

- Set up Supabase monitoring
- Track API usage
- Monitor admin activities

### Backup Strategy

- Regular database backups
- Image storage backups
- Configuration backups

This dummy backend provides a complete foundation for the Temple Sanathan admin system and can be seamlessly migrated to Supabase for production use.
```