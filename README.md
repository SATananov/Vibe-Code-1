# Priority Planner — Eisenhower Matrix

A simple, offline-capable, one-page web app to organize tasks by **Importance × Urgency**.  
No frameworks, no CDNs — just HTML, CSS, and vanilla JS.

## Features
- 🌓 **Light/Dark** theme (CSS variables)
- ✅ Mark done, 🔁 move between quadrants, 🗑 delete
- ⌨️ Keyboard support: **Tab / Enter / Space / Delete / ← →**
- 💾 LocalStorage persistence (works offline)
- ♿ Accessible labels, roles, focus states, aria-live

## How to use
1. Type a **Title**, optionally a note. Toggle **Important** and **Urgent**.
2. Press **Enter** or click **Add Task**.
3. Tasks appear in one of four quadrants:
   - 🔥 Do First (Important & Urgent)
   - 📅 Schedule (Important, Not Urgent)
   - 📨 Delegate (Not Important, Urgent)
   - 🧹 Eliminate (Not Important, Not Urgent)
4. Use keyboard on a focused task:
   - **Space / Enter** → toggle done
   - **Delete** → delete task
   - **← / →** → move task across quadrants

## Project structure
