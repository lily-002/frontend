/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/api";
import { OutgoingProducerProps } from "../../types/types";
import { getToken } from "../../services/auth";

const initialState = {
    loading: true,
    message: "",
    outgoingProducers: [] as OutgoingProducerProps[]
}

export const getOutgoingProducers = createAsyncThunk("outgoingProducers/getOutgoingProducers", async () => {
    
    try {
        const response = await axiosInstance.get(`/user/producer-receipts`, { headers: { 
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

const outgoingProducerSlice = createSlice({
    name: "outgoingProducers",
    initialState,
    reducers: {
        updateOutgoingProducer: (state, action: PayloadAction<OutgoingProducerProps[]>) => {
            state.outgoingProducers = action.payload;
        },
        removeProducerReceipt: (state, action: PayloadAction<{id: number | string}>) => {
            state.outgoingProducers = state.outgoingProducers.filter(pd => pd.id.toString() !== action.payload.id);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getOutgoingProducers.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getOutgoingProducers.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload.status){
                state.outgoingProducers = action.payload.data.data as OutgoingProducerProps[];
                state.message = "";
                return;
            }

            if(!action.payload.status){
                state.message = action.payload.message as string;
                return;
            }
            
            state.message = action.payload.message as string || "Something went wrong, try again later.";
        });

        builder.addCase(getOutgoingProducers.rejected, (state, action) => {
            state.loading = false;
            state.message = action.error.message as string;
        });
    }
});

export const { updateOutgoingProducer, removeProducerReceipt } = outgoingProducerSlice.actions;

export default outgoingProducerSlice.reducer;