import React, { useState, useCallback } from 'react';
import { 
  Plus, 
  Play, 
  Pause, 
  Settings, 
  Trash2, 
  ArrowRight, 
  Clock, 
  User, 
  CheckCircle,
  AlertCircle,
  Copy,
  Edit,
  MoreHorizontal,
  Workflow,
  GitBranch
} from 'lucide-react';

// Mock workflow templates
const workflowTemplates = [
  {
    id: 1,
    name: 'Event Planning Workflow',
    description: 'Standard process for organizing PLP events',
    steps: [
      { id: 1, name: 'Initial Planning', assignedRole: 'Event Coordinator', estimatedDays: 3 },
      { id: 2, name: 'Venue Booking', assignedRole: 'Operations Manager', estimatedDays: 2 },
      { id: 3, name: 'Speaker Confirmation', assignedRole: 'Event Coordinator', estimatedDays: 5 },
      { id: 4, name: 'Marketing Material', assignedRole: 'Communications Team', estimatedDays: 4 },
      { id: 5, name: 'Final Logistics', assignedRole: 'Operations Manager', estimatedDays: 2 }
    ],
    category: 'events',
    isActive: true,
    usageCount: 15
  },
  {
    id: 2,
    name: 'Policy Research Process',
    description: 'Research and analysis workflow for policy development',
    steps: [
      { id: 1, name: 'Research Assignment', assignedRole: 'Research Lead', estimatedDays: 1 },
      { id: 2, name: 'Data Collection', assignedRole: 'Research Analyst', estimatedDays: 10 },
      { id: 3, name: 'Analysis & Draft', assignedRole: 'Policy Analyst', estimatedDays: 7 },
      { id: 4, name: 'Review & Feedback', assignedRole: 'Senior Advisor', estimatedDays: 3 },
      { id: 5, name: 'Final Report', assignedRole: 'Research Lead', estimatedDays: 2 }
    ],
    category: 'research',
    isActive: true,
    usageCount: 8
  },
  {
    id: 3,
    name: 'Supporter Registration',
    description: 'Process for onboarding new party supporters',
    steps: [
      { id: 1, name: 'Initial Contact', assignedRole: 'Outreach Coordinator', estimatedDays: 1 },
      { id: 2, name: 'Information Collection', assignedRole: 'Data Entry Clerk', estimatedDays: 1 },
      { id: 3, name: 'Background Verification', assignedRole: 'Security Officer', estimatedDays: 3 },
      { id: 4, name: 'Welcome Package', assignedRole: 'Communications Team', estimatedDays: 2 },
      { id: 5, name: 'Database Update', assignedRole: 'Data Manager', estimatedDays: 1 }
    ],
    category: 'membership',
    isActive: true,
    usageCount: 42
  }
];

// Mock active workflow instances
const activeWorkflows = [
  {
    id: 101,
    templateId: 1,
    name: 'Nassau Youth Rally 2024',
    currentStep: 3,
    totalSteps: 5,
    progress: 60,
    startDate: '2024-07-01',
    dueDate: '2024-07-15',
    assignedTo: 'Maria Rodriguez',
    status: 'on_track',
    priority: 'high'
  },
  {
    id: 102,
    templateId: 2,
    name: 'Healthcare Policy Analysis',
    currentStep: 2,
    totalSteps: 5,
    progress: 40,
    startDate: '2024-06-20',
    dueDate: '2024-07-20',
    assignedTo: 'Sarah Wilson',
    status: 'on_track',
    priority: 'medium'
  },
  {
    id: 103,
    templateId: 3,
    name: 'Q3 Supporter Onboarding',
    currentStep: 4,
    totalSteps: 5,
    progress: 80,
    startDate: '2024-07-01',
    dueDate: '2024-07-10',
    assignedTo: 'James Thompson',
    status: 'ahead',
    priority: 'low'
  }
];

