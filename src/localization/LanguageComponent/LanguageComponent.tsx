/* eslint-disable @typescript-eslint/no-floating-promises */
import { useState } from "react";
import { useTranslation } from "react-i18next";

// Images/icons
import globalIcon from "../../assets/svg/languages.png";

const LanguageComponent = () => {
    const [showLang, setShowLang] = useState(false);
    const { i18n } = useTranslation();

    const handleChangeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        setShowLang(false);
    }

    return (
        <div tabIndex={0} onBlur={() => setShowLang(false)} className={`border bg-white rounded flex justify-start items-center gap-2 whitespace-nowrap ${showLang ? "w-[178px]" : "w-[47px]"} fixed right-[10px] bottom-[10px] overflow-hidden z-[100] transition-all ease-linear duration-300 p-2`}>
            <span onClick={() => setShowLang(true)} className="w-[30px] min-w-[30px] h-[30px] flex justify-center items-center rounded cursor-pointer">
                <img src={globalIcon} alt="Icon" className="w-full h-full object-contain" />
            </span>

            <div className="flex justify-start items-center gap-3">
                <span onClick={() => handleChangeLanguage("en")} className={`inline-block ${i18n.language === "en" ? "opacity-50 cursor-default" : "opacity-100 cursor-pointer"} transition-all`}>English</span>
                <span onClick={() => handleChangeLanguage("tr")} className={`inline-block ${i18n.language === "tr" ? "opacity-50 cursor-default" : "opacity-100 cursor-pointer"} transition-all`}>Türkçe</span>
            </div>
        </div>
    )
}

export default LanguageComponent;