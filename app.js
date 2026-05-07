const MODES = { notes: 'notes', keys: 'keys', intervals: 'intervals', theory: 'theory' };
const letterNames = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const solfegeNames = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];
const naturalSemitones = [0, 2, 4, 5, 7, 9, 11];

const majorKeys = [
  { name: 'C major', fifths: 0, isMinor: false, usesSharps: true, relativeName: 'A minor' },
  { name: 'G major', fifths: 1, isMinor: false, usesSharps: true, relativeName: 'E minor' },
  { name: 'D major', fifths: 2, isMinor: false, usesSharps: true, relativeName: 'B minor' },
  { name: 'A major', fifths: 3, isMinor: false, usesSharps: true, relativeName: 'F# minor' },
  { name: 'E major', fifths: 4, isMinor: false, usesSharps: true, relativeName: 'C# minor' },
  { name: 'B major', fifths: 5, isMinor: false, usesSharps: true, relativeName: 'G# minor' },
  { name: 'F# major', fifths: 6, isMinor: false, usesSharps: true, relativeName: 'D# minor' },
  { name: 'C# major', fifths: 7, isMinor: false, usesSharps: true, relativeName: 'A# minor' },
  { name: 'F major', fifths: -1, isMinor: false, usesSharps: false, relativeName: 'D minor' },
  { name: 'Bb major', fifths: -2, isMinor: false, usesSharps: false, relativeName: 'G minor' },
  { name: 'Eb major', fifths: -3, isMinor: false, usesSharps: false, relativeName: 'C minor' },
  { name: 'Ab major', fifths: -4, isMinor: false, usesSharps: false, relativeName: 'F minor' },
  { name: 'Db major', fifths: -5, isMinor: false, usesSharps: false, relativeName: 'Bb minor' },
  { name: 'Gb major', fifths: -6, isMinor: false, usesSharps: false, relativeName: 'Eb minor' },
  { name: 'Cb major', fifths: -7, isMinor: false, usesSharps: false, relativeName: 'Ab minor' },
];
const minorKeys = [
  { name: 'A minor', fifths: 0, isMinor: true, usesSharps: true, relativeName: 'C major' },
  { name: 'E minor', fifths: 1, isMinor: true, usesSharps: true, relativeName: 'G major' },
  { name: 'B minor', fifths: 2, isMinor: true, usesSharps: true, relativeName: 'D major' },
  { name: 'F# minor', fifths: 3, isMinor: true, usesSharps: true, relativeName: 'A major' },
  { name: 'C# minor', fifths: 4, isMinor: true, usesSharps: true, relativeName: 'E major' },
  { name: 'G# minor', fifths: 5, isMinor: true, usesSharps: true, relativeName: 'B major' },
  { name: 'D# minor', fifths: 6, isMinor: true, usesSharps: true, relativeName: 'F# major' },
  { name: 'A# minor', fifths: 7, isMinor: true, usesSharps: true, relativeName: 'C# major' },
  { name: 'D minor', fifths: -1, isMinor: true, usesSharps: false, relativeName: 'F major' },
  { name: 'G minor', fifths: -2, isMinor: true, usesSharps: false, relativeName: 'Bb major' },
  { name: 'C minor', fifths: -3, isMinor: true, usesSharps: false, relativeName: 'Eb major' },
  { name: 'F minor', fifths: -4, isMinor: true, usesSharps: false, relativeName: 'Ab major' },
  { name: 'Bb minor', fifths: -5, isMinor: true, usesSharps: false, relativeName: 'Db major' },
  { name: 'Eb minor', fifths: -6, isMinor: true, usesSharps: false, relativeName: 'Gb major' },
  { name: 'Ab minor', fifths: -7, isMinor: true, usesSharps: false, relativeName: 'Cb major' },
];
const intervals = [
  { label: 'm2', degree: 2, semitones: 1 }, { label: 'M2', degree: 2, semitones: 2 },
  { label: 'm3', degree: 3, semitones: 3 }, { label: 'M3', degree: 3, semitones: 4 },
  { label: 'P4', degree: 4, semitones: 5 }, { label: 'TT', degree: 4, semitones: 6 },
  { label: 'P5', degree: 5, semitones: 7 }, { label: 'm6', degree: 6, semitones: 8 },
  { label: 'M6', degree: 6, semitones: 9 }, { label: 'm7', degree: 7, semitones: 10 },
  { label: 'M7', degree: 7, semitones: 11 }, { label: 'P8', degree: 8, semitones: 12 },
];
const theoryQuestions = [
  q("Какво означава обозначението 'p' в динамиката?", 'Piano – тихо', 'Forte – силно', 'Presto – бързо', 'Portato – отделено', "'p' означава piano – тихо изпълнение."),
  q("Кое обозначение значи 'много силно'?", 'ff', 'pp', 'mf', 'mp', 'ff = fortissimo – много силно.'),
  q('Какво означава crescendo?', 'Постепенно усилване', 'Постепенно ускоряване', 'Постепенно забавяне', 'Постепенно скъсяване', 'Crescendo означава постепенно усилване.'),
  q('Каква е разликата между Allegro и Adagio?', 'Allegro е бързо, Adagio е бавно', 'И двете са динамични знаци', 'Allegro е тихо, Adagio е силно', 'Няма разлика', 'Allegro е бързо темпо, а Adagio е бавно.'),
  q("Какво показва знакът '>' над или под нота?", 'Акцент', 'Легато', 'Пауза', 'Фермата', "Символът '>' е знак за акцент."),
  q('Какво означава staccato?', 'Късо и отделено изпълнение', 'Свързано изпълнение', 'Много бавно', 'Много силно', 'Staccato означава кратко и отделено изпълнение.'),
  q('Кое е legato?', 'Свързано изпълнение', 'Отделено изпълнение', 'Много силно', 'Украса', 'Legato е свързано, плавно изпълнение.'),
  q("Какво означава 'rit.'?", 'Забавяне', 'Ускоряване', 'Повторение', 'Подчертаване', 'rit. = ritardando – постепенно забавяне.'),
  q("Кое обозначение значи 'умерено силно'?", 'mf', 'ff', 'pp', 'sfz', 'mf = mezzo forte – умерено силно.'),
  q('Какво означава знакът фермата (𝄐)?', 'Задържане на тон/пауза', 'Ускоряване', 'Отделяне', 'Прескачане', 'Фермата означава задържане или удължаване.'),
  q('Кое темпо е най-бързо?', 'Presto', 'Largo', 'Andante', 'Adagio', 'Presto е много бързо темпо.'),
  q('Какво означава diminuendo?', 'Постепенно отслабване', 'Постепенно ускоряване', 'По-свързано изпълнение', 'Повишаване с полутон', 'Diminuendo е постепенно намаляване на силата.'),
  q("Какво означава 'a tempo'?", 'Връщане към основното темпо', 'Свирене по-бързо', 'Свирене по-тихо', 'Свирене с акцент', 'a tempo връща изпълнението към предишното основно темпо.'),
  q("Какво означава 'sfz'?", 'Внезапен силен акцент', 'Постепенно отслабване', 'Много тихо', 'Свързано изпълнение', 'sfz = sforzato – внезапен, силен акцент.'),
  q("Какво означава 'Fine'?", 'Край', 'Начало', 'Повтори', 'Забави', 'Fine означава край.'),
  q('Какво означава Da Capo (D.C.)?', 'Отначало', 'От края', 'По-бавно', 'По-силно', 'D.C. означава връщане в началото.'),
  q("Какво означава 'accelerando'?", 'Постепенно ускоряване', 'Постепенно забавяне', 'Постепенно усилване', 'Постепенно отслабване', 'Accelerando означава постепенно ускоряване.'),
  q("Какво означава 'dolce'?", 'Нежно, сладко', 'Много силно', 'Маркирано', 'С ускоряване', 'Dolce означава нежно, меко, сладко звучене.'),
  q("Какво означава 'tenuto'?", 'Задържане до пълната стойност', 'Много бързо', 'Много тихо', 'Прескачане', 'Tenuto означава задържане на тона до пълната му стойност.'),
  q("Какво означава 'con brio'?", 'С жар, с енергия', 'Много тихо', 'Много бавно', 'Кратко и отделено', 'Con brio означава с живост и енергия.'),
];

