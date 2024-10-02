/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks";
import AreaChartComponent from "./AreaChartComponent";
import BarChartComponent from "./BarChartComponent";
import DonutChartComponent from "./DonutChartComponent";
import { getOutgoingInvoices } from "../../../store/features/OutgoingInvoice";
import { getOutgoingDeliveries } from "../../../store/features/OutgoingDelivery";
import { useTranslation } from "react-i18next";

const Main = () => {
  const { outgoingInvoices } = useAppSelector(state => state.outgoingInvoices);
  const { outgoingDeliveries } = useAppSelector(state => state.outgoingDeliveries);
  const invoices = outgoingInvoices.filter(invoice => invoice.send_type === 1);
  const deliveries = outgoingDeliveries.filter(outgoingDelivery => outgoingDelivery.submission_type_id === 1);
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState("");

  const topGIBInvoiceType = [
    {name: t("description.dashboard.commercial_sales"), value: 580},
    {name: t("description.dashboard.commercial_returned"), value: 400},
    {name: t("description.dashboard.basic_sales"), value:388},
    {name: t("description.dashboard.commercial_withholding"), value: 300},
    {name: t("description.dashboard.export_broker"), value: 250},
    {name: t("description.dashboard.HKS_special_basis"), value: 200},
    {name: t("description.dashboard.commercial_exemption"), value: 150},
    {name: t("description.dashboard.exclusive_CHARGE"), value: 110},
    {name: t("description.dashboard.accompanied_invoice_exceptional"), value: 100}
  ];


  useEffect(() => {

    if(!outgoingInvoices.length){ dispatch(getOutgoingInvoices())}
    if(!outgoingDeliveries.length){ dispatch(getOutgoingDeliveries()) }

    if(currentLang !== i18n.language){
      setCurrentLang(i18n.language);
    }

  }, [dispatch, outgoingInvoices.length, outgoingDeliveries.length, i18n.language]);


  return (
    <>
      <h2 className="text-sm text-end mb-4">{t("description.dashboard.credit_balance")}: <span className="text-[#238DC1]">$2500</span> </h2>

      {/* Analytics */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
        <div className="border shadow-md rounded p-3 min-h-[160px] overflow-hidden">
          <AreaChartComponent title={t("description.dashboard.OUTGOING_INVOICES")} total={invoices.length} textColor="#0DA126" />
        </div>

        <div className="border shadow-md rounded p-3 min-h-[160px] overflow-hidden">
          <AreaChartComponent title={t("description.dashboard.OUTGOING_DELIVERING_NOTE")} total={deliveries.length} textColor="#238DC1" />
        </div>

        <div className="border shadow-md rounded p-3 min-h-[160px] overflow-hidden md:col-span-2">
          <BarChartComponent />
        </div>

      </div>

      {/* Recently sent & received invoices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        <div className="min-h-[250px] border shadow-md overflow-hidden">
          <div className="w-full font-semibold border-b py-2 px-6">{t("description.dashboard.TOP_GIB_INVOICE_TYPE")}</div>

          <div className="py-4 px-6">
            {
              topGIBInvoiceType.map(item => (
                <div key={item.name} className="grid grid-cols-3 gap-2 justify-between items-start mb-4">
                    <p className="col-span-2">{item.name}</p>
                    <span className="inline-block text-end">{item.value}</span>
                </div>
              ))
            }
          </div>

        </div>

        <div className="min-h-[250px] border shadow-md overflow-hidden">
          <div className="w-full font-semibold border-b py-2 px-6">{t("description.dashboard.INVOICE_SEND_TYPE")}</div>
          {
            currentLang === i18n.language ? (
              <DonutChartComponent />
            ) : null
          }
        </div>
      </div>
    
    </>
  )
}

export default Main;