import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../features/taskSlice";
import TaskList from "../components/TaskList";
import AddTask from "../components/AddTask";
import { Search, Filter, Plus, LayoutGrid, List } from "lucide-react";

const Tasks = () => {
  const dispatch = useDispatch();
  const { list, totalPages, loading } = useSelector((state) => state.tasks);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    dispatch(fetchTasks({ page, search, status }));
  }, [dispatch, page, search, status]);

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    // Debounce search
    setTimeout(() => setSearch(e.target.value), 500);
  };

  return (
    <div className="min-h-screen bg-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-3">
            My Tasks
          </h1>
          <p className="text-gray-600 text-lg">Manage your tasks efficiently</p>
        </div>

        {/* Stats and Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchInput}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all duration-300"
              />
            </div>

            {/* Filters and View Toggle */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Status Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="pl-10 pr-8 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 appearance-none cursor-pointer transition-all duration-300"
                >
                  <option value="">All Tasks</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-all duration-300 ${
                    viewMode === "grid"
                      ? "bg-white shadow-sm text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-all duration-300 ${
                    viewMode === "list"
                      ? "bg-white shadow-sm text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Add Task Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Add New Task</h2>
            <Plus className="h-5 w-5 text-blue-500" />
          </div>
          <AddTask />
        </div>

        {/* Tasks Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              <TaskList tasks={list} viewMode={viewMode} />
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                  >
                    Previous
                  </button>
                  
                  <div className="flex space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNumber = i + 1;
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => setPage(pageNumber)}
                          className={`w-10 h-10 rounded-lg transition-all duration-300 ${
                            page === pageNumber
                              ? "bg-blue-500 text-white shadow-md"
                              : "border border-gray-300 hover:bg-gray-50 text-gray-700"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;