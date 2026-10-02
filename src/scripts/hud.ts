/* Client-side behaviour for the whole site: dialogs, settings, clocks, sound, viewer, contact form. */

const root = document.documentElement;
const KEY = 'nk-settings';
type Settings = { accent: string; text: string; effects: string; sound: string };
const DEFAULTS: Settings = { accent: 'red', text: 'normal', effects: 'on', sound: 'off' };

function readSettings(): Settings {
  try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; } catch { return { ...DEFAULTS }; }
}
function writeSettings(s: Settings) {
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* private mode: settings last for this page only */ }
}
function applySettings(s: Settings) {
  s.accent !== 'red' ? (root.dataset.accent = s.accent) : delete root.dataset.accent;
  s.text !== 'normal' ? (root.dataset.text = s.text) : delete root.dataset.text;
  s.effects === 'off' ? (root.dataset.effects = 'off') : delete root.dataset.effects;
  s.sound === 'on' ? (root.dataset.sound = 'on') : delete root.dataset.sound;
  document.querySelectorAll<HTMLButtonElement>('[data-toggle-sound]').forEach((b) => b.setAttribute('aria-pressed', String(s.sound === 'on')));
  window.dispatchEvent(new CustomEvent('nk:settings', { detail: s }));
}
let settings = readSettings();
applySettings(settings);

/* ---------- Dialogs ---------- */
document.addEventListener('click', (e) => {
  const t = e.target as HTMLElement;
  const opener = t.closest<HTMLElement>('[data-open]');
  if (opener) {
    const dlg = document.getElementById(opener.dataset.open!) as HTMLDialogElement | null;
    if (dlg) {
      document.querySelectorAll<HTMLDialogElement>('dialog[open]').forEach((d) => d.close());
      dlg.showModal();
    }
    return;
  }
  const closer = t.closest('[data-close]');
  if (closer) { closer.closest('dialog')?.close(); return; }
  // Click on the backdrop closes the dialog
  if (t instanceof HTMLDialogElement && t.open) {
    const r = t.getBoundingClientRect();
    const ev = e as MouseEvent;
    if (ev.clientX < r.left || ev.clientX > r.right || ev.clientY < r.top || ev.clientY > r.bottom) t.close();
  }
});

/* ---------- Settings form ---------- */
const sForm = document.getElementById('settings-form') as HTMLFormElement | null;
function syncSettingsForm() {
  if (!sForm) return;
  (Object.keys(DEFAULTS) as (keyof Settings)[]).forEach((k) => {
    const input = sForm.querySelector<HTMLInputElement>(`input[name="${k}"][value="${settings[k]}"]`);
    if (input) input.checked = true;
  });
}
syncSettingsForm();
sForm?.addEventListener('change', (e) => {
  const input = e.target as HTMLInputElement;
  settings = { ...settings, [input.name]: input.value };
  writeSettings(settings); applySettings(settings);
});
document.getElementById('settings-reset')?.addEventListener('click', () => {
  settings = { ...DEFAULTS, sound: settings.sound };
  writeSettings(settings); applySettings(settings); syncSettingsForm();
});

/* ---------- Sound effects (generated, no audio files) ---------- */
let ctx: AudioContext | null = null;
function blip() {
  if (root.dataset.sound !== 'on') return;
  try {
    ctx ??= new AudioContext();
    const o = ctx.createOscillator(); const g = ctx.createGain();
    o.type = 'square'; o.frequency.setValueAtTime(880, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(420, ctx.currentTime + 0.06);
    g.gain.setValueAtTime(0.025, ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
    o.connect(g).connect(ctx.destination); o.start(); o.stop(ctx.currentTime + 0.09);
  } catch { /* audio unavailable */ }
}
document.addEventListener('click', (e) => {
  const t = (e.target as HTMLElement).closest('[data-toggle-sound]');
  if (t) {
    settings = { ...settings, sound: settings.sound === 'on' ? 'off' : 'on' };
    writeSettings(settings); applySettings(settings); blip();
    return;
  }
  if ((e.target as HTMLElement).closest('[data-sfx]')) blip();
});

/* ---------- Clocks ---------- */
const serverEl = document.getElementById('clock-server');
const localEl = document.getElementById('clock-local');
let offset = 0; // server clock minus local clock, in ms
const fmt = (d: Date, tz?: string) => d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: tz });
function tick() {
  const now = new Date();
  if (localEl) localEl.textContent = fmt(now);
  if (serverEl) serverEl.textContent = fmt(new Date(now.getTime() + offset), 'Europe/Sofia');
}
fetch(location.pathname, { method: 'HEAD', cache: 'no-store' })
  .then((r) => { const d = r.headers.get('date'); if (d) offset = new Date(d).getTime() - Date.now(); })
  .catch(() => {})
  .finally(tick);
