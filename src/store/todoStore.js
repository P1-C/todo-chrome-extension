import { create } from "zustand";
import { persist } from "zustand/middleware";

// todo store
const useTodoStore = create(
  persist(
    (set) => ({
      tasks: [],
      groups: [],
      draggedTask: null,

      // Function to add a new todo task
      addTodoTask: (task) =>
        set((state) => {
          const newTask = { id: crypto.randomUUID(), ...task };
          return {
            tasks: [...state.tasks, newTask],
          };
        }),

      // Function to edit a todo task
      updateTodoTask: (taskId, updatedTask) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? updatedTask : task
          ),
        })),

      // Function to delete a todo task by id
      deleteTodoTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        })),

      // Function to set the dragged task
      setDraggedTask: (taskID) => set({ draggedTask: taskID }),

      // Function to move a task to a different state
      moveTask: (id, status) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, status: status } : task
          ),
        })),

      // Function to add a new group with a unique ID
      addGroup: (groupName) =>
        set((state) => {
          const newGroup = { id: crypto.randomUUID(), name: groupName };
          return {
            groups: [...state.groups, newGroup],
            selectedGroup: newGroup,
          };
        }),

       // Function to update a group's name
       updateGroupName: (groupId, updatedName) => {
        set((state) => {
          const updatedGroups = state.groups.map((group) =>
            group.id === groupId ? { ...group, name: updatedName } : group
          );
          return {
            groups: updatedGroups,
          };
        });
      },

      // Function to delete a group by ID
      deleteGroup: (groupId) => {
        set((state) => ({
          groups: state.groups.filter((group) => group.id !== groupId),
        }))},       
    }),
    { name: "centralStore" }
  )
);

export default useTodoStore;
