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
    eLedgerTransactionTypes: [] as UtilsProps[],
    current_page: 1,
    per_page: 10,
    total: 0
}

export const getELedgerTransactionTypes = createAsyncThunk("eLedgerTransactionTypes/getELedgerTransactionTypes", async () => {
    
    try {
        const response = await axiosInstance.get(`/utils/eledger_transaction_types`, { headers: { 
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

const eLedgerTransactionTypes = createSlice({
    name: "eLedgerTransactionTypes",
    initialState,
    reducers: {
        updateELedgerTransactionTypes: (state, action: PayloadAction<UtilsProps[]>) => {
            state.eLedgerTransactionTypes = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getELedgerTransactionTypes.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getELedgerTransactionTypes.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload.status){
                state.eLedgerTransactionTypes = action.payload.data as UtilsProps[];
                state.message = "";
                return;
            }

            if(!action.payload.status){
                state.message = action.payload.message as string;
                return;
            }
            
            state.message = action.payload.message as string || "Something went wrong, try again later.";
        });

        builder.addCase(getELedgerTransactionTypes.rejected, (state, action) => {
            state.loading = false;
            state.message = action.error.message as string;
        });
    }
});

export const { updateELedgerTransactionTypes } = eLedgerTransactionTypes.actions;

export default eLedgerTransactionTypes.reducer;