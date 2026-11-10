import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward, faClock, faBullseye, faCircleCheck, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { ResultData } from '../data/tests';

interface ResultsProps {
  results: ResultData[];
  onRestart?: () => void;
}

const Results: React.FC<ResultsProps> = ({ results, onRestart }) => {
  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 opacity-40">
        <FontAwesomeIcon icon={faAward} className="w-16 h-16 text-slate-300 mb-6" />
        <p className="text-xl font-bold text-slate-500 dark:text-slate-400">Hozircha natijalar mavjud emas</p>
        <p className="text-sm mt-2">Imtihon topshirganingizdan so'ng natijalaringiz shu yerda paydo bo'ladi.</p>
      </div>
    );
  }

  const latest = results[results.length - 1];

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="space-y-8">
      {/* Score Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-panel-dark p-8 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm text-center md:col-span-1"
        >
          <div className="w-20 h-20 bg-brand/10 rounded-full flex items-center justify-center text-brand mx-auto mb-6">
            <FontAwesomeIcon icon={faAward} className="w-10 h-10" />
          </div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Umumiy Ball</p>
          <h2 className="text-6xl font-black text-slate-900 dark:text-white font-montserrat mb-2">
            {latest.score}
          </h2>
          <p className="text-sm font-bold text-slate-500">/ 1600 BALL</p>
          <p className="text-xs text-slate-400 mt-3">R&W: {latest.rwScore} · Math: {latest.mathScore}</p>
        </motion.div>

        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-panel-dark p-8 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-6">
            <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center">
              <FontAwesomeIcon icon={faBullseye} className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Aniqlik</p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white font-montserrat">
                {Math.round((latest.correct / latest.total) * 100)}%
              </h3>
            </div>
          </div>

          <div className="bg-white dark:bg-panel-dark p-8 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-6">
            <div className="w-14 h-14 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center">
              <FontAwesomeIcon icon={faClock} className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Sarflangan vaqt</p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white font-montserrat">
                {formatTime(latest.timeSpent)}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* History List */}
      <div className="bg-white dark:bg-panel-dark rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <h3 className="font-bold text-slate-900 dark:text-white font-montserrat">Yechilgan testlar natijalari</h3>
          {onRestart && (
            <button 
              onClick={onRestart}
              className="text-xs font-bold text-brand hover:text-brand-dark flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faRotateLeft} className="w-3.5 h-3.5" /> Testlarga o'tish
            </button>
          )}
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {results.slice().reverse().map((res, i) => (
            <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400">
                  <FontAwesomeIcon icon={faCircleCheck} className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{res.title}</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{res.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-black text-slate-900 dark:text-white font-montserrat">{res.score}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{res.correct} / {res.total} to'g'ri</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Results;
