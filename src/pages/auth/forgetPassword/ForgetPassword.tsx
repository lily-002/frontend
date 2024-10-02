/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-escape */
import { ArrowLeft, Envelope } from "@phosphor-icons/react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../api/api";
import { useTranslation } from "react-i18next";

interface FormDataProps {
  email: string;
}

const ForgetPassword = () => {
  const {register, handleSubmit, formState: {errors}} = useForm<FormDataProps>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const { t } = useTranslation();

  const onSubmit: SubmitHandler<FormDataProps> = async (formData) => {
    if(loading){ return; }
    const { email } = formData;
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!email || !regex.test(email)) {
      return toast.error(t("description.errors.invalid_email_provided"));
    }

    setLoading(true);
    try {
      
      const { data } = await axiosInstance.post("/auth/forgot-password", { email });

      // console.log("Response: ", data);

      if(data.status){
        toast.success(data.message, {autoClose: 4000, pauseOnHover: false});
        setMessage(data.message);
        setClientEmail(email);
        return;
      }
      
      setLoading(false);
      return toast.error(data.message, {autoClose: 4000, pauseOnHover: false});
      
    } catch (error: any) {
      setLoading(false);
      return toast.error(error.response ? error.response.data?.error || error.response?.data?.message : t("description.errors.something_went_wrong_try_again_later"));
    }
  }


  return (
      <div className="w-full h-screen flex justify-center items-center p-4">

        {
          message ? (
            <div className="max-w-[300px]">
              <span className="flex justify-center items-center mb-5 relative">
                <Envelope size={60} weight="regular" className="text-yellow-400" />
              </span>

              <h2 className="font-bold text-center text-lg mb-2">{t("description.auth.check_your_email")}</h2>
              <p className="text-xs text-center mb-6">{t("description.auth.we_have_sent_instructions_on_how_to_reset_your_password_to")} <strong>{clientEmail}</strong></p>

              <div className="flex justify-center items-center gap-2">
                <ArrowLeft size={14} weight="regular" />
                <Link to="/auth/login" className="inline-block font-semibold text-primary text-xs">{t("description.auth.back_to_login")}</Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[350px] min-h-[200px] rounded p-4 text-xs">
              <h2 className="font-semibold text-primary text-center text-lg mb-1">{t("description.auth.forgot_your_password")}</h2>
              <p className="text-xs text-center mb-8">{t("description.auth.your_password_will_be_reset_by_email")}</p>
    
              <div className="mb-6">
                <label className="block font-semibold mb-2" htmlFor="email">{t("description.auth.enter_your_email_address")}</label>
                <input type="email" id="email" className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                  placeholder="E.g johndoe@email.com"
                  {...register("email", {required: true})}
                  required
                />
                {errors.email ? <p className="text-secondary mt-1">{t("description.errors.email_field_is_required")}</p> : null}
              </div>
    
              <div className="mb-4">
                <button className="w-full bg-primary text-white font-semibold rounded-3xl flex justify-center items-center gap-2 p-3">
                  {loading ? <span className="inline-block w-[18px] min-w-[18px] h-[18px] rounded-full border-2 border-b-transparent border-white animate-spin"></span> : null}
                  <span>{t("description.auth.next")}</span>
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

export default ForgetPassword;