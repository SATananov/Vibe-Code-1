const STR = {
  pleaseTitle: 'Please enter a title.',
  confirmClear: 'Delete ALL tasks? This cannot be undone.',
  moveTitle: 'Move to:\n0) Do First (Imp+Urg)\n1) Schedule (Imp)\n2) Delegate (Urg)\n3) Eliminate (Neither)\nEnter 0-3:',
  moveErr: 'Please enter a number between 0 and 3.',
};

const $ = (q, root = document) => root.querySelector(q);
const $$ = (q, root = document) => Array.from(root.querySelectorAll(q));

const LS_KEY = 'pp_tasks_v1';
const THEME_KEY = 'pp_theme';

const uid = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

const load = () => {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || '[]');
  } catch {
    return [];
  }
};
const save = (tasks) => localStorage.setItem(LS_KEY, JSON.stringify(tasks));

let tasks = load();

const themeBtn = $('#themeBtn');
const applyTheme = (t) => {
  document.documentElement.setAttribute('data-theme', t);
  themeBtn.setAttribute('aria-pressed', t === 'dark' ? 'true' : 'false');
  localStorage.setItem(THEME_KEY, t);
};
const savedTheme = localStorage.getItem(THEME_KEY);
if (savedTheme) applyTheme(savedTheme);
themeBtn.addEventListener('click', () => {
  const cur = document.documentElement.getAttribute('data-theme') || 'light';
  applyTheme(cur === 'light' ? 'dark' : 'light');
});

// ---- Form refs ----
const form = $('#taskForm');
const title = $('#title');
const note = $('#note');
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
  const t = title.value.trim();
  if (!t) {
    errMsg.textContent = STR.pleaseTitle;
    title.focus();
    return;
  }
  errMsg.textContent = '';
  const task = {
    id: uid(),
    title: t,
    note: note.value.trim(),
    imp: impBtn.getAttribute('aria-pressed') === 'true',
    urg: urgBtn.getAttribute('aria-pressed') === 'true',
    done: false,
  };
  tasks.push(task);
  save(tasks);
  render();
  form.reset();
  impBtn.setAttribute('aria-pressed', 'true');
  urgBtn.setAttribute('aria-pressed', 'false');
  title.focus();
});

// ---- Clear all ----
clearAllBtn.addEventListener('click', () => {
  if (confirm(STR.confirmClear)) {
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
  const t = tasks.find((x) => x.id === id);
  if (!t) return;
  t.done = !t.done;
  save(tasks);
  render();
}

function moveLR(id, dir) {
  const t = tasks.find((x) => x.id === id);
  if (!t) return;
  let idx = qIndex(t);
  idx = (idx + dir + 4) % 4;
  if (idx === 0) {
    t.imp = true; t.urg = true;
  } else if (idx === 1) {
    t.imp = true; t.urg = false;
  } else if (idx === 2) {
    t.imp = false; t.urg = true;
  } else {
    t.imp = false; t.urg = false;
  }
  save(tasks);
  render();
  const first = listEls[idx].querySelector('.task');
  if (first) first.focus();
}

function moveTaskPrompt(id) {
  const t = tasks.find((x) => x.id === id);
  if (!t) return;
  const choice = prompt(STR.moveTitle, String(qIndex(t)));
  if (choice === null) return;
  const i = Number(choice);
  if ([0, 1, 2, 3].includes(i)) {
    if (i === 0) { t.imp = true; t.urg = true; }
    if (i === 1) { t.imp = true; t.urg = false; }
    if (i === 2) { t.imp = false; t.urg = true; }
    if (i === 3) { t.imp = false; t.urg = false; }
    save(tasks);
    render();
  } else {
    alert(STR.moveErr);
  }
}

function removeTask(id) {
  const idx = tasks.findIndex((x) => x.id === id);
  if (idx === -1) return;
  tasks.splice(idx, 1);
  save(tasks);
  render();
}

function taskEl(task) {
  const li = document.createElement('li');
  li.className = 'task' + (task.done ? ' done' : '');
  li.tabIndex = 0;
  li.dataset.id = task.id;
  li.setAttribute('role', 'group');
  li.setAttribute('aria-label', task.title);

  const left = document.createElement('div');
  const right = document.createElement('div');
  right.className = 'task-actions';

  const titleEl = document.createElement('div');
  titleEl.className = 'title';
  titleEl.textContent = task.title;

  const noteEl = document.createElement('div');
  noteEl.className = 'note';
  noteEl.textContent = task.note || '';
  if (!task.note) noteEl.style.display = 'none';

  const badges = document.createElement('div');
  badges.className = 'badges';
  const b1 = document.createElement('span'); b1.className = 'badge imp'; b1.textContent = 'Important';
  const b2 = document.createElement('span'); b2.className = 'badge urg'; b2.textContent = 'Urgent';
  const b3 = document.createElement('span'); b3.className = 'badge done'; b3.textContent = 'Done';
  if (task.imp) badges.appendChild(b1);
  if (task.urg) badges.appendChild(b2);
  if (task.done) badges.appendChild(b3);

  left.appendChild(titleEl);
  left.appendChild(noteEl);
  left.appendChild(badges);

  const btnDone = document.createElement('button');
  btnDone.className = 'icon-btn ok';
  btnDone.type = 'button';
  btnDone.title = 'Mark done (Space / Enter)';
  btnDone.setAttribute('aria-label', 'Toggle done');
  btnDone.textContent = '✅';
  btnDone.addEventListener('click', () => toggleDone(task.id));

  const btnMove = document.createElement('button');
  btnMove.className = 'icon-btn';
  btnMove.type = 'button';
  btnMove.title = 'Move across quadrants (← / →)';
  btnMove.setAttribute('aria-label', 'Move task');
  btnMove.textContent = '🔁';
  btnMove.addEventListener('click', () => moveTaskPrompt(task.id));

  const btnDel = document.createElement('button');
  btnDel.className = 'icon-btn del';
  btnDel.type = 'button';
  btnDel.title = 'Delete (Del)';
  btnDel.setAttribute('aria-label', 'Delete task');
  btnDel.textContent = '🗑️';
  btnDel.addEventListener('click', () => removeTask(task.id));

  right.appendChild(btnDone);
  right.appendChild(btnMove);
  right.appendChild(btnDel);

  li.appendChild(left);
  li.appendChild(right);

  li.addEventListener('keydown', (ev) => {
    if (ev.key === ' ') { ev.preventDefault(); toggleDone(task.id); }
    else if (ev.key === 'Enter') { ev.preventDefault(); toggleDone(task.id); }
    else if (ev.key === 'Delete') { removeTask(task.id); }
    else if (ev.key === 'ArrowLeft') { ev.preventDefault(); moveLR(task.id, -1); }
    else if (ev.key === 'ArrowRight') { ev.preventDefault(); moveLR(task.id, +1); }
  });

  return li;
}

function render() {
  listEls.forEach((ul) => (ul.innerHTML = ''));
  const groups = [[], [], [], []];
  tasks.forEach((t) => groups[qIndex(t)].push(t));
  groups.forEach((group, idx) => {
    if (group.length === 0) {
      emptyEls[idx].style.display = 'block';
    } else {
      emptyEls[idx].style.display = 'none';
      group.forEach((t) => listEls[idx].appendChild(taskEl(t)));
    }
  });
}

title.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    addBtn.click();
  }
});


render();


