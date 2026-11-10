import React, { useState, useEffect, useRef, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faShieldHalved, faChevronRight, faMugHot } from '@fortawesome/free-solid-svg-icons';
import { MODULES, BREAK_MINUTES, TestDef, ResultData, isCorrect } from '../data/tests';

interface ExamProps {
  test: TestDef;
  onComplete: (r: Omit<ResultData, 'date'>) => void;
  onViolation: () => void;
}

type Step = { kind: 'module'; m: number } | { kind: 'break' };
const STEPS: Step[] = [
  { kind: 'module', m: 0 },
  { kind: 'module', m: 1 },
  { kind: 'break' },
  { kind: 'module', m: 2 },
  { kind: 'module', m: 3 },
];
const LETTERS = ['A', 'B', 'C', 'D'];

const fmt = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;
const duration = (st: Step) => (st.kind === 'break' ? BREAK_MINUTES : MODULES[st.m].minutes) * 60;

// ‹...› orasidagi matn PDF'da tagiga chizilgan edi
const withUnderline = (s: string) =>
  s.split(/(‹[^›]*›)/).map((p, i) =>
    p.startsWith('‹') ? <u key={i} className="decoration-2 underline-offset-4">{p.slice(1, -1)}</u> : <React.Fragment key={i}>{p}</React.Fragment>
  );

