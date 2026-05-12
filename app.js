const MODES = { notes: 'notes', keys: 'keys', intervals: 'intervals', symbols: 'symbols' };
const MESSAGE_DELAY_MS = 2300;
const letterNames = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const solfegeNames = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];
const naturalSemitones = [0, 2, 4, 5, 7, 9, 11];

const I18N = {
  bg: {
    languageLabel: 'Език',
    intro: 'Добре дошъл в Noteable — игра за разпознаване на ноти, тоналности, интервали и музикални символи.<br />Избери с кой режим искаш да започнеш.',
    chooseMode: 'Избери начален режим',
    modeNotes: 'Ноти', modeKeys: 'Тоналности', modeIntervals: 'Интервали', modeSymbols: 'Музикални символи',
    reset: 'Нулиране', next: 'Следващ', mainMenu: 'Към главното меню', settings: 'Настройки', modeLabel: 'Режим', noteNames: 'Имена на ноти', clefLabel: 'Ключ', tonalityLabel: 'Маж/Мин', familyLabel: 'Диези/Бемоли',
    treble: 'Сол', bass: 'Фа', bothClefs: 'И двете', major: 'Мажор', minor: 'Минор', bothTonalities: 'И двете', bothFamilies: 'И диези, и бемоли', sharpsOnly: 'Само диези', flatsOnly: 'Само бемоли',
    upToSigns: 'До колко знака', accidentals: 'Алт.', help: 'Помощ', back: 'Назад', correct: 'Верни', wrong: 'Грешни', success: 'Успеваемост', streak: 'Streak', streakPopupTitle: 'Streak приключи!', streakPopupText: 'Достигна {count} поредни верни отговора.',
    notePrompt: 'Познай нотата по нейната позиция върху петолинието.', keyPrompt: 'Познай тоналността по показаните арматурни знаци.', intervalPrompt: 'Познай интервала между двете ноти.', playInterval: 'Пусни', playingInterval: 'Интервалът се изпълнява...',
    correctMsg: 'Вярно!', wrongMsg: 'Грешно.', noteIs: 'Нотата е', correctAnswerIs: 'Правилният отговор е', intervalIs: 'Интервалът е', skipped: 'Прескочено: +1 към грешни.',
    clefCanvas: 'Ключ', keyCanvas: 'Тоналност', recognizeKeySignature: 'Разпознай тоналността по арматурните знаци', multipleChoice: 'Въпрос с избираеми отговори',
    majorWord: 'мажор', minorWord: 'минор', sharpWord: 'диез', flatWord: 'бемол', doubleSharpWord: 'двоен диез', doubleFlatWord: 'двоен бемол'
  },
  en: {
    languageLabel: 'Language',
    intro: 'Welcome to Noteable — a game for recognizing notes, key signatures, intervals, and musical symbols.<br />Choose the mode you want to start with.',
    chooseMode: 'Choose a starting mode',
    modeNotes: 'Notes', modeKeys: 'Key signatures', modeIntervals: 'Intervals', modeSymbols: 'Musical symbols',
    reset: 'Reset', next: 'Next', mainMenu: 'Main menu', settings: 'Settings', modeLabel: 'Mode', noteNames: 'Note names', clefLabel: 'Clef', tonalityLabel: 'Maj/Min', familyLabel: 'Sharps/Flats',
    treble: 'Treble', bass: 'Bass', bothClefs: 'Both', major: 'Major', minor: 'Minor', bothTonalities: 'Both', bothFamilies: 'Sharps and flats', sharpsOnly: 'Sharps only', flatsOnly: 'Flats only',
    upToSigns: 'Up to signs', accidentals: 'Acc.', help: 'Help', back: 'Back', correct: 'Correct', wrong: 'Wrong', success: 'Success rate', streak: 'Streak', streakPopupTitle: 'Streak ended!', streakPopupText: 'You reached {count} correct answers in a row.',
    notePrompt: 'Name the note by its position on the staff.', keyPrompt: 'Identify the key signature shown on the staff.', intervalPrompt: 'Identify the interval between the two notes.', playInterval: 'Play', playingInterval: 'Playing the interval...',
    correctMsg: 'Correct!', wrongMsg: 'Wrong.', noteIs: 'The note is', correctAnswerIs: 'The correct answer is', intervalIs: 'The interval is', skipped: 'Skipped: +1 wrong answer.',
    clefCanvas: 'Clef', keyCanvas: 'Key', recognizeKeySignature: 'Recognize the key from the key signature', multipleChoice: 'Multiple-choice question',
    majorWord: 'major', minorWord: 'minor', sharpWord: 'sharp', flatWord: 'flat', doubleSharpWord: 'double sharp', doubleFlatWord: 'double flat'
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
const symbolQuestions = [
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
  mq('Какво означава знакът за повторение ||: :||?', 'What does the repeat sign ||: :|| mean?', 'Повтори отбелязания откъс', 'Repeat the marked passage', 'Свири по-тихо', 'Play softer', 'Прескочи един такт', 'Skip one measure', 'Задръж последната нота', 'Hold the last note', 'Знакът за повторение означава откъсът да се изпълни отново.', 'The repeat sign means the passage should be played again.'),
  mq('Какво означава точка след нота?', 'What does a dot after a note mean?', 'Удължава стойността с половината', 'It lengthens the value by half', 'Скъсява нотата наполовина', 'It halves the note', 'Прави нотата по-силна', 'It makes the note louder', 'Показва пауза', 'It shows a rest', 'Точката след нота увеличава стойността ѝ с половината от нейната стойност.', 'A dot after a note increases its value by half of its value.'),
  mq('Какво означава лигатура между две еднакви ноти?', 'What does a tie between two identical notes mean?', 'Свързва стойностите им в един тон', 'It joins their values into one sound', 'Прави ги стакато', 'It makes them staccato', 'Означава повторение', 'It means repeat', 'Означава акцент', 'It means accent', 'Лигатурата между еднакви ноти ги свързва в един продължен тон.', 'A tie between identical notes joins them into one sustained sound.'),
  mq('Какво означава фразова дъга над различни ноти?', 'What does a slur over different notes mean?', 'Свирят се свързано', 'They are played smoothly connected', 'Свирят се по-силно', 'They are played louder', 'Свирят се по-бързо', 'They are played faster', 'Свирят се отделено', 'They are played detached', 'Фразовата дъга показва свързано, плавно изпълнение.', 'A slur indicates smooth, connected playing.'),
  mq('Какво означава знакът ♯?', 'What does the ♯ sign mean?', 'Повишава тона с полутон', 'Raises the pitch by a semitone', 'Понижава тона с полутон', 'Lowers the pitch by a semitone', 'Отменя алтерация', 'Cancels an accidental', 'Удължава нотата', 'Lengthens the note', 'Диезът повишава тона с един полутон.', 'A sharp raises the pitch by one semitone.'),
  mq('Какво означава знакът ♭?', 'What does the ♭ sign mean?', 'Понижава тона с полутон', 'Lowers the pitch by a semitone', 'Повишава тона с полутон', 'Raises the pitch by a semitone', 'Прави нотата тиха', 'Makes the note soft', 'Показва повторение', 'Shows a repeat', 'Бемолът понижава тона с един полутон.', 'A flat lowers the pitch by one semitone.'),
  mq('Какво означава бекарът ♮?', 'What does the natural sign ♮ mean?', 'Отменя диез или бемол', 'Cancels a sharp or flat', 'Повишава с цял тон', 'Raises by a whole tone', 'Понижава с цял тон', 'Lowers by a whole tone', 'Означава пауза', 'Means rest', 'Бекарът отменя предишна алтерация.', 'A natural sign cancels a previous accidental.'),
  mq('Какво означава 𝄪?', 'What does 𝄪 mean?', 'Двоен диез', 'Double sharp', 'Двоен бемол', 'Double flat', 'Бекар', 'Natural', 'Акцент', 'Accent', '𝄪 е двоен диез и повишава тона с два полутона.', '𝄪 is a double sharp and raises the pitch by two semitones.'),
  mq('Какво означава 𝄫?', 'What does 𝄫 mean?', 'Двоен бемол', 'Double flat', 'Двоен диез', 'Double sharp', 'Фермата', 'Fermata', 'Легато', 'Legato', '𝄫 е двоен бемол и понижава тона с два полутона.', '𝄫 is a double flat and lowers the pitch by two semitones.'),
  mq('Какво означава знакът 4/4?', 'What does the time signature 4/4 mean?', 'Четири четвъртини в такт', 'Four quarter-note beats per measure', 'Три четвъртини в такт', 'Three quarter-note beats per measure', 'Четири осмини в такт', 'Four eighth notes per measure', 'Темпо четири', 'Tempo four', 'Размер 4/4 означава четири четвъртини във всеки такт.', 'A 4/4 time signature means four quarter-note beats in each measure.'),
  mq('Какво означава знакът 3/4?', 'What does the time signature 3/4 mean?', 'Три четвъртини в такт', 'Three quarter-note beats per measure', 'Четири четвъртини в такт', 'Four quarter-note beats per measure', 'Две половини в такт', 'Two half-note beats per measure', 'Три осмини в такт', 'Three eighth notes per measure', 'Размер 3/4 означава три четвъртини във всеки такт.', 'A 3/4 time signature means three quarter-note beats in each measure.'),
  mq('Какво е тактова черта?', 'What is a bar line?', 'Линия, която разделя тактовете', 'A line that separates measures', 'Знак за сила', 'A dynamic marking', 'Знак за темпо', 'A tempo marking', 'Пауза', 'A rest', 'Тактовата черта разделя музиката на тактове.', 'A bar line divides music into measures.'),
  mq('Какво означава двойна тактова черта?', 'What does a double bar line mean?', 'Край на раздел или важна граница', 'End of a section or important boundary', 'Свири два пъти по-силно', 'Play twice as loud', 'Повтори само една нота', 'Repeat one note only', 'Свири стакато', 'Play staccato', 'Двойната тактова черта често показва край на раздел.', 'A double bar line often marks the end of a section.'),
  mq('Какво означава пауза в музиката?', 'What does a rest mean in music?', 'Мълчание за определена стойност', 'Silence for a specific duration', 'Повишаване на тона', 'Raising the pitch', 'Усилване', 'Getting louder', 'Повторение', 'Repeat', 'Пауза означава мълчание за определена ритмична стойност.', 'A rest means silence for a specific rhythmic value.'),
  mq('Какво означава знакът ottava 8va?', 'What does the ottava marking 8va mean?', 'Свири една октава по-високо', 'Play one octave higher', 'Свири една октава по-ниско', 'Play one octave lower', 'Свири осем пъти', 'Play eight times', 'Свири много тихо', 'Play very softly', '8va обикновено означава да се свири една октава по-високо.', '8va usually means to play one octave higher.'),
  mq('Какво означава marcato?', 'What does marcato mean?', 'Подчертано, маркирано изпълнение', 'Marked, emphasized playing', 'Много нежно', 'Very gently', 'Много бавно', 'Very slowly', 'Без акценти', 'Without accents', 'Marcato означава подчертано, ясно маркирано изпълнение.', 'Marcato means marked, clearly emphasized playing.'),
  mq('Какво означава subito piano?', 'What does subito piano mean?', 'Внезапно тихо', 'Suddenly soft', 'Постепенно тихо', 'Gradually soft', 'Внезапно бързо', 'Suddenly fast', 'Постепенно силно', 'Gradually loud', 'Subito piano означава внезапно преминаване към тихо изпълнение.', 'Subito piano means suddenly becoming soft.'),
  mq('Какво означава senza sordino?', 'What does senza sordino mean?', 'Без сурдина', 'Without mute', 'Със сурдина', 'With mute', 'По-тихо', 'Softer', 'По-бързо', 'Faster', 'Senza sordino означава без сурдина.', 'Senza sordino means without mute.'),
  mq('Какво означава con sordino?', 'What does con sordino mean?', 'Със сурдина', 'With mute', 'Без сурдина', 'Without mute', 'С повече сила', 'With more volume', 'С повече темпо', 'With more tempo', 'Con sordino означава със сурдина.', 'Con sordino means with mute.'),
  mq('Какво означава знакът за арпеж пред акорд?', 'What does an arpeggio sign before a chord mean?', 'Тоновете се изпълняват последователно', 'The notes are played one after another', 'Акордът се пропуска', 'The chord is skipped', 'Акордът се свири по-тихо', 'The chord is played softer', 'Всички тонове се удължават', 'All notes are lengthened', 'Арпежът означава тоновете на акорда да се изпълнят последователно.', 'An arpeggio means the notes of the chord are played one after another.')
];

function mq(bgPrompt, enPrompt, bgCorrect, enCorrect, bgA, enA, bgB, enB, bgC, enC, bgExplanation, enExplanation) {
  return {
    bg: { prompt: bgPrompt, correctAnswer: bgCorrect, options: [bgCorrect, bgA, bgB, bgC], explanation: bgExplanation },
    en: { prompt: enPrompt, correctAnswer: enCorrect, options: [enCorrect, enA, enB, enC], explanation: enExplanation },
  };
}
function localizeQuestion(question) { return question[currentLang] || question.bg; }
function randInt(n) { return Math.floor(Math.random() * n); }
function pick(arr) { return arr[randInt(arr.length)]; }
function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }
function clamp(n, min, max) { return Math.max(min, Math.min(max, Number.isFinite(n) ? n : min)); }
function cloneNote(n) { return { stepIndex: n.stepIndex, octave: n.octave, accidental: n.accidental || 0 }; }
function accidentalText(a) { return a === 2 ? '𝄪' : a === 1 ? '♯' : a === -1 ? '♭' : a === -2 ? '𝄫' : ''; }
function accidentalPlainText(a) { return a === 2 ? '##' : a === 1 ? '#' : a === -1 ? 'b' : a === -2 ? 'bb' : ''; }
function noteText(note, naming, plain = false) {
  const names = naming === 'solfege' ? solfegeNames : letterNames;
  return `${names[note.stepIndex]}${plain ? accidentalPlainText(note.accidental) : accidentalText(note.accidental)}`;
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
  playInterval: document.getElementById('playIntervalBtn'), pianoClip: document.getElementById('pianoClip'),
  correct: document.getElementById('correctLabel'), wrong: document.getElementById('wrongLabel'), success: document.getElementById('successLabel'), streak: document.getElementById('streakLabel'),
  reset: document.getElementById('resetBtn'), next: document.getElementById('nextBtn'), mainMenu: document.getElementById('mainMenuBtn'), help: document.getElementById('helpBtn'),
  mode: document.getElementById('modeSelect'), naming: document.getElementById('namingSelect'), clef: document.getElementById('clefSelect'), tonality: document.getElementById('tonalitySelect'), family: document.getElementById('familySelect'), signs: document.getElementById('signsInput'), accidentals: document.getElementById('accidentalsCheck'),
  lang: document.getElementById('languageSelect'), helpDialog: document.getElementById('helpDialog'), closeHelp: document.getElementById('closeHelpBtn'), closeHelpTop: document.getElementById('closeHelpTop'),
  streakPopup: document.getElementById('streakPopup'), streakPopupText: document.getElementById('streakPopupText'), closeStreakPopup: document.getElementById('closeStreakPopup'),
};
const ctx = els.canvas.getContext('2d');
const state = {
  correctCount: 0, wrongCount: 0, streakCount: 0, recentSymbols: [], timer: 0, streakTimer: 0, playTimers: [], audioCtx: null, audioMaster: null,
  noteQ: null, keyQ: null, intervalQ: null, symbolQ: null,
};
const bgNoteRoots = { C: 'До', D: 'Ре', E: 'Ми', F: 'Фа', G: 'Сол', A: 'Ла', B: 'Си' };

const STAFF = {
  lineSpacing: 26,
  lineWidth: 4,
  noteHeadW: 30,
  noteHeadH: 20,
  stemHeight: 76,
  stemWidth: 4,
  clefAdvanceTreble: 94,
  clefAdvanceBass: 88,
  staffTopY: 68,
  clefTopY: 42,
};

function applyLanguage() {
  document.documentElement.lang = currentLang;
  els.lang.value = currentLang;
  document.querySelectorAll('[data-i18n]').forEach(node => {
    const value = t(node.dataset.i18n);
    if (node.tagName === 'OPTION' || node.tagName === 'BUTTON' || node.tagName === 'LEGEND' || node.tagName === 'H2' || node.tagName === 'SPAN') node.textContent = value;
    else node.innerHTML = value;
  });
  updateScoreLabels();
  updatePrompt();
  drawCanvas();
  updatePlayButtonVisibility();
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
  state.streakCount = 0;
  hideStreakPopup();
  setMessage('', '');
  updateScoreLabels();
}
function updateScoreLabels() {
  els.correct.textContent = `${t('correct')}: ${state.correctCount}`;
  els.wrong.textContent = `${t('wrong')}: ${state.wrongCount}`;
  const total = state.correctCount + state.wrongCount;
  els.success.textContent = `${t('success')}: ${total > 0 ? Math.round(state.correctCount * 100 / total) : 0}%`;
  els.streak.textContent = `${t('streak')}: ${state.streakCount}`;
}
function setMessage(text, type = '') {
  els.message.textContent = text;
  els.message.className = `message ${type}`.trim();
}
function hideStreakPopup() {
  window.clearTimeout(state.streakTimer);
  if (els.streakPopup) {
    els.streakPopup.hidden = true;
    els.streakPopup.classList.remove('show');
  }
}
function showStreakPopup(count) {
  if (!els.streakPopup || !els.streakPopupText) return;
  window.clearTimeout(state.streakTimer);
  els.streakPopupText.textContent = t('streakPopupText').replace('{count}', String(count));
  els.streakPopup.hidden = false;
  requestAnimationFrame(() => els.streakPopup.classList.add('show'));
  state.streakTimer = window.setTimeout(hideStreakPopup, 3200);
}
function registerCorrect() {
  state.correctCount++;
  state.streakCount++;
}
function registerWrong() {
  state.wrongCount++;
  showStreakPopup(state.streakCount);
  state.streakCount = 0;
}
function updatePlayButtonVisibility() {
  if (!els.playInterval) return;
  const isIntervalMode = els.mode.value === MODES.intervals;
  els.playInterval.hidden = !isIntervalMode;
  if (els.pianoClip && !isIntervalMode) els.pianoClip.hidden = true;
}
function generateQuestion() {
  window.clearTimeout(state.timer);
  clearPlayTimers();
  setMessage('', '');
  state.noteQ = state.keyQ = state.intervalQ = state.symbolQ = null;
  els.answers.innerHTML = '';

  if (els.mode.value === MODES.notes) { buildNoteQuestion(); buildNoteButtons(); }
  else if (els.mode.value === MODES.keys) { buildKeyQuestion(); buildChoiceButtons(state.keyQ.options.map(keyDisplayName), handleKeyAnswer); }
  else if (els.mode.value === MODES.intervals) { buildIntervalQuestion(); buildIntervalButtons(); }
  else { buildSymbolQuestion(); buildChoiceButtons(shuffle(state.symbolQ.options), handleSymbolAnswer); }
  updatePrompt();
  drawCanvas();
  updatePlayButtonVisibility();
}
function currentKeys() {
  let keys = getFilteredKeys(els.tonality.value, els.family.value, Number(els.signs.value));
  if (!keys.length) keys = getFilteredKeys(els.tonality.value === 'minor' ? 'minor' : 'major', 'both', 7);
  return keys;
}
function noteAccidentalPool() {
  if (!els.accidentals.checked) return [0];
  if (els.family.value === 'sharps') return [0, 0, 1, 1, 2];
  if (els.family.value === 'flats') return [0, 0, -1, -1, -2];
  return [-2, -1, -1, 0, 0, 0, 1, 1, 2];
}
function buildNoteQuestion() {
  const clef = selectedClef();
  const note = cloneNote(pick(clef === 'Treble' ? trebleRange() : bassRange()));
  note.accidental = pick(noteAccidentalPool());
  state.noteQ = { clef, keySignature: majorKeys[0], note, promptKey: 'notePrompt' };
}
function buildKeyQuestion() {
  const clef = selectedClef();
  let keys = currentKeys();
  if (keys.length < 4) keys = getFilteredKeys(els.tonality.value, 'both', 7);
  if (keys.length < 4) keys = getFilteredKeys(els.tonality.value === 'minor' ? 'minor' : 'major', 'both', 7);
  const correct = pick(keys);
  const opts = new Set([correct.name]);
  while (opts.size < 4) opts.add(pick(keys).name);
  state.keyQ = { clef, keySignature: correct, correctAnswer: correct.name, options: shuffle([...opts]), promptKey: 'keyPrompt' };
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
function buildSymbolQuestion() {
  const recent = new Set(state.recentSymbols);
  let candidates = symbolQuestions.map((_, i) => i).filter(i => !recent.has(i));
  if (!candidates.length) { state.recentSymbols = []; candidates = symbolQuestions.map((_, i) => i); }
  const ix = pick(candidates);
  state.recentSymbols.push(ix);
  while (state.recentSymbols.length > 18) state.recentSymbols.shift();
  state.symbolQ = localizeQuestion(symbolQuestions[ix]);
}
function buildNoteButtons() {
  const suffix = accidentalText(state.noteQ?.note?.accidental || 0);
  for (let i = 0; i < 7; i++) {
    const text = `${els.naming.value === 'solfege' ? solfegeNames[i] : letterNames[i]}${suffix}`;
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
  els.prompt.textContent =
    els.mode.value === MODES.notes && state.noteQ ? t(state.noteQ.promptKey) :
    els.mode.value === MODES.keys && state.keyQ ? t(state.keyQ.promptKey) :
    els.mode.value === MODES.intervals && state.intervalQ ? t(state.intervalQ.promptKey) :
    state.symbolQ ? state.symbolQ.prompt : '';
}
function finishAnswer() {
  updateScoreLabels();
  window.clearTimeout(state.timer);
  state.timer = window.setTimeout(generateQuestion, MESSAGE_DELAY_MS);
}
function handleNoteAnswer(guess) {
  const expected = noteText(state.noteQ.note, els.naming.value);
  if (guess === state.noteQ.note.stepIndex) { registerCorrect(); setMessage(`${t('correctMsg')} ${t('noteIs')} ${expected}.`, 'good'); }
  else { registerWrong(); setMessage(`${t('wrongMsg')} ${t('correctAnswerIs')} ${expected}.`, 'bad'); }
  finishAnswer();
}
function handleIntervalAnswer(guess) {
  if (guess === state.intervalQ.interval.label) { registerCorrect(); setMessage(`${t('correctMsg')} ${t('intervalIs')} ${state.intervalQ.interval.label}.`, 'good'); }
  else { registerWrong(); setMessage(`${t('wrongMsg')} ${t('intervalIs')} ${state.intervalQ.interval.label}.`, 'bad'); }
  finishAnswer();
}
function handleKeyAnswer(selected) {
  if (selected === keyDisplayName(state.keyQ.correctAnswer)) {
    registerCorrect();
    setMessage(`${t('correctMsg')} ${keyDisplayName(state.keyQ.correctAnswer)}.`, 'good');
  } else {
    registerWrong();
    setMessage(`${t('wrongMsg')} ${t('correctAnswerIs')} ${keyDisplayName(state.keyQ.correctAnswer)}.`, 'bad');
  }
  finishAnswer();
}
function handleSymbolAnswer(selected) {
  if (selected === state.symbolQ.correctAnswer) { registerCorrect(); setMessage(`${t('correctMsg')} ${state.symbolQ.explanation}`, 'good'); }
  else { registerWrong(); setMessage(`${t('wrongMsg')} ${state.symbolQ.explanation}`, 'bad'); }
  finishAnswer();
}

function drawCanvas() {
  ctx.save();
  ctx.clearRect(0, 0, 640, 260);
  ctx.fillStyle = 'whitesmoke';
  ctx.fillRect(0, 0, 640, 260);
  ctx.textBaseline = 'alphabetic';
  if (els.mode.value === MODES.symbols) { drawSymbolDecoration(30, 62); ctx.restore(); return; }
  const clef = els.mode.value === MODES.notes ? state.noteQ?.clef : els.mode.value === MODES.keys ? state.keyQ?.clef : state.intervalQ?.clef || 'Treble';
  const startX = 24, staffTopY = STAFF.staffTopY, clefTopY = STAFF.clefTopY;
  drawStaff(startX, staffTopY, 592);
  let x = drawClef(clef, startX + 4, clefTopY);
  const key = els.mode.value === MODES.keys ? state.keyQ?.keySignature : null;
  if (key) x = drawKeySignature(clef, key, x + 10, staffTopY);

  if (els.mode.value === MODES.notes && state.noteQ) {
    drawNote(clef, state.noteQ.note, x + 118, staffTopY);
  } else if (els.mode.value === MODES.intervals && state.intervalQ) {
    drawNote(clef, state.intervalQ.bottomNote, x + 126, staffTopY);
    drawNote(clef, state.intervalQ.topNote, x + 246, staffTopY);
  }
  ctx.restore();
}
function drawSymbolDecoration(x, y) {
  ctx.fillStyle = 'black';
  ctx.font = '700 64px "Segoe UI Symbol", "Noto Music", serif';
  ctx.fillText('𝄞', x + 10, y + 38);
  ctx.font = '700 46px "Segoe UI Symbol", "Noto Music", serif';
  ctx.fillText('p   mf   ff   >   •   𝄐', x + 88, y + 70);
  ctx.fillStyle = 'dimgray';
  ctx.font = '700 18px Segoe UI, sans-serif';
  ctx.fillText(t('multipleChoice'), x + 130, y + 118);
}
function drawStaff(x, y, w) {
  ctx.strokeStyle = 'black';
  ctx.lineWidth = STAFF.lineWidth;
  for (let i = 0; i < 5; i++) line(x, y + i * STAFF.lineSpacing, x + w, y + i * STAFF.lineSpacing);
}
function drawClef(clef, x, y) {
  ctx.fillStyle = 'black';
  ctx.textBaseline = 'alphabetic';
  if (clef === 'Treble') {
    // Оставено без промяна.
    ctx.font = '148px "Segoe UI Symbol", "Noto Music", "Bravura", serif';
    ctx.fillText('𝄞', x - 12, y + 128);
    return x + STAFF.clefAdvanceTreble;
  }

  // Коригиран ключ Фа според референтните изображения.
  // Центърът на знака е свален и изместен леко вдясно,
  // без да се променя позицията на ключ Сол.
  ctx.font = '118px "Segoe UI Symbol", "Noto Music", "Bravura", serif';
  ctx.fillText('𝄢', x + 6, y + 96);
  return x + 96;
}
function drawKeySignature(clef, key, x, y) {
  const count = Math.abs(key.fifths);
  if (count === 0) return x;
  const positions = key.usesSharps
    ? (clef === 'Treble' ? [8, 5, 9, 6, 3, 7, 4] : [6, 3, 7, 4, 1, 5, 2])
    : (clef === 'Treble' ? [4, 7, 3, 6, 2, 5, 1] : [2, 5, 1, 4, 0, 3, -1]);
  const glyph = key.usesSharps ? '♯' : '♭';
  for (let i = 0; i < count; i++) {
    const yy = yFromStaffIndex(y, positions[i]);
    if (key.usesSharps) drawAccidentalGlyph('♯', x + i * 24, yy, true, true);
    else drawAccidentalGlyph('♭', x + i * 24, yy, true, true);
  }
  return x + count * 24;
}
function drawAccidentalGlyph(accidental, x, yy, isKeySignature = false, rawGlyph = false) {
  const glyph = rawGlyph ? accidental : accidentalText(accidental);
  let font = 56, dx = -46, dy = 17;
  if (glyph === '♭') { font = 66; dx = -40; dy = 22; }
  if (glyph === '𝄫') { font = 60; dx = -44; dy = 18; }
  if (glyph === '𝄪') { font = 48; dx = -48; dy = 16; }
  if (isKeySignature) {
    if (glyph === '♯') { font = 40; dx = 0; dy = 13; }
    if (glyph === '♭') { font = 44; dx = 0; dy = 16; }
  }
  ctx.fillStyle = 'black';
  ctx.font = `700 ${font}px "Segoe UI Symbol", "Noto Music", "Bravura", serif`;
  ctx.fillText(glyph, x + dx, yy + dy);
}
function drawNote(clef, note, x, y) {
  const idx = getStaffIndex(clef, note);
  const yy = yFromStaffIndex(y, idx);
  const stemDown = idx >= 4;
  drawLedgerLines(x, y, idx);
  if (note.accidental !== 0) drawAccidentalGlyph(note.accidental, x, yy);
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.ellipse(x + 16, yy, STAFF.noteHeadW / 2, STAFF.noteHeadH / 2, -0.28, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = 'black';
  ctx.lineWidth = STAFF.stemWidth;
  if (stemDown) line(x + 4, yy - 2, x + 4, yy + STAFF.stemHeight);
  else line(x + 30, yy - 1, x + 30, yy - STAFF.stemHeight);
}
function drawLedgerLines(x, topY, idx) {
  ctx.strokeStyle = 'black';
  ctx.lineWidth = STAFF.lineWidth;
  if (idx < 0) {
    for (let i = -2; i >= idx; i -= 2) line(x - 10, yFromStaffIndex(topY, i), x + 44, yFromStaffIndex(topY, i));
  } else if (idx > 8) {
    for (let i = 10; i <= idx; i += 2) line(x - 10, yFromStaffIndex(topY, i), x + 44, yFromStaffIndex(topY, i));
  }
}
function getStaffIndex(clef, n) {
  const abs = n.octave * 7 + n.stepIndex;
  const ref = clef === 'Treble' ? 4 * 7 + 2 : 2 * 7 + 4;
  return abs - ref;
}
function yFromStaffIndex(topY, idx) { return topY + STAFF.lineSpacing * 4 - idx * (STAFF.lineSpacing / 2); }
function line(x1, y1, x2, y2) { ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); }


function midiToFrequency(midi) { return 440 * Math.pow(2, (midi - 69) / 12); }
function equalLoudnessGain(freq) {
  // Perceptual and speaker response compensation: low notes get a gentle boost,
  // very high notes are held back a little, and the master compressor prevents spikes.
  return clamp(Math.pow(440 / freq, 0.28), 0.72, 1.55);
}
function clearPlayTimers() {
  state.playTimers.forEach(id => window.clearTimeout(id));
  state.playTimers = [];
  document.querySelectorAll('.piano-key.active').forEach(k => k.classList.remove('active'));
}
function getAudioContext() {
  const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextCtor) return null;
  if (!state.audioCtx) state.audioCtx = new AudioContextCtor();
  if (!state.audioMaster) {
    const compressor = state.audioCtx.createDynamicsCompressor();
    compressor.threshold.setValueAtTime(-20, state.audioCtx.currentTime);
    compressor.knee.setValueAtTime(18, state.audioCtx.currentTime);
    compressor.ratio.setValueAtTime(3.2, state.audioCtx.currentTime);
    compressor.attack.setValueAtTime(0.006, state.audioCtx.currentTime);
    compressor.release.setValueAtTime(0.18, state.audioCtx.currentTime);
    const masterGain = state.audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.32, state.audioCtx.currentTime);
    compressor.connect(masterGain).connect(state.audioCtx.destination);
    state.audioMaster = compressor;
  }
  if (state.audioCtx.state === 'suspended') state.audioCtx.resume();
  return state.audioCtx;
}
function playPianoTone(midi, startOffset = 0, duration = 0.75) {
  const audio = getAudioContext();
  if (!audio) return;
  const start = audio.currentTime + startOffset;
  const freq = midiToFrequency(midi);
  const gain = audio.createGain();
  const filter = audio.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(3200, start);
  const compensatedPeak = 0.18 * equalLoudnessGain(freq);
  const compensatedSustain = compensatedPeak * 0.34;
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(compensatedPeak, start + 0.018);
  gain.gain.exponentialRampToValueAtTime(compensatedSustain, start + 0.18);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  for (const [type, mult, vol] of [['triangle', 1, 1], ['sine', 2, 0.28], ['sine', 3, 0.14]]) {
    const osc = audio.createOscillator();
    const partialGain = audio.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq * mult, start);
    partialGain.gain.setValueAtTime(vol, start);
    osc.connect(partialGain).connect(filter);
    osc.start(start);
    osc.stop(start + duration + 0.04);
  }
  filter.connect(gain).connect(state.audioMaster || audio.destination);
}
function keyboardStartMidi(lowMidi, highMidi) {
  const base = Math.max(36, Math.min(lowMidi, highMidi) - 6);
  return base - (base % 12);
}
function renderPianoClip(lowMidi, highMidi) {
  if (!els.pianoClip) return;
  const start = keyboardStartMidi(lowMidi, highMidi);
  const notes = Array.from({ length: 25 }, (_, i) => start + i);
  const black = new Set([1, 3, 6, 8, 10]);
  els.pianoClip.innerHTML = `<div class="piano-caption">${t('playingInterval')}</div><div class="piano-keyboard" aria-hidden="true"></div>`;
  const kb = els.pianoClip.querySelector('.piano-keyboard');
  notes.forEach(midi => {
    const key = document.createElement('div');
    key.className = `piano-key ${black.has(midi % 12) ? 'black' : 'white'}`;
    key.dataset.midi = String(midi);
    kb.append(key);
  });
  els.pianoClip.hidden = false;
}
function highlightPianoKeys(...midis) {
  document.querySelectorAll('.piano-key.active').forEach(k => k.classList.remove('active'));
  midis.forEach(midi => {
    const key = document.querySelector(`.piano-key[data-midi="${midi}"]`);
    if (key) key.classList.add('active');
  });
}
function playIntervalClip() {
  if (!state.intervalQ) return;
  clearPlayTimers();
  const lowMidi = toMidi(state.intervalQ.bottomNote);
  const highMidi = toMidi(state.intervalQ.topNote);
  renderPianoClip(lowMidi, highMidi);
  setMessage(t('playingInterval'), 'info');
  playPianoTone(lowMidi, 0, 0.75);
  playPianoTone(highMidi, 0.82, 0.75);
  playPianoTone(lowMidi, 1.65, 1.0);
  playPianoTone(highMidi, 1.65, 1.0);
  state.playTimers.push(window.setTimeout(() => highlightPianoKeys(lowMidi), 0));
  state.playTimers.push(window.setTimeout(() => highlightPianoKeys(highMidi), 820));
  state.playTimers.push(window.setTimeout(() => highlightPianoKeys(lowMidi, highMidi), 1650));
  state.playTimers.push(window.setTimeout(() => { clearPlayTimers(); if (els.pianoClip) els.pianoClip.hidden = true; setMessage('', ''); }, 2850));
}

