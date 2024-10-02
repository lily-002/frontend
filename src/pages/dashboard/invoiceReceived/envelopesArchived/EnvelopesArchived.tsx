import { useState } from "react";
import { ArrowsClockwise, DownloadSimple, FunnelSimple, MicrosoftExcelLogo } from "@phosphor-icons/react";
import Pagination from "../../components/Pagination";

const EnvelopesArchived = () => {
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
      <h2 className="font-bold text-sm mb-2">ENVELOPES ARCHIVED</h2>
      <p className="text-xs mb-4">Invoice Recieved</p>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 text-xs mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:col-span-2 xl:col-span-3">
          
        <input type="text" name="customerName"
            className="border border-[#D9D9D9] rounded outline-primary transition-all p-2"
            placeholder="Customer name or Tax No."
          />

          <input type="date" name="invoiceStartDate"
            className="border border-[#D9D9D9] rounded outline-primary transition-all p-2"
            // placeholder="Invoice ID"
          />

          <input type="date" name="invoiceEndDate"
            className="border border-[#D9D9D9] rounded outline-primary transition-all p-2"
            // placeholder="Invoice ID"
          />

          <input type="text" name="envelopeStatus"
            className="border border-[#D9D9D9] rounded outline-primary transition-all p-2"
            placeholder="Envelope status"
          />

          <input type="text" name="invoiceStatus"
            className="border border-[#D9D9D9] rounded outline-primary transition-all p-2"
            placeholder="Invoice status"
          />
        </div>

        <div className="">
          <div className="flex justify-start items-center gap-4">
            <ArrowsClockwise size={20} weight="regular" className="cursor-pointer" />
            
            <div className="border rounded-md flex justify-start items-center gap-2 py-1 px-2 cursor-pointer">
              <FunnelSimple size={20} />
              <span>Filter</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-xs mb-6">
        <div className="flex justify-start items-center gap-4 flex-wrap mb-4">
            <div className="flex justify-start items-center gap-1">
              <input type="radio" name="envelope" id="senderEnvelope"
                className="w-[13px] h-[13px] accent-primary"
              />
              <label htmlFor="senderEnvelope">Sender Envelope</label>
            </div>

            <div className="flex justify-start items-center gap-1">
              <input type="radio" name="envelope" id="systemResponseEnvelope"
                className="w-[13px] h-[13px] accent-primary"
              />
              <label htmlFor="systemResponseEnvelope">System Response Envelope</label>
            </div>

            <div className="flex justify-start items-center gap-1">
              <input type="radio" name="envelope" id="allEnvelope"
                className="w-[13px] h-[13px] accent-primary"
              />
              <label htmlFor="allEnvelope">All</label>
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

            <span title="Download">
              <DownloadSimple size={20} color="#333333" weight="regular" className="cursor-pointer" />
            </span>
          </div>

          <div className="flex justify-start items-center gap-2 flex-wrap text-xs">
            <span title="Reload">
              <ArrowsClockwise size={20} color="#333333" weight="regular" className="cursor-pointer" />
            </span>
            
            <button className="bg-primary text-white rounded-lg py-1 px-4">Forward to Archive</button>

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
                <th className="p-3 text-start border border-primary">Customer Name</th>
                <th className="p-3 text-start border border-primary">GIB Envelope Type</th>
                <th className="p-3 text-start border border-primary">Buyer's Company VKN</th>
                <th className="p-3 text-start border border-primary">Customer Tax Number</th>
                <th className="p-3 text-start border border-primary">Customer Alias</th>
                <th className="p-3 text-start border border-primary">Envelope Date</th>
                <th className="p-3 text-start border border-primary">Envelope UUID</th>
                <th className="p-3 text-start border border-primary">Status</th>
                <th className="p-3 text-start border border-primary">Creation Date</th>
                <th className="p-3 text-start border border-primary">Is it Active</th>
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
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>Customer</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>GIB</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>Buyer</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>Customer</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>Customer</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>Envelope</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>Envelope</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>Status</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>Creation</td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}>Is</td>
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

export default EnvelopesArchived;