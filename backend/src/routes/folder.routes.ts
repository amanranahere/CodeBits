import { Router } from "express";
import {
  createFolder,
  getUserFolders,
  getFolderById,
  renameFolder,
  addFilesToFolder,
  removeFilesFromFolder,
  deleteFolder,
} from "../controllers/folder.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();
router.use(verifyJWT);

//   routes
router.route("/").post(createFolder).get(getUserFolders);

router
  .route("/:folderId")
  .get(getFolderById)
  .patch(renameFolder)
  .delete(deleteFolder);

router.route("/:folderId/add-files").post(addFilesToFolder);

router.route("/:folderId/remove-file/:fileId").delete(removeFilesFromFolder);

export default router;
