import { http, HttpResponse } from "msw";
import { setupWorker } from "msw/browser";

interface Task {
  id: number;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  createdAt?: string;
}

// Initialize tasks from localStorage or use defaults
const initializeTasks = (): Task[] => {
  const stored = localStorage.getItem("mockTasks");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [{ id: 1, title: "Sample Task", description: "demo", status: "pending" }];
    }
  }
  return [{ id: 1, title: "Sample Task", description: "demo", status: "pending" }];
};

let tasks = initializeTasks();

// Helper to persist tasks
const persistTasks = () => {
  localStorage.setItem("mockTasks", JSON.stringify(tasks));
};

export const worker = setupWorker(
  // LOGIN
  http.post("/login", async ({ request }) => {
    try {
      const body = await request.json() as any;
      const { username, password } = body;
      
      console.log("🔐 Login attempt:", { username, password });

      if (username === "test" && password === "test123") {
        console.log("✅ Login successful");
        return HttpResponse.json({ 
          token: "fake-jwt-token-" + Date.now(),
          user: { id: 1, username: "test" }
        }, { status: 200 });
      }

      console.log("❌ Invalid credentials");
      return HttpResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    } catch (err) {
      console.error("❌ Login error:", err);
      return HttpResponse.json(
        { message: "Server error" },
        { status: 500 }
      );
    }
  }),

  // GET TASKS
  http.get("/tasks", () => {
    return HttpResponse.json(tasks, { status: 200 });
  }),

  // CREATE TASK
  http.post("/tasks", async ({ request }) => {
    const body = await request.json() as any;
    const newTask: Task = {
      id: Date.now(),
      title: body.title,
      description: body.description,
      status: body.status || "pending",
      createdAt: new Date().toISOString()
    };
    tasks.push(newTask);
    persistTasks();
    return HttpResponse.json(newTask, { status: 201 });
  }),

  // UPDATE TASK
  http.put("/tasks/:id", async ({ params, request }) => {
    const id = Number(params.id);
    const body = await request.json() as any;

    const exists = tasks.find((t: Task) => t.id === id);
    if (!exists) {
      return HttpResponse.json(
        { message: "Task not found" },
        { status: 404 }
      );
    }

    const updated: Task = { ...exists, ...body, id };
    tasks = tasks.map((t: Task) => (t.id === id ? updated : t));
    persistTasks();
    return HttpResponse.json(updated, { status: 200 });
  }),

  // DELETE TASK
  http.delete("/tasks/:id", ({ params }) => {
    const id = Number(params.id);
    const initialLength = tasks.length;
    tasks = tasks.filter((t: Task) => t.id !== id);
    
    if (tasks.length === initialLength) {
      return HttpResponse.json(
        { message: "Task not found" },
        { status: 404 }
      );
    }

    persistTasks();
    return HttpResponse.json({ success: true }, { status: 200 });
  })
);
