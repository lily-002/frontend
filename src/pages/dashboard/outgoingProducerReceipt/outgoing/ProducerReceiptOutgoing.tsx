/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { FilePdf, MicrosoftExcelLogo, Trash } from "@phosphor-icons/react";
// import Pagination from "../../components/Pagination";
import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks/hooks";
import { getOutgoingProducers, removeProducerReceipt } from "../../../../store/features/OutgoingProducer";
import { useTranslation } from "react-i18next";
import { axiosInstance } from "../../../../api/api";
import { toast } from "react-toastify";
import Loader from "../../../../components/Loader/Loader";
import { getToken } from "../../../../services/auth";
import XMLComponent from "../../xml/XMLComponent";
import ConfirmationModal from "../../components/ConfirmationModal";
// import ConfirmationModal from "../../components/ConfirmationModal";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";

import xmlLogo from "../../../../assets/svg/xml.svg";

const ProducerReceiptOutgoing = () => {
  const { outgoingProducers, loading, message } = useAppSelector(state => state.outgoingProducers);
  const dispatch = useAppDispatch();

  const [selectedIDs, setSelectedIDs] = useState<number[]>([]);
  // const outgoingProducers = [1, 2, 3];
  const { t } = useTranslation();
  const [XMLInfo, setXMLInfo] = useState({show: false, loading: false, id: "", data: ""});
  const [deleteInfo, setDeleteInfo] = useState({show: false, id: "", loading: false});


  useEffect(() => {

    if(!outgoingProducers.length){ dispatch(getOutgoingProducers())}

  }, [dispatch, outgoingProducers.length]);



  const handleCheckAll = () => selectedIDs.length === outgoingProducers.length ? setSelectedIDs([]) : setSelectedIDs(outgoingProducers.map(outgoingPro => outgoingPro.id));

  const handleCheck = (val: number) => {
    if(selectedIDs.includes(val)) {
      setSelectedIDs(selectedIDs.filter(id => id !== val));
      return;
     }
     
    setSelectedIDs([...selectedIDs, val]);
  }

  const handleViewXML = async (id: number | string) => {
    if(XMLInfo.loading){ return; }

    setXMLInfo({...XMLInfo, loading: true});
    try {
      
      const { data } = await axiosInstance.get(`/user/producer-receipts/ubl/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${getToken()}`
        }
      });

      // console.log("Data: ", data);
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
      
      const { data } = await axiosInstance.delete(`/user/producer-receipts/${id}`, {
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
        dispatch(removeProducerReceipt({ id }));
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
    const ws = XLSX.utils.json_to_sheet(outgoingProducers.map(outgoingProducer => (
      {
        [t("description.dashboard.customer_name")]: outgoingProducer.receiver_name,
        [t("description.dashboard.customer_tax_number")]: outgoingProducer.receiver_tax_number,
        [t("description.dashboard.customer_tax_office")]: outgoingProducer.receiver_tax_office,
        [t("description.dashboard.producer_name")]: outgoingProducer.producer_name,
        [t("description.dashboard.producer_date")]: outgoingProducer.producer_date,
        [t("description.dashboard.total_amount")]: outgoingProducer.total_amount,
        [t("description.dashboard.status")]: "Successful",
        [t("description.dashboard.creation_date")]: new Date(outgoingProducer.created_at).toDateString()
      }
    )));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "EConiaSoft producer receipt.xlsx");
  };

  const exportJsonToPdf = () => {
    const doc = new jsPDF() as any;

    doc.autoTable({
      head: [[
        t("description.dashboard.customer_name"),
        t("description.dashboard.customer_tax_number"),
        t("description.dashboard.customer_tax_office"),
        t("description.dashboard.producer_name"),
        t("description.dashboard.producer_date"),
        t("description.dashboard.total_amount"),
        t("description.dashboard.status"),
        t("description.dashboard.creation_date")
      ]],
      body: outgoingProducers.map(outgoingProducer => [
        outgoingProducer.receiver_name,
        outgoingProducer.receiver_tax_number,
        outgoingProducer.receiver_tax_office,
        outgoingProducer.producer_name,
        outgoingProducer.producer_date,
        outgoingProducer.total_amount,
        "Successful",
        new Date(outgoingProducer.created_at).toDateString(),
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

    doc.save('EConiaSoft producer receipt.pdf');
  };


  return (
    <>

      { XMLInfo.loading || deleteInfo.loading ? <Loader message="Processing..." /> : null }

      <XMLComponent 
          show={XMLInfo.show}
          XMLText={XMLInfo.data}
          title={t("description.invoices.Producer_Receipt_XML")}
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

      <h2 className="font-bold text-sm mb-2">{t("description.dashboard.TO_BE_SENT_OUTGOING_PRODUCER_RECEIPT")}</h2>
      <p className="text-xs mb-4">{t("description.dashboard.outgoing_producer_receipt")}</p>

      {loading ? <div className="w-[50px] h-[50px] rounded-full border-[6px] border-primary border-b-transparent animate-spin mt-6 mx-auto"></div> : null}
      {!loading && message ? (<p className="text-[#F16021] bg-[#f15f213c] text-center mx-auto mt-12 p-2 rounded">{message}</p>) : null}
      {!loading && !message ? (
        outgoingProducers.length ? (
            <>
              {/* <div className="w-full border border-[#D9D9D9] rounded-md p-4 text-xs mb-4">
                <div className="flex justify-start items-center gap-4 flex-wrap mb-3">
                  <div className="flex justify-start items-center gap-1">
                    <input type="radio" name="status" id="toBeSent"
                      className="w-[13px] h-[13px] accent-primary"
                    />
                    <label htmlFor="toBeSent">{t("description.dashboard.to_be_sent")}</label>
                  </div>

                  <div className="flex justify-start items-center gap-1">
                    <input type="radio" name="status" id="accepted"
                      className="w-[13px] h-[13px] accent-primary"
                    />
                    <label htmlFor="accepted">{t("description.dashboard.accepted")}</label>
                  </div>

                  <div className="flex justify-start items-center gap-1">
                    <input type="radio" name="status" id="draft"
                      className="w-[13px] h-[13px] accent-primary"
                    />
                    <label htmlFor="draft">{t("description.dashboard.draft")}</label>
                  </div>

                  <div className="flex justify-start items-center gap-1">
                    <input type="radio" name="status" id="error"
                      className="w-[13px] h-[13px] accent-primary"
                    />
                    <label htmlFor="error">{t("description.dashboard.error")}</label>
                  </div>

                  <div className="flex justify-start items-center gap-1">
                    <input type="radio" name="status" id="partial"
                      className="w-[13px] h-[13px] accent-primary"
                    />
                    <label htmlFor="partial">{t("description.dashboard.partial")}</label>
                  </div>

                  <div className="flex justify-start items-center gap-1">
                    <input type="radio" name="status" id="all"
                      className="w-[13px] h-[13px] accent-primary"
                    />
                    <label htmlFor="all">{t("description.dashboard.all")}</label>
                  </div>
                </div>

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
                    
                    <button className="rounded-lg bg-primary text-white py-1 px-3">{t("description.dashboard.transactions")}</button>
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
                            checked={(selectedIDs.length === outgoingProducers.length)}
                          />
                        </th>
                        <th className="p-3 text-start border border-primary">{t("description.dashboard.customer_name")}</th>
                        <th className="p-3 text-start border border-primary">{t("description.dashboard.customer_tax_number")}</th>
                        <th className="p-3 text-start border border-primary">{t("description.dashboard.customer_tax_office")}</th>
                        <th className="p-3 text-start border border-primary">{t("description.dashboard.producer_name")}</th>
                        <th className="p-3 text-start border border-primary">{t("description.dashboard.producer_date")}</th>
                        <th className="p-3 text-start border border-primary">{t("description.dashboard.total_amount")}</th>
                        <th className="p-3 text-start border border-primary">{t("description.dashboard.status")}</th>
                        <th className="p-3 text-start border border-primary">{t("description.dashboard.creation_date")}</th>

                        {/* <th className="p-3 text-start border border-primary">Status</th>
                        <th className="p-3 text-start border border-primary">GIB Post Box - EMail</th>
                        <th className="p-3 text-start border border-primary">Creation Date</th>
                        <th className="p-3 text-start border border-primary">Mail Delivery Status</th>
                        <th className="p-3 text-start border border-primary">Portal Status</th>
                        <th className="p-3 text-start border border-primary">Connector Status</th>
                        <th className="p-3 text-start border border-primary">Last Update User</th>
                        <th className="p-3 text-start border border-primary"></th> */}
                        <th className="p-3 text-start border border-primary"></th>
                      </tr>
                    </thead>

                    <tbody className="whitespace-nowrap">
                      {
                        outgoingProducers.map((outgoingProducer) => (
                          <tr key={outgoingProducer.id}>
                              <td className="p-3 border">
                                <input type="checkbox"
                                  className="w-[14px] h-[14px] accent-primary"
                                  value={outgoingProducer.id}
                                  checked={selectedIDs.includes(outgoingProducer.id)}
                                  onChange={() => handleCheck(outgoingProducer.id)}
                                />
                              </td>
                            
                              <td className="p-3 border">{outgoingProducer.receiver_name}</td>
                              <td className="p-3 border">{outgoingProducer.receiver_tax_number}</td>
                              <td className="p-3 border">{outgoingProducer.receiver_tax_office}</td>
                              <td className="p-3 border">{outgoingProducer.producer_name}</td>
                              <td className="p-3 border">{outgoingProducer.producer_date}</td>
                              <td className="p-3 border">{outgoingProducer.total_amount}</td>
                              <td className="p-3 border text-green-600">{t("description.dashboard.successful")}</td>
                              <td className="p-3 border">{new Date(outgoingProducer.created_at).toDateString()}</td>

                              {/* <td className="p-3 border">Customer</td>
                              <td className="p-3 border">Producer</td>
                              <td className="p-3 border">Producer</td>
                              <td className="p-3 border">Amount</td>
                              <td className="p-3 border">Status</td>
                              <td className="p-3 border">ETTN</td>
                              <td className="p-3 border">GIB</td>
                              <td className="p-3 border">Creation</td>
                              <td className="p-3 border">Mail</td>
                              <td className="p-3 border">Portal</td>
                              <td className="p-3 border">Connector</td>
                              <td className="p-3 border">Last</td> */}
                              <td className="p-3 border">
                                {/* <div className="flex justify-start items-center">
                                  <Eye  size={16} color="red" weight="regular" className="cursor-pointer" />
                                </div> */}

                                <div className="flex justify-start items-center gap-2">
                                  <span onClick={() => handleViewXML(outgoingProducer.id)} title="XML" className="inline-block w-[20px] h-[20px] overflow-hidden cursor-pointer">
                                    <img src={xmlLogo} alt="XML-Logo" className="inline-block w-[20px] h-[20px] object-contain" />
                                  </span>

                                  <span title="PDF">
                                    <FilePdf size={20} color="red" weight="regular" className="cursor-pointer" />
                                  </span>

                                  <span title="Delete">
                                    <Trash 
                                      onClick={() => setDeleteInfo({...deleteInfo, show: true, id: (outgoingProducer.id).toString(), loading: false})} 
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
        ) : null}
    </>
  )
}

export default ProducerReceiptOutgoing;