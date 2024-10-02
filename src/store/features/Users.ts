/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/api";
import { getToken } from "../../services/auth";
import { UserProps } from "../../types/types";

const initialState = {
    loading: true,
    message: "",
    users: [] as UserProps[],
    current_page: 1,
    per_page: 10,
    total: 0
}

export const getUsers = createAsyncThunk("users/getUsers", async () => {
    
    try {
        const response = await axiosInstance.get(`/admin/users`, { headers: { 
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

export const getUser = createAsyncThunk("users/getUser", async (id: number | string) => {
    
    try {
        const response = await axiosInstance.get(`/admin/users/${id}`, { headers: { 
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

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        updateUsers: (state, action: PayloadAction<UserProps[]>) => {
            state.users = action.payload;
        },
        updateUser: (state, action: PayloadAction<UserProps>) => {
            state.users = state.users.map(user => {
                if(user.id === action.payload.id){
                    return action.payload;
                }
                return user;
            });
        },
        addUser: (state, action: PayloadAction<UserProps>) => {
            state.users = [action.payload, ...state.users];
        },
        removeUser: (state, action: PayloadAction<{id: number | string}>) => {
            state.users = state.users.filter(user => user.id !== action.payload.id);
        }
    },
    extraReducers: (builder) => {
        
        builder.addCase(getUsers.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.loading = false;

            // console.log("Action Payload: ", action.payload);
            if(action.payload.status){
                state.users = action.payload.data as UserProps[];
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

        builder.addCase(getUsers.rejected, (state, action) => {
            state.loading = false;
            state.message = action.error.message as string;
        });


        // Get a user
        // ##############################################
        // ##############################################
        builder.addCase(getUser.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(getUser.fulfilled, (state, action) => {
            state.loading = false;

            if(action.payload.status){
                state.users = state.users.map(user => {
                    if(user.id === action.payload.data.id){
                        return action.payload.data;
                    }
                    return user;
                });
                state.message = "";
                return;
            }

            if(!action.payload.status){
                state.message = action.payload.message as string;
                return;
            }
            
            state.message = action.payload.message as string || "Something went wrong, try again later.";
        });

        builder.addCase(getUser.rejected, (state, action) => {
            state.loading = false;
            state.message = action.error.message as string;
        });

    }
});

export const { updateUsers, updateUser, addUser, removeUser } = usersSlice.actions;

export default usersSlice.reducer;