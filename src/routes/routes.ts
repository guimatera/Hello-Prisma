import Express from "express";
import Passport from "passport";

import userController from "../controllers/userController";

const router = Express.Router();

router.post("/User", userController.create);
router.get("/User", userController.findOne);

export default router;