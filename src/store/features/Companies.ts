/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/api";
import { CompanyProps } from "../../types/types";
import { getToken } from "../../services/auth";

const initialState = {
    loading: true,
    message: "",
    companies: [] as CompanyProps[],
    current_page: 1,
    per_page: 10,
    total: 0
}

export const getCompanies = createAsyncThunk("companies/getCompanies", async () => {
    
    try {
        const response = await axiosInstance.get(`/admin/companies`, { headers: { 
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

const profileSlice = createSlice({
    name: "companies",
    initialState,
    reducers: {
        updateCompanies: (state, action: PayloadAction<CompanyProps[]>) => {
            state.companies = action.payload;
        },
        updateCompany: (state, action: PayloadAction<CompanyProps>) => {
            state.companies = state.companies.map(company => {
                if(company.id === action.payload.id){
                    return action.payload;
                }
                return company;
            })
        },
        removeCompany: (state, action: PayloadAction<{id: number | string}>) => {
            state.companies = state.companies.filter(company => company.id !== action.payload.id);
        }
    },
    extraReducers: (builder) => {
        
        builder.addCase(getCompanies.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(getCompanies.fulfilled, (state, action) => {
            state.loading = false;

            if(action.payload.status){
                state.companies = action.payload.data.data as CompanyProps[];
                state.total = action.payload.data.total;
                state.per_page = action.payload.data.per_page;
                state.current_page = action.payload.data.current_page;
                state.message = "";
                return;
            }

            if(!action.payload.status){
                state.message = action.payload.message as string;
                return;
            }
            
            state.message = action.payload.message as string || "Something went wrong, try again later.";
        });

        builder.addCase(getCompanies.rejected, (state, action) => {
            state.loading = false;
            state.message = action.error.message as string;
        });
    }
});

export const { updateCompanies, updateCompany, removeCompany } = profileSlice.actions;

export default profileSlice.reducer;