/* eslint-disable @typescript-eslint/no-explicit-any */
import { User, X } from "@phosphor-icons/react";
// import UserRole from "./UserRole";
import { UserProps } from "../../../../types/types";
import { useTranslation } from "react-i18next";

interface AddUserProps {
  show: boolean;
  user: UserProps;
  closeModal: () => void;
}


const ViewUser = ({ show, user, closeModal }: AddUserProps) => {
  const { t } = useTranslation();


  const handleClose = (ev: any) => {
    const target = ev.target as HTMLDivElement;
    if (target.tagName === "DIV" && target.className.includes("parent")) {
      closeModal();
    }
  };


//   To avoid id collision with Add User component.
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
            <span className="inline-block font-bold text-xs capitalize">{t("description.dashboard.view_user")}</span>
          </div>

          <span className="flex justify-center items-center w-[22px] min-w-[22px] h-[22px] rounded-full hover:bg-gray-100 ">
            <X size={16} weight="bold" className="cursor-pointer" onClick={closeModal} />
          </span>
        </div>

        <div className="text-xs p-4">
          <h4 className=" text-primary font-semibold pb-2 border-b border-primary mb-4">{t("description.dashboard.USER_INFORMATION")}</h4>

          <div className="mb-4">
            <label htmlFor="name" className="block font-semibold mb-2">{t("description.dashboard.full_name")}<span className="text-red-500">*</span></label>
            <input type="text" id="name"
              placeholder="Enter user full name"
              className="w-full border-2 rounded outline-primary transition-all p-2"
              defaultValue={user.name}
              readOnly
            />
          </div>

          <div className="mb-4">
            <label htmlFor="username" className="block font-semibold mb-2">{t("description.auth.username")}<span className="text-red-500">*</span></label>
            <input type="text" id="username"
              placeholder="Enter username"
              className="w-full border-2 rounded outline-primary transition-all p-2"
              defaultValue={user.username}
              readOnly
            />
          </div>

          <div className="mb-4">
            <label htmlFor="company" className="block font-semibold mb-2">{t("description.dashboard.company")}<span className="text-red-500">*</span></label>
            <input type="text" id="company"
              placeholder="Enter company"
              className="w-full border-2 rounded outline-primary transition-all p-2"
              defaultValue={user.company_name}
              readOnly
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block font-semibold mb-2">{t("description.auth.email")}<span className="text-red-500">*</span></label>
            <input type="email" id="email"
              placeholder="johndoe@email.com"
              className="w-full border-2 rounded outline-primary transition-all p-2"
              defaultValue={user.email}
              readOnly
            />
          </div>

          <div className="flex justify-start text-nowrap item-center gap-4 flex-wrap mb-4">
            <p>{t("description.dashboard.allow_email_notifications_for")}:</p>
            
            <div className="flex justify-start items-center gap-1">
              <input
                type="checkbox"
                id="eInvoice"
                className="w-[14px] h-[14px] text-nowrap accent-primary"
                checked={user.notification_einvoice ? true : false}
                readOnly
              />
              <label htmlFor="eInvoice">{t("description.dashboard.e_invoice")}</label>
            </div>
            
            <div className="flex justify-start items-center gap-1">
              <input
                type="checkbox"
                id="eDispatch"
                className="w-[14px] h-[14px] text-nowrap accent-primary"
                checked={user.notification_edispatch ? true : false}
                readOnly
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
              defaultValue={user.luca_username}
              readOnly
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lucaMemberNumber" className="block font-semibold mb-2">{t("description.dashboard.luca_member_number")}</label>
            <input
              type="text" id="lucaMemberNumber"
              placeholder="Enter luca member number"
              className="w-full border-2 rounded outline-primary transition-all p-2"
              defaultValue={user.luca_member_number}
              readOnly
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 justify-between items-start gap-4 mb-4">
            <div>
              <label className="block font-semibold mb-1" htmlFor="recoveryPhoneNumber">{t("description.auth.phone_number")} <span className="text-primary">({t("description.dashboard.recovery")})</span></label>
              <input
                type="phone" id="recoveryPhoneNumber"
                className="w-full border-2 rounded outline-primary transition-all p-2"
                placeholder="+234123456789"
                defaultValue={user.phone}
                readOnly
              />
            </div>

            <div>
              <label className="block font-semibold mb-1" htmlFor="mobile">{t("description.dashboard.mobile_number")}</label>
              <input
                type="phone" id="mobile"
                className="w-full border-2 rounded outline-primary transition-all p-2"
                placeholder="+234123456789"
                defaultValue={user.mobile}
                readOnly
              />
            </div>
          </div>

          <div className="flex  justify-start text-nowrap item-center gap-4 flex-wrap md:flex-nowrap mb-4">
            
            <p className="text-nowrap font-bold">{t("description.dashboard.restriction_for_invoice")}</p>

            <div className="flex justify-start items-start gap-4 flex-wrap">
              <div className="flex justify-start items-center gap-1">
                <input
                  type="checkbox"
                  id="exportOnly"
                  className="w-[14px] h-[14px] text-nowrap accent-primary"
                  checked={user.export_only ? true : false}
                  readOnly
                />
                <label htmlFor="exportOnly">{t("description.dashboard.expert_only")}</label>
              </div>

              <div className="flex justify-start items-center gap-1">
                <input
                  type="checkbox"
                  id="eArchive"
                  className="w-[14px] h-[14px] text-nowrap accent-primary"
                  checked={user.earchive ? true : false}
                  readOnly
                />
                <label htmlFor="eArchive">{t("description.dashboard.e_archive")}</label>
              </div>

              <div className="flex justify-start items-center gap-1">
                <input
                  type="checkbox"
                  id="eInvoiceOnly"
                  className="w-[14px] h-[14px] text-nowrap accent-primary"
                  checked={user.einvoice_only ? true : false}
                  readOnly
                />
                <label htmlFor="eInvoiceOnly">{t("description.dashboard.e_invoice_only")}</label>
              </div>

              <div className="flex justify-start items-center gap-1">
                <input
                  type="checkbox"
                  id="SSI"
                  className="w-[14px] h-[14px] text-nowrap accent-primary"
                  checked={user.ssi_only ? true : false}
                  readOnly
                />
                <label htmlFor="SSI">{t("description.dashboard.SSI_only")}</label>
              </div>
            </div>              
          </div>

          {/* Close */}
          <span onClick={closeModal} className="inline-block bg-secondary text-white font-semibold rounded py-2 px-4 cursor-pointer">
            <span>{t("description.dashboard.close")}</span>
          </span>

        </div>
      </div>

    </div>
  );
};

export default ViewUser;
