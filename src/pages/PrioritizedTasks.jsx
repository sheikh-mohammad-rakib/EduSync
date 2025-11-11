import React, { useEffect, useState, useMemo } from "react";
import { account, client } from "../lib/appwrite";
import { Databases, Query } from "appwrite";
import TaskCard from "../components/TaskCard";

const DB_ID = "main"; // Replace with your DB ID
const TASKS_COLLECTION = "tasks";
const ENERGY_COLLECTION = "energy_logs";

function sortTasksByUrgencyAndEnergy(tasks, energyLevel) {
  // Simulate: Higher priority and closer due date = higher urgency
  // If energy is low, deprioritize high-priority tasks
  return tasks
    .slice()
    .sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      let scoreA = a.priority === "High" ? 3 : a.priority === "Medium" ? 2 : 1;
      let scoreB = b.priority === "High" ? 3 : b.priority === "Medium" ? 2 : 1;
      // If energy is low, swap priority weight
      if (energyLevel === "Low") {
        scoreA = a.priority === "Low" ? 3 : a.priority === "Medium" ? 2 : 1;
        scoreB = b.priority === "Low" ? 3 : b.priority === "Medium" ? 2 : 1;
      }
      // Sooner due date = higher
      scoreA += Math.max(0, 10 - Math.floor((dateA - Date.now()) / (1000 * 60 * 60 * 24)));
      scoreB += Math.max(0, 10 - Math.floor((dateB - Date.now()) / (1000 * 60 * 60 * 24)));
      return scoreB - scoreA;
    });
}

