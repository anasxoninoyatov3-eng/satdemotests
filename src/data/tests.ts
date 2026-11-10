import { test11 } from './test11';

export interface ModuleDef {
  name: string;
  subject: 'rw' | 'math';
  minutes: number; // vaqt
}

// Tuzilma: 33 + 33 + 27 + 27 = 120 savol.
// Vaqt: 39 / 39 / 10 daq. tanaffus / 43 / 43.
export const MODULES: ModuleDef[] = [
  { name: 'Reading & Writing — 1-modul', subject: 'rw',   minutes: 39 },
  { name: 'Reading & Writing — 2-modul', subject: 'rw',   minutes: 39 },
  { name: 'Math — 1-modul',              subject: 'math', minutes: 43 },
  { name: 'Math — 2-modul',              subject: 'math', minutes: 43 },
];
export const BREAK_MINUTES = 10;
export const TOTAL_QUESTIONS = 120;
export const TOTAL_MINUTES = MODULES.reduce((s, m) => s + m.minutes, 0); // 164

export interface Question {
  passage?: string;                            // matn / qo'shimcha shart (‹...› = tagiga chizilgan)
  text: string;                                // savol matni
  image?: string;                              // grafik / chizma: '/tests/img/t11-m3-q1.png'
  choices?: [string, string, string, string];  // A-D; yozma javobli savolda bo'lmaydi
  answer: string;                              // 'B' yoki '7/2|3.5'
}

export interface TestDef {
  id: string;
  title: string;
  modules: [Question[], Question[], Question[], Question[]];
}

export const TESTS: TestDef[] = [test11];

export const countOf = (t: TestDef) => t.modules.reduce((s, m) => s + m.length, 0);
export const hasKey = (t: TestDef) => t.modules.every(m => m.every(q => !!q.answer));

// Javobni tekshirish: A-D uchun to'g'ridan-to'g'ri, yozma javob uchun son/kasr qiymati bo'yicha
const num = (s: string): number | null => {
  const t = s.trim().replace(/\s+/g, '');
  if (/^-?\d*\.?\d+$/.test(t)) return parseFloat(t);
  const m = t.match(/^(-?\d+)\/(\d+)$/);
  return m && +m[2] !== 0 ? +m[1] / +m[2] : null;
};
export const isCorrect = (given: string | null, key: string | undefined): boolean => {
  if (!given || !key) return false;
  return key.split('|').some(k => {
    if (/^[A-D]$/i.test(k)) return given.toUpperCase() === k.toUpperCase();
    const a = num(given), b = num(k);
    return a !== null && b !== null && Math.abs(a - b) < 1e-4;
  });
};

export interface ResultData {
  testId: string;
  title: string;
  score: number;      // 400–1600
  rwScore: number;    // 200–800
  mathScore: number;  // 200–800
  correct: number;
  total: number;
  timeSpent: number;
  date: string;
}