tick();
setInterval(tick, 15_000);

/* ---------- Media viewer ---------- */
const viewer = document.getElementById('dlg-viewer') as HTMLDialogElement | null;
const vStage = document.getElementById('viewer-stage')!;
const vCaption = document.getElementById('viewer-caption')!;
const vName = document.getElementById('viewer-name')!;
let vItems: HTMLElement[] = [];
let vIndex = 0;
function showItem(i: number) {
  vIndex = (i + vItems.length) % vItems.length;
  const el = vItems[vIndex];
  const { full, kind, caption, name, poster, w, h } = el.dataset;
  vStage.replaceChildren();
  if (kind === 'video') {
    const v = document.createElement('video');
    v.src = full!; v.controls = true; v.loop = true; v.muted = true; v.playsInline = true; v.autoplay = root.dataset.effects !== 'off';
    if (poster) v.poster = poster;
    vStage.append(v);
  } else {
    const img = document.createElement('img');
    img.src = full!; img.alt = caption || ''; if (w) img.width = +w; if (h) img.height = +h;
    vStage.append(img);
  }
  vCaption.textContent = caption || '';
  vName.textContent = name || 'Viewer';
  const multi = vItems.length > 1;
  (document.getElementById('viewer-prev') as HTMLButtonElement).hidden = !multi;
  (document.getElementById('viewer-next') as HTMLButtonElement).hidden = !multi;
}
document.addEventListener('click', (e) => {
  const t = (e.target as HTMLElement).closest<HTMLElement>('[data-view]');
  if (!t || !viewer) return;
  e.preventDefault();
  vItems = Array.from(document.querySelectorAll<HTMLElement>(`[data-view="${t.dataset.view}"]`));
  showItem(vItems.indexOf(t));
  viewer.showModal();
});
document.getElementById('viewer-prev')?.addEventListener('click', () => showItem(vIndex - 1));
document.getElementById('viewer-next')?.addEventListener('click', () => showItem(vIndex + 1));
viewer?.addEventListener('keydown', (e) => {
  if (vItems.length < 2) return;
  if (e.key === 'ArrowLeft') showItem(vIndex - 1);
  if (e.key === 'ArrowRight') showItem(vIndex + 1);
});
viewer?.addEventListener('close', () => vStage.replaceChildren());

/* ---------- Contact form: compose an email ---------- */
const hire = document.getElementById('hire-form') as HTMLFormElement | null;
hire?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(hire);
  const note = document.getElementById('hire-note')!;
  let firstBad: HTMLElement | null = null;
  hire.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea').forEach((f) => {
    const bad = !f.checkValidity();
    f.setAttribute('aria-invalid', String(bad));
    if (bad && !firstBad) firstBad = f;
  });
  if (firstBad) {
    note.textContent = 'Fill in your name, a valid email and a message, then send again.';
    note.classList.add('is-error');
    (firstBad as HTMLElement).focus();
    return;
  }
  note.textContent = 'Opening your email app…';
  note.classList.remove('is-error');
  const to = document.querySelector<HTMLAnchorElement>('#dlg-connect a[href^="mailto:"]')?.href.replace('mailto:', '') ?? '';
  const subject = `Portfolio message from ${data.get('name')}`;
  const body = `${data.get('message')}\n\n${data.get('name')}\n${data.get('email')}`;
  location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

/* ---------- Intro screen (home, once per session) ---------- */
const enter = document.getElementById('intro-enter');
function closeIntro() {
  delete root.dataset.intro;
  try { sessionStorage.setItem('nk-entered', '1'); } catch { /* ignore */ }
  document.getElementById('main')?.focus();
}
enter?.addEventListener('click', () => { blip(); closeIntro(); });
if (root.dataset.intro) {
  enter?.focus();
  document.addEventListener('keydown', function onKey(e) {
    if (e.key === 'Enter' || e.key === 'Escape') { if (root.dataset.intro) { e.preventDefault(); closeIntro(); } document.removeEventListener('keydown', onKey); }
  });
}
