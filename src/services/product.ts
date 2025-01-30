import Product from '../models/product'
import { pagination } from '../utils/pagination';

export const addNewProductService = async (req: any) => {
    try {
        const { name, qty, price, exp_date } = req.body;

        const userId = req.userId

        // Validate required fields
        if (!name || !qty || !price || !exp_date) {
            throw new Error("All fields (name, qty, price, exp_date) are required.");
        }

        // Convert and validate numbers
        const _qty = parseInt(qty);
        const _price = parseFloat(price);

        if (Number.isNaN(_qty) || Number.isNaN(_price)) {
            throw new Error("Invalid quantity or price.");
        }

        // Validate userId
        if (!userId) {
            throw new Error("User authentication required.");
        }

        // Validate date
        const expDate = new Date(exp_date);
        if (isNaN(expDate.getTime())) {
            throw new Error("Invalid expiration date format.");
        }

        const product = new Product({
            name,
            qty: _qty,
            price: _price,
            added_by: userId,
            exp_date: expDate,
        });

        await product.save();
        return product;
    } catch (error: any) {
        // Log the error for debugging purposes
        console.error("Error in add new product:", error);
        throw error;
    }
}

export const getAllProductService = async (req: any) => {
    try {
        const { page, pageRecord, search, fromDate, toDate } = req.query;
        const { limit, offset } = pagination(page, pageRecord)

        const userRole = req.role;
        const userId = req.userId;

        const whereCondition: any = {
            deleted_at: null,
            $or: [{ name: { $regex: search, $options: "i" } },
            ]
        }

        if (userRole != "admin") {
            whereCondition.added_by = userId
        }

        // Apply date range filter
        if (fromDate && toDate) {
            whereCondition.exp_date = {
                $gte: new Date(fromDate),
                $lte: new Date(toDate),
            };
        } else if (fromDate) {
            whereCondition.exp_date = { $gte: new Date(fromDate) };
        } else if (toDate) {
            whereCondition.exp_date = { $lte: new Date(toDate) };
        }

        const product = await Product.find(whereCondition)
            .select("_id name price qty exp_date created_at")
            .populate({
                path: "added_by",
                select: "_id name", // Equivalent to `attributes` for Roles
                match: { deleted_at: null }, // Equivalent to `where: { deleted_at: null }`
                options: { strictPopulate: false } // Equivalent to `required: false`
            })
            .limit(limit)
            .skip(offset)
            .sort({ ["created_at"]: -1 })
        // .sort({ [sortField]: sortingType === "ASC" ? 1 : -1 })

        return product;
    } catch (error: any) {
        // Log the error for debugging purposes
        console.error("Error in product listing:", error);
        throw error;
    }
}

