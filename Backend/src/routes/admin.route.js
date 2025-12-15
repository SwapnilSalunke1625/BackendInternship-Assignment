import { verifyAdmin } from "../middlewares/role.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { adminDashboard, assignTask, updateTask, deleteTask, getUsersAssignedByMe, makeUserAdminByEmail } from "../controllers/admin.controller.js";
import { Router } from "express";


const router=Router()

router.get("/dashboard", verifyJWT, verifyAdmin, adminDashboard);
router.get("/getUsers", verifyJWT, verifyAdmin, getUsersAssignedByMe);
router.patch("/makeadmin", verifyJWT, verifyAdmin, makeUserAdminByEmail);


router.post("/tasks", verifyJWT, verifyAdmin, assignTask);
router.put("/tasks/:taskId", verifyJWT, verifyAdmin, updateTask);
router.delete("/tasks/:taskId", verifyJWT, verifyAdmin, deleteTask);



export default router;
