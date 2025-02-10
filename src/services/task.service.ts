import Task from '../models/task'
import { pagination } from '../utils/pagination';

export const addNewTaskService = async (req: any) => {
    try {
        const { name, description, priority, due_date } = req.body;

        const userId = req.userId

        // Validate required fields
        if (!name || !due_date) {
            throw new Error("All fields (name, description, priority, due_date) are required.");
        }

        // Validate userId
        if (!userId) {
            throw new Error("User authentication required.");
        }

        // Validate date
        const dueDate = new Date(due_date);
        if (isNaN(dueDate.getTime())) {
            throw new Error("Invalid expiration date format.");
        }

        const task = new Task({
            name,
            description,
            added_by: userId,
            due_date: dueDate,
            priority
        });

        await task.save();
        return task;
    } catch (error: any) {
        // Log the error for debugging purposes
        console.error("Error in add new task:", error);
        throw error;
    }
}

export const editExistTaskService = async (req: any) => {
    try {
        const { id } = req.params || req.query
        const { name, description, priority, due_date } = req.body;
        let dueDate: any

        if (due_date) {
            // Validate date
            const dueDate = new Date(due_date);
            if (isNaN(dueDate.getTime())) {
                throw new Error("Invalid expiration date format.");
            }
        }

        const updatedTask = await Task.findOneAndUpdate({ _id: id }, {
            name,
            description,
            priority,
            due_date: dueDate ? dueDate : due_date
        }, { new: true })

        return updatedTask;
    } catch (error: any) {
        // Log the error for debugging purposes
        console.error("Error in update exist task:", error);
        throw error;
    }
}

//Get all existing task.
export const getAllTaskService = async (req: any) => {
    try {
        const { page, pageRecord, search, fromDate, toDate } = req.query;
        const { limit, offset } = pagination(page, pageRecord)

        const userRole = req.role;
        const userId = req.userId;

        const whereCondition: any = {
            deleted_at: null
        };

        // Apply search filter (Only if `search` is provided)
        if (search) {
            whereCondition.$or = [
                { name: { $regex: search, $options: "i" } },
                { priority: { $regex: search, $options: "i" } }
            ];
        }

        if (userRole != "admin") {
            whereCondition.added_by = userId
        }

        // Apply date range filter
        if (fromDate && toDate) {
            whereCondition.due_date = {
                $gte: new Date(fromDate),
                $lte: new Date(toDate),
            };
        } else if (fromDate) {
            whereCondition.due_date = { $gte: new Date(fromDate) };
        } else if (toDate) {
            whereCondition.due_date = { $lte: new Date(toDate) };
        }

        const task = await Task.find(whereCondition)
            .select("_id name description priority due_date created_at")
            .populate({
                path: "added_by",
                select: "full_name", // Equivalent to `attributes` for Roles
                match: { deleted_at: null }, // Equivalent to `where: { deleted_at: null }`
                options: { strictPopulate: false } // Equivalent to `required: false`
            })
            .limit(limit)
            .skip(offset)
            .sort({ ["created_at"]: -1 })
        const _task = JSON.parse(JSON.stringify(task))

        const count: any = await Task.aggregate([
            { $match: whereCondition },
            { $count: "totalActiveTasks" }
        ]);
        const totalRecords = count[0].totalActiveTasks

        return {
            totalExistTask: totalRecords,
            items: _task
        };
    } catch (error: any) {
        // Log the error for debugging purposes
        console.error("Error in task listing:", error);
        throw error;
    }
}

export const deleteTaskService = async (req: any) => {
    try {
        const { id } = req.params

        const existTask = await Task.findOneAndUpdate({ _id: id, deleted_at: null }, { deleted_at: new Date() });

        return existTask;
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error in delete exist task:", error);
        throw error;
    }
}

