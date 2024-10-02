/* eslint-disable @typescript-eslint/no-explicit-any */
import logo from "../../../assets/logo/logo.png";
import eFaturaLogo from "../../../assets/images/fatura_logo.jpg";
import QRCode from "react-qr-code";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { CompanyProps, OutgoingInvoiceProps } from "../../../types/types";
import { X } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";


interface InvoiceTemplateProps {
    show: boolean;
    invoice: OutgoingInvoiceProps;
    company: CompanyProps;
    handleClose: () => void;
  }

const InvoiceTemplate = ({ show, invoice, company, handleClose }: InvoiceTemplateProps) => {
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

  if(!show){ return; }

  return (
    <div className={`w-full h-screen ${show ? "fixed" : "hidden"} top-0 left-0 bg-white p-4 overflow-y-scroll z-[100] transition-all`}>

      <div className="w-full h-[80px] border-b border-b-gray-200 p-2 text-[0.6rem] flex justify-between items-center gap-4">
        <button onClick={handlePrint}  className="rounded-md py-2 px-6 bg-secondary text-white flex justify-center items-center gap-1">
          {loading ? <span className="inline-block w-[16px] h-[16px] rounded-full border-2 border-white border-b-transparent animate-spin"></span> : null}
          <span>{t("description.invoices.save_as_pdf")}</span>
        </button>

        <span className="w-[30px] h-[30px] border rounded-full p-3 flex justify-center items-center cursor-pointer hover:bg-gray-100">
          <X onClick={handleClose} color="red" weight="bold" size={16} className="w-[16px] min-w-[16px] h-[16px]" />
        </span>
      </div>

      <div ref={contentToPrint} className={`w-full max-w-[1500px] min-h-[calc(100vh-80px)] mx-auto overflow-y-scroll text-[0.6rem] p-6`}>

          <div className="grid grid-cols-3 gap-4 justify-between items-center mb-4">
              {/* Logo */}
              <div>
                  <span className="inline-block w-[110px] h-[80px] overflow-hidden">
                      <img src={logo} alt="logo" className="w-full h-full object-contain" />
                  </span>

                  <p className="font-semibold text-[0.6rem]">{new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</p>
              </div>

              {/* Badge */}
              <div className="flex justify-center items-center">
                  <strong className="inline-block font-semibold text-xl">{t("description.invoices.e_document")}</strong>
              </div>

              {/* QR Code */}
              <div className="flex justify-end items-start">
                  <span className="inline-block w-[100px] h-[100px] border">
                  <QRCode
                  // size={100}
                  style={{ height: "100%", width: "100%", objectFit: "cover"}}
                  value={"https://econiasoft.com/invoice/1"}
                  // viewBox={`0 0 256 256`}
                  />
                  </span>
              </div>
          </div>

          {/* Headings */}
          <div className="grid grid-cols-3 gap-4 justify-between items-center text-[0.6rem] mb-4">
              <div className="border-t-2 border-t-gray-600 py-2 border-b-2 border-b-gray-600">
                <p className="mb-1 uppercase">{company.company_name}</p>
                <p className="mb-1">{company.tax_office}</p>
                <p className="mb-1">{company.tax_number}</p>
                <p className="mb-1">{t("description.invoices.address")}: {company.address}</p>
                <p className="mb-1">{t("description.invoices.phone")}: {company.phone_number}</p>
                {/* <p className="mb-1">Fax: {}</p> */}
                <p className="mb-1">{t("description.invoices.internet_address")}: {company.website}</p>
                <p>{t("description.invoices.email")}: {company.email}</p>
              </div>

              {/* Company logo */}
              <div className="flex justify-center items-center flex-col gap-1">
              <span className="inline-block w-[80px] h-[80px] border overflow-hidden rounded-full">
                  <img src={eFaturaLogo} alt="e_fatura_logo" className="w-full h-full object-cover" />
              </span>
              <span>{t("description.invoices.e_archive_invoice")}</span>
              </div>
          </div>

          {/*  */}
          <div className="grid grid-cols-3 gap-4 justify-between items-center text-[0.6rem] mb-6">
              <div className="border-b-2 border-b-gray-600 pb-2">
              <p className="font-bold mb-1">{t("description.invoices.DEAR")}</p>
              <p>{invoice.receiver_name}</p>
              <p>{t("description.invoices.phone")}: {invoice.receiver_phone}</p>
              <p>{t("description.invoices.email")}: {invoice.receiver_email}</p>
              <p>{t("description.invoices.web_address")}: {invoice.receiver_web}</p>
              </div>

              
              <div className="col-span-2 flex justify-end items-start self-end">
              <table className="border border-collapse">
                  <tbody>
                  <tr>
                      <th className="border border-gray-500 py-2 px-4 text-start">{t("description.invoices.customization_no")}:</th>
                      <th className="border border-gray-500 py-2 px-4 text-start">{t("description.invoices.TR12")}</th>
                  </tr>
                  <tr>
                      <th className="border border-gray-500 py-2 px-4 text-start">{t("description.invoices.scenario")}:</th>
                      <th className="border border-gray-500 py-2 px-4 text-start">{invoice.invoice_scenario}</th>
                  </tr>
                  <tr>
                      <th className="border border-gray-500 py-2 px-4 text-start">{t("description.invoices.invoice_type")}:</th>
                      <th className="border border-gray-500 py-2 px-4 text-start">{invoice.invoice_type}</th>
                  </tr>
                  <tr>
                      <th className="border border-gray-500 py-2 px-4 text-start">{t("description.invoices.invoice_no")}:</th>
                      <th className="border border-gray-500 py-2 px-4 text-start">{invoice.invoice_id}</th>
                  </tr>
                  <tr>
                      <th className="border border-gray-500 py-2 px-4 text-start">{t("description.invoices.invoice_date")}:</th>
                      <th className="border border-gray-500 py-2 px-4 text-start">{invoice.invoice_date}</th>
                  </tr>
                  </tbody>
              </table>
              </div>
          </div>

          {/*  */}
          <p className="mb-4"><strong>ETTN:</strong> {invoice.invoice_uuid}</p>
          {/* <div> */}
              <table className="w-full border border-gray-500 border-collapse">
                <thead>
                    <tr>
                        <th className="border border-gray-500 p-2 text-start">S/N</th>
                        <th className="border border-gray-500 p-2 text-start">{t("description.invoices.product_service")}</th>
                        <th className="border border-gray-500 p-2 text-start">{t("description.invoices.quantity")}</th>
                        <th className="border border-gray-500 p-2 text-start">{t("description.invoices.unit_price")}</th>
                        <th className="border border-gray-500 p-2 text-start">{t("description.invoices.discount_rate")}</th>
                        <th className="border border-gray-500 p-2 text-start">{t("description.invoices.discount_amount")}</th>
                        <th className="border border-gray-500 p-2 text-start">{t("description.invoices.VAT_rate")}</th>
                        <th className="border border-gray-500 p-2 text-start">{t("description.invoices.VAT_amount")}</th>
                        <th className="border border-gray-500 p-2 text-start">{t("description.invoices.product_service_amount")}</th>
                    </tr>
                </thead>

                <tbody>
                    {
                    invoice.products.map((product, index) => (
                        <tr key={product.id}>
                            <td className="border border-gray-500 p-2 text-start">{index + 1}</td>
                            <td className="border border-gray-500 p-2 text-start">{product.product_service}</td>
                            <td className="border border-gray-500 p-2 text-start">{product.quantity}</td>
                            <td className="border border-gray-500 p-2 text-start">{product.price}</td>
                            <td className="border border-gray-500 p-2 text-start">{product.decrease_increase[0].rate}</td>
                            <td className="border border-gray-500 p-2 text-start">{product.decrease_increase[0].amount}</td>
                            <td className="border border-gray-500 p-2 text-start">{product.decrease_increase[0].amount}</td>
                            <td className="border border-gray-500 p-2 text-start">{product.decrease_increase[0].amount}</td>
                            <td className="border border-gray-500 p-2 text-start">{product.decrease_increase[0].amount}</td>
                        </tr>
                    ))
                    }
                </tbody>
              </table>
          {/* </div> */}

          {/*  */}
          <div className="flex justify-end items-start self-end mb-6">
              <table className="border border-collapse">
                  <tbody>
                  <tr>
                      <th className="border border-gray-500 py-2 px-4 text-end">{t("description.invoices.total_product_service_amount")}:</th>
                      <th className="border border-gray-500 py-2 px-4 text-end">{(+invoice.total_products).toFixed(2)}</th>
                  </tr>
                  <tr>
                      <th className="border border-gray-500 py-2 px-4 text-end">{t("description.invoices.total_discount")}:</th>
                      <th className="border border-gray-500 py-2 px-4 text-end">{invoice.total_discount}</th>
                  </tr>
                  <tr>
                      <th className="border border-gray-500 py-2 px-4 text-end">{t("description.invoices.calculated_VAT")}:</th>
                      <th className="border border-gray-500 py-2 px-4 text-end">{invoice.total_taxes}</th>
                  </tr>
                  <tr>
                      <th className="border border-gray-500 py-2 px-4 text-end">{t("description.invoices.total_amount_including_VAT")}:</th>
                      <th className="border border-gray-500 py-2 px-4 text-end">{invoice.total_increase}</th>
                  </tr>
                  <tr>
                      <th className="border border-gray-500 py-2 px-4 text-end">{t("description.invoices.amount_to_be_paid")}:</th>
                      <th className="border border-gray-500 py-2 px-4 text-end">{invoice.bottom_total_discount_rate}</th>
                  </tr>
                  </tbody>
              </table>
          </div>

          {/*  */}
          <div className="border border-gray-500 p-6">
              Not: YALNIZ: DOKUZYUZYIRMIUC TL.
          </div>
          
      </div>
    </div>
  )
}


export default InvoiceTemplate;