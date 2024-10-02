/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-escape */

import { PencilSimple , X } from "@phosphor-icons/react";
import { CompanyProps } from "../../../../types/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from "../../../../api/api";
import SelectOptions from "../../components/SelectOptions";
import { getToken } from "../../../../services/auth";
import { useDispatch } from "react-redux";
import { updateCompany } from "../../../../store/features/Companies";
import countries from "../../../../data/countries.json";
import { useTranslation } from "react-i18next";

interface EditcompanyProps {
  company: CompanyProps;
  showEdit: boolean; 
  handleClose: () => void;
}

const EditCompany = ({showEdit, company, handleClose}: EditcompanyProps) => {
  const [compData, setCompData] = useState(() => {
    return {
      "company_name": company["company_name"],
      "tax_number": company["tax_number"],
      "tax_office": company["tax_office"],
      "mersis_number": company["mersis_number"],
      "business_registry_number": company["business_registry_number"],
      "operating_center": company["operating_center"],
      "country": company["country"],
      "city": company["city"],
      "address": company["address"],
      "email": company["email"],
      "phone_number": company["phone_number"],
      "website": company["website"],
      "gib_sender_alias": company["gib_sender_alias"],
      "gib_receiver_alias": company["gib_receiver_alias"],
      "e-signature_method": company["e-signature_method"]
    }
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();


  useEffect(() => {

    setCompData({
      "company_name": company["company_name"],
      "tax_number": company["tax_number"],
      "tax_office": company["tax_office"],
      "mersis_number": company["mersis_number"],
      "business_registry_number": company["business_registry_number"],
      "operating_center": company["operating_center"],
      "country": company["country"],
      "city": company["city"],
      "address": company["address"],
      "email": company["email"],
      "phone_number": company["phone_number"],
      "website": company["website"],
      "gib_sender_alias": company["gib_sender_alias"],
      "gib_receiver_alias": company["gib_receiver_alias"],
      "e-signature_method": company["e-signature_method"]
    });

  }, [company]);


  const handleChange = (ev: any) => setCompData({...compData, [ev.target.name]: ev.target.value});

  const handleUpdate = async (ev: any) => {
    ev.preventDefault();

    if(loading){ return; }
    const { email } = compData;
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!email || !regex.test(email)) {
      return toast.error("Invalid email provided");
    }
    
    const validated = Object.values(compData).every(val => val.length > 0);
    if(!validated){
      return toast.error("All fields are required", {autoClose: 4000, pauseOnHover: true});
    }

    setLoading(true);
    try {
      
      const { data } = await axiosInstance.put(`/admin/companies/${company.id}`, {...compData, id: company.id}, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`
        }
      });

      if(data.status){
        toast.success(data.message, {autoClose: 4000, pauseOnHover: false});
        
        dispatch(updateCompany(data.data));
        return setTimeout(() => {
          setLoading(false);
          return handleClose();
        }, 2000);
      }
      
      setLoading(false);
      return toast.error(data.message, {autoClose: 4000, pauseOnHover: false});
      
    } catch (error: any) {
      setLoading(false);
      return toast.error(error.response ? error.response.data?.error || error.response?.data?.message : "Something went wrong, try again later.");
    }

  }

  const handleModalClose = (ev: any) => {
    const target = ev.target as HTMLDivElement;
    if (target.tagName === "DIV" && target.className.includes("parent")) {
        handleClose();
    }
  };

  const getStateCountryState = (country: string) => {

    if(country){
        const filteredCountry = countries.find(cnt => cnt.name === country);
        return filteredCountry ? filteredCountry.states.map(state => state.name) : []
    }

    return [];
  }


  return (
        <>
            <div
              onClick={handleModalClose}
              className={`parent w-full h-screen  md:bg-[#00000080] transition-all ${showEdit ? "fixed" : "hidden"}  top-0 left-0 z-50`}
            >
                <div className="w-full md:w-[30%] h-screen overflow-y-scroll transition-all bg-white text-[#333333] text-xs absolute top-0 right-0">
                    <div className="flex justify-between staty top-0 left-0 items-center p-5 border-b-2">
                      <span className="flex items-center gap-2">
                          <PencilSimple className="text-primary" size={20} />
                          <h1 className="text-md font-semibold text-sm">{t("description.dashboard.edit_company_information")}</h1>
                      </span>

                      <X size={20} onClick={handleClose} className="cursor-pointer" />
                    </div>

                    <div className="p-5">
                      <form onSubmit={handleUpdate}>
                        {/* <div>
                            <label htmlFor="" className="block font-semibold mb-1">
                                Account type
                            </label>
                            <input className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" type="text" placeholder="Mohammad" />
                        </div> */}

                        <div className="mb-4">
                          <label htmlFor="company_name" className="block font-semibold mb-1">{t("description.dashboard.company_name")}</label>
                          <input
                              type="text"
                              name="company_name"
                              id="company_name"
                              className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all"
                              placeholder="Company name"
                              defaultValue={company.company_name}
                              onChange={handleChange}
                              required
                          />
                        </div>

                        <div className="mb-4">
                          <label htmlFor="tax_number" className="block font-semibold mb-1">{t("description.dashboard.tax_number")}</label>
                          <input 
                              type="number"
                              name="tax_number"
                              id="tax_number"
                              className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                              placeholder="Tax number"
                              defaultValue={company.tax_number}
                              onChange={handleChange}
                              required
                          />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="tax_office" className="block font-semibold mb-1">{t("description.dashboard.tax_office")}</label>
                            <input 
                                type="text"
                                name="tax_office"
                                id="tax_office"
                                className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                placeholder="Tax office"
                                defaultValue={company.tax_office}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="mersis_number" className="block font-semibold mb-1">{t("description.dashboard.mersis_number")}</label>
                            <input 
                                type="text"
                                name="mersis_number"
                                id="mersis_number"
                                className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                placeholder="Mersis Number"
                                defaultValue={company.mersis_number}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="business_registry_number" className="block font-semibold mb-1">{t("description.dashboard.business_registration_number")}</label>
                            <input 
                                type="number"
                                name="business_registry_number"
                                id="business_registry_number"
                                className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                placeholder="Business registration number"
                                defaultValue={company.business_registry_number}
                                onChange={handleChange}
                                required 
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="operating_center" className="block font-semibold mb-1">{t("description.dashboard.operating_center")}</label>
                            <input 
                                type="text"
                                name="operating_center"
                                id="operating_center"
                                className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                placeholder="Operating center"
                                defaultValue={company.operating_center}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                          <label className="block font-semibold mb-1" htmlFor="country">{t("description.dashboard.country")}</label>
                          <SelectOptions
                              title="Select country"
                              selectedOption={compData.country || ""}
                              setSelectedOption={(userSelection) => setCompData({...compData, country: userSelection, city: ""})}
                              options={countries.map(country => country.name)}
                              className="border border-[#D9D9D9] rounded outline-primary transition-all p-2"
                              top="top-8"
                          />
                        </div>

                        <div className="mb-4">
                          <label className="block font-semibold mb-1" htmlFor="city">{t("description.dashboard.city")}</label>
                          <SelectOptions
                              title={!compData.country ? "Select country first" : "Select city"}
                              selectedOption={compData.city || ""}
                              setSelectedOption={(userSelection) => setCompData({...compData, city: userSelection})}
                              options={getStateCountryState(compData.country || "")}
                              className="border border-[#D9D9D9] rounded outline-primary transition-all p-2"
                              top="top-8"
                          />
                        </div>

                        <div className="mb-4">
                            <label className="block font-semibold mb-1" htmlFor="address">{t("description.dashboard.address")}</label>
                            <textarea
                                name="address"
                                id="address"
                                className="w-full h-[100px] border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all resize-none"
                                placeholder="Enter your address"
                                defaultValue={company.address}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block font-semibold mb-1">{t("description.auth.email")}</label>
                            <input 
                                type="email"
                                name="email"
                                id="email"
                                className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                placeholder="johndoe@email.com"
                                defaultValue={company.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="phone_number" className="block font-semibold mb-1">{t("description.dashboard.phone")}</label>
                            <input 
                                type="text"
                                name="phone_number"
                                id="phone_number"
                                className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                placeholder="Phone"
                                defaultValue={company.phone_number}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="website" className="block font-semibold mb-1">{t("description.dashboard.web_url")}</label>
                            <input 
                                type="text"
                                name="website"
                                id="website"
                                className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                placeholder="www.testing.com" 
                                defaultValue={company.website}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* <p className="font-semibold p-2 text-primary w-full border-b border-primary">GIB REGISTRATION INFORMATION</p> */}

                        {/* <div className="mb-4">
                            <label htmlFor="" className="block font-semibold mb-1 ">GIB Registration Date</label>
                            <input 
                                className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                type="text"
                                {...register("gib_registration_data", { required: true })}
                                defaultValue={company.gib_registration_data}
                                required
                            />
                        </div> */}

                        <div className="mb-4">
                            <label htmlFor="gib_sender_alias" className="block font-semibold mb-1">{t("description.dashboard.GIB_sender_alias")}</label>
                            <input 
                                type="text"
                                name="gib_sender_alias"
                                id="gib_sender_alias"
                                className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                placeholder="GIB Sender Alias"
                                defaultValue={company.gib_sender_alias}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="gib_receiver_alias" className="block font-semibold mb-1 ">{t("description.dashboard.GIB_receiver_alias")}</label>
                            <input 
                                type="text"
                                name="gib_receiver_alias"
                                id="gib_receiver_alias"
                                className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                placeholder="GIB Receiver Alias"
                                defaultValue={company.gib_receiver_alias}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <p className="font-semibold p-1 text-primary w-full border-b border-primary mb-2">{t("description.dashboard.E_SIGNATURE_INFORMATION")}</p>
                        
                        <div className="mb-4">
                            <label htmlFor="e-signature_method" className="block font-semibold mb-1 ">{t("description.dashboard.e_signature_method")}</label>
                            <input 
                                type="text"
                                name="e-signature_method"
                                id="e-signature_method"
                                className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                placeholder="E-Signature Information"
                                defaultValue={company["e-signature_method"]}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        {/* <p className="block font-semibold p-2 text-primary w-full border-b border-primary">XSLT INFORMATION</p>

                        <div className="p-2 space-y-2">
                            <p>urn:mail:defaultpk@edmbilisim.com.tr</p>
                            <p>urn:mail:defaultpk@edmbilisim.com.tr</p>
                            <p>urn:mail:defaultpk@edmbilisim.com.tr</p>
                        </div> */}

                        {/* <p className="font-semibold p-2 text-primary w-full border-b border-primary">UPDATE DETAILS</p> */}

                        {/* <div className="mb-4">
                            <label htmlFor="" className="block font-semibold mb-1 ">Date of last update</label>
                            <input 
                                type="text"
                                id="date_of_last_update"
                                className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                {...register("date_of_last_update", { required: true })}
                                defaultValue={company.date_of_last_update}
                                required
                            />
                        </div> */}

                        {/* <div className="mb-4">
                            <label htmlFor="" className="block font-semibold mb-1 ">Last update User</label>
                            <input 
                                type="text"
                                id="last_update_user"
                                className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                {...register("last_update_user", { required: true })}
                                defaultValue={company.last_update_user}
                                required
                            />
                        </div> */}

                        {/* <input 
                          type="submit" 
                          className="rounded bg-primary text-white py-1 px-3 flex justify-center items-center"
                          value="Update"
                        /> */}

                        <div className="flex justify start-items-center gap-2 flex-wrap">
                          <button className="bg-primary text-white font-semibold rounded flex justify-center items-center gap-2 py-2 px-4">
                            {loading ? <span className="inline-block w-[16px] min-w-[16px] h-[16px] rounded-full border-2 border-b-transparent border-white animate-spin"></span> : null}
                            <span>{t("description.dashboard.update")}</span>
                          </button>
                          
                          <span onClick={handleClose} className="bg-secondary text-white font-semibold rounded flex justify-center items-center gap-2 py-2 px-4 cursor-pointer">
                            <span>{t("description.dashboard.cancel")}</span>
                          </span>
                        </div>


                      </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditCompany;