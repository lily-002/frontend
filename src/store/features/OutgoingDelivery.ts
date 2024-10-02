/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/api";
import { OutgoingDeliveryProps } from "../../types/types";
import { getToken } from "../../services/auth";

const initialState = {
    loading: true,
    message: "",
    outgoingDeliveries: [] as OutgoingDeliveryProps[]
}

export const getOutgoingDeliveries = createAsyncThunk("outgoingDeliveries/getOutgoingDeliveries", async () => {
    
    try {
        const response = await axiosInstance.get(`/user/delivery-note`, { headers: { 
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

const outgoingDeliverySlice = createSlice({
    name: "outgoingDeliveries",
    initialState,
    reducers: {
        updateOutgoingDeliveries: (state, action: PayloadAction<OutgoingDeliveryProps[]>) => {
            state.outgoingDeliveries = action.payload;
        },
        removeDeliveryNote: (state, action: PayloadAction<{id: number | string}>) => {
            state.outgoingDeliveries = state.outgoingDeliveries.filter(d => d.id.toString() !== action.payload.id.toString());
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getOutgoingDeliveries.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getOutgoingDeliveries.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload.status){
                state.outgoingDeliveries = action.payload.data.data as OutgoingDeliveryProps[];
                state.message = "";
                return;
            }

            if(!action.payload.status){
                state.message = action.payload.message as string;
                return;
            }
            
            state.message = action.payload.message as string || "Something went wrong, try again later.";
        });

        builder.addCase(getOutgoingDeliveries.rejected, (state, action) => {
            state.loading = false;
            state.message = action.error.message as string;
        });
    }
});

export const { updateOutgoingDeliveries, removeDeliveryNote } = outgoingDeliverySlice.actions;

export default outgoingDeliverySlice.reducer;