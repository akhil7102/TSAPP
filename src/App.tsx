import React, { useEffect, useRef, useState } from 'react';
import { App as CapacitorApp } from '@capacitor/app';
import { Home } from './components/Home';
import { Search } from './components/Search';
import { MapView } from './components/MapView';
import { TempleProfile } from './components/TempleProfile';
import { Bookmarks } from './components/Bookmarks';
import { Settings } from './components/Settings';
import { UserSubmission } from './components/UserSubmission';
import { Auth } from './components/Auth';
import { About } from './components/About';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { CategoryView } from './components/CategoryView';
import { templesData, Temple } from './data/temples';
import { supabaseClient } from './lib/supabase';
import { Button } from './components/ui/button';
import { Home as HomeIcon, Search as SearchIcon, MessageCircle, Bookmark, Settings as SettingsIcon } from 'lucide-react';
import { PageTransition } from './components/animations/PageTransition';
import { AnimatedButton } from './components/animations/AnimatedButton';
import { getCurrentUser } from './lib/supabase';
const logoImage = 'https://cdn.builder.io/api/v1/image/assets%2F9bd9afcd145e424f9a6e1c185329d964%2Fab05f91adfc24ec18bc34258b1d60b0d?format=webp&width=256';
import { AdminPage } from './components/AdminPage';
import { Welcome } from './components/Welcome';
import { Chat } from './components/Chat';
import { getAppVersion } from './version';
import { getLatestAppUpdate, compareVersions } from './lib/updates';
import { UpdatePrompt } from './components/UpdatePrompt';
import { SplashScreen } from './components/SplashScreen';

type Language = 'english' | 'telugu';
type Screen = 'welcome' | 'home' | 'search' | 'chat' | 'temple' | 'bookmarks' | 'settings' | 'submit' | 'auth' | 'about' | 'privacy' | 'category' | 'admin';

type NavEntry = { screen: Screen; temple?: Temple | null; category?: string | null };

interface AppState {
  currentScreen: Screen;
  selectedTemple: Temple | null;
  language: Language;
  bookmarkedTemples: string[];
  searchQuery: string;
  isOffline: boolean;
  user: any;
  selectedCategory: string | null;
  navHistory: NavEntry[];
  booting: boolean;
}

