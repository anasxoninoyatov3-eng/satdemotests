import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableCellsLarge, faFileLines, faClock, faPlay, faCircle, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { TESTS, TestDef, ResultData, countOf, TOTAL_MINUTES, hasKey } from '../data/tests';

interface DashboardProps {
  onStartExam: (test: TestDef) => void;
  results: ResultData[];
}

const Dashboard: React.FC<DashboardProps> = ({ onStartExam, results }) => {
  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-panel-dark border border-slate-200 dark:border-slate-800 rounded-[32px] p-8 shadow-sm flex items-center gap-6">
        <div className="w-14 h-14 bg-slate-900 dark:bg-brand rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-brand/20">
          <FontAwesomeIcon icon={faTableCellsLarge} className="w-7 h-7" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-montserrat">Student dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Testni tanlang va boshlang. Natijalar "Darajam" bo'limida.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-panel-dark border border-slate-200 dark:border-slate-800 rounded-[32px] p-6 shadow-sm">
        <h2 className="font-bold text-slate-900 dark:text-white font-montserrat mb-4 px-2">Faol testlar</h2>
        <div className="space-y-4">
          {TESTS.map((t, i) => {
            const done = results.filter(r => r.testId === t.id);
            const best = done.length ? Math.max(...done.map(r => r.score)) : null;
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="group border border-slate-100 dark:border-slate-800/50 hover:border-brand/30 rounded-3xl p-6 transition-all hover:bg-slate-50 dark:hover:bg-slate-900/40 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-brand/10 rounded-2xl flex items-center justify-center text-brand shrink-0">
                    <FontAwesomeIcon icon={done.length ? faCircleCheck : faFileLines} className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1 group-hover:text-brand transition-colors">
                      {t.title} {best !== null && <span className="ml-2 text-xs text-emerald-500">Eng yaxshi: {best}</span>}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      <span className="flex items-center gap-1.5"><FontAwesomeIcon icon={faClock} className="w-3.5 h-3.5" /> {TOTAL_MINUTES} daqiqa + 10 daq. tanaffus</span>
                      <span className="flex items-center gap-1.5"><FontAwesomeIcon icon={faCircle} className="w-1.5 h-1.5" /> {countOf(t)} savol</span>
                      {!hasKey(t) && <span className="text-amber-500">Javob kaliti kiritilmagan</span>}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => onStartExam(t)}
                  className="bg-slate-900 dark:bg-brand hover:bg-slate-800 dark:hover:bg-brand-dark text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-brand/10 active:scale-95 transition-all shrink-0"
                >
                  {done.length ? 'Qayta' : 'Boshlash'} <FontAwesomeIcon icon={faPlay} className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
