const STORAGE_KEY = 'momentum-bca-v2';

function clone(value) { return JSON.parse(JSON.stringify(value)); }
function dateKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
const todayKey = dateKey();
const achievementSeed = window.MOMENTUM_ACHIEVEMENT_SEED || [];
const pythonAchievementSeed = window.MOMENTUM_PYTHON_ACHIEVEMENT_SEED || [];
function freshAchievementSeed() { return clone(achievementSeed); }
function freshPythonAchievementSeed() { return clone(pythonAchievementSeed); }
function normalizeAchievements(topics) {
  return (Array.isArray(topics) ? topics : []).map((topicItem, topicIndex) => ({
    id: topicItem.id || `topic-custom-${topicIndex + 1}`,
    title: topicItem.title || `Topic ${topicIndex + 1}`,
    custom: Boolean(topicItem.custom),
    items: (Array.isArray(topicItem.items) ? topicItem.items : []).map((item, itemIndex) => ({ ...item, id: item.id || `achievement-${topicIndex + 1}-${itemIndex + 1}`, name: item.name || 'Untitled achievement', done: Boolean(item.done), custom: Boolean(item.custom) }))
  }));
}
function monthKeyForDate(key) { return String(key).slice(0, 7); }
function daysInMonth(year, monthIndex) { return new Date(year, monthIndex + 1, 0).getDate(); }
function formatShortDate(key) { if (!key) return ''; return dateFromKey(key).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }); }
function formatCompletedDate(iso) { if (!iso) return ''; return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); }
function dateFromKey(key) { const [y, m, d] = key.split('-').map(Number); return new Date(y, m - 1, d); }
function keyDaysBack(days) { const d = new Date(); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() - days); return dateKey(d); }
function createHistory(days, includeToday = false) {
  const history = {};
  for (let i = includeToday ? days - 1 : days; i >= 1; i -= 1) history[keyDaysBack(i)] = true;
  return history;
}
function createChapter(name, done = false) { return { id: Date.now() + Math.random(), name, done }; }
function makeSeedState() {
    const openHistory = {};
  openHistory[todayKey] = true;
  return {
    tasks: [
      { id: 1, name: 'Solve 1 Java problem', tag: 'Programming', dueDate: todayKey, done: false, completedAt: null },
      { id: 2, name: 'Revise DBMS normalization', tag: 'DBMS', dueDate: todayKey, done: false, completedAt: null },
      { id: 3, name: 'Work on portfolio project for 30 min', tag: 'Projects', dueDate: todayKey, done: false, completedAt: null }
    ],
    habits: [
      { id: 1, name: 'Programming', detail: 'Solve 1 coding problem', goal: '1 problem', area: 'Programming', emoji: '⌘', done: false, history: createHistory(5), chapters: [createChapter('Java basics', true), createChapter('Object-oriented programming'), createChapter('Arrays and DSA')] },
      { id: 2, name: 'Maths', detail: 'Practice 5 questions', goal: '5 questions', area: 'Maths', emoji: '∑', done: false, history: createHistory(3), chapters: [createChapter('Sets and logic', true), createChapter('Matrices'), createChapter('Probability')] },
      { id: 3, name: 'DBMS', detail: 'Revise one concept', goal: '1 concept', area: 'DBMS', emoji: '▣', done: false, history: createHistory(7), chapters: [createChapter('Normalization', true), createChapter('SQL queries'), createChapter('Transactions')] },
      { id: 4, name: 'Projects', detail: 'Build for 30 minutes', goal: '30 minutes', area: 'Projects', emoji: '⌁', done: false, history: createHistory(2), chapters: [createChapter('Portfolio UI'), createChapter('Git and GitHub'), createChapter('Deploy project')] },
      { id: 5, name: 'German', detail: 'Learn 10 new words', goal: '10 words', area: 'German', emoji: 'A', done: false, history: createHistory(4), chapters: [createChapter('Daily vocabulary'), createChapter('Speaking practice'), createChapter('Basic grammar')] }
    ],
    goals: [
      { id: 1, name: 'Become internship-ready', why: 'Build skills that open my next door.', icon: '↗', progress: 38 },
      { id: 2, name: 'Ship my BCA project', why: 'Turn what I learn into something real.', icon: '⌁', progress: 62 },
      { id: 3, name: 'Build a calm routine', why: 'Make consistency feel like who I am.', icon: '✦', progress: 24 }
    ],
    achievements: freshAchievementSeed(),
    pythonAchievements: freshPythonAchievementSeed(),
    openHistory,
    completedFocus: 0,
    focusMinutes: 0,
    focusLog: {},
    points: 120,
    reflection: '',
    date: todayKey,
    theme: 'light'
  };
}

function calculateOpenStreak(openHistory) {
  let streak = 0;
  for (let i = 0; i < 370; i += 1) {
    if (!openHistory[keyDaysBack(i)]) break;
    streak += 1;
  }
  return streak;
}
function normalizeTask(task, index) {
  return { ...task, id: task.id ?? Date.now() + index, name: task.name || 'Untitled task', tag: task.tag || 'Personal', dueDate: task.dueDate || todayKey, done: Boolean(task.done), completedAt: task.completedAt || null };
}
function rolloverPendingTasks(tasks) {
  const currentMonth = monthKeyForDate(todayKey);
  const firstOfCurrentMonth = `${currentMonth}-01`;
  const [year, month] = currentMonth.split('-').map(Number);
  const lastDay = daysInMonth(year, month - 1);
  let moved = false;
  tasks.forEach(task => {
    if (!task.done && task.dueDate && task.dueDate < firstOfCurrentMonth) {
      const originalDay = Number(String(task.dueDate).slice(8, 10)) || 1;
      const newDay = String(Math.min(originalDay, lastDay)).padStart(2, '0');
      task.forwardedFrom = task.dueDate;
      task.dueDate = `${currentMonth}-${newDay}`;
      moved = true;
    }
  });
  return moved;
}
function normalizeHabit(habit, index) {
  const fallback = makeSeedState().habits[index] || makeSeedState().habits[0];
  return {
    ...fallback,
    ...habit,
    id: habit.id ?? Date.now() + index,
    detail: habit.detail || habit.goal || 'Make it small and repeatable',
    goal: habit.goal || habit.detail || 'One small session',
    area: habit.area || habit.name || 'Personal',
    history: habit.history || {},
    chapters: (Array.isArray(habit.chapters) ? habit.chapters : clone(fallback.chapters || [])).map(chapter => ({ ...chapter, done: Boolean(chapter.done) }))
  };
}
function loadState() {
  let saved;
  try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch { saved = null; }
  if (!saved) return makeSeedState();
  const base = makeSeedState();
  const next = { ...base, ...saved };
  next.tasks = (saved.tasks || base.tasks).map(normalizeTask);
  next.habits = (saved.habits || base.habits).map(normalizeHabit);
  next.goals = saved.goals || base.goals;
  next.achievements = normalizeAchievements(saved.achievements || base.achievements);
  next.pythonAchievements = normalizeAchievements(saved.pythonAchievements || base.pythonAchievements);
  next.openHistory = saved.openHistory || base.openHistory;
  next.focusLog = saved.focusLog || {};
  if (saved.date !== todayKey) {
    next.habits = next.habits.map(habit => ({ ...habit, done: Boolean(habit.history?.[todayKey]) }));
    next.date = todayKey;
  }
  rolloverPendingTasks(next.tasks);
  next.openHistory[todayKey] = true;
  next.streak = calculateOpenStreak(next.openHistory);
  return next;
}
let jsonFileHandle = null;
let jsonDirectoryHandle = null;
let jsonSaveTimer = null;
let state = loadState();
function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); queueJsonSave(); }
state.streak = calculateOpenStreak(state.openHistory);
saveState();

