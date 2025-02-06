import {Router} from "express"
import userRoutes from "./user"
import authRoutes from "./auth"
import productRoutes from "./product"
import reportRoutes from "./report.routes"

const router = Router();

router.use('/user',userRoutes);
router.use('/auth',authRoutes);
router.use('/product',productRoutes)
router.use('/report/products',reportRoutes)

export default router;
