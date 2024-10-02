/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/api";
import { UnitProps } from "../../types/types";
import { getToken } from "../../services/auth";

const initialState = {
    loading: true,
    message: "",
    units: [] as UnitProps[]
}

export const getUnits = createAsyncThunk("units/getUnits", async () => {
    
    try {
        const response = await axiosInstance.get(`/utils/units`, { headers: { 
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

const unitSlice = createSlice({
    name: "units",
    initialState,
    reducers: {
        updateUnits: (state, action: PayloadAction<UnitProps[]>) => {
            state.units = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUnits.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUnits.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload.status){
                state.units = action.payload.data as UnitProps[];
                state.message = "";
                return;
            }

            if(!action.payload.status){
                state.message = action.payload.message as string;
                return;
            }
            
            state.message = action.payload.message as string || "Something went wrong, try again later.";
        });

        builder.addCase(getUnits.rejected, (state, action) => {
            state.loading = false;
            state.message = action.error.message as string;
        });
    }
});

export const { updateUnits } = unitSlice.actions;

export default unitSlice.reducer;