let timer = { running: false, elapsed: 0, startedAt: 0, interval: null };
let modalType = 'task';
let editingId = null;
let chapterSubjectId = null;
let achievementKind = 'linux';
let calendarCursor = new Date();
let selectedCalendarKey = todayKey;
let toastTimeout;

function $(selector) { return document.querySelector(selector); }
function $$(selector) { return [...document.querySelectorAll(selector)]; }
function escapeHtml(value) { return String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]); }
function getHabitStreak(habit) {
  let streak = 0;
  for (let i = habit.done ? 0 : 1; i < 370; i += 1) {
    if (!habit.history?.[keyDaysBack(i)]) break;
    streak += 1;
  }
  return streak;
}
function habitRate(habit, days = 7) {
  if (!days) return 0;
  let done = 0;
  for (let i = 0; i < days; i += 1) if (habit.history?.[keyDaysBack(i)]) done += 1;
  return Math.round(done / days * 100);
}
function dailyRate(key) {
  if (!state.habits.length) return 0;
  const completed = state.habits.filter(habit => habit.history?.[key]).length;
  return Math.round(completed / state.habits.length * 100);
}
function averageRate(days) {
  if (!days) return 0;
  let total = 0;
  for (let i = 0; i < days; i += 1) total += dailyRate(keyDaysBack(i));
  return Math.round(total / days);
}
function weeklyFocusMinutes() {
  let total = 0;
  for (let i = 0; i < 7; i += 1) total += Number(state.focusLog?.[keyDaysBack(i)] || 0);
  return total;
}
function formatDate() {
  $('#currentDate').textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}
