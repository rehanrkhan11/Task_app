# Task Management Application

A modern, fully-functional task management application built with React, TypeScript, and Tailwind CSS. The app simulates a complete backend using Mock Service Worker (MSW), providing a realistic frontend-only experience.

## Features

### Core Functionality
- ✅ **User Authentication**: Login system with JWT token simulation
  - Demo credentials: `username: test` | `password: test123`
  - Persistent session using localStorage
- ✅ **Dashboard**: Clean, responsive task management interface
- ✅ **Task CRUD Operations**:
  - Create new tasks with title, description, and status
  - Read/View all tasks with filtering
  - Update existing tasks
  - Delete tasks with confirmation
- ✅ **Task Status Management**: Pending, In-Progress, Completed
- ✅ **Task Filtering**: Filter by status with visual indicators
- ✅ **Statistics Dashboard**: Real-time task counts
- ✅ **Error Handling**: User-friendly error messages
- ✅ **Logout**: Secure session termination

### UI/UX Features
- 🎨 **Responsive Design**: Mobile-friendly layout
- 🎨 **Tailwind CSS Styling**: Modern, clean interface
- 🎨 **Status Indicators**: Color-coded badges with icons
- 🎨 **Loading States**: Visual feedback during operations
- 🎨 **Empty States**: Helpful messages when no tasks exist
- 🎨 **Icon Integration**: Lucide React icons throughout

### State Management
- **Zustand**: Lightweight state management for auth and tasks
- **Persistent Storage**: localStorage for auth tokens and tasks
- **Type-Safe**: Full TypeScript support

### Mock API Layer
- **Mock Service Worker (MSW)**: Realistic API simulation
- **Endpoints**: POST /login, GET /tasks, POST /tasks, PUT /tasks/:id, DELETE /tasks/:id
- **Persistence**: Tasks persist across page reloads
- **Error Handling**: Proper HTTP status codes and error messages

## Project Structure

```
taskapp/
├── src/
│   ├── components/
│   │   ├── Login.tsx           # Login form with validation
│   │   ├── Dashboard.tsx       # Main task dashboard
│   │   ├── TaskForm.tsx        # Add/Edit task form
│   │   └── TaskList.tsx        # Task list display
│   ├── store/
│   │   ├── auth.ts             # Authentication state (Zustand)
│   │   └── tasks.ts            # Task state (Zustand)
│   ├── mock.ts                 # MSW setup and endpoints
│   ├── App.tsx                 # Main app component with auth routing
│   └── main.tsx                # React entry point
├── index.html                  # HTML template
├── index.css                   # Global styles + Tailwind
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
├── vite.config.ts              # Vite configuration
└── package.json                # Dependencies

```

## Technologies Used

