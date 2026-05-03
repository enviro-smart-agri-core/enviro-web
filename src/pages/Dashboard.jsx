import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/userdashboard.module.css'; 
import { updateProfile, updatePassword } from '../api/auth'; 
import { useAuth } from '../hooks/useAuth';
import { fetchWeather } from '../api/weather'; 

// 🌟 Added Droplets and Leaf for the Home view icons!
import { 
  LayoutDashboard, Cpu, Scan, Lock, ShoppingBag, Smartphone, 
  User, ShieldCheck, Trophy, Droplet, Droplets, Wind, Thermometer, Sprout, Leaf,
  CheckCircle, WifiOff, Clock, Plus, ChevronRight, Info, Monitor, LogOut,
  Sun, Moon, Cloud, CloudSun, CloudMoon, CloudRain, CloudLightning, CloudSnow 
} from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const { token, email, username, logout } = useAuth();

  const [activeView, setActiveView] = useState('view-home');
  const [modal, setModal] = useState({ isOpen: false, featureName: '' });

  const [weather, setWeather] = useState({ temp: '--', condition: 'Locating...', iconType: 'cloud-sun', city: 'Locating...' });

  const [editUsername, setEditUsername] = useState(username);
  const [editEmail, setEditEmail] = useState(email);
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [profileMsg, setProfileMsg] = useState(''); 
  const [securityMsg, setSecurityMsg] = useState(''); 

  useEffect(() => {
    const loadWeather = async () => {
      const data = await fetchWeather();
      setWeather(data);
    };
    loadWeather();
  }, []);

  const getHeaderInfo = () => {
    switch (activeView) {
      case 'view-home': return { title: 'Farm Overview', subtitle: `Read-only web access. Connected to ${username}'s node.` };
      case 'view-sensors': return { title: 'Sensors', subtitle: 'Monitor your farm devices securely.' };
      case 'view-profile': return { title: 'Profile', subtitle: 'Manage your account settings.' };
      case 'view-edit-profile': return { title: 'Manage Profile', subtitle: 'Update your personal details.' };
      case 'view-security': return { title: 'Security', subtitle: 'Update your password.' };
      case 'view-about': return { title: 'About Enviro', subtitle: 'Our story and mission.' }; // 🌟 NEW: About Page Title
      default: return { title: '', subtitle: '' };
    }
  };

  const { title, subtitle } = getHeaderInfo();

  const renderWeatherIcon = () => {
    switch (weather.iconType) {
      case 'sun': return <Sun size={40} color="#f59e0b" style={{ marginBottom: '10px' }} />;
      case 'moon': return <Moon size={40} color="#94a3b8" style={{ marginBottom: '10px' }} />;
      case 'cloud': return <Cloud size={40} color="#9ca3af" style={{ marginBottom: '10px' }} />;
      case 'cloud-sun': return <CloudSun size={40} color="#f59e0b" style={{ marginBottom: '10px' }} />;
      case 'cloud-moon': return <CloudMoon size={40} color="#94a3b8" style={{ marginBottom: '10px' }} />;
      case 'rain': return <CloudRain size={40} color="#3b82f6" style={{ marginBottom: '10px' }} />;
      case 'lightning': return <CloudLightning size={40} color="#8b5cf6" style={{ marginBottom: '10px' }} />;
      case 'snow': return <CloudSnow size={40} color="#60a5fa" style={{ marginBottom: '10px' }} />;
      default: return <CloudSun size={40} color="#f59e0b" style={{ marginBottom: '10px' }} />;
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileMsg("Saving...");
    try {
      await updateProfile(token, editUsername, editEmail);
      localStorage.setItem('username', editUsername);
      localStorage.setItem('email', editEmail);
      setProfileMsg("Profile updated successfully! ✅");
      setTimeout(() => {
        setProfileMsg('');
        setActiveView('view-profile');
      }, 1500);
    } catch (err) {
      setProfileMsg(`Error: ${err.message}`);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setSecurityMsg("Updating...");
    try {
      await updatePassword(token, currentPass, newPass);
      setSecurityMsg("Password secured! 🔒");
      setCurrentPass('');
      setNewPass('');
      setTimeout(() => {
        setSecurityMsg('');
        setActiveView('view-profile');
      }, 1500);
    } catch (err) {
      setSecurityMsg(`Error: ${err.message}`);
    }
  };

  return (
    <div className={styles.wrapper}>
      
      {/* SIDEBAR */}
      <nav className={styles.sidebar}>
        <div className={styles.name}>
          <img src="/assets/leaf.png" alt="" className={styles['brand-logo']} /> enviro
        </div>

        <div className={styles.navigation}>
          <button className={`${styles['navigation-item']} ${activeView === 'view-home' ? styles.active : ''}`} onClick={() => setActiveView('view-home')}>
            <div className={styles['nav-left']}><LayoutDashboard size={20} /> Home</div>
          </button>
          <button className={`${styles['navigation-item']} ${activeView === 'view-sensors' ? styles.active : ''}`} onClick={() => setActiveView('view-sensors')}>
            <div className={styles['nav-left']}><Cpu size={20} /> Sensors</div>
          </button>
          <button className={`${styles['navigation-item']} ${styles.noaccess}`} onClick={() => setModal({ isOpen: true, featureName: 'AI Disease Scanning' })}>
            <div className={styles['nav-left']}><Scan size={20} /> Scan</div><Lock size={14} />
          </button>
          <button className={`${styles['navigation-item']} ${styles.noaccess}`} onClick={() => setModal({ isOpen: true, featureName: 'Supply Shop' })}>
            <div className={styles['nav-left']}><ShoppingBag size={20} /> Shop</div><Lock size={14} />
          </button>
        </div>

        <div className={styles['sidebar-download']}>
          <Smartphone size={32} color="var(--emerald-green)" style={{ margin: '0 auto' }} />
          <p>Get the full hardware experience.</p>
          <button className={styles['button-download']} onClick={() => setModal({ isOpen: true, featureName: 'Full Platform Access' })}>Get App</button>
        </div>
      </nav>

      {/* MAIN CONTAINER */}
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headertext}>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          <button className={styles.myprof} onClick={() => setActiveView('view-profile')}>
            <div className={styles['myprof-icon']}><User size={24} /></div>
          </button>
        </header>

        {/* VIEW 1: HOME */}
        <div className={`${styles['app-view']} ${activeView === 'view-home' ? styles.active : ''}`}>
          <div className={styles.grid}>
            <div className={`${styles.card} ${styles['card-full']}`}>
              <span className={styles.label}>Weather Safety</span>
              <div className={styles['weather-flex']}>
                <div>
                  <div className={styles['safe-status']}><ShieldCheck color="var(--emerald-green)" size={32} /> Safe</div>
                  <p style={{ color: 'var(--text-muted)', fontWeight: 500, marginTop: '5px' }}>{weather.city}</p>
                </div>
                
                <div className={styles.temp}>
                  {renderWeatherIcon()}
                  <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--dark-evergreen)' }}>
                    {weather.temp}°C
                  </h2>
                  <p style={{ color: 'var(--text-muted)', fontWeight: 500 }}>
                    {weather.condition}
                  </p>
                </div>

              </div>
            </div>
            
            {/* 🌟 NEW: Icons added to the data cards */}
            <div className={styles.card}>
              <span className={styles.label}>Water Saved</span>
              <div className={styles['water-val']} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Droplets size={32} color="#3b82f6" /> 120 L
              </div>
            </div>
            
            <div className={styles.card}>
              <span className={styles.label}>Crop Status</span>
              <div className={styles['water-val']} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Leaf size={32} color="var(--emerald-green)" /> Day 45
              </div>
            </div>

          </div>
        </div>

        {/* 🌟 VIEW 2: SENSORS (Partial Lock Design) */}
        <div className={`${styles['app-view']} ${activeView === 'view-sensors' ? styles.active : ''}`}>
          <div style={{ maxWidth: '1000px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            <div className={styles.card}>
              <div className={styles['sensor-head']}>
                <div className={styles['sensor-title']}><div className={styles['sensor-icon']}><Cpu size={20} /></div> Sensor A</div>
                <div className={`${styles.badge} ${styles['badge-online']}`}><div className={styles.dot}></div> Online</div>
              </div>
              
              <div className={styles['readings-gridss']}>
                {/* UNLOCKED: Moisture */}
                <div className={styles['reading-samboxa']}>
                  <span className={styles.label} style={{ marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '6px' }}><Droplet size={14} /> Moisture</span>
                  <div className={styles['reading-value']}>42%</div>
                </div>

                {/* UNLOCKED: Temperature */}
                <div className={styles['reading-samboxa']}>
                  <span className={styles.label} style={{ marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '6px' }}><Thermometer size={14} /> Temp</span>
                  <div className={styles['reading-val']}>28°C</div>
                </div>

                {/* LOCKED: Humidity */}
                <div className={styles['reading-samboxa']} style={{ position: 'relative', overflow: 'hidden' }}>
                  <div style={{ filter: 'blur(5px)', opacity: 0.4, userSelect: 'none' }}>
                    <span className={styles.label} style={{ marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '6px' }}><Wind size={14} /> Humidity</span>
                    <div className={styles['reading-val']}>--%</div>
                  </div>
                  {/* Overlay Click Target */}
                  <div 
                    onClick={() => setModal({ isOpen: true, featureName: 'Advanced Telemetry' })}
                    style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'rgba(255,255,255,0.1)' }}
                  >
                    <div style={{ background: 'white', padding: '8px', borderRadius: '50%', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}><Lock size={18} color="var(--dark-evergreen)" /></div>
                  </div>
                </div>

                {/* LOCKED: Soil Status */}
                <div className={styles['reading-samboxa']} style={{ background: 'var(--mint-whisper)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ filter: 'blur(5px)', opacity: 0.4, userSelect: 'none' }}>
                    <span className={styles.label} style={{ marginBottom: '5px', color: 'var(--forest-teal)', display: 'flex', alignItems: 'center', gap: '6px' }}><Sprout size={14} /> Soil Status</span>
                    <div className={styles['reading-val']} style={{ color: 'var(--forest-teal)', display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle size={20} /> OK</div>
                  </div>
                  {/* Overlay Click Target */}
                  <div 
                    onClick={() => setModal({ isOpen: true, featureName: 'AI Soil Diagnostics' })}
                    style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'rgba(255,255,255,0.1)' }}
                  >
                    <div style={{ background: 'white', padding: '8px', borderRadius: '50%', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}><Lock size={18} color="var(--dark-evergreen)" /></div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles['sensor-head']} style={{ marginBottom: '10px' }}>
                <div className={styles['sensor-title']}>
                  <div className={styles['sensor-icon']} style={{ background: '#f3f4f6', color: 'var(--text-muted)' }}><Cpu size={20} /></div> Sensor B
                </div>
                <div className={`${styles.badge} ${styles['badge-offline']}`} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><WifiOff size={14} /> Offline</div>
              </div>
              <div className={styles['offline-text']} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={14} /> Last seen 3 hours ago</div>
            </div>

            <button className={styles['add-device']} onClick={() => setModal({ isOpen: true, featureName: 'Hardware Provisioning' })}>
              <div style={{ width: '60px', height: '60px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--forest-teal)', marginBottom: '15px', position: 'relative', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                <Plus size={28} />
                <div style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'var(--text-main)', color: 'white', padding: '4px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Lock size={10} />
                </div>
              </div>
              <h3 style={{ color: 'var(--dark-evergreen)', fontWeight: 900, fontSize: '1.2rem', marginBottom: '5px' }}>Add Device</h3>
              <p style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Pair a new sensor to start monitoring your farm</p>
            </button>
          </div>
        </div>

        {/* VIEW 3: MAIN PROFILE */}
        <div className={`${styles['app-view']} ${activeView === 'view-profile' ? styles.active : ''}`}>
          <div className={styles['profile-header-card']}>
            <div className={styles['big-icon']}><User size={40} /></div>
            <div>
              <h2 style={{ fontWeight: 900 }}>{username}</h2>
              <p style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{email}</p>
            </div>
          </div>

          <h3 className={styles['list-section-title']}>Account</h3>
          <div className={styles['settings-list']}>
            <div className={styles['settings-item']} onClick={() => setActiveView('view-edit-profile')}>
              <div className={styles['settings-item-left']}><User size={18} /> Manage Profile</div><div className={styles['settings-item-right']}><ChevronRight size={18} /></div>
            </div>
            <div className={styles['settings-item']} onClick={() => setActiveView('view-security')}>
              <div className={styles['settings-item-left']}><Lock size={18} /> Password & Security</div><div className={styles['settings-item-right']}><ChevronRight size={18} /></div>
            </div>
          </div>

          <h3 className={styles['list-section-title']}>Preferences</h3>
          <div className={styles['settings-list']}>
            {/* 🌟 NEW: About Us button now routes to the new page! */}
            <div className={styles['settings-item']} onClick={() => setActiveView('view-about')}>
              <div className={styles['settings-item-left']}><Info size={18} /> About us</div><div className={styles['settings-item-right']}><ChevronRight size={18} /></div>
            </div>
            <div className={styles['settings-item']} onClick={logout} style={{ color: '#ef4444', cursor: 'pointer' }}>
              <div className={styles['settings-item-left']} style={{ color: '#ef4444' }}><LogOut size={18} /> Logout</div>
            </div>
          </div>
        </div>

        {/* VIEW 4: MANAGE PROFILE */}
        <div className={`${styles['app-view']} ${activeView === 'view-edit-profile' ? styles.active : ''}`}>
          <form className={styles.card} style={{ maxWidth: '600px' }} onSubmit={handleProfileSubmit}>
            <h2 style={{ color: 'var(--dark-evergreen)', marginBottom: '10px' }}>Edit Details</h2>
            {profileMsg && <p style={{ marginBottom: '15px', color: 'var(--forest-teal)', fontWeight: 600 }}>{profileMsg}</p>}
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Username</label>
                <input 
                  type="text" 
                  value={editUsername} 
                  onChange={(e) => setEditUsername(e.target.value)}
                  style={{ padding: '12px', borderRadius: '10px', border: '1px solid var(--border-color)', outline: 'none' }} 
                  required
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Email</label>
                <input 
                  type="email" 
                  value={editEmail} 
                  onChange={(e) => setEditEmail(e.target.value)}
                  style={{ padding: '12px', borderRadius: '10px', border: '1px solid var(--border-color)', outline: 'none' }} 
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" className={styles['button-download']}>Save Changes</button>
                <button type="button" className={styles['button-download']} style={{ background: '#f3f4f6', color: 'var(--text-main)' }} onClick={() => { setActiveView('view-profile'); setProfileMsg(''); }}>Cancel</button>
              </div>
            </div>
          </form>
        </div>

        {/* VIEW 5: SECURITY */}
        <div className={`${styles['app-view']} ${activeView === 'view-security' ? styles.active : ''}`}>
          <form className={styles.card} style={{ maxWidth: '600px' }} onSubmit={handlePasswordSubmit}>
            <h2 style={{ color: 'var(--dark-evergreen)', marginBottom: '10px' }}>Change Password</h2>
            {securityMsg && <p style={{ marginBottom: '15px', color: 'var(--forest-teal)', fontWeight: 600 }}>{securityMsg}</p>}
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Current Password</label>
                <input 
                  type="password" 
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  placeholder="••••••••" 
                  style={{ padding: '12px', borderRadius: '10px', border: '1px solid var(--border-color)', outline: 'none' }} 
                  required
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.9rem' }}>New Password</label>
                <input 
                  type="password" 
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="••••••••" 
                  style={{ padding: '12px', borderRadius: '10px', border: '1px solid var(--border-color)', outline: 'none' }} 
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" className={styles['button-download']}>Update Password</button>
                <button type="button" className={styles['button-download']} style={{ background: '#f3f4f6', color: 'var(--text-main)' }} onClick={() => { setActiveView('view-profile'); setSecurityMsg(''); setCurrentPass(''); setNewPass(''); }}>Cancel</button>
              </div>
            </div>
          </form>
        </div>

        {/* 🌟 VIEW 6: ABOUT US PAGE */}
        <div className={`${styles['app-view']} ${activeView === 'view-about' ? styles.active : ''}`}>
          <div className={styles.card} style={{ maxWidth: '800px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <div style={{ width: '50px', height: '50px', background: 'var(--mint-whisper)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Leaf size={28} color="var(--forest-teal)" />
              </div>
              <h2 style={{ color: 'var(--dark-evergreen)', fontSize: '1.8rem', fontWeight: 900 }}>Enviro</h2>
            </div>
            
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '20px', fontSize: '1.05rem' }}>
              What started as a graduation project by a dedicated team of developers in Alexandria has evolved into a mission to modernize urban agriculture. We recognized a massive gap between everyday nature and modern technology, so we built Enviro to bridge that divide.
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '30px', fontSize: '1.05rem' }}>
              By combining industrial edge nodes with intelligent AI diagnostics, our platform transforms any balcony or rooftop into a self-sustaining micro-farm. We automate irrigation, conserve municipal water, and optimize crop health—bringing the cloud directly to the dirt.
            </p>
            
            <button className={styles['button-download']} style={{ background: '#f3f4f6', color: 'var(--text-main)', width: 'auto', padding: '12px 24px' }} onClick={() => setActiveView('view-profile')}>
              Back to Profile
            </button>
          </div>
        </div>

      </div>

      {/* MODAL */}
      <div className={`${styles['modal-overlay']} ${modal.isOpen ? styles.active : ''}`} onClick={(e) => { if(e.target.className.includes('modal-overlay')) setModal({ isOpen: false, featureName: '' })}}>
        <div className={styles['modal-content']}>
          <div className={styles['modal-icon']}><Lock size={32} /></div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--dark-evergreen)', margin: '0 0 10px 0' }}>Feature Locked</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px', lineHeight: 1.5 }}>
            <strong style={{ color: 'var(--dark-evergreen)' }}>{modal.featureName}</strong> requires direct hardware and native capabilities. Download the Android application to unlock the full Enviro ecosystem.
          </p>
          <button className={styles['button-download']} onClick={() => alert('Downloading Enviro.apk...')} style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
            <Smartphone size={18} /> Download App
          </button>
          <button className={styles['button-download']} onClick={() => setModal({ isOpen: false, featureName: '' })} style={{ background: '#f3f4f6', color: 'var(--text-main)', marginTop: '10px' }}>
            Cancel
          </button>
        </div>
      </div>

    </div>
  );
}