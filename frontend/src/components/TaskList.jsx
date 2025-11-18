import { useDispatch } from "react-redux";
import { toggleTask, deleteTask, updateTask } from "../features/taskSlice";
import { Check, Trash2, Clock, Edit2 } from "lucide-react";

const TaskList = ({ tasks, viewMode }) => {
  const dispatch = useDispatch();

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Clock className="h-10 w-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          No tasks found
        </h3>
        <p className="text-gray-500">
          Create your first task to get started!
        </p>
      </div>
    );
  }

  return (
    <div
      className={
        viewMode === "grid"
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          : "space-y-3"
      }
    >
      {tasks.map((task) => (
        <div
          key={task._id}
          className={`bg-white rounded-xl border-2 transition-all duration-300 hover:shadow-md group ${
            task.status === "completed"
              ? "border-green-200 opacity-75"
              : "border-gray-200 hover:border-blue-200"
          } ${viewMode === "list" ? "p-4" : "p-5"}`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              {/* Checkbox */}
              <button
                onClick={() => dispatch(toggleTask(task._id))}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 mt-1 ${
                  task.status === "completed"
                    ? "bg-green-500 border-green-500 text-white shadow-sm"
                    : "border-red-300 bg-white hover:border-red-400 hover:bg-red-50 text-transparent"
                }`}
              >
                {task.status === "completed" && <Check className="h-4 w-4" />}
              </button>

              {/* Task Content */}
              <div className="flex-1 min-w-0">
                <p
                  className={`text-lg font-medium leading-relaxed break-all ${
                    task.status === "completed"
                      ? "text-gray-500 line-through"
                      : "text-gray-800"
                  }`}
                >
                  {task.title}
                </p>

                {/* Task Meta */}
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <span
                    className={`px-2 py-1 rounded-full font-medium ${
                      task.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {task.status === "completed" ? "Completed" : "Pending"}
                  </span>
                  <span>
                    {new Date(task.createdAt).toLocaleDateString("en-IN")}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-2">
              <button
                onClick={() => {
                  const newTitle = prompt("Enter new task title:", task.title);
                  if (newTitle && newTitle.trim()) {
                    dispatch(
                      updateTask({
                        id: task._id,
                        title: newTitle,
                      })
                    );
                  }
                }}
                className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors duration-300"
                title="Edit task"
              >
                <Edit2 className="h-4 w-4" />
              </button>

              <button
                onClick={() => dispatch(deleteTask(task._id))}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-300"
                title="Delete task"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;