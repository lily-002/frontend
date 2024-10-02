/* eslint-disable @typescript-eslint/no-explicit-any */
import { X } from "@phosphor-icons/react";
import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";

interface GlobalSearchProps {
    show: boolean;
    handleClose: () => void;
}

const GlobalSearch = ({show, handleClose}: GlobalSearchProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const { t } = useTranslation();

    const handleSearch = (ev: FormEvent) => {
        ev.preventDefault();

    }

    const onClose = () => {
        setSearchQuery("");
        return handleClose();
    }

    const handleParentClose = (ev: any) => {
        if(ev.target.tagName === "DIV" && ev.target.className.includes("search")) { return onClose();}
    }


    return (
        <div onClick={handleParentClose} className={`search w-full h-screen p-6 ${show ? "fixed" : "hidden"} top-0 left-0 bg-[#000000CC] flex justify-center items-start z-[70] transition-all`}>
            <div className="w-full md:max-w-[400px] rounded overflow-hidden">
                {/* Input search box */}
                <form onSubmit={handleSearch} className="w-full bg-white flex justify-start items-center gap-0">
                    <input type="search" value={searchQuery} onChange={(ev) => setSearchQuery(ev.target.value)}
                        placeholder="Search..."
                        className="w-full h-full border focus:bg-gray-100 outline-none py-2 px-4 transition-all text-sm"
                    />

                    <span onClick={onClose} className="inline-block border bg-gray-50 text-[#333333] hover:text-primary py-2 px-4 h-full cursor-pointer"><X size={20} weight="bold" /></span>
                </form>

                {/* Display Modal */}
                <div className={`w-full h-[300px] bg-white overflow-y-auto p-2 transition-all ${searchQuery ? "block" : "hidden"}`}>
                    <p className="text-center text-sm text-secondary">{t("description.messages.no_record_found")}</p>
                </div>
            </div>
        </div>
    )
}

export default GlobalSearch;