function q(prompt, correct, a, b, c, explanation) {
  return { prompt, correctAnswer: correct, options: [correct, a, b, c], explanation };
}
function randInt(n) { return Math.floor(Math.random() * n); }
function pick(arr) { return arr[randInt(arr.length)]; }
function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }
function clamp(n, min, max) { return Math.max(min, Math.min(max, Number.isFinite(n) ? n : min)); }
function cloneNote(n) { return { stepIndex: n.stepIndex, octave: n.octave, accidental: n.accidental || 0 }; }
function accidentalText(a) { return a === 1 ? '#' : a === -1 ? 'b' : ''; }
function noteText(note, naming) {
  const names = naming === 'solfege' ? solfegeNames : letterNames;
  return `${names[note.stepIndex]}${accidentalText(note.accidental)}`;
}
function toMidi(n) { return 12 * (n.octave + 1) + naturalSemitones[n.stepIndex] + (n.accidental || 0); }
function addDiatonicSteps(source, steps) {
  const absolute = source.octave * 7 + source.stepIndex + steps;
  return { stepIndex: ((absolute % 7) + 7) % 7, octave: Math.floor(absolute / 7), accidental: 0 };
}
function getFilteredKeys(tonalityMode, family, maxSigns) {
  const limit = clamp(Number(maxSigns), 0, 7);
  let data = tonalityMode === 'major' ? majorKeys : tonalityMode === 'minor' ? minorKeys : [...majorKeys, ...minorKeys];
  data = data.filter(k => Math.abs(k.fifths) <= limit);
  if (family === 'sharps') data = data.filter(k => k.fifths >= 0);
  if (family === 'flats') data = data.filter(k => k.fifths <= 0);
  return data;
}
function trebleRange() { return Array.from({ length: 15 }, (_, i) => ({ stepIndex: i % 7, octave: 4 + Math.floor(i / 7), accidental: 0 })); }
function bassRange() { return Array.from({ length: 15 }, (_, i) => ({ stepIndex: i % 7, octave: 2 + Math.floor(i / 7), accidental: 0 })); }
function isNoteInClefRange(clef, note) {
  const range = clef === 'Treble' ? trebleRange() : bassRange();
  return range.some(n => n.stepIndex === note.stepIndex && n.octave === note.octave);
}

