/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import DropdownLinks from "./DropdownLinks";
import { dashboardSideLinks } from "../../../data/data";

// Icons
import logo from "../../../assets/logo/logo.png";
import dashboardIcon from "../../../assets/icons/Dashboard.png";
import meaningIcon from "../../../assets/icons/Meaning.png";
import draftIcon from "../../../assets/icons/Draft.png";
import invoiceIcon from "../../../assets/icons/Create invoice.png";
import deliveryIcon from "../../../assets/icons/Create Delivery.png";

import eLedgerIcon from "../../../assets/icons/E-ledger.png";
import creditIconEn from "../../../assets/icons/Buy Credi - En.png";
import creditIconTr from "../../../assets/icons/Buy Credi - Tr.png";
import producerIcon from "../../../assets/icons/Producer Receipt.png";
import { useTranslation } from "react-i18next";


interface MobileMenuProps {
    showMobileMenu: boolean;
    handleClose: () => void;
}

const MobileMenu = ({ showMobileMenu, handleClose }: MobileMenuProps) => {
    const { t, i18n } = useTranslation();

    const linkIcons: any = {
        "meaning": <span className="inline-block w-[20px] min-w-[20px] h-[20px] overflow-hidden" style={{backgroundImage: `url('${meaningIcon}')`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}></span>,
        "draft": <span className="inline-block w-[20px] min-w-[20px] h-[20px] overflow-hidden" style={{backgroundImage: `url('${draftIcon}')`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}></span>,
        // "invoice received": <ArchiveTray size={20} color="#fff" weight="regular" className="w-[20px] min-w-[20px]" />,
        "outgoing invoice": <span className="inline-block w-[20px] min-w-[20px] h-[20px] overflow-hidden" style={{backgroundImage: `url('${invoiceIcon}')`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}></span>,
        "outgoing delivery note": <span className="inline-block w-[20px] min-w-[20px] h-[20px] overflow-hidden" style={{backgroundImage: `url('${deliveryIcon}')`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}></span>,
        // "incoming delivery note": <Notebook size={20} color="#fff" weight="regular" className="w-[20px] min-w-[20px]" />,
        "outgoing producer receipt": <span className="inline-block w-[20px] min-w-[20px] h-[20px] overflow-hidden" style={{backgroundImage: `url('${producerIcon}')`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}></span>,
    }

    const handleModalClose = (ev: any) => {
        const target = ev.target as HTMLDivElement;
        if(target.className.includes("parent")){ return handleClose(); }
    }

    return (
    <div onClick={handleModalClose} className={`parent w-full h-screen bg-[#00000080] ${showMobileMenu ? "" : "hidden"} overflow-hidden fixed top-0 left-0 z-50 transition-all`}>
        <div className="w-[280px] h-screen bg-primary text-white text-xs absolute top-0 left-0 pb-4 overflow-hidden transition-all delay-75">
            <div className="w-full h-[100px] border-2 border-primary bg-white flex justify-center items-center mb-6">
                <Link to="/" className="inline-block w-[130px] h-auto">
                <img src={logo} alt="Logo" className="w-full h-full object-contain" />
                </Link>
            </div>

            <div className="px-4">
                <Link onClick={handleClose} to="/dashboard" className="flex justify-start items-center gap-3 mb-5">
                    <span className="inline-block w-[20px] min-w-[20px] h-[20px] overflow-hidden"
                        style={{backgroundImage: `url(${dashboardIcon})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
                    </span>
                    <span>{t("description.navigation.dashboard")}</span>
                </Link>

                {
                    Object.keys(dashboardSideLinks).map((sideLinkTitle) => (
                    <DropdownLinks
                        key={sideLinkTitle}
                        icon={linkIcons[sideLinkTitle]}
                        title={sideLinkTitle}
                        collapse={false}
                        links={dashboardSideLinks[sideLinkTitle]}
                        handleClose={handleClose}
                    />
                    ))
                }

                <Link onClick={handleClose} to="/dashboard/e-ledgers" className="flex justify-start items-center gap-3 mb-5">
                    <span className="inline-block w-[20px] min-w-[20px] h-[20px] overflow-hidden"
                        style={{backgroundImage: `url('${eLedgerIcon}')`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
                    </span>
                    <span>{t("description.navigation.E_Ledger")}</span>
                </Link>

                <Link onClick={handleClose} to="/dashboard/buy-credit" className="flex justify-start items-center gap-3 mb-5">
                    <span className="inline-block w-[20px] min-w-[20px] h-[20px] overflow-hidden"
                        style={{backgroundImage: `url('${i18n.language === "en" ? creditIconEn : creditIconTr}')`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
                    </span>
                    <span>{t("description.navigation.buy_credit")}</span>
                </Link>
            </div>
        </div>
    </div>
    )
}

export default MobileMenu;