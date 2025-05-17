import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { Folder } from "../models/folder.model";

const createFolder = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name?.trim()) {
    throw new ApiError(400, "Folder name is required!");
  }

  const folder = await Folder.create({
    name,
    owner: (req as any).user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, folder, "Folder created successfully!"));
});

const getUserFolders = asyncHandler(async (req, res) => {
  const folders = await Folder.find({
    owner: (req as any).user._id,
  }).sort({ updatedAt: -1 });

  const count = folders.length;

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { count, folders },
        "User folders fetched successfully!"
      )
    );
});

const getFolderById = asyncHandler(async (req, res) => {
  const { folderId } = req.params;

  const folder = await Folder.findOne({
    _id: folderId,
    owner: (req as any).user._id,
  }).populate("files");

  if (!folder) {
    throw new ApiError(404, "Folder not found!");
  }

  const fileCount = folder.files.length;

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { folder, fileCount },
        "Folder retrieved successfully!"
      )
    );
});

const renameFolder = asyncHandler(async (req, res) => {
  const { folderId } = req.params;
  const { name } = req.body;

  if (!name.trim()) {
    throw new ApiError(400, "Folder name is required!");
  }

  const updatedFolder = await Folder.findOneAndUpdate(
    { _id: folderId, owner: (req as any).user._id },
    { name },
    { new: true }
  );

  if (!updatedFolder) {
    throw new ApiError(404, "Folder not found!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedFolder, "Folder renamed successfully!"));
});

const addFilesToFolder = asyncHandler(async (req, res) => {
  const { folderId } = req.params;
  const { fileIds } = req.body;

  const folder = await Folder.findOne({
    _id: folderId,
    owner: (req as any).user._id,
  });

  if (!folder) {
    throw new ApiError(404, "Folder not found!");
  }

  if (!Array.isArray(fileIds) || fileIds.length === 0) {
    throw new ApiError(400, "fileIds must be a non-empty array!");
  }

  folder.files.push(...fileIds);
  await folder.save();

  return res
    .status(200)
    .json(new ApiResponse(200, folder, "File(s) added to folder!"));
});

const removeFilesFromFolder = asyncHandler(async (req, res) => {
  const { folderId, fileId } = req.params;

  const folder = await Folder.findOne({
    _id: folderId,
    owner: (req as any).user._id,
  });

  if (!folder) {
    throw new ApiError(404, "Folder not found!");
  }

  folder.files = folder.files.filter(
    (f: any) => f.toString() !== fileId.toString()
  );

  await folder.save();

  return res
    .status(200)
    .json(new ApiResponse(200, folder, "File removed from folder!"));
});

const deleteFolder = asyncHandler(async (req, res) => {
  const { folderId } = req.params;

  const deletedFolder = await Folder.findOneAndDelete({
    _id: folderId,
    owner: (req as any).user._id,
  });

  if (!deletedFolder) {
    throw new ApiError(404, "Folder not found or already deleted!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deletedFolder, "Folder deleted successfully!"));
});

export {
  createFolder,
  getUserFolders,
  getFolderById,
  renameFolder,
  addFilesToFolder,
  removeFilesFromFolder,
  deleteFolder,
};