export default function App() {
  const [state, setState] = useState<AppState>({
    currentScreen: 'welcome',
    selectedTemple: null,
    language: 'english',
    bookmarkedTemples: [],
    searchQuery: '',
    isOffline: false,
    user: null,
    selectedCategory: null,
    navHistory: [],
    booting: true,
  });

  // Load bookmarks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('templeBookmarks');
    if (saved) {
      setState(prev => ({ ...prev, bookmarkedTemples: JSON.parse(saved) }));
    }
  }, []);

  // Save bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem('templeBookmarks', JSON.stringify(state.bookmarkedTemples));
  }, [state.bookmarkedTemples]);

  // Check for authenticated user on app load
  useEffect(() => {
    const checkUser = async () => {
      if (!navigator.onLine) {
        const firstLaunch = localStorage.getItem('firstLaunchDone') === 'true';
        setState(prev => ({ ...prev, isOffline: true, currentScreen: firstLaunch ? 'auth' : 'welcome', booting: false }));
        return;
      }
      const user = await getCurrentUser();
      const firstLaunch = localStorage.getItem('firstLaunchDone') === 'true';
      setState(prev => ({ ...prev, user, currentScreen: firstLaunch ? (user ? 'home' : 'auth') : 'welcome', booting: false }));
    };
    checkUser();

    // Listen for auth state changes (only if Supabase is configured)
    let _subscription: { unsubscribe: () => void } | null = null;
    if (supabaseClient) {
      const { data } = supabaseClient.auth.onAuthStateChange((event, session) => {
        if (event === 'TOKEN_REFRESHED' || event === 'SIGNED_IN') {
          setState(prev => ({ ...prev, user: session?.user || null, currentScreen: prev.currentScreen === 'welcome' ? 'home' : prev.currentScreen }));
          return;
        }
        if (event === 'SIGNED_OUT') {
          setState(prev => ({ ...prev, user: null, currentScreen: 'auth' }));
          return;
        }
        if (event === 'TOKEN_REFRESH_FAILED') {
          try { Object.keys(localStorage).forEach((k) => { if (k.startsWith('sb-') || k.includes('templesanathan-auth')) localStorage.removeItem(k); }); } catch {}
          setState(prev => ({ ...prev, user: null, currentScreen: 'auth' }));
          return;
        }
        setState(prev => ({ ...prev, user: session?.user || null }));
      });
      _subscription = data.subscription;
    }

    return () => {
      _subscription?.unsubscribe();
    };
  }, []);

  // Check online/offline status
  useEffect(() => {
    const handleOnline = () => setState(prev => ({ ...prev, isOffline: false }));
    const handleOffline = () => setState(prev => ({ ...prev, isOffline: true }));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check initial status
    setState(prev => ({ ...prev, isOffline: !navigator.onLine }));

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Scroll container ref to control scroll position
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // App update modal state
  const [updateState, setUpdateState] = useState<{ open: boolean; title: string; description: string; version: string; mandatory: boolean; updateUrl?: string | null } | null>(null);

  // Fetch latest update info on launch
  useEffect(() => {
    const run = async () => {
      const { data } = await getLatestAppUpdate();
      if (!data) return;
      const currentVersion = getAppVersion();
      const isNewer = compareVersions(data.version, currentVersion) > 0;
      const skipped = localStorage.getItem('skippedUpdateVersion');
      const shouldShow = isNewer && (data.mandatory || skipped !== data.version);
      if (shouldShow) {
        setUpdateState({ open: true, title: data.title, description: data.description, version: data.version, mandatory: !!data.mandatory, updateUrl: data.update_url ?? undefined });
      }
    };
    run();
  }, []);

  // Ensure pages load from top on screen change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'auto' });
    } else {
      window.scrollTo(0, 0);
    }
  }, [state.currentScreen]);


  const navigateTo = (screen: Screen, temple?: Temple, category?: string) => { setPageDirection(1);
    const firstLaunchDone = localStorage.getItem('firstLaunchDone') === 'true';
    let isLocalAdmin = false;
    try { isLocalAdmin = localStorage.getItem('ts-admin') === '1'; } catch {}
    const needAuth = !state.user && screen !== 'auth' && screen !== 'welcome' && !(screen === 'admin' && isLocalAdmin);
    const target = needAuth ? (firstLaunchDone ? 'auth' : 'welcome') : screen;
    setState(prev => ({
      ...prev,
      navHistory: [...prev.navHistory, { screen: prev.currentScreen, temple: prev.selectedTemple, category: prev.selectedCategory }].slice(-20),
      currentScreen: target,
      selectedTemple: temple || null,
      selectedCategory: category || null
    }));
  };

  const goBack = () => { setPageDirection(-1);
    setState(prev => {
      const hist = [...prev.navHistory];
      const last = hist.pop();
      if (!last) {
        return { ...prev, currentScreen: 'home', selectedTemple: null, selectedCategory: null, navHistory: [] };
      }
      return {
        ...prev,
        currentScreen: last.screen,
        selectedTemple: last.temple || null,
        selectedCategory: last.category || null,
        navHistory: hist,
      };
    });
  };

  // Android hardware back button handling (Capacitor)
  useEffect(() => {
    let sub: { remove: () => void } | undefined;
    const setup = async () => {
      try {
        sub = await CapacitorApp.addListener('backButton', () => {
          if (state.currentScreen === 'home' || state.navHistory.length === 0) {
            try { CapacitorApp.exitApp(); } catch {}
          } else {
            goBack();
          }
        });
      } catch {}
    };
    setup();
    return () => { try { sub?.remove(); } catch {} };
  }, [state.currentScreen, state.navHistory.length]);

  // Track mobile/desktop to control bottom nav visibility while typing
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mq.matches || ('ontouchstart' in window));
    try { mq.addEventListener('change', update); } catch { mq.addListener(update); }
    window.addEventListener('resize', update);
    update();
    return () => {
      try { mq.removeEventListener('change', update); } catch { mq.removeListener(update); }
      window.removeEventListener('resize', update);
    };
  }, []);

  const toggleLanguage = () => {
    setState(prev => ({
      ...prev,
      language: prev.language === 'english' ? 'telugu' : 'english'
    }));
  };

  const toggleBookmark = (templeId: string) => {
    setState(prev => ({
      ...prev,
      bookmarkedTemples: prev.bookmarkedTemples.includes(templeId)
        ? prev.bookmarkedTemples.filter(id => id !== templeId)
        : [...prev.bookmarkedTemples, templeId]
    }));
  };

  const setSearchQuery = (query: string) => {
    setState(prev => ({ ...prev, searchQuery: query }));
  };

  const handleAuthSuccess = (user: any) => {
    localStorage.setItem('firstLaunchDone', 'true');
    setState(prev => ({ ...prev, user, currentScreen: 'home' }));
  };



  const [remoteTemples, setRemoteTemples] = useState<Temple[]>([]);

  useEffect(() => {
    const load = async () => {
      if (!supabaseClient) return;
      const { data, error } = await supabaseClient.from('temples').select('*').order('created_at', { ascending: false });
      if (error) return;
      const mapped: Temple[] = (data || []).map((r: any) => ({
        id: r.id,
        name: r.name || { english: '', telugu: '' },
        deity: r.deity || { english: '', telugu: '' },
        district: r.district || '',
        state: (r.state as 'TS' | 'AP') || 'TS',
        location: {
          latitude: r.coordinates?.lat ?? r.location?.latitude ?? 0,
          longitude: r.coordinates?.lng ?? r.location?.longitude ?? 0,
          address: r.location?.address || { english: '', telugu: '' },
        },
        description: r.description || { english: '', telugu: '' },
        history: { english: '', telugu: '' },
        timings: {
          morning: r.timings?.morning || '',
          evening: r.timings?.evening || '',
          pujaTimings: r.timings?.pujaTimings || [],
        },
        festivals: [],
        images: r.images || (r.image_url ? [r.image_url] : []),
        contact: r.contact_info || {},
        features: r.features || [],
        isOpen: r.is_open ?? true,
        popularity: r.popularity ?? 0,
        templeType: r.temple_type || 'Ancient',
      }));
      setRemoteTemples(mapped);
    };
    load();
  }, []);

  // Realtime: remove deleted temples immediately from the running app
  useEffect(() => {
    if (!supabaseClient) return;
    const ch = supabaseClient
      .channel('temples-rt')
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'temples' }, (payload: any) => {
        const id = payload?.old?.id;
        if (id) {
          setRemoteTemples(prev => prev.filter(t => t.id !== id));
        }
      })
      .subscribe();
    return () => { ch.unsubscribe(); };
  }, []);

  const allTemples: Temple[] = React.useMemo(() => {
    // Merge local and remote; remote first to include admin-approved entries
    const byId = new Map<string, Temple>();
    for (const t of remoteTemples) byId.set(t.id, t);
    for (const t of templesData) if (!byId.has(t.id)) byId.set(t.id, t);
    return Array.from(byId.values());
  }, [remoteTemples]);

  // In-app notifications via Supabase Realtime
  const [inbox, setInbox] = useState<{ id: string; title: string; message: string }[]>([]);
  useEffect(() => {
    if (!supabaseClient) return;
    const ch = supabaseClient.channel('notifications');
    ch.on('broadcast', { event: 'new_message' }, (payload: any) => {
      const p = payload?.payload || payload;
      setInbox((prev) => [...prev, { id: crypto.randomUUID(), title: p.title || 'Message', message: p.message || '' }].slice(-5));
    }).subscribe();
    return () => { ch.unsubscribe(); };
  }, []);
  useEffect(() => {
    if (!supabaseClient || !state.user?.email) return;
    const channelName = `user:${String(state.user.email).toLowerCase()}`;
    const ch = supabaseClient.channel(channelName);
    ch.on('broadcast', { event: 'new_message' }, (payload: any) => {
      const p = payload?.payload || payload;
      setInbox((prev) => [...prev, { id: crypto.randomUUID(), title: p.title || 'Message', message: p.message || '' }].slice(-5));
    }).subscribe();
    return () => { ch.unsubscribe(); };
  }, [state.user?.email]);

  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [pageDirection, setPageDirection] = useState<1 | -1>(1);
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const mq = window.matchMedia('(max-width: 768px)');
    return mq.matches || ('ontouchstart' in window);
  });

  const renderScreen = () => {
    const commonProps = {
      language: state.language,
      onNavigate: navigateTo,
      onToggleBookmark: toggleBookmark,
      bookmarkedTemples: state.bookmarkedTemples,
      temples: allTemples,
      isOffline: state.isOffline,
      user: state.user
    };

    switch (state.currentScreen) {
      case 'welcome':
        return <Welcome language={state.language} onStartAuth={() => navigateTo('auth')} />;
      case 'home':
        return <Home {...commonProps} />;
      case 'search':
        return (
          <Search
            {...commonProps}
            searchQuery={state.searchQuery}
            onSearchQueryChange={setSearchQuery}
          />
        );
      case 'chat':
        return <Chat language={state.language} user={state.user} isOffline={state.isOffline} onKeyboardOpenChange={setKeyboardOpen} />;
      case 'temple':
        return state.selectedTemple ? (
          <TempleProfile 
            {...commonProps} 
            temple={state.selectedTemple}
          />
        ) : null;
      case 'bookmarks':
        return <Bookmarks {...commonProps} />;
      case 'settings':
        return <Settings {...commonProps} onToggleLanguage={toggleLanguage} />;
      case 'submit':
        return <UserSubmission {...commonProps} />;
      case 'auth':
        return <Auth language={state.language} onNavigate={navigateTo} onAuthSuccess={handleAuthSuccess} />;
      case 'about':
        return <About language={state.language} onNavigate={navigateTo} />;
      case 'privacy':
        return <PrivacyPolicy language={state.language} onNavigate={navigateTo} />;
      case 'category':
        return state.selectedCategory ? (
          <CategoryView
            {...commonProps}
            category={state.selectedCategory}
          />
        ) : null;
      case 'admin':
        return <AdminPage language={state.language} />;
      default:
        return <Home {...commonProps} />;
    }
  };

  const texts = {
    english: {
      home: 'Home',
      search: 'Search',
      chat: 'Chat',
      bookmarks: 'Saved',
      settings: 'Settings',
      offlineMessage: 'You are offline. Some features may not be available.'
    },
    telugu: {
      home: 'హోమ్',
      search: '���ెతుకు',
      chat: 'చాట్',
      bookmarks: 'సేవ్',
      settings: 'సెట్ట�����ంగ్స్',
      offlineMessage: 'మీరు ఆఫ్‌లైన్‌లో ఉన్నారు. కొన్ని ఫీచర్లు అందుబాటులో ఉండకపో��చ్చు.'
    }
  };

  const t = texts[state.language];

  // Hide bottom navigation for specific screens
  // Additionally: while typing on mobile, hide the bottom nav (desktop always visible)
  const hideBottomNav = ['welcome', 'temple', 'auth', 'about', 'privacy', 'category', 'admin'].includes(state.currentScreen) || (keyboardOpen && isMobile);
  const hideTopBar = ['welcome', 'auth'].includes(state.currentScreen);

  if (state.booting) {
    return <SplashScreen language={state.language} />;
  }

  return (
    <div className="h-screen w-full flex flex-col">
      {/* Offline Banner */}
      {state.isOffline && (
        <div className="bg-yellow-600 text-white text-center py-2 text-sm">
          {t.offlineMessage}
        </div>
      )}

      {/* Offline blocking overlay */}
      {state.isOffline && (
        <div className="fixed inset-0 z-[70] bg-background/80 backdrop-blur flex items-center justify-center p-6">
          <div className="max-w-sm text-center space-y-2">
            <div className="text-lg font-semibold">Internet connection required</div>
            <div className="text-sm text-muted-foreground">Please connect to the internet to continue using Temple Sanathan.</div>
          </div>
        </div>
      )}



      {/* Name Bar (fixed) */}
      {!hideTopBar && (
        <div className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-center p-4 border-b bg-card/90 backdrop-blur shadow-sm">
          <div className="flex items-center gap-3 w-full max-w-3xl">
            <button onClick={() => navigateTo('home')} className="flex items-center gap-3 group" aria-label="Go Home">
              <div className="w-9 h-9 rounded-full overflow-hidden gradient-primary p-1.5 ring-1 ring-primary/30 shadow">
                <img src={logoImage} alt="Temple Sanathan" className="w-full h-full object-contain mix-blend-screen" />
              </div>
              <div className="flex flex-col leading-tight text-left">
                <span className="text-lg font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent group-active:opacity-80">Temple Sanathan</span>
                <span className="text-[10px] text-muted-foreground tracking-wide">Discover • Devotion • Dharma</span>
              </div>
            </button>
            <div className="ml-auto">
              <span className="px-2 py-1 text-[10px] rounded-md border border-primary/30 text-primary/90 bg-primary/10">ॐ</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div ref={scrollRef} className={`flex-1 overflow-auto pb-16 ${hideTopBar ? '' : 'pt-16'}`}>
        {/* Global top container under the name bar */}
        {!hideTopBar && <div className="h-16 w-full bg-card/80 backdrop-blur border-b border-primary/20" />}
        <PageTransition screenKey={state.currentScreen} direction={pageDirection}>
          {renderScreen()}
        </PageTransition>
      </div>

      {/* Update prompt */}
      {updateState?.open && (
        <UpdatePrompt
          open={updateState.open}
          title={updateState.title}
          description={updateState.description}
          version={updateState.version}
          mandatory={updateState.mandatory}
          updateUrl={updateState.updateUrl}
          onUpdate={() => {
            if (updateState.updateUrl) {
              window.location.href = updateState.updateUrl;
            } else {
              window.location.reload();
            }
          }}
          onSkip={() => {
            if (!updateState.mandatory) {
              localStorage.setItem('skippedUpdateVersion', updateState.version);
              setUpdateState(null);
            }
          }}
        />
      )}

      {/* In-app notifications */}
      {inbox.length > 0 && (
        <div className="fixed top-4 right-4 z-[60] space-y-2 max-w-sm">
          {inbox.map(n => (
            <div key={n.id} className="bg-card/95 backdrop-blur border border-primary/20 rounded-lg shadow p-3 animate-in fade-in slide-in-from-right-2">
              <div className="text-sm font-semibold text-foreground">{n.title}</div>
              <div className="text-sm text-muted-foreground">{n.message}</div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Navigation - Hide for specific screens */}
      {!hideBottomNav && (
        <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around p-2 border-t bg-card/90 backdrop-blur shadow-sm">
          <AnimatedButton
            variant={state.currentScreen === 'home' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => navigateTo('home')}
            className={`flex flex-col items-center gap-1 text-xs ${
              state.currentScreen === 'home'
                ? 'gradient-primary text-white'
                : 'hover:bg-accent'
            }`}
          >
            <HomeIcon className="w-4 h-4" />
            {t.home}
          </AnimatedButton>

          <AnimatedButton
            variant={state.currentScreen === 'search' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => navigateTo('search')}
            className={`flex flex-col items-center gap-1 text-xs ${
              state.currentScreen === 'search'
                ? 'gradient-primary text-white'
                : 'hover:bg-accent'
            }`}
          >
            <SearchIcon className="w-4 h-4" />
            {t.search}
          </AnimatedButton>

          <AnimatedButton
            variant={state.currentScreen === 'chat' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => navigateTo('chat')}
            className={`flex flex-col items-center gap-1 text-xs ${
              state.currentScreen === 'chat'
                ? 'gradient-primary text-white'
                : 'hover:bg-accent'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            {t.chat}
          </AnimatedButton>

          <AnimatedButton
            variant={state.currentScreen === 'bookmarks' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => navigateTo('bookmarks')}
            className={`flex flex-col items-center gap-1 text-xs ${
              state.currentScreen === 'bookmarks'
                ? 'gradient-primary text-white'
                : 'hover:bg-accent'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            {t.bookmarks}
          </AnimatedButton>

          <AnimatedButton
            variant={state.currentScreen === 'settings' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => navigateTo('settings')}
            className={`flex flex-col items-center gap-1 text-xs ${
              state.currentScreen === 'settings'
                ? 'gradient-primary text-white'
                : 'hover:bg-accent'
            }`}
          >
            <SettingsIcon className="w-4 h-4" />
            {t.settings}
          </AnimatedButton>

        </div>
      )}
    </div>
  );
}
