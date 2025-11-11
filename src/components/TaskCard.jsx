import React, { useState } from "react";

export default function TaskCard({ task, onToggleComplete, onEdit, onDelete, showActions = false }) {
  const [isHovered, setIsHovered] = useState(false);

  const priorityStyles = {
    High: {
      gradient: "from-danger-500 to-warning-500",
      bg: "bg-danger-50 dark:bg-danger-900/20",
      text: "text-danger-700 dark:text-danger-300",
      border: "border-danger-300 dark:border-danger-700",
      icon: "🔥"
    },
    Medium: {
      gradient: "from-warning-500 to-accent-500",
      bg: "bg-warning-50 dark:bg-warning-900/20",
      text: "text-warning-700 dark:text-warning-300",
      border: "border-warning-300 dark:border-warning-700",
      icon: "⚡"
    },
    Low: {
      gradient: "from-success-500 to-accent-500",
      bg: "bg-success-50 dark:bg-success-900/20",
      text: "text-success-700 dark:text-success-300",
      border: "border-success-300 dark:border-success-700",
      icon: "🍃"
    }
  };

  const priority = priorityStyles[task.priority] || priorityStyles.Medium;
  const isOverdue = new Date(task.dueDate) < new Date();
  const daysUntilDue = Math.ceil((new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <div 
      className={`group relative card-elevated dark:card-elevated hover:shadow-large rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-3 sm:mb-4 transition-all duration-300 border-l-4 bg-gradient-to-r ${priority.gradient} bg-clip-border animate-fadeInUp ${isHovered ? 'scale-[1.02]' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-white/95 dark:bg-gray-900/95 rounded-xl sm:rounded-2xl backdrop-blur-sm"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
              <h3 className="text-lg sm:text-xl font-display font-bold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-gradient transition-all duration-300 break-words">
                {task.title}
              </h3>
              {showActions && (
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(task)}
                      className="p-1.5 rounded-lg bg-primary-100 hover:bg-primary-200 text-primary-700 transition-colors duration-200 touch-target"
                      title="Edit task"
                    >
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(task)}
                      className="p-1.5 rounded-lg bg-danger-100 hover:bg-danger-200 text-danger-700 transition-colors duration-200 touch-target"
                      title="Delete task"
                    >
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              )}
            </div>
            
            {/* Priority Badge */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`inline-flex items-center space-x-1 px-2 sm:px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${priority.bg} ${priority.text} ${priority.border} border animate-pulse-soft`}>
                <span>{priority.icon}</span>
                <span className="hidden xs:inline">{task.priority}</span>
              </span>
              
              {isOverdue && (
                <span className="inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold bg-danger-100 dark:bg-danger-900/30 text-danger-700 dark:text-danger-300 border border-danger-300 dark:border-danger-700 animate-pulse">
                  <span>⚠️</span>
                  <span className="hidden xs:inline">Overdue</span>
                </span>
              )}
            </div>
          </div>

          {/* Completion Toggle */}
          {onToggleComplete && (
            <button
              onClick={() => onToggleComplete(task)}
              className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 transition-all duration-300 touch-target ${
                task.completed
                  ? "bg-success-500 border-success-500 text-white"
                  : "border-gray-300 dark:border-gray-600 hover:border-success-400 dark:hover:border-success-500"
              }`}
              title={task.completed ? "Mark as incomplete" : "Mark as complete"}
            >
              {task.completed && (
                <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          )}
        </div>

        {/* Task Description */}
        {task.description && (
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 sm:mb-4 line-clamp-2">
            {task.description}
          </p>
        )}

        {/* Details */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-4 text-sm">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0"></div>
            <span className="font-medium text-gray-800 dark:text-gray-200">Course:</span>
            <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg font-medium text-xs sm:text-sm">
              {task.course}
            </span>
          </div>
          
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <div className="w-2 h-2 bg-accent-500 rounded-full flex-shrink-0"></div>
            <span className="font-medium text-gray-800 dark:text-gray-200">Due:</span>
            <span className={`px-2 py-1 rounded-lg font-medium text-xs sm:text-sm ${
              isOverdue 
                ? "bg-danger-100 dark:bg-danger-900/30 text-danger-700 dark:text-danger-300"
                : daysUntilDue <= 3
                ? "bg-warning-100 dark:bg-warning-900/30 text-warning-700 dark:text-warning-300"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            }`}>
              {task.dueDate}
              {!isOverdue && daysUntilDue >= 0 && (
                <span className="text-xs ml-1 hidden sm:inline">
                  ({daysUntilDue === 0 ? "Today" : daysUntilDue === 1 ? "Tomorrow" : `${daysUntilDue} days`})
                </span>
              )}
            </span>
          </div>
        </div>

        {/* Progress Bar (if applicable) */}
        {task.progress !== undefined && (
          <div className="mt-3 sm:mt-4">
            <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
              <span>Progress</span>
              <span>{task.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${task.progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Tags */}
        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 sm:gap-2 mt-3 sm:mt-4">
            {task.tags.map((tag, index) => (
              <span 
                key={index}
                className="inline-flex items-center px-1.5 sm:px-2 py-1 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Hover Glow Effect */}
      <div className={`absolute inset-0 rounded-xl sm:rounded-2xl transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'} bg-gradient-to-r ${priority.gradient} opacity-5`}></div>
    </div>
  );
}
