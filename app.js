const $ = (q, root = document) => root.querySelector(q);
const $$ = (q, root = document) => Array.from(root.querySelectorAll(q));


const LS_KEY = 'pp_tasks_v1';
const THEME_KEY = 'pp_theme';
const LANG_KEY = 'pp_lang';


const I18N = {
  en: {
    ui: {
      title: 'Priority Planner — Eisenhower Matrix',
      subtitle: 'Capture tasks and sort them by Importance × Urgency. Keyboard-friendly, offline, no libs.',
      themeTitle: 'Toggle light/dark theme',
      langBtnLabel: '🌐 EN',
      langBtnTitleTo: 'Switch language to Български',
      formTitle: '➕ Add a Task',
      tipAdd: 'Tip: Enter ⏎ to add',
      labelTitle: 'Title',
      placeholderTitle: 'e.g., Prepare slides for Monday meeting',
      labelNote: 'Optional note',
      placeholderNote: 'Short details…',
      btnImportant: '⭐ Important',
      btnUrgent: '⏰ Urgent',
      btnAdd: 'Add Task',
      btnClearAll: 'Clear All',
      clearAllTitle: 'Clear all tasks',
      q0Title: '🔥 Do First', q0Hint: '(Important & Urgent)', q0Empty: 'No tasks here yet. These are critical and time-sensitive.',
      q1Title: '📅 Schedule', q1Hint: '(Important, Not Urgent)', q1Empty: 'Plan these into your calendar to avoid last-minute rush.',
      q2Title: '📨 Delegate', q2Hint: '(Not Important, Urgent)', q2Empty: 'Consider delegating or setting quick limits.',
      q3Title: '🧹 Eliminate', q3Hint: '(Not Important, Not Urgent)', q3Empty: 'Low-value tasks. Remove or batch them tightly.',
      helpTitle: '❓ How to use',
      helpList: [
        'Type a <strong>Title</strong>, optionally add a note. Set <strong>⭐ Important</strong> and <strong>⏰ Urgent</strong> as needed.',
        'Press <strong>Enter</strong> or click <em>Add Task</em>. Items appear in one of the four quadrants.',
        '<strong>Keyboard:</strong> Tab to a task → <kbd>Space</kbd>/<kbd>Enter</kbd> toggles done, <kbd>Delete</kbd> removes, <kbd>← / →</kbd> moves it.',
        'Use the buttons: ✅ mark done, 🔁 move, 🗑 delete.',
        'Everything is saved locally (localStorage). Works offline.',
        'Toggle <strong>Theme</strong> (🌓) anytime.'
      ],
      footer: 'Built with ♥ — Priority Planner (MIT). No external libraries. © 2025',
      badges: { imp: 'Important', urg: 'Urgent', done: 'Done' },
      actionsTitles: {
        done: 'Mark done (Space / Enter)',
        move: 'Move across quadrants (← / →)',
        del: 'Delete (Del)'
      }
    },
    str: {
      pleaseTitle: 'Please enter a title.',
      confirmClear: 'Delete ALL tasks? This cannot be undone.',
      moveTitle: 'Move to:\n0) Do First (Imp+Urg)\n1) Schedule (Imp)\n2) Delegate (Urg)\n3) Eliminate (Neither)\nEnter 0-3:',
      moveErr: 'Please enter a number between 0 and 3.'
    }
  },
  bg: {
    ui: {
      title: 'Планер на приоритети — Матрица на Айзенхауер',
      subtitle: 'Записвай задачите и ги подреждай по Важност × Спешност. Поддръжка на клавиатура, офлайн, без библиотеки.',
      themeTitle: 'Превключи светла/тъмна тема',
      langBtnLabel: '🌐 BG',
      langBtnTitleTo: 'Switch language to English',
      formTitle: '➕ Добави задача',
      tipAdd: 'Съвет: Enter ⏎ за добавяне',
      labelTitle: 'Заглавие',
      placeholderTitle: 'напр. Подготви слайдове за понеделник',
      labelNote: 'Бележка (по избор)',
      placeholderNote: 'Кратки детайли…',
      btnImportant: '⭐ Важна',
      btnUrgent: '⏰ Спешна',
      btnAdd: 'Добави задача',
      btnClearAll: 'Изчисти всички',
      clearAllTitle: 'Изчисти всички задачи',
      q0Title: '🔥 Изпълни веднага', q0Hint: '(Важна и спешна)', q0Empty: 'Все още няма задачи тук. Това са критичните и спешни.',
      q1Title: '📅 Насрочи', q1Hint: '(Важна, не спешна)', q1Empty: 'Планирай тези задачи в календара, за да избегнеш напрежение в последния момент.',
      q2Title: '📨 Делегирай', q2Hint: '(Не е важна, но е спешна)', q2Empty: 'Помисли за делегиране или за кратки времеви рамки.',
      q3Title: '🧹 Елиминирай', q3Hint: '(Не е важна, не е спешна)', q3Empty: 'Ниска стойност — премахни или групирай заедно.',
      helpTitle: '❓ Как да използвам',
      helpList: [
        'Въведи <strong>Заглавие</strong> и по желание бележка. Задай <strong>⭐ Важна</strong> и <strong>⏰ Спешна</strong> при нужда.',
        'Натисни <strong>Enter</strong> или бутона <em>Добави задача</em>. Елементите се появяват в съответния квадрант.',
        '<strong>Клавиатура:</strong> Tab до задача → <kbd>Space</kbd>/<kbd>Enter</kbd> маркира като готова, <kbd>Delete</kbd> изтрива, <kbd>← / →</kbd> премества.',
        'Бутони: ✅ готова, 🔁 премести, 🗑 изтрий.',
        'Всичко се пази в браузъра (localStorage). Работи офлайн.',
        'Превключвай <strong>Тема</strong> (🌓) по всяко време.'
      ],
      footer: 'Изградено с ♥ — Priority Planner (MIT). Без външни библиотеки. © 2025',
      badges: { imp: 'Важна', urg: 'Спешна', done: 'Готово' },
      actionsTitles: {
        done: 'Маркирай като готова (Space / Enter)',
        move: 'Премести между квадранти (← / →)',
        del: 'Изтрий (Del)'
      }
    },
    str: {
      pleaseTitle: 'Моля, въведи заглавие.',
      confirmClear: 'Да изтрия ВСИЧКИ задачи? Действието е необратимо.',
      moveTitle: 'Премести в:\n0) Изпълни веднага (Важна+Спешна)\n1) Насрочи (Важна)\n2) Делегирай (Спешна)\n3) Елиминирай (Нито)\nВъведи 0–3:',
      moveErr: 'Моля, въведи число между 0 и 3.'
    }
  }
};


