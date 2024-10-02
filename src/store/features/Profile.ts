/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/api";
import { ProfileProps } from "../../types/types";
import { getToken } from "../../services/auth";

const initialState = {
    loading: true,
    message: "",
    profile: {} as ProfileProps
}

export const getProfile = createAsyncThunk("profile/getProfile", async () => {
    
    try {
        const response = await axiosInstance.get(`/user/me`, { headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`
        } });
    
        return response.data;
    } catch (error: any) {
        if (error.response) {
            return error.response.data;
        } else {
            throw new Error('Network error occurred.');
        }
    }
});

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        updateProfile: (state, action: PayloadAction<ProfileProps>) => {
            state.profile = action.payload;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        
        builder.addCase(getProfile.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(getProfile.fulfilled, (state, action) => {
            state.loading = false;

            if(action.payload.status){
                state.profile = action.payload.data as ProfileProps;
                state.message = "";
                return;
            }

            if(!action.payload.status){
                state.message = action.payload.message as string;
                return;
            }
            
            state.message = action.payload.message as string || "Something went wrong, try again later.";
        });

        builder.addCase(getProfile.rejected, (state, action) => {
            state.loading = false;
            state.message = action.error.message as string;
        });
    }
});

export const { updateProfile } = profileSlice.actions;

export default profileSlice.reducer;