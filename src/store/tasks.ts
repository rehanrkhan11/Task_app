import { create } from 'zustand';

interface Task {
  id: number;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  createdAt?: string;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  removeTask: (id: number) => void;
  updateTask: (id: number, task: Partial<Task>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  loading: false,
  error: null,
  
  setTasks: (tasks: Task[]) => set({ tasks }),
  
  addTask: (task: Task) => set((state) => ({
    tasks: [...state.tasks, task]
  })),
  
  removeTask: (id: number) => set((state) => ({
    tasks: state.tasks.filter(t => t.id !== id)
  })),
  
  updateTask: (id: number, updatedData: Partial<Task>) => set((state) => ({
    tasks: state.tasks.map(t => t.id === id ? { ...t, ...updatedData } : t)
  })),
  
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error })
}))
