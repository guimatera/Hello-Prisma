import Express from "express";

import userController from "../controllers/userController";
import categoryController from "../controllers/categoryController";
import postController from "../controllers/postController";

const router = Express.Router();

// User Routes
router.post("/User", userController.Create);
router.post("/Follow/:followerId", userController.Follow);
router.get("/User", userController.findOne);
router.get("/Users", userController.findAll);
router.put("/User/:userId", userController.Update);
router.delete("/User", userController.Destroy);
router.delete("/Unfollow/:followerId", userController.Unfollow);

// Category Routes
router.post("/Category", categoryController.Create);
router.get("/Category", categoryController.findOne);
router.get("/Categories", categoryController.findAll);
router.put("/Category/:categoryId", categoryController.Update);
router.delete("/Category", categoryController.Destroy);

// Post Routes
router.post("/Post", postController.Create);
router.get("/Post", postController.findOne);
router.get("/Posts", postController.findAll);
router.put("/Post/:postId", postController.Update);
router.delete("/Post", postController.Destroy);


export default router;