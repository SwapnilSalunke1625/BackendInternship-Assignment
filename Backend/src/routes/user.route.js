import { Router } from "express";
import { registeruser, loginuser, updatePassword, logoutuser, completeTask, getMyTasks} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router =Router()




router.post("/register", registeruser);
router.post("/login", loginuser);

router.post("/logout", verifyJWT, logoutuser);
router.post("/update-password", verifyJWT, updatePassword);

router.get("/my-tasks", verifyJWT, getMyTasks);
router.patch("/tasks/:taskId/complete", verifyJWT, completeTask);

export default router
