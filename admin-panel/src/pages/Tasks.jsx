import React, { useState } from 'react';
import { 
  Plus, 
  Calendar, 
  User, 
  Clock, 
  CheckCircle, 
  Circle, 
  AlertCircle,
  Filter,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  UserPlus,
  Flag,
  MessageSquare,
  Eye,
  Download
} from 'lucide-react';
import { FilterPanel } from '../components/FilterPanel';
import { BulkActions } from '../components/BulkActions';

// Mock task data
const mockTasks = [
  {
    id: 1,
    title: 'Organize Youth Rally in Nassau',
    description: 'Coordinate venue, speakers, and logistics for the upcoming youth rally in Nassau. Need to confirm catering and security arrangements.',
    priority: 'high',
    status: 'pending',
    assignedTo: { name: 'Maria Rodriguez', avatar: 'MR', id: 1 },
    createdBy: { name: 'Philip Davis', avatar: 'PD', id: 2 },
    dueDate: '2024-07-15',
    category: 'events',
    progress: 25,
    comments: 3,
    attachments: 2,
    tags: ['rally', 'youth', 'nassau'],
    estimatedHours: 40,
    actualHours: 10,
    department: 'Events'
  },
  {
    id: 2,
    title: 'Update Supporter Database',
    description: 'Clean and update the supporter database with new registrations from the past month.',
    priority: 'medium',
    status: 'in_progress',
    assignedTo: { name: 'James Thompson', avatar: 'JT', id: 3 },
    createdBy: { name: 'Maria Rodriguez', avatar: 'MR', id: 1 },
    dueDate: '2024-07-12',
    category: 'data',
    progress: 60,
    comments: 1,
    attachments: 0,
    tags: ['database', 'supporters', 'cleanup'],
    estimatedHours: 16,
    actualHours: 9,
    department: 'Data Management'
  },
  {
    id: 3,
    title: 'Prepare Healthcare Initiative Report',
    description: 'Compile quarterly report on healthcare initiative progress, including beneficiary statistics and fund allocation.',
    priority: 'high',
    status: 'completed',
    assignedTo: { name: 'Sarah Wilson', avatar: 'SW', id: 4 },
    createdBy: { name: 'Philip Davis', avatar: 'PD', id: 2 },
    dueDate: '2024-07-08',
    category: 'reports',
    progress: 100,
    comments: 5,
    attachments: 3,
    tags: ['healthcare', 'report', 'quarterly'],
    estimatedHours: 24,
    actualHours: 26,
    department: 'Policy Research'
  },
  {
    id: 4,
    title: 'Social Media Campaign Review',
    description: 'Review and approve social media posts for the upcoming education reform campaign.',
    priority: 'medium',
    status: 'pending',
    assignedTo: { name: 'Michael Brown', avatar: 'MB', id: 5 },
    createdBy: { name: 'Sarah Wilson', avatar: 'SW', id: 4 },
    dueDate: '2024-07-14',
    category: 'marketing',
    progress: 0,
    comments: 0,
    attachments: 1,
    tags: ['social-media', 'education', 'campaign'],
    estimatedHours: 8,
    actualHours: 0,
    department: 'Communications'
  },
  {
    id: 5,
    title: 'Constituency Office Setup',
    description: 'Set up new constituency office in Freeport, including furniture, equipment, and staffing arrangements.',
    priority: 'high',
    status: 'overdue',
    assignedTo: { name: 'David Clarke', avatar: 'DC', id: 6 },
    createdBy: { name: 'Philip Davis', avatar: 'PD', id: 2 },
    dueDate: '2024-07-05',
    category: 'operations',
    progress: 80,
    comments: 7,
    attachments: 4,
    tags: ['office', 'freeport', 'setup'],
    estimatedHours: 60,
    actualHours: 48,
    department: 'Operations'
  }
];

const priorityColors = {
  low: 'text-gray-600 bg-gray-100',
  medium: 'text-yellow-600 bg-yellow-100',
  high: 'text-red-600 bg-red-100'
};

const statusColors = {
  pending: 'text-gray-600 bg-gray-100',
  in_progress: 'text-blue-600 bg-blue-100',
  completed: 'text-green-600 bg-green-100',
  overdue: 'text-red-600 bg-red-100'
};

