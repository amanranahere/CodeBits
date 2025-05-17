import { Router } from "express";
import {
  createFile,
  getUserFiles,
  getFileById,
  updateFile,
  deleteFile,
} from "../controllers/file.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();
router.use(verifyJWT);

//   routes
router.route("/").post(createFile).get(getUserFiles);

router.route("/:fileId").get(getFileById).patch(updateFile).delete(deleteFile);

export default router;
