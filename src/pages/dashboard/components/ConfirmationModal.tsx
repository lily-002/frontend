import { X } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

interface ConfirmationModalProps {
  show: boolean;
  message: string;
  loading: boolean;
  handleProceed: () => void;
  handleCancel: () => void;
}

const ConfirmationModal = ({show, message, loading, handleProceed, handleCancel}: ConfirmationModalProps) => {
  const { t } = useTranslation()

  return (
    <div className={`w-full h-screen bg-[#00000099] text-white fixed top-0 left-0 z-50 ${show ? "flex" : "hidden"} justify-center items-center p-4 transition-all`}>
        <div className="w-full max-w-[300px] bg-white text-[#333333] text-sm text-center rounded-md p-8 mx-auto relative">
            <h2 className="mb-6">{message}</h2>
            
            <div className="flex justify-center items-center gap-4 flex-wrap text-xs">
                <button onClick={handleProceed} className="rounded-full py-2 px-8 bg-[#238DC1] text-white flex justify-center items-center gap-1">
                  {loading ? <span className="inline-block w-[14px] min-w-[14px] h-[14px] rounded-full border-2 border-b-transparent border-white animate-spin"></span> : null}
                  <span>{t("description.messages.yes")}</span>
                </button>
                <button onClick={handleCancel} className="rounded-full py-2 px-8 bg-[#FF0000] text-white">{t("description.messages.no")}</button>
            </div>

            {/* Close button */}
            <span onClick={handleCancel} className="w-[25px] min-w-[25px] h-[25px] rounded-full absolute top-2 right-2 z-10 flex justify-center items-center hover:bg-gray-200 cursor-pointer">
                <X size={16} color="#333333" weight="bold" />
            </span>
        </div>
    </div>
  )
}

export default ConfirmationModal;