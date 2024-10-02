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
    eLedgerTaxInfos: [] as UtilsProps[],
    current_page: 1,
    per_page: 10,
    total: 0
}

export const getELedgerTaxInfos = createAsyncThunk("eLedgerTaxInfos/getELedgerTaxInfos", async () => {
    
    try {
        const response = await axiosInstance.get(`/utils/eledger_tax_infos`, { headers: { 
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

const eLedgerTaxInfosSlice = createSlice({
    name: "eLedgerTaxInfos",
    initialState,
    reducers: {
        updateELedgerTaxInfos: (state, action: PayloadAction<UtilsProps[]>) => {
            state.eLedgerTaxInfos = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getELedgerTaxInfos.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getELedgerTaxInfos.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload.status){
                state.eLedgerTaxInfos = action.payload.data as UtilsProps[];
                state.message = "";
                return;
            }

            if(!action.payload.status){
                state.message = action.payload.message as string;
                return;
            }
            
            state.message = action.payload.message as string || "Something went wrong, try again later.";
        });

        builder.addCase(getELedgerTaxInfos.rejected, (state, action) => {
            state.loading = false;
            state.message = action.error.message as string;
        });
    }
});

export const { updateELedgerTaxInfos } = eLedgerTaxInfosSlice.actions;

export default eLedgerTaxInfosSlice.reducer;