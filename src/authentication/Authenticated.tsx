/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useEffect, useState } from "react";
import { ChildrenProps } from "../types/types";
import { useNavigate } from "react-router";
import Loader from "../components/Loader/Loader";
import { getToken, removeToken } from "../services/auth";
import { isExpired, decodeToken } from "react-jwt";

const Authenticated = ({ children }: ChildrenProps) => {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {

        const token = getToken();
        try {

            if(token){ 
                const decoded: any = decodeToken(token);
                const expired: boolean = isExpired(token);
                if(!decoded || expired){
                    removeToken();
                    navigate("/auth/login");
                    return window.location.reload();
                }

                if(decoded.roles?.length && (decoded.roles.includes("admin") || decoded.roles.includes("user"))){
                    return setIsAuth(true);
                }

                if(decoded.roles?.length && decoded.roles.includes("super_admin")){
                    return navigate("/super-admin");
                }
            }

            return navigate("/auth/login");
            
        } catch (error: any) {
            return navigate("/auth/login");
        }

    }, [navigate]);

    if(!isAuth){ return <Loader message="Processing..." /> }

    return children;
}

export default Authenticated;