export default function PrioritizedTasks() {
  const [tasks, setTasks] = useState([]);
  const [energy, setEnergy] = useState("Medium");
  const [courseFilter, setCourseFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const user = await account.get();
        const databases = new Databases(client);
        // Fetch tasks
        const tasksRes = await databases.listDocuments(DB_ID, TASKS_COLLECTION, [
          Query.equal("userId", user.$id),
        ]);
        // Fetch latest energy log
        const energyRes = await databases.listDocuments(DB_ID, ENERGY_COLLECTION, [
          Query.equal("userId", user.$id),
          Query.orderDesc("$createdAt"),
          Query.limit(1),
        ]);
        setTasks(tasksRes.documents);
        setEnergy(energyRes.documents[0]?.level || "Medium");
      } catch {
        // Fallback: mock data
        setTasks([
          { $id: "1", title: "Read Chapter 5", course: "Math", dueDate: "2025-08-01", priority: "High", description: "Review advanced calculus concepts and practice problems", progress: 60, tags: ["homework", "calculus"] },
          { $id: "2", title: "Essay Draft", course: "English", dueDate: "2025-08-03", priority: "Medium", description: "Write first draft of research essay on climate change", progress: 30, tags: ["writing", "research"] },
          { $id: "3", title: "Lab Report", course: "Science", dueDate: "2025-08-02", priority: "Low", description: "Complete chemistry lab analysis and conclusions", progress: 85, tags: ["lab", "chemistry"] },
          { $id: "4", title: "Group Project Presentation", course: "History", dueDate: "2025-07-31", priority: "High", description: "Prepare slides for World War II presentation", progress: 0, tags: ["presentation", "group-work"] },
          { $id: "5", title: "Study for Midterm", course: "Physics", dueDate: "2025-08-05", priority: "Medium", description: "Review mechanics and thermodynamics", progress: 45, tags: ["exam", "study"] },
        ]);
        setEnergy("Medium");
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const filteredTasks = useMemo(() =>
    tasks.filter(
      (t) =>
        (!courseFilter || t.course === courseFilter) &&
        (!priorityFilter || t.priority === priorityFilter)
    ), [tasks, courseFilter, priorityFilter]
  );
  const sortedTasks = useMemo(() => sortTasksByUrgencyAndEnergy(filteredTasks, energy), [filteredTasks, energy]);

  // Recommendation: what to do next
  const nextTask = sortedTasks.length > 0 ? sortedTasks[0] : null;

  const courses = Array.from(new Set(tasks.map((t) => t.course)));
  const priorities = ["High", "Medium", "Low"];

  // Statistics
  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.progress === 100).length,
    overdue: tasks.filter(t => new Date(t.dueDate) < new Date()).length,
    urgent: tasks.filter(t => t.priority === "High").length,
  };

  const energyLevels = [
    { value: "High", icon: "⚡", color: "text-success-600", description: "Feeling energetic and focused" },
    { value: "Medium", icon: "🔋", color: "text-warning-600", description: "Normal energy level" },
    { value: "Low", icon: "🪫", color: "text-danger-600", description: "Tired, prefer easier tasks" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="animate-fadeInUp">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gradient mb-2">
                Smart Task Queue
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base lg:text-lg">
                AI-powered task prioritization based on your energy and deadlines
              </p>
            </div>
            
            {/* Energy Level Selector */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <label className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">Energy Level:</label>
              <div className="flex flex-wrap gap-2">
                {energyLevels.map((level) => (
                  <button
                    key={level.value}
                    onClick={() => setEnergy(level.value)}
                    className={`flex items-center space-x-1.5 sm:space-x-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 touch-target ${
                      energy === level.value
                        ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 shadow-lg"
                        : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:border-primary-300 dark:hover:border-primary-600"
                    }`}
                    title={level.description}
                  >
                    <span className="text-sm sm:text-lg">{level.icon}</span>
                    <span className="font-medium text-xs sm:text-sm">{level.value}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8">
            <div className="card-elevated rounded-xl sm:rounded-2xl p-3 sm:p-6 text-center animate-slideUp">
              <div className="text-xl sm:text-3xl font-bold text-primary-600 dark:text-primary-400 mb-1">{stats.total}</div>
              <div className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Total Tasks</div>
            </div>
            <div className="card-elevated rounded-xl sm:rounded-2xl p-3 sm:p-6 text-center animate-slideUp" style={{ animationDelay: '0.1s' }}>
              <div className="text-xl sm:text-3xl font-bold text-success-600 dark:text-success-400 mb-1">{stats.completed}</div>
              <div className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Completed</div>
            </div>
            <div className="card-elevated rounded-xl sm:rounded-2xl p-3 sm:p-6 text-center animate-slideUp" style={{ animationDelay: '0.2s' }}>
              <div className="text-xl sm:text-3xl font-bold text-danger-600 dark:text-danger-400 mb-1">{stats.overdue}</div>
              <div className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Overdue</div>
            </div>
            <div className="card-elevated rounded-xl sm:rounded-2xl p-3 sm:p-6 text-center animate-slideUp" style={{ animationDelay: '0.3s' }}>
              <div className="text-xl sm:text-3xl font-bold text-warning-600 dark:text-warning-400 mb-1">{stats.urgent}</div>
              <div className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Urgent</div>
            </div>
          </div>
        </div>

        {/* Smart Recommendation */}
        {nextTask && (
          <div className="mb-6 sm:mb-8 animate-fadeInUp">
            <div className="card-elevated rounded-2xl sm:rounded-3xl p-4 sm:p-8 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border border-primary-200 dark:border-primary-800">
              <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-lg sm:text-xl font-bold animate-glow">
                  🎯
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-display font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Recommended Next Task
                  </h3>
                  <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 space-y-1 sm:space-y-0">
                      <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 break-words">{nextTask.title}</h4>
                      <span className="px-2 sm:px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs sm:text-sm font-bold self-start">
                        {nextTask.priority}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      <span>📚 {nextTask.course}</span>
                      <span>📅 Due {nextTask.dueDate}</span>
                      {nextTask.progress && <span>📊 {nextTask.progress}% complete</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters and Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0 gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <select
              className="form-input px-3 sm:px-4 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-xl sm:rounded-2xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-300 text-sm"
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
            >
              <option value="">All Courses</option>
              {courses.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select
              className="form-input px-4 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-2xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-300"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="">All Priorities</option>
              {priorities.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-2xl p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                viewMode === "grid"
                  ? "bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-md"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span className="text-sm font-medium">Grid</span>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                viewMode === "list"
                  ? "bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-md"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">List</span>
            </button>
          </div>
        </div>

        {/* Task Queue Visualization */}
        {sortedTasks.length > 0 && (
          <div className="mb-8 animate-fadeInUp">
            <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center space-x-2">
              <span>🔮</span>
              <span>Task Queue</span>
            </h3>
            <div className="card-elevated rounded-2xl p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {sortedTasks.slice(0, 5).map((task, idx) => (
                  <div
                    key={task.$id}
                    className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                      idx === 0
                        ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg"
                        : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                    }`}
                  >
                    <div className={`absolute -top-2 -left-2 w-6 h-6 rounded-full text-center text-xs font-bold ${
                      idx === 0 ? 'bg-primary-500 text-white' : 'bg-gray-400 dark:bg-gray-600 text-white'
                    } flex items-center justify-center`}>
                      {idx + 1}
                    </div>
                    <div className="mt-2">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1 line-clamp-2">
                        {task.title}
                      </h4>
                      <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md">{task.priority}</span>
                        <span>{task.dueDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tasks Section */}
        <div className="animate-fadeInUp">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-100">
              Your Tasks ({sortedTasks.length})
            </h3>
            <span className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-2xl text-sm font-semibold">
              Optimized for {energy} energy
            </span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                <p className="text-gray-600 dark:text-gray-400 font-medium">Loading your tasks...</p>
              </div>
            </div>
          ) : sortedTasks.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">📝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">No tasks found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {courseFilter || priorityFilter 
                  ? "Try adjusting your filters to see more tasks."
                  : "Create your first task to get started with EduSync!"
                }
              </p>
              <button className="btn-primary px-6 py-3 rounded-2xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300">
                Create Task
              </button>
            </div>
          ) : (
            <div className={`
              ${viewMode === "grid" 
                ? "grid grid-cols-1 lg:grid-cols-2 gap-6" 
                : "space-y-4"
              }
              ${sortedTasks.length > 8 ? 'max-h-[80vh] overflow-y-auto pr-2' : ''}
            `}>
              {sortedTasks.map((task, index) => (
                <div
                  key={task.$id}
                  className="animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <TaskCard task={task} showActions={true} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
