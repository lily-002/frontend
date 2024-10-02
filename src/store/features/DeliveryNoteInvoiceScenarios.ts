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
    deliveryNoteInvoiceScenarios: [] as UtilsProps[],
    current_page: 1,
    per_page: 10,
    total: 0
}

export const getDeliveryNoteInvoiceScenarios = createAsyncThunk("deliveryNoteInvoiceScenarios/getDeliveryNoteInvoiceScenarios", async () => {
    
    try {
        const response = await axiosInstance.get(`/utils/delivery_note_invoice_scenarios`, { headers: { 
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

const deliveryNoteInvoiceScenarios = createSlice({
    name: "deliveryNoteInvoiceScenarios",
    initialState,
    reducers: {
        updateDeliveryNoteInvoiceScenarios: (state, action: PayloadAction<UtilsProps[]>) => {
            state.deliveryNoteInvoiceScenarios = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getDeliveryNoteInvoiceScenarios.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getDeliveryNoteInvoiceScenarios.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload.status){
                state.deliveryNoteInvoiceScenarios = action.payload.data as UtilsProps[];
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

        builder.addCase(getDeliveryNoteInvoiceScenarios.rejected, (state, action) => {
            state.loading = false;
            state.message = action.error.message as string;
        });
    }
});

export const { updateDeliveryNoteInvoiceScenarios } = deliveryNoteInvoiceScenarios.actions;

export default deliveryNoteInvoiceScenarios.reducer;