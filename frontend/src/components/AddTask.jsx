import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/taskSlice";
import { Plus, Send } from "lucide-react";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    dispatch(addTask({ title }));
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className={`relative transition-all duration-300 ${isFocused ? 'scale-105' : ''}`}>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full pl-12 pr-16 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 bg-white text-lg transition-all duration-300"
        />
        
        <Plus className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
        
        <button
          type="submit"
          disabled={!title.trim()}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
      
      {title && (
        <div className="text-right mt-2 text-sm text-gray-500">
          {title.length}/100 characters
        </div>
      )}
    </form>
  );
};

export default AddTask;