/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { FilePdf, MicrosoftExcelLogo, Trash } from "@phosphor-icons/react";
// import Pagination from "../../components/Pagination";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks/hooks";
import { getOutgoingInvoices, removeInvoice } from "../../../../store/features/OutgoingInvoice";
import { useTranslation } from "react-i18next";
import { axiosInstance } from "../../../../api/api";
import { getToken } from "../../../../services/auth";
import Loader from "../../../../components/Loader/Loader";
import XMLComponent from "../../xml/XMLComponent";
import InvoiceTemplate from "../../invoices/InvoiceTemplate";
import { CompanyProps, OutgoingInvoiceProps } from "../../../../types/types";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";

import xmlLogo from "../../../../assets/svg/xml.svg";


const OutgoingInvoiceArchive = () => {
  const { outgoingInvoices, loading, message } = useAppSelector(state => state.outgoingInvoices);
  // const [archiveInfo, setArchiveInfo] = useState({show: false, message: "", loading: false});
  const invoices = outgoingInvoices.filter(invoice => invoice.send_type === 2);
  const [selectedIDs, setSelectedIDs] = useState<number[]>([]);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [XMLInfo, setXMLInfo] = useState({show: false, loading: false, id: "", data: ""});
  const [PDFInfo, setPDFInfo] = useState({
    show: false, loading: false, id: "", 
    invoice: {} as OutgoingInvoiceProps, 
    company: {} as CompanyProps
  });
  const [deleteInfo, setDeleteInfo] = useState({show: false, id: "", loading: false});


  useEffect(() => {

    if(!outgoingInvoices.length){ dispatch(getOutgoingInvoices())}

  }, [outgoingInvoices.length]);

  const handleCheckAll = () => selectedIDs.length === invoices.length ? setSelectedIDs([]) : setSelectedIDs(invoices.map(inv => inv.id as number));

  const handleCheck = (val: number) => {
    if(selectedIDs.includes(val)) {
      setSelectedIDs(selectedIDs.filter(id => id !== val));
      return;
     }
     
    setSelectedIDs([...selectedIDs, val]);
  }


  // const onTakeFromArchive = () => {
  //   if(!selectedIDs.length){return toast.warning(t("description.dashboard.no_record_selected"))}
  //   setArchiveInfo({...archiveInfo, message: t("description.dashboard.the_delivery_notes_from_the_archive_that_you_"), show: true});
  // }

  // const handleTakeFromArchive = () => {
  //   if(archiveInfo.loading){ return; }

  //   setArchiveInfo({...archiveInfo, loading: true});
  //   return setTimeout(() => {
  //   toast.success(t("description.dashboard.successful"), {autoClose: 4000, pauseOnHover: false});
  //   setSelectedIDs([]);
  //   return setArchiveInfo({show: false, message: "", loading: false});
  //   }, 4000);
  // }

  const handleViewXML = async (id: number | string) => {
    if(XMLInfo.loading){ return; }

    setXMLInfo({...XMLInfo, loading: true});
    try {
      
      const { data } = await axiosInstance.get(`/user/invoice/ubl/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${getToken()}`
        }
      });

      // console.log("Data: ", data);
      // return; 

      if(data.status){
        toast.success(data.message, {autoClose: 2000, pauseOnHover: false});
        setXMLInfo({...XMLInfo, show: true, data: data.data, loading: false});
        return;
      }
      
      setXMLInfo({...XMLInfo, loading: false});
      return toast.error(data.message, {autoClose: 4000, pauseOnHover: false});
      
    } catch (error: any) {
      setXMLInfo({...XMLInfo, loading: false});
      return toast.error(error.response ? error.response.data?.error || error.response?.data?.message : "Something went wrong, try again later.");
    }
  }

  const handleViewPdf = async (invoice: OutgoingInvoiceProps) => {
    // console.log(invoice);

    setPDFInfo({...PDFInfo, loading: true});
    try {
      
      const { data } = await axiosInstance.get(`/user/company`, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${getToken()}`
        }
      });

      // console.log("Data: ", data);
      // return; 

      if(data.status){
        // toast.success(data.message, {autoClose: 2000, pauseOnHover: false});
        setPDFInfo({...PDFInfo, show: true, invoice, company: data.data, loading: false});
        return;
      }
      
      setPDFInfo({...PDFInfo, loading: false});
      return toast.error(data.message, {autoClose: 4000, pauseOnHover: false});
      
    } catch (error: any) {
      setPDFInfo({...PDFInfo, loading: false});
      return toast.error(error.response ? error.response.data?.error || error.response?.data?.message : "Something went wrong, try again later.");
    }
  }

  const handleDeleteInvoice = async (id: number | string) => {
    if(deleteInfo.loading){ return; }

    setDeleteInfo({...deleteInfo, show: false, loading: true});
    try {
      
      const { data } = await axiosInstance.delete(`/user/invoice/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${getToken()}`
        }
      });

      // console.log("Data: ", data);
      // return; 

      if(data.status){
        toast.success(data.message, {autoClose: 2000, pauseOnHover: false});
        setDeleteInfo({...deleteInfo, show: false, loading: false});
        dispatch(removeInvoice({ id }));
        return;
      }
      
      setPDFInfo({...PDFInfo, loading: false});
      return toast.error(data.message, {autoClose: 4000, pauseOnHover: false});
      
    } catch (error: any) {
      setPDFInfo({...PDFInfo, loading: false});
      return toast.error(error.response ? error.response.data?.error || error.response?.data?.message : "Something went wrong, try again later.");
    }
  }

  const generateExcel = () => {
    const ws = XLSX.utils.json_to_sheet(invoices.map(invoice => (
      {
        [t("description.dashboard.GIB_invoice_type")]: invoice.invoice_type,
        [t("description.dashboard.customer_name")]: invoice.receiver_name,
        [t("description.dashboard.payment_method")]: invoice.payment_means,
        [t("description.dashboard.total_paid")]:+invoice.total_discount + +invoice.total_increase + +invoice.total_products + +invoice.total_taxes,
        [t("description.dashboard.customer_tax_number")]: invoice.tax_number,
        [t("description.dashboard.invoice_date")]: invoice.invoice_date,
        [t("description.dashboard.invoice_ID")]: invoice.invoice_id,
        [t("description.dashboard.status")]: "Successful",
        [t("description.dashboard.invoice_UUID")]: invoice.invoice_uuid,
        [t("description.dashboard.creation_date")]: new Date(invoice.created_at).toDateString()
      }
    )));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "EConiaSoft e-archive.xlsx");
  };

  const exportJsonToPdf = () => {
    const doc = new jsPDF() as any;

    doc.autoTable({
      head: [[
        t("description.dashboard.GIB_invoice_type"),
        t("description.dashboard.customer_name"),
        t("description.dashboard.payment_method"),
        t("description.dashboard.total_paid"),
        t("description.dashboard.customer_tax_number"),
        t("description.dashboard.invoice_date"),
        t("description.dashboard.invoice_ID"),
        t("description.dashboard.status"),
        t("description.dashboard.invoice_UUID"),
        t("description.dashboard.creation_date")
      ]],
      body: invoices.map(invoice => [
        invoice.invoice_type,
        invoice.receiver_name,
        invoice.payment_means,
        +invoice.total_discount + +invoice.total_increase + +invoice.total_products + +invoice.total_taxes,
        invoice.tax_number,
        invoice.invoice_date,
        invoice.invoice_id,
        "Successful",
        invoice.invoice_uuid,
        new Date(invoice.created_at).toDateString()
      ]),
      headStyles: {
        fillColor: "#238DC1",
        lineWidth: 0.1,
        lineColor:  "#238DC1",
        fontSize: 5
      },
      bodyStyles: {
        lineWidth: 0.1,
        fontSize: 5
      }
    });

    doc.save('EConiaSoft e-archive.pdf');
  };


  return (
    <>

      { XMLInfo.loading || PDFInfo.loading || deleteInfo.loading ? <Loader message="Processing..." /> : null }

      <XMLComponent 
          show={XMLInfo.show}
          XMLText={XMLInfo.data}
          title={t("description.invoices.E_Archive_XML")}
          handleClose={() => setXMLInfo({...XMLInfo, show: false, data: "", id: ""})}
      />

      {/* Invoice PDF Generating Component */}
      <InvoiceTemplate
        show={PDFInfo.show}
        invoice={PDFInfo.invoice}
        company={PDFInfo.company}
        handleClose={() => setPDFInfo({...PDFInfo, show: false, invoice: {} as OutgoingInvoiceProps, company: {} as CompanyProps})}
      />



      {/* Archive Modal */}
      {/* <ConfirmationModal 
        show={archiveInfo.show}
        message={archiveInfo.message}
        loading={archiveInfo.loading}
        handleProceed={handleTakeFromArchive}
        handleCancel={() => setArchiveInfo({show: false, message: "", loading: false})}
      /> */}


      {/* Delete Modal */}
      <ConfirmationModal 
        show={deleteInfo.show}
        message={t("description.dashboard.did_you_want_to_delete_this_invoice")}
        loading={deleteInfo.loading}
        handleProceed={() => handleDeleteInvoice(deleteInfo.id)}
        handleCancel={() => setDeleteInfo({...deleteInfo, show: false, id: "", loading: false})}
      />

      <h2 className="font-bold text-sm mb-2">{t("description.dashboard.OUTGOING_INVOICE_RECEIPT_ARCHIVE")}</h2>
      <p className="text-xs mb-4">{t("description.dashboard.outgoing_invoice_receipt")}</p>

      {loading ? <div className="w-[50px] h-[50px] rounded-full border-[6px] border-primary border-b-transparent animate-spin mt-6 mx-auto"></div> : null}
      {!loading && message ? (<p className="text-[#F16021] bg-[#f15f213c] text-center mx-auto mt-12 p-2 rounded">{message}</p>) : null}
      {!loading && !message ? (
          invoices.length ? (
            <>
              {/* <div className="w-full border border-[#D9D9D9] rounded-md p-4 text-xs mb-4">
                <div className="flex justify-start items-center gap-4 flex-wrap mb-3">
                  <div className="flex justify-start items-center gap-1">
                    <input type="radio" name="printer" id="sendToPrinter"
                      className="w-[13px] h-[13px] accent-primary"
                    />
                    <label htmlFor="sendToPrinter">{t("description.dashboard.send_to_printer")}</label>
                  </div>

                  <div className="flex justify-start items-center gap-1">
                    <input type="radio" name="printer" id="dontsendToPrinter"
                      className="w-[13px] h-[13px] accent-primary"
                    />
                    <label htmlFor="dontsendToPrinter">{t("description.dashboard.do_not_send_to_printer")}</label>
                  </div>

                  <div className="flex justify-start items-center gap-1">
                    <input type="radio" name="printer" id="all"
                      className="w-[13px] h-[13px] accent-primary"
                    />
                    <label htmlFor="all">{t("description.dashboard.all")}</label>
                  </div>
                </div>
              </div> */}

              {/* <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 text-xs mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:col-span-2 xl:col-span-3">
                  <input type="text" name="customerName"
                    className="border border-[#D9D9D9] rounded outline-primary transition-all p-2"
                    placeholder="Customer Name or Tax Number"
                  />

                  <input type="text" name="invoiceID"
                    className="border border-[#D9D9D9] rounded outline-primary transition-all p-2"
                    placeholder="Invoice ID"
                  />

                  <input type="date" name="invoiceStartDate"
                    className="border border-[#D9D9D9] rounded outline-primary transition-all p-2"
                    // placeholder="Invoice ID"
                  />

                  <input type="date" name="invoiceEndDate"
                    className="border border-[#D9D9D9] rounded outline-primary transition-all p-2"
                    // placeholder="Invoice ID"
                  />
                </div>

                <div>
                  <div className="flex justify-start items-center gap-4">
                    <ArrowsClockwise size={20} weight="regular" className="cursor-pointer" />
                    
                    <div className="border rounded-md flex justify-start items-center gap-2 py-1 px-2 cursor-pointer">
                      <FunnelSimple size={20} />
                      <span>{t("description.dashboard.filter")}</span>
                    </div>
                  </div>
                </div>
              </div> */}

              <div className="w-full min-h-[200px] bg-white text-[#333333] border shadow-md p-3">
                {/* Icons */}
                <div className="flex justify-between items-center gap-4 flex-wrap mb-5">
                  <div className="flex justify-start items-center gap-2 flex-wrap">
                    <span title="Excel" onClick={generateExcel}>
                      <MicrosoftExcelLogo size={20} color="green" weight="regular" className="cursor-pointer" />
                    </span>

                    <span title="PDF" onClick={exportJsonToPdf}>
                      <FilePdf size={20} color="red" weight="regular" className="cursor-pointer" />
                    </span>

                    {/* <span title="Printer">
                      <Printer size={20} color="#333333" weight="regular" className="cursor-pointer" />
                    </span>

                    <span title="Message">
                      <EnvelopeSimple size={20} color="#333333" weight="regular" className="cursor-pointer" />
                    </span>

                    <span title="Download">
                      <DownloadSimple size={20} color="#333333" weight="regular" className="cursor-pointer" />
                    </span> */}
                  </div>

                  {/* <div className="flex justify-start items-center gap-2 flex-wrap text-xs">
                    <span title="Reload">
                      <ArrowsClockwise size={20} color="#333333" weight="regular" className="cursor-pointer" />
                    </span>
                    
                    <button className="rounded-lg bg-primary text-white py-1 px-3">{t("description.dashboard.take_from_archive")}</button>
                  </div> */}
                </div>

                {/* Table */}
                <div className="w-full overflow-x-scroll mb-4">
                    <table className="w-full table-auto text-xs mb-3">
                      <thead className="whitespace-nowrap">
                        <tr className="bg-[#F3FAFF]">
                          <th className="p-3 text-start border border-primary">
                            <input type="checkbox"
                              className="w-[14px] h-[14px] accent-primary"
                              value={"all"}
                              onChange={() => handleCheckAll()}
                              checked={(selectedIDs.length === invoices.length)}
                            />
                          </th>
                          <th className="p-3 text-start border border-primary">{t("description.dashboard.GIB_invoice_type")}</th>
                          <th className="p-3 text-start border border-primary">{t("description.dashboard.customer_name")}</th>
                          <th className="p-3 text-start border border-primary">{t("description.dashboard.payment_method")}</th>
                          <th className="p-3 text-start border border-primary">{t("description.dashboard.total_paid")}</th>
                          <th className="p-3 text-start border border-primary">{t("description.dashboard.customer_tax_number")}</th>
                          <th className="p-3 text-start border border-primary">{t("description.dashboard.invoice_date")}</th>
                          <th className="p-3 text-start border border-primary">{t("description.dashboard.invoice_ID")}</th>
                          {/* <th className="p-3 text-start border border-primary">Amount</th> */}
                          <th className="p-3 text-start border border-primary">{t("description.dashboard.status")}</th>
                          <th className="p-3 text-start border border-primary">{t("description.dashboard.invoice_UUID")}</th>
                          {/* <th className="p-3 text-start border border-primary">Transaction History</th> */}
                          <th className="p-3 text-start border border-primary">{t("description.dashboard.creation_date")}</th>
                          {/* <th className="p-3 text-start border border-primary">Received Date</th> */}
                          {/* <th className="p-3 text-start border border-primary">Response Date</th> */}
                          {/* <th className="p-3 text-start border border-primary">Mail Delivery Status</th> */}
                          <th className="p-3 text-start border border-primary"></th>
                        </tr>
                      </thead>

                      <tbody className="whitespace-nowrap">
                        {
                          invoices.map((invoice, index) => (
                            <tr key={invoice.id}>

                                <td className="p-3 border">
                                  <input type="checkbox"
                                    className="w-[14px] h-[14px] accent-primary"
                                    value={index}
                                    checked={selectedIDs.includes(invoice.id as number)}
                                    onChange={() => handleCheck(invoice.id as number)}
                                  />
                                </td>
                              
                                <td className="p-3 border">{invoice.invoice_type}</td>
                                <td className="p-3 border">{invoice.receiver_name}</td>
                                <td className="p-3 border">{invoice.payment_means}</td>
                                <td className="p-3 border">
                                  {
                                    +invoice.total_discount + +invoice.total_increase + +invoice.total_products + +invoice.total_taxes
                                  }
                                </td>
                                <td className="p-3 border">{invoice.tax_number}</td>
                                <td className="p-3 border">{invoice.invoice_date}</td>
                                <td className="p-3 border">{invoice.invoice_id}</td>
                                {/* <td className="p-3 border">Amount</td> */}
                                <td className="p-3 border text-green-600">{t("description.dashboard.successful")}</td>
                                <td className="p-3 border">{invoice.invoice_uuid}</td>
                                {/* <td className="p-3 border">Transaction history</td> */}
                                <td className="p-3 border">{new Date(invoice.created_at).toDateString()}</td>
                                {/* <td className="p-3 border">Receive data</td> */}
                                {/* <td className="p-3 border">Response date</td> */}
                                {/* <td className="p-3 border">Mail delivery status</td> */}

                                <td className="p-3 border">
                                  {/* <div className="flex justify-start items-center">
                                    <Eye onClick={() => toast.info("Coming soon...")} size={16} color="red" weight="regular" className="cursor-pointer" />
                                  </div> */}

                                  <div className="flex justify-start items-center gap-2">
                                    <span onClick={() => handleViewXML(invoice.id)} title="XML" className="inline-block w-[20px] h-[20px] overflow-hidden cursor-pointer">
                                      <img src={xmlLogo} alt="XML-Logo" className="inline-block w-[20px] h-[20px] object-contain" />
                                    </span>

                                    <span title="PDF">
                                      <FilePdf onClick={() => handleViewPdf(invoice)} size={20} color="red" weight="regular" className="cursor-pointer" />
                                    </span>

                                    <span title="Delete">
                                      <Trash 
                                        onClick={() => setDeleteInfo({...deleteInfo, show: true, id: (invoice.id).toString(), loading: false})} 
                                        size={20} color="red" weight="regular" className="cursor-pointer" 
                                      />
                                    </span>
                                  </div>
                                </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                </div>
                
                {/* <Pagination /> */}

              </div>
            </>
          ) : (
            <p className="text-secondary text-center text-xs mt-8">{t("description.messages.no_record_found")}</p>
          )
        ) : null
      }
    </>
  )
}

export default OutgoingInvoiceArchive;