function validateSigns() {
  const value = clamp(parseInt(els.signs.value, 10), 0, 7);
  els.signs.value = String(value);
}

document.querySelectorAll('[data-start-mode]').forEach(btn => btn.addEventListener('click', () => startGame(btn.dataset.startMode)));
els.reset.addEventListener('click', () => { resetScore(); generateQuestion(); });
els.next.addEventListener('click', () => { window.clearTimeout(state.timer); registerWrong(); setMessage(t('skipped'), 'warn'); updateScoreLabels(); state.timer = window.setTimeout(generateQuestion, MESSAGE_DELAY_MS); });
els.mainMenu.addEventListener('click', () => { window.clearTimeout(state.timer); clearPlayTimers(); showScreen('menu'); });
els.mode.addEventListener('change', () => { resetScore(); generateQuestion(); });
els.playInterval.addEventListener('click', playIntervalClip);
[els.naming, els.clef, els.tonality, els.family, els.accidentals].forEach(el => el.addEventListener('change', generateQuestion));
els.signs.addEventListener('input', () => { validateSigns(); generateQuestion(); });
els.lang.addEventListener('change', () => { currentLang = els.lang.value; localStorage.setItem('noteableLanguage', currentLang); resetScore(); applyLanguage(); generateQuestion(); });
els.help.addEventListener('click', () => els.helpDialog.showModal());
els.closeHelp.addEventListener('click', () => els.helpDialog.close());
els.closeHelpTop.addEventListener('click', () => els.helpDialog.close());
els.closeStreakPopup.addEventListener('click', hideStreakPopup);
document.addEventListener('click', event => {
  const clickable = event.target.closest('button, .social-btn');
  if (!clickable) return;
  clickable.classList.remove('button-press');
  void clickable.offsetWidth;
  clickable.classList.add('button-press');
});
window.addEventListener('resize', drawCanvas);
applyLanguage();
updateScoreLabels();
