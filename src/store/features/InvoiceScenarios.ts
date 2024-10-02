/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/api";
import { InvoiceScenarioProps } from "../../types/types";
import { getToken } from "../../services/auth";

const initialState = {
    loading: true,
    message: "",
    invoiceScenarios: [] as InvoiceScenarioProps[],
    current_page: 1,
    per_page: 10,
    total: 0
}

export const getInvoiceScenarios = createAsyncThunk("invoiceScenarios/getInvoiceScenarios", async () => {
    
    try {
        const response = await axiosInstance.get(`/utils/invoice_scenarios`, { headers: { 
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

const invoiceScenarioSlice = createSlice({
    name: "invoiceScenarios",
    initialState,
    reducers: {
        updateInvoiceScenarios: (state, action: PayloadAction<InvoiceScenarioProps[]>) => {
            state.invoiceScenarios = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getInvoiceScenarios.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getInvoiceScenarios.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload.status){
                state.invoiceScenarios = action.payload.data as InvoiceScenarioProps[];
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

        builder.addCase(getInvoiceScenarios.rejected, (state, action) => {
            state.loading = false;
            state.message = action.error.message as string;
        });
    }
});

export const { updateInvoiceScenarios } = invoiceScenarioSlice.actions;

export default invoiceScenarioSlice.reducer;