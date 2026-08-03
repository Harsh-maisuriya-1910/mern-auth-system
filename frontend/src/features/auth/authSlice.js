import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/axiosInstance";

/* -------------------------------------------------------------------------- */
/*                               AUTH THUNKS                                  */
/* -------------------------------------------------------------------------- */

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/auth/register", userData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (verifyData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        "/auth/verify-email",
        verifyData
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Email verification failed"
      );
    }
  }
);

export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async (emailData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        "/auth/resend-otp",
        emailData
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "OTP resend failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/auth/login", loginData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

export const getMe = createAsyncThunk(
  "auth/getMe",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get("/auth/me");
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unauthorized"
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/auth/logout");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Logout failed"
      );
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (emailData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        "/auth/forgot-password",
        emailData
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Forgot password failed"
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (resetData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        "/auth/reset-password",
        resetData
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Reset password failed"
      );
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch(
        "/auth/update-profile",
        profileData
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Profile update failed"
      );
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (passwordData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.patch(
        "/auth/change-password",
        passwordData
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Password change failed"
      );
    }
  }
);

/* -------------------------------------------------------------------------- */
/*                               INITIAL STATE                                */
/* -------------------------------------------------------------------------- */

const initialState = {
  user: null,
  loading: false,
  isAuthenticated: false,
  authChecked: false,
  successMessage: "",
  errorMessage: "",
  registeredEmail: "",
  resetEmail: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        clearAuthMessages: (state) => {
            state.successMessage = "";
            state.errorMessage = "";
        },

        setRegisteredEmail: (state, action) => {
            state.registeredEmail = action.payload;
        },

        setResetEmail: (state, action) => {
            state.resetEmail = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.successMessage = "";
                state.errorMessage = "";
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                state.registeredEmail = action.payload.data.email;
                state.successMessage = action.payload.message;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.errorMessage = action.payload;
            })

            .addCase(verifyEmail.pending, (state) => {
                state.loading = true;
                state.successMessage = "";
                state.errorMessage = "";
            })
            .addCase(verifyEmail.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                state.successMessage = action.payload.message;
            })
            .addCase(verifyEmail.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.payload;
            })

            .addCase(resendOtp.pending, (state) => {
                state.loading = true;
                state.successMessage = "";
                state.errorMessage = "";
            })
            .addCase(resendOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action.payload.message;
            })
            .addCase(resendOtp.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.payload;
            })

            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.successMessage = "";
                state.errorMessage = "";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data.user;
                state.isAuthenticated = true;
                state.authChecked = true;
                state.successMessage = action.payload.message;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.authChecked = true;
                state.errorMessage = action.payload;
            })

            .addCase(getMe.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.loading = false;
                state.authChecked = true;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(getMe.rejected, (state) => {
                state.loading = false;
                state.authChecked = true;
                state.isAuthenticated = false;
                state.user = null;
            })

            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })

            .addCase(logoutUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.authChecked = true;
                state.successMessage = action.payload.message;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.payload;
            })

            .addCase(forgotPassword.pending, (state) => {
                state.loading = true;
                state.successMessage = "";
                state.errorMessage = "";
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.resetEmail = action.payload.data.email;
                state.successMessage = action.payload.message;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.payload;
            })

            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
                state.successMessage = "";
                state.errorMessage = "";
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.resetEmail = "";
                state.user = null;
                state.isAuthenticated = false;
                state.authChecked = true;
                state.successMessage = action.payload.message;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.payload;
            })

            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.successMessage = "";
                state.errorMessage = "";
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                state.successMessage = action.payload.message;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.payload;
            })

            .addCase(changePassword.pending, (state) => {
                state.loading = true;
                state.successMessage = "";
                state.errorMessage = "";
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.authChecked = true;
                state.successMessage = action.payload.message;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.payload;
            });
    },
});

export const {
    clearAuthMessages,
    setRegisteredEmail,
    setResetEmail,
} = authSlice.actions;

export default authSlice.reducer;