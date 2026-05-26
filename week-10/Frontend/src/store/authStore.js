import { create } from "zustand";
import axios from "axios";

export const useAuth = create((set) => ({
  currentUser: null,
  loading: false,
  isAuthenticated: false,
  error: null,
  login: async (userCredWithRole) => {
    try {
      //set loading true
      set({ loading: true, error: null });
      // Log exactly what we are sending so we can debug
      console.log("[LOGIN] Sending credentials:", JSON.stringify(userCredWithRole));
      //make api call
      let res = await axios.post("https://blogapp-backend-7kra.onrender.com/common-api/login", userCredWithRole, { withCredentials: true });
      // console.log("res is ", res);
      //update state
      set({
        loading: false,
        isAuthenticated: true,
        currentUser: res.data.payload, //{message:"",payload:}
      });
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Login failed";
      console.log("[LOGIN] Failed:", msg, "| Status:", err.response?.status);
      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        error: msg,
      });
      throw err;
    }
  },
  logout: async () => {
    try {
      //set loading state
      set({ loading: true, error: null });
      //make logout api req
      await axios.get("https://blogapp-backend-7kra.onrender.com/common-api/logout", { withCredentials: true });
      //update state
      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
      });
    } catch (err) {
      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        error: err.response?.data?.error || "Logout failed",
      });
    }
  },
  // restore login
  checkAuth: async () => {
    try {
      set({ loading: true });
      const res = await axios.get("https://blogapp-backend-7kra.onrender.com/common-api/check-auth", { withCredentials: true });

      set({
        currentUser: res.data.payload,
        isAuthenticated: true,
        loading: false,
      });
    } catch (err) {
      // If user is not logged in → do nothing
      if (err.response?.status === 401) {
        set({
          currentUser: null,
          isAuthenticated: false,
          loading: false,
        });
        return;
      }

      // other errors (ignore aborted requests - harmless race condition on page load)
      if (err.code !== "ERR_CANCELED" && err.message !== "Request aborted") {
        console.error("Auth check failed:", err);
      }
      set({ loading: false });
    }
  },
}));