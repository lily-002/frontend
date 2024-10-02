/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/api";
import { UtilsProps } from "../../types/types";
import { getToken } from "../../services/auth";

const initialState = {
    loading: true,
    message: "",
    deliveryNoteDespatchTypes: [] as UtilsProps[],
    current_page: 1,
    per_page: 10,
    total: 0
}

export const getDeliveryNoteDespatchTypes = createAsyncThunk("deliveryNoteDespatchTypes/getDeliveryNoteDespatchTypes", async () => {
    
    try {
        const response = await axiosInstance.get(`/utils/delivery_note_despatch_types`, { headers: { 
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

const deliveryNoteDespatchTypeSlice = createSlice({
    name: "deliveryNoteDespatchTypes",
    initialState,
    reducers: {
        updateDeliveryNoteDespatchTypes: (state, action: PayloadAction<UtilsProps[]>) => {
            state.deliveryNoteDespatchTypes = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getDeliveryNoteDespatchTypes.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getDeliveryNoteDespatchTypes.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload.status){
                state.deliveryNoteDespatchTypes = action.payload.data as UtilsProps[];
                // state.total = action.payload.data.total;
                // state.per_page = action.payload.data.per_page;
                // state.current_page = action.payload.data.current_page;
                state.message = "";
                return;
            }

            if(!action.payload.status){
                state.message = action.payload.message as string;
                return;
            }
            
            state.message = action.payload.message as string || "Something went wrong, try again later.";
        });

        builder.addCase(getDeliveryNoteDespatchTypes.rejected, (state, action) => {
            state.loading = false;
            state.message = action.error.message as string;
        });
    }
});

export const { updateDeliveryNoteDespatchTypes } = deliveryNoteDespatchTypeSlice.actions;

export default deliveryNoteDespatchTypeSlice.reducer;