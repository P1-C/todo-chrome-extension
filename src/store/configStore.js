import { create } from 'zustand';
import { persist } from "zustand/middleware";

const useConfigStore = create(persist((set) => ({
  isSideBarOpen: true,
  isNewUser: true,
  isDarkTheme: false,
  isTaskDrawerOpen: false,
  selectedTask: null,
  selectedGroup: null,
  
  // Function to set the selected group
  setSelectedGroup: (group = null ) => {
    set({ selectedGroup: group })
  },

  //function to set newUser
  setSelectedTask: (task) => {
    set((state) => ({
      selectedTask: task,
    }));
  },
  //function to set newUser
  setNewUser: () => {
    set((state) => ({
      isNewUser: !state.isNewUser,
    }));
  },

  // Function to toggle the sidebar state
  toggleSideBar: () => {
    set((state) => ({
      isSideBarOpen: !state.isSideBarOpen,
    }));
  },

  // Function to toggle the sidebar state
  toggleTaskDrawer: () => {
    set((state) => ({
      isTaskDrawerOpen: !state.isTaskDrawerOpen,
    }));
  },

  // Function to toggle the theme state
  toggleTheme: () => {
    set((state) => ({
      isDarkTheme: !state.isDarkTheme,
    }));
  },

  // Function to set the setIsDark state
  setIsDarkTheme: (boolean) => {
    set((state) => ({
      isDarkTheme: boolean,
    }));
  },
}),{ name: "configStore" }));

export default useConfigStore;