import { create } from 'zustand';

type NotificationsState = {
    notifications: string[];
    addNotification: (message: string) => void;
    clearAll: () => void;
};

export const useNotificationsStore = create<NotificationsState>()((set) => ({
    notifications: [],

    addNotification: (message) =>
        set((state) => ({ notifications: [message, ...state.notifications] })),

    clearAll: () => set({ notifications: [] }),
}));