function renderAll() {
  renderTasks();
  renderHabits();
  renderGoals();
  renderAchievements();
  renderAnalytics();
  renderCalendar();
  updateStats();
  $('#reflectionText').value = state.reflection || '';
  document.body.classList.toggle('dark', state.theme === 'dark');
  $('#themeToggle').textContent = state.theme === 'dark' ? '☾' : '☼';
}
function renderTasks() {
  const list = $('#taskList');
  const visibleTasks = state.tasks.filter(task => task.dueDate <= todayKey || (task.done && task.completedAt?.slice(0, 10) === todayKey));
  list.innerHTML = visibleTasks.map(task => `
    <div class="task-row ${task.done ? 'done' : 'pending-task'}" data-task-id="${task.id}">
      <button class="check-box task-toggle" aria-label="Mark ${escapeHtml(task.name)} complete">${task.done ? '✓' : ''}</button>
      <div class="task-copy"><span class="task-name">${escapeHtml(task.name)}</span><small class="task-date">${task.done ? `Completed ${formatCompletedDate(task.completedAt)}` : `Due ${formatShortDate(task.dueDate)}`}</small></div>
      <span class="task-tag">${escapeHtml(task.tag)}</span>
      <button class="delete-task" data-delete-task="${task.id}" aria-label="Delete task">×</button>
    </div>`).join('') || '<div class="empty-task-state">No tasks due yet. Add a task from the calendar.</div>';
  list.querySelectorAll('.task-toggle').forEach(button => button.addEventListener('click', () => toggleTask(button.closest('.task-row').dataset.taskId)));
  list.querySelectorAll('[data-delete-task]').forEach(button => button.addEventListener('click', () => deleteTask(button.dataset.deleteTask)));
}
function habitMarkup(habit, large = false) {
  const weekly = habitRate(habit, 7);
  const chapters = habit.chapters || [];
  const chaptersDone = chapters.filter(chapter => chapter.done).length;
  const chapterHtml = large ? `<div class="chapter-block"><div class="chapter-heading"><span>Chapters</span><b>${chaptersDone}/${chapters.length}</b></div><div class="chapter-list">${chapters.map(chapter => `<div class="chapter-row ${chapter.done ? 'done' : ''}" data-chapter-id="${chapter.id}"><button class="chapter-check" data-toggle-chapter="${chapter.id}" aria-label="Toggle chapter">${chapter.done ? '✓' : ''}</button><span>${escapeHtml(chapter.name)}</span><button class="chapter-edit" data-edit-chapter="${chapter.id}" aria-label="Edit chapter">✎</button><button class="chapter-delete" data-delete-chapter="${chapter.id}" aria-label="Delete chapter">×</button></div>`).join('') || '<span class="empty-chapters">Add chapters to track your syllabus.</span>'}</div><button class="text-button add-chapter" data-add-chapter="${habit.id}">＋ Add chapter</button></div>` : '';
  return `<article class="habit-card ${large ? 'habit-large' : ''} ${habit.done ? 'complete' : ''}" data-habit-id="${habit.id}">
    <div class="habit-top"><div class="habit-emoji">${escapeHtml(habit.emoji || '✦')}</div><div class="habit-actions"><button class="habit-edit" data-edit-habit="${habit.id}" aria-label="Edit habit">✎</button><button class="habit-delete" data-delete-habit="${habit.id}" aria-label="Delete habit">×</button><button class="habit-check" data-toggle-habit="${habit.id}" aria-label="Mark ${escapeHtml(habit.name)} complete">${habit.done ? '✓' : ''}</button></div></div>
    <div class="habit-name">${escapeHtml(habit.name)}</div><div class="habit-detail">${escapeHtml(habit.detail)}</div><div class="habit-goal">Goal: ${escapeHtml(habit.goal)}</div>
    <div class="habit-progress-meta"><span>Last 7 days</span><b>${weekly}%</b></div><div class="habit-progress"><div style="width:${weekly}%"></div></div>
    ${large ? `<div class="habit-footer"><span class="streak-pill">♨ ${getHabitStreak(habit)} day streak</span><span class="habit-target"><b>${habit.done ? 'Done' : 'Open'}</b> today</span></div>${chapterHtml}` : `<div class="habit-streak">Streak <b>♨ ${getHabitStreak(habit)} days</b></div>`}
  </article>`;
}
function bindHabitEvents() {
  $$('.habit-check').forEach(button => button.addEventListener('click', () => toggleHabit(button.dataset.toggleHabit)));
  $$('[data-edit-habit]').forEach(button => button.addEventListener('click', () => openModal('habit', button.dataset.editHabit)));
  $$('[data-delete-habit]').forEach(button => button.addEventListener('click', () => deleteHabit(button.dataset.deleteHabit)));
  $$('[data-add-chapter]').forEach(button => button.addEventListener('click', () => openModal('chapter', null, button.dataset.addChapter)));
  $$('[data-toggle-chapter]').forEach(button => button.addEventListener('click', () => toggleChapter(button.closest('[data-habit-id]').dataset.habitId, button.dataset.toggleChapter)));
  $$('[data-edit-chapter]').forEach(button => button.addEventListener('click', () => openModal('chapter', button.dataset.editChapter, button.closest('[data-habit-id]').dataset.habitId)));
  $$('[data-delete-chapter]').forEach(button => button.addEventListener('click', () => deleteChapter(button.closest('[data-habit-id]').dataset.habitId, button.dataset.deleteChapter)));
}
function renderHabits() {
  $('#habitPreview').innerHTML = state.habits.slice(0, 5).map(habit => habitMarkup(habit)).join('');
  $('#habitGrid').innerHTML = state.habits.map(habit => habitMarkup(habit, true)).join('');
  bindHabitEvents();
  const totalPossible = state.habits.length * 7;
  const totalDone = state.habits.reduce((sum, habit) => sum + Array.from({ length: 7 }, (_, i) => habit.history?.[keyDaysBack(i)] ? 1 : 0).reduce((a, b) => a + b, 0), 0);
  const percent = totalPossible ? Math.round(totalDone / totalPossible * 100) : 0;
  $('#habitPercent').textContent = `${percent}%`;
  $('#habitProgressBar').style.width = `${percent}%`;
}
function renderGoals() {
  $('#goalsGrid').innerHTML = state.goals.map(goal => `<article class="panel goal-card"><div class="goal-card-top"><div class="goal-icon">${escapeHtml(goal.icon || '✦')}</div><div class="goal-card-actions"><button class="goal-edit" data-edit-goal="${goal.id}" aria-label="Edit goal">✎</button><button class="goal-delete" data-delete-goal="${goal.id}" aria-label="Delete goal">×</button></div></div><h3>${escapeHtml(goal.name)}</h3><p>${escapeHtml(goal.why || 'A meaningful next step.')}</p><div class="goal-meta"><span>Long-term progress</span><b>${Math.round(Number(goal.progress) || 0)}%</b></div><div class="goal-progress"><div style="width:${Math.min(100, Math.max(0, Number(goal.progress) || 0))}%"></div></div></article>`).join('');
  $$('[data-edit-goal]').forEach(button => button.addEventListener('click', () => openModal('goal', button.dataset.editGoal)));
  $$('[data-delete-goal]').forEach(button => button.addEventListener('click', () => deleteGoal(button.dataset.deleteGoal)));
}
function achievementTotals(topics) {
  const items = (topics || []).flatMap(topicItem => topicItem.items || []);
  const completed = items.filter(item => item.done).length;
  return { items, completed, total: items.length, remaining: items.length - completed };
}
function achievementTopicMarkup(topics, kind) {
  return (topics || []).map((topicItem, topicIndex) => {
    const items = topicItem.items || []; const complete = items.filter(item => item.done).length; const topicPercent = items.length ? Math.round(complete / items.length * 100) : 0;
    return `<details class="achievement-topic panel" ${topicIndex === 0 ? 'open' : ''}><summary><div class="achievement-topic-heading"><span class="topic-label">TOPIC ${topicIndex + 1}</span><strong>${escapeHtml(topicItem.title)}</strong><div class="achievement-topic-meta"><span>${complete}/${items.length} complete</span><b>${topicPercent}%</b></div></div><span class="details-chevron">⌄</span></summary><div class="achievement-topic-body"><div class="achievement-topic-progress"><div style="width:${topicPercent}%"></div></div><div class="achievement-list">${items.map(item => `<div class="achievement-row ${item.done ? 'done' : ''}"><button class="achievement-check" data-achievement-kind="${kind}" data-toggle-achievement="${topicItem.id}" data-achievement-id="${item.id}" aria-label="Mark ${escapeHtml(item.name)} studied">${item.done ? '✓' : ''}</button><span>${escapeHtml(item.name)}</span><button class="achievement-delete" data-achievement-kind="${kind}" data-delete-achievement="${topicItem.id}" data-achievement-id="${item.id}" aria-label="Delete achievement">×</button></div>`).join('') || '<div class="empty-task-state">No subtopics yet.</div>'}</div><div class="achievement-topic-actions"><button class="text-button" data-achievement-kind="${kind}" data-add-achievement="${topicItem.id}">＋ Add achievement</button><button class="text-button danger-text" data-achievement-kind="${kind}" data-delete-achievement-topic="${topicItem.id}">Delete topic</button></div></div></details>`;
  }).join('');
}
function renderAchievementGroup(topics, kind, topicContainer, completedId, totalId, remainingId, percentId, barId) {
  const totals = achievementTotals(topics); const percent = totals.total ? Math.round(totals.completed / totals.total * 100) : 0;
  $(`#${completedId}`).textContent = totals.completed; $(`#${totalId}`).textContent = totals.total; $(`#${remainingId}`).textContent = totals.remaining; $(`#${percentId}`).textContent = `${percent}%`; $(`#${barId}`).style.width = `${percent}%`;
  $(`#${topicContainer}`).innerHTML = achievementTopicMarkup(topics, kind);
}
function renderAchievements() {
  if (!state.achievements) state.achievements = freshAchievementSeed();
  if (!state.pythonAchievements) state.pythonAchievements = freshPythonAchievementSeed();
  renderAchievementGroup(state.achievements, 'linux', 'achievementTopics', 'achievementCompleted', 'achievementTotal', 'achievementRemaining', 'achievementPercent', 'achievementProgressBar');
  renderAchievementGroup(state.pythonAchievements, 'python', 'pythonAchievementTopics', 'pythonAchievementCompleted', 'pythonAchievementTotal', 'pythonAchievementRemaining', 'pythonAchievementPercent', 'pythonAchievementProgressBar');
  $$('[data-toggle-achievement]').forEach(button => button.addEventListener('click', () => toggleAchievement(button.dataset.achievementKind, button.dataset.toggleAchievement, button.dataset.achievementId)));
  $$('[data-delete-achievement]').forEach(button => button.addEventListener('click', () => deleteAchievement(button.dataset.achievementKind, button.dataset.deleteAchievement, button.dataset.achievementId)));
  $$('[data-add-achievement]').forEach(button => button.addEventListener('click', () => openModal('achievement', null, button.dataset.addAchievement, todayKey, button.dataset.achievementKind)));
  $$('[data-delete-achievement-topic]').forEach(button => button.addEventListener('click', event => { event.preventDefault(); event.stopPropagation(); deleteAchievementTopic(button.dataset.achievementKind, button.dataset.deleteAchievementTopic); }));
}
function achievementCollection(kind) { return kind === 'python' ? state.pythonAchievements : state.achievements; }
function toggleAchievement(kind, topicId, itemId) {
  const topics = achievementCollection(kind); const topicItem = topics.find(topicEntry => String(topicEntry.id) === String(topicId)); const item = topicItem?.items.find(achievement => String(achievement.id) === String(itemId)); if (!item) return;
  item.done = !item.done; if (item.done) { state.points += 2; showToast('Achievement checked · +2 XP'); } else showToast('Achievement unchecked'); saveState(); renderAll();
}
function deleteAchievement(kind, topicId, itemId) {
  const topics = achievementCollection(kind); const topicItem = topics.find(topicEntry => String(topicEntry.id) === String(topicId)); if (!topicItem) return;
  topicItem.items = topicItem.items.filter(item => String(item.id) !== String(itemId)); saveState(); renderAll(); showToast('Achievement removed');
}
function deleteAchievementTopic(kind, topicId) {
  if (!confirm('Delete this topic and all its achievements?')) return;
  if (kind === 'python') state.pythonAchievements = state.pythonAchievements.filter(topicItem => String(topicItem.id) !== String(topicId)); else state.achievements = state.achievements.filter(topicItem => String(topicItem.id) !== String(topicId));
  saveState(); renderAll(); showToast('Topic deleted');
}

