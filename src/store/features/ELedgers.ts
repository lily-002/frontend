/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/api";
import { ELedgerProps } from "../../types/types";
import { getToken } from "../../services/auth";

const initialState = {
    loading: true,
    message: "",
    eLedgers: [] as ELedgerProps[],
    current_page: 1,
    per_page: 10,
    total: 0
}

export const getELedgers = createAsyncThunk("eLedgers/getELedgers", async () => {
    
    try {
        const response = await axiosInstance.get(`/user/eledger`, { headers: { 
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

const eLedgerSlice = createSlice({
    name: "eLedgers",
    initialState,
    reducers: {
        updateELedgers: (state, action: PayloadAction<ELedgerProps[]>) => {
            state.eLedgers = action.payload;
        },
        removeEledger: (state, action: PayloadAction<any>) => {
            state.eLedgers = state.eLedgers.filter((ledger: any) => ledger.id !== action.payload.id);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getELedgers.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getELedgers.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload.status){
                state.eLedgers = action.payload.data.data as ELedgerProps[];
                state.message = "";
                return;
            }

            if(!action.payload.status){
                state.message = action.payload.message as string;
                return;
            }
            
            state.message = action.payload.message as string || "Something went wrong, try again later.";
        });

        builder.addCase(getELedgers.rejected, (state, action) => {
            state.loading = false;
            state.message = action.error.message as string;
        });
    }
});

export const { updateELedgers, removeEledger } = eLedgerSlice.actions;

export default eLedgerSlice.reducer;