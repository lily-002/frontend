/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { ArrowsClockwise, DownloadSimple, EnvelopeSimple, Eye, FilePdf, FunnelSimple, MicrosoftExcelLogo, Printer, Trash } from "@phosphor-icons/react";
import Pagination from "../../components/Pagination";
import { useState } from "react";
import ModalButtons from "./ModalButtons";
import { toast } from "react-toastify";
import Operations from "./Operations";
import SelectOptions from "../../components/SelectOptions";

const Received = () => {
  const [formData, setFormData] = useState({
    GIBInvoiceType: "",
    timeInterval: ""
  });
  const [selectedIDs, setSelectedIDs] = useState<number[]>([]);
  const itemsIDs = [1, 2, 3];
  const [buttonModalInfo, setButtonModalInfo] = useState({show: false, message: "", status: "", loading: false});

  const handleCheckAll = () => selectedIDs.length === itemsIDs.length ? setSelectedIDs([]) : setSelectedIDs(itemsIDs);

  const handleCheck = (val: number) => {
    if(selectedIDs.includes(val)) {
      setSelectedIDs(selectedIDs.filter(id => id !== val));
      return;
     }
     
    setSelectedIDs([...selectedIDs, val]);
  }

  const handleModalButton = (status: string) => {
    if(!selectedIDs.length){ return toast.warning("No item is selected", {autoClose: 5000, pauseOnHover: false}) }

    const messageObject: any = {
      accepted: "We will accept the bills that you have selected. Are you sure?",
      rejected: "We'll be rejecting the bills you have selected. Can you verify?",
      returned: "For the selected invoice, a return invoice will be created. Are you sure?"
    }

    return setButtonModalInfo({...buttonModalInfo, status, show: true, message: messageObject[status]});

  }

  const handleProceedModalButtonsAction = () => {
    if(buttonModalInfo.loading){ return; }

    setButtonModalInfo({...buttonModalInfo, loading: true});
    return setTimeout(() => {
      toast.success(`${buttonModalInfo.status[0].toUpperCase() + buttonModalInfo.status.slice(1)} successful`, {autoClose: 4000, pauseOnHover: false});
      return setButtonModalInfo({show: false, message: "", status: "", loading: false});
    }, 4000);
  }

  return (
    <>

      {/* Modal Buttons */}
      <ModalButtons 
        show={buttonModalInfo.show}
        message={buttonModalInfo.message}
        loading={buttonModalInfo.loading}
        handleProceed={handleProceedModalButtonsAction}
        handleCancel={() => setButtonModalInfo({show: false, message: "", status: "", loading: false})}
      />

      <h2 className="font-bold text-sm mb-2">RECEIVED</h2>
      <p className="text-xs mb-4">Invoice Received</p>

      <div className="w-full border border-[#D9D9D9] rounded-md p-4 text-xs mb-4">
        <div className="flex justify-start items-center gap-4 flex-wrap mb-3">
          <div className="flex justify-start items-center gap-1">
            <input type="radio" name="payment" id="allPayment"
              className="w-[13px] h-[13px] accent-primary"
            />
            <label htmlFor="allPayment">All</label>
          </div>

          <div className="flex justify-start items-center gap-1">
            <input type="radio" name="payment" id="toBePaidPayment"
              className="w-[13px] h-[13px] accent-primary"
            />
            <label htmlFor="toBePaidPayment">To Be Paid</label>
          </div>

          <div className="flex justify-start items-center gap-1">
            <input type="radio" name="payment" id="paidPayment"
              className="w-[13px] h-[13px] accent-primary"
            />
            <label htmlFor="paidPayment">Paid</label>
          </div>
        </div>

        <div className="flex justify-start items-center gap-4 flex-wrap mb-3">
          <div className="flex justify-start items-center gap-1">
            <input type="radio" name="status" id="waitingResponse"
              className="w-[13px] h-[13px] accent-primary"
            />
            <label htmlFor="waitingResponse">Waiting Response</label>
          </div>

          <div className="flex justify-start items-center gap-1">
            <input type="radio" name="status" id="basic"
              className="w-[13px] h-[13px] accent-primary"
            />
            <label htmlFor="basic">Basic</label>
          </div>

          <div className="flex justify-start items-center gap-1">
            <input type="radio" name="status" id="accepted"
              className="w-[13px] h-[13px] accent-primary"
            />
            <label htmlFor="accepted">Accepted</label>
          </div>

          <div className="flex justify-start items-center gap-1">
            <input type="radio" name="status" id="rejected"
              className="w-[13px] h-[13px] accent-primary"
            />
            <label htmlFor="rejected">Rejected</label>
          </div>

          <div className="flex justify-start items-center gap-1">
            <input type="radio" name="status" id="returned"
              className="w-[13px] h-[13px] accent-primary"
            />
            <label htmlFor="returned">Returned</label>
          </div>

          <div className="flex justify-start items-center gap-1">
            <input type="radio" name="status" id="errors"
              className="w-[13px] h-[13px] accent-primary"
            />
            <label htmlFor="errors">Errors</label>
          </div>

          <div className="flex justify-start items-center gap-1">
            <input type="radio" name="status" id="waitingForAccepted"
              className="w-[13px] h-[13px] accent-primary"
            />
            <label htmlFor="waitingForAccepted">Waiting For Accepted</label>
          </div>

          <div className="flex justify-start items-center gap-1">
            <input type="radio" name="status" id="waitingForRejected"
              className="w-[13px] h-[13px] accent-primary"
            />
            <label htmlFor="waitingForRejected">Waiting For Rejected</label>
          </div>

          <div className="flex justify-start items-center gap-1">
            <input type="radio" name="status" id="allStatus"
              className="w-[13px] h-[13px] accent-primary"
            />
            <label htmlFor="allStatus">All</label>
          </div>
        </div>

        <div className="flex justify-start items-center gap-4 flex-wrap">
          <div className="flex justify-start items-center gap-1">
            <input type="radio" name="printer" id="sentToPrinter"
              className="w-[13px] h-[13px] accent-primary"
            />
            <label htmlFor="sentToPrinter">Sent to Printer</label>
          </div>

          <div className="flex justify-start items-center gap-1">
            <input type="radio" name="printer" id="notSentToPrinter"
              className="w-[13px] h-[13px] accent-primary"
            />
            <label htmlFor="notSentToPrinter">Not Sent to Printer</label>
          </div>

          <div className="flex justify-start items-center gap-1">
            <input type="radio" name="printer" id="allPrinter"
              className="w-[13px] h-[13px] accent-primary"
            />
            <label htmlFor="allPrinter">All</label>
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

          <input type="date" name="createStartDate"
            className="border border-[#D9D9D9] rounded outline-primary transition-all p-2"
            // placeholder="Invoice ID"
          />

          <input type="date" name="createEndDate"
            className="border border-[#D9D9D9] rounded outline-primary transition-all p-2"
            // placeholder="Invoice ID"
          />

          <input type="text" name="invoiceAmount"
            className="border border-[#D9D9D9] rounded outline-primary transition-all p-2"
            placeholder="Invoice Amount"
          />

          <input type="text" name="invoiceUUID"
            className="border border-[#D9D9D9] rounded outline-primary transition-all p-2"
            placeholder="Invoice UUID"
          />

          <SelectOptions
            title="GIB Invoice Type"
            selectedOption={formData.GIBInvoiceType}
            setSelectedOption={(userSelection) => setFormData({...formData, GIBInvoiceType: userSelection})}
            options={["Option 1", "Option 2", "Option 3"]}
            className="border border-[#D9D9D9] rounded outline-primary transition-all p-2"
            top="top-8"
          />

          <SelectOptions
            title="Select time interval"
            selectedOption={formData.timeInterval}
            setSelectedOption={(userSelection) => setFormData({...formData, timeInterval: userSelection})}
            options={["Interval 1", "Interval 2", "Interval 3"]}
            className="border border-[#D9D9D9] rounded outline-primary transition-all p-2"
            top="top-8"
          />

        </div>

        <div>
          <div className="flex justify-start items-center gap-4">
            <ArrowsClockwise size={20} weight="regular" className="cursor-pointer" />
            
            <div className="border rounded-md flex justify-start items-center gap-2 py-1 px-2 cursor-pointer">
              <FunnelSimple size={20} />
              <span>Filter</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full min-h-[200px] bg-white text-[#333333] border shadow-md p-3">
        {/* Icons */}
        <div className="flex justify-between items-center gap-4 flex-wrap mb-5">
          <div className="flex justify-start items-center gap-2 flex-wrap">
            <span title="Excel">
              <MicrosoftExcelLogo size={20} color="green" weight="regular" className="cursor-pointer" />
            </span>

            <span title="PDF">
              <FilePdf size={20} color="red" weight="regular" className="cursor-pointer" />
            </span>

            <span title="Printer">
              <Printer size={20} color="#333333" weight="regular" className="cursor-pointer" />
            </span>

            <span title="Message">
              <EnvelopeSimple size={20} color="#333333" weight="regular" className="cursor-pointer" />
            </span>

            <span title="Download">
              <DownloadSimple size={20} color="#333333" weight="regular" className="cursor-pointer" />
            </span>
          </div>

          <div className="flex justify-start items-center gap-2 flex-wrap text-xs">
            <span title="Reload">
              <ArrowsClockwise size={20} color="#333333" weight="regular" className="cursor-pointer" />
            </span>
            
            <button onClick={() => handleModalButton("accepted")} className="rounded-lg bg-[#4CD964] text-white py-1 px-3">Accepted</button>
            <button onClick={() => handleModalButton("rejected")} className="rounded-lg bg-[#FF0000] text-white py-1 px-3">Rejected</button>
            <button onClick={() => handleModalButton("returned")} className="rounded-lg bg-[#F16623] text-white py-1 px-3">Returned</button>
            <Operations />

          </div>
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
                    checked={(selectedIDs.length === itemsIDs.length)}
                  />
                </th>
                <th className="p-3 text-start border border-primary">GIB Invoice Type</th>
                <th className="p-3 text-start border border-primary">Customer Name</th>
                <th className="p-3 text-start border border-primary">Add payment</th>
                <th className="p-3 text-start border border-primary">Amount Paid</th>
                <th className="p-3 text-start border border-primary">Customer Tax Number</th>
                <th className="p-3 text-start border border-primary">Invoice Date</th>
                <th className="p-3 text-start border border-primary">Invoice ID</th>
                <th className="p-3 text-start border border-primary">Amount</th>
                <th className="p-3 text-start border border-primary">Status</th>
                <th className="p-3 text-start border border-primary">Invoice UUID</th>
                <th className="p-3 text-start border border-primary">ERP Status</th>
                <th className="p-3 text-start border border-primary">Despatch Reference</th>
                <th className="p-3 text-start border border-primary">Envelope Activities</th>
                <th className="p-3 text-start border border-primary"></th>
                <th className="p-3 text-start border border-primary">Transaction History</th>
                <th className="p-3 text-start border border-primary">Creation Date</th>
                <th className="p-3 text-start border border-primary">Received Date</th>
                <th className="p-3 text-start border border-primary">Response Date</th>
                <th className="p-3 text-start border border-primary">Mail Delivery Status</th>
                <th className="p-3 text-start border border-primary">Portal Status</th>
                <th className="p-3 text-start border border-primary">Connector Status</th>
                <th className="p-3 text-start border border-primary">Last Update User</th>
                <th className="p-3 text-start border border-primary"></th>
              </tr>
            </thead>

            <tbody className="whitespace-nowrap">
              {
                itemsIDs.map(num => (
                  <tr key={num}>

                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>
                        <input type="checkbox"
                          className="w-[14px] h-[14px] accent-primary"
                          value={num}
                          checked={selectedIDs.includes(num)}
                          onChange={() => handleCheck(num)}
                        />
                      </td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>Commercial-Sales</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>DANGOTE LIMITED</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""} text-green-500`}>Add Payment</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>25.00 USD</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>3230512384</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>02/02/24</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>TEK2024000000040</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>1,180.00 USD</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""} bg-[#FFFF00]`}>Waiting for response fron customer</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>5251E27A-4A88-4DCA-A8FE-FC8158716A39</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>
                        <div className="flex justify-start items-center gap-2 text-primary">
                          <span>Pending review</span>
                          <Eye size={16} weight="regular" className="text-primary cursor-pointer" />
                        </div>
                      </td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}></td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>
                        <div className="flex justify-start items-center gap-2 text-primary">
                          <span>Review</span>
                          <Eye size={16} weight="regular" className="text-primary cursor-pointer" />
                        </div>
                      </td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>d9de012b-8df7-4506-8666-733c2</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>Transaction History</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>02/02/2024</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>02/02/2024</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}></td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>
                        <div className="flex justify-start items-center gap-2 text-primary">
                          <span>Email history</span>
                          <Eye size={16} weight="regular" className="text-primary cursor-pointer" />
                        </div>
                      </td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""} text-primary`}>Read</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""} text-primary`}>Read</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>Musa</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>
                        <div className="flex justify-start items-center gap-2">
                          <Trash size={16} color="red" weight="regular" className="cursor-pointer" />
                          <Eye size={16} color="red" weight="regular" className="cursor-pointer" />
                        </div>
                      </td>
                  </tr>
                ))
              }
            </tbody>
          </table>

        </div>
        
       <Pagination />

      </div>

    </>
  )
}

export default Received;