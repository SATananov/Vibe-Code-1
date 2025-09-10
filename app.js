// =========================
// Priority Planner — Eisenhower Matrix (BG/EN)
// Vanilla JS, no dependencies
// =========================

const $ = (q, root = document) => root.querySelector(q);

// Storage keys
const LS_KEY = 'pp_tasks_v1';
const THEME_KEY = 'pp_theme';
const LANG_KEY = 'pp_lang';

// I18N dictionary
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
        del:  'Delete (Del)'
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
        del:  'Изтрий (Del)'
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

// Language helpers (default EN)
let LANG = localStorage.getItem(LANG_KEY) || 'en';
const t = (path) => path.split('.').reduce((o, k) => (o && o[k] != null ? o[k] : ''), I18N[LANG]);

// Utilities / storage
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const load = () => { try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch { return []; } };
const save = (arr) => localStorage.setItem(LS_KEY, JSON.stringify(arr));

// State
let tasks = load();

// Theme toggle
const themeBtn = $('#themeBtn');
const applyTheme = (name) => {
  document.documentElement.setAttribute('data-theme', name);
  themeBtn.setAttribute('aria-pressed', name === 'dark' ? 'true' : 'false');
  themeBtn.title = t('ui.themeTitle');
  localStorage.setItem(THEME_KEY, name);
};
const savedTheme = localStorage.getItem(THEME_KEY);
if (savedTheme) applyTheme(savedTheme);
themeBtn.addEventListener('click', () => {
  const cur = document.documentElement.getAttribute('data-theme') || 'light';
  applyTheme(cur === 'light' ? 'dark' : 'light');
});

// Language toggle
const langBtn = $('#langBtn');
function applyLang(lang) {
  LANG = lang; localStorage.setItem(LANG_KEY, LANG);
  document.documentElement.lang = LANG === 'bg' ? 'bg' : 'en';
  document.title = t('ui.title');

  // Header
  $('#appTitle').textContent = t('ui.title');
  $('#appSubtitle').textContent = t('ui.subtitle');

  // Form
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

  // Help
  $('#helpTitle').textContent = t('ui.helpTitle');
  const helpList = $('#helpList'); helpList.innerHTML = '';
  t('ui.helpList').forEach(html => { const li = document.createElement('li'); li.innerHTML = html; helpList.appendChild(li); });

  // Footer + Lang button
  document.querySelector('footer').textContent = t('ui.footer');
  langBtn.textContent = t('ui.langBtnLabel');
  langBtn.title = t('ui.langBtnTitleTo');

  render();
}
langBtn.addEventListener('click', () => applyLang(LANG === 'bg' ? 'en' : 'bg'));

// Form refs
const form = $('#taskForm');
const titleInput = $('#title');
const noteInput = $('#note');
const impBtn = $('#impBtn');
const urgBtn = $('#urgBtn');
const errMsg = $('#errMsg');
const addBtn = $('#addBtn');
const clearAllBtn = $('#clearAllBtn');

// Toggle buttons (aria-pressed)
const togglePressed = (btn) => btn.setAttribute('aria-pressed', btn.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
impBtn.addEventListener('click', () => togglePressed(impBtn));
urgBtn.addEventListener('click', () => togglePressed(urgBtn));

// Submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const val = titleInput.value.trim();
  if (!val) { errMsg.textContent = t('str.pleaseTitle'); titleInput.focus(); return; }
  errMsg.textContent = '';
  tasks.push({
    id: uid(),
    title: val,
    note: noteInput.value.trim(),
    imp: impBtn.getAttribute('aria-pressed') === 'true',
    urg: urgBtn.getAttribute('aria-pressed') === 'true',
    done: false
  });
  save(tasks); render();
  form.reset(); impBtn.setAttribute('aria-pressed','true'); urgBtn.setAttribute('aria-pressed','false'); titleInput.focus();
});

// Clear all
clearAllBtn.addEventListener('click', () => {
  if (confirm(t('str.confirmClear'))) { tasks = []; save(tasks); render(); }
});

// Lists / empties
const listEls = [$('#q0'), $('#q1'), $('#q2'), $('#q3')];
const emptyEls = [$('#q0e'), $('#q1e'), $('#q2e'), $('#q3e')];

// Quadrant index
function qIndex(task){
  if (task.imp && task.urg) return 0;
  if (task.imp && !task.urg) return 1;
  if (!task.imp && task.urg) return 2;
  return 3;
}

