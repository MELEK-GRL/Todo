import React from "react";
import Button from "./Button";

interface Task {
  name: string;
  email: string;
  stage: string;
  rating: number;
  appliedJob: string;
  resume: string;
}

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  newTask: Partial<Task>;
  setNewTask: (task: Partial<Task>) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  newTask,
  setNewTask,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add New Candidate</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={newTask.name || ""}
              onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
              className="w-full px-3 py-2 border rounded text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={newTask.email || ""}
              onChange={(e) =>
                setNewTask({ ...newTask, email: e.target.value })
              }
              className="w-full px-3 py-2 border rounded text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stage
            </label>
            <select
              value={newTask.stage || "New"}
              onChange={(e) =>
                setNewTask({ ...newTask, stage: e.target.value })
              }
              className="w-full px-3 py-2 border rounded text-sm"
            >
              <option value="New">New</option>
              <option value="Interview">Interview</option>
              <option value="Hired">Hired</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Applied Job
            </label>
            <input
              type="text"
              value={newTask.appliedJob || ""}
              onChange={(e) =>
                setNewTask({ ...newTask, appliedJob: e.target.value })
              }
              className="w-full px-3 py-2 border rounded text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Resume
            </label>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              <input
                type="text"
                value={newTask.resume || ""}
                onChange={(e) =>
                  setNewTask({ ...newTask, resume: e.target.value })
                }
                placeholder="url"
                className="flex-1 px-3 py-2 border rounded text-sm"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Add
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
