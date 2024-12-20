import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  role: null,

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
}));

export default useAuthStore;