let LANG = localStorage.getItem(LANG_KEY) || 'bg';
const t = (path) => {
  const parts = path.split('.');
  return parts.reduce((acc, k) => (acc && acc[k] != null ? acc[k] : ''), I18N[LANG]);
};

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const load = () => { try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch { return []; } };
const save = (tasks) => localStorage.setItem(LS_KEY, JSON.stringify(tasks));


let tasks = load();


const themeBtn = $('#themeBtn');
const applyTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  themeBtn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
  themeBtn.title = t('ui.themeTitle');
  localStorage.setItem(THEME_KEY, theme);
};
const savedTheme = localStorage.getItem(THEME_KEY);
if (savedTheme) applyTheme(savedTheme);
themeBtn.addEventListener('click', () => {
  const cur = document.documentElement.getAttribute('data-theme') || 'light';
  applyTheme(cur === 'light' ? 'dark' : 'light');
});


const langBtn = $('#langBtn');
function applyLang(lang) {
  LANG = lang;
  localStorage.setItem(LANG_KEY, LANG);
  document.documentElement.lang = LANG === 'bg' ? 'bg' : 'en';
  document.title = t('ui.title');

 
  $('#appTitle').textContent = t('ui.title');
  $('#appSubtitle').textContent = t('ui.subtitle');


  $('#formTitle').textContent = t('ui.formTitle');
  $('#tipAdd').textContent = t('ui.tipAdd');
  $('#labelTitle').textContent = t('ui.labelTitle');
  $('#title').placeholder = t('ui.placeholderTitle');
  $('#labelNote').textContent = t('ui.labelNote');
  $('#note').placeholder = t('ui.placeholderNote');
  $('#impBtn').textContent = t('ui.btnImportant');
  $('#urgBtn').textContent = t('ui.btnUrgent');
  $('#addBtn').textContent = t('ui.btnAdd');
  $('#clearAllBtn').textContent = t('ui.btnClearAll');
  $('#clearAllBtn').title = t('ui.clearAllTitle');

  // Quadrants
  $('#q0t').textContent = t('ui.q0Title'); $('#q0hint').textContent = t('ui.q0Hint'); $('#q0e').textContent = t('ui.q0Empty');
  $('#q1t').textContent = t('ui.q1Title'); $('#q1hint').textContent = t('ui.q1Hint'); $('#q1e').textContent = t('ui.q1Empty');
  $('#q2t').textContent = t('ui.q2Title'); $('#q2hint').textContent = t('ui.q2Hint'); $('#q2e').textContent = t('ui.q2Empty');
  $('#q3t').textContent = t('ui.q3Title'); $('#q3hint').textContent = t('ui.q3Hint'); $('#q3e').textContent = t('ui.q3Empty');

 
  $('#helpTitle').textContent = t('ui.helpTitle');
  const helpList = $('#helpList');
  helpList.innerHTML = '';
  t('ui.helpList').forEach(html => {
    const li = document.createElement('li');
    li.innerHTML = html;
    helpList.appendChild(li);
  });

 
  $('footer').textContent = t('ui.footer');

  langBtn.textContent = t('ui.langBtnLabel');
  langBtn.title = t('ui.langBtnTitleTo');

  
  render();
}
langBtn.addEventListener('click', () => applyLang(LANG === 'bg' ? 'en' : 'bg'));