function WorkflowCard({ workflow, onEdit, onDelete, onDuplicate, onToggleActive }) {
  const [showMenu, setShowMenu] = useState(false);

  const getTotalDays = () => {
    return workflow.steps.reduce((total, step) => total + step.estimatedDays, 0);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-gray-900">{workflow.name}</h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              workflow.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
            }`}>
              {workflow.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3">{workflow.description}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>{workflow.steps.length} steps</span>
            <span>{getTotalDays()} days</span>
            <span>{workflow.usageCount} uses</span>
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
                onClick={() => { onEdit(workflow); setShowMenu(false); }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
              >
                <Edit size={14} />
                Edit Workflow
              </button>
              <button
                onClick={() => { onDuplicate(workflow); setShowMenu(false); }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
              >
                <Copy size={14} />
                Duplicate
              </button>
              <button
                onClick={() => { onToggleActive(workflow); setShowMenu(false); }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
              >
                {workflow.isActive ? <Pause size={14} /> : <Play size={14} />}
                {workflow.isActive ? 'Deactivate' : 'Activate'}
              </button>
              <hr className="my-1" />
              <button
                onClick={() => { onDelete(workflow); setShowMenu(false); }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 text-red-600 flex items-center gap-2"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        {workflow.steps.map((step, index) => (
          <div key={step.id} className="flex items-center gap-3 text-sm">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-medium text-blue-600">
              {index + 1}
            </div>
            <span className="flex-1 text-gray-700">{step.name}</span>
            <span className="text-gray-500">{step.estimatedDays}d</span>
            {index < workflow.steps.length - 1 && (
              <ArrowRight size={14} className="text-gray-300" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ActiveWorkflowCard({ workflow, onViewDetails, onPause, onResume }) {
  const getStatusColor = () => {
    switch (workflow.status) {
      case 'ahead': return 'text-green-600 bg-green-100';
      case 'on_track': return 'text-blue-600 bg-blue-100';
      case 'behind': return 'text-yellow-600 bg-yellow-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = () => {
    switch (workflow.status) {
      case 'ahead': return CheckCircle;
      case 'on_track': return Clock;
      case 'behind': return AlertCircle;
      case 'overdue': return AlertCircle;
      default: return Clock;
    }
  };

  const StatusIcon = getStatusIcon();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">{workflow.name}</h3>
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor()}`}>
              <StatusIcon size={12} className="inline mr-1" />
              {workflow.status.replace('_', ' ').charAt(0).toUpperCase() + workflow.status.replace('_', ' ').slice(1)}
            </span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              workflow.priority === 'high' ? 'bg-red-100 text-red-700' :
              workflow.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {workflow.priority.charAt(0).toUpperCase() + workflow.priority.slice(1)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <User size={14} />
            <span>{workflow.assignedTo}</span>
          </div>
        </div>
        <button
          onClick={() => onViewDetails(workflow)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View Details
        </button>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>Step {workflow.currentStep} of {workflow.totalSteps}</span>
          <span>{workflow.progress}% complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="h-2 rounded-full bg-blue-500"
            style={{ width: `${workflow.progress}%` }}
          ></div>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Due: {new Date(workflow.dueDate).toLocaleDateString()}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPause(workflow)}
            className="text-yellow-600 hover:text-yellow-800"
          >
            <Pause size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function WorkflowBuilderModal({ isOpen, onClose, onSave, editingWorkflow = null }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'general',
    steps: [{ name: '', assignedRole: '', estimatedDays: 1 }]
  });

  React.useEffect(() => {
    if (editingWorkflow) {
      setFormData({
        name: editingWorkflow.name,
        description: editingWorkflow.description,
        category: editingWorkflow.category,
        steps: editingWorkflow.steps
      });
    } else {
      setFormData({
        name: '',
        description: '',
        category: 'general',
        steps: [{ name: '', assignedRole: '', estimatedDays: 1 }]
      });
    }
  }, [editingWorkflow]);

  const addStep = () => {
    setFormData({
      ...formData,
      steps: [...formData.steps, { name: '', assignedRole: '', estimatedDays: 1 }]
    });
  };

  const removeStep = (index) => {
    setFormData({
      ...formData,
      steps: formData.steps.filter((_, i) => i !== index)
    });
  };

  const updateStep = (index, field, value) => {
    const newSteps = [...formData.steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setFormData({ ...formData, steps: newSteps });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: editingWorkflow?.id || Date.now(),
      isActive: true,
      usageCount: editingWorkflow?.usageCount || 0
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {editingWorkflow ? 'Edit Workflow' : 'Create New Workflow'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Workflow Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
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
                  <option value="research">Research</option>
                  <option value="membership">Membership</option>
                  <option value="communications">Communications</option>
                  <option value="operations">Operations</option>
                </select>
              </div>
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

            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-700">Workflow Steps</label>
                <button
                  type="button"
                  onClick={addStep}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
                >
                  <Plus size={16} />
                  Add Step
                </button>
              </div>
              
              <div className="space-y-4">
                {formData.steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                      {index + 1}
                    </div>
                    <div className="flex-1 grid grid-cols-3 gap-3">
                      <input
                        type="text"
                        placeholder="Step name"
                        value={step.name}
                        onChange={(e) => updateStep(index, 'name', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Assigned role"
                        value={step.assignedRole}
                        onChange={(e) => updateStep(index, 'assignedRole', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="1"
                          value={step.estimatedDays}
                          onChange={(e) => updateStep(index, 'estimatedDays', parseInt(e.target.value))}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <span className="text-sm text-gray-500">days</span>
                      </div>
                    </div>
                    {formData.steps.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeStep(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                    {index < formData.steps.length - 1 && (
                      <ArrowRight size={16} className="text-gray-400" />
                    )}
                  </div>
                ))}
              </div>
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
                {editingWorkflow ? 'Update Workflow' : 'Create Workflow'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export function WorkflowBuilder() {
  const [workflows, setWorkflows] = useState(workflowTemplates);
  const [activeInstances, setActiveInstances] = useState(activeWorkflows);
  const [showBuilderModal, setShowBuilderModal] = useState(false);
  const [editingWorkflow, setEditingWorkflow] = useState(null);
  const [activeTab, setActiveTab] = useState('templates'); // 'templates' or 'active'

  const handleSaveWorkflow = (workflowData) => {
    if (editingWorkflow) {
      setWorkflows(workflows.map(w => w.id === editingWorkflow.id ? workflowData : w));
    } else {
      setWorkflows([...workflows, workflowData]);
    }
    setEditingWorkflow(null);
  };

  const handleEditWorkflow = (workflow) => {
    setEditingWorkflow(workflow);
    setShowBuilderModal(true);
  };

  const handleDeleteWorkflow = (workflow) => {
    if (confirm('Are you sure you want to delete this workflow?')) {
      setWorkflows(workflows.filter(w => w.id !== workflow.id));
    }
  };

  const handleDuplicateWorkflow = (workflow) => {
    const duplicated = {
      ...workflow,
      id: Date.now(),
      name: `${workflow.name} (Copy)`,
      usageCount: 0
    };
    setWorkflows([...workflows, duplicated]);
  };

  const handleToggleActive = (workflow) => {
    setWorkflows(workflows.map(w => 
      w.id === workflow.id ? { ...w, isActive: !w.isActive } : w
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Workflow Management</h1>
          <p className="text-gray-600">Create and manage automated workflows for team processes</p>
        </div>
        <button
          onClick={() => setShowBuilderModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          New Workflow
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-500">Total Workflows</div>
          <div className="text-2xl font-bold text-gray-900">{workflows.length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-500">Active Templates</div>
          <div className="text-2xl font-bold text-green-600">{workflows.filter(w => w.isActive).length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-500">Running Instances</div>
          <div className="text-2xl font-bold text-blue-600">{activeInstances.length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-500">Total Usage</div>
          <div className="text-2xl font-bold text-gray-900">
            {workflows.reduce((sum, w) => sum + w.usageCount, 0)}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('templates')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'templates'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Workflow className="inline mr-2" size={16} />
            Workflow Templates ({workflows.length})
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'active'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <GitBranch className="inline mr-2" size={16} />
            Active Instances ({activeInstances.length})
          </button>
        </nav>
      </div>

      {/* Workflow Templates */}
      {activeTab === 'templates' && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {workflows.map((workflow) => (
            <WorkflowCard
              key={workflow.id}
              workflow={workflow}
              onEdit={handleEditWorkflow}
              onDelete={handleDeleteWorkflow}
              onDuplicate={handleDuplicateWorkflow}
              onToggleActive={handleToggleActive}
            />
          ))}
        </div>
      )}

      {/* Active Workflow Instances */}
      {activeTab === 'active' && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activeInstances.map((workflow) => (
            <ActiveWorkflowCard
              key={workflow.id}
              workflow={workflow}
              onViewDetails={() => console.log('View details:', workflow.id)}
              onPause={() => console.log('Pause workflow:', workflow.id)}
              onResume={() => console.log('Resume workflow:', workflow.id)}
            />
          ))}
        </div>
      )}

      {/* Empty States */}
      {activeTab === 'templates' && workflows.length === 0 && (
        <div className="text-center py-12">
          <Workflow className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No workflows yet</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating your first workflow template.
          </p>
        </div>
      )}

      {activeTab === 'active' && activeInstances.length === 0 && (
        <div className="text-center py-12">
          <GitBranch className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No active workflows</h3>
          <p className="mt-1 text-sm text-gray-500">
            Start a workflow from one of your templates to see it here.
          </p>
        </div>
      )}

      {/* Workflow Builder Modal */}
      <WorkflowBuilderModal
        isOpen={showBuilderModal}
        onClose={() => {
          setShowBuilderModal(false);
          setEditingWorkflow(null);
        }}
        onSave={handleSaveWorkflow}
        editingWorkflow={editingWorkflow}
      />
    </div>
  );
}