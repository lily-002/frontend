/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { ChildrenProps } from "../types/types";
import { useNavigate } from "react-router";
import Loader from "../components/Loader/Loader";
import { getToken, removeToken } from "../services/auth";
import { toast } from "react-toastify";
import { isExpired, decodeToken } from "react-jwt";

const AlreadyLoggedIn = ({ children }: ChildrenProps) => {
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {

        const token = getToken();
        if(!token){ return setLoading(false); }

        try {

            const decoded: any = decodeToken(token);
            const expired: boolean = isExpired(token);

            if(!decoded || expired){
                removeToken();
                return setLoading(false);
            }
            
            if(decoded.roles?.length && (decoded.roles.includes("admin") || decoded.roles.includes("user"))){
                return navigate("/dashboard");
            }
            
            if(decoded.roles?.length && decoded.roles.includes("super_admin")){
                return navigate("/super-admin");
            }
            
            toast.error("Something went wrong.", {autoClose: 0 });
            
        } catch (error: any) {
            return setLoading(false);
        }

    }, [navigate]);

    if(loading){ return <Loader message="Processing..." /> }

    return children;
}

export default AlreadyLoggedIn;