const form = $('#taskForm');
const titleInput = $('#title');
const noteInput = $('#note');
const impBtn = $('#impBtn');
const urgBtn = $('#urgBtn');
const errMsg = $('#errMsg');
const addBtn = $('#addBtn');
const clearAllBtn = $('#clearAllBtn');

const togglePressed = (btn) => {
  const now = btn.getAttribute('aria-pressed') === 'true' ? 'false' : 'true';
  btn.setAttribute('aria-pressed', now);
};
impBtn.addEventListener('click', () => togglePressed(impBtn));
urgBtn.addEventListener('click', () => togglePressed(urgBtn));


form.addEventListener('submit', (e) => {
  e.preventDefault();
  const tval = titleInput.value.trim();
  if (!tval) {
    errMsg.textContent = t('str.pleaseTitle');
    titleInput.focus();
    return;
  }
  errMsg.textContent = '';
  const task = {
    id: uid(),
    title: tval,
    note: noteInput.value.trim(),
    imp: impBtn.getAttribute('aria-pressed') === 'true',
    urg: urgBtn.getAttribute('aria-pressed') === 'true',
    done: false
  };
  tasks.push(task);
  save(tasks);
  render();
  form.reset();
  impBtn.setAttribute('aria-pressed', 'true');
  urgBtn.setAttribute('aria-pressed', 'false');
  titleInput.focus();
});


clearAllBtn.addEventListener('click', () => {
  if (confirm(t('str.confirmClear'))) {
    tasks = [];
    save(tasks);
    render();
  }
});


const listEls = [$('#q0'), $('#q1'), $('#q2'), $('#q3')];
const emptyEls = [$('#q0e'), $('#q1e'), $('#q2e'), $('#q3e')];


function qIndex(task) {
  if (task.imp && task.urg) return 0;
  if (task.imp && !task.urg) return 1;
  if (!task.imp && task.urg) return 2;
  return 3;
}


function toggleDone(id) {
  const tsk = tasks.find((x) => x.id === id);
  if (!tsk) return;
  tsk.done = !tsk.done;
  save(tasks);
  render();
}

function moveLR(id, dir) {
  const tsk = tasks
