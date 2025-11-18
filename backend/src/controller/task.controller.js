import Task from "../model/task.model.js";

export const postTasks = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Please enter title tp add task"
            })
        }

        const task = await Task.create({
            title,
            description,
            user: req.user._id
        });

        res.status(200).json({
            success: true,
            message: "Task added successfully",
            task
        })

    } catch (error) {
        next(error);
    }
}

export const getTasks = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, status, search } = req.query;
        const user = { user: req.user._id };

        if (status) user.status = status;
        if (search) user.title = { $regex: search, $options: 'i' };

        let skip = (page - 1) * parseInt(limit);
        const tasks = await Task.find(user)
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ createdAt: -1 })

        const total = await Task.countDocuments(user);

        res.json({
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(total / limit),
            tasks,
        });

    } catch (error) {
        next(error.message)
    }
}

export const getTask = async (req, res, next) => {
    try {
        const { id: taskId } = req.params;
        const task = await Task.findOne({ _id: taskId, user: req.user._id });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.json({
            success: true,
            message: 'Task by Id successfull',
            task
        });

    } catch (err) {
        next(err.message)
    }
};

export const updateTask = async (req, res, next) => {
    try {
        const { id: taskId } = req.params;

        const task = await Task.findOneAndUpdate(
            { _id: taskId, user: req.user._id },
            req.body,
            { new: true }
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.json({
            success: true,
            message: 'Task Update successfull',
            task
        });
    } catch (err) {
        next(err.message)
    }
};

export const deleteTask = async (req, res, next) => {
    try {
        const { id: taskId } = req.params;

        const task = await Task.findOneAndDelete(
            { _id: taskId, user: req.user._id }
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.json({
            success: true,
            message: "Task deleted successfully",
        });

    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

export const toggleTaskStatus = async (req, res, next) => {
    try {
        const { id: taskId } = req.params;

        const task = await Task.findOne(
            { _id: taskId, user: req.user._id }
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        task.status = task.status === "completed" ? "pending" : "completed";
        await task.save();

        res.json({
            success: true,
            message: 'Toggle Update successfull',
            task
        });
    } catch (err) {
        next(err.message)
    }
};