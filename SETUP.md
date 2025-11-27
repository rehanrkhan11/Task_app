# Quick Start Guide

## 🚀 Get Running in 3 Minutes

### Step 1: Install Dependencies
```bash
npm install
```
This installs all required packages:
- React & React DOM
- Zustand (state management)
- Axios (HTTP client)
- Mock Service Worker (API mocking)
- Tailwind CSS (styling)
- Lucide React (icons)
- TypeScript & Vite (dev tools)

### Step 2: Start Development Server
```bash
npm run dev
```
Open your browser to: **`http://localhost:5173`**

### Step 3: Login with Demo Credentials
```
Username: test
Password: test123
```

## 📋 Demo Walkthrough

1. **Login** with demo credentials
2. **Create a Task** by clicking "Add New Task"
   - Add title and description
   - Select status
   - Click "Add Task"
3. **Edit a Task** by clicking "Edit" button
4. **Delete a Task** by clicking "Delete" and confirming
5. **Filter Tasks** using status buttons (All, Pending, etc.)
6. **View Statistics** in the dashboard cards
7. **Logout** using the Logout button

## 🛠️ Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (hot reload) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

## 📁 Project Structure

```
src/
├── components/
│   ├── Login.tsx          # Login form
│   ├── Dashboard.tsx      # Main dashboard
│   ├── TaskForm.tsx       # Add/Edit form
│   └── TaskList.tsx       # Task cards
├── store/
│   ├── auth.ts            # Auth state (Zustand)
│   └── tasks.ts           # Task state (Zustand)
├── mock.ts                # MSW setup & endpoints
├── App.tsx                # Main routing
└── main.tsx               # Entry point
```

## 🔍 What's Mocked?

All backend API calls are intercepted and mocked:

- ✅ **POST /login** → Returns JWT token
- ✅ **GET /tasks** → Returns task list
- ✅ **POST /tasks** → Creates new task
- ✅ **PUT /tasks/:id** → Updates task
- ✅ **DELETE /tasks/:id** → Deletes task

**No real backend needed!** All data persists in localStorage.

## 💾 Data Persistence

Tasks and auth tokens automatically save to localStorage:
- `token` - Authentication token
- `user` - User information
- `mockTasks` - All tasks (survives page refresh)

## 🎨 UI Features

- 📱 **Responsive Design** - Works on all devices
- 🎯 **Status Badges** - Color-coded with icons
- 📊 **Statistics** - Real-time task counts
- 🔍 **Filtering** - Filter by task status
- ⚠️ **Error Handling** - User-friendly messages
- ⏳ **Loading States** - Visual feedback

## 🐛 Troubleshooting

### npm install fails?
```bash
npm cache clean --force
npm install
```

### Port 5173 already in use?
```bash
npm run dev -- --port 3000
```

### Styles not loading?
```bash
npm run dev
# Restart dev server
```

### Tasks not persisting?
- Open DevTools (F12)
- Check Application → LocalStorage
- Verify `mockTasks` key exists

### MSW not working?
- Check browser console for MSW activation
- Verify `worker.start()` in `main.tsx`
- Clear cache and refresh

## 📚 Key Technologies

| Technology | Purpose |
|-----------|---------|
| **React** | UI library |
| **TypeScript** | Type safety |
| **Zustand** | State management |
| **Tailwind CSS** | Styling |
| **MSW** | API mocking |
| **Axios** | HTTP requests |
| **Vite** | Build tool |

## 🎓 Learning Resources

### In This Project:
- ✓ Component composition in React
- ✓ Type-safe state management
- ✓ API mocking with MSW
- ✓ Tailwind CSS utility classes
- ✓ Form handling & validation
- ✓ localStorage integration
- ✓ Error handling patterns
- ✓ Responsive design

## ✨ Next Steps

After exploring, try these enhancements:

1. **Add Filters** - Search by title
2. **Add Due Dates** - Date picker for tasks
3. **Dark Mode** - Toggle light/dark theme
4. **Export** - Download tasks as CSV
5. **Categories** - Organize with tags
6. **Tests** - Add Jest + React Testing Library

## 📝 Notes

- This is a **frontend-only** application
- All data is **stored locally** in browser
- **No backend server** required
- Perfect for **portfolio projects** or **learning**

## 🆘 Need Help?

1. Check the `README.md` for detailed docs
2. Review component files - they're well-commented
3. Check browser DevTools console for errors
4. Verify all dependencies installed: `npm list`

---

**Ready? Run `npm install && npm run dev` and start managing tasks!**

Happy coding! 🎉
