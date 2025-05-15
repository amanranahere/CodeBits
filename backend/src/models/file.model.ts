import mongoose, { Schema } from "mongoose";

const fileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    extension: {
      type: String,
      required: true,
      enum: [
        "js",
        "ts",
        "jsx",
        "tsx",
        "html",
        "css",
        "scss",
        "sass",
        "json",
        "json5",
        "yml",
        "yaml",
        "md",
        "txt",
        "py",
        "java",
        "go",
        "rb",
        "rs",
        "php",
        "sh",
      ],
    },
    description: {
      type: String,
    },
    code: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const File = mongoose.model("File", fileSchema);
