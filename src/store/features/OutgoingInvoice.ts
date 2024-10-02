/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/api";
import { OutgoingInvoiceProps } from "../../types/types";
import { getToken } from "../../services/auth";

const initialState = {
    loading: true,
    message: "",
    outgoingInvoices: [] as OutgoingInvoiceProps[]
}

export const getOutgoingInvoices = createAsyncThunk("outgoingInvoices/getOutgoingInvoices", async () => {
    
    try {
        const response = await axiosInstance.get(`/user/invoice`, { headers: { 
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

const outgoingInvoiceSlice = createSlice({
    name: "outgoingInvoices",
    initialState,
    reducers: {
        updateOutgoingInvoices: (state, action: PayloadAction<OutgoingInvoiceProps[]>) => {
            state.outgoingInvoices = action.payload;
        },
        removeInvoice: (state, action: PayloadAction<{id: number | string}>) => {
            state.outgoingInvoices = state.outgoingInvoices.filter(invoice => invoice.id.toString() !== action.payload.id.toString());
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getOutgoingInvoices.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getOutgoingInvoices.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload.status){
                state.outgoingInvoices = action.payload.data.data as OutgoingInvoiceProps[];
                state.message = "";
                return;
            }

            if(!action.payload.status){
                state.message = action.payload.message as string;
                return;
            }
            
            state.message = action.payload.message as string || "Something went wrong, try again later.";
        });

        builder.addCase(getOutgoingInvoices.rejected, (state, action) => {
            state.loading = false;
            state.message = action.error.message as string;
        });
    }
});

export const { updateOutgoingInvoices, removeInvoice } = outgoingInvoiceSlice.actions;

export default outgoingInvoiceSlice.reducer;