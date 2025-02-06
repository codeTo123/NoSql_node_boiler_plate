import { Router } from 'express'
import multer from 'multer'
import { deleteProfile, getAllUsers, getMyProfile, newUserRegistration, updateProfile } from '../controllers/user';
import { mediaRefactor } from '../utils/mediaRefactor';
import { authentication } from '../utils/authentication';
import { permission } from '../utils/permission';


const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/user')
    },
    filename: function (req, file, cb) {
        const name = mediaRefactor(req.body.name)
        const filename = name + "-" + Date.now() + '.jpeg';
        cb(null, filename)
    }
})

const uploads = multer({ storage: multerStorage });
const router = Router();

router.post('/register', uploads.single('profile_image'), newUserRegistration)
router.get('/get_users', authentication, permission(["admin"]), getAllUsers)

router
    .route("/:userId")
    .all(authentication)
    .put(uploads.single('profile_image'), updateProfile)
    .get(getMyProfile)
    .delete(permission(["admin"]), deleteProfile)


// router.get("/user_profile/:userId",authentication, getMyProfile)
// router.delete("/delete_profile/:userId",authentication, getMyProfile)

export default router;