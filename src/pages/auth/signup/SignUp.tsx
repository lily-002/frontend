/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-escape */
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
// import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { axiosInstance } from "../../../api/api";
// import { useAppDispatch } from "../../../store/hooks/hooks";
import { setToken } from "../../../services/auth";
import { useTranslation } from "react-i18next";

// images/icons
import authImageEn from "../../../assets/images/auth_image_en.png";
import authImageTr from "../../../assets/images/auth_image_tr.png";
// import { updateProfile } from "../../../store/features/Profile";


interface FormDataProps {
  name: string;
  email: string;
  username: string;
  phone: boolean;
  password: string;
}


const SignUp = () => {
  const {register, handleSubmit, formState: {errors}} = useForm<FormDataProps>();
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  // const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();

  const onSubmit: SubmitHandler<FormDataProps> = async (formData) => {
    if(loading){ return; }
    const { email } = formData;
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!email || !regex.test(email)) {
      return toast.error(t("description.errors.invalid_email_provided"));
    }

    setLoading(true);

    try {

      const { data } = await axiosInstance.post("/auth/register", formData);

      if(data.status){
        toast.success(data.message, {autoClose: 2000, pauseOnHover: false});
        setToken(data.data.access_token);
        // dispatch(updateProfile(data.data.user));
        return setTimeout(() => {
          setLoading(false);
          // return navigate("/dashboard");
          return window.location.reload();
        }, 2000);
      }
      
      setLoading(false);
      return toast.error(data.message, {autoClose: 4000, pauseOnHover: false});
      
    } catch (error: any) {
      setLoading(false);
      return toast.error(error.response ? error.response.data?.error || error.response?.data?.message : t("description.errors.something_went_wrong_try_again_later"));
    }
  }

  return (
    <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2">
        <div className="w-full h-screen hidden md:block bg-[#99E7F1]">
          <img src={i18n.language === "en" ? authImageEn : authImageTr} alt="login" className="w-full h-full object-contain" />
        </div>

        <div className="w-full h-screen flex justify-center items-start lg:items-center p-4 overflow-y-scroll overflow-x-hidden">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[350px] min-h-[200px] rounded p-4 text-xs">
            <h2 className="font-semibold text-primary text-center md:text-start text-lg mb-1">{t("description.auth.welcome_to_eConiaSoft")}</h2>
            <p className="text-xs text-center md:text-start mb-8">{t("description.auth.register_your_account")}</p>

            <div className="mb-6">
              <label className="block font-semibold mb-1" htmlFor="name">{t("description.auth.full_name")}</label>
              <input type="text" id="name" className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                placeholder="John Doe"
                {...register("name", {required: true})}
                required
              />
              {errors.name ? <p className="text-secondary mt-1">{t("description.errors.full_name_is_required")}</p> : null}
            </div>

            <div className="mb-6">
              <label className="block font-semibold mb-1" htmlFor="email">{t("description.auth.email")}</label>
              <input type="email" id="email" className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                placeholder="johndoe@email.com"
                {...register("email", {required: true})}
                required
              />
              {errors.email ? <p className="text-secondary mt-1">{t("description.errors.email_field_is_required")}</p> : null}
            </div>

            <div className="mb-6">
              <label className="block font-semibold mb-1" htmlFor="username">{t("description.auth.username")}</label>
              <input type="text" id="username" className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                placeholder="John4Real"
                {...register("username", {required: true})}
                required
              />
              {errors.username ? <p className="text-secondary mt-1">{t("description.errors.username_is_required")}</p> : null}
            </div>

            <div className="mb-6">
              <label className="block font-semibold mb-1" htmlFor="phone">{t("description.auth.phone_number")}</label>
              <input type="phone" id="phone" className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                placeholder="14432145634"
                {...register("phone", {required: true})}
                required
              />
              {errors.name ? <p className="text-secondary mt-1">{t("description.errors.phone_number_is_required")}</p> : null}
            </div>

            <div className="mb-4 relative">
              <label className="block font-semibold mb-1" htmlFor="password">{t("description.auth.password")}</label>
              <input type={showPassword ? "text" : "password"} id="password" className="w-full border border-[#D9D9D9] rounded p-2 pr-6 focus:outline-primary focus:border-primary transition-all" 
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
              <button className="w-full bg-primary text-white font-semibold rounded-3xl flex justify-center items-center gap-2 p-3">
                {loading ? <span className="inline-block w-[18px] min-w-[18px] h-[18px] rounded-full border-2 border-b-transparent border-white animate-spin"></span> : null}
                <span>{t("description.auth.sign_up")}</span>
              </button>
            </div>

            <p className="text-center">
              {t("description.auth.already_have_an_account?")} <Link to="/auth/login" className="inline-block font-semibold text-primary">{t("description.auth.login")}</Link>
            </p>

          </form>
        </div>
        
    </div>
  )
}

export default SignUp;