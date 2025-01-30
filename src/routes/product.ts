import { Router } from 'express'
import { addNewProduct, getAllProduct } from '../controllers/product';
import { authentication } from '../utils/authentication';
import { permission } from '../utils/permission';

const router = Router();

router
    .route("/")
    .all(authentication)
    .post(addNewProduct)
    .get(getAllProduct)
// .delete(permission(["admin"]), deleteProfile)


// router.get("/user_profile/:userId",authentication, getMyProfile)
// router.delete("/delete_profile/:userId",authentication, getMyProfile)

export default router;