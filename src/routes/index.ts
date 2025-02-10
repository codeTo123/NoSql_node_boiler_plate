import {Router} from "express"
import userRoutes from "./user.route"
import authRoutes from "./auth"
import TaskRoutes from "./task.route"

const router = Router();

router.use('/user',userRoutes);
router.use('/auth',authRoutes);
router.use('/task',TaskRoutes)

export default router;
