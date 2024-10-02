/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-escape */

import { Eye, EyeSlash } from "@phosphor-icons/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../api/api";
import { getToken } from "../../../services/auth";
import { useTranslation } from "react-i18next";

interface ChangeMyPasswordProps {
    show: boolean;
    handleClose: () => void;
}

interface FormDataProps {
    current_password: string;
    new_password: string;
    new_password_confirmation: string;
}

const ChangeMyPassword = ({show, handleClose}: ChangeMyPasswordProps) => {
    const {register, handleSubmit, formState: {errors}, reset} = useForm<FormDataProps>();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { t } = useTranslation();
  
    const onSubmit: SubmitHandler<FormDataProps> = async (formData) => {
        if(loading){ return; }
    
        if(formData.new_password !== formData.new_password_confirmation){
            return toast.warning("Password does not match", {autoClose: 4000});
        }

        // console.log("Form data: ", formData);
        // return;
  
        setLoading(true);
        try {
        
        const { data } = await axiosInstance.put(`/user/update_password`, formData, {
            headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
            }
        });

        if(data.status){
            toast.success(data.message, {autoClose: 4000, pauseOnHover: false});
            
            reset();
            handleClose();
            setLoading(false);
            return;
        }
        
        setLoading(false);
        return toast.error(data.message, {autoClose: 4000, pauseOnHover: false});
        
        } catch (error: any) {
        setLoading(false);
        return toast.error(error.response ? error.response.data?.error || error.response?.data?.message : t("description.errors.something_went_wrong_try_again_later"));
        }
    }

      const handleCloseModal = (ev: any) => {
        const target = (ev.target as HTMLDivElement);
        if(target.tagName === "DIV" && target.className.includes("parent")){
            return handleClose();
        }
      }

    return (
        <div onClick={handleCloseModal} className={`parent w-full h-screen bg-[#00000080] flex justify-center items-start lg:items-center p-4 transition-all ${show ? "fixed" : "hidden"} top-0 left-0 z-50 `}>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[400px] bg-white text-[#333333] text-xs p-10">
                <h2 className="text-sm text-center font-bold mb-2">{t("description.dashboard.change_password")}</h2>
                <p className="text-xs text-center mb-6">{t("description.dashboard.enter_your_new_password")}</p>

                <div className="mb-6">
                    <label className="block font-semibold mb-2" htmlFor="current_password">{t("description.dashboard.current_password")}</label>
                    <input type={showPassword ? "text" : "password"} id="current_password" className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                        placeholder="Enter your password"
                        {...register("current_password", {required: true, minLength: 8})}
                        required
                    />
                    <span onClick={() => setShowPassword(!showPassword)} className="inline-block w-[18px] h-[18px] absolute top-8 right-2 bg-white z-10">
                        {showPassword ? <EyeSlash size={18} weight="regular" /> : <Eye size={18} weight="regular" />}
                    </span>
                    {errors.current_password ? <p className="text-secondary mt-1">Current password field is required</p> : null}
                </div>

                <div className="mb-6">
                    <label className="block font-semibold mb-2" htmlFor="new_password">{t("description.dashboard.new_password")}</label>
                    <input type={showPassword ? "text" : "password"} id="new_password" className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                        placeholder="Enter new password"
                        {...register("new_password", {required: true, minLength: 8})}
                        required
                    />
                    {errors.new_password ? <p className="text-secondary mt-1">New password field is required</p> : null}
                </div>

                <div className="mb-6">
                    <label className="block font-semibold mb-2" htmlFor="new_password_confirmation">{t("description.dashboard.confirm_new_password")}</label>
                    <input type={showPassword ? "text" : "password"} id="new_password_confirmation" className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                        placeholder="Confirm new password"
                        {...register("new_password_confirmation", {required: true, minLength: 8})}
                        required
                    />
                    {errors.new_password_confirmation ? <p className="text-secondary mt-1">Confirm new password field is required</p> : null}
                </div>

                <div className="flex justify-center items-center">
                    <button className="w-full md:w-max bg-primary text-white font-semibold rounded-3xl flex justify-center items-center gap-2 py-3 px-12">
                        {loading ? <span className="inline-block w-[18px] min-w-[18px] h-[18px] rounded-full border-2 border-b-transparent border-white animate-spin"></span> : null}
                        <span>{t("description.dashboard.change_my_password")}</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ChangeMyPassword