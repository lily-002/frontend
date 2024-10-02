/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Eye, EyeSlash, User, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
// import UserRole from "./UserRole";
import { useForm, SubmitHandler } from "react-hook-form";
import { axiosInstance } from "../../../../api/api";
import { getToken } from "../../../../services/auth";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks/hooks";
import { getCompanies } from "../../../../store/features/Companies";
import SelectOptions from "../../components/SelectOptions";
import { addUser } from "../../../../store/features/Users";
import { useTranslation } from "react-i18next";
import useRoles from "../../../../authentication/useRoles";

interface AddUserProps {
  show: boolean;
  closeModal: () => void;
}

interface FormDataProps {
  "name": string;
  "email": string;
  "phone": string;
  "mobile": string;
  "username": string;
  "password": string;
  "company_name": number | string;
  "notification_einvoice": boolean;
  "notification_edispatch": boolean;
  "luca_username": string;
  "luca_member_number": string;
  "luca_password": string;
  "export_only": boolean;
  "earchive": boolean;
  "einvoice_only": boolean;
  "ssi_only": boolean;
  "company_id": number | string;
}


const AddUser = ({ show, closeModal }: AddUserProps) => {
  const { companies, message, loading: companyLoader } = useAppSelector(state => state.companies);
  const {register, handleSubmit, formState: {errors}, reset, watch, setValue} = useForm<FormDataProps>();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const formValues = watch();
  const { t } = useTranslation();
  const roles = useRoles();


  useEffect(() => {

    if(roles && roles.includes("admin") && !companies.length){ dispatch(getCompanies()) }
    if(show && roles && roles.includes("admin") && !companyLoader && !message && !companies.length){
      toast.warning("A company is required to create an user, you need to create a company first.", {autoClose: 4000, pauseOnHover: true});
    }

  }, [dispatch, companies.length, companies.length, show]);
  

  const handleClose = (ev: any) => {
    const target = ev.target as HTMLDivElement;
    if (target.tagName === "DIV" && target.className.includes("parent")) {
      closeModal();
    }
  };


  const handleAddUser: SubmitHandler<FormDataProps> = async (formData) => {
    if(loading){ return; }

    // Check for a company
    if(roles && roles.includes("admin") && !companies.length){
      return toast.warning("A company is required to create an user, you need to create a company first.", {autoClose: 4000, pauseOnHover: true});
    }

    const company = companies.find(comp => comp.company_name === formData.company_id);
    if(!company){ return toast.warning("There is a problem with the selected company, please contact customer support."); }
    formData.company_id = company.id as number | string;

    setLoading(true);
    try {
      
      const { data } = await axiosInstance.post(`/admin/users`, formData, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`
        }
      });

      if(data.status){
        toast.success(data.message, {autoClose: 4000, pauseOnHover: false});
        
        reset();
        
        delete data.data["company"];
        dispatch(addUser(data.data));
        return setTimeout(() => {
          setLoading(false);
          return closeModal();
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
    <div onClick={handleClose}
      className={`parent w-full h-screen bg-[#00000080] ${show ? "fixed" : "hidden"} top-0 left-0 z-50 transition-all flex justify-center items-start`}
    >
      {/* Form modal */}
      <div className="w-full max-w-[400px] bg-white text-xs  shadow-xl  h-screen  overflow-y-scroll absolute top-0 right-0 ">
        <div className="flex justify-between items-center gap-4 p-4 border-b border-gray-300 mb-">
          <div className="flex justify-start items-center gap-2">
            <User size={20} color="green" />
            <span className="inline-block font-bold text-xs capitalize">{t("description.dashboard.add_new_user")}</span>
          </div>

          <span className="flex justify-center items-center w-[22px] min-w-[22px] h-[22px] rounded-full hover:bg-gray-100 ">
            <X
              size={16}
              weight="bold"
              className="cursor-pointer "
              onClick={closeModal}
            />
          </span>
        </div>

        <form onSubmit={handleSubmit(handleAddUser)} className="text-xs p-4">
          <h4 className=" text-primary font-semibold pb-2 border-b border-primary mb-4">{t("description.dashboard.USER_INFORMATION")}</h4>

          <div className="mb-4">
            <label htmlFor="name" className="block font-semibold mb-2">{t("description.dashboard.full_name")}<span className="text-red-500">*</span></label>
            <input type="text" id="name"
              placeholder="Enter user full name"
              className="w-full border-2 rounded outline-primary transition-all p-2"
              {...register("name", {required: true})}
              required
            />
            {errors.name ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
          </div>

          <div className="mb-4">
            <label htmlFor="username" className="block font-semibold mb-2">{t("description.auth.username")}<span className="text-red-500">*</span></label>
            <input type="text" id="username"
              placeholder="Johndoe123"
              className="w-full border-2 rounded outline-primary transition-all p-2"
              {...register("username", {required: true})}
              required
            />
            {errors.username ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
          </div>

          <div className="mb-4">
            {companyLoader ? <span className="inline-block w-[18px] min-w-[18px] h-[18px] rounded-full border-2 border-b-transparent border-primary animate-spin"></span> : null}
            {!companyLoader && message ? (<p className="text-[#F16021] bg-[#f15f213c] text-center mx-auto mt-12 p-2 rounded">{message}</p>) : null}
            {!companyLoader && !message ? (
              <div>
                  <label className="block font-semibold mb-1" htmlFor="company_id">{t("description.dashboard.company_name")}</label>
                  <input type="text" readOnly className="-z-10 absolute top-0 left-0" {...register("company_id", {required: true})} />
                  <SelectOptions
                      title="Company"
                      selectedOption={formValues.company_id as string}
                      setSelectedOption={(userSelection) => setValue("company_id", userSelection)}
                      options={companies.map(company => company.company_name)}
                      className="border border-[#D9D9D9] rounded outline-primary transition-all p-2"
                      top="top-8"
                  />
                  {!formValues.company_id && errors.company_id ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
              </div>

            ) : null}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block font-semibold mb-2">{t("description.auth.email")}<span className="text-red-500">*</span></label>
            <input type="email" id="email"
              placeholder="johndoe@email.com"
              className="w-full border-2 rounded outline-primary transition-all p-2"
              {...register("email", {required: true})}
              required
            />
            {errors.email ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
          </div>

          <div className="flex justify-start text-nowrap item-center gap-4 flex-wrap mb-4">
            <p>{t("description.dashboard.allow_email_notifications_for")}:</p>
            
            <div className="flex justify-start items-center gap-1">
              <input
                type="checkbox"
                id="eInvoice"
                className="w-[14px] h-[14px] text-nowrap accent-primary"
                {...register("notification_einvoice")}
              />
              <label htmlFor="eInvoice">{t("description.dashboard.e_invoice")}</label>
            </div>
            
            <div className="flex justify-start items-center gap-1">
              <input
                type="checkbox"
                id="eDispatch"
                className="w-[14px] h-[14px] text-nowrap accent-primary"
                {...register("notification_edispatch")}
              />
              <label htmlFor="eDispatch">{t("description.dashboard.e_dispatch")}</label>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="lucaUsername" className="block font-semibold mb-2">{t("description.dashboard.luca_username")}</label>
            <input
              type="text" id="lucaUsername"
              placeholder="Enter luca username"
              className="w-full border-2 rounded outline-primary transition-all p-2"
              {...register("luca_username")}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lucaMemberNumber" className="block font-semibold mb-2">{t("description.dashboard.luca_member_number")}</label>
            <input
              type="text" id="lucaMemberNumber"
              placeholder="Enter luca member number"
              className="w-full border-2 rounded outline-primary transition-all p-2"
              {...register("luca_member_number")}
            />
          </div>


          <div className="mb-4">
            <label className="block font-semibold mb-1" htmlFor="password">{t("description.auth.password")}</label>
            <input type={showPassword ? "text" : "password"} id="password" className="w-full border-2 rounded outline-primary transition-all p-2" 
              placeholder="Enter luca password"
              {...register("password", {required: true})}
              required
            />
            <span onClick={() => setShowPassword(!showPassword)} className="inline-block w-[18px] h-[18px] absolute top-7 right-2 bg-white z-10">
              {showPassword ? <EyeSlash size={18} weight="regular" /> : <Eye size={18} weight="regular" />}
            </span>
            {errors.email ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 justify-between items-start gap-4 mb-4">
            <div>
              <label className="block font-semibold mb-1" htmlFor="recoveryPhoneNumber">{t("description.auth.phone_number")} <span className="text-primary">({t("description.dashboard.recovery")})</span></label>
              <input
                type="phone" id="recoveryPhoneNumber"
                className="w-full border-2 rounded outline-primary transition-all p-2"
                placeholder="+234123456789"
                {...register("phone", {required: true})}
                required
              />
              {errors.phone ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
            </div>

            <div>
              <label className="block font-semibold mb-1" htmlFor="mobile">{t("description.dashboard.mobile_number")}</label>
              <input
                type="phone" id="mobile"
                className="w-full border-2 rounded outline-primary transition-all p-2"
                placeholder="+234123456789"
                {...register("mobile", {required: true})}
                required
              />
              {errors.mobile ? <p className="text-secondary mt-1">{t("description.errors.input_field_is_required")}</p> : null}
            </div>
          </div>

          <div className="flex  justify-start text-nowrap item-center gap-4 flex-wrap md:flex-nowrap mb-4">
            
            <p className="text-nowrap font-bold">{t("description.dashboard.restriction_for_invoice")}</p>

            <div className="flex justify-start items-start gap-4 flex-wrap">
              <div className="flex justify-start items-center gap-1">
                <input
                  type="checkbox"
                  id="expertOnly"
                  className="w-[14px] h-[14px] text-nowrap accent-primary"
                  {...register("export_only")}
                />
                <label htmlFor="expertOnly">{t("description.dashboard.expert_only")}</label>
              </div>

              <div className="flex justify-start items-center gap-1">
                <input
                  type="checkbox"
                  id="eArchive"
                  className="w-[14px] h-[14px] text-nowrap accent-primary"
                  {...register("earchive")}
                />
                <label htmlFor="eArchive">{t("description.dashboard.e_archive")}</label>
              </div>

              <div className="flex justify-start items-center gap-1">
                <input
                  type="checkbox"
                  id="eInvoiceOnly"
                  className="w-[14px] h-[14px] text-nowrap accent-primary"
                  {...register("einvoice_only")}
                />
                <label htmlFor="eInvoiceOnly">{t("description.dashboard.e_invoice_only")}</label>
              </div>

              <div className="flex justify-start items-center gap-1">
                <input
                  type="checkbox"
                  id="SSI"
                  className="w-[14px] h-[14px] text-nowrap accent-primary"
                  {...register("ssi_only")}
                />
                <label htmlFor="SSI">{t("description.dashboard.SSI_only")}</label>
              </div>
            </div>              
          </div>


          {/* Checkbox dropdown */}
          {/* <div className="mb-4">
            <p className="font-bold mb-2">User Role</p>
            <UserRole 
              className="border-2 rounded outline-primary transition-all p-2"
              top="top-8"
            />
          </div> */}

            <div className="flex justify-start items-center gap-2 flex-wrap">
              <button className="bg-primary text-white text-xs rounded-full flex justify-center items-center gap-2 py-2 px-4">
                {loading ? <span className="inline-block w-[16px] min-w-[16px] h-[16px] rounded-full border-2 border-b-transparent border-white animate-spin"></span> : null}
                <span>{t("description.dashboard.save")}</span>
              </button>
              
              <span onClick={closeModal} className="bg-secondary text-white text-xs rounded-full flex justify-center items-center gap-2 py-2 px-4 cursor-pointer">
                <span>{t("description.dashboard.cancel")}</span>
              </span>
            </div>
        </form>
      </div>

    </div>
  );
};

export default AddUser;
