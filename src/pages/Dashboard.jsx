import React, { useState } from 'react';
import styles from '../styles/userdashboard.module.css'; 
import { updateProfile, updatePassword } from '../api/auth'; 

// 🌟 Import your new hook!
import { useAuth } from '../hooks/useAuth';

import { 
  LayoutDashboard, Cpu, Scan, Lock, ShoppingBag, Smartphone, 
  User, ShieldCheck, CloudSun, Trophy, Droplet, Wind, 
  Thermometer, Sprout, CheckCircle, WifiOff, Clock, Plus, 
  ChevronRight, Info, Monitor, LogOut
} from 'lucide-react';

export default function Dashboard() {
  // 🌟 One line grabs everything safely!
  const { token, email, username, fullName, logout } = useAuth();

  const [activeView, setActiveView] = useState('view-home');
  const [modal, setModal] = useState({ isOpen: false, featureName: '' });

  // 🌟 Using the hook variables to set the initial form state
  const [editUsername, setEditUsername] = useState(username);
  const [editEmail, setEditEmail] = useState(email);
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [profileMsg, setProfileMsg] = useState(''); 
  const [securityMsg, setSecurityMsg] = useState(''); 

  const getHeaderInfo = () => {
    switch (activeView) {
      // 🌟 Fixed the variable name here!
      case 'view-home': return { title: 'Farm Overview', subtitle: `Read-only web access. Connected to ${username}'s node.` };
      case 'view-sensors': return { title: 'Sensors', subtitle: 'Monitor your farm devices securely.' };
      case 'view-profile': return { title: 'Profile', subtitle: 'Manage your account settings.' };
      case 'view-edit-profile': return { title: 'Manage Profile', subtitle: 'Update your personal details.' };
      case 'view-security': return { title: 'Security', subtitle: 'Update your password.' };
      default: return { title: '', subtitle: '' };
    }
  };

  const { title, subtitle } = getHeaderInfo();
//assuming 7oda will add change and forget pass in the backend
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileMsg("Saving...");
    try {
      await updateProfile(token, editUsername, editEmail);
      
      localStorage.setItem('username', editUsername);
      localStorage.setItem('email', editEmail);
      
      setProfileMsg("Profile updated successfully! ");
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
      setSecurityMsg("Password secured! ");
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
          <button className={`${styles['navigation-item']} ${styles.noaccess}`} onClick={() => setModal({ isOpen: true, featureName: 'Shop' })}>
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
                  <p style={{ color: 'var(--text-muted)', fontWeight: 500, marginTop: '5px' }}>Alexandria</p>
                </div>
                <div className={styles.temp}>
                  <CloudSun size={40} color="#f59e0b" style={{ marginBottom: '10px' }} />
                  <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--dark-evergreen)' }}>19°C</h2>
                  <p style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Clear Sky</p>
                </div>
              </div>
            </div>
            <div className={styles.card}><span className={styles.label}>Water Saved</span><div className={styles['water-val']}>120 L</div></div>
            <div className={styles.card}><span className={styles.label}>Crop Status</span><div className={styles['water-val']}>Day 45</div></div>
          </div>
        </div>

        {/* VIEW 2: SENSORS */}
        <div className={`${styles['app-view']} ${activeView === 'view-sensors' ? styles.active : ''}`}>
          <div style={{ maxWidth: '1000px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className={styles.card}>
              <div className={styles['sensor-head']}>
                <div className={styles['sensor-title']}><div className={styles['sensor-icon']}><Cpu size={20} /></div> Sensor A</div>
                <div className={`${styles.badge} ${styles['badge-online']}`}><div className={styles.dot}></div> Online</div>
              </div>
            </div>
          </div>
        </div>

        {/* VIEW 3: MAIN PROFILE */}
        <div className={`${styles['app-view']} ${activeView === 'view-profile' ? styles.active : ''}`}>
          <div className={styles['profile-header-card']}>
            <div className={styles['big-icon']}><User size={40} /></div>
            <div>
              <h2 style={{ fontWeight: 900 }}>{editUsername}</h2>
              <p style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{editEmail}</p>
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
            <div className={styles['settings-item']}><div className={styles['settings-item-left']}><Info size={18} /> About us</div><div className={styles['settings-item-right']}><ChevronRight size={18} /></div></div>
            {/* 🌟 Hook's logout function wired directly here */}
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