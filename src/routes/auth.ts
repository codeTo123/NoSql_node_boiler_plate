import { Router } from 'express'
import { login, verifyUserByOtp, VerifyUserByToken } from '../controllers/auth';
import { loginSchema } from '../validations/auth.validation';
import { validateRequest } from '../utils/validateRequest';

const router = Router();

router.post("/login", validateRequest(loginSchema), login)


router.get('/verify-otp', verifyUserByOtp)
router.get('/verify-email', VerifyUserByToken)

export default router;