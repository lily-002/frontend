import { CaretLeft } from "@phosphor-icons/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface DropdownLinksProps {
    icon: JSX.Element;
    title: string;
    collapse: boolean;
    links: {
        name: string;
        path: string;
        icon: JSX.Element;
    }[];
    className?: string;
    handleClose?: () => void;
}

interface TransObjectProps {
    [title: string]: string;
}

const DropdownLinks = ({ title, className, links, icon, collapse, handleClose }: DropdownLinksProps) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const { pathname } = useLocation();
    const { t } = useTranslation();

    const transObject: TransObjectProps = {
        "meaning": t("description.navigation.meaning"),
        "currency unit": t("description.navigation.currency_unit"),
        "my companies": t("description.navigation.my_companies"),
        "users": t("description.navigation.users"),
        "draft": t("description.navigation.draft"),
        "create invoice": t("description.navigation.create_invoice"),
        "create delivery note": t("description.navigation.create_delivery_note"),
        "producer receipts": t("description.navigation.producer_receipts"),
        "E-Ledger": t("description.navigation.E_Ledger"),
        "outgoing invoice": t("description.navigation.outgoing_invoice"),
        "outgoing":t("description.navigation.outgoing"),
        "archive": t("description.navigation.archive"),
        "outgoing delivery note": t("description.navigation.outgoing_delivery_note"),
        "outgoing producer receipt": t("description.navigation.outgoing_producer_receipt"),
    }
    

    const handleCloseModal = () => handleClose ? handleClose() : null;

    return (
        <>
            <div className={`mb-8 relative cursor-default ${className}`}>
                <div onClick={() => setShowDropdown(!collapse ? !showDropdown : false)} className="flex justify-start items-center gap-3 mb-2">
                    {icon}

                    <div className="w-full flex justify-between items-center gap-1">
                        <span className="capitalize">{transObject[title]}</span>
        
                        <CaretLeft size={14} weight="bold" className={`${showDropdown ? "-rotate-90" : ""} transition-all w-[14px] min-w-[14px]`} />
                    </div>
                </div>

                {/* Dropdown */}
                {
                    !collapse && links.length && showDropdown ? (
                        <ul className="w-full min-w-max bg-white text-[#333333] border rounded p-3">
                            {
                                links.map((link) => (
                                    <li key={link.path} className={`${pathname.includes(link.path) ? "" : "hover:bg-sky-100"} mb-2`}>
                                        <Link onClick={handleCloseModal}  to={link.path} className={`w-full flex justify-start items-center capitalize mb-1`}>
                                            <span className={`flex justify-start items-center gap-2 rounded-md  p-2 ${pathname.includes(link.path) ? "bg-primary text-white ml-8" : "hover:bg-sky-100"}`}>
                                                {link.icon}

                                                {transObject[link.name]}
                                            </span>
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    ) : null
                }
            </div>
        </>
    )
}

export default DropdownLinks