const els = {
  menu: document.getElementById('menuScreen'), game: document.getElementById('gameScreen'),
  canvas: document.getElementById('musicCanvas'), prompt: document.getElementById('prompt'), answers: document.getElementById('answers'), message: document.getElementById('message'),
  correct: document.getElementById('correctLabel'), wrong: document.getElementById('wrongLabel'), bonus: document.getElementById('bonusLabel'), success: document.getElementById('successLabel'),
  reset: document.getElementById('resetBtn'), next: document.getElementById('nextBtn'), mainMenu: document.getElementById('mainMenuBtn'), help: document.getElementById('helpBtn'),
  mode: document.getElementById('modeSelect'), naming: document.getElementById('namingSelect'), clef: document.getElementById('clefSelect'), tonality: document.getElementById('tonalitySelect'), family: document.getElementById('familySelect'), signs: document.getElementById('signsInput'), accidentals: document.getElementById('accidentalsCheck'),
  helpDialog: document.getElementById('helpDialog'), closeHelp: document.getElementById('closeHelpBtn'), closeHelpTop: document.getElementById('closeHelpTop'),
};
const ctx = els.canvas.getContext('2d');
const state = {
  correctCount: 0, wrongCount: 0, bonusCount: 0, recentTheory: [], timer: 0,
  noteQ: null, keyQ: null, intervalQ: null, theoryQ: null, bonusQ: null,
};

