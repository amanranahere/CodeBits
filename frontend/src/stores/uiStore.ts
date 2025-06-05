import { create } from "zustand";

interface UIStore {
  sidebarOpen: boolean;
  filePanelOpen: boolean;
  newFileModalOpen: boolean;
  searchModalOpen: boolean;
  settingsModalOpen: boolean;
  keyboardShortcutsModalOpen: boolean;
  aboutModalOpen: boolean;
  feedbackModalOpen: boolean;
  openLogin: boolean;
  openSignup: boolean;

  toggleSidebar: () => void;
  toggleFilePanel: () => void;
  toggleNewFileModal: () => void;
  toggleSearchModal: () => void;
  toggleSettingsModal: () => void;
  toggleKeyboardShortcutsModal: () => void;
  toggleAboutModal: () => void;
  toggleFeedbackModal: () => void;

  setFilePanelOpen: (value: boolean) => void;
  openAuthBox: (type: "login" | "signup") => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: true,
  filePanelOpen: true,
  newFileModalOpen: false,
  searchModalOpen: false,
  settingsModalOpen: false,
  keyboardShortcutsModalOpen: false,
  aboutModalOpen: false,
  feedbackModalOpen: false,

  openLogin: true,
  openSignup: false,

  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

  toggleFilePanel: () => set((s) => ({ filePanelOpen: !s.filePanelOpen })),

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

  openAuthBox: (type) =>
    set({
      openLogin: type === "login",
      openSignup: type === "signup",
    }),

  setFilePanelOpen: (value: boolean) => set({ filePanelOpen: value }),
}));
