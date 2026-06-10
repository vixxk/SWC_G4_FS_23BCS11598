import { useState } from 'react'

export default function TaskManager() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Design user onboarding flow',
      description: 'Create high-fidelity mockups for registration steps',
      completed: false,
      priority: 'high',
      createdAt: 'Jun 3, 2026'
    },
    {
      id: 2,
      title: 'Review security compliance',
      description: 'Analyze authentication schemas and token validation',
      completed: true,
      priority: 'medium',
      createdAt: 'Jun 2, 2026'
    },
    {
      id: 3,
      title: 'Optimize image carousel performance',
      description: 'Verify hover state pauses auto-slide and preload slides',
      completed: false,
      priority: 'low',
      createdAt: 'Jun 3, 2026'
    }
  ])

  const [newTitle, setNewTitle] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [newPriority, setNewPriority] = useState('medium')
  const [editingTask, setEditingTask] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDesc, setEditDesc] = useState('')
  const [editPriority, setEditPriority] = useState('medium')
  const [filter, setFilter] = useState('all')

  const handleAddTask = (e) => {
    e.preventDefault()
    if (!newTitle.trim()) return
    const newTask = {
      id: Date.now(),
      title: newTitle.trim(),
      description: newDesc.trim(),
      completed: false,
      priority: newPriority,
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    }
    setTasks([newTask, ...tasks])
    setNewTitle('')
    setNewDesc('')
    setNewPriority('medium')
  }

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const handleOpenEditModal = (task) => {
    setEditingTask(task)
    setEditTitle(task.title)
    setEditDesc(task.description)
    setEditPriority(task.priority)
  }

  const handleSaveEdit = (e) => {
    e.preventDefault()
    if (!editTitle.trim()) return
    setTasks(tasks.map(task => 
      task.id === editingTask.id 
        ? { ...task, title: editTitle.trim(), description: editDesc.trim(), priority: editPriority }
        : task
    ))
    setEditingTask(null)
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  return (
    <div className="task-manager-container">
      <div className="task-header">
        <h2>Task Workspace</h2>
        <div className="task-filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button 
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
      </div>

      <form onSubmit={handleAddTask} className="task-add-form">
        <div className="form-row">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
            className="task-input-title"
          />
          <select 
            value={newPriority}
            onChange={(e) => setNewPriority(e.target.value)}
            className={`priority-select ${newPriority}`}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
        </div>
        <div className="form-row">
          <input
            type="text"
            placeholder="Add a description (optional)..."
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            className="task-input-desc"
          />
          <button type="submit" className="add-task-btn">
            Add Task
          </button>
        </div>
      </form>

      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <div className="task-empty-state">
            <p>No tasks found in this view.</p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <div key={task.id} className={`task-card ${task.completed ? 'completed' : ''} ${task.priority}`}>
              <div className="task-card-main">
                <button 
                  className={`task-checkbox ${task.completed ? 'checked' : ''}`}
                  onClick={() => handleToggleComplete(task.id)}
                  aria-label={task.completed ? 'Mark task incomplete' : 'Mark task complete'}
                >
                  {task.completed && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
                <div className="task-details">
                  <h3 className="task-card-title">{task.title}</h3>
                  {task.description && <p className="task-card-desc">{task.description}</p>}
                  <div className="task-card-meta">
                    <span className={`priority-tag ${task.priority}`}>{task.priority}</span>
                    <span className="task-date">{task.createdAt}</span>
                  </div>
                </div>
              </div>
              <div className="task-actions">
                <button 
                  onClick={() => handleOpenEditModal(task)} 
                  className="task-action-btn edit"
                  aria-label="Edit task"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
                <button 
                  onClick={() => handleDeleteTask(task.id)} 
                  className="task-action-btn delete"
                  aria-label="Delete task"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {editingTask && (
        <div className="modal-overlay" onClick={() => setEditingTask(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Task</h3>
              <button className="close-modal-btn" onClick={() => setEditingTask(null)}>×</button>
            </div>
            <form onSubmit={handleSaveEdit} className="modal-form">
              <div className="form-group">
                <label>Task Title</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Priority</label>
                <select 
                  value={editPriority}
                  onChange={(e) => setEditPriority(e.target.value)}
                  className={`priority-select ${editPriority}`}
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="modal-cancel-btn" onClick={() => setEditingTask(null)}>
                  Cancel
                </button>
                <button type="submit" className="modal-save-btn">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