// Actions
function toggleDone(id){
  const tsk = tasks.find(x => x.id === id); if (!tsk) return;
  tsk.done = !tsk.done; save(tasks); render();
}
function moveLR(id, dir){
  const tsk = tasks.find(x => x.id === id); if (!tsk) return;
  let idx = qIndex(tsk); idx = (idx + dir + 4) % 4;
  if (idx===0){ tsk.imp=true; tsk.urg=true; }
  else if (idx===1){ tsk.imp=true; tsk.urg=false; }
  else if (idx===2){ tsk.imp=false; tsk.urg=true; }
  else { tsk.imp=false; tsk.urg=false; }
  save(tasks); render(); const first = listEls[idx].querySelector('.task'); if (first) first.focus();
}
function moveTaskPrompt(id){
  const tsk = tasks.find(x => x.id === id); if (!tsk) return;
  const choice = prompt(t('str.moveTitle'), String(qIndex(tsk))); if (choice===null) return;
  const i = Number(choice);
  if ([0,1,2,3].includes(i)){
    if (i===0){ tsk.imp=true; tsk.urg=true; }
    if (i===1){ tsk.imp=true; tsk.urg=false; }
    if (i===2){ tsk.imp=false; tsk.urg=true; }
    if (i===3){ tsk.imp=false; tsk.urg=false; }
    save(tasks); render();
  } else { alert(t('str.moveErr')); }
}
function removeTask(id){
  const idx = tasks.findIndex(x => x.id === id); if (idx===-1) return;
  tasks.splice(idx,1); save(tasks); render();
}

// Create <li>
function taskEl(task){
  const li = document.createElement('li');
  li.className = 'task' + (task.done ? ' done' : '');
  li.tabIndex = 0; li.dataset.id = task.id; li.setAttribute('role','group'); li.setAttribute('aria-label', task.title);

  const left = document.createElement('div');
  const right = document.createElement('div'); right.className = 'task-actions';

  const titleEl = document.createElement('div'); titleEl.className = 'title'; titleEl.textContent = task.title;
  const noteEl = document.createElement('div'); noteEl.className = 'note'; noteEl.textContent = task.note || ''; if (!task.note) noteEl.style.display='none';

  const badges = document.createElement('div'); badges.className='badges';
  const b1 = document.createElement('span'); b1.className='badge imp'; b1.textContent = t('ui.badges.imp');
  const b2 = document.createElement('span'); b2.className='badge urg'; b2.textContent = t('ui.badges.urg');
  const b3 = document.createElement('span'); b3.className='badge done'; b3.textContent = t('ui.badges.done');
  if (task.imp) badges.appendChild(b1); if (task.urg) badges.appendChild(b2); if (task.done) badges.appendChild(b3);

  left.appendChild(titleEl); left.appendChild(noteEl); left.appendChild(badges);

  const btnDone = document.createElement('button');
  btnDone.className='icon-btn ok'; btnDone.type='button';
  btnDone.title=t('ui.actionsTitles.done'); btnDone.setAttribute('aria-label',t('ui.actionsTitles.done')); btnDone.textContent='✅';
  btnDone.addEventListener('click', () => toggleDone(task.id));

  const btnMove = document.createElement('button');
  btnMove.className='icon-btn'; btnMove.type='button';
  btnMove.title=t('ui.actionsTitles.move'); btnMove.setAttribute('aria-label',t('ui.actionsTitles.move')); btnMove.textContent='🔁';
  btnMove.addEventListener('click', () => moveTaskPrompt(task.id));

  const btnDel = document.createElement('button');
  btnDel.className='icon-btn del'; btnDel.type='button';
  btnDel.title=t('ui.actionsTitles.del'); btnDel.setAttribute('aria-label',t('ui.actionsTitles.del')); btnDel.textContent='🗑️';
  btnDel.addEventListener('click', () => removeTask(task.id));

  right.appendChild(btnDone); right.appendChild(btnMove); right.appendChild(btnDel);
  li.appendChild(left); li.appendChild(right);

  li.addEventListener('keydown', (ev) => {
    if (ev.key===' '){ ev.preventDefault(); toggleDone(task.id); }
    else if (ev.key==='Enter'){ ev.preventDefault(); toggleDone(task.id); }
    else if (ev.key==='Delete'){ removeTask(task.id); }
    else if (ev.key==='ArrowLeft'){ ev.preventDefault(); moveLR(task.id,-1); }
    else if (ev.key==='ArrowRight'){ ev.preventDefault(); moveLR(task.id, +1); }
  });
  return li;
}

// Render
function render(){
  ['q0','q1','q2','q3'].forEach((id,i)=>{
    const ul = document.getElementById(id); ul.innerHTML='';
    const items = tasks.filter(tk => qIndex(tk)===i);
    if (items.length===0) document.getElementById(id+'e').style.display='block';
    else { document.getElementById(id+'e').style.display='none'; items.forEach(tk => ul.appendChild(taskEl(tk))); }
  });
}

// Enter to submit in title
titleInput.addEventListener('keydown', (e) => { if (e.key==='Enter'){ e.preventDefault(); addBtn.click(); } });

// Boot
applyLang(LANG); // sets texts and renders
const saved = localStorage.getItem(THEME_KEY); if (!saved) applyTheme('light');
// Quality: offline only; keyboard (Tab/Enter/Space/Arrows/Delete); no console errors expected.
