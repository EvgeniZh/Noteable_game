const MODES = { notes: 'notes', keys: 'keys', intervals: 'intervals', theory: 'theory' };
const letterNames = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const solfegeNames = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];
const naturalSemitones = [0, 2, 4, 5, 7, 9, 11];

const I18N = {
  bg: {
    languageLabel: 'Език', intro: 'Добре дошъл в Noteable — игра за разпознаване на ноти, тоналности, интервали и музикална теория.<br />Избери с кой режим искаш да започнеш.', chooseMode: 'Избери начален режим',
    modeNotes: 'Ноти', modeKeys: 'Тоналности', modeIntervals: 'Интервали', modeTheory: 'Теория', menuHint: 'От вътрешния екран можеш да се върнеш тук от бутона „Към main menu“.',
    reset: 'Reset', next: 'Следващ', mainMenu: 'Към main menu', settings: 'Настройки', modeLabel: 'Режим', noteNames: 'Имена на ноти', clefLabel: 'Ключ', tonalityLabel: 'Маж/Мин', familyLabel: 'Диези/Бемоли',
    treble: 'Сол', bass: 'Фа', bothClefs: 'И двете', major: 'Мажор', minor: 'Минор', bothTonalities: 'И двете', bothFamilies: 'И диези, и бемоли', sharpsOnly: 'Само диези', flatsOnly: 'Само бемоли',
    upToSigns: 'До колко знака', accidentals: 'Алт.', help: 'Помощ', back: 'Назад', correct: 'Верни', wrong: 'Грешни', bonus: 'Бонус', success: 'Успеваемост',
    notePrompt: 'Познай нотата по нейната позиция върху петолинието.', keyPrompt: 'Познай тоналността по показаните арматурни знаци.', intervalPrompt: 'Познай интервала между двете ноти.',
    correctMsg: 'Вярно!', wrongMsg: 'Грешно.', noteIs: 'Нотата е', correctAnswerIs: 'Правилният отговор е', intervalIs: 'Интервалът е', skipped: 'Прескочено: +1 към грешни.',
    bonusQuestion: 'Бонус въпрос: Коя е паралелната тоналност на', relativeOf: 'Паралелната тоналност на', isWord: 'е', bonusCorrect: 'Бонус въпрос: вярно!', bonusCorrectAnswer: 'Бонус въпрос: правилният отговор е',
    clefCanvas: 'Ключ', keyCanvas: 'Тоналност', recognizeKeySignature: 'Разпознай тоналността по арматурните знаци', multipleChoice: 'Въпрос с избираеми отговори',
    majorWord: 'мажор', minorWord: 'минор', sharpWord: 'диез', flatWord: 'бемол'
  },
  en: {
    languageLabel: 'Language', intro: 'Welcome to Noteable — a game for recognizing notes, key signatures, intervals, and music theory.<br />Choose the mode you want to start with.', chooseMode: 'Choose a starting mode',
    modeNotes: 'Notes', modeKeys: 'Key signatures', modeIntervals: 'Intervals', modeTheory: 'Theory', menuHint: 'From the game screen, you can return here with the “Main menu” button.',
    reset: 'Reset', next: 'Next', mainMenu: 'Main menu', settings: 'Settings', modeLabel: 'Mode', noteNames: 'Note names', clefLabel: 'Clef', tonalityLabel: 'Maj/Min', familyLabel: 'Sharps/Flats',
    treble: 'Treble', bass: 'Bass', bothClefs: 'Both', major: 'Major', minor: 'Minor', bothTonalities: 'Both', bothFamilies: 'Sharps and flats', sharpsOnly: 'Sharps only', flatsOnly: 'Flats only',
    upToSigns: 'Up to signs', accidentals: 'Acc.', help: 'Help', back: 'Back', correct: 'Correct', wrong: 'Wrong', bonus: 'Bonus', success: 'Success rate',
    notePrompt: 'Name the note by its position on the staff.', keyPrompt: 'Identify the key signature shown on the staff.', intervalPrompt: 'Identify the interval between the two notes.',
    correctMsg: 'Correct!', wrongMsg: 'Wrong.', noteIs: 'The note is', correctAnswerIs: 'The correct answer is', intervalIs: 'The interval is', skipped: 'Skipped: +1 wrong answer.',
    bonusQuestion: 'Bonus question: What is the relative key of', relativeOf: 'The relative key of', isWord: 'is', bonusCorrect: 'Bonus question: correct!', bonusCorrectAnswer: 'Bonus question: the correct answer is',
    clefCanvas: 'Clef', keyCanvas: 'Key', recognizeKeySignature: 'Recognize the key from the key signature', multipleChoice: 'Multiple-choice question',
    majorWord: 'major', minorWord: 'minor', sharpWord: 'sharp', flatWord: 'flat'
  }
};
let currentLang = localStorage.getItem('noteableLanguage') || 'bg';
function t(key) { return (I18N[currentLang] && I18N[currentLang][key]) || I18N.bg[key] || key; }


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
  mq("Какво означава обозначението 'p' в динамиката?", "What does the dynamic marking 'p' mean?", 'Piano – тихо', 'Piano – soft', 'Forte – силно', 'Forte – loud', 'Presto – бързо', 'Presto – fast', 'Portato – отделено', 'Portato – detached', "'p' означава piano – тихо изпълнение.", "'p' means piano — soft playing."),
  mq("Кое обозначение значи 'много силно'?", "Which marking means 'very loud'?", 'ff', 'ff', 'pp', 'pp', 'mf', 'mf', 'mp', 'mp', 'ff = fortissimo – много силно.', 'ff = fortissimo — very loud.'),
  mq('Какво означава crescendo?', 'What does crescendo mean?', 'Постепенно усилване', 'Gradually getting louder', 'Постепенно ускоряване', 'Gradually getting faster', 'Постепенно забавяне', 'Gradually slowing down', 'Постепенно скъсяване', 'Gradually shortening', 'Crescendo означава постепенно усилване.', 'Crescendo means gradually getting louder.'),
  mq('Каква е разликата между Allegro и Adagio?', 'What is the difference between Allegro and Adagio?', 'Allegro е бързо, Adagio е бавно', 'Allegro is fast, Adagio is slow', 'И двете са динамични знаци', 'Both are dynamic markings', 'Allegro е тихо, Adagio е силно', 'Allegro is soft, Adagio is loud', 'Няма разлика', 'There is no difference', 'Allegro е бързо темпо, а Adagio е бавно.', 'Allegro is a fast tempo, while Adagio is slow.'),
  mq("Какво показва знакът '>' над или под нота?", "What does the '>' sign above or below a note show?", 'Акцент', 'Accent', 'Легато', 'Legato', 'Пауза', 'Rest', 'Фермата', 'Fermata', "Символът '>' е знак за акцент.", "The '>' symbol is an accent mark."),
  mq('Какво означава staccato?', 'What does staccato mean?', 'Късо и отделено изпълнение', 'Short, detached playing', 'Свързано изпълнение', 'Connected playing', 'Много бавно', 'Very slow', 'Много силно', 'Very loud', 'Staccato означава кратко и отделено изпълнение.', 'Staccato means short, detached playing.'),
  mq('Кое е legato?', 'What is legato?', 'Свързано изпълнение', 'Connected playing', 'Отделено изпълнение', 'Detached playing', 'Много силно', 'Very loud', 'Украса', 'Ornament', 'Legato е свързано, плавно изпълнение.', 'Legato is connected, smooth playing.'),
  mq("Какво означава 'rit.'?", "What does 'rit.' mean?", 'Забавяне', 'Slowing down', 'Ускоряване', 'Speeding up', 'Повторение', 'Repeat', 'Подчертаване', 'Emphasis', 'rit. = ritardando – постепенно забавяне.', 'rit. = ritardando — gradually slowing down.'),
  mq("Кое обозначение значи 'умерено силно'?", "Which marking means 'moderately loud'?", 'mf', 'mf', 'ff', 'ff', 'pp', 'pp', 'sfz', 'sfz', 'mf = mezzo forte – умерено силно.', 'mf = mezzo forte — moderately loud.'),
  mq('Какво означава знакът фермата (𝄐)?', 'What does the fermata sign (𝄐) mean?', 'Задържане на тон/пауза', 'Hold a note/rest', 'Ускоряване', 'Speeding up', 'Отделяне', 'Detaching', 'Прескачане', 'Skipping', 'Фермата означава задържане или удължаване.', 'A fermata means holding or lengthening.'),
  mq('Кое темпо е най-бързо?', 'Which tempo is the fastest?', 'Presto', 'Presto', 'Largo', 'Largo', 'Andante', 'Andante', 'Adagio', 'Adagio', 'Presto е много бързо темпо.', 'Presto is a very fast tempo.'),
  mq('Какво означава diminuendo?', 'What does diminuendo mean?', 'Постепенно отслабване', 'Gradually getting softer', 'Постепенно ускоряване', 'Gradually getting faster', 'По-свързано изпълнение', 'More connected playing', 'Повишаване с полутон', 'Raising by a semitone', 'Diminuendo е постепенно намаляване на силата.', 'Diminuendo means gradually decreasing the volume.'),
  mq("Какво означава 'a tempo'?", "What does 'a tempo' mean?", 'Връщане към основното темпо', 'Return to the original tempo', 'Свирене по-бързо', 'Play faster', 'Свирене по-тихо', 'Play softer', 'Свирене с акцент', 'Play with an accent', 'a tempo връща изпълнението към предишното основно темпо.', 'a tempo returns the music to the previous main tempo.'),
  mq("Какво означава 'sfz'?", "What does 'sfz' mean?", 'Внезапен силен акцент', 'Sudden strong accent', 'Постепенно отслабване', 'Gradually getting softer', 'Много тихо', 'Very soft', 'Свързано изпълнение', 'Connected playing', 'sfz = sforzato – внезапен, силен акцент.', 'sfz = sforzato — a sudden, strong accent.'),
  mq("Какво означава 'Fine'?", "What does 'Fine' mean?", 'Край', 'End', 'Начало', 'Beginning', 'Повтори', 'Repeat', 'Забави', 'Slow down', 'Fine означава край.', 'Fine means end.'),
  mq('Какво означава Da Capo (D.C.)?', 'What does Da Capo (D.C.) mean?', 'Отначало', 'From the beginning', 'От края', 'From the end', 'По-бавно', 'Slower', 'По-силно', 'Louder', 'D.C. означава връщане в началото.', 'D.C. means returning to the beginning.'),
  mq("Какво означава 'accelerando'?", "What does 'accelerando' mean?", 'Постепенно ускоряване', 'Gradually speeding up', 'Постепенно забавяне', 'Gradually slowing down', 'Постепенно усилване', 'Gradually getting louder', 'Постепенно отслабване', 'Gradually getting softer', 'Accelerando означава постепенно ускоряване.', 'Accelerando means gradually speeding up.'),
  mq("Какво означава 'dolce'?", "What does 'dolce' mean?", 'Нежно, сладко', 'Gently, sweetly', 'Много силно', 'Very loud', 'Маркирано', 'Marked', 'С ускоряване', 'Speeding up', 'Dolce означава нежно, меко, сладко звучене.', 'Dolce means gentle, soft, sweet-sounding playing.'),
  mq("Какво означава 'tenuto'?", "What does 'tenuto' mean?", 'Задържане до пълната стойност', 'Hold for the full value', 'Много бързо', 'Very fast', 'Много тихо', 'Very soft', 'Прескачане', 'Skipping', 'Tenuto означава задържане на тона до пълната му стойност.', 'Tenuto means holding the note for its full value.'),
  mq("Какво означава 'con brio'?", "What does 'con brio' mean?", 'С жар, с енергия', 'With spirit and energy', 'Много тихо', 'Very soft', 'Много бавно', 'Very slow', 'Кратко и отделено', 'Short and detached', 'Con brio означава с живост и енергия.', 'Con brio means with liveliness and energy.'),
];

