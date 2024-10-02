/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-escape */
import { useState } from "react";
import { CaretDown, Eye, EyeSlash } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

// image/icon
import authImageEn from "../../../assets/images/auth_image_en.png";
import authImageTr from "../../../assets/images/auth_image_tr.png";
import { axiosInstance } from "../../../api/api";
import { setToken } from "../../../services/auth";

interface FormDataProps {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login = () => {
  const {register, handleSubmit, formState: {errors}} = useForm<FormDataProps>();
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);
  const { t, i18n } = useTranslation();

  const handleChangeLanguage = (lang: string) => {
      i18n.changeLanguage(lang);
  }

  const onSubmit: SubmitHandler<FormDataProps> = async (formData) => {
    if(loading){ return; }
    const { email, password } = formData;
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!email || !regex.test(email)) {
      return toast.error(t("description.errors.invalid_email_provided"));
    }

    setLoading(true);

    try {
      
      const { data } = await axiosInstance.post("/auth/login", {email, password});

      if(data.status){
        toast.success(data.message, {autoClose: 2000, pauseOnHover: false});
        setToken(data.data.access_token);
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
      return toast.error(error.response ? error.response.data?.error || error.response?.data?.message : "Something went wrong, try again later.");
    }
  }

  return (
    <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2">
        <div className="w-full h-screen hidden md:block bg-[#99E7F1]">
          <img src={i18n.language === "en" ? authImageEn : authImageTr} alt="login" className="w-full h-full object-contain" />
        </div>

        <div className="w-full h-screen flex justify-center items-center p-4">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[350px] min-h-[200px] rounded p-4 text-xs">
            <h2 className="font-semibold text-primary text-center md:text-start text-lg mb-1">{t("description.auth.welcome_back")}</h2>
            <p className="text-xs text-center md:text-start mb-8">{t("description.auth.login_into_your_account")}</p>

            <div className="mb-6">
              <label className="block font-semibold mb-1" htmlFor="language">{t("description.auth.language")}</label>
              <div tabIndex={0} onBlur={() => setTimeout(() => setShowLanguage(false), 200)} onClick={() => setShowLanguage(!showLanguage)} className="border border-[#D9D9D9] rounded p-2 flex justify-between items-center gap-2">
                  <span className="text-xs cursor-pointer">{i18n.language === "en" ? "English" : "Türkçe"}</span>

                  <CaretDown weight="regular" color="#333333" size={20} />

                  {
                      showLanguage ? (
                          <ul className="w-full bg-white text-xs rounded border absolute top-10 left-0 z-10 cursor-pointer overflow-hidden">
                              <li onClick={() => handleChangeLanguage("en")} className={`cursor-pointer ${i18n.language === "en" ? "bg-primary text-white" : "hover:bg-sky-100 hover"} p-2 mb-1`}>English</li>
                              <li onClick={() => handleChangeLanguage("tr")} className={`cursor-pointer ${i18n.language === "tr" ? "bg-primary text-white" : "hover:bg-sky-100 hover"} p-2`}>Türkçe</li>
                          </ul>
                      ) : null
                  }
              </div>
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

            <div className="mb-4">
              <label className="block font-semibold mb-1" htmlFor="password">{t("description.auth.password")}</label>
              <input type={showPassword ? "text" : "password"} id="password" className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                placeholder="xxxxxxxxx"
              {...register("password", {required: true, minLength: 8})}
              required
              />
              <span onClick={() => setShowPassword(!showPassword)} className="inline-block w-[18px] h-[18px] absolute top-7 right-2 bg-white z-10">
                {showPassword ? <EyeSlash size={18} weight="regular" /> : <Eye size={18} weight="regular" />}
              </span>
              {errors.password ? <p className="text-secondary mt-1">{t("description.errors.password_field_is_required_and_should_be_at_least_8_characters")}</p> : null}
            </div>

            <div className="flex justify-between items-center gap-4 flex-wrap mb-6">
              <div className="flex justify-start items-center gap-1">
                <input type="checkbox"
                  id="rememberMe"
                  className="w-[14px] h-[14px] rounded-full accent-primary"
                  {...register("rememberMe")}
                />
                <label className="block" htmlFor="rememberMe">{t("description.auth.remember_me")}</label>
              </div>
              <Link to="/auth/forgot-password" className="inline-block text-[#FF0000]">{t("description.auth.forgot_password?")}</Link>
            </div>

            <div className="mb-4">
              <button className="w-full bg-primary text-white font-semibold rounded-3xl flex justify-center items-center gap-2 p-3">
                {loading ? <span className="inline-block w-[18px] min-w-[18px] h-[18px] rounded-full border-2 border-b-transparent border-white animate-spin"></span> : null}
                <span>{t("description.auth.login")}</span>
              </button>
            </div>

            <p className="text-center">
              {t("description.auth.dont_have_an_account?")} <Link to="/auth/sign-up" className="inline-block font-semibold text-primary">{t("description.auth.sign_up")}</Link>
            </p>

          </form>
        </div>
        
    </div>
  )
}

export default Login;