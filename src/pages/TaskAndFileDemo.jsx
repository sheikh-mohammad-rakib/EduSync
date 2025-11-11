
import React, { useState } from "react";
import { createTask, getTasks, uploadFile, listFiles } from "../lib/appwrite";
import { AppToast } from "../components/AppToast";

export default function TaskAndFileDemo() {
  const [tasks, setTasks] = useState([]);
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [activeTab, setActiveTab] = useState("tasks");

  // Test create and get tasks
  const handleAddTask = async () => {
    if (!taskTitle.trim()) {
      setToastMsg("Task title cannot be empty!");
      setToastOpen(true);
      return;
    }
    setLoading(true);
    setError("");
    try {
      await createTask({ task: taskTitle });
      setTaskTitle("");
      const res = await getTasks();
      setTasks(res.documents);
      setToastMsg("Task added successfully! 🎉");
      setToastOpen(true);
    } catch (err) {
      setError("Failed to add/get tasks: " + (err?.message || JSON.stringify(err)));
      console.error("Add/Get Tasks Error:", err);
    }
    setLoading(false);
  };

  const handleGetTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getTasks();
      setTasks(res.documents);
      setToastMsg("Tasks refreshed! 📋");
      setToastOpen(true);
    } catch (err) {
      setError("Failed to get tasks: " + (err?.message || JSON.stringify(err)));
      console.error("Get Tasks Error:", err);
    }
    setLoading(false);
  };

  // Test upload and list files
  const handleUploadFile = async () => {
    if (!file) {
      setToastMsg("Please select a file first!");
      setToastOpen(true);
      return;
    }
    setLoading(true);
    setError("");
    try {
      await uploadFile(file);
      setFile(null);
      const res = await listFiles();
      setFiles(res.files);
      setToastMsg("File uploaded successfully! 📁");
      setToastOpen(true);
    } catch (err) {
      setError("Failed to upload/list files: " + (err?.message || JSON.stringify(err)));
      console.error("Upload/List Files Error:", err);
    }
    setLoading(false);
  };

  const handleListFiles = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await listFiles();
      setFiles(res.files);
      setToastMsg("Files refreshed! 📂");
      setToastOpen(true);
    } catch (err) {
      setError("Failed to list files: " + (err?.message || JSON.stringify(err)));
      console.error("List Files Error:", err);
    }
    setLoading(false);
  };

  const tabs = [
    { id: "tasks", label: "Tasks", icon: "📋", count: tasks.length },
    { id: "files", label: "Files", icon: "📁", count: files.length },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Toast Notification */}
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
        <AppToast open={toastOpen} setOpen={setToastOpen} message={toastMsg} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-12 animate-fadeInUp">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl mb-6 shadow-lg">
            <span className="text-2xl">🚀</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-gradient mb-4">
            API Demo Center
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Test and explore EduSync's backend capabilities with our interactive Appwrite integration demo
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-8 animate-slideDown">
            <div className="card-elevated rounded-2xl p-6 bg-danger-50 dark:bg-danger-900/20 border-l-4 border-danger-500">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <span className="text-2xl">⚠️</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-danger-700 dark:text-danger-300 mb-2">
                    Something went wrong
                  </h3>
                  <p className="text-danger-600 dark:text-danger-400 text-sm font-mono bg-danger-100 dark:bg-danger-900/30 p-3 rounded-lg overflow-auto">
                    {error}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Demo Interface */}
        <div className="card-elevated rounded-3xl overflow-hidden backdrop-blur-lg animate-fadeInUp">
          
          {/* Tab Navigation */}
          <div className="bg-white/50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-3 px-6 py-4 text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? "text-primary-600 dark:text-primary-400 border-b-2 border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span>{tab.label}</span>
                  {tab.count > 0 && (
                    <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs font-bold">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            
            {/* Tasks Tab */}
            {activeTab === "tasks" && (
              <div className="space-y-8 animate-fadeIn">
                
                {/* Add Task Section */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-100 flex items-center space-x-2">
                    <span>➕</span>
                    <span>Add New Task</span>
                  </h3>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Enter a task title..."
                        value={taskTitle}
                        onChange={e => setTaskTitle(e.target.value)}
                        className="form-input w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-300 bg-white/80 dark:bg-gray-800/80"
                        onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                      />
                    </div>
                    <div className="flex space-x-3">
                      <button 
                        onClick={handleAddTask} 
                        disabled={loading}
                        className="btn-primary px-6 py-3 rounded-2xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                      >
                        {loading && <div className="loader"></div>}
                        <span>{loading ? "Adding..." : "Add Task"}</span>
                      </button>
                      <button 
                        onClick={handleGetTasks} 
                        disabled={loading}
                        className="btn-secondary px-6 py-3 rounded-2xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                      >
                        {loading && <div className="loader"></div>}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span>Refresh</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Tasks List */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-100 flex items-center space-x-2">
                    <span>📋</span>
                    <span>Tasks ({tasks.length})</span>
                  </h3>
                  
                  {tasks.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">📝</span>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">No tasks yet</h4>
                      <p className="text-gray-600 dark:text-gray-400">Add your first task to see it here!</p>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {tasks.map((task, index) => (
                        <div
                          key={task.$id}
                          className="group bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-700 transition-all duration-300 hover:shadow-lg animate-slideUp"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center text-white font-bold">
                                {index + 1}
                              </div>
                              <div>
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                  {task.task}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  ID: {task.$id}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <span className="px-3 py-1 bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-300 rounded-full text-xs font-medium">
                                Active
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Files Tab */}
            {activeTab === "files" && (
              <div className="space-y-8 animate-fadeIn">
                
                {/* Upload File Section */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-100 flex items-center space-x-2">
                    <span>📤</span>
                    <span>Upload File</span>
                  </h3>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <input
                          type="file"
                          onChange={e => setFile(e.target.files[0])}
                          className="hidden"
                          id="file-upload"
                        />
                        <label
                          htmlFor="file-upload"
                          className="w-full flex items-center justify-center px-6 py-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl hover:border-primary-400 dark:hover:border-primary-600 transition-all duration-300 cursor-pointer bg-white/50 dark:bg-gray-800/50"
                        >
                          <div className="text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="mt-4">
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {file ? (
                                  <span className="font-medium text-primary-600 dark:text-primary-400">
                                    {file.name} ({Math.round(file.size / 1024)} KB)
                                  </span>
                                ) : (
                                  <>
                                    <span className="font-medium text-primary-600 dark:text-primary-400">Click to upload</span>
                                    <span> or drag and drop</span>
                                  </>
                                )}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-500">
                                PNG, JPG, PDF up to 10MB
                              </p>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button 
                        onClick={handleUploadFile} 
                        disabled={loading || !file}
                        className="btn-accent px-6 py-3 rounded-2xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                      >
                        {loading && <div className="loader"></div>}
                        <span>{loading ? "Uploading..." : "Upload File"}</span>
                      </button>
                      <button 
                        onClick={handleListFiles} 
                        disabled={loading}
                        className="btn-secondary px-6 py-3 rounded-2xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                      >
                        {loading && <div className="loader"></div>}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span>Refresh</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Files List */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-gray-100 flex items-center space-x-2">
                    <span>📁</span>
                    <span>Files ({files.length})</span>
                  </h3>
                  
                  {files.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">📂</span>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">No files uploaded</h4>
                      <p className="text-gray-600 dark:text-gray-400">Upload your first file to see it here!</p>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {files.map((file, index) => (
                        <div
                          key={file.$id}
                          className="group bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-gray-100 dark:border-gray-700 hover:border-accent-200 dark:hover:border-accent-700 transition-all duration-300 hover:shadow-lg animate-slideUp"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-gradient-to-r from-accent-500 to-secondary-500 rounded-xl flex items-center justify-center text-white">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              </div>
                              <div>
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                  {file.name}
                                </h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  ID: {file.$id}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <span className="px-3 py-1 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 rounded-full text-xs font-medium">
                                Stored
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* API Status */}
        <div className="mt-8 text-center animate-fadeInUp">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-300 rounded-full text-sm font-medium">
            <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
            <span>Appwrite API Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
}
