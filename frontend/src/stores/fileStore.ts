import { create } from "zustand";
import axiosInstance from "../utils/axios.helper";
import { toast } from "react-toastify";

export interface UserFile {
  _id: string;
  name: string;
  extension: string;
  description?: string;
  code?: string;
  createdAt: string;
  updatedAt: string;
}

interface FileStore {
  files: UserFile[];
  loading: boolean;
  fetchFiles: () => Promise<void>;
  createFile: (fileData: Partial<UserFile>) => Promise<UserFile | void>;
  deleteFile: (fileId: string) => Promise<void>;
  updateFile: (fileId: string, updates: Partial<UserFile>) => Promise<void>;
  getFileById: (fileId: string) => UserFile | undefined;
}

export const useFileStore = create<FileStore>((set, get) => ({
  files: [],
  loading: false,

  fetchFiles: async () => {
    set({ loading: true });

    try {
      const res = await axiosInstance.get("/file");
      set({ files: res.data.data.files });
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },

  createFile: async (fileData) => {
    set({ loading: true });

    const { files } = get();
    const sanitizedName = fileData.name?.trim().replace(/\s+/g, "");
    const sanitizedExtension = fileData.extension?.trim().toLowerCase();

    if (sanitizedName && files.some((file) => file.name === sanitizedName)) {
      toast.error("A file with this name already exists.");
      set({ loading: false });
      return;
    }

    try {
      const newFileData = {
        ...fileData,
        name: sanitizedName,
        extension: sanitizedExtension,
      };

      const res = await axiosInstance.post("/file", newFileData);
      const newFile = res.data.data;
      set({ files: [...get().files, newFile] });
      return newFile;
    } catch (err) {
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },

  deleteFile: async (fileId) => {
    try {
      await axiosInstance.delete(`/file/${fileId}`);
      set({ files: get().files.filter((file) => file._id !== fileId) });
    } catch (err) {
      toast.error("Failed to delete file");
      console.error(err);
    }
  },

  updateFile: async (fileId, updates) => {
    const { files } = get();
    const sanitizedName = updates.name?.trim().replace(/\s+/g, "");
    const sanitizedExtension = updates.extension?.trim().toLowerCase();

    if (
      sanitizedName &&
      files.some((file) => file._id !== fileId && file.name === sanitizedName)
    ) {
      toast.error("A file with this name already exists.");
      return;
    }

    try {
      const res = await axiosInstance.patch(`/file/${fileId}`, {
        ...updates,
        name: sanitizedName ?? updates.name,
        extension: sanitizedExtension ?? updates.extension,
      });
      const updated = res.data.data;
      set({
        files: get().files.map((file) =>
          file._id === fileId ? updated : file
        ),
      });
    } catch (err) {
      toast.error("Failed to update file");
      console.error(err);
    }
  },

  getFileById: (fileId) => {
    return get().files.find((file) => file._id === fileId);
  },
}));
