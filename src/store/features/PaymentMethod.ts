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
    paymentMethods: [] as UtilsProps[],
}

export const getPaymentMethods = createAsyncThunk("paymentMethods/getPaymentMethods", async () => {
    
    try {
        const response = await axiosInstance.get(`/utils/payment_methods`, { headers: { 
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

const paymentMethodSlice = createSlice({
    name: "paymentMethods",
    initialState,
    reducers: {
        updatePaymentMethods: (state, action: PayloadAction<UtilsProps[]>) => {
            state.paymentMethods = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPaymentMethods.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getPaymentMethods.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload.status){
                state.paymentMethods = action.payload.data as UtilsProps[];
                state.message = "";
                return;
            }

            if(!action.payload.status){
                state.message = action.payload.message as string;
                return;
            }
            
            state.message = action.payload.message as string || "Something went wrong, try again later.";
        });

        builder.addCase(getPaymentMethods.rejected, (state, action) => {
            state.loading = false;
            state.message = action.error.message as string;
        });
    }
});

export const { updatePaymentMethods } = paymentMethodSlice.actions;

export default paymentMethodSlice.reducer;