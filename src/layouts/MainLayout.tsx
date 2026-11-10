import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileLines,
  faArrowTrendUp,
  faUser,
  faBars,
  faXmark,
  faSun,
  faMoon,
  faRightFromBracket
} from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

interface MainLayoutProps {
  children: React.ReactNode;
  user: string;
  onLogout: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, user, onLogout, activeTab, setActiveTab }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { id: 'testlar', label: 'Testlar', icon: faFileLines },
    { id: 'darajam', label: 'Darajam', icon: faArrowTrendUp },
    { id: 'profile', label: 'Profile', icon: faUser },
  ];

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-72' : 'w-20'
        } transition-all duration-300 bg-white dark:bg-panel-dark border-r border-slate-200 dark:border-slate-800 flex flex-col z-30`}
      >
        <div className="p-6 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800/50">
          <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center text-white shrink-0">
            <span className="font-montserrat font-black text-xl">S</span>
          </div>
          {isSidebarOpen && (
            <div className="overflow-hidden whitespace-nowrap">
              <h2 className="text-[10px] font-bold uppercase tracking-tighter leading-tight text-slate-400">
                Agentligi
              </h2>
              <h1 className="text-xs font-black font-montserrat text-slate-900 dark:text-white leading-tight">
                SATTests.uz
              </h1>
            </div>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 p-3.5 rounded-2xl transition-all group ${
                activeTab === item.id 
                  ? 'bg-slate-900 dark:bg-brand text-white shadow-lg' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <FontAwesomeIcon icon={item.icon} className={`w-[22px] h-[22px] ${activeTab === item.id ? 'text-white' : 'group-hover:text-brand transition-colors'}`} />
              {isSidebarOpen && (
                <span className="font-semibold text-sm">{item.label}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 space-y-2">
          <button 
            onClick={toggleTheme}
            className="w-full flex items-center gap-4 p-3.5 rounded-2xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all"
          >
            {theme === 'light' ? <FontAwesomeIcon icon={faMoon} className="w-[22px] h-[22px]" /> : <FontAwesomeIcon icon={faSun} className="w-[22px] h-[22px]" />}
            {isSidebarOpen && <span className="font-semibold text-sm">{theme === 'light' ? 'Tungi rejim' : 'Kunduzgi rejim'}</span>}
          </button>
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-4 p-3.5 rounded-2xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all"
          >
            <FontAwesomeIcon icon={faRightFromBracket} className="w-[22px] h-[22px]" />
            {isSidebarOpen && <span className="font-semibold text-sm">Chiqish</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-20 bg-white/80 dark:bg-panel-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-8 flex items-center justify-between z-20">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500"
            >
              {isSidebarOpen ? <FontAwesomeIcon icon={faXmark} className="w-5 h-5" /> : <FontAwesomeIcon icon={faBars} className="w-5 h-5" />}
            </button>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-montserrat capitalize">
              {menuItems.find(i => i.id === activeTab)?.label || 'Bosh sahifa'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900 dark:text-white">{user}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">O'quvchi</p>
            </div>
            <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-500 border border-slate-200 dark:border-slate-700">
              <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-8 relative">
           <div className="grid-overlay absolute inset-0 pointer-events-none opacity-40" />
           <div className="relative z-10 max-w-6xl mx-auto">
             {children}
           </div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
