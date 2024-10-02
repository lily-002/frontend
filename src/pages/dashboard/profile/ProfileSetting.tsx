/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import avatarIcon from "../../../assets/images/avatar.png";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
// import { Eye, EyeSlash } from "@phosphor-icons/react";
import ChangeMyPassword from "./ChangeMyPassword";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks";
import { axiosInstance } from "../../../api/api";
import { getToken } from "../../../services/auth";
import { getProfile } from "../../../store/features/Profile";
import { useTranslation } from "react-i18next";

interface FormDataProps {
    name: string;
    username: string;
    email: string;
    phone: string;
    // password: string;
}

const ProfileSetting = () => {
    const { profile, loading: profileLoader, message } = useAppSelector(state => state.profile);
    const [files, setFiles] = useState<File[]>([]);
    const {register, handleSubmit, formState: {errors}} = useForm<FormDataProps>();
    const [loading, setLoading] = useState(false);
    // const [showPassword, setShowPassword] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

  
    const onSubmit: SubmitHandler<FormDataProps> = async (formData) => {
      if(loading){ return; }
      const { email } = formData;
      const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (!email || !regex.test(email)) {
        return toast.error("Invalid email provided");
      }

      if((profile.name.trim() === formData.name.trim()) && (profile.username === formData.username.trim()) &&
        (profile.email.trim() === formData.email.trim() && (profile.phone.trim() === formData.phone.trim()))){
        return toast.warning("No modification was made to your profile setting");
      }

    //   console.log("Form data: ", formData);
    //   return;
  
      setLoading(true);
      try {
        
        const { data } = await axiosInstance.put(`/user/update_profile`, formData, {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
          }
        });
  
        if(data.status){
          toast.success(data.message, {autoClose: 4000, pauseOnHover: false});
        
          dispatch(getProfile());
          return setTimeout(() => {
            toast.success(data.message, {autoClose: 4000});
            setLoading(false);
          }, 4000);
        }
        
        setLoading(false);
        return toast.error(data.message, {autoClose: 4000, pauseOnHover: false});
        
      } catch (error: any) {
        setLoading(false);
        return toast.error(error.response ? error.response.data?.error || error.response?.data?.message : t("description.errors.something_went_wrong_try_again_later"));
      }
    }

    const handleImageUpload = (ev: any) => {
        const file: File = ev.target.files[0];
        
        if(!file){ return toast.info("No image file selected."); }
        if(!file.type.startsWith("image/")){ return toast.error("Only image is required"); }
        if(file){
            setFiles([file, ...files]);
            return;
        }
    }

    const handleError = (ev: any) => {
        const img = (ev.target as HTMLImageElement);
        img.src = avatarIcon;
    }

    return (
        <>
            {/* Change password modal */}
            <ChangeMyPassword
                show={showChangePassword}
                handleClose={() => setShowChangePassword(false)}
            />
        
            {profileLoader ? <span className="inline-block w-[25px] h-[25px] rounded-full border-2 border-primary border-b-transparent animate-spin mt-6 mx-auto"></span> : null}
            {!profileLoader && message ? (<p className="text-[#F16021] bg-[#f15f213c] text-center mx-auto mt-12 p-2 rounded">{message}</p>) : null}
            {!profileLoader && !message ? (
                <div className="border shadow-md p-8">
                    <h2 className="font-bold text-sm mb-6">{t("description.dashboard.profile_setting")}</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="text-xs">
                        <div className="flex justify-between items-start flex-col-reverse md:flex-row gap-4 mb-5">
                            <div className="w-full md:max-w-[400px]">
                                <div className="mb-5">
                                    <label htmlFor="name" className="block font-semibold mb-2">{t("description.auth.full_name")}</label>
                                    <input type="text" id="name"
                                        className="block w-full border-2 rounded-md outline-none focus:border-primary p-2 transition-all"
                                        placeholder="John Doe"
                                        defaultValue={profile.name}
                                        {...register("name", {required: true})}
                                        required
                                    />
                                    {errors.name ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                                </div>

                                <div className="mb-5">
                                    <label htmlFor="username" className="block font-semibold mb-2">{t("description.auth.username")}</label>
                                    <input type="text" id="username"
                                        className="block w-full border-2 rounded-md outline-none focus:border-primary p-2 transition-all"
                                        placeholder="JD"
                                        defaultValue={profile.username}
                                        {...register("username", {required: true})}
                                        required
                                    />
                                    {errors.username ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                                </div>

                                <div className="mb-6">
                                    <label className="block font-semibold mb-1" htmlFor="email">{t("description.auth.email")}</label>
                                    <input type="email" id="email" className="w-full border-2 rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                        placeholder="johndoe@email.com"
                                        defaultValue={profile.email}
                                        {...register("email", {required: true})}
                                        required
                                    />
                                    {errors.email ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                                </div>

                                <div className="mb-5">
                                    <label htmlFor="phone" className="block font-semibold mb-2">{t("description.auth.phone_number")}</label>
                                    <input type="phone" id="phone"
                                        className="block w-full border-2 rounded-md outline-none focus:border-primary p-2 transition-all"
                                        placeholder="+234123456789"
                                        defaultValue={profile.phone}
                                        {...register("phone", {required: true})}
                                        required
                                    />
                                    {errors.phone ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                                </div>

                                {/* <div className="mb-4">
                                    <label className="block font-semibold mb-1" htmlFor="password">Password</label>
                                    <input type={showPassword ? "text" : "password"} id="password" className="w-full border-2 rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                        placeholder="Enter your password"
                                        {...register("password", {required: true, minLength: 8})}
                                        required
                                    />
                                    <span onClick={() => setShowPassword(!showPassword)} className="inline-block w-[18px] h-[18px] absolute top-7 right-2 bg-white z-10">
                                        {showPassword ? <EyeSlash size={18} weight="regular" /> : <Eye size={18} weight="regular" />}
                                    </span>
                                    {errors.password ? <p className="text-secondary mt-1">Password field is required</p> : null}
                                </div> */}
                            </div>

                            <div className="w-full text-center">
                                <div className="inline-block w-[100px] h-[100px] rounded-full overflow-hidden border bg-gray-300 cursor-pointer">
                                    <img onError={handleError} src={files.length ? URL.createObjectURL(files[0]) : avatarIcon} alt="Avatar" className="w-full h-full object-cover" />

                                    <input type="file"
                                        className="w-full h-full bg-red-500 absolute top-0 left-0 z-10 cursor-pointer opacity-0"
                                        onChange={handleImageUpload}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center items-center gap-6 flex-wrap flex-col-reverse md:flex-row">
                            <span 
                                onClick={() => setShowChangePassword(true)}
                                className="w-full md:w-max font-semibold border border-primary text-primary text-center rounded-full py-3 px-12 cursor-pointer"
                            >
                                {t("description.dashboard.change_password")}
                            </span>

                            <button className="w-full md:w-max bg-primary text-white font-semibold rounded-3xl flex justify-center items-center gap-2 py-3 px-12">
                                {loading ? <span className="inline-block w-[18px] min-w-[18px] h-[18px] rounded-full border-2 border-b-transparent border-white animate-spin"></span> : null}
                                <span>{t("description.dashboard.save_changes")}</span>
                            </button>
                        </div>
                    </form>
                </div>
            ) : null}

        </>
    )
}

export default ProfileSetting;