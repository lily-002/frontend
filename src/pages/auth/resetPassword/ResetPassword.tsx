/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
import { ArrowLeft, Eye, EyeSlash } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../api/api";
import { useTranslation } from "react-i18next";

interface FormDataProps {
  password: string;
  password_confirmation: string;
}


const ResetPassword = () => {
  const {register, handleSubmit, formState: {errors}} = useForm<FormDataProps>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [globalLoader, setGlobalLoader] = useState(true);
  const { t } = useTranslation();


  useEffect(() => {

    if(searchParams.get("token")){ return setGlobalLoader(false)}
    return navigate("/auth/login");

  }, []);


  const onSubmit: SubmitHandler<FormDataProps> = async (formData) => {
    if(loading){ return; }

    
    const { password, password_confirmation } = formData;
    if(password !== password_confirmation){
      return toast.warning(t("description.errors.password_mismatch"), {autoClose: 4000, pauseOnHover: false});
    }

    const token = searchParams.get("token");
    const email = searchParams.get("email");
    
    setLoading(true);
    try {
      
      const { data } = await axiosInstance.post("/auth/reset-password", {...formData, email, token});
      if(data.status){
        setMessage(data.message);
        // return setTimeout(() => {
        //   setLoading(false);
        //   return navigate("/auth/login");
        // }, 4000);
      }
      
      setLoading(false);
      return toast.error(data.message, {autoClose: 4000, pauseOnHover: false});
      
    } catch (error: any) {
      setLoading(false);
      return toast.error(error.response ? error.response.data?.error || error.response?.data?.message : t("description.errors.something_went_wrong_try_again_later"));
    }
  }

  if(globalLoader){ return <Loader message="Processing..." /> }

  return (
      <div className="w-full h-screen flex justify-center items-center p-4">

        {
          message ? (
            <div className="max-w-[300px]">
              <h2 className="font-bold text-center text-lg mb-2">{t("description.auth.all_done")}</h2>
              <p className="text-xs text-center mb-6">{message}</p>

              <div className="flex justify-center items-center gap-2">
                <ArrowLeft size={14} weight="regular" />
                <Link to="/auth/login" className="inline-block font-semibold text-primary text-xs">{t("description.auth.back_to_login")}</Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[350px] min-h-[200px] rounded p-4 text-xs">
              <h2 className="font-semibold text-primary text-center text-lg mb-1">{t("description.auth.enter_your_new_password")}</h2>
              <p className="text-xs text-center mb-8">{t("description.auth.your_new_password_must_be_different_to_previous_passwords")}</p>
    
              <div className="mb-4">
                <label className="block font-semibold mb-1" htmlFor="password">{t("description.auth.new_password")}</label>
                <input type={showPassword ? "text" : "password"} id="password" className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                  placeholder="xxxxxxxx"
                {...register("password", {required: true, minLength: 8})}
                required
                />
                <span onClick={() => setShowPassword(!showPassword)} className="inline-block w-[18px] h-[18px] absolute top-7 right-2 bg-white z-10">
                  {showPassword ? <EyeSlash size={18} weight="regular" /> : <Eye size={18} weight="regular" />}
                </span>
                {errors.password ? <p className="text-secondary mt-1">{t("description.errors.password_field_is_required_and_should_be_at_least_8_characters")}</p> : null}
              </div>
    
              <div className="mb-4">
                <label className="block font-semibold mb-1" htmlFor="password_confirmation">{t("description.auth.confirm_password")}</label>
                <input type={showPassword ? "text" : "password"} id="password_confirmation" className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                  placeholder="xxxxxxxx"
                {...register("password_confirmation", {required: true, minLength: 8})}
                required
                />
                {errors.password_confirmation ? <p className="text-secondary mt-1">{t("description.errors.confirm_password_field_is_required_and_should_at_least_be_8_characters")}</p> : null}
              </div>
    
              <div className="mb-4">
                <button className="w-full bg-primary text-white font-semibold rounded-3xl flex justify-center items-center gap-2 p-3">
                  {loading ? <span className="inline-block w-[18px] min-w-[18px] h-[18px] rounded-full border-2 border-b-transparent border-white animate-spin"></span> : null}
                  <span>{t("description.auth.reset_password")}</span>
                </button>
              </div>
    
              <div className="flex justify-center items-center gap-2">
                <ArrowLeft size={14} weight="regular" />
                <Link to="/auth/login" className="inline-block font-semibold text-primary">{t("description.auth.back_to_login")}</Link>
              </div>
    
            </form>
          )
        }
    </div>
  )
}

export default ResetPassword;