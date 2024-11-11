import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";


interface IcandidatesState{
 username: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  // token: string | null;

}

const initialState: IcandidatesState = {
    username: null,
    status: "idle", 
    error: null,
    // token: null,
  };

export const getCandidates = createAsyncThunk(
    "user/getCandidates", 
    async (_, thunkAPI) => {
      try {
        const response = await fetch("/api/register/", {
          method: "GET",
        });
        const data = await response.json();
        if (!response.ok) {
          return thunkAPI.rejectWithValue(data.message);
        }
        return data; 
      } catch (error) {
        return thunkAPI.rejectWithValue("Registration failed."); 
      }
    }
  );
  


export const candidatesSlice = createSlice({
    initialState,
    name: "candidates",
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(getCandidates.pending, (state) => {
            state.status = "loading";
            state.error = null;
          })
          .addCase(getCandidates.fulfilled, (state, action: PayloadAction<any>) => {
            state.status = "succeeded";
            // state.token = action.payload.token;
            state.username = action.payload.username;   
          })
          .addCase(getCandidates.rejected, (state, action: PayloadAction<any>) => {
            state.status = "failed";
            state.error = action.payload;
          });
      },
  });

   

export default candidatesSlice.reducer;