function TaskCard({ task, onEdit, onDelete, onAssign, onView }) {
  const [showMenu, setShowMenu] = useState(false);

  const getStatusIcon = () => {
    switch (task.status) {
      case 'completed': return CheckCircle;
      case 'in_progress': return Clock;
      case 'overdue': return AlertCircle;
      default: return Circle;
    }
  };

  const StatusIcon = getStatusIcon();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <StatusIcon 
            size={20} 
            className={`mt-0.5 ${
              task.status === 'completed' ? 'text-green-600' :
              task.status === 'in_progress' ? 'text-blue-600' :
              task.status === 'overdue' ? 'text-red-600' :
              'text-gray-400'
            }`}
          />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{task.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{task.description}</p>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 text-gray-400 hover:text-gray-600 rounded"
          >
            <MoreHorizontal size={16} />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[160px]">
              <button
                onClick={() => { onView(task); setShowMenu(false); }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
              >
                <Eye size={14} />
                View Details
              </button>
              <button
                onClick={() => { onEdit(task); setShowMenu(false); }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
              >
                <Edit size={14} />
                Edit Task
              </button>
              <button
                onClick={() => { onAssign(task); setShowMenu(false); }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
              >
                <UserPlus size={14} />
                Reassign
              </button>
              <hr className="my-1" />
              <button
                onClick={() => { onDelete(task); setShowMenu(false); }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 text-red-600 flex items-center gap-2"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityColors[task.priority]}`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[task.status]}`}>
            {task.status.replace('_', ' ').charAt(0).toUpperCase() + task.status.replace('_', ' ').slice(1)}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{task.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${
              task.status === 'completed' ? 'bg-green-500' :
              task.status === 'overdue' ? 'bg-red-500' :
              'bg-blue-500'
            }`}
            style={{ width: `${task.progress}%` }}
          ></div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-600">
              {task.assignedTo.avatar}
            </div>
            <span className="text-sm text-gray-600">{task.assignedTo.name}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar size={14} />
            {new Date(task.dueDate).toLocaleDateString()}
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-500">
          {task.comments > 0 && (
            <div className="flex items-center gap-1">
              <MessageSquare size={14} />
              {task.comments}
            </div>
          )}
          {task.attachments > 0 && (
            <div className="flex items-center gap-1">
              <Download size={14} />
              {task.attachments}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TaskCreateModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    assignedTo: '',
    category: 'general',
    estimatedHours: '',
    tags: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
      assignedTo: '',
      category: 'general',
      estimatedHours: '',
      tags: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Task</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Task Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="general">General</option>
                  <option value="events">Events</option>
                  <option value="data">Data Management</option>
                  <option value="reports">Reports</option>
                  <option value="marketing">Marketing</option>
                  <option value="operations">Operations</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Hours</label>
                <input
                  type="number"
                  value={formData.estimatedHours}
                  onChange={(e) => setFormData({...formData, estimatedHours: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min="1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Assign To</label>
              <select
                value={formData.assignedTo}
                onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select team member...</option>
                <option value="1">Maria Rodriguez</option>
                <option value="2">Philip Davis</option>
                <option value="3">James Thompson</option>
                <option value="4">Sarah Wilson</option>
                <option value="5">Michael Brown</option>
                <option value="6">David Clarke</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                placeholder="e.g. urgent, rally, nassau"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Create Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export function Tasks() {
  const [tasks, setTasks] = useState(mockTasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'list'

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.assignedTo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTaskCreate = (taskData) => {
    const newTask = {
      id: Date.now(),
      ...taskData,
      status: 'pending',
      progress: 0,
      comments: 0,
      attachments: 0,
      actualHours: 0,
      createdBy: { name: 'Current User', avatar: 'CU', id: 999 },
      assignedTo: tasks.find(t => t.assignedTo.id.toString() === taskData.assignedTo)?.assignedTo || 
                   { name: 'Unassigned', avatar: 'UA', id: 0 },
      tags: taskData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      department: 'General'
    };
    setTasks([newTask, ...tasks]);
  };

  const getTaskStats = () => {
    const stats = {
      total: tasks.length,
      pending: tasks.filter(t => t.status === 'pending').length,
      in_progress: tasks.filter(t => t.status === 'in_progress').length,
      completed: tasks.filter(t => t.status === 'completed').length,
      overdue: tasks.filter(t => t.status === 'overdue').length
    };
    return stats;
  };

  const stats = getTaskStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Task Management</h1>
          <p className="text-gray-600">Organize and track team tasks and workflows</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          New Task
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-500">Total Tasks</div>
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-500">Pending</div>
          <div className="text-2xl font-bold text-gray-600">{stats.pending}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-500">In Progress</div>
          <div className="text-2xl font-bold text-blue-600">{stats.in_progress}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-500">Completed</div>
          <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-500">Overdue</div>
          <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <Filter size={20} />
          Filters
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <FilterPanel
          onClose={() => setShowFilters(false)}
          contentType="tasks"
        />
      )}

      {/* Bulk Actions */}
      {selectedTasks.length > 0 && (
        <BulkActions
          selectedCount={selectedTasks.length}
          contentType="tasks"
          onClearSelection={() => setSelectedTasks([])}
        />
      )}

      {/* Tasks Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={() => console.log('Edit task:', task.id)}
            onDelete={() => console.log('Delete task:', task.id)}
            onAssign={() => console.log('Assign task:', task.id)}
            onView={() => console.log('View task:', task.id)}
          />
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <Flag className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? 'Try adjusting your search criteria.' : 'Get started by creating a new task.'}
          </p>
        </div>
      )}

      {/* Create Task Modal */}
      <TaskCreateModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleTaskCreate}
      />
    </div>
  );
}