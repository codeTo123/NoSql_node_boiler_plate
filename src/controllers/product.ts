import { Request, Response } from "express";
import { addNewProductService, getAllProductService, getNearestExpiredProductsService, getProductsSummaryReportService, getRequestedProductValidityService } from "../services/product";

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

// ========================== Reports ==================================

export const getProductsSummaryReport = async (req: Request, res: Response) => {
    try {
        const data = await getProductsSummaryReportService(req);

        res.status(201).json({ message: "Products summary fetched successfully.", data: data });
    } catch (error: any) {
        res.status(400).json({ message: error.message || "An error occurred in Product fetching." });
    }
};

export const getNearestExpiredProducts = async (req: Request, res: Response) => {
    try {
        const data = await getNearestExpiredProductsService(req);

        res.status(201).json({ message: "Nearest expired Products are fetched successfully.", data: data });
    } catch (error: any) {
        res.status(400).json({ message: error.message || "An error occurred in Product fetching." });
    }
};

export const getRequestedProductValidity = async (req: Request, res: Response) => {
    try {
        const data = await getRequestedProductValidityService(req);

        res.status(201).json({ message: "The requested product validity is fetched successfully.", data: data });
    } catch (error: any) {
        res.status(400).json({ message: error.message || "An error occurred in Product fetching." });
    }
};


