/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/api";
import { InvoiceTypeProps } from "../../types/types";
import { getToken } from "../../services/auth";

const initialState = {
    loading: true,
    message: "",
    invoiceTypes: [] as InvoiceTypeProps[],
    current_page: 1,
    per_page: 10,
    total: 0
}

export const getInvoiceTypes = createAsyncThunk("invoiceTypes/getInvoiceTypes", async () => {
    
    try {
        const response = await axiosInstance.get(`/utils/invoice_types`, { headers: { 
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

const invoiceTypeSlice = createSlice({
    name: "invoiceTypes",
    initialState,
    reducers: {
        updateInvoiceType: (state, action: PayloadAction<InvoiceTypeProps[]>) => {
            state.invoiceTypes = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getInvoiceTypes.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getInvoiceTypes.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload.status){
                state.invoiceTypes = action.payload.data as InvoiceTypeProps[];
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

        builder.addCase(getInvoiceTypes.rejected, (state, action) => {
            state.loading = false;
            state.message = action.error.message as string;
        });
    }
});

export const { updateInvoiceType } = invoiceTypeSlice.actions;

export default invoiceTypeSlice.reducer;