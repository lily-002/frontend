/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import useRoles from "../../../authentication/useRoles";
import { dashboardSideLinks } from "../../../data/data";
import DropdownLinks from "../components/DropdownLinks";

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


interface SideNavProps {
  collapse: boolean;
}

const SideNav = ({ collapse }: SideNavProps) => {
  const roles = useRoles();
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

  const filteredSideLinks = (() => {
    if(roles && roles.includes("admin")){ return dashboardSideLinks }

    const sideLinks = {...dashboardSideLinks};
    delete sideLinks.meaning;
    return sideLinks;
  })();

  return (
    <>
      <div className="w-full h-[100px] border-2 border-primary bg-white flex justify-center items-center mb-6">
        <Link to="/" className="inline-block w-[130px] h-auto">
          <img src={logo} alt="Logo" className="w-full h-full object-contain" />
        </Link>
      </div>

      <div className="pb-4 px-4">
        <Link to="/dashboard" className="flex justify-start items-center gap-3 mb-8">
          <span className="inline-block w-[20px] min-w-[20px] h-[20px] overflow-hidden"
            style={{backgroundImage: `url(${dashboardIcon})`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
          </span>
          <span>{t("description.navigation.dashboard")}</span>
        </Link>

        {
          Object.keys(filteredSideLinks).map((sideLinkTitle) => (
            <DropdownLinks
              key={sideLinkTitle}
              icon={linkIcons[sideLinkTitle]}
              title={sideLinkTitle}
              collapse={collapse}
              links={filteredSideLinks[sideLinkTitle]}
            />
          ))
        }

        <Link to="/dashboard/e-ledgers" className="flex justify-start items-center gap-3 mb-8">
          <span className="inline-block w-[20px] min-w-[20px] h-[20px] overflow-hidden"
            style={{backgroundImage: `url('${eLedgerIcon}')`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
          </span>
          <span>{t("description.navigation.E_Ledger")}</span>
        </Link>

        <Link to="/dashboard/buy-credit" className="flex justify-start items-center gap-3">
          <span className="inline-block w-[20px] min-w-[20px] h-[20px] overflow-hidden"
            style={{backgroundImage: `url('${i18n.language === "en" ? creditIconEn : creditIconTr}')`, backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
          </span>
          <span>{t("description.navigation.buy_credit")}</span>
        </Link>
      </div>
    </>
  )
}

export default SideNav