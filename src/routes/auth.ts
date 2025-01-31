import { Router } from 'express'
import { login } from '../controllers/auth';
import { loginSchema } from '../validations/auth';
import  {validateRequest}  from '../utils/validateRequest';

const router = Router();

router.post("/login",
     validateRequest(loginSchema),
    login)

export default router;