import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward, faClock, faBullseye, faCircleCheck, faRotateLeft, faCircleXmark, faMinus } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { ResultData } from '../data/tests';

interface ResultsProps {
  results: ResultData[];
  onRestart?: () => void;
}

const Results: React.FC<ResultsProps> = ({ results, onRestart }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [onlyWrong, setOnlyWrong] = useState(false);

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 opacity-40">
        <FontAwesomeIcon icon={faAward} className="w-16 h-16 text-slate-300 mb-6" />
        <p className="text-xl font-bold text-slate-500 dark:text-slate-400">Hozircha natijalar mavjud emas</p>
        <p className="text-sm mt-2">Imtihon topshirganingizdan so'ng natijalaringiz shu yerda paydo bo'ladi.</p>
      </div>
    );
  }

  const selIdx = selected !== null && selected < results.length ? selected : results.length - 1;
  const latest = results[selIdx];
  const fmtKey = (k: string) => k.split('|').join(' yoki ');

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

      {/* Modullar bo'yicha natija */}
      {latest.modules && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {latest.modules.map((m, i) => (
            <div key={i} className="bg-white dark:bg-panel-dark p-5 rounded-[24px] border border-slate-200 dark:border-slate-800 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">{m.name}</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white font-montserrat">
                {m.correct} <span className="text-sm text-slate-400">/ {m.total}</span>
              </p>
              <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-brand" style={{ width: `${(m.correct / m.total) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Savollar tahlili */}
      {latest.review && latest.modules && (
        <div className="bg-white dark:bg-panel-dark rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center gap-4">
            <h3 className="font-bold text-slate-900 dark:text-white font-montserrat">Javoblar tahlili — {latest.title}</h3>
            <button onClick={() => setOnlyWrong(v => !v)}
              className={`text-xs font-bold px-4 py-2 rounded-xl border transition-all ${onlyWrong ? 'bg-brand text-white border-brand' : 'border-slate-200 dark:border-slate-700 text-slate-500'}`}>
              Faqat xatolar
            </button>
          </div>
          <div className="p-6 space-y-8">
            {latest.modules.map((mod, mi) => {
              const items = latest.review!.filter(r => r.m === mi);
              const shown = onlyWrong ? items.filter(r => !r.ok) : items;
              return (
                <div key={mi}>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
                    {mod.name} · {mod.correct} / {mod.total}
                  </h4>
                  <div className="space-y-2">
                    {shown.length === 0 && <p className="text-sm text-emerald-500 font-semibold">Xato yo'q 🎉</p>}
                    {shown.map(r => (
                      <div key={r.n} className={`flex items-center gap-4 p-3 rounded-xl border text-sm ${
                        r.ok ? 'border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-900/10'
                             : r.given ? 'border-red-200 dark:border-red-900/40 bg-red-50/50 dark:bg-red-900/10'
                                       : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30'}`}>
                        <span className="w-8 text-center font-black text-slate-500">{r.n}</span>
                        <FontAwesomeIcon
                          icon={r.ok ? faCircleCheck : r.given ? faCircleXmark : faMinus}
                          className={`w-4 h-4 ${r.ok ? 'text-emerald-500' : r.given ? 'text-red-500' : 'text-slate-400'}`} />
                        <span className="text-slate-600 dark:text-slate-300">
                          Sizning javobingiz: <b>{r.given ?? 'javob berilmagan'}</b>
                        </span>
                        {!r.ok && (
                          <span className="ml-auto text-slate-600 dark:text-slate-300">
                            To'g'ri javob: <b className="text-emerald-600 dark:text-emerald-400">{r.key ? fmtKey(r.key) : '—'}</b>
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

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
          {results.map((res, i) => ({ res, i })).reverse().map(({ res, i }) => (
            <div key={i} onClick={() => setSelected(i)}
              className={`p-6 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors ${i === selIdx ? 'bg-brand/5' : ''}`}>
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
