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
                select: "name", // Equivalent to `attributes` for Roles
                match: { deleted_at: null }, // Equivalent to `where: { deleted_at: null }`
                options: { strictPopulate: false } // Equivalent to `required: false`
            })
            .limit(limit)
            .skip(offset)
            .sort({ ["created_at"]: -1 })
        const products = JSON.parse(JSON.stringify(product))
        // .sort({ [sortField]: sortingType === "ASC" ? 1 : -1 })
        for (let item of products) {
            item.customerName = item.added_by ? item.added_by?.name : ""
            delete item.added_by;
        }


        return products;
    } catch (error: any) {
        // Log the error for debugging purposes
        console.error("Error in product listing:", error);
        throw error;
    }
}

// ==================== Product reports ===========================
export const getProductsSummaryReportService = async (req: any) => {
    try {
        const whereCondition: any = [];

        const products = Product.aggregate([
            { $match: { deleted_at: null } },
            {
                $group: {
                    _id: null, totalProduct: { $sum: 1 },
                    totalQuantities: { $sum: "$qty" },
                    totalProductRevenue: { $sum: { $multiply: ["$qty", "$price"] } },
                    expired_products: {
                        $sum: {
                            $cond: [
                                { $lt: ["$exp_date", new Date()] }, 1, 0]
                        }
                    },
                    expired_products_name: {
                        $push: {
                            $cond: [{ $lt: ["$exp_date", new Date()] }, "$name", "$$REMOVE"]
                        }
                    },
                }
            }
        ])

        return products;
    } catch (error: any) {
        // Log the error for debugging purposes
        console.error("Error in product report:", error);
        throw error;
    }
}


export const getNearestExpiredProductsService = async (req: any) => {
    try {
        const today = new Date();
        const nearestDate = new Date();
        nearestDate.setDate(today.getDate() + 30)
        console.log("today", today)
        console.log("nearestDate", nearestDate)
        const products = Product.aggregate([
            { $match: { deleted_at: null } },
            {
                $group: {
                    _id: null, totalProduct: { $sum: 1 },
                    nearest_expiring_products_: {
                        $push: {
                            $cond: [
                                {
                                    $and: [
                                        { $gte: ["$exp_date", today] },
                                        { $lte: ["$exp_date", nearestDate] }]
                                }, "$name", "$$REMOVE"
                            ]
                        }
                    },
                }
            }
        ])

        return products;
    } catch (error: any) {
        // Log the error for debugging purposes
        console.error("Error in product report:", error);
        throw error;
    }
}

export const getRequestedProductValidityService = async (req: any) => {
    try {
        let product: any = await Product.findById(req.params.productId).select("_id name exp_date created_at qty price");
        product = JSON.parse(JSON.stringify(product))
        const expDateInDay: any = new Date(product.exp_date)
        const createdDateInDay: any = new Date(product.created_at)

        const validateInDays = Math.round((expDateInDay.getDate() - createdDateInDay.getDate()) / 1000 * 60 * 60 * 24)
        const validateInYears = validateInDays ? validateInDays / 365 : 0
        const validateInMonths = validateInDays ? validateInDays / 30 : 0

        product.validity_in_days = validateInDays;
        product.validity_in_years = Math.round(validateInYears);
        product.validity_in_months = Math.round(validateInMonths);
        return product;
    } catch (error: any) {
        console.error("Error in finding product validity:", error);
        throw error;
    }
}