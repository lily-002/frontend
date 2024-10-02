import { ArrowsClockwise, FunnelSimple } from "@phosphor-icons/react";
import SelectOptions from "../../components/SelectOptions";
import { useState } from "react";

const IncomingE = () => {
  const [formData, setFormData] = useState({incoming: "All"});
  const itemsIDs = [1, 2, 3];

  return (
    <>
      <h2 className="font-bold text-sm mb-2">INCOMING INVOICES WILL BE PROCESSED</h2>
      <p className="text-xs mb-4">Invoice Received</p>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 text-xs mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:col-span-2 xl:col-span-3">
          <input type="date" name="invoiceStartDate"
            className="border border-[#D9D9D9] rounded outline-primary transition-all p-2"
            // placeholder="Invoice ID"
          />

          <input type="date" name="invoiceEndDate"
            className="border border-[#D9D9D9] rounded outline-primary transition-all p-2"
            // placeholder="Invoice ID"
          />

          <SelectOptions
            selectedOption={formData.incoming}
            setSelectedOption={(userSelection) => setFormData({...formData, incoming: userSelection})}
            options={["All", "E-Archive", "Interactive"]}
            className="border border-[#D9D9D9] rounded outline-primary transition-all p-2"
            top="top-8"
          />

        </div>

        <div className="">
          <div className="flex justify-start items-center gap-4">
            <ArrowsClockwise size={20} weight="regular" className="w-[20px] min-w-[20px] cursor-pointer" />
            
            <div className="border rounded-md flex justify-start items-center gap-2 py-1 px-2 cursor-pointer whitespace-nowrap">
              <FunnelSimple size={20} />
              <span>Find out</span>
            </div>
            
            <div className="border rounded-md flex justify-start items-center gap-2 py-1 px-2 cursor-pointer whitespace-nowrap">
              <FunnelSimple size={20} />
              <span>Find out at GIB</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full min-h-[200px] bg-white text-[#333333] border shadow-md p-3">
        <div className="flex justify-start items-center gap-4 mb-4">
          <button className="bg-primary text-white rounded-lg py-1 px-4">Create excel for this</button>

          <span title="Reload">
              <ArrowsClockwise size={24} color="#333333" weight="bold" className="cursor-pointer" />
          </span>
        </div>


        {/* Table */}
        <div className="w-full overflow-x-scroll mb-4">
          <table className="w-full table-auto text-xs mb-3">
            <thead className="whitespace-nowrap">
              <tr className="bg-[#F3FAFF]">
                <th className="p-3 text-start border border-primary">Customer</th>
                <th className="p-3 text-start border border-primary">Saller Title Information</th>
                <th className="p-3 text-start border border-primary">Document Number</th>
                <th className="p-3 text-start border border-primary">Shipping Method</th>
                <th className="p-3 text-start border border-primary">Document Date</th>
                <th className="p-3 text-start border border-primary">Currency</th>
                <th className="p-3 text-start border border-primary">Total</th>
                <th className="p-3 text-start border border-primary">Tax</th>
                <th className="p-3 text-start border border-primary">Payable</th>
              </tr>
            </thead>

            <tbody className="whitespace-nowrap">
              {
                itemsIDs.map(num => (
                  <tr key={num}>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}></td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}></td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}></td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}></td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}></td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}></td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}></td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}></td>
                      <td className={`p-3 border border-[#D9D9D9] ${Number.isInteger(+num/2) ? "bg-[#FBFBFB]" : ""}`}></td>
                  </tr>
                ))
              }
            </tbody>
          </table>

        </div>
        
      </div>
    </>
  )
}

export default IncomingE;