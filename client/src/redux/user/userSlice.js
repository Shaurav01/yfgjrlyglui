import { createSlice } from "@reduxjs/toolkit";
import API from "../../api";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutUserStart: (state) => {
      state.loading = true;
    },
    signOutUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    signOutUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// ✅ Thunks for API calls
export const signInUser = (formData) => async (dispatch) => {
  try {
    dispatch(signInStart());
    const res = await API.post("/api/auth/signin", formData);
    dispatch(signInSuccess(res.data));
  } catch (err) {
    dispatch(signInFailure(err.response?.data?.message || "Sign in failed"));
  }
};

export const updateUser = (id, formData) => async (dispatch) => {
  try {
    dispatch(updateUserStart());
    const res = await API.put(`/api/user/${id}`, formData);
    dispatch(updateUserSuccess(res.data));
  } catch (err) {
    dispatch(updateUserFailure(err.response?.data?.message || "Update failed"));
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch(deleteUserStart());
    await API.delete(`/api/user/${id}`);
    dispatch(deleteUserSuccess());
  } catch (err) {
    dispatch(deleteUserFailure(err.response?.data?.message || "Delete failed"));
  }
};

export const signOutUser = () => async (dispatch) => {
  try {
    dispatch(signOutUserStart());
    await API.post("/api/auth/signout");
    dispatch(signOutUserSuccess());
  } catch (err) {
    dispatch(signOutUserFailure(err.response?.data?.message || "Sign out failed"));
  }
};

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserFailure,
  updateUserSuccess,
  updateUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,
  signOutUserFailure,
  signOutUserSuccess,
  signOutUserStart,
} = userSlice.actions;

export default userSlice.reducer;
