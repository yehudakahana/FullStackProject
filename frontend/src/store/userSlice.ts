import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:5000/api";

interface IUserState {
  username: string | null;
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// קריאה ל-localStorage לקבלת ה-token אם קיים
const storedToken = localStorage.getItem("token");

const initialState: IUserState = {
  username: null,
  token: storedToken || null,  
  status: "idle",
  error: null,
};

// פעולה אסינכרונית לרישום משתמש
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData: { username: string; password: string, isAdmin: boolean }, thunkAPI) => {
    try {
      const response = await fetch(`${BASE_URL}/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message);
      }

      localStorage.setItem("token", data.token);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Registration failed.");
    }
  }
);

// פעולה אסינכרונית להתחברות
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData: { username: string; password: string }, thunkAPI) => {
    try {
      const response = await fetch(`${BASE_URL}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message);
      }

      localStorage.setItem("token", data.token);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Login failed.");
    }
  }
);

// יצירת ה-slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.username = null;
      state.token = null;
      state.status = "idle";
      state.error = null;

      localStorage.removeItem("token");
    },
    resetStatus: (state) => {
      state.status = "idle";
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.username = action.payload.username;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.username = action.payload.username;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout, resetStatus } = userSlice.actions;
export default userSlice.reducer;










// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { createAsyncThunk } from "@reduxjs/toolkit";

// const BASE_URL = "http://localhost:5000/api";

// interface IUserState {
//   username: string | null;
//   status: "idle" | "loading" | "succeeded" | "failed";
//   error: string | null;
//   // token: string | null;
// }

// const initialState: IUserState = {
//   username: null,
//   status: "idle", 
//   error: null,
//   // token: null,
// };

// export const registerUser = createAsyncThunk(
//   "user/registerUser", 
//   async (userData: { username: string; password: string , isAdmin: boolean}, thunkAPI) => {
//     try {
//       const response = await fetch(`${BASE_URL}/register/`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userData),
//       });
//       const data = await response.json();
//       if (!response.ok) {
//         return thunkAPI.rejectWithValue(data.message);
//       }
//       return data; 
//     } catch (error) {
//       return thunkAPI.rejectWithValue("Registration failed."); 
//     }
//   }
// );

// export const loginUser = createAsyncThunk(
//   "user/loginUser",
//   async (userData: { username: string; password: string }, thunkAPI) => {
//     try {
//       const response = await fetch(`${BASE_URL}/login/`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userData),
//       });
//       const data = await response.json();
//       if (!response.ok) {
//         return thunkAPI.rejectWithValue(data.message); 
//       }
//       return data; 
//     } catch (error) {
//       return thunkAPI.rejectWithValue("Login failed.");
//     }
//   }
// );



// // יצירת ה-slice
// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.username = null;
//       // state.token = null;
//       state.status = "idle";
//       state.error = null;
//     },
//     resetStatus :(state) => {
//       state.status = "idle";
//       state.error = null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(registerUser.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
//         state.status = "succeeded";
//         // state.token = action.payload.token;
//         state.username = action.payload.username;
//       })
//       .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })


//       .addCase(loginUser.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
//         state.status = "succeeded";
//         // state.token = action.payload.token;
//         state.username = action.payload.username;
//       })
//       .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
//         state.status = "failed";
//         state.error = action.payload;
//       });
//   },
// });

// export const { logout, resetStatus } = userSlice.actions;
// export default userSlice.reducer;














