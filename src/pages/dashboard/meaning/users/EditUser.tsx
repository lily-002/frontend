/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { User, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
// import UserRole from "./UserRole";
import { axiosInstance } from "../../../../api/api";
import { getToken } from "../../../../services/auth";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks/hooks";
import { getCompanies } from "../../../../store/features/Companies";
import SelectOptions from "../../components/SelectOptions";
// import { updateUser } from "../../../../store/features/Users";
import { UserProps } from "../../../../types/types";
import { getUser } from "../../../../store/features/Users";
import { useTranslation } from "react-i18next";

interface EditUserProps {
  show: boolean;
  user: UserProps;
  closeModal: () => void;
}


const EditUser = ({ show, user, closeModal }: EditUserProps) => {
  const { companies, message, loading: companyLoader } = useAppSelector(state => state.companies);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({} as UserProps);
  const { t } = useTranslation();


  useEffect(() => {

    if(!companies.length){ dispatch(getCompanies())}
    if(show && user.id){ setFormData(user); }

  }, [dispatch, companies.length, user.id, show]);


  const handleClose = (ev: any) => {
    const target = ev.target as HTMLDivElement;
    if (target.tagName === "DIV" && target.className.includes("parent")) {
      closeModal();
    }
  };

  const handleChange = (ev: any) => setFormData({...formData, [ev.target.name]: ev.target.value});

  const handleCheck = (ev: any) => setFormData({...formData, [ev.target.name]: +ev.target.checked});


  const handleUpdateUser = async (ev: any) => {
    ev.preventDefault();

    if(loading){ return; }

    const formDataPayload = {
      ...formData
    }
    const company = companies.find(comp => comp.company_name === formData.company_name);
    if(!company){ return toast.warning("There is a problem with the selected company, please contact customer support."); }
    formDataPayload.company_id = company?.id as number | string;
    // delete formDataPayload.company_name;

    setLoading(true);
    try {
      
      const { data } = await axiosInstance.put(`/admin/users/${user.id}`, formDataPayload, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`
        }
      });

      if(data.status){
        toast.success(data.message, {autoClose: 4000, pauseOnHover: false});
        
        dispatch(getUser(user.id));
        return setTimeout(() => {
          setLoading(false);
          return closeModal();
        }, 4000);
      }
      
      setLoading(false);
      return toast.error(data.message, {autoClose: 4000, pauseOnHover: false});
      
    } catch (error: any) {
      setLoading(false);
      return toast.error(error.response ? error.response.data?.error || error.response?.data?.message : "Something went wrong, try again later.");
    }

  }

  if(!show){ return; }

  return (
    <div onClick={handleClose}
      className={`parent w-full h-screen bg-[#00000080] ${show ? "fixed" : "hidden"} top-0 left-0 z-50 transition-all flex justify-center items-start`}
    >
      {/* Form modal */}
      <div className="w-full max-w-[400px] bg-white text-xs  shadow-xl  h-screen  overflow-y-scroll absolute top-0 right-0 ">
        <div className="flex justify-between items-center gap-4 p-4 border-b border-gray-300 mb-">
          <div className="flex justify-start items-center gap-2">
            <User size={20} color="green" />
            <span className="inline-block font-bold text-xs capitalize">{t("description.dashboard.edit_user")}</span>
          </div>

          <span className="flex justify-center items-center w-[22px] min-w-[22px] h-[22px] rounded-full hover:bg-gray-100 ">
            <X size={16} weight="bold" className="cursor-pointer" onClick={closeModal} />
          </span>
        </div>

        <form onSubmit={handleUpdateUser} className="text-xs p-4">
          <h4 className=" text-primary font-semibold pb-2 border-b border-primary mb-4">{t("description.dashboard.USER_INFORMATION")}</h4>

          <div className="mb-4">
            <label htmlFor="name" className="block font-semibold mb-2">{t("description.dashboard.full_name")}<span className="text-red-500">*</span></label>
            <input type="text" id="name" name="name"
              placeholder="Enter user full name"
              className="w-full border-2 rounded outline-primary transition-all p-2"
              defaultValue={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="username" className="block font-semibold mb-2">{t("description.auth.username")}<span className="text-red-500">*</span></label>
            <input type="text" id="username" name="username"
              placeholder="Enter username"
              className="w-full border-2 rounded outline-primary transition-all p-2"
              defaultValue={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1" htmlFor="country">{t("description.dashboard.company")}</label>
            {companyLoader ? <span className="inline-block w-[18px] min-w-[18px] h-[18px] rounded-full border-2 border-b-transparent border-primary animate-spin"></span> : null}
            {!companyLoader && message ? (<p className="text-[#F16021] bg-[#f15f213c] text-center mx-auto mt-12 p-2 rounded">{message}</p>) : null}
            {!companyLoader && !message ? (
              <SelectOptions
                  title="Company Name"
                  selectedOption={formData.company_name as string}
                  setSelectedOption={(userSelection) => setFormData({...formData, company_name: userSelection})}
                  options={companies.map(comp => comp.company_name)}
                  className="border border-[#D9D9D9] rounded outline-primary transition-all p-2"
                  top="top-8"
              />
            ) : null}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block font-semibold mb-2">{t("description.auth.email")}<span className="text-red-500">*</span></label>
            <input type="email" id="email" name="email"
              placeholder="johndoe@email.com"
              className="w-full border-2 rounded outline-primary transition-all p-2"
              defaultValue={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-start text-nowrap item-center gap-4 flex-wrap mb-4">
            <p>{t("description.dashboard.allow_email_notifications_for")}:</p>
            
            <div className="flex justify-start items-center gap-1">
              <input
                type="checkbox"
                id="notification_einvoice" name="notification_einvoice"
                className="w-[14px] h-[14px] text-nowrap accent-primary"
                checked={formData.notification_einvoice ? true : false}
                onChange={handleCheck}
              />
              <label htmlFor="notification_einvoice">{t("description.dashboard.e_invoice")}</label>
            </div>
            
            <div className="flex justify-start items-center gap-1">
              <input
                type="checkbox"
                id="notification_edispatch"
                name="notification_edispatch"
                className="w-[14px] h-[14px] text-nowrap accent-primary"
                checked={formData.notification_edispatch ? true : false}
                onChange={handleCheck}
              />
              <label htmlFor="notification_edispatch">{t("description.dashboard.e_dispatch")}</label>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="luca_username" className="block font-semibold mb-2">{t("description.dashboard.luca_username")}</label>
            <input
              type="text" id="luca_username" name="luca_username"
              placeholder="Enter luca username"
              className="w-full border-2 rounded outline-primary transition-all p-2"
              defaultValue={formData.luca_username}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="luca_member_number" className="block font-semibold mb-2">{t("description.dashboard.luca_member_number")}</label>
            <input
              type="text" id="luca_member_number" name="luca_member_number"
              placeholder="Enter luca member number"
              className="w-full border-2 rounded outline-primary transition-all p-2"
              defaultValue={formData.luca_member_number}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 justify-between items-start gap-4 mb-4">
            <div>
              <label className="block font-semibold mb-1" htmlFor="phone">{t("description.auth.phone_number")} <span className="text-primary">({t("description.dashboard.recovery")})</span></label>
              <input
                type="phone" id="phone" name="phone"
                className="w-full border-2 rounded outline-primary transition-all p-2"
                placeholder="+234123456789"
                defaultValue={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1" htmlFor="mobile">{t("description.dashboard.mobile_number")}</label>
              <input
                type="phone" id="mobile" name="mobile"
                className="w-full border-2 rounded outline-primary transition-all p-2"
                placeholder="+234123456789"
                defaultValue={formData.mobile}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex  justify-start text-nowrap item-center gap-4 flex-wrap md:flex-nowrap mb-8">
            
            <p className="text-nowrap font-bold">{t("description.dashboard.restriction_for_invoice")}</p>

            <div className="flex justify-start items-start gap-4 flex-wrap">
              <div className="flex justify-start items-center gap-1">
                <input
                  type="checkbox"
                  id="export_only" name="export_only"
                  className="w-[14px] h-[14px] text-nowrap accent-primary"
                  checked={formData.export_only ? true : false}
                  onChange={handleCheck}
                />
                <label htmlFor="export_only">{t("description.dashboard.expert_only")}</label>
              </div>

              <div className="flex justify-start items-center gap-1">
                <input
                  type="checkbox"
                  id="earchive" name="earchive"
                  className="w-[14px] h-[14px] text-nowrap accent-primary"
                  checked={formData.earchive ? true : false}
                  onChange={handleCheck}
                />
                <label htmlFor="earchive">{t("description.dashboard.e_archive")}</label>
              </div>

              <div className="flex justify-start items-center gap-1">
                <input
                  type="checkbox"
                  id="einvoice_only" name="einvoice_only"
                  className="w-[14px] h-[14px] text-nowrap accent-primary"
                  checked={formData.einvoice_only ? true : false}
                  onChange={handleCheck}
                />
                <label htmlFor="einvoice_only">{t("description.dashboard.e_invoice_only")}</label>
              </div>

              <div className="flex justify-start items-center gap-1">
                <input
                  type="checkbox"
                  id="ssi_only" name="ssi_only"
                  className="w-[14px] h-[14px] text-nowrap accent-primary"
                  onChange={handleCheck}
                  checked={formData.ssi_only ? true : false}
                />
                <label htmlFor="ssi_only">{t("description.dashboard.SSI_only")}</label>
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

            <div className="flex justify-start items-center gap-2 flew-wrap">
              <button className="bg-primary text-white text-xs rounded flex justify-center items-center gap-2 py-2 px-4">
                {loading ? <span className="inline-block w-[16px] min-w-[16px] h-[16px] rounded-full border-2 border-b-transparent border-white animate-spin"></span> : null}
                <span>{t("description.dashboard.update")}</span>
              </button>

              <span onClick={closeModal} className="bg-secondary text-white font-semibold rounded flex justify-center items-center gap-2 py-2 px-4 cursor-pointer">
                <span>{t("description.dashboard.cancel")}</span>
              </span>
            </div>

        </form>
      </div>

    </div>
  );
};

export default EditUser;
