import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { File } from "../models/file.model";

const createFile = asyncHandler(async (req, res) => {
  const { name, extension, description, code } = req.body;

  if (!name || !extension) {
    throw new ApiError(400, "Name and extension are required!");
  }

  const sanitizedName = name?.trim().replace(/\s+/g, "");

  const newFile = await File.create({
    name: sanitizedName,
    extension,
    description,
    code,
    owner: (req as any).user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, newFile, "File created successfully!"));
});

const getUserFiles = asyncHandler(async (req, res) => {
  const { search = "" } = req.query;

  const searchRegex = new RegExp(search.toString(), "i");

  const files = await File.find({
    owner: (req as any).user._id,
    $or: [
      { name: { $regex: searchRegex } },
      { description: { $regex: searchRegex } },
      { extension: { $regex: searchRegex } },
    ],
  }).sort({
    updatedAt: -1,
  });

  const count = files.length;

  return res
    .status(200)
    .json(
      new ApiResponse(200, { count, files }, "User files fetched successfully!")
    );
});

const getFileById = asyncHandler(async (req, res) => {
  const { fileId } = req.params;

  const file = await File.findOne({
    _id: fileId,
    owner: (req as any).user._id,
  });

  if (!file) {
    throw new ApiError(400, "File not found!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, file, "File retrieved successfully!"));
});

const updateFile = asyncHandler(async (req, res) => {
  const { fileId } = req.params;
  const { name, extension, description, code } = req.body;

  const sanitizedName = name?.trim().replace(/\s+/g, "");

  const updatedFile = await File.findOneAndUpdate(
    { _id: fileId, owner: (req as any).user._id },
    { name: sanitizedName, extension, description, code },
    { new: true, runValidators: true }
  );

  if (!updatedFile) {
    throw new ApiError(404, "File not found!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedFile, "File updated successfully!"));
});

const deleteFile = asyncHandler(async (req, res) => {
  const { fileId } = req.params;

  const deletedFile = await File.findOneAndDelete({
    _id: fileId,
    owner: (req as any).user._id,
  });

  if (!deletedFile) {
    throw new ApiError(404, "File not found!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deletedFile, "File deleted successfully!"));
});

export { createFile, getUserFiles, getFileById, updateFile, deleteFile };
