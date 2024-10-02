/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import SelectOptions from "../../components/SelectOptions";
import { CompanyProps } from "../../../../types/types";
import { axiosInstance } from "../../../../api/api";
import { getToken } from "../../../../services/auth";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../../store/hooks/hooks";
import { getCompanies } from "../../../../store/features/Companies";
import { useTranslation } from "react-i18next";
import countries from "../../../../data/countries.json";


const CreateCompany = () => {
    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<CompanyProps>();
    // const [countryInfo, setCountryInfo] = useState({country: "", city: ""});
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const formValues = watch();
    const { t } = useTranslation();


    const getStateCountryState = (country: string) => {

        if(country){
            const filteredCountry = countries.find(cnt => cnt.name === country);
            return filteredCountry ? filteredCountry.states.map(state => state.name) : []
        }
    
        return [];
    }

    const onSubmit: SubmitHandler<CompanyProps> = async (formData) => {
        
        if(loading){ return; }

        const { email } = formData;
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!email || !regex.test(email)) {
          return toast.error(t("description.errors.invalid_email_provided"));
        }


        // console.log(formData);
        // return;

        setLoading(true);
        try {
          
          const { data } = await axiosInstance.post("/admin/companies", formData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`
            }
          });
    
          if(data.status){
            toast.success(data.message, {autoClose: 4000, pauseOnHover: false});
            return setTimeout(() => {
              setLoading(false);
              dispatch(getCompanies());
              return navigate("/dashboard/meaning/my-companies");
            }, 4000);
          }
          
          setLoading(false);
          return toast.error(data.message, {autoClose: 4000, pauseOnHover: false});
          
        } catch (error: any) {
          setLoading(false);
          return toast.error(error.response ? error.response.data?.error || error.response?.data?.message : t("description.errors.something_went_wrong_try_again_later"));
        }
    }

  return (
    <>
        <div className="flex justify-between items-center gap-4 flex-wrap mb-4">
            <h1 className="text-sm font-bold uppercase">{t("description.dashboard.create_company")}</h1>

            <Link to="/dashboard/meaning/my-companies" className="border border-primary text-xs rounded hover:bg-primary hover:text-white transition-all py-1 px-4">
                {t("description.dashboard.back")}
            </Link>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 text-xs mb-4">
                <div>
                    <label className="block font-semibold mb-1" htmlFor="companyName">{t("description.dashboard.company_name")}</label>
                    <input type="text" id="companyName" 
                        className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                        placeholder="Enter your company name"
                        {...register("company_name", {required: true})}
                        required
                    />
                    {errors.company_name ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                </div>

                <div>
                    <label className="block font-semibold mb-1" htmlFor="taxNumber">{t("description.dashboard.tax_number")}</label>
                    <input type="number" id="taxNumber" 
                        className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                        placeholder="Enter your tax number"
                        {...register("tax_number", {required: true})}
                        required
                    />
                    {errors.tax_number ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 text-xs mb-4">
                <div>
                    <label className="block font-semibold mb-1" htmlFor="tax_office">{t("description.dashboard.tax_office")}</label>
                    <input type="number" id="tax_office" 
                        className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                        placeholder="Enter company tax office number"
                        {...register("tax_office", {required: true})}
                        required
                    />
                    {errors.tax_office ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                </div>

                <div>
                    <label className="block font-semibold mb-1" htmlFor="mersisNumber">{t("description.dashboard.mersis_number")}</label>
                    <input type="number" id="mersisNumber" 
                        className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                        placeholder="Enter mersis number"
                        {...register("mersis_number", {required: true})}
                        required
                    />
                    {errors.mersis_number ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 text-xs mb-4">
                <div>
                    <label className="block font-semibold mb-1" htmlFor="businessRegNumber">{t("description.dashboard.business_registration_number")}</label>
                    <input type="number" id="businessRegNumber" 
                        className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                        placeholder="Enter business registration number"
                        {...register("business_registry_number", {required: true})}
                        required
                    />
                    {errors.business_registry_number ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                </div>

                <div>
                    <label className="block font-semibold mb-1" htmlFor="operatingCenter">{t("description.dashboard.operating_center")}</label>
                    <input type="text" id="operatingCenter" 
                        className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                        placeholder="Enter operating center"
                        {...register("operating_center", {required: true})}
                        required
                    />
                    {errors.operating_center ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 text-xs mb-4">
                <div>
                    <label className="block font-semibold mb-1" htmlFor="country">{t("description.dashboard.country")}</label>
                    <input type="text" readOnly className="-z-10 absolute top-0 left-0" {...register("country", {required: true})} />
                    <SelectOptions
                        title="Select country"
                        selectedOption={formValues.country || ""}
                        setSelectedOption={(userSelection) => setValue("country", userSelection)}
                        options={countries.map(country => country.name)}
                        className="border border-[#D9D9D9] rounded outline-primary transition-all p-2"
                        top="top-8"
                    />
                    {!formValues.country && errors.country ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                </div>

                <div>
                    <label className="block font-semibold mb-1" htmlFor="city">{t("description.dashboard.city")}</label>
                    <input type="text" readOnly className="-z-10 absolute top-0 left-0" {...register("city", {required: true})} />
                    <SelectOptions
                        title={!formValues.country ? "Select country first" : "Select city"}
                        selectedOption={formValues.city || ""}
                        setSelectedOption={(userSelection) => setValue("city", userSelection)}
                        options={getStateCountryState(formValues.country || "")}
                        className="border border-[#D9D9D9] rounded outline-primary transition-all p-2"
                        top="top-8"
                    />
                    {!formValues.city && errors.city ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                </div>
            </div>

            <div className="text-xs mb-4">
                <label className="block font-semibold mb-1" htmlFor="address">{t("description.dashboard.address")}</label>
                <textarea 
                    className="w-full h-[100px] border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all resize-none"
                    placeholder="Enter your address"
                    {...register("address", {required: true})}
                    required
                ></textarea>
                {errors.address ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 text-xs mb-4">
                <div>
                    <label className="block font-semibold mb-1" htmlFor="email">{t("description.auth.email")}</label>
                    <input type="email" id="email" 
                        className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                        placeholder="Enter your email address"
                        {...register("email", {required: true})}
                        required
                    />
                    {errors.email ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                </div>

                <div>
                    <label className="block font-semibold mb-1" htmlFor="phoneNumber">{t("description.auth.phone_number")}</label>
                    <input type="phone" id="phoneNumber" 
                        className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                        placeholder="Enter operating center"
                        {...register("phone_number", {required: true})}
                        required
                    />
                    {errors.phone_number ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 text-xs mb-4">
                <div>
                    <label className="block font-semibold mb-1" htmlFor="website">{t("description.dashboard.website")}</label>
                    <input type="text" id="website"
                        className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                        placeholder="Enter website"
                        {...register("website", {required: true})}
                        required
                    />
                    {errors.website ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                </div>

                <div>
                    <label className="block font-semibold mb-1" htmlFor="GIBSenderAlias">{t("description.dashboard.GIB_sender_alias")}</label>
                    <input type="text" id="GIBSenderAlias" 
                        className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                        placeholder="Enter GIB Sender Alias"
                        {...register("gib_sender_alias", {required: true})}
                        required
                    />
                    {errors.gib_sender_alias ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 text-xs mb-4">
                <div>
                    <label className="block font-semibold mb-1" htmlFor="GIBReceiverAlias">{t("description.dashboard.GIB_receiver_alias")}</label>
                    <input type="text" id="GIBReceiverAlias" 
                        className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                        placeholder="Enter operating center"
                        {...register("gib_receiver_alias", {required: true})}
                        required
                    />
                    {errors.gib_receiver_alias ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                </div>

                <div>
                    <label className="block font-semibold mb-1" htmlFor="eSignatureMethod">{t("description.dashboard.e_signature_method")}</label>
                    <input type="text" id="eSignatureMethod" 
                        className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                        placeholder="Enter GIB Sender Alias"
                        {...register("e-signature_method", {required: true})}
                        required
                    />
                    {errors["e-signature_method"] ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
                </div>
            </div>

            <div className="flex justify-center items-center md:justify-start text-xs gap-2 flex-wrap">
                <button className="rounded-md py-2 px-8 bg-primary text-white flex justify-center items-center gap-1">
                  {loading ? <span className="inline-block w-[14px] min-w-[14px] h-[14px] rounded-full border-2 border-b-transparent border-white animate-spin"></span> : null}
                  <span>{t("description.dashboard.save")}</span>
                </button>
                
                <Link to="/dashboard/meaning/my-companies" className="inline-block rounded-md py-2 px-8 bg-secondary text-white">
                  <span>{t("description.dashboard.cancel")}</span>
                </Link>
            </div>

        </form>
    </>
  )
}

export default CreateCompany;