# Momentum — Self-help + BCA Habit Tracker

A responsive, installable PWA prototype for building consistency, focus, motivation, and BCA study habits.

## Included
- Daily priorities with completion state, XP, progress and streaks
- Customizable BCA habit tracker with Programming, Maths, DBMS, Projects and German defaults
- Add, edit and delete habits with custom daily goals
- Daily habit checks with a 7-day progress bar for every habit
- Chapter tracker inside every BCA subject — add, edit, delete and check chapters
- Daily, weekly and monthly auto-generated reports with motivational messages
- Monthly 30-day progress chart and last-7-days improvement percentage
- Calendar view showing app-open streaks and habit completion
- Continuous focus timer that runs until you stop it and logs minutes
- Vision board with editable long-term goals and progress sliders
- Linux study achievement tracker with all 13 topics, checkable subtopics, completed/remaining totals, add/delete topic and achievement controls
- Python study achievement tracker with 15 topics from Data Structures through C Extensions, with the same checkable progress system
- End-of-day reflection saved locally
- Positive affirmations, reward prompt and habit-stacking shortcut
- Light/dark theme
- Local-only persistence via `localStorage`
- Connect a local folder so the app creates `momentum-YYYY-MM.json` for each month and auto-saves during the current browser session
- Calendar task planner for today and future dates, with yellow pending and green completed states
- Completed tasks store their completion date; past pending tasks roll forward into the current month
- Monthly calendar totals for completed, pending and total tasks
- Task analytics, success rate and 30-day task completion chart
- Download full JSON backup anytime and restore it later from the sidebar
- Uses localStorage only as a fallback when a JSON folder/file is not connected

## Run locally
Because the service worker needs a web origin, serve this folder rather than opening the HTML file directly:

```bash
python3 -m http.server 4173 --bind 0.0.0.0
```

Then open `http://localhost:4173`.