function updateStats() {
  const total = state.tasks.length;
  const completed = state.tasks.filter(task => task.done).length;
  const percent = total ? Math.round(completed / total * 100) : 0;
  $('#completedCount').textContent = completed;
  $('#totalCount').textContent = total;
  $('#progressValue').textContent = percent;
  $('#ringText').textContent = `${percent}%`;
  $('#miniRing').style.background = `conic-gradient(var(--purple) ${percent * 3.6}deg, #eeecf8 ${percent * 3.6}deg)`;
  $('#taskProgress').style.width = `${percent}%`;
  $('#taskBadge').textContent = `${completed} / ${total} done`;
  $('#streakValue').textContent = state.streak;
  $('#reflectionStreak').textContent = state.streak;
  $('#focusMinutes').textContent = weeklyFocusMinutes();
  $('#sessionMinutes').textContent = state.focusMinutes;
  $('#pointsValue').textContent = state.points;
  $('#pointsToGo').textContent = Math.max(0, 200 - state.points);
  $('#cycleCount').textContent = state.completedFocus;
}
function taskCompletionRateForDate(key) {
  const tasks = state.tasks.filter(task => taskDueDate(task) === key);
  if (!tasks.length) return 0;
  return Math.round(tasks.filter(task => task.done).length / tasks.length * 100);
}
function renderAnalytics() {
  const daily = dailyRate(todayKey); const weekly = averageRate(7); const monthly = averageRate(30);
  const firstThree = [6, 5, 4].reduce((sum, i) => sum + dailyRate(keyDaysBack(i)), 0) / 3; const lastThree = [2, 1, 0].reduce((sum, i) => sum + dailyRate(keyDaysBack(i)), 0) / 3; const improvement = Math.round(lastThree - firstThree);
  $('#dailyRate').textContent = `${daily}%`; $('#weeklyRate').textContent = `${weekly}%`; $('#monthlyRate').textContent = `${monthly}%`; $('#improvementRate').textContent = `${improvement >= 0 ? '+' : ''}${improvement}%`;
  $('#dailyBar').style.width = `${daily}%`; $('#weeklyBar').style.width = `${weekly}%`; $('#monthlyBar').style.width = `${monthly}%`;
  $('#dailyReport').textContent = daily >= 80 ? 'Excellent — you showed up strongly today.' : daily > 0 ? 'Nice start — one more small win can lift this.' : 'Start one habit to create today’s win.';
  $('#weeklyReport').textContent = weekly >= 80 ? 'You are building a dependable rhythm.' : weekly >= 50 ? 'Good rhythm — protect your next small win.' : weekly > 0 ? 'Momentum is growing. Keep the chain gentle.' : 'No pressure — begin with a five-minute habit.';
  $('#monthlyReport').textContent = monthly >= 70 ? 'A strong month of showing up.' : monthly > 0 ? 'Your trend is forming; consistency compounds.' : 'Your first month starts with one check-in.';
  $('#improvementReport').textContent = improvement > 0 ? 'Your last three days are stronger than your first three.' : improvement < 0 ? 'Reset gently and make tomorrow smaller.' : 'Keep checking in to reveal your trend.';

  const allTasks = state.tasks; const completedTasks = allTasks.filter(task => task.done); const pendingTasks = allTasks.filter(task => !task.done); const upcomingTasks = pendingTasks.filter(task => taskDueDate(task) > todayKey); const monthKey = monthKeyForDate(todayKey); const monthCompleted = completedTasks.filter(task => taskDueDate(task).startsWith(monthKey) || task.completedAt?.slice(0, 7) === monthKey).length; const taskSuccess = allTasks.length ? Math.round(completedTasks.length / allTasks.length * 100) : 0;
  $('#analyticsCompletedTasks').textContent = completedTasks.length; $('#analyticsPendingTasks').textContent = pendingTasks.length; $('#analyticsUpcomingTasks').textContent = upcomingTasks.length; $('#analyticsMonthCompleted').textContent = monthCompleted; $('#taskSuccessBadge').textContent = `${taskSuccess}% success`; $('#taskAnalyticsProgress').style.width = `${taskSuccess}%`;
  $('#taskAnalyticsMessage').textContent = taskSuccess >= 80 ? 'Excellent task follow-through — you are making plans real.' : taskSuccess >= 50 ? 'Good progress — clear one more pending task today.' : pendingTasks.length ? 'Choose one pending task and make it your next small win.' : 'Add a task to start tracking your task progress.';

  const chart = $('#monthlyChart'); chart.innerHTML = '';
  const taskChart = $('#monthlyTaskChart'); taskChart.innerHTML = '';
  for (let i = 29; i >= 0; i -= 1) {
    const key = keyDaysBack(i); const rate = dailyRate(key); const taskRate = taskCompletionRateForDate(key);
    const bar = document.createElement('div'); bar.className = `chart-bar ${key === todayKey ? 'today' : ''}`; bar.style.height = `${Math.max(5, rate)}%`; bar.title = `${key}: ${rate}% habit progress`; chart.appendChild(bar);
    const taskBar = document.createElement('div'); taskBar.className = `chart-bar task-chart-bar ${key === todayKey ? 'today' : ''}`; taskBar.style.height = `${Math.max(5, taskRate)}%`; taskBar.title = `${key}: ${taskRate}% task completion`; taskChart.appendChild(taskBar);
  }
  const chartLabel = `30 days ending ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`; $('#chartMonthLabel').textContent = chartLabel; $('#taskChartLabel').textContent = chartLabel;
}
function taskDueKey(task) { return task.dueDate || todayKey; }
function renderCalendar() {
  const year = calendarCursor.getFullYear(); const month = calendarCursor.getMonth(); const visibleMonth = `${year}-${String(month + 1).padStart(2, '0')}`;
  $('#calendarMonth').textContent = calendarCursor.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const grid = $('#calendarGrid'); grid.innerHTML = '';
  const firstDay = (new Date(year, month, 1).getDay() + 6) % 7; const days = daysInMonth(year, month);
  for (let i = 0; i < firstDay; i += 1) grid.insertAdjacentHTML('beforeend', '<div class="calendar-day blank"></div>');
  for (let day = 1; day <= days; day += 1) {
    const key = dateKey(new Date(year, month, day)); const opened = Boolean(state.openHistory[key]); const completedHabits = state.habits.filter(habit => habit.history?.[key]).length; const isToday = key === todayKey;
    const dayTasks = state.tasks.filter(task => taskDueKey(task) === key); const completedTasks = dayTasks.filter(task => task.done).length; const pendingTasks = dayTasks.filter(task => !task.done).length;
    const cell = document.createElement('button'); cell.type = 'button'; cell.className = `calendar-day ${opened ? 'opened' : ''} ${completedHabits ? 'has-habits' : ''} ${completedTasks ? 'has-completed-tasks' : ''} ${pendingTasks ? 'has-pending-tasks' : ''} ${isToday ? 'today' : ''} ${selectedCalendarKey === key ? 'selected' : ''}`;
    cell.innerHTML = `<span>${day}</span>${dayTasks.length ? `<small class="calendar-task-count"><b>${completedTasks}</b>/${dayTasks.length} tasks</small>` : completedHabits ? `<small>${completedHabits}/${state.habits.length} habits</small>` : ''}`;
    cell.title = `${key} · ${completedTasks} completed · ${pendingTasks} pending`; cell.addEventListener('click', () => { selectedCalendarKey = key; renderCalendar(); }); grid.appendChild(cell);
  }
  const monthTasks = state.tasks.filter(task => taskDueKey(task).startsWith(visibleMonth));
  $('#monthCompletedTasks').textContent = monthTasks.filter(task => task.done).length;
  $('#monthPendingTasks').textContent = monthTasks.filter(task => !task.done).length;
  $('#monthTotalTasks').textContent = monthTasks.length;
  renderCalendarTaskList();
}
function renderCalendarTaskList() {
  const selectedDate = selectedCalendarKey; const selectedTasks = state.tasks.filter(task => taskDueDate(task) === selectedDate).sort((a, b) => Number(a.done) - Number(b.done));
  const isPast = selectedDate < todayKey; const isFuture = selectedDate > todayKey;
  $('#selectedDateTitle').textContent = selectedDate === todayKey ? 'Today’s tasks' : `${formatShortDate(selectedDate)} tasks`;
  $('#selectedDateHelp').textContent = isPast ? 'Past pending tasks can be completed here. New tasks can be planned from today onward.' : isFuture ? 'Plan ahead — you can complete these tasks early whenever you want.' : 'Complete tasks today or clear an earlier pending task.';
  const addButton = $('#addCalendarTaskBtn'); addButton.disabled = isPast; addButton.title = isPast ? 'New tasks can only be added for today or future dates' : 'Add a task for this date';
  const list = $('#calendarTaskList');
  list.innerHTML = selectedTasks.map(task => `<div class="calendar-task-row ${task.done ? 'completed-task' : 'pending-task'}" data-task-id="${task.id}"><button class="calendar-check" data-calendar-toggle="${task.id}" aria-label="Complete task">${task.done ? '✓' : ''}</button><div class="calendar-task-copy"><strong>${escapeHtml(task.name)}</strong><span>${escapeHtml(task.tag)} · Due ${formatShortDate(task.dueDate)}</span>${task.done ? `<small>Completed on ${formatCompletedDate(task.completedAt)}</small>` : '<small class="pending-label">Pending</small>'}</div><button class="calendar-task-action" data-edit-task="${task.id}" aria-label="Edit task">✎</button><button class="calendar-task-action" data-delete-calendar-task="${task.id}" aria-label="Delete task">×</button></div>`).join('') || '<div class="empty-task-state">No tasks for this date yet.</div>';
  list.querySelectorAll('[data-calendar-toggle]').forEach(button => button.addEventListener('click', () => toggleTask(button.dataset.calendarToggle)));
  list.querySelectorAll('[data-edit-task]').forEach(button => button.addEventListener('click', () => openModal('task', button.dataset.editTask)));
  list.querySelectorAll('[data-delete-calendar-task]').forEach(button => button.addEventListener('click', () => deleteTask(button.dataset.deleteCalendarTask)));
}
function taskDueDate(task) { return task.dueDate || todayKey; }
function toggleTask(id) { const task = state.tasks.find(item => String(item.id) === String(id)); if (!task) return; const wasDone = task.done; task.done = !task.done; task.completedAt = task.done ? new Date().toISOString() : null; if (!wasDone) { state.points += 10; showToast('Task completed · +10 XP'); } else showToast('Task moved back to pending'); saveState(); renderAll(); }
function deleteTask(id) { state.tasks = state.tasks.filter(task => String(task.id) !== String(id)); saveState(); renderAll(); showToast('Task removed'); }
function toggleHabit(id) {
  const habit = state.habits.find(item => String(item.id) === String(id)); if (!habit) return;
  habit.done = !habit.done; habit.history = habit.history || {}; habit.history[todayKey] = habit.done;
  if (habit.done) { state.points += 5; showToast(`${habit.name} complete · +5 XP`); } else showToast(`${habit.name} unchecked`);
  saveState(); renderAll();
}
function deleteHabit(id) { if (!confirm('Delete this habit and its chapter tracker?')) return; state.habits = state.habits.filter(habit => String(habit.id) !== String(id)); saveState(); renderAll(); showToast('Habit deleted'); }
function toggleChapter(habitId, chapterId) { const habit = state.habits.find(item => String(item.id) === String(habitId)); const chapter = habit?.chapters.find(item => String(item.id) === String(chapterId)); if (!chapter) return; chapter.done = !chapter.done; if (chapter.done) state.points += 3; saveState(); renderAll(); }
function deleteChapter(habitId, chapterId) { const habit = state.habits.find(item => String(item.id) === String(habitId)); if (!habit) return; habit.chapters = habit.chapters.filter(chapter => String(chapter.id) !== String(chapterId)); saveState(); renderAll(); showToast('Chapter removed'); }
function deleteGoal(id) { if (!confirm('Delete this long-term goal?')) return; state.goals = state.goals.filter(goal => String(goal.id) !== String(id)); saveState(); renderAll(); showToast('Goal deleted'); }

