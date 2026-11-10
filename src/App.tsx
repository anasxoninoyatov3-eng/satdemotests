import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { ThemeProvider } from './context/ThemeContext';
import Login from './pages/Login';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Exam from './pages/Exam';
import Results from './pages/Results';
import { useFullscreen } from './hooks/useFullscreen';
import { motion, AnimatePresence } from 'framer-motion';
import { TestDef, ResultData } from './data/tests';

const App: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);
  const [isExamMode, setExamMode] = useState(false);
  const [isLocked, setLocked] = useState(false);
  const [activeTab, setActiveTab] = useState('testlar');
  const [results, setResults] = useState<ResultData[]>([]);
  const [currentTest, setCurrentTest] = useState<TestDef | null>(null);

  // Natijalar har bir foydalanuvchi uchun brauzerda saqlanadi
  useEffect(() => {
    if (!user) { setResults([]); return; }
    try { setResults(JSON.parse(localStorage.getItem(`results:${user}`) || '[]')); } catch { setResults([]); }
  }, [user]);

  const handleViolation = () => {
    if (isExamMode) {
      setLocked(true);
      setExamMode(false);
    }
  };

  const { requestFullscreen, exitFullscreen } = useFullscreen(handleViolation);

  const startExam = async (test: TestDef) => {
    setCurrentTest(test);
    await requestFullscreen();
    setExamMode(true);
  };

  const completeExam = (r: Omit<ResultData, 'date'>) => {
    const newResult: ResultData = {
      ...r,
      date: new Date().toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long', year: 'numeric' })
    };
    setResults(prev => {
      const next = [...prev, newResult];
      if (user) localStorage.setItem(`results:${user}`, JSON.stringify(next));
      return next;
    });
    setExamMode(false);
    setActiveTab('darajam');
    exitFullscreen();
  };

  if (isLocked) {
    return (
      <div className="fixed inset-0 z-[9999] bg-red-950 flex items-center justify-center p-6 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent pointer-events-none" />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-2xl relative"
        >
          <div className="text-red-500 mb-8 flex justify-center animate-bounce">
            <FontAwesomeIcon icon={faCircleXmark} className="w-24 h-24" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-red-500 font-montserrat mb-6 tracking-tighter">
            TIZIM BLOKLANDI!
          </h1>
          <p className="text-xl md:text-2xl text-red-200 font-semibold mb-8 leading-relaxed">
            Siz SATTests.uz to‘liq ekran rejimidan chiqdingiz yoki boshqa oynaga o‘tdingiz. Imtihon natijangiz bekor qilindi.
          </p>
          <div className="h-px bg-red-800 w-32 mx-auto mb-8" />
          <p className="text-red-400 text-sm font-bold uppercase tracking-widest">
            XATO KODI: SAT-FULLSCREEN-VIOLATION
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-12 bg-red-600 hover:bg-red-500 text-white px-10 py-4 rounded-2xl font-bold transition-all active:scale-95 shadow-xl shadow-red-900/40"
          >
            Qaytadan urinish
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        {!user ? (
          <Login key="login" onLogin={(name) => setUser(name)} />
        ) : isExamMode && currentTest ? (
          <Exam 
            key="exam" 
            test={currentTest}
            onViolation={handleViolation}
            onComplete={completeExam} 
          />
        ) : (
          <MainLayout 
            key="layout" 
            user={user} 
            onLogout={() => setUser(null)}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          >
            {activeTab === 'testlar' && <Dashboard onStartExam={startExam} results={results} />}
            {activeTab === 'darajam' && <Results results={results} onRestart={() => setActiveTab('testlar')} />}
            {activeTab === 'profile' && (
              <div className="bg-white dark:bg-panel-dark p-8 rounded-[32px] border border-slate-200 dark:border-slate-800 text-center">
                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-500 mx-auto mb-4">
                  <span className="text-3xl font-bold">{user.charAt(0)}</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-montserrat">{user}</h2>
                <p className="text-slate-500">O'quvchi profili</p>
              </div>
            )}
          </MainLayout>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default App;
