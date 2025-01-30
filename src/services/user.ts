
import User from '../models/user'
import { hashPassword } from '../utils/encryption';
import { pagination } from '../utils/pagination';

//New user registration.
export async function newUserRegistrationService(req: any) {
    try {
        // Extract user details from request body
        const { name, email, password, role, hobbies } = req.body;
        const file = req.file;
        let _hobbies: any;

        if (hobbies.startsWith("[") && hobbies.endsWith("]")) {
            let extracted = hobbies.slice(1, -1).split(",");
            _hobbies = extracted
            console.log(extracted); // Output: [ 'Writing', 'Balling' ]
        } else {
            console.log("Invalid format");
        }

        // Validate file upload
        if (!file) {
            throw new Error("File upload failed. Please upload a valid image file (JPEG, PNG, etc.).");
        }

        // Convert email to lowercase to ensure uniqueness
        const _email = email.toLowerCase();

        // Check if the user already exists in the database
        const existingUser = await User.findOne({ email: _email });
        if (existingUser) {
            throw new Error("User already exists.");
        }

        // Hash the password before saving to the database
        const hashedPassword = await hashPassword(password, true);

        // Create a new user record
        const newUser = new User({
            name,
            email: _email,
            password: hashedPassword,
            role,
            hobbies: _hobbies, // No need to stringify, as MongoDB supports arrays
            profile_image: file.filename, // Store uploaded file's filename
        });

        await newUser.save(); // Save the user to MongoDB
        // Return success response with newly created user data
        return newUser;
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error in user registration:", error);
        throw error;
    }
}

//Update user profile service.
export async function updateProfileService(req: any) {
    try {
        const { role, hobbies, name } = req.body
        const { userId } = req.params
        const file = req.file;
        let _hobbies: any;

        if (hobbies.startsWith("[") && hobbies.endsWith("]")) {
            let extracted = hobbies.slice(1, -1).split(",");
            _hobbies = extracted
        } else {
            console.log("Invalid format");
        }

        // Validate file upload
        if (!file) {
            throw new Error("File upload failed.");
        }

        // Check if the user already exists in the database and update
        const user = await User.findByIdAndUpdate(userId, { role: role, hobbies: _hobbies, name: name, profile_image: file.filename }, { new: true })

        if (!user) {
            throw new Error("User not found")
        }
        return user
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error in user profile update:", error);
        throw error;
    }
}

//List all existing users service.
export async function getAllUserService(req: any) {
    try {
        const { page, pageRecord, search } = req.query;
        const { limit, offset } = pagination(page, pageRecord)

        const searchQuery = search ? `%${search}%` : '%';

        const user = await User.find({
            deleted_at: null,
            $or: [{ name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            ]
        })
            .select("_id name email role hobbies profile_image created_at")
            .limit(limit)
            .skip(offset)
            .sort({ ["created_at"]: -1 })
        // .sort({ [sortField]: sortingType === "ASC" ? 1 : -1 })

        return user;

    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error in user listing:", error);
        throw error;
    }
}

//Get user profile.
export async function getMyProfileService(req: any) {
    try {
        const { userId } = req.params || req.query;

        const user = await User.findOne( {_id:userId, deleted_at: null }).select("_id name email hobbies profile_image");
      
        if (!user) {
            throw new Error("User not found.")
        }
        user.profile_image = user.profile_image ? `${process.env.BASE_URL}/${user.profile_image}` : ""

        return user;
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error in get user profile:", error);
        throw error;
    }
}

//Delete user profile service.
export async function deleteProfileService(req: any) {
    try {
        const { userId } = req.params || req.query

        const user = await User.findByIdAndUpdate(userId, { $set: { deleted_at: new Date() } })

        if (!user) {
            throw new Error("Use not found or deleted.")
        }
        return user;
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error in user deletion:", error);
        throw error;
    }
}

