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
    productCategories: [] as UtilsProps[]
}

export const getProductCategories = createAsyncThunk("productCategories/getProductCategories", async () => {
    
    try {
        const response = await axiosInstance.get(`/utils/product_categories`, { headers: { 
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

const productCategorySlice = createSlice({
    name: "productCategories",
    initialState,
    reducers: {
        updateProductCategories: (state, action: PayloadAction<UtilsProps[]>) => {
            state.productCategories = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProductCategories.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getProductCategories.fulfilled, (state, action) => {
            state.loading = false;
            if(action.payload.status){
                state.productCategories = action.payload.data as UtilsProps[];
                state.message = "";
                return;
            }

            if(!action.payload.status){
                state.message = action.payload.message as string;
                return;
            }
            
            state.message = action.payload.message as string || "Something went wrong, try again later.";
        });

        builder.addCase(getProductCategories.rejected, (state, action) => {
            state.loading = false;
            state.message = action.error.message as string;
        });
    }
});

export const { updateProductCategories } = productCategorySlice.actions;

export default productCategorySlice.reducer;