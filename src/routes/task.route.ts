import { Router } from 'express'
import { addNewTask, deleteTask, editExistTask, getAllTask } from '../controllers/task.controller';
import { authentication } from '../utils/authentication';
import { permission } from '../utils/permission';
import { validateRequest } from '../utils/validateRequest';
import { addTaskSchema, editTaskSchema } from '../validations/task.validation';

const router = Router();

router
    .route("/")
    .all(authentication)
    .post(validateRequest(addTaskSchema), addNewTask)
    .get(getAllTask)

router.route("/:id")
    .all(authentication)
    .put(validateRequest(editTaskSchema), editExistTask)
    .delete(permission(["admin"]), deleteTask)

export default router;