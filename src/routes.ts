import { Router } from "express";
import { CreateUserController } from "./controllers/./CreateUserController";
import { CreateTagController } from "./controllers/./CreateTagController"
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthUserController } from "./controllers/AuthUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ensureAuth } from "./middlewares/ensureAuth";
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiverComplimentsController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUsersController } from "./controllers/ListUsersController";

const router = Router();
const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const authUserController = new AuthUserController()
const createComplimentController = new CreateComplimentController()
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController()
const listUserSendComplimentsController = new ListUserSendComplimentsController()
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

router.post("/users", createUserController.handle)
router.post("/login", authUserController.handle)
router.post("/tags", ensureAuth, ensureAdmin, createTagController.handle)
router.post("/compliments", ensureAuth ,createComplimentController.handle)


router.get("/users/compliments/send", ensureAuth ,listUserSendComplimentsController.handle)
router.get("/users/compliments/receive", ensureAuth,listUserReceiveComplimentsController.handle)
router.get("/tags", ensureAuth ,listTagsController.handle)
router.get("/users", ensureAuth ,listUsersController.handle)
export { router }