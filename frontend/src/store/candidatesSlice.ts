import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:5000/api";

interface IcandidatesState {
  candidates: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  token: string | null; 
}

const initialState: IcandidatesState = {
  candidates: [],
  status: "idle",
  error: null,
  token: null,
};

export const getCandidates = createAsyncThunk(
  "candidates/getCandidates", 
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${BASE_URL}/candidates/`, {
        method: "GET",
      });
      const data = await response.json();
      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message);
      }
      return data; 
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch candidates.");
    }
  }
);


export const vote = createAsyncThunk(
  "candidates/vote",
  async (userData: { candidateName :string }, thunkAPI) => {
    try {
      const response = await fetch(`${BASE_URL}/candidates/vote/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ candidateName: userData}),
      });
      const data = await response.json();
      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message);
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("vote failed.");
    }
  }
);


export const candidatesSlice = createSlice({
  name: "candidates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCandidates.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getCandidates.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.candidates = action.payload; 
      })
      .addCase(getCandidates.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload; 
      })

      .addCase(vote.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(vote.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.candidates = action.payload; 
      })
      .addCase(vote.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload; 
      })
      
      ;
  },
});

export default candidatesSlice.reducer;
