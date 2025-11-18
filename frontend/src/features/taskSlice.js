// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import API from "../utils/axios";

// // Fetch with pagination + filtering + search
// export const fetchTasks = createAsyncThunk(
//   "tasks/fetch",
//   async (params, thunkAPI) => {
//     try {
//       const res = await API.get("/task/tasks", { params });
//       return res.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// // Add new task
// export const addTask = createAsyncThunk(
//   "tasks/add",
//   async (task, thunkAPI) => {
//     try {
//       const res = await API.post("/task/tasks", task);
//       return res.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// // Toggle task status
// export const toggleTask = createAsyncThunk(
//   "tasks/toggle",
//   async (id, thunkAPI) => {
//     try {
//       const res = await API.patch(`/task/tasks/${id}/toggle`);
//       return res.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// // Delete task
// export const deleteTask = createAsyncThunk(
//   "tasks/delete",
//   async (id, thunkAPI) => {
//     try {
//       await API.delete(`/task/tasks/${id}`);
//       return id;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// // Update task
// export const updateTask = createAsyncThunk(
//   "tasks/update",
//   async (id, thunkAPI) => {
//     try {
//       await API.patch(`/task/tasks/${id}`);
//       return id;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// // =======================
// // SLICE
// // =======================

// const taskSlice = createSlice({
//   name: "tasks",
//   initialState: {
//     list: [],
//     totalPages: 1,
//     loading: false,
//     error: null,
//   },

//   reducers: {},

//   extraReducers: (builder) => {
//     builder

//       // =======================
//       // FETCH TASKS
//       // =======================
//       .addCase(fetchTasks.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchTasks.fulfilled, (state, action) => {
//         state.loading = false;
//         state.list = action.payload.tasks;
//         state.totalPages = action.payload.totalPages;
//       })
//       .addCase(fetchTasks.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // =======================
//       // ADD TASK
//       // =======================
//       .addCase(addTask.pending, (state) => {
//         state.error = null;
//       })
//       .addCase(addTask.fulfilled, (state, action) => {
//         state.list.push(action.payload.task);
//       })
//       .addCase(addTask.rejected, (state, action) => {
//         state.error = action.payload;
//       })

//       // =======================
//       // TOGGLE TASK
//       // =======================
//       .addCase(toggleTask.fulfilled, (state, action) => {
//         const index = state.list.findIndex(
//           (t) => t._id === action.payload._id
//         );
//         if (index !== -1) state.list[index] = action.payload;
//       })

//       // =======================
//       // DELETE TASK
//       // =======================
//       .addCase(deleteTask.fulfilled, (state, action) => {
//         state.list = state.list.filter((t) => t._id !== action.payload);
//       });
//   },
// });

// export default taskSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../utils/axios";

// Fetch tasks
export const fetchTasks = createAsyncThunk(
    "tasks/fetch",
    async (params) => {
        const res = await API.get("/task/tasks", { params });
        return res.data;
    }
);

// Add new task
export const addTask = createAsyncThunk(
    "tasks/add",
    async (task) => {
        const res = await API.post("/task/tasks", task);
        return res.data;
    }
);

// Toggle task status
// export const toggleTask = createAsyncThunk(
//   "tasks/toggle",
//   async (id) => {
//     const res = await API.patch(`/task/tasks/${id}/toggle`);
//     return res.data;
//   }
// );

export const toggleTask = createAsyncThunk(
    "tasks/toggle",
    async (id) => {
        const res = await API.patch(`/task/tasks/${id}/toggle`);

        return res.data;
    }
);

// Delete task
export const deleteTask = createAsyncThunk(
    "tasks/delete",
    async (id) => {
        await API.delete(`/task/tasks/${id}`);
        return id;
    }
);

// Update task - FIXED (was missing)
export const updateTask = createAsyncThunk(
    "tasks/update",
    async ({ id, title }) => {
        const res = await API.patch(`/task/tasks/${id}`, { title });
        return res.data;
    }
);

// Simple slice
const taskSlice = createSlice({
    name: "tasks",
    initialState: {
        list: [],
        totalPages: 1,
        loading: false,
    },

    reducers: {
        // Clear tasks (optional)
        clearTasks: (state) => {
            state.list = [];
        }
    },

    extraReducers: (builder) => {
        builder
            // Fetch tasks
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload.tasks;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(fetchTasks.rejected, (state) => {
                state.loading = false;
            })

            // Add task
            .addCase(addTask.fulfilled, (state, action) => {
                state.list.push(action.payload.task);
            })

            // Toggle task
            .addCase(toggleTask.fulfilled, (state, action) => {
                const index = state.list.findIndex(t => t._id === action.payload.task._id);
                if (index !== -1) {
                    state.list[index] = action.payload.task;
                }
            })

            // Delete task
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.list = state.list.filter(t => t._id !== action.payload);
            })

            // Update task - FIXED (was missing)
            .addCase(updateTask.fulfilled, (state, action) => {
                const index = state.list.findIndex(t => t._id === action.payload.task._id);
                if (index !== -1) {
                    state.list[index] = action.payload.task;
                }
            });
    },
});

export const { clearTasks } = taskSlice.actions;
export default taskSlice.reducer;