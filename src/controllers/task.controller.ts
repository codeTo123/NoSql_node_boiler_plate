import { Request, Response } from "express";
import { addNewTaskService, getAllTaskService, editExistTaskService, deleteTaskService } from "../services/task.service";
import Task from "../models/task";

// Controller function for handling add new task
export const addNewTask = async (req: Request, res: Response) => {
    try {
        const data = await addNewTaskService(req);

        res.status(201).json({ message: "Task added successfully.", data: data });
    } catch (error: any) {
        res.status(400).json({ message: error.message || "An error occurred in add Task." });
    }
};

// Controller function for handling update task details
export const editExistTask = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params || req.query
        //@ts-ignore
        const userId = req.userId
        //@ts-ignore
        const role = req.role

        // Validate userId
        if (!userId) {
            throw new Error("User authentication required.");
        }

        let existTask = await Task.findById(id)
        existTask = JSON.parse(JSON.stringify(existTask))

        if (!existTask) {
            return res.status(401).json({ message: "Task not found or removed.", data: {} });
        }

        //Only owner of the task or admin can modify the task details.
        if (existTask.added_by !== userId && role !== "admin") {
            console.log("unauthorized");
            return res.status(401).json({ message: "You are not authorized to access this operation", data: {} });
        }

        const data = await editExistTaskService(req);

        if (!data) {
            return res.status(500).json({ message: "Failed to update task details.", data: {} });
        }

        res.status(200).json({ message: "Task updated successfully.", data: data });
    } catch (error: any) {
        res.status(400).json({ message: error.message || "An error occurred in add Task." });
    }
};

// Controller function for handling existing task
export const getAllTask = async (req: Request, res: Response) => {
    try {
        const data = await getAllTaskService(req);

        res.status(200).json({ message: "All existing Task fetched successfully.", data: data });
    } catch (error: any) {
        res.status(400).json({ message: error.message || "An error occurred in Task fetching." });
    }
};


// Controller function for handling delete task by admin
export const deleteTask = async (req: Request, res: Response) => {
    try {
        const data = await deleteTaskService(req);
        if (!data) {
            res.status(404).json({ message: "Task not found or deleted.", data: {} });
        }

        res.status(200).json({ message: "Task deleted successfully.", data: {} });
    } catch (error: any) {
        res.status(400).json({ message: error.message || "An error occurred in Task deleting." });
    }
};
