import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LogoutPayloadProps {
    logout: boolean;
    message?: string;
}

const initialState = {
    logout: false,
    message: "Did you want to logout?"
}

const logoutSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        updateLogout: (state, action: PayloadAction<LogoutPayloadProps>) => {
            state.logout = action.payload.logout;
        }
    }
});

export const { updateLogout } = logoutSlice.actions;

export default logoutSlice.reducer;