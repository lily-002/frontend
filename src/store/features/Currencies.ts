/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/api";
import { CurrencyProps } from "../../types/types";
import { getToken } from "../../services/auth";

const initialState = {
    loading: true,
    message: "",
    currencies: [] as CurrencyProps[],
    current_page: 1,
    per_page: 10,
    total: 0
}

export const getCurrencies = createAsyncThunk("currencies/getCurrencies", async () => {
    
    try {
        const response = await axiosInstance.get(`/utils/currencies`, { headers: { 
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

const currencySlice = createSlice({
    name: "currencies",
    initialState,
    reducers: {
        updateCurrencies: (state, action: PayloadAction<CurrencyProps[]>) => {
            state.currencies = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCurrencies.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getCurrencies.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload.status){
                state.currencies = action.payload.data as CurrencyProps[];
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

        builder.addCase(getCurrencies.rejected, (state, action) => {
            state.loading = false;
            state.message = action.error.message as string;
        });
    }
});

export const { updateCurrencies } = currencySlice.actions;

export default currencySlice.reducer;