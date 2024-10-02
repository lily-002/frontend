/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { FilePdf, MicrosoftExcelLogo, Trash } from "@phosphor-icons/react";
// import Pagination from "../../components/Pagination";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks/hooks";
import { getOutgoingDeliveries, removeDeliveryNote } from "../../../../store/features/OutgoingDelivery";
import { useTranslation } from "react-i18next";
import { axiosInstance } from "../../../../api/api";
import { getToken } from "../../../../services/auth";
import Loader from "../../../../components/Loader/Loader";
import XMLComponent from "../../xml/XMLComponent";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";

import xmlLogo from "../../../../assets/svg/xml.svg";


const OutgoingDeliveryArchive = () => {
  const { outgoingDeliveries, loading, message } = useAppSelector(state => state.outgoingDeliveries);
  const deliveries = outgoingDeliveries.filter(outgoingDelivery => outgoingDelivery.submission_type_id === 2);

  const [selectedIDs, setSelectedIDs] = useState<number[]>([]);
  // const [archiveInfo, setArchiveInfo] = useState({show: false, message: "", loading: false});
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [XMLInfo, setXMLInfo] = useState({show: false, loading: false, id: "", data: ""});
  const [deleteInfo, setDeleteInfo] = useState({show: false, id: "", loading: false});

  useEffect(() => {

    if(!outgoingDeliveries.length){ dispatch(getOutgoingDeliveries()) }

  }, []);


  const handleCheckAll = () => selectedIDs.length === deliveries.length ? setSelectedIDs([]) : setSelectedIDs(deliveries.map(delivery => delivery.id));

  const handleCheck = (val: number) => {
    if(selectedIDs.includes(val)) {
      setSelectedIDs(selectedIDs.filter(id => id !== val));
      return;
     }
     
    setSelectedIDs([...selectedIDs, val]);
  }

  // const onTakeFromArchive = () => {
  //     if(!selectedIDs.length){return toast.warning("No record selected")}
  //     setArchiveInfo({...archiveInfo, message: "The invoice you have selected will be restored from Archive to Sent Invoice Box. Do you confirm?", show: true});
  // }

  // const handleTakeFromArchive = () => {
  //   if(archiveInfo.loading){ return; }

  //   setArchiveInfo({...archiveInfo, loading: true});
  //   return setTimeout(() => {
  //       toast.success(`Successful`, {autoClose: 4000, pauseOnHover: false});
  //       setSelectedIDs([]);
  //       return setArchiveInfo({show: false, message: "", loading: false});
  //   }, 4000);
  // }

  const handleViewXML = async (id: number | string) => {
    if(XMLInfo.loading){ return; }

    setXMLInfo({...XMLInfo, loading: true});
    try {
      
      const { data } = await axiosInstance.get(`/user/delivery-note/ubl/${id}`, {
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

  const handleDeleteInvoice = async (id: number | string) => {
    if(deleteInfo.loading){ return; }

    setDeleteInfo({...deleteInfo, show: false, loading: true});
    try {
      
      const { data } = await axiosInstance.delete(`/user/delivery-note/${id}`, {
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
        dispatch(removeDeliveryNote({ id }));
        return;
      }
      
      setDeleteInfo({...deleteInfo, loading: false});
      return toast.error(data.message, {autoClose: 4000, pauseOnHover: false});
      
    } catch (error: any) {
      setDeleteInfo({...deleteInfo, loading: false});
      return toast.error(error.response ? error.response.data?.error || error.response?.data?.message : t("description.errors.something_went_wrong_try_again_later"));
    }
  }

  const generateExcel = () => {
    const ws = XLSX.utils.json_to_sheet(deliveries.map(delivery => (
      {
        [t("description.dashboard.customer_name")]: delivery.real_buyer,
        [t("description.dashboard.customer_tax_number")]: delivery.buyer_tax_number,
        [t("description.dashboard.GIB_despatch_type")]: delivery.despatch_type_id,
        [t("description.dashboard.despatch_date")]: new Date(delivery.despatch_date).toDateString(),
        [t("description.dashboard.despatch_ID")]: delivery.despatch_id,
        [t("description.dashboard.total_amount")]: delivery.total_amount,
        [t("description.dashboard.status")]: "Successful",
        [t("description.dashboard.despatch_UUID")]: delivery.invoice_uuid,
        [t("description.dashboard.remarks")]: delivery.wild_card1,
        [t("description.dashboard.order_number")]: delivery.order_number,
        [t("description.dashboard.creation_date")]: new Date(delivery.created_at).toDateString()
      }
    )));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "EConiaSoft delivery-note archive.xlsx");
  };

  const exportJsonToPdf = () => {
    const doc = new jsPDF() as any;

    doc.autoTable({
      head: [[
        t("description.dashboard.customer_name"),
        t("description.dashboard.customer_tax_number"),
        t("description.dashboard.GIB_despatch_type"),
        t("description.dashboard.despatch_date"),
        t("description.dashboard.despatch_ID"),
        t("description.dashboard.total_amount"),
        t("description.dashboard.status"),
        t("description.dashboard.despatch_UUID"),
        t("description.dashboard.remarks"),
        t("description.dashboard.order_number"),
        t("description.dashboard.creation_date")
      ]],
      body: deliveries.map(delivery => [
        delivery.real_buyer,
        delivery.buyer_tax_number,
        delivery.despatch_type_id,
        delivery.despatch_date,
        delivery.despatch_id,
        delivery.total_amount,
        "Successful",
        delivery.invoice_uuid,
        delivery.wild_card1,
        delivery.order_number,
        new Date(delivery.created_at).toDateString()
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

    doc.save('EConiaSoft delivery-note archive.pdf');
  };


  return (
    <>

      { XMLInfo.loading || deleteInfo.loading ? <Loader message="Processing..." /> : null }

      <XMLComponent 
          show={XMLInfo.show}
          XMLText={XMLInfo.data}
          title={t("description.invoices.E_Delivery_Archive_XML")}
          handleClose={() => setXMLInfo({...XMLInfo, show: false, data: "", id: ""})}
      />

      {/* Delete Invoice Modal */}
      <ConfirmationModal 
        show={deleteInfo.show}
        message={t("description.dashboard.did_you_want_to_delete_this_invoice")}
        loading={deleteInfo.loading}
        handleProceed={() => handleDeleteInvoice(deleteInfo.id)}
        handleCancel={() => setDeleteInfo({...deleteInfo, show: false, id: "", loading: false})}
      />

      {/* Modal */}
      {/* <ConfirmationModal 
        show={archiveInfo.show}
        message={archiveInfo.message}
        loading={archiveInfo.loading}
        handleProceed={handleTakeFromArchive}
        handleCancel={() => setArchiveInfo({show: false, message: "", loading: false})}
      /> */}

      <h2 className="font-bold text-sm mb-2">{t("description.dashboard.ARCHIVE")}</h2>
      <p className="text-xs mb-4">{t("description.dashboard.outgoing_delivery_note")}</p>

      {loading ? <div className="w-[50px] h-[50px] rounded-full border-[6px] border-primary border-b-transparent animate-spin mt-6 mx-auto"></div> : null}
      {!loading && message ? (<p className="text-[#F16021] bg-[#f15f213c] text-center mx-auto mt-12 p-2 rounded">{message}</p>) : null}
      {!loading && !message ? (
          deliveries.length ? (
            <>
              {/* <div className="w-full border border-[#D9D9D9] rounded-md p-4 text-xs mb-4">
                <div className="flex justify-start items-center gap-4 flex-wrap mb-3">
                  <div className="flex justify-start items-center gap-1">
                    <input type="radio" name="status" id="accepted"
                      className="w-[13px] h-[13px] accent-primary"
                    />
                    <label htmlFor="accepted">{t("description.dashboard.accepted")}</label>
                  </div>

                  <div className="flex justify-start items-center gap-1">
                    <input type="radio" name="status" id="rejected"
                      className="w-[13px] h-[13px] accent-primary"
                    />
                    <label htmlFor="rejected">{t("description.dashboard.rejected")}</label>
                  </div>

                  <div className="flex justify-start items-center gap-1">
                    <input type="radio" name="status" id="all"
                      className="w-[13px] h-[13px] accent-primary"
                    />
                    <label htmlFor="all">{t("description.dashboard.all")}</label>
                  </div>
                </div>

                <div className="flex justify-start items-center gap-4 flex-wrap">
                  <div className="flex justify-start items-center gap-1">
                    <input type="radio" name="printer" id="sentToPrinter"
                      className="w-[13px] h-[13px] accent-primary"
                    />
                    <label htmlFor="sentToPrinter">{t("description.dashboard.sent_to_printer")}</label>
                  </div>

                  <div className="flex justify-start items-center gap-1">
                    <input type="radio" name="printer" id="notSentToPrinter"
                      className="w-[13px] h-[13px] accent-primary"
                    />
                    <label htmlFor="notSentToPrinter">{t("description.dashboard.not_sent_to_printer")}</label>
                  </div>

                  <div className="flex justify-start items-center gap-1">
                    <input type="radio" name="printer" id="allPrinter"
                      className="w-[13px] h-[13px] accent-primary"
                    />
                    <label htmlFor="allPrinter">{t("description.dashboard.all")}</label>
                  </div>
                </div>
              </div>

              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 text-xs mb-6">
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

                  <input type="text" name="maximumInvoiceAmount"
                    className="border border-[#D9D9D9] rounded outline-primary transition-all p-2"
                    placeholder="(Maximum) Invoice Amount"
                  />

                  <input type="text" name="minimumInvoiceAmount"
                    className="border border-[#D9D9D9] rounded outline-primary transition-all p-2"
                    placeholder="Invoice amount (minimum)"
                  />

                  <input type="text" name="ERPRefer"
                    className="border border-[#D9D9D9] rounded outline-primary transition-all p-2"
                    placeholder="ERP Refer"
                  />

                <input type="text" name="wildCard1"
                    className="border border-[#D9D9D9] rounded outline-primary transition-all p-2"
                    placeholder="Wild Card 1"
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
                    
                    <button onClick={onTakeFromArchive} className="rounded-lg bg-primary text-white py-1 px-3">{t("description.dashboard.take_from_Archive")}</button>
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
                            checked={(selectedIDs.length === deliveries.length)}
                          />
                        </th>
                        <th className="p-3 text-start border border-primary">{t("description.dashboard.customer_name")}</th>
                        <th className="p-3 text-start border border-primary">{t("description.dashboard.customer_tax_number")}</th>
                        <th className="p-3 text-start border border-primary">{t("description.dashboard.GIB_despatch_type")}</th>
                        {/* <th className="p-3 text-start border border-primary">Despatch Send Type</th> */}
                        {/* <th className="p-3 text-start border border-primary">Supplier Code</th> */}
                        <th className="p-3 text-start border border-primary">{t("description.dashboard.despatch_date")}</th>
                        <th className="p-3 text-start border border-primary">{t("description.dashboard.despatch_ID")}</th>
                        <th className="p-3 text-start border border-primary">{t("description.dashboard.total_amount")}</th>
                        <th className="p-3 text-start border border-primary">{t("description.dashboard.status")}</th>
                        <th className="p-3 text-start border border-primary">{t("description.dashboard.despatch_UUID")}</th>
                        <th className="p-3 text-start border border-primary">{t("description.dashboard.remarks")}</th>
                        <th className="p-3 text-start border border-primary">{t("description.dashboard.order_number")}</th>
                        <th className="p-3 text-start border border-primary">{t("description.dashboard.creation_date")}</th>

                        {/* <th className="p-3 text-start border border-primary">GIB Post Box - Email</th>
                        <th className="p-3 text-start border border-primary">ERP Reference</th>
                        <th className="p-3 text-start border border-primary">Activity Envelope</th>
                        <th className="p-3 text-start border border-primary">Package Info</th>
                        <th className="p-3 text-start border border-primary">Send Date</th>
                        <th className="p-3 text-start border border-primary">Received Date</th>
                        <th className="p-3 text-start border border-primary">Response Date</th>
                        <th className="p-3 text-start border border-primary">Mail Delivery Status</th>
                        <th className="p-3 text-start border border-primary">Portal Status</th>
                        <th className="p-3 text-start border border-primary">Connector Status</th> */}
                        <th className="p-3 text-start border border-primary"></th> 
                      </tr>
                    </thead>

                    <tbody className="whitespace-nowrap">
                      {
                        deliveries.map((delivery) => (
                          <tr key={delivery.id}>

                              <td className="p-3 border">
                                <input type="checkbox"
                                  className="w-[14px] h-[14px] accent-primary"
                                  value={delivery.id}
                                  checked={selectedIDs.includes(delivery.id)}
                                  onChange={() => handleCheck(delivery.id)}
                                />
                              </td>
                            
                              <td className="p-3 border">{delivery.real_buyer}</td>
                              <td className="p-3 border">{delivery.buyer_tax_number}</td>
                              <td className="p-3 border">{delivery.despatch_type_id}</td>
                              <td className="p-3 border">{delivery.despatch_date}</td>
                              <td className="p-3 border">{delivery.despatch_id}</td>
                              <td className="p-3 border">{delivery.total_amount}</td>
                              <td className="p-3 border text-green-600">{t("description.dashboard.successful")}</td>
                              <td className="p-3 border">{delivery.invoice_uuid}</td>
                              <td className="p-3 border">{delivery.wild_card1}</td>
                              <td className="p-3 border">{delivery.order_number}</td>
                              <td className="p-3 border">{new Date(delivery.created_at).toDateString()}</td>

                              <td className="p-3 border">
                                {/* <div className="flex justify-start items-center">
                                  <Eye size={16} color="red" weight="regular" className="cursor-pointer" />
                                </div> */}

                                <div className="flex justify-start items-center gap-2">
                                  <span onClick={() => handleViewXML(delivery.id)} title="XML" className="inline-block w-[20px] h-[20px] overflow-hidden cursor-pointer">
                                    <img src={xmlLogo} alt="XML-Logo" className="inline-block w-[20px] h-[20px] object-contain" />
                                  </span>

                                  <span title="PDF">
                                    <FilePdf size={20} color="red" weight="regular" className="cursor-pointer" />
                                  </span>

                                  <span title="Delete">
                                    <Trash 
                                      onClick={() => setDeleteInfo({...deleteInfo, show: true, id: (delivery.id).toString(), loading: false})} 
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

export default OutgoingDeliveryArchive;




