import React, { useState } from 'react';
// 👇 Matches your exact file name now!
import styles from '../styles/userdashboard.module.css'; 

import { 
  LayoutDashboard, Cpu, Scan, Lock, ShoppingBag, Smartphone, 
  User, ShieldCheck, CloudSun, Trophy, Droplet, Wind, 
  Thermometer, Sprout, CheckCircle, WifiOff, Clock, Plus, 
  ChevronRight, Info, Monitor 
} from 'lucide-react';

export default function Dashboard() {
  // Grabs the real data from localStorage. 
  // If it's empty, it defaults to your actual name!
  const username = localStorage.getItem('username') || 'Omar'; 
  const fullName = localStorage.getItem('name') || 'Omar Sherif Abd El-Hamid';

  const [activeView, setActiveView] = useState('view-home');
  const [modal, setModal] = useState({ isOpen: false, featureName: '' });

  const getHeaderInfo = () => {
    switch (activeView) {
      case 'view-home': return { title: 'Farm Overview', subtitle: `Read-only web access. Connected to ${username}'s node.` };
      case 'view-sensors': return { title: 'Sensors', subtitle: 'Monitor your farm devices securely.' };
      case 'view-profile': return { title: 'Profile', subtitle: 'Manage your account settings.' };
      case 'view-edit-profile': return { title: 'Manage Profile', subtitle: 'Update your personal details.' };
      case 'view-security': return { title: 'Security', subtitle: 'Update your password.' };
      default: return { title: '', subtitle: '' };
    }
  };

  const { title, subtitle } = getHeaderInfo();

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: 'var(--bg-body)', color: 'var(--text-main)', width: '100%' }}>
      
      {/* --- SIDEBAR --- */}
      <nav className={styles.sidebar}>
        <div className={styles.name}>
          <img src="/assets/leaf.png" alt="Enviro Logo" className={styles['brand-logo']} /> enviro.
        </div>

        <div className={styles.navigation}>
          <button 
            className={`${styles['navigation-item']} ${activeView === 'view-home' ? styles.active : ''}`} 
            onClick={() => setActiveView('view-home')}
          >
            <div className={styles['nav-left']}><LayoutDashboard size={20} /> Home</div>
          </button>
          
          <button 
            className={`${styles['navigation-item']} ${activeView === 'view-sensors' ? styles.active : ''}`} 
            onClick={() => setActiveView('view-sensors')}
          >
            <div className={styles['nav-left']}><Cpu size={20} /> Sensors</div>
          </button>
          
          <button className={`${styles['navigation-item']} ${styles.noaccess}`} onClick={() => setModal({ isOpen: true, featureName: 'AI Disease Scanning' })}>
            <div className={styles['nav-left']}><Scan size={20} /> Scan</div>
            <Lock size={14} />
          </button>
          
          <button className={`${styles['navigation-item']} ${styles.noaccess}`} onClick={() => setModal({ isOpen: true, featureName: 'Supply Shop' })}>
            <div className={styles['nav-left']}><ShoppingBag size={20} /> Shop</div>
            <Lock size={14} />
          </button>
        </div>

        <div className={styles['sidebar-download']}>
          <Smartphone size={32} color="var(--emerald-green)" style={{ margin: '0 auto' }} />
          <p>Get the full hardware experience.</p>
          <button className={styles['button-download']} onClick={() => setModal({ isOpen: true, featureName: 'Full Platform Access' })}>Get App</button>
        </div>
      </nav>

      {/* --- MAIN CONTAINER --- */}
      <div className={styles.container}>
        <header>
          <div className={styles.headertext}>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          <button className={styles.myprof} onClick={() => setActiveView('view-profile')}>
            <div className={styles['myprof-icon']}><User size={24} /></div>
          </button>
        </header>

        {/* --- VIEW 1: HOME --- */}
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

            <div className={styles.card}>
              <span className={styles.label}>Water Saved</span>
              <div className={styles['water-val']}>120 L</div>
              <div style={{ color: 'var(--forest-teal)', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Trophy size={18} color="#f59e0b" /> Gold Saver Level
              </div>
            </div>

            <div className={styles.card}>
              <span className={styles.label}>Crop Status</span>
              <div className={styles['water-val']}>Day 45</div>
              <div style={{ width: '100%', height: '8px', background: 'var(--border-color)', borderRadius: '4px', marginTop: '15px', overflow: 'hidden' }}>
                <div style={{ width: '65%', height: '100%', background: 'var(--emerald-green)' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* --- VIEW 2: SENSORS --- */}
        <div className={`${styles['app-view']} ${activeView === 'view-sensors' ? styles.active : ''}`}>
          <div style={{ maxWidth: '1000px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            <div className={styles.card}>
              <div className={styles['sensor-head']}>
                <div className={styles['sensor-title']}>
                  <div className={styles['sensor-icon']}><Cpu size={20} /></div> Sensor A
                </div>
                <div className={`${styles.badge} ${styles['badge-online']}`}><div className={styles.dot}></div> Online</div>
              </div>
              <div className={styles['readings-gridss']}>
                <div className={styles['reading-samboxa']}>
                  <span className={styles.label} style={{ marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '6px' }}><Droplet size={14} /> Moisture</span>
                  <div className={styles['reading-value']}>42%</div>
                </div>
                <div className={styles['reading-samboxa']}>
                  <span className={styles.label} style={{ marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '6px' }}><Wind size={14} /> Humidity</span>
                  <div className={styles['reading-val']}>65%</div>
                </div>
                <div className={styles['reading-samboxa']}>
                  <span className={styles.label} style={{ marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '6px' }}><Thermometer size={14} /> Temp</span>
                  <div className={styles['reading-val']}>28°C</div>
                </div>
                <div className={styles['reading-samboxa']} style={{ background: 'var(--mint-whisper)' }}>
                  <span className={styles.label} style={{ marginBottom: '5px', color: 'var(--forest-teal)', display: 'flex', alignItems: 'center', gap: '6px' }}><Sprout size={14} /> Soil Status</span>
                  <div className={styles['reading-val']} style={{ color: 'var(--forest-teal)', display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle size={20} /> OK</div>
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

        {/* --- VIEW 3: MAIN PROFILE --- */}
        <div className={`${styles['app-view']} ${activeView === 'view-profile' ? styles.active : ''}`}>
          <div className={styles['profile-header-card']}>
            <div className={styles['big-icon']}><User size={40} /></div>
            <div>
              {/* Correct Full Name rendered here */}
              <h2 style={{ fontWeight: 900 }}>{fullName}</h2>
              <p style={{ color: 'var(--text-muted)', fontWeight: 500 }}>@{username}</p>
            </div>
          </div>

          <h3 className={styles['list-section-title']}>Account</h3>
          <div className={styles['settings-list']}>
            {/* Clickable Profile Settings */}
            <div className={styles['settings-item']} onClick={() => setActiveView('view-edit-profile')}>
              <div className={styles['settings-item-left']}><User size={18} /> Manage Profile</div>
              <div className={styles['settings-item-right']}><ChevronRight size={18} /></div>
            </div>
            
            <div className={styles['settings-item']} onClick={() => setActiveView('view-security')}>
              <div className={styles['settings-item-left']}><Lock size={18} /> Password & Security</div>
              <div className={styles['settings-item-right']}><ChevronRight size={18} /></div>
            </div>
          </div>

          <h3 className={styles['list-section-title']}>Preferences</h3>
          <div className={styles['settings-list']}>
            <div className={styles['settings-item']}><div className={styles['settings-item-left']}><Info size={18} /> About us</div><div className={styles['settings-item-right']}><ChevronRight size={18} /></div></div>
            <div className={styles['settings-item']}><div className={styles['settings-item-left']}><Monitor size={18} /> Theme</div><div className={styles['settings-item-right']}>Light <ChevronRight size={18} /></div></div>
          </div>
        </div>

        {/* --- VIEW 4: MANAGE PROFILE (NEW!) --- */}
        <div className={`${styles['app-view']} ${activeView === 'view-edit-profile' ? styles.active : ''}`}>
          <div className={styles.card} style={{ maxWidth: '600px' }}>
            <h2 style={{ color: 'var(--dark-evergreen)', marginBottom: '24px' }}>Edit Details</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Full Name</label>
                <input type="text" defaultValue={fullName} style={{ padding: '12px', borderRadius: '10px', border: '1px solid var(--border-color)', outline: 'none' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Username</label>
                <input type="text" defaultValue={username} style={{ padding: '12px', borderRadius: '10px', border: '1px solid var(--border-color)', outline: 'none' }} />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button className={styles['button-download']} onClick={() => { alert('Profile updated!'); setActiveView('view-profile'); }}>Save Changes</button>
                <button className={styles['button-download']} style={{ background: '#f3f4f6', color: 'var(--text-main)' }} onClick={() => setActiveView('view-profile')}>Cancel</button>
              </div>
            </div>
          </div>
        </div>

        {/* --- VIEW 5: SECURITY (NEW!) --- */}
        <div className={`${styles['app-view']} ${activeView === 'view-security' ? styles.active : ''}`}>
          <div className={styles.card} style={{ maxWidth: '600px' }}>
            <h2 style={{ color: 'var(--dark-evergreen)', marginBottom: '24px' }}>Change Password</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Current Password</label>
                <input type="password" placeholder="••••••••" style={{ padding: '12px', borderRadius: '10px', border: '1px solid var(--border-color)', outline: 'none' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.9rem' }}>New Password</label>
                <input type="password" placeholder="••••••••" style={{ padding: '12px', borderRadius: '10px', border: '1px solid var(--border-color)', outline: 'none' }} />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button className={styles['button-download']} onClick={() => { alert('Password secured! 🔒'); setActiveView('view-profile'); }}>Update Password</button>
                <button className={styles['button-download']} style={{ background: '#f3f4f6', color: 'var(--text-main)' }} onClick={() => setActiveView('view-profile')}>Cancel</button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* --- MODAL (THE TRAP) --- */}
      <div className={`${styles['modal-overlay']} ${modal.isOpen ? styles.active : ''}`} onClick={(e) => { if(e.target.className.includes('modal-overlay')) setModal({ isOpen: false, featureName: '' })}}>
        <div className={styles['modal-content']}>
          <div className={styles['modal-icon']}><Lock size={32} /></div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--dark-evergreen)', marginBottom: '10px' }}>Feature Locked</h2>
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