function startGame(mode) {
  els.mode.value = mode;
  resetScore();
  showScreen('game');
  generateQuestion();
}
function showScreen(name) {
  els.menu.classList.toggle('active', name === 'menu');
  els.game.classList.toggle('active', name === 'game');
}
function selectedClef() {
  if (els.clef.value === 'treble') return 'Treble';
  if (els.clef.value === 'bass') return 'Bass';
  return Math.random() < 0.5 ? 'Treble' : 'Bass';
}
function resetScore() {
  window.clearTimeout(state.timer);
  state.correctCount = 0;
  state.wrongCount = 0;
  state.bonusCount = 0;
  setMessage('', '');
  updateScoreLabels();
}
function updateScoreLabels() {
  els.correct.textContent = `Верни: ${state.correctCount}`;
  els.wrong.textContent = `Грешни: ${state.wrongCount}`;
  els.bonus.textContent = `Бонус: ${state.bonusCount}`;
  const total = state.correctCount + state.wrongCount;
  els.success.textContent = `Успеваемост: ${total > 0 ? Math.round(state.correctCount * 100 / total) : 0}%`;
}
function setMessage(text, type = '') {
  els.message.textContent = text;
  els.message.className = `message ${type}`.trim();
}
function generateQuestion() {
  window.clearTimeout(state.timer);
  setMessage('', '');
  state.noteQ = state.keyQ = state.intervalQ = state.theoryQ = state.bonusQ = null;
  els.answers.innerHTML = '';

  if (els.mode.value === MODES.notes) { buildNoteQuestion(); buildNoteButtons(); }
  else if (els.mode.value === MODES.keys) { buildKeyQuestion(); buildChoiceButtons(state.keyQ.options, handleKeyAnswer); }
  else if (els.mode.value === MODES.intervals) { buildIntervalQuestion(); buildIntervalButtons(); }
  else { buildTheoryQuestion(); buildChoiceButtons(shuffle(state.theoryQ.options), handleTheoryAnswer); }
  updatePrompt();
  drawCanvas();
}
function currentKeys() {
  let keys = getFilteredKeys(els.tonality.value, els.family.value, Number(els.signs.value));
  if (!keys.length) keys = getFilteredKeys('both', 'both', 7);
  return keys;
}
function buildNoteQuestion() {
  const clef = selectedClef();
  const note = cloneNote(pick(clef === 'Treble' ? trebleRange() : bassRange()));
  note.accidental = els.accidentals.checked ? pick([-1, 0, 0, 0, 1]) : 0;
  state.noteQ = { clef, keySignature: pick(currentKeys()), note, prompt: 'Познай нотата по нейната позиция върху петолинието.' };
}
function buildKeyQuestion() {
  const clef = selectedClef();
  let keys = currentKeys();
  if (keys.length < 4) keys = getFilteredKeys(els.tonality.value, 'both', 7);
  if (keys.length < 4) keys = getFilteredKeys('both', 'both', 7);
  const correct = pick(keys);
  const opts = new Set([correct.name]);
  while (opts.size < 4) opts.add(pick(keys).name);
  state.keyQ = { clef, keySignature: correct, correctAnswer: correct.name, bonusAnswer: correct.relativeName, options: shuffle([...opts]), prompt: 'Познай тоналността по показаните арматурни знаци.' };
}
function buildIntervalQuestion() {
  const clef = selectedClef();
  state.intervalQ = null;
  for (let i = 0; i < 200 && !state.intervalQ; i++) {
    const interval = pick(intervals);
    const bottomPool = (clef === 'Treble' ? trebleRange() : bassRange()).filter(n => n.octave < (clef === 'Treble' ? 6 : 4));
    const bottom = cloneNote(pick(bottomPool));
    const top = addDiatonicSteps(bottom, interval.degree - 1);
    const acc = toMidi(bottom) + interval.semitones - toMidi(top);
    if (acc < -1 || acc > 1) continue;
    top.accidental = acc;
    if (!isNoteInClefRange(clef, top)) continue;
    state.intervalQ = { clef, bottomNote: bottom, topNote: top, interval, prompt: 'Познай интервала между двете ноти.' };
  }
  if (!state.intervalQ) {
    state.intervalQ = { clef, bottomNote: { stepIndex: 0, octave: clef === 'Treble' ? 4 : 3, accidental: 0 }, topNote: { stepIndex: 4, octave: clef === 'Treble' ? 4 : 3, accidental: 0 }, interval: intervals.find(i => i.label === 'P5'), prompt: 'Познай интервала между двете ноти.' };
  }
}
function buildTheoryQuestion() {
  const recent = new Set(state.recentTheory);
  let candidates = theoryQuestions.map((_, i) => i).filter(i => !recent.has(i));
  if (!candidates.length) { state.recentTheory = []; candidates = theoryQuestions.map((_, i) => i); }
  const ix = pick(candidates);
  state.recentTheory.push(ix);
  while (state.recentTheory.length > 6) state.recentTheory.shift();
  state.theoryQ = theoryQuestions[ix];
}
function buildNoteButtons() {
  for (let i = 0; i < 7; i++) {
    const text = els.naming.value === 'solfege' ? solfegeNames[i] : letterNames[i];
    addAnswerButton(text, 'note', () => handleNoteAnswer(i));
  }
}
function buildIntervalButtons() { intervals.forEach(it => addAnswerButton(it.label, 'interval', () => handleIntervalAnswer(it.label))); }
function buildChoiceButtons(options, handler) { options.forEach(opt => addAnswerButton(opt, 'choice', () => handler(opt))); }
function addAnswerButton(text, type, handler) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = `primary-btn answer-btn ${type === 'choice' ? 'choice' : type === 'note' ? 'note' : ''}`.trim();
  btn.textContent = text;
  btn.addEventListener('click', handler);
  els.answers.append(btn);
}
function updatePrompt() {
  els.prompt.textContent = state.bonusQ ? state.bonusQ.prompt :
    els.mode.value === MODES.notes ? state.noteQ.prompt :
    els.mode.value === MODES.keys ? state.keyQ.prompt :
    els.mode.value === MODES.intervals ? state.intervalQ.prompt : state.theoryQ.prompt;
}
function finishAnswer() {
  updateScoreLabels();
  window.clearTimeout(state.timer);
  state.timer = window.setTimeout(generateQuestion, 1400);
}
function handleNoteAnswer(guess) {
  const expected = noteText(state.noteQ.note, els.naming.value);
  if (guess === state.noteQ.note.stepIndex) { state.correctCount++; setMessage(`Вярно! Нотата е ${expected}.`, 'good'); }
  else { state.wrongCount++; setMessage(`Грешно. Правилният отговор е ${expected}.`, 'bad'); }
  finishAnswer();
}
function handleIntervalAnswer(guess) {
  if (guess === state.intervalQ.interval.label) { state.correctCount++; setMessage(`Вярно! Интервалът е ${state.intervalQ.interval.label}.`, 'good'); }
  else { state.wrongCount++; setMessage(`Грешно. Интервалът е ${state.intervalQ.interval.label}.`, 'bad'); }
  finishAnswer();
}
function handleKeyAnswer(selected) {
  if (selected === state.keyQ.correctAnswer) {
    state.correctCount++;
    setMessage(`Вярно! Това е ${state.keyQ.correctAnswer}.`, 'good');
    updateScoreLabels();
    showParallelBonusQuestion();
    return;
  }
  state.wrongCount++;
  setMessage(`Грешно. Правилният отговор е ${state.keyQ.correctAnswer}.`, 'bad');
  finishAnswer();
}
function showParallelBonusQuestion() {
  const correct = state.keyQ.keySignature;
  const candidates = correct.isMinor ? majorKeys : minorKeys;
  const opts = new Set([correct.relativeName]);
  while (opts.size < 4) opts.add(pick(candidates).name);
  state.bonusQ = { prompt: `Бонус въпрос: Коя е паралелната тоналност на ${correct.name}?`, correctAnswer: correct.relativeName, options: shuffle([...opts]), explanation: `Паралелната тоналност на ${correct.name} е ${correct.relativeName}.` };
  els.answers.innerHTML = '';
  buildChoiceButtons(state.bonusQ.options, handleBonusAnswer);
  updatePrompt();
  drawCanvas();
}
function handleBonusAnswer(selected) {
  if (selected === state.bonusQ.correctAnswer) { state.bonusCount++; setMessage(`Бонус въпрос: вярно! ${state.bonusQ.explanation}`, 'info'); }
  else setMessage(`Бонус въпрос: правилният отговор е ${state.bonusQ.correctAnswer}.`, 'warn');
  finishAnswer();
}
function handleTheoryAnswer(selected) {
  if (selected === state.theoryQ.correctAnswer) { state.correctCount++; setMessage(`Вярно! ${state.theoryQ.explanation}`, 'good'); }
  else { state.wrongCount++; setMessage(`Грешно. ${state.theoryQ.explanation}`, 'bad'); }
  finishAnswer();
}

