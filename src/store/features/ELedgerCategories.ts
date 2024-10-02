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
    eLedgerCategories: [] as UtilsProps[],
    current_page: 1,
    per_page: 10,
    total: 0
}

export const getELedgerCategories = createAsyncThunk("eLedgerCategories/getELedgerCategories", async () => {
    
    try {
        const response = await axiosInstance.get(`/utils/eledger_categories`, { headers: { 
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

const eLedgerCategoriesSlice = createSlice({
    name: "eLedgerCategories",
    initialState,
    reducers: {
        updateELedgerStatuses: (state, action: PayloadAction<UtilsProps[]>) => {
            state.eLedgerCategories = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getELedgerCategories.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getELedgerCategories.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload.status){
                state.eLedgerCategories = action.payload.data as UtilsProps[];
                state.message = "";
                return;
            }

            if(!action.payload.status){
                state.message = action.payload.message as string;
                return;
            }
            
            state.message = action.payload.message as string || "Something went wrong, try again later.";
        });

        builder.addCase(getELedgerCategories.rejected, (state, action) => {
            state.loading = false;
            state.message = action.error.message as string;
        });
    }
});

export const { updateELedgerStatuses } = eLedgerCategoriesSlice.actions;

export default eLedgerCategoriesSlice.reducer;