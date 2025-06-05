import { create } from "zustand";

interface UIStore {
  sidebarOpen: boolean;
  filePanelOpen: boolean;
  newFileDialogOpen: boolean;
  searchDialogOpen: boolean;
  openLogin: boolean;
  openSignup: boolean;

  toggleSidebar: () => void;
  toggleFilePanel: () => void;
  toggleNewFileDialog: () => void;
  toggleSearchDialog: () => void;

  setFilePanelOpen: (value: boolean) => void;
  openAuthBox: (type: "login" | "signup") => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: true,
  filePanelOpen: true,
  newFileDialogOpen: false,
  searchDialogOpen: false,

  openLogin: true,
  openSignup: false,

  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

  toggleFilePanel: () => set((s) => ({ filePanelOpen: !s.filePanelOpen })),

  toggleNewFileDialog: () =>
    set((s) => ({ newFileDialogOpen: !s.newFileDialogOpen })),

  toggleSearchDialog: () =>
    set((s) => ({ searchDialogOpen: !s.searchDialogOpen })),

  openAuthBox: (type) =>
    set({
      openLogin: type === "login",
      openSignup: type === "signup",
    }),

  setFilePanelOpen: (value: boolean) => set({ filePanelOpen: value }),
}));
