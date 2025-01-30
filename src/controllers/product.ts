import { Request,Response } from "express";
import { addNewProductService, getAllProductService } from "../services/product";

// Controller function for handling user registration request
export const addNewProduct = async (req: Request, res: Response) => {
    try {
        const data = await addNewProductService(req);

        res.status(201).json({ message: "Product added successfully.", data: data });
    } catch (error: any) {
        res.status(400).json({ message: error.message || "An error occurred in add Product." });
    }
};


export const getAllProduct = async (req: Request, res: Response) => {
    try {
        const data = await getAllProductService(req);
        res.status(201).json({ message: "Products fetched successfully.", data: data });
    } catch (error: any) {
        res.status(400).json({ message: error.message || "An error occurred in Product fetching." });
    }
};