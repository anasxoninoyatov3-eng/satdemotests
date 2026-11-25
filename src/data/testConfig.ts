// Testlarni yoqish/o'chirish sozlamasi. { "test11": false } => o'chirilgan. Yo'q bo'lsa — yoqilgan.
export type TestConfig = Record<string, boolean>;
const DRAFT_KEY = 'adminTestConfigDraft';

export const fetchRemoteConfig = async (): Promise<TestConfig> => {
  try {
    const r = await fetch(`/tests-config.json?t=${Date.now()}`, { cache: 'no-store' });
    if (!r.ok) return {};
    const j = await r.json();
    return j && typeof j === 'object' ? j : {};
  } catch { return {}; }
};
export const loadDraft = (): TestConfig | null => {
  try { const s = localStorage.getItem(DRAFT_KEY); return s ? JSON.parse(s) : null; } catch { return null; }
};
export const saveDraft = (c: TestConfig) => { try { localStorage.setItem(DRAFT_KEY, JSON.stringify(c)); } catch {} };
export const isEnabled = (c: TestConfig, id: string) => c[id] !== false;
