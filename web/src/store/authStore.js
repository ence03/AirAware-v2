import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  role: null,
  users: [], // This will store the list of all users

  setUser: (user, token) => {
    console.log("User set:", user); // Log the user to verify the role
    set({
      user,
      token,
      isAuthenticated: true,
      role: user.role,
    });
  },

  clearUser: () =>
    set({ user: null, token: null, isAuthenticated: false, role: null }),

  updateUser: (user) => set({ user, role: user.role }),

  isAdmin: () => {
    return useAuthStore.getState().role === "admin"; // Make sure it checks the role from the store
  },

  // Fetch all users
  getAllUsers: async () => {
    try {
      const response = await axios.get("http://localhost:7000/api/users", {
        withCredentials: true, // Include cookies in the request
      });
      const users = response.data.data;
      set({ users }); // Save the users in the store
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error; // Propagate the error
    }
  },

  // Fetch user by ID
  getUser: async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:7000/api/users/${id}`,
        {
          withCredentials: true, // Include cookies in the request
        }
      );
      const user = response.data.data;
      set({ user });
      return user;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error; // Propagate the error
    }
  },

  // Delete user by ID
  deleteUser: async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:7000/api/users/${id}`,
        { withCredentials: true }
      );
      if (response.data.success) {
        // Clear user data from store after deletion
        set({ user: null, token: null, isAuthenticated: false, role: null });
      }
      return response.data;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error; // Propagate the error
    }
  },
}));

export default useAuthStore;
