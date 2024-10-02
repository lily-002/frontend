/* eslint-disable @typescript-eslint/no-explicit-any */
import { getToken, removeToken } from "../services/auth";
import { isExpired, decodeToken } from "react-jwt";

const useAuth = () => {

    const token = getToken();

    try {
        if(!token){ return false; }
        const decoded: any = decodeToken(token);
        const expired: boolean = isExpired(token);
        if(!decoded || expired){
            removeToken();
            return false;
        }

        return true;
    } catch (error) {
        return false;
    }
}

export default useAuth;