function mq(bgPrompt, enPrompt, bgCorrect, enCorrect, bgA, enA, bgB, enB, bgC, enC, bgExplanation, enExplanation) {
  return {
    bg: { prompt: bgPrompt, correctAnswer: bgCorrect, options: [bgCorrect, bgA, bgB, bgC], explanation: bgExplanation },
    en: { prompt: enPrompt, correctAnswer: enCorrect, options: [enCorrect, enA, enB, enC], explanation: enExplanation },
  };
}
function localizeTheory(question) { return question[currentLang] || question.bg; }
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
  lang: document.getElementById('languageSelect'),
};
const ctx = els.canvas.getContext('2d');
const state = {
  correctCount: 0, wrongCount: 0, bonusCount: 0, recentTheory: [], timer: 0,
  noteQ: null, keyQ: null, intervalQ: null, theoryQ: null, bonusQ: null,
};

const bgNoteRoots = { C: 'До', D: 'Ре', E: 'Ми', F: 'Фа', G: 'Сол', A: 'Ла', B: 'Си' };
function applyLanguage() {
  document.documentElement.lang = currentLang;
  if (els.lang) els.lang.value = currentLang;
  document.querySelectorAll('[data-i18n]').forEach(node => {
    const value = t(node.dataset.i18n);
    if (node.tagName === 'OPTION' || node.tagName === 'BUTTON' || node.tagName === 'LEGEND' || node.tagName === 'H2' || node.tagName === 'SPAN') node.textContent = value;
    else node.innerHTML = value;
  });
  updateScoreLabels();
  updatePrompt();
  drawCanvas();
}
function keyDisplayName(name) {
  if (currentLang === 'en') return name;
  const [rawRoot, mode] = name.split(' ');
  const letter = rawRoot[0];
  const accidental = rawRoot.includes('#') ? ` ${t('sharpWord')}` : rawRoot.includes('b') ? ` ${t('flatWord')}` : '';
  return `${bgNoteRoots[letter] || rawRoot}${accidental} ${mode === 'major' ? t('majorWord') : t('minorWord')}`;
}
function clefDisplayName(clef) { return clef === 'Treble' ? t('treble') : t('bass'); }

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
  els.correct.textContent = `${t('correct')}: ${state.correctCount}`;
  els.wrong.textContent = `${t('wrong')}: ${state.wrongCount}`;
  els.bonus.textContent = `${t('bonus')}: ${state.bonusCount}`;
  const total = state.correctCount + state.wrongCount;
  els.success.textContent = `${t('success')}: ${total > 0 ? Math.round(state.correctCount * 100 / total) : 0}%`;
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
  else if (els.mode.value === MODES.keys) { buildKeyQuestion(); buildChoiceButtons(state.keyQ.options.map(keyDisplayName), handleKeyAnswer); }
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
  state.noteQ = { clef, keySignature: pick(currentKeys()), note, promptKey: 'notePrompt' };
}
function buildKeyQuestion() {
  const clef = selectedClef();
  let keys = currentKeys();
  if (keys.length < 4) keys = getFilteredKeys(els.tonality.value, 'both', 7);
  if (keys.length < 4) keys = getFilteredKeys('both', 'both', 7);
  const correct = pick(keys);
  const opts = new Set([correct.name]);
  while (opts.size < 4) opts.add(pick(keys).name);
  state.keyQ = { clef, keySignature: correct, correctAnswer: correct.name, bonusAnswer: correct.relativeName, options: shuffle([...opts]), promptKey: 'keyPrompt' };
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
    state.intervalQ = { clef, bottomNote: bottom, topNote: top, interval, promptKey: 'intervalPrompt' };
  }
  if (!state.intervalQ) {
    state.intervalQ = { clef, bottomNote: { stepIndex: 0, octave: clef === 'Treble' ? 4 : 3, accidental: 0 }, topNote: { stepIndex: 4, octave: clef === 'Treble' ? 4 : 3, accidental: 0 }, interval: intervals.find(i => i.label === 'P5'), promptKey: 'intervalPrompt' };
  }
}
function buildTheoryQuestion() {
  const recent = new Set(state.recentTheory);
  let candidates = theoryQuestions.map((_, i) => i).filter(i => !recent.has(i));
  if (!candidates.length) { state.recentTheory = []; candidates = theoryQuestions.map((_, i) => i); }
  const ix = pick(candidates);
  state.recentTheory.push(ix);
  while (state.recentTheory.length > 6) state.recentTheory.shift();
  state.theoryQ = localizeTheory(theoryQuestions[ix]);
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
  if (!els.prompt) return;
  els.prompt.textContent = state.bonusQ ? state.bonusQ.prompt :
    els.mode.value === MODES.notes && state.noteQ ? t(state.noteQ.promptKey) :
    els.mode.value === MODES.keys && state.keyQ ? t(state.keyQ.promptKey) :
    els.mode.value === MODES.intervals && state.intervalQ ? t(state.intervalQ.promptKey) : state.theoryQ ? state.theoryQ.prompt : '';
}
function finishAnswer() {
  updateScoreLabels();
  window.clearTimeout(state.timer);
  state.timer = window.setTimeout(generateQuestion, 1400);
}
function handleNoteAnswer(guess) {
  const expected = noteText(state.noteQ.note, els.naming.value);
  if (guess === state.noteQ.note.stepIndex) { state.correctCount++; setMessage(`${t('correctMsg')} ${t('noteIs')} ${expected}.`, 'good'); }
  else { state.wrongCount++; setMessage(`${t('wrongMsg')} ${t('correctAnswerIs')} ${expected}.`, 'bad'); }
  finishAnswer();
}
function handleIntervalAnswer(guess) {
  if (guess === state.intervalQ.interval.label) { state.correctCount++; setMessage(`${t('correctMsg')} ${t('intervalIs')} ${state.intervalQ.interval.label}.`, 'good'); }
  else { state.wrongCount++; setMessage(`${t('wrongMsg')} ${t('intervalIs')} ${state.intervalQ.interval.label}.`, 'bad'); }
  finishAnswer();
}
function handleKeyAnswer(selected) {
  if (selected === keyDisplayName(state.keyQ.correctAnswer)) {
    state.correctCount++;
    setMessage(`${t('correctMsg')} ${keyDisplayName(state.keyQ.correctAnswer)}.`, 'good');
    updateScoreLabels();
    showParallelBonusQuestion();
    return;
  }
  state.wrongCount++;
  setMessage(`${t('wrongMsg')} ${t('correctAnswerIs')} ${keyDisplayName(state.keyQ.correctAnswer)}.`, 'bad');
  finishAnswer();
}
function showParallelBonusQuestion() {
  const correct = state.keyQ.keySignature;
  const candidates = correct.isMinor ? majorKeys : minorKeys;
  const opts = new Set([correct.relativeName]);
  while (opts.size < 4) opts.add(pick(candidates).name);
  state.bonusQ = { prompt: `${t('bonusQuestion')} ${keyDisplayName(correct.name)}?`, correctAnswer: correct.relativeName, options: shuffle([...opts]), explanation: `${t('relativeOf')} ${keyDisplayName(correct.name)} ${t('isWord')} ${keyDisplayName(correct.relativeName)}.` };
  els.answers.innerHTML = '';
  buildChoiceButtons(state.bonusQ.options.map(keyDisplayName), handleBonusAnswer);
  updatePrompt();
  drawCanvas();
}
function handleBonusAnswer(selected) {
  if (selected === keyDisplayName(state.bonusQ.correctAnswer)) { state.bonusCount++; setMessage(`${t('bonusCorrect')} ${state.bonusQ.explanation}`, 'info'); }
  else setMessage(`${t('bonusCorrectAnswer')} ${keyDisplayName(state.bonusQ.correctAnswer)}.`, 'warn');
  finishAnswer();
}
function handleTheoryAnswer(selected) {
  if (selected === state.theoryQ.correctAnswer) { state.correctCount++; setMessage(`${t('correctMsg')} ${state.theoryQ.explanation}`, 'good'); }
  else { state.wrongCount++; setMessage(`${t('wrongMsg')} ${state.theoryQ.explanation}`, 'bad'); }
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
    ctx.fillText(`${t('clefCanvas')}: ${clefDisplayName(clef)}`, 430, 28);
    ctx.fillText(`${t('keyCanvas')}: ${keyDisplayName(state.noteQ.keySignature.name)}`, 430, 50);
  } else if (els.mode.value === MODES.keys && state.keyQ) {
    ctx.font = '700 15px Segoe UI, sans-serif';
    ctx.fillText(t('recognizeKeySignature'), 210, 30);
    ctx.fillText(`${t('clefCanvas')}: ${clefDisplayName(clef)}`, 210, 54);
  } else if (els.mode.value === MODES.intervals && state.intervalQ) {
    drawNote(clef, state.intervalQ.bottomNote, x + 130, topY);
    drawNote(clef, state.intervalQ.topNote, x + 250, topY);
    ctx.fillText(`${t('clefCanvas')}: ${clefDisplayName(clef)}`, 430, 28);
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
  ctx.fillText(t('multipleChoice'), x + 130, y + 110);
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
els.next.addEventListener('click', () => { window.clearTimeout(state.timer); state.wrongCount++; setMessage(t('skipped'), 'warn'); updateScoreLabels(); generateQuestion(); });
els.mainMenu.addEventListener('click', () => { window.clearTimeout(state.timer); showScreen('menu'); });
els.mode.addEventListener('change', () => { resetScore(); generateQuestion(); });
[els.naming, els.clef, els.tonality, els.family, els.accidentals].forEach(el => el.addEventListener('change', generateQuestion));
els.signs.addEventListener('input', () => { validateSigns(); generateQuestion(); });
els.help.addEventListener('click', () => els.helpDialog.showModal());
els.closeHelp.addEventListener('click', () => els.helpDialog.close());
els.closeHelpTop.addEventListener('click', () => els.helpDialog.close());
els.lang.addEventListener('change', () => { currentLang = els.lang.value; localStorage.setItem('noteableLanguage', currentLang); resetScore(); applyLanguage(); generateQuestion(); });
window.addEventListener('resize', drawCanvas);
applyLanguage();
updateScoreLabels();
