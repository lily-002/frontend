/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { ArrowsClockwise, DownloadSimple, EnvelopeSimple, Eye, FilePdf, FunnelSimple, MicrosoftExcelLogo, Printer } from "@phosphor-icons/react";
import Pagination from "../../components/Pagination";
import { useState } from "react";
import { toast } from "react-toastify";

const ProducerReceiptCall = () => {
  const [selectedIDs, setSelectedIDs] = useState<number[]>([]);
  const itemsIDs = [1, 2, 3];

  const handleCheckAll = () => selectedIDs.length === itemsIDs.length ? setSelectedIDs([]) : setSelectedIDs(itemsIDs);

  const handleCheck = (val: number) => {
    if(selectedIDs.includes(val)) {
      setSelectedIDs(selectedIDs.filter(id => id !== val));
      return;
    }

    setSelectedIDs([...selectedIDs, val]);
  }

  return (
    <>
      <h2 className="font-bold text-sm mb-2">OUTGOING PRODUCER RECEIPT CALL</h2>
      <p className="text-xs mb-4">Outgoing Producer Receipt</p>

      <div className="w-full border border-[#D9D9D9] rounded-md p-4 text-xs mb-4">
        <div className="flex justify-start items-center gap-4 flex-wrap mb-3">
          <div className="flex justify-start items-center gap-1">
            <input type="radio" name="printer" id="sendToPrinter"
              className="w-[13px] h-[13px] accent-primary"
            />
            <label htmlFor="sendToPrinter">Send to Printer</label>
          </div>

          <div className="flex justify-start items-center gap-1">
            <input type="radio" name="printer" id="dontsendToPrinter"
              className="w-[13px] h-[13px] accent-primary"
            />
            <label htmlFor="dontsendToPrinter">Don't Send to Printer</label>
          </div>

          <div className="flex justify-start items-center gap-1">
            <input type="radio" name="printer" id="all"
              className="w-[13px] h-[13px] accent-primary"
            />
            <label htmlFor="all">All</label>
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
                <th className="p-3 text-start border border-primary">Sender Company</th>
                <th className="p-3 text-start border border-primary">Sender Company Vkn</th>
                <th className="p-3 text-start border border-primary">Sender Company Mailbox</th>
                <th className="p-3 text-start border border-primary">Customer Name</th>
                <th className="p-3 text-start border border-primary">Customer Tax Number</th>
                <th className="p-3 text-start border border-primary">Mm Tarihi</th>
                <th className="p-3 text-start border border-primary">Producer Receipt Number</th>
                <th className="p-3 text-start border border-primary">ETTN</th>
                <th className="p-3 text-start border border-primary">Amount</th>
                <th className="p-3 text-start border border-primary">Status</th>
                <th className="p-3 text-start border border-primary">GIB Post Box - EMail</th>
                <th className="p-3 text-start border border-primary">Portal Status</th>
                <th className="p-3 text-start border border-primary">Connector Status</th>
                <th className="p-3 text-start border border-primary">Cancel Status</th>
                <th className="p-3 text-start border border-primary">Is Archive?</th>
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
                     
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>Sender</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>Sender</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>Sender</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>Customer</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>Customer</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>Mm</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>Producer</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>ETTN</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>Amount</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>Status</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>GIB</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>Portal</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>Connector</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>Cancel</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>Is</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>Last</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>
                        <div className="flex justify-start items-center">
                          <Eye onClick={() => toast.info("Coming soon...")} size={16} color="red" weight="regular" className="cursor-pointer" />
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

export default ProducerReceiptCall;