function openModal(type, id = null, subjectId = null, dueDate = todayKey, kind = 'linux') {
  modalType = type; editingId = id; chapterSubjectId = subjectId; achievementKind = kind; $('#modalBackdrop').hidden = false;
  $('#itemName').value = ''; $('#itemCategory').value = 'Programming'; $('#itemDate').min = todayKey; $('#itemDate').value = dueDate || todayKey; $('#itemGoal').value = ''; $('#itemWhy').value = ''; $('#itemProgress').value = 0; $('#progressInputValue').textContent = '0%';
  const subject = state.habits.find(habit => String(habit.id) === String(subjectId));
  const achievementTopic = achievementCollection(kind).find(topicItem => String(topicItem.id) === String(subjectId));
  const item = type === 'task' ? state.tasks.find(task => String(task.id) === String(id)) : type === 'habit' ? state.habits.find(habit => String(habit.id) === String(id)) : type === 'goal' ? state.goals.find(goal => String(goal.id) === String(id)) : type === 'chapter' ? subject?.chapters.find(chapter => String(chapter.id) === String(id)) : null;
  const editing = Boolean(item);
  $('#modalEyebrow').textContent = type === 'task' ? 'QUICK ADD' : type === 'habit' ? 'BCA HABIT TRACKER' : type === 'goal' ? 'VISION BOARD' : type === 'achievement-topic' ? 'LITTLE ACHIEVEMENTS' : type === 'achievement' ? 'STUDY TRACKER' : 'CHAPTER TRACKER';
  $('#modalTitle').textContent = type === 'task' ? (editing ? 'Edit this task.' : 'Add something useful.') : type === 'habit' ? (editing ? 'Edit your habit.' : 'Design a habit that fits you.') : type === 'goal' ? (editing ? 'Update your long-term goal.' : 'Name the next chapter.') : type === 'achievement-topic' ? 'Add a study topic.' : type === 'achievement' ? `Add an achievement${achievementTopic ? ` in ${achievementTopic.title}` : ''}.` : `${editing ? 'Edit' : 'Add'} a chapter${subject ? ` in ${subject.name}` : ''}.`;
  $('#categoryRow').hidden = !['task', 'habit'].includes(type);
  $('#taskDateRow').hidden = type !== 'task';
  $('#habitGoalRow').hidden = type !== 'habit';
  $('#goalRow').hidden = type !== 'goal';
  $('#goalProgressRow').hidden = type !== 'goal';
  if (item) {
    $('#itemName').value = item.name;
    if (type === 'task') { $('#itemCategory').value = item.tag || 'Personal'; $('#itemDate').value = item.dueDate || todayKey; }
    if (type === 'habit') { $('#itemCategory').value = item.area || 'Programming'; $('#itemGoal').value = item.goal || ''; }
    if (type === 'goal') { $('#itemWhy').value = item.why || ''; $('#itemProgress').value = Number(item.progress) || 0; $('#progressInputValue').textContent = `${Number(item.progress) || 0}%`; }
  }
  $('#itemName').placeholder = type === 'task' ? 'e.g. Finish DBMS notes' : type === 'habit' ? 'e.g. English speaking' : type === 'chapter' ? 'e.g. Normalization' : type === 'achievement' ? 'e.g. Build a small practice project' : type === 'achievement-topic' ? 'e.g. Python basics' : 'e.g. Get a summer internship';
  $('#itemName').focus();
}
function closeModal() { $('#modalBackdrop').hidden = true; editingId = null; chapterSubjectId = null; }
function submitModal(event) {
  event.preventDefault(); const name = $('#itemName').value.trim(); if (!name) return;
  const wasEditing = Boolean(editingId);
  if (modalType === 'task') {
    const existing = editingId && state.tasks.find(task => String(task.id) === String(editingId));
    if (existing) { existing.name = name; existing.tag = $('#itemCategory').value || 'Personal'; existing.dueDate = $('#itemDate').value || todayKey; }
    else state.tasks.push({ id: Date.now(), name, tag: $('#itemCategory').value || 'Personal', dueDate: $('#itemDate').value || todayKey, done: false, completedAt: null });
  }
  if (modalType === 'habit') {
    const existing = editingId && state.habits.find(habit => String(habit.id) === String(editingId));
    if (existing) { existing.name = name; existing.area = $('#itemCategory').value; existing.goal = $('#itemGoal').value.trim() || 'One small session'; existing.detail = existing.goal; }
    else state.habits.push({ id: Date.now(), name, area: $('#itemCategory').value, detail: $('#itemGoal').value.trim() || 'Make it small and repeatable', goal: $('#itemGoal').value.trim() || 'One small session', emoji: '✦', done: false, history: {}, chapters: [] });
  }
  if (modalType === 'chapter') {
    const habit = state.habits.find(item => String(item.id) === String(chapterSubjectId));
    if (habit) { const existing = habit.chapters.find(chapter => String(chapter.id) === String(editingId)); if (existing) existing.name = name; else habit.chapters.push(createChapter(name)); }
  }
  if (modalType === 'achievement') {
    const topicItem = achievementCollection(achievementKind).find(topicEntry => String(topicEntry.id) === String(chapterSubjectId));
    if (topicItem) topicItem.items.push({ id: `custom-${Date.now()}`, name, done: false, custom: true });
  }
  if (modalType === 'achievement-topic') achievementCollection(achievementKind).push({ id: `custom-topic-${Date.now()}`, title: name, custom: true, items: [] });
  if (modalType === 'goal') {
    const existing = editingId && state.goals.find(goal => String(goal.id) === String(editingId));
    if (existing) { existing.name = name; existing.why = $('#itemWhy').value.trim() || 'A meaningful next step.'; existing.progress = Number($('#itemProgress').value) || 0; }
    else state.goals.push({ id: Date.now(), name, why: $('#itemWhy').value.trim() || 'A meaningful next step.', icon: '✦', progress: Number($('#itemProgress').value) || 0 });
  }
  saveState(); renderAll(); closeModal(); showToast(modalType === 'task' ? (wasEditing ? 'Task updated' : 'Task added') : modalType === 'habit' ? (wasEditing ? 'Habit updated' : 'Habit added') : modalType === 'chapter' ? 'Chapter saved' : modalType === 'achievement' ? 'Achievement added' : modalType === 'achievement-topic' ? 'Topic added' : (wasEditing ? 'Goal updated' : 'Goal added'));
}

