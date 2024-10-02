/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/api";
import { InvoiceSendTypeProps } from "../../types/types";
import { getToken } from "../../services/auth";

const initialState = {
    loading: true,
    message: "",
    invoiceSendTypes: [] as InvoiceSendTypeProps[],
    current_page: 1,
    per_page: 10,
    total: 0
}

export const getInvoiceSendTypes = createAsyncThunk("invoiceSendTypes/getInvoiceSendTypes", async () => {
    
    try {
        const response = await axiosInstance.get(`/utils/invoice_send_types`, { headers: { 
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

const invoiceSendTypeSlice = createSlice({
    name: "invoiceSendTypes",
    initialState,
    reducers: {
        updateInvoiceSendTypes: (state, action: PayloadAction<InvoiceSendTypeProps[]>) => {
            state.invoiceSendTypes = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getInvoiceSendTypes.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getInvoiceSendTypes.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload.status){
                state.invoiceSendTypes = action.payload.data as InvoiceSendTypeProps[];
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

        builder.addCase(getInvoiceSendTypes.rejected, (state, action) => {
            state.loading = false;
            state.message = action.error.message as string;
        });
    }
});

export const { updateInvoiceSendTypes } = invoiceSendTypeSlice.actions;

export default invoiceSendTypeSlice.reducer;