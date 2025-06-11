import { create } from "zustand";
import type { UserFile } from "./fileStore";

interface UIStore {
  sidebarOpen: boolean;
  openLogin: boolean;
  openSignup: boolean;
  userDropdownOpen: boolean;

  fileInfoModalOpen: boolean;
  searchModalOpen: boolean;
  settingsModalOpen: boolean;
  keyboardShortcutsModalOpen: boolean;
  aboutModalOpen: boolean;
  feedbackModalOpen: boolean;
  newFileModalOpen: boolean;

  toggleSidebar: () => void;
  toggleNewFileModal: () => void;
  toggleSearchModal: () => void;
  toggleSettingsModal: () => void;
  toggleKeyboardShortcutsModal: () => void;
  toggleAboutModal: () => void;
  toggleFeedbackModal: () => void;
  toggleUserDropdown: () => void;

  setFileInfoModalOpen: (value: boolean) => void;
  openAuthBox: (type: "login" | "signup") => void;
  selectedFileForInfo: UserFile | null;
  openFileInfoModal: (file: UserFile) => void;
  closeFileInfoModal: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: true,
  fileInfoModalOpen: false,
  newFileModalOpen: false,
  searchModalOpen: false,
  settingsModalOpen: false,
  keyboardShortcutsModalOpen: false,
  aboutModalOpen: false,
  feedbackModalOpen: false,
  userDropdownOpen: false,
  selectedFileForInfo: null,

  openLogin: true,
  openSignup: false,

  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

  toggleNewFileModal: () =>
    set((s) => ({ newFileModalOpen: !s.newFileModalOpen })),

  toggleSearchModal: () =>
    set((s) => ({ searchModalOpen: !s.searchModalOpen })),

  toggleSettingsModal: () =>
    set((s) => ({ settingsModalOpen: !s.settingsModalOpen })),

  toggleKeyboardShortcutsModal: () =>
    set((s) => ({ keyboardShortcutsModalOpen: !s.keyboardShortcutsModalOpen })),

  toggleAboutModal: () => set((s) => ({ aboutModalOpen: !s.aboutModalOpen })),

  toggleFeedbackModal: () =>
    set((s) => ({ feedbackModalOpen: !s.feedbackModalOpen })),

  toggleUserDropdown: () =>
    set((s) => ({ userDropdownOpen: !s.userDropdownOpen })),

  openAuthBox: (type) =>
    set({
      openLogin: type === "login",
      openSignup: type === "signup",
    }),

  setFileInfoModalOpen: (value: boolean) => set({ fileInfoModalOpen: value }),

  openFileInfoModal: (file) =>
    set({ selectedFileForInfo: file, fileInfoModalOpen: true }),

  closeFileInfoModal: () =>
    set({ selectedFileForInfo: null, fileInfoModalOpen: false }),
}));
