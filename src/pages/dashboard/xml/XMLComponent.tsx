import { X } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useReactToPrint } from "react-to-print";
import XMLViewer from "react-xml-viewer";

interface XMLProps {
  show: boolean;
  XMLText: string;
  title?: string;
  handleClose: () => void;
}

const XMLComponent = ({show, XMLText, title, handleClose}: XMLProps) => {
  const contentToPrint = useRef(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();


  const handlePrint = useReactToPrint({
    content: () => contentToPrint.current,
    documentTitle: "ATAFOM-Invoice",
    onBeforePrint: () => setLoading(true),
    onAfterPrint: () => setLoading(false),
    removeAfterPrint: true
  });

  return (
    <div className={`w-full h-screen ${show ? "fixed" : "hidden"} top-0 left-0 bg-white p-6 overflow-y-scroll z-[100] transition-all`}>
      <div className="flex justify-between items-center gap-2 border-b mb-4 pb-2">
        <h2 className="font-semibold text-primary">{title}</h2>
        
        <span className="w-[30px] h-[30px] border rounded-full p-3 flex justify-center items-center cursor-pointer hover:bg-gray-100">
          <X onClick={handleClose} color="red" weight="bold" size={16} className="w-[16px] min-w-[16px] h-[16px]" />
        </span>
      </div>

      <div ref={contentToPrint} className="mb-4">
        <XMLViewer xml={XMLText} />
      </div>

      <div className="w-full h-[80px] text-[0.8rem] flex justify-end items-center">
        <button onClick={handlePrint}  className="rounded-md py-2 px-6 bg-secondary text-white flex justify-center items-center gap-1">
          {loading ? <span className="inline-block w-[16px] h-[16px] rounded-full border-2 border-white border-b-transparent animate-spin"></span> : null}
          <span>{t("description.dashboard.save_as_pdf")}</span>
        </button>
      </div>
    </div>
  )
}

export default XMLComponent;