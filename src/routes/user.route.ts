import { Router } from 'express'
import multer from 'multer'
import { deleteProfile, getAllUsers, getMyProfile, newUserRegistration, updateProfile } from '../controllers/user.controller';
import { mediaRefactor } from '../utils/mediaRefactor';
import { authentication } from '../utils/authentication';
import { permission } from '../utils/permission';
import { validateRequest } from '../utils/validateRequest';
import { registerSchema } from '../validations/user.validation';


const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/user')
    },
    filename: function (req, file, cb) {
        // const full_name = req.body.name
        // if (!full_name) {
        //     return cb(new Error("Name is required"), null);
        // }
        // const name = mediaRefactor(full_name)

        const filename = `${file.fieldname}-${Date.now()}.jpeg`;
        cb(null, filename)
    }
})

const uploads = multer({ storage: multerStorage });
const router = Router();

router.post('/register', uploads.single('profile_image'), validateRequest(registerSchema), newUserRegistration)
router.get('/', authentication, permission(["admin"]), getAllUsers)

router
    .route("/:userId")
    .all(authentication)
    .put(uploads.single('profile_image'), updateProfile)
    .get(getMyProfile)
    .delete(permission(["admin"]), deleteProfile)

export default router;