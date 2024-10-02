/* eslint-disable @typescript-eslint/no-explicit-any */
import { Eye, X } from "@phosphor-icons/react";
import { CompanyProps } from "../../../../types/types";
import { useTranslation } from "react-i18next";

interface ViewCompanyProps {
    company: CompanyProps;
    showView: boolean;
    handleClose: () => void;
}

const ViewCompany = ({ showView, company, handleClose }: ViewCompanyProps) => {
    const { t } = useTranslation();

    const handleModalClose = (ev: any) => {
        const target = ev.target as HTMLDivElement;
        if (target.tagName === "DIV" && target.className.includes("parent")) {
            handleClose();
        }
    };

    return (
        <>
            <div
                onClick={handleModalClose}
                className={`parent w-full h-screen  md:bg-[#00000080] transition-all ${showView ? "fixed" : "hidden"}  top-0 left-0 z-50`}
            >
                <div className="w-full md:w-[30%] h-screen overflow-y-scroll transition-all bg-white text-[#333333] text-xs absolute top-0 right-0">
                    <div className="flex justify-between staty top-0 left-0 items-center p-5 border-b-2">
                        <span className="flex items-center gap-2">
                            <Eye color="red" size={20} />
                            <h1 className="text-md font-semibold text-sm">{t("description.dashboard.view_company_information")}</h1>
                        </span>

                        <X size={20} onClick={handleClose} className="cursor-pointer" />
                    </div>

                    <div className="p-5">
                        {/* <form action="" className="space-y-3"> */}
                        {/* <div>
                            <label htmlFor="" className="block font-semibold mb-1">
                                Account type
                            </label>
                            <input className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" type="text" placeholder="Mohammad" />
                        </div> */}

                        <div className="mb-4">
                            <label htmlFor="" className="block font-semibold mb-1">{t("description.dashboard.company_name")}</label>
                            <input
                                type="text"
                                className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all"
                                placeholder="Company name"
                                defaultValue={company.company_name}
                                readOnly
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="" className="block font-semibold mb-1">{t("description.dashboard.tax_number")}</label>
                            <input 
                                type="text" 
                                className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                placeholder="Tax number"
                                defaultValue={company.tax_number}
                                readOnly
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="" className="block font-semibold mb-1">{t("description.dashboard.tax_office")}</label>
                            <input 
                                type="text"
                                className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                placeholder="Tax office"
                                defaultValue={company.tax_office}
                                readOnly
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="" className="block font-semibold mb-1">{t("description.dashboard.mersis_number")}</label>
                            <input 
                                type="text"
                                className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                placeholder="Mersis Number"
                                defaultValue={company.mersis_number}
                                readOnly 
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="" className="block font-semibold mb-1">{t("description.dashboard.business_registry_number")}</label>
                            <input 
                                type="text"
                                className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                placeholder="Business registration number"
                                defaultValue={company.business_registry_number}
                                readOnly 
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="" className="block font-semibold mb-1">{t("description.dashboard.operating_center")}</label>
                            <input 
                                type="text"
                                className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                placeholder="Operating center"
                                defaultValue={company.operating_center}
                                readOnly
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="" className="block font-semibold mb-1">{t("description.dashboard.country")}</label>
                            <input 
                                type="text" 
                                className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                placeholder="Country"
                                defaultValue={company.country}
                                readOnly
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="" className="block font-semibold mb-1">{t("description.dashboard.city")}</label>
                            <input 
                                type="text" 
                                className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                placeholder="Country"
                                defaultValue={company.city}
                                readOnly
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block font-semibold mb-1" htmlFor="address">{t("description.dashboard.address")}</label>
                            <textarea 
                                className="w-full h-[100px] border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all resize-none"
                                placeholder="Enter your address"
                                defaultValue={company.address}
                                readOnly
                            ></textarea>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="" className="block font-semibold mb-1">{t("description.auth.email")}</label>
                            <input 
                                type="email"
                                className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                placeholder="johndoe@email.com"
                                defaultValue={company.email}
                                readOnly
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="" className="block font-semibold mb-1">{t("description.dashboard.phone")}</label>
                            <input 
                                type="text" 
                                className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                placeholder="Phone"
                                defaultValue={company.phone_number}
                                readOnly
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="" className="block font-semibold mb-1">{t("description.dashboard.web_url")}</label>
                            <input 
                                type="text" 
                                className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                placeholder="www.testing.com" 
                                defaultValue={company.website}
                                readOnly
                            />
                        </div>

                        <p className="font-semibold pb-1 text-primary w-full border-b border-primary mb-2">{t("description.dashboard.GIB_REGISTRATION_INFORMATION")}</p>

                        <div className="mb-4">
                            <label htmlFor="" className="block font-semibold mb-1 ">{t("description.dashboard.GIB_registration_date")}</label>
                            <input 
                                className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                type="text"
                                defaultValue={company.gib_registration_data}
                                readOnly
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="" className="block font-semibold mb-1 ">{t("description.dashboard.GIB_sender_alias")}</label>
                            <input 
                                type="text" 
                                className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                placeholder="GIB Sender Alias"
                                defaultValue={company.gib_sender_alias}
                                readOnly
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="" className="block font-semibold mb-1 ">{t("description.dashboard.GIB_receiver_alias")}</label>
                            <input 
                                type="text"
                                className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                placeholder="GIB Receiver Alias"
                                defaultValue={company.gib_receiver_alias}
                                readOnly
                            />
                        </div>

                        <p className="font-semibold pb-1 text-primary w-full border-b border-primary mb-2">{t("description.dashboard.E_SIGNATURE_INFORMATION")}</p>
                        
                        <div className="mb-4">
                            <label htmlFor="" className="block font-semibold mb-1 ">{t("description.dashboard.e_signature_method")}</label>
                            <input 
                                type="text" 
                                className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                placeholder="E-Signature Information"
                                defaultValue={company["e-signature_method"]}
                                readOnly
                            />
                        </div>
                        
                        {/* <p className="block font-semibold p-2 text-primary w-full border-b border-primary">XSLT INFORMATION</p>

                        <div className="p-2 space-y-2">
                            <p>urn:mail:defaultpk@edmbilisim.com.tr</p>
                            <p>urn:mail:defaultpk@edmbilisim.com.tr</p>
                            <p>urn:mail:defaultpk@edmbilisim.com.tr</p>
                        </div> */}

                        <p className="font-semibold pb-1 text-primary w-full border-b border-primary mb-2">{t("description.dashboard.UPDATE_DETAILS")}</p>

                        <div className="mb-4">
                            <label htmlFor="" className="block font-semibold mb-1 ">{t("description.dashboard.date_of_last_update")}</label>
                            <input 
                                type="text"
                                className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                defaultValue={company.date_of_last_update}
                                readOnly
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="" className="block font-semibold mb-1 ">{t("description.dashboard.last_update_user")}</label>
                            <input 
                                type="text"
                                className="w-full border border-[#D9D9D9] rounded p-2 focus:outline-primary focus:border-primary transition-all" 
                                defaultValue={company.last_update_user}
                                readOnly
                            />
                        </div>

                        <button onClick={handleClose} className="rounded bg-secondary text-white py-1 px-3 flex justify-center items-center">
                            {t("description.dashboard.close")}
                        </button>

                        {/* </form> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ViewCompany;
