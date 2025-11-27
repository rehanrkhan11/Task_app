import axios from 'axios'
import { AlertCircle, CheckCircle, Clock, LogOut, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAuthStore } from '../store/auth'
import { useTaskStore } from '../store/tasks'
import TaskForm from './TaskForm'
import TaskList from './TaskList'

interface Task {
  id: number;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  createdAt?: string;
}

export default function Dashboard() {
  const { tasks, loading, error, setTasks, setLoading, setError, removeTask, updateTask } = useTaskStore()
  const { logout, user } = useAuthStore()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [filter, setFilter] = useState<"all" | "pending" | "in-progress" | "completed">("all")

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    setLoading(true)
    try {
      const r = await axios.get('/tasks')
      setTasks(r.data)
    } catch (err: any) {
      setError('Failed to fetch tasks')
    } finally {
      setLoading(false)
    }
  }

  const handleAddTask = async (taskData: { title: string; description: string; status: string }) => {
    try {
      const r = await axios.post('/tasks', taskData)
      setTasks([...tasks, r.data])
      setShowForm(false)
    } catch (err: any) {
      setError('Failed to add task')
    }
  }

  const handleUpdateTask = async (id: number, taskData: { title: string; description: string; status: string }) => {
    try {
      const r = await axios.put(`/tasks/${id}`, taskData)
      updateTask(id, r.data)
      setEditingId(null)
    } catch (err: any) {
      setError('Failed to update task')
    }
  }

  const handleDeleteTask = async (id: number) => {
    try {
      await axios.delete(`/tasks/${id}`)
      removeTask(id)
    } catch (err: any) {
      setError('Failed to delete task')
    }
  }

  const filteredTasks = filter === 'all' 
    ? tasks 
    : tasks.filter((t: Task) => t.status === filter)

  const statusIcons: Record<string, any> = {
    'pending': <AlertCircle size={16} />,
    'in-progress': <Clock size={16} />,
    'completed': <CheckCircle size={16} />
  }

  const statusColors: Record<string, string> = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    'completed': 'bg-green-100 text-green-800'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Task Dashboard</h1>
            {user && <p className="text-gray-600 text-sm mt-1">Welcome, {user.username}</p>}
          </div>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 flex items-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Add Task Button */}
        <div className="mb-6">
          <button
            onClick={() => { setShowForm(!showForm); setEditingId(null) }}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 flex items-center gap-2"
          >
            <Plus size={18} />
            {showForm ? 'Cancel' : 'Add New Task'}
          </button>
        </div>

        {/* Task Form */}
        {showForm && !editingId && (
          <TaskForm
            onSubmit={(data) => handleAddTask(data)}
            onCancel={() => setShowForm(false)}
          />
        )}

        {/* Edit Form */}
        {editingId && (
          <TaskForm
            task={tasks.find((t: Task) => t.id === editingId)}
            onSubmit={(data) => handleUpdateTask(editingId, data)}
            onCancel={() => setEditingId(null)}
            isEditing={true}
          />
        )}

        {/* Filter Buttons */}
        <div className="mb-6 flex gap-2 flex-wrap">
          {(['all', 'pending', 'in-progress', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
                filter === f
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-600 text-sm font-medium">Total Tasks</p>
            <p className="text-2xl font-bold text-gray-800">{tasks.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-600 text-sm font-medium">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{tasks.filter((t: Task) => t.status === 'pending').length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-600 text-sm font-medium">Completed</p>
            <p className="text-2xl font-bold text-green-600">{tasks.filter((t: Task) => t.status === 'completed').length}</p>
          </div>
        </div>

        {/* Task List */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <AlertCircle className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600 text-lg">No tasks found</p>
            <p className="text-gray-500 text-sm mt-2">
              {filter === 'all' ? 'Create your first task to get started!' : `No tasks with status "${filter}"`}
            </p>
          </div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onEdit={setEditingId}
            onDelete={handleDeleteTask}
            statusColors={statusColors}
            statusIcons={statusIcons}
          />
        )}
      </div>
    </div>
  )
}
