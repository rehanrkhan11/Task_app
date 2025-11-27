import { Edit, Trash2 } from 'lucide-react';
import React from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  createdAt?: string;
}

interface TaskListProps {
  tasks: Task[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  statusColors: Record<string, string>;
  statusIcons: Record<string, React.ReactNode>;
}

export default function TaskList({
  tasks,
  onEdit,
  onDelete,
  statusColors,
  statusIcons
}: TaskListProps) {
  return (
    <div className="space-y-4">
      {tasks.map((task: Task) => (
        <div
          key={task.id}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-200"
        >
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-bold text-gray-800">{task.title}</h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                    statusColors[task.status]
                  }`}
                >
                  {statusIcons[task.status]}
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ')}
                </span>
              </div>
              <p className="text-gray-600">{task.description}</p>
              {task.createdAt && (
                <p className="text-gray-400 text-xs mt-2">
                  Created: {new Date(task.createdAt).toLocaleDateString()}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(task.id)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-lg transition duration-200 flex items-center gap-1"
              >
                <Edit size={16} />
                Edit
              </button>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this task?')) {
                    onDelete(task.id)
                  }
                }}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded-lg transition duration-200 flex items-center gap-1"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