const Exam: React.FC<ExamProps> = ({ test, onComplete }) => {
  const mods = test.modules;
  // offsets[m] — m-modul 1-savolining umumiy indeksi
  const offsets = useMemo(() => {
    const o: number[] = [];
    mods.reduce((s, m) => { o.push(s); return s + m.length; }, 0);
    return o;
  }, [mods]);
  const total = useMemo(() => mods.reduce((s, m) => s + m.length, 0), [mods]);

  const [step, setStep] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState<(string | null)[]>(() => Array(total).fill(null));
  const [timeLeft, setTimeLeft] = useState(duration(STEPS[0]));
  const startTime = useRef(Date.now());
  const answersRef = useRef(answers);
  const finished = useRef(false);
  answersRef.current = answers;

  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    let rw = 0, math = 0, rwN = 0, mathN = 0;
    mods.forEach((qs, mi) => {
      const subj = MODULES[mi].subject;
      if (subj === 'rw') rwN += qs.length; else mathN += qs.length;
      qs.forEach((q, j) => {
        if (isCorrect(answersRef.current[offsets[mi] + j], q.answer)) {
          if (subj === 'rw') rw++; else math++;
        }
      });
    });
    const section = (c: number, n: number) => 200 + Math.round((c / n) * 600 / 10) * 10;
    const rwScore = section(rw, rwN);
    const mathScore = section(math, mathN);
    onComplete({
      testId: test.id, title: test.title,
      score: rwScore + mathScore, rwScore, mathScore,
      correct: rw + math, total,
      timeSpent: Math.floor((Date.now() - startTime.current) / 1000),
    });
  };

  const advance = () => {
    if (step >= STEPS.length - 1) finish();
    else setStep(step + 1);
  };
  const advanceRef = useRef(advance);
  advanceRef.current = advance;

  useEffect(() => {
    const secs = duration(STEPS[step]);
    const deadline = Date.now() + secs * 1000;
    setTimeLeft(secs);
    setQIdx(0); // yangi modulda 1-savoldan boshlanadi
    const id = setInterval(() => {
      const left = Math.max(0, Math.round((deadline - Date.now()) / 1000));
      setTimeLeft(left);
      if (left <= 0) { clearInterval(id); advanceRef.current(); }
    }, 500);
    return () => clearInterval(id);
  }, [step]);

  const cur = STEPS[step];
  const isLastStep = step === STEPS.length - 1;

  const Header = (
    <div className="max-w-6xl mx-auto w-full flex items-center justify-between mb-4 bg-white dark:bg-panel-dark p-4 rounded-[24px] border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center text-white font-montserrat font-black text-xl">S</div>
        <div className="hidden sm:block">
          <h1 className="font-montserrat font-black text-slate-900 dark:text-white leading-tight">{test.title}</h1>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            {cur.kind === 'module' ? MODULES[cur.m].name : 'Tanaffus'}
          </p>
        </div>
      </div>
      <div className={`flex items-center gap-3 px-6 py-2 rounded-2xl font-montserrat font-black text-2xl ${
        timeLeft < 60 ? 'bg-red-50 dark:bg-red-900/20 text-red-500 animate-pulse' : 'bg-slate-50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300'}`}>
        <FontAwesomeIcon icon={faClock} className="w-6 h-6" /> {fmt(timeLeft)}
      </div>
      <div className="flex items-center gap-2 px-4 py-2 bg-brand/10 text-brand rounded-full text-[10px] font-black uppercase tracking-widest border border-brand/20">
        <FontAwesomeIcon icon={faShieldHalved} className="w-3.5 h-3.5" /> ChSB Rejimi
      </div>
    </div>
  );

  if (cur.kind === 'break') {
    return (
      <div className="fixed inset-0 z-[100] bg-bg-light dark:bg-bg-dark flex flex-col p-4 md:p-8">
        {Header}
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-white dark:bg-panel-dark rounded-[32px] p-12 border border-slate-200 dark:border-slate-800 text-center max-w-lg">
            <FontAwesomeIcon icon={faMugHot} className="w-14 h-14 text-brand mb-6" />
            <h2 className="text-3xl font-black font-montserrat text-slate-900 dark:text-white mb-3">Tanaffus</h2>
            <p className="text-slate-500 mb-6">Reading & Writing tugadi. Keyingi bo'lim — Math. Tanaffus tugagach avtomatik davom etadi.</p>
            <p className="text-5xl font-black font-montserrat text-slate-900 dark:text-white mb-8">{fmt(timeLeft)}</p>
            <button onClick={advance} className="px-10 py-4 rounded-2xl font-bold text-white bg-slate-900 dark:bg-brand active:scale-95 transition-all">
              Tanaffusni tugatish
            </button>
          </div>
        </div>
      </div>
    );
  }

  const qs = mods[cur.m];
  const q = qs[qIdx];
  const base = offsets[cur.m];
  const g = base + qIdx;
  const answered = qs.filter((_, i) => answers[base + i]).length;
  const setAns = (v: string | null) => setAnswers(a => { const n = [...a]; n[g] = v; return n; });

  return (
    <div className="fixed inset-0 z-[100] bg-bg-light dark:bg-bg-dark flex flex-col p-4 md:p-6 select-none">
      {Header}
      <div className="max-w-6xl mx-auto w-full flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">

        {/* Savol */}
        <div className="bg-white dark:bg-panel-dark rounded-[24px] border border-slate-200 dark:border-slate-800 p-6 overflow-y-auto min-h-0 flex flex-col">
          <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
            Savol {qIdx + 1} / {qs.length}
          </div>

          <div className="flex-1">
            {q.passage && (
              <p className="mb-6 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {withUnderline(q.passage)}
              </p>
            )}
            {q.image && <img src={q.image} alt="" draggable={false} className="max-w-full max-h-[420px] mb-6 rounded-xl bg-white p-2" />}
            <p className="text-lg font-semibold text-slate-900 dark:text-white mb-6 whitespace-pre-line">{withUnderline(q.text)}</p>

            {q.choices ? (
              <div className="space-y-3">
                {q.choices.map((ch, i) => {
                  const L = LETTERS[i];
                  const sel = answers[g] === L;
                  return (
                    <button key={L} onClick={() => setAns(sel ? null : L)}
                      className={`w-full text-left flex items-start gap-3 p-4 rounded-2xl border transition-all ${
                        sel ? 'border-brand bg-brand/10' : 'border-slate-200 dark:border-slate-700 hover:border-brand/40'}`}>
                      <span className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-sm font-black ${
                        sel ? 'bg-brand text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>{L}</span>
                      <span className="text-slate-800 dark:text-slate-200 pt-1">{ch}</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <input
                value={answers[g] ?? ''}
                maxLength={6}
                placeholder="Javobingizni yozing (masalan 12 yoki 7/2)"
                onChange={e => setAns(e.target.value.trim() || null)}
                className="w-full h-12 px-4 rounded-xl font-bold border border-slate-200 dark:border-slate-700 bg-transparent text-slate-800 dark:text-slate-100 placeholder:font-normal placeholder:text-sm focus:ring-2 focus:ring-brand outline-none select-text"
              />
            )}
          </div>

          <div className="flex justify-between mt-8">
            <button disabled={qIdx === 0} onClick={() => setQIdx(qIdx - 1)}
              className="px-6 py-3 rounded-2xl font-bold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 disabled:opacity-30">
              Oldingi
            </button>
            <button disabled={qIdx === qs.length - 1} onClick={() => setQIdx(qIdx + 1)}
              className="px-6 py-3 rounded-2xl font-bold bg-slate-900 dark:bg-brand text-white disabled:opacity-30">
              Keyingi
            </button>
          </div>
        </div>

        {/* Navigatsiya paneli */}
        <div className="bg-white dark:bg-panel-dark rounded-[24px] border border-slate-200 dark:border-slate-800 p-4 flex flex-col min-h-0">
          <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
            <span>Savollar</span>
            <span>{answered} / {qs.length}</span>
          </div>
          <div className="flex-1 overflow-y-auto grid grid-cols-5 gap-2 content-start">
            {qs.map((_, i) => (
              <button key={i} onClick={() => setQIdx(i)}
                className={`h-10 rounded-xl text-sm font-bold border transition-all ${
                  i === qIdx ? 'border-brand ring-2 ring-brand text-slate-700 dark:text-slate-200' :
                  answers[base + i] ? 'bg-brand text-white border-brand' :
                  'border-slate-200 dark:border-slate-700 text-slate-500'}`}>
                {i + 1}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              const msg = isLastStep ? 'Testni yakunlaysizmi?' : 'Modulni tugatib, keyingisiga o‘tasizmi? Qaytib bo‘lmaydi.';
              if (window.confirm(msg)) advance();
            }}
            className="mt-4 px-6 py-4 rounded-2xl font-bold text-white bg-slate-900 dark:bg-brand active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            {isLastStep ? 'Yakunlash' : 'Modulni tugatish'} <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Exam;