function drawCanvas() {
  ctx.save();
  ctx.clearRect(0, 0, 640, 260);
  ctx.fillStyle = 'whitesmoke';
  ctx.fillRect(0, 0, 640, 260);
  ctx.textBaseline = 'alphabetic';
  if (state.bonusQ || els.mode.value === MODES.theory) { drawTheoryDecoration(30, 70); ctx.restore(); return; }
  const clef = els.mode.value === MODES.notes ? state.noteQ?.clef : els.mode.value === MODES.keys ? state.keyQ?.clef : state.intervalQ?.clef || 'Treble';
  const startX = 30, topY = 70;
  drawStaff(startX, topY, 560);
  let x = drawClef(clef, startX, topY);
  const key = els.mode.value === MODES.notes ? state.noteQ?.keySignature : els.mode.value === MODES.keys ? state.keyQ?.keySignature : null;
  if (key) x = drawKeySignature(clef, key, x + 8, topY);

  ctx.fillStyle = 'dimgray';
  ctx.font = '700 14px Segoe UI, sans-serif';
  if (els.mode.value === MODES.notes && state.noteQ) {
    drawNote(clef, state.noteQ.note, x + 110, topY);
    ctx.fillText(`Ключ: ${clef === 'Treble' ? 'Сол' : 'Фа'}`, 430, 28);
    ctx.fillText(`Тоналност: ${state.noteQ.keySignature.name}`, 430, 50);
  } else if (els.mode.value === MODES.keys && state.keyQ) {
    ctx.font = '700 15px Segoe UI, sans-serif';
    ctx.fillText('Разпознай тоналността по арматурните знаци', 210, 30);
    ctx.fillText(`Ключ: ${clef === 'Treble' ? 'Сол' : 'Фа'}`, 210, 54);
  } else if (els.mode.value === MODES.intervals && state.intervalQ) {
    drawNote(clef, state.intervalQ.bottomNote, x + 130, topY);
    drawNote(clef, state.intervalQ.topNote, x + 250, topY);
    ctx.fillText(`Ключ: ${clef === 'Treble' ? 'Сол' : 'Фа'}`, 430, 28);
  }
  ctx.restore();
}
function drawTheoryDecoration(x, y) {
  ctx.fillStyle = 'black';
  ctx.font = '700 54px "Segoe UI Symbol", "Noto Music", serif';
  ctx.fillText('𝄞', x + 10, y + 30);
  ctx.fillText('p   mf   ff   >   •   𝄐', x + 80, y + 60);
  ctx.fillStyle = 'dimgray';
  ctx.font = '700 18px Segoe UI, sans-serif';
  ctx.fillText('Въпрос с избираеми отговори', x + 130, y + 110);
}
function drawStaff(x, y, w) {
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  for (let i = 0; i < 5; i++) { line(x, y + i * 24, x + w, y + i * 24); }
}
function drawClef(clef, x, y) {
  ctx.fillStyle = 'black';
  ctx.font = clef === 'Treble' ? '80px "Segoe UI Symbol", "Noto Music", serif' : '62px "Segoe UI Symbol", "Noto Music", serif';
  ctx.fillText(clef === 'Treble' ? '𝄞' : '𝄢', x - 8, clef === 'Treble' ? y + 54 : y + 64);
  return x + 70;
}
function drawKeySignature(clef, key, x, y) {
  const count = Math.abs(key.fifths);
  if (count === 0) return x;
  const positions = key.usesSharps
    ? (clef === 'Treble' ? [6, 3, 7, 4, 1, 5, 2] : [4, 1, 5, 2, -1, 3, 0])
    : (clef === 'Treble' ? [2, 5, 1, 4, 0, 3, -1] : [0, 3, -1, 2, -2, 1, -3]);
  ctx.fillStyle = 'black';
  ctx.font = '700 28px "Segoe UI Symbol", serif';
  for (let i = 0; i < count; i++) ctx.fillText(key.usesSharps ? '♯' : '♭', x + i * 20, yFromStaffIndex(y, positions[i]) + 10);
  return x + count * 20;
}
function drawNote(clef, note, x, y) {
  const idx = getStaffIndex(clef, note);
  const yy = yFromStaffIndex(y, idx);
  drawLedgerLines(x, y, idx);
  if (note.accidental !== 0) {
    ctx.font = '700 28px "Segoe UI Symbol", serif';
    ctx.fillStyle = 'black';
    ctx.fillText(note.accidental === 1 ? '♯' : '♭', x - 24, yy + 10);
  }
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.ellipse(x + 12, yy, 12, 8, -0.18, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  line(x + 22, yy, x + 22, yy - 54);
}
function drawLedgerLines(x, topY, idx) {
  ctx.strokeStyle = 'black'; ctx.lineWidth = 2;
  if (idx < 0) for (let i = -2; i >= idx; i -= 2) line(x - 8, yFromStaffIndex(topY, i), x + 32, yFromStaffIndex(topY, i));
  else if (idx > 8) for (let i = 10; i <= idx; i += 2) line(x - 8, yFromStaffIndex(topY, i), x + 32, yFromStaffIndex(topY, i));
}
function getStaffIndex(clef, n) {
  const abs = n.octave * 7 + n.stepIndex;
  const ref = clef === 'Treble' ? 4 * 7 + 2 : 2 * 7 + 4;
  return abs - ref;
}
function yFromStaffIndex(topY, idx) { return topY + 96 - idx * 12; }
function line(x1, y1, x2, y2) { ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); }

function validateSigns() {
  const value = clamp(parseInt(els.signs.value, 10), 0, 7);
  els.signs.value = String(value);
}

document.querySelectorAll('[data-start-mode]').forEach(btn => btn.addEventListener('click', () => startGame(btn.dataset.startMode)));
els.reset.addEventListener('click', () => { resetScore(); generateQuestion(); });
els.next.addEventListener('click', () => { window.clearTimeout(state.timer); state.wrongCount++; setMessage('Прескочено: +1 към грешни.', 'warn'); updateScoreLabels(); generateQuestion(); });
els.mainMenu.addEventListener('click', () => { window.clearTimeout(state.timer); showScreen('menu'); });
els.mode.addEventListener('change', () => { resetScore(); generateQuestion(); });
[els.naming, els.clef, els.tonality, els.family, els.accidentals].forEach(el => el.addEventListener('change', generateQuestion));
els.signs.addEventListener('input', () => { validateSigns(); generateQuestion(); });
els.help.addEventListener('click', () => els.helpDialog.showModal());
els.closeHelp.addEventListener('click', () => els.helpDialog.close());
els.closeHelpTop.addEventListener('click', () => els.helpDialog.close());
window.addEventListener('resize', drawCanvas);
updateScoreLabels();
