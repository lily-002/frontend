/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/api";
import { CompanyProps } from "../../types/types";
import { getToken } from "../../services/auth";

const initialState = {
    loading: true,
    message: "",
    userCompany: {} as CompanyProps
}

export const getUserCompany = createAsyncThunk("userCompany/getUserCompany", async () => {
    
    try {
        const response = await axiosInstance.get(`/user/company`, { headers: { 
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
    name: "userCompany",
    initialState,
    reducers: {
        // updateProfile: (state, action: PayloadAction<CompanyProps>) => {
        //     state.userCompany = action.payload;
        //     state.loading = false;
        // }
    },
    extraReducers: (builder) => {
        
        builder.addCase(getUserCompany.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(getUserCompany.fulfilled, (state, action) => {
            state.loading = false;

            if(action.payload.status){
                state.userCompany = action.payload.data as CompanyProps;
                state.message = "";
                return;
            }

            if(!action.payload.status){
                state.message = action.payload.message as string;
                return;
            }
            
            state.message = action.payload.message as string || "Something went wrong, try again later.";
        });

        builder.addCase(getUserCompany.rejected, (state, action) => {
            state.loading = false;
            state.message = action.error.message as string;
        });
    }
});

// export const { updateProfile } = profileSlice.actions;

export default profileSlice.reducer;