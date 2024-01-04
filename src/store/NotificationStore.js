import { create } from 'zustand';

const useNotificationStore = create((set) => ({
  display: false,
  message: '',
  showNotification: (message) => {
    set(() => ({display: true, message:message }))
  },
  hideNotification: () => set((state) => ({ ...state, display: false, message:'' })),
}));

export default useNotificationStore;