| Category | Technology |
|----------|-----------|
| **Framework** | React 18 |
| **Language** | TypeScript |
| **Build Tool** | Vite 5 |
| **Styling** | Tailwind CSS 4 |
| **State Management** | Zustand |
| **HTTP Client** | Axios |
| **Mock API** | Mock Service Worker (MSW) 2 |
| **Icons** | Lucide React |
| **Validation** | Formik + Yup (optional) |

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Navigate to project directory:**
   ```bash
   cd taskapp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   This installs:
   - React & React DOM
   - Zustand for state management
   - Axios for HTTP requests
   - MSW for API mocking
   - Tailwind CSS for styling
   - TypeScript & Vite dev tools

3. **Start development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

4. **Build for production:**
   ```bash
   npm run build
   ```

## How the Mocking Works

### Mock Service Worker (MSW)

This application uses MSW to intercept network requests and provide mock responses. All data is stored in-memory with localStorage persistence.

#### Key Files:
- **`src/mock.ts`**: Contains all mock endpoint definitions

#### Endpoints:

**POST /login**
```typescript
Request: { username: string, password: string }
Response: { token: string, user: { id: number, username: string } }
Status: 200 (success) | 401 (invalid credentials)
```
Demo: `test` / `test123`

**GET /tasks**
```typescript
Response: Task[]
Status: 200
```

**POST /tasks**
```typescript
Request: { title: string, description: string, status: string }
Response: Task (with auto-generated ID and timestamp)
Status: 201
```

**PUT /tasks/:id**
```typescript
Request: { title?: string, description?: string, status?: string }
Response: Updated Task
Status: 200 | 404 (not found)
```

**DELETE /tasks/:id**
```typescript
Response: { success: true }
Status: 200 | 404 (not found)
```

### Persistence

- **Tasks**: Stored in localStorage as `mockTasks` (survives page reload)
- **Auth Token**: Stored in localStorage as `token`
- **User Info**: Stored in localStorage as `user`

### Data Structure

```typescript
interface Task {
  id: number;                                    // Timestamp-based unique ID
  title: string;                                 // Task title
  description: string;                           // Task description
  status: "pending" | "in-progress" | "completed"; // Task status
  createdAt?: string;                            // ISO timestamp
}
```

## Usage Guide

### 1. Login
- Enter username: `test`
- Enter password: `test123`
- Click "Sign In"
- Token is automatically stored

### 2. Create Task
- Click "Add New Task" button
- Fill in title and description
- Select status (Pending/In-Progress/Completed)
- Click "Add Task"

### 3. View & Filter Tasks
- Use filter buttons to view tasks by status
- Stats panel shows counts by status
- View all task details in task cards

### 4. Edit Task
- Click "Edit" on any task
- Modify task details in the form
- Click "Update Task"

### 5. Delete Task
- Click "Delete" on any task
- Confirm deletion
- Task is immediately removed

### 6. Logout
- Click "Logout" button in header
- Session is cleared
- Redirected to login page

## State Management Architecture

### Auth Store (`src/store/auth.ts`)
```typescript
useAuthStore: {
  token: string | null,
  user: { id, username } | null,
  login: (token, user) => void,
  logout: () => void
}
```

### Task Store (`src/store/tasks.ts`)
```typescript
useTaskStore: {
  tasks: Task[],
  loading: boolean,
  error: string | null,
  setTasks: (tasks) => void,
  addTask: (task) => void,
  removeTask: (id) => void,
  updateTask: (id, data) => void,
  setLoading: (bool) => void,
  setError: (msg) => void
}
```

## Component Architecture

### App.tsx
- Routes between Login and Dashboard based on auth state
- Main entry component

### Login.tsx
- Form validation
- Error handling
- Loading states
- Visual feedback

### Dashboard.tsx
- Main dashboard layout
- Task statistics
- Filter controls
- Form integration
- Task management logic

### TaskForm.tsx
- Reusable form for add/edit
- Client-side validation
- Status selection
- Error display

### TaskList.tsx
- Task card display
- Action buttons (Edit/Delete)
- Status badges with icons
- Created date display

## Styling with Tailwind CSS

The application uses utility-first CSS with Tailwind CSS:
- Color scheme: Indigo/Blue primary, with status-specific colors
- Responsive grid layouts
- Smooth transitions and hover effects
- Shadow effects for depth
- Icons integrated throughout

## Development Notes

### Adding Features

1. **New State**: Add to relevant store (`auth.ts` or `tasks.ts`)
2. **New Endpoint**: Add to `src/mock.ts` following MSW pattern
3. **New Component**: Create in `src/components/`
4. **New Styles**: Use Tailwind classes directly in JSX

### TypeScript

All components and stores use full TypeScript typing:
- Task interface defined once
- Type-safe state management
- Proper error handling

### Performance

- Lazy filtering on client-side
- Minimal re-renders with Zustand
- Efficient localStorage access
- Optimized Vite bundle

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

### Optional Features to Add:
- [ ] **Dark Mode**: Toggle between light/dark themes
- [ ] **Form Validation**: Formik + Yup for advanced validation
- [ ] **Unit Tests**: Jest + React Testing Library
- [ ] **Task Sorting**: Sort by date, status, or custom
- [ ] **Search**: Full-text search across tasks
- [ ] **Categories/Tags**: Organize tasks
- [ ] **Due Dates**: Add date-based features
- [ ] **Notifications**: Toast notifications for actions
- [ ] **Export**: Export tasks to CSV/JSON
- [ ] **Docker**: Containerization for deployment

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**
2. **Connect repo to Vercel**
3. **Auto-deploy on push**

```bash
# Configure build
npm run build
```

### Netlify

1. **Connect Git repository**
2. **Build command**: `npm run build`
3. **Publish directory**: `dist`

### Local Development Build

```bash
npm run build
npm run preview  # Preview production build locally
```

## Troubleshooting

### Tasks not persisting?
- Check localStorage in DevTools (Application tab)
- Clear cache and reload
- Check browser localStorage is enabled

### Login not working?
- Verify credentials: `test` / `test123`
- Check MSW is active (DevTools Network tab should show mocked requests)
- Check console for errors

### Styles not loading?
- Ensure Tailwind CSS is imported in `main.tsx`
- Run `npm run build` to regenerate CSS

### MSW Issues?
- Check browser console for MSW activation message
- Verify `worker.start()` is called in `main.tsx`
- Clear browser cache

## Contributing

This is a case study project demonstrating:
- React best practices
- TypeScript patterns
- State management with Zustand
- Mock API implementation
- Modern UI/UX design
- Testing-ready architecture

## License

MIT

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the code comments
3. Check browser console for errors
4. Verify all dependencies are installed

---

**Built with ❤️ for the case study challenge**

Version: 1.0.0  
Last Updated: 2025-11-27