const affirmations = ['I do not need to be perfect. I only need to keep showing up.', 'My future is built by what I practice today.', 'Small progress is still proof that I am moving.', 'I can do hard things one focused step at a time.', 'I am becoming someone who keeps promises to myself.'];
function nextAffirmation() { const current = $('#affirmationText').textContent; const options = affirmations.filter(item => item !== current); $('#affirmationText').textContent = options[Math.floor(Math.random() * options.length)]; }
function showToast(text) { $('#toastText').textContent = text; $('#toast').classList.add('show'); clearTimeout(toastTimeout); toastTimeout = setTimeout(() => $('#toast').classList.remove('show'), 2400); }
function buildBackupPayload() { return { app: 'Momentum', version: 2, exportedAt: new Date().toISOString(), data: state }; }
function updateJsonStatus(status, detail, connected = false) {
  $('#jsonStatus').textContent = status;
  $('#jsonStatusText').textContent = detail;
  $('.json-file-box').classList.toggle('connected', connected);
}
function monthlyFileName() { return `momentum-${monthKeyForDate(dateKey())}.json`; }
async function saveMonthlyFile(showMessage = true) {
  if (!jsonDirectoryHandle) return false;
  try {
    const fileName = monthlyFileName(); const handle = await jsonDirectoryHandle.getFileHandle(fileName, { create: true }); const writable = await handle.createWritable();
    await writable.write(JSON.stringify({ ...buildBackupPayload(), monthFile: fileName }, null, 2)); await writable.close();
    updateJsonStatus(`Month file: ${fileName}`, 'Auto-save is on', true);
    if (showMessage) showToast(`${fileName} created and saved`);
    return true;
  } catch {
    updateJsonStatus('Monthly folder unavailable', 'Choose Set monthly JSON folder again', false);
    if (showMessage) showToast('Could not write the monthly JSON file');
    return false;
  }
}
async function setJsonFolder() {
  jsonFileHandle = null;
  if (!window.showDirectoryPicker) {
    exportBackup(); updateJsonStatus('Download fallback active', 'Create a monthly JSON file with Download backup', false); showToast('This browser cannot auto-create folder files'); return;
  }
  try {
    jsonDirectoryHandle = await window.showDirectoryPicker({ mode: 'readwrite' });
    await saveMonthlyFile(true);
  } catch (error) { if (error.name !== 'AbortError') showToast('Could not choose a monthly folder'); }
}
function exportBackup() {
  const blob = new Blob([JSON.stringify(buildBackupPayload(), null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob); const link = document.createElement('a');
  link.href = url; link.download = `momentum-backup-${todayKey}.json`; document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(url);
  showToast('Backup downloaded to your device');
}
async function writeJsonFile(showMessage = true) {
  if (!jsonFileHandle) return false;
  try {
    if (jsonFileHandle.queryPermission) {
      let permission = await jsonFileHandle.queryPermission({ mode: 'readwrite' });
      if (permission !== 'granted' && jsonFileHandle.requestPermission) permission = await jsonFileHandle.requestPermission({ mode: 'readwrite' });
      if (permission !== 'granted') throw new Error('Permission denied');
    }
    const writable = await jsonFileHandle.createWritable();
    await writable.write(JSON.stringify(buildBackupPayload(), null, 2));
    await writable.close();
    updateJsonStatus(`Connected: ${jsonFileHandle.name || 'JSON file'}`, 'Auto-save is on', true);
    if (showMessage) showToast('Saved to your JSON file');
    return true;
  } catch {
    updateJsonStatus('JSON file unavailable', 'Choose Save to JSON file again', false);
    if (showMessage) showToast('Could not write to the JSON file');
    return false;
  }
}
function queueJsonSave() {
  if (!jsonFileHandle && !jsonDirectoryHandle) return;
  clearTimeout(jsonSaveTimer);
  jsonSaveTimer = setTimeout(() => jsonDirectoryHandle ? saveMonthlyFile(false) : writeJsonFile(false), 300);
}
async function saveToJsonFile() {
  if (jsonDirectoryHandle) { await saveMonthlyFile(true); return; }
  if (!window.showSaveFilePicker) {
    exportBackup();
    updateJsonStatus('Download fallback active', 'Use downloaded JSON as your backup', false);
    showToast('This browser downloads a JSON backup instead');
    return;
  }
  try {
    jsonFileHandle = await window.showSaveFilePicker({
      suggestedName: `momentum-data-${todayKey}.json`,
      types: [{ description: 'Momentum JSON data', accept: { 'application/json': ['.json'] } }]
    });
    await writeJsonFile(true);
  } catch (error) {
    if (error.name !== 'AbortError') showToast('Could not choose a JSON file');
  }
}
function applyBackup(parsed) {
  const imported = parsed.data || parsed;
  if (!imported || !Array.isArray(imported.habits) || !Array.isArray(imported.goals)) throw new Error('Invalid backup');
  const previousDate = imported.date;
  state = { ...makeSeedState(), ...imported };
  state.habits = imported.habits.map(normalizeHabit);
  state.goals = imported.goals;
  state.achievements = normalizeAchievements(imported.achievements || freshAchievementSeed());
  state.pythonAchievements = normalizeAchievements(imported.pythonAchievements || freshPythonAchievementSeed());
  state.tasks = (Array.isArray(imported.tasks) ? imported.tasks : []).map(normalizeTask);
  state.openHistory = imported.openHistory || {};
  state.focusLog = imported.focusLog || {};
  if (previousDate !== todayKey) state.habits = state.habits.map(habit => ({ ...habit, done: Boolean(habit.history?.[todayKey]) }));
  rolloverPendingTasks(state.tasks);
  state.date = todayKey; state.openHistory[todayKey] = true; state.streak = calculateOpenStreak(state.openHistory);
  saveState(); renderAll();
}
async function openJsonFile() {
  jsonDirectoryHandle = null;
  if (!window.showOpenFilePicker) {
    updateJsonStatus('Import fallback active', 'Choose a JSON file to restore', false);
    $('#backupFile').click();
    return;
  }
  try {
    const [handle] = await window.showOpenFilePicker({ types: [{ description: 'Momentum JSON data', accept: { 'application/json': ['.json'] } }], multiple: false });
    const file = await handle.getFile();
    applyBackup(JSON.parse(await file.text()));
    jsonFileHandle = handle;
    updateJsonStatus(`Connected: ${handle.name || 'JSON file'}`, 'Auto-save is on', true);
    showToast('JSON file opened and connected');
  } catch (error) {
    if (error.name !== 'AbortError') showToast('Could not open: invalid JSON file');
  }
}
function restoreBackup(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = event => {
    try { applyBackup(JSON.parse(event.target.result)); showToast('Backup restored successfully'); }
    catch { showToast('Could not restore: invalid backup file'); }
    $('#backupFile').value = '';
  };
  reader.readAsText(file);
}
function setSection(section) { $$('.nav-item').forEach(button => button.classList.toggle('active', button.dataset.section === section)); $$('.section-view').forEach(view => view.classList.toggle('active', view.id === section)); window.scrollTo({ top: 0, behavior: 'smooth' }); }

function currentElapsed() { return timer.elapsed + (timer.running ? Math.floor((Date.now() - timer.startedAt) / 1000) : 0); }
function formatTimer(seconds) { const h = Math.floor(seconds / 3600).toString().padStart(2, '0'); const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0'); const s = (seconds % 60).toString().padStart(2, '0'); return `${h}:${m}:${s}`; }
function renderTimer() { $('#timerDisplay').textContent = formatTimer(currentElapsed()); const seconds = currentElapsed(); const degrees = Math.min(360, (seconds % 3600) / 10); $('.timer-circle').style.background = `conic-gradient(var(--blue) ${degrees}deg, #edf0fc ${degrees}deg, #edf0fc 360deg)`; }
function startTimer() { if (timer.running) return; timer.running = true; timer.startedAt = Date.now(); $('#startTimer').textContent = 'Stop timer'; $('#timerHint').textContent = 'Keep going — stop whenever you are done.'; timer.interval = setInterval(renderTimer, 250); }
function stopTimer() { if (!timer.running) return; timer.elapsed = currentElapsed(); timer.running = false; clearInterval(timer.interval); const minutes = Math.max(1, Math.round(timer.elapsed / 60)); state.focusMinutes += minutes; state.focusLog[todayKey] = Number(state.focusLog[todayKey] || 0) + minutes; state.completedFocus += 1; state.points += 15; saveState(); renderAll(); $('#startTimer').textContent = 'Start timer'; $('#timerHint').textContent = `${minutes} minutes logged. Nice work.`; showToast(`${minutes} focus minutes saved · +15 XP`); }
function resetTimer() { clearInterval(timer.interval); timer = { running: false, elapsed: 0, startedAt: 0, interval: null }; $('#startTimer').textContent = 'Start timer'; $('#timerHint').textContent = 'Run it until you decide to stop.'; renderTimer(); }

function attachEvents() {
  $$('.nav-item').forEach(button => button.addEventListener('click', () => setSection(button.dataset.section)));
  $$('[data-jump]').forEach(button => button.addEventListener('click', () => setSection(button.dataset.jump)));
  $('#quickAddBtn').addEventListener('click', () => openModal('task')); $('#addTaskInline').addEventListener('click', () => openModal('task')); $('#addHabitBtn').addEventListener('click', () => openModal('habit')); $('#addGoalBtn').addEventListener('click', () => openModal('goal')); $('#addAchievementTopicBtn').addEventListener('click', () => openModal('achievement-topic', null, null, todayKey, 'linux')); $('#addPythonAchievementTopicBtn').addEventListener('click', () => openModal('achievement-topic', null, null, todayKey, 'python'));
  $('#stackHabitBtn').addEventListener('click', () => { state.tasks.push({ id: Date.now(), name: 'After chai: 15 minutes of coding', tag: 'Habit stack', dueDate: todayKey, done: false, completedAt: null }); saveState(); renderAll(); showToast('Habit stack added to today'); });
  $('#newAffirmation').addEventListener('click', nextAffirmation);
  $('#modalForm').addEventListener('submit', submitModal); $('#closeModal').addEventListener('click', closeModal); $('#cancelModal').addEventListener('click', closeModal); $('#modalBackdrop').addEventListener('click', event => { if (event.target.id === 'modalBackdrop') closeModal(); });
  $('#itemProgress').addEventListener('input', event => { $('#progressInputValue').textContent = `${event.target.value}%`; });
  $('#themeToggle').addEventListener('click', () => { state.theme = state.theme === 'dark' ? 'light' : 'dark'; saveState(); renderAll(); });
  $('#setJsonFolder').addEventListener('click', setJsonFolder); $('#saveJsonFile').addEventListener('click', saveToJsonFile); $('#openJsonFile').addEventListener('click', openJsonFile);
  $('#exportData').addEventListener('click', exportBackup); $('#importData').addEventListener('click', () => $('#backupFile').click()); $('#backupFile').addEventListener('change', event => restoreBackup(event.target.files[0]));
  $('#resetData').addEventListener('click', () => { if (confirm('Reset all demo data on this device?')) { state = makeSeedState(); state.streak = calculateOpenStreak(state.openHistory); saveState(); renderAll(); showToast('Demo data reset'); } });
  $('#startTimer').addEventListener('click', () => timer.running ? stopTimer() : startTimer()); $('#resetTimer').addEventListener('click', resetTimer);
  $('#prevMonth').addEventListener('click', () => { calendarCursor.setMonth(calendarCursor.getMonth() - 1); selectedCalendarKey = `${calendarCursor.getFullYear()}-${String(calendarCursor.getMonth() + 1).padStart(2, '0')}-01`; renderCalendar(); }); $('#nextMonth').addEventListener('click', () => { calendarCursor.setMonth(calendarCursor.getMonth() + 1); selectedCalendarKey = `${calendarCursor.getFullYear()}-${String(calendarCursor.getMonth() + 1).padStart(2, '0')}-01`; renderCalendar(); }); $('#calendarToday').addEventListener('click', () => { calendarCursor = new Date(); selectedCalendarKey = todayKey; renderCalendar(); });
  $('#addCalendarTaskBtn').addEventListener('click', () => { if (selectedCalendarKey >= todayKey) openModal('task', null, null, selectedCalendarKey); });
  $('#saveReflection').addEventListener('click', () => { state.reflection = $('#reflectionText').value.trim(); saveState(); $('#saveStatus').textContent = 'Saved just now'; showToast('Reflection saved locally'); });
  $('#rewardBtn').addEventListener('click', () => showToast('Reward idea: take a guilt-free movie break 🎬'));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });
}

formatDate(); renderAll(); renderTimer(); attachEvents();
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
