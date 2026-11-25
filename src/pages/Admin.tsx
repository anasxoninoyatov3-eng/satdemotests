import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faDownload, faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { TESTS, countOf } from '../data/tests';
import { STUDENTS } from '../data/users';
import { TestConfig, fetchRemoteConfig, loadDraft, saveDraft, isEnabled } from '../data/testConfig';

const Admin: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [cfg, setCfg] = useState<TestConfig>({});
  const [ready, setReady] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    fetchRemoteConfig().then(remote => { setCfg(loadDraft() ?? remote); setReady(true); });
  }, []);

  const toggle = (id: string) => {
    const next = { ...cfg, [id]: !isEnabled(cfg, id) };
    setCfg(next); saveDraft(next); setDirty(true);
  };

  const download = () => {
    const full: TestConfig = {};
    TESTS.forEach(t => { full[t.id] = isEnabled(cfg, t.id); });
    const blob = new Blob([JSON.stringify(full, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'tests-config.json'; a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between bg-white dark:bg-panel-dark p-5 rounded-[24px] border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-brand rounded-xl flex items-center justify-center text-white">
              <FontAwesomeIcon icon={faShieldHalved} className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-montserrat font-black text-slate-900 dark:text-white">Admin panel</h1>
              <p className="text-xs text-slate-400">{STUDENTS.length} ta o'quvchi akkaunti · {TESTS.length} ta test</p>
            </div>
          </div>
          <button onClick={onLogout} className="flex items-center gap-2 px-4 py-2 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 font-semibold text-sm">
            <FontAwesomeIcon icon={faRightFromBracket} className="w-4 h-4" /> Chiqish
          </button>
        </div>

        <div className="bg-white dark:bg-panel-dark rounded-[24px] border border-slate-200 dark:border-slate-800 p-6">
          <h2 className="font-bold text-slate-900 dark:text-white font-montserrat mb-4">Testlar</h2>
          {!ready && <p className="text-slate-400 text-sm">Yuklanmoqda…</p>}
          <div className="space-y-3">
            {TESTS.map(t => {
              const on = isEnabled(cfg, t.id);
              return (
                <div key={t.id} className="flex items-center justify-between gap-4 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">{t.title}</p>
                    <p className="text-xs text-slate-400">{countOf(t)} savol · ID: {t.id}</p>
                  </div>
                  <button onClick={() => toggle(t.id)} role="switch" aria-checked={on}
                    className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${on ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                    {on ? 'Yoqilgan' : "O'chirilgan"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white dark:bg-panel-dark rounded-[24px] border border-slate-200 dark:border-slate-800 p-6">
          <h2 className="font-bold text-slate-900 dark:text-white font-montserrat mb-2">O'zgarishlarni o'quvchilarga chiqarish</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Saytda server yo'q, shuning uchun o'quvchilar sozlamani <code>public/tests-config.json</code> faylidan o'qiydi.
            Faylni yuklab oling, shu papkadagi eski fayl o'rniga qo'ying va saytni qayta deploy qiling.
          </p>
          <button onClick={download} className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-white bg-slate-900 dark:bg-brand active:scale-95 transition-all">
            <FontAwesomeIcon icon={faDownload} className="w-4 h-4" /> tests-config.json yuklab olish
          </button>
          {dirty && <p className="text-xs text-amber-500 mt-3">Yuklab olinmagan o'zgarishlar bor.</p>}
        </div>
      </div>
    </div>
  );